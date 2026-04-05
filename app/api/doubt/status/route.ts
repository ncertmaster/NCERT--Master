import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const PLAN_LIMITS: Record<string, { text: number; image: number; period: "day" | "month" }> = {
  free:    { text: 5,    image: 0,   period: "day"   },
  starter: { text: 200,  image: 10,  period: "month" },
  pro:     { text: 500,  image: 50,  period: "month" },
  elite:   { text: 1000, image: 100, period: "month" },
}

function getAdminDb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

async function getUserFromToken(token: string) {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data, error } = await db.auth.getUser(token)
  if (error || !data?.user) return null
  return data.user
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization") || ""
    const token = authHeader.replace("Bearer ", "").trim()

    // ── Not logged in → return guest/blocked status ──────────────────────
    if (!token) {
      return NextResponse.json({
        plan: "guest",
        textUsed: 0,
        textLimit: 0,
        textRemaining: 0,
        imageUsed: 0,
        imageLimit: 0,
        imageRemaining: 0,
        limitHit: true,          // guests cannot use AI
        requiresLogin: true,
      })
    }

    const user = await getUserFromToken(token)
    if (!user) {
      return NextResponse.json({
        plan: "guest",
        textUsed: 0,
        textLimit: 0,
        textRemaining: 0,
        imageUsed: 0,
        imageLimit: 0,
        imageRemaining: 0,
        limitHit: true,
        requiresLogin: true,
      })
    }

    const db = getAdminDb()
    const today = new Date().toISOString().split("T")[0]
    const monthStart = today.slice(0, 7) + "-01"

    const { data, error } = await db
      .from("user_plans")
      .select("*")
      .eq("user_id", user.id)
      .single()

    // No row → free plan, never used
    if (error || !data) {
      return NextResponse.json({
        plan: "free",
        textUsed: 0,
        textLimit: 5,
        textRemaining: 5,
        imageUsed: 0,
        imageLimit: 0,
        imageRemaining: 0,
        limitHit: false,
      })
    }

    // Check plan expiry — downgrade to free if expired
    let plan = data.plan || "free"
    if (plan !== "free" && data.plan_expires_at) {
      const isExpired = new Date(data.plan_expires_at) < new Date()
      if (isExpired) {
        plan = "free"
        // Downgrade in DB
        await db
          .from("user_plans")
          .update({ plan: "free", updated_at: new Date().toISOString() })
          .eq("user_id", user.id)
      }
    }

    const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free

    // Check if usage should be reset
    const resetTo = limits.period === "day" ? today : monthStart
    let textUsed  = data.text_msgs_used  || 0
    let imageUsed = data.image_msgs_used || 0

    if (data.reset_date < resetTo) {
      textUsed  = 0
      imageUsed = 0
      await db
        .from("user_plans")
        .update({ text_msgs_used: 0, image_msgs_used: 0, reset_date: resetTo, updated_at: new Date().toISOString() })
        .eq("user_id", user.id)
    }

    const textRemaining  = Math.max(0, limits.text  - textUsed)
    const imageRemaining = Math.max(0, limits.image - imageUsed)

    return NextResponse.json({
      plan,
      textUsed,
      textLimit:      limits.text,
      textRemaining,
      imageUsed,
      imageLimit:     limits.image,
      imageRemaining,
      limitHit:       textRemaining <= 0,
      planExpiresAt:  data.plan_expires_at || null,
    })

  } catch (err: any) {
    console.error("Status API error:", err?.message)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
      }
      
