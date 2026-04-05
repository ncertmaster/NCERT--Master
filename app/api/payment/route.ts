import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import crypto from "crypto"

const RAZORPAY_KEY_ID     = process.env.RAZORPAY_KEY_ID!
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!

const PLAN_PRICES: Record<string, { amount: number; name: string }> = {
  starter: { amount: 4900,  name: "Starter Plan" },  // ₹49 in paise
  pro:     { amount: 9900,  name: "Pro Plan"     },  // ₹99
  elite:   { amount: 14900, name: "Elite Plan"   },  // ₹149
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

// ── POST /api/payment ──────────────────────────────────────────────────────
// action=create  → create Razorpay order
// action=verify  → verify payment signature + activate plan
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { action } = body

    // Auth check
    const authHeader = request.headers.get("authorization") || ""
    const token = authHeader.replace("Bearer ", "").trim()
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const user = await getUserFromToken(token)
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    // ── CREATE ORDER ───────────────────────────────────────────────────────
    if (action === "create") {
      const { plan } = body
      const planInfo = PLAN_PRICES[plan]
      if (!planInfo) return NextResponse.json({ error: "Invalid plan" }, { status: 400 })

      const credentials = Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString("base64")

      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({
          amount: planInfo.amount,
          currency: "INR",
          receipt: `ncert_${user.id.slice(0, 8)}_${Date.now()}`,
          notes: { userId: user.id, plan },
        }),
      })

      if (!res.ok) {
        const err = await res.text()
        console.error("Razorpay order error:", err)
        return NextResponse.json({ error: "Payment initiation failed" }, { status: 500 })
      }

      const order = await res.json()
      return NextResponse.json({
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        keyId: RAZORPAY_KEY_ID,
        planName: planInfo.name,
      })
    }

    // ── VERIFY PAYMENT ─────────────────────────────────────────────────────
    if (action === "verify") {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan } = body

      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !plan) {
        return NextResponse.json({ error: "Missing payment fields" }, { status: 400 })
      }

      // Verify Razorpay signature
      const expectedSig = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${razorpay_payment_id}`)
        .digest("hex")

      if (expectedSig !== razorpay_signature) {
        return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 })
      }

      // Activate plan in Supabase
      const db = getAdminDb()
      const now = new Date()
      const expiresAt = new Date(now)
      expiresAt.setMonth(expiresAt.getMonth() + 1)

      const monthStart = now.toISOString().slice(0, 7) + "-01"

      await db.from("user_plans").upsert({
        user_id: user.id,
        plan,
        text_msgs_used: 0,
        image_msgs_used: 0,
        reset_date: monthStart,
        razorpay_order_id,
        razorpay_payment_id,
        plan_expires_at: expiresAt.toISOString(),
        updated_at: now.toISOString(),
      }, { onConflict: "user_id" })

      return NextResponse.json({ success: true, plan, expiresAt: expiresAt.toISOString() })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })

  } catch (err: any) {
    console.error("Payment API error:", err?.message)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
