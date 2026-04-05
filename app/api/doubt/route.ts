import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const GROQ_API_KEY    = process.env.GROQ_API_KEY
const GEMINI_API_KEY  = process.env.GEMINI_API_KEY
const GROQ_URL        = "https://api.groq.com/openai/v1/chat/completions"
const GEMINI_URL      = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

// ── Plan limits ────────────────────────────────────────────────────────────
const PLAN_LIMITS: Record<string, { text: number; image: number; period: "day" | "month" }> = {
  free:    { text: 5,    image: 0,   period: "day"   },
  starter: { text: 200,  image: 10,  period: "month" },
  pro:     { text: 500,  image: 50,  period: "month" },
  elite:   { text: 1000, image: 100, period: "month" },
}

// ── Supabase admin client ──────────────────────────────────────────────────
function getAdminDb() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ── Get user from JWT ──────────────────────────────────────────────────────
async function getUserFromToken(token: string) {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data, error } = await db.auth.getUser(token)
  if (error || !data?.user) return null
  return data.user
}

// ── Get or create user plan row ────────────────────────────────────────────
async function getUserPlan(userId: string) {
  const db = getAdminDb()
  const today = new Date().toISOString().split("T")[0]
  const monthStart = today.slice(0, 7) + "-01"

  const { data, error } = await db
    .from("user_plans")
    .select("*")
    .eq("user_id", userId)
    .single()

  // No row yet — create free plan
  if (error || !data) {
    const newRow = {
      user_id: userId,
      plan: "free",
      text_msgs_used: 0,
      image_msgs_used: 0,
      reset_date: today,
    }
    await db.from("user_plans").insert(newRow)
    return newRow
  }

  // Check if reset needed
  const limits = PLAN_LIMITS[data.plan] || PLAN_LIMITS.free
  const resetTo = limits.period === "day" ? today : monthStart
  const shouldReset = data.reset_date < resetTo

  if (shouldReset) {
    const updated = { text_msgs_used: 0, image_msgs_used: 0, reset_date: resetTo, updated_at: new Date().toISOString() }
    await db.from("user_plans").update(updated).eq("user_id", userId)
    return { ...data, ...updated }
  }

  return data
}

// ── Increment usage ────────────────────────────────────────────────────────
async function incrementUsage(userId: string, isImage: boolean) {
  const db = getAdminDb()
  const field = isImage ? "image_msgs_used" : "text_msgs_used"
  const { data } = await db
    .from("user_plans")
    .select(field)
    .eq("user_id", userId)
    .single()

  const current = (data as any)?.[field] || 0
  await db.from("user_plans")
    .update({ [field]: current + 1, updated_at: new Date().toISOString() })
    .eq("user_id", userId)
}

// ── System Prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `तुम एक NCERT स्कूल शिक्षक AI हो जो Class 6 से 12 के छात्रों की मदद करते हो।

तुम्हारा लक्ष्य है: concepts को clearly, simply और exam-focused तरीके से समझाना।

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CORE STYLE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• हमेशा सरल हिंदी (देवनागरी) में जवाब दो
• friendly लेकिन teacher जैसा tone रखो
• जवाब short, clear और structured रखो
• लंबे paragraphs से बचो
• strictly NCERT syllabus के अंदर रहो
• समझ + exam preparation पर focus करो
• Technical terms: हिंदी + bracket में English दोनों लिखो

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
FORMATTING RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• bullet points या steps use करो
• spacing clean रखो
• important words highlight करो (formula, definition)
• unnecessary text से बचो

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LEVEL ADAPTATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• student का level detect करो (Class 6-12)
• lower class → बहुत simple + real-life examples
• higher class → थोड़ा detailed लेकिन फिर भी simple

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
CLARITY RULE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• अगर question unclear है → 1 short clarification question पूछो
• missing details assume मत करो

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RESPONSE DETECTION RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. अगर user full explanation / detail / समझाओ पूछे:
   Format:
   • Short intro (2-3 lines)
   • Step-by-step explanation
   • Simple example
   • Important exam points

2. अगर user short / क्या है / define पूछे:
   Format:
   • 1-2 line direct answer
   • Max 2 key points

3. अगर user important questions / notes / quiz माँगे:
   Format:
   • 8-10 Important Questions
   • Short Notes (bullet points)
   • 5 MCQs with options
   • Answers at the end

4. अगर user numerical पूछे:
   Format strictly:
   • Formula
   • Values
   • Step-by-step solution
   • Final answer

5. अगर user confused है / समझ नहीं आया कहे:
   • Re-explain simpler
   • Real-life example use करो
   • पहले से shorter रखो

6. अगर user non-study पूछे:
   • Casual → short friendly reply
   • General → simple answer
   • Irrelevant → gently study की तरफ redirect करो
   • Personal → supportive + practical advice (2-3 steps only)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMAGE QUESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Image में सभी visible text, numbers, equations, diagrams ध्यान से पढ़ो
• बताओ: "यह [topic/question] है..."
• पूरी तरह solve या explain करो

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRICT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• लंबे answers मत दो
• complex words use मत करो
• NCERT से बाहर मत जाओ
• unnecessary theory मत जोड़ो`

// ── Groq call ──────────────────────────────────────────────────────────────
async function callGroq(messages: any[], useVision = false) {
  if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY missing")
  const model = useVision ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile"
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model, max_tokens: 2048, temperature: 0.5,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  })
  if (!res.ok) throw new Error(`Groq ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || "दोबारा try करो!"
}

// ── Parse data URL ─────────────────────────────────────────────────────────
function parseDataUrl(dataUrl: string): { mimeType: string; base64: string } | null {
  const commaIdx = dataUrl.indexOf(",")
  if (commaIdx === -1) return null
  const prefix = dataUrl.substring(0, commaIdx)
  const base64  = dataUrl.substring(commaIdx + 1)
  const mimeMatch = prefix.match(/^data:([^;]+)/)
  if (!mimeMatch) return null
  return { mimeType: mimeMatch[1], base64 }
}

// ── Gemini call ────────────────────────────────────────────────────────────
async function callGemini(messages: any[]) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY missing")
  const contents: any[] = []
  for (const msg of messages) {
    const role = msg.role === "assistant" ? "model" : "user"
    if (Array.isArray(msg.content)) {
      const parts: any[] = []
      for (const part of msg.content) {
        if (part.type === "text" && part.text) parts.push({ text: part.text })
        else if (part.type === "image_url" && part.image_url?.url) {
          const parsed = parseDataUrl(part.image_url.url)
          if (parsed) parts.push({ inlineData: { mimeType: parsed.mimeType, data: parsed.base64 } })
        }
      }
      if (parts.length > 0) contents.push({ role, parts })
    } else if (typeof msg.content === "string") {
      contents.push({ role, parts: [{ text: msg.content }] })
    }
  }
  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 2048, temperature: 0.5 },
    }),
  })
  if (!res.ok) throw new Error(`Gemini ${res.status}: ${(await res.text()).slice(0, 200)}`)
  const data = await res.json()
  const candidate = data?.candidates?.[0]
  if (!candidate) throw new Error("Gemini: no candidates")
  const text = candidate?.content?.parts?.filter((p: any) => p.text)?.map((p: any) => p.text)?.join("\n")
  if (!text) throw new Error(`Gemini empty response (reason: ${candidate?.finishReason})`)
  return text
}

// ── Main handler ───────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { messages, useVision } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "कोई message नहीं मिला।" }, { status: 400 })
    }

    // ── Auth check ───────────────────────────────────────────────────────
    const authHeader = request.headers.get("authorization") || ""
    const token = authHeader.replace("Bearer ", "").trim()

    let userId: string | null = null
    let planData: any = null

    if (token) {
      const user = await getUserFromToken(token)
      if (user) {
        userId = user.id
        planData = await getUserPlan(userId)
      }
    }

    // ── Usage limit check ─────────────────────────────────────────────────
    const plan = planData?.plan || "free"
    const limits = PLAN_LIMITS[plan] || PLAN_LIMITS.free

    if (userId && planData) {
      if (useVision) {
        // Image message check
        if (limits.image === 0) {
          return NextResponse.json({
            reply: "",
            limitHit: true,
            limitType: "image",
            plan,
            message: "📸 Image analysis paid plan में उपलब्ध है।\nStarter (₹49/mo) से 10 images/month मिलेंगी!",
          })
        }
        if (planData.image_msgs_used >= limits.image) {
          return NextResponse.json({
            reply: "",
            limitHit: true,
            limitType: "image",
            plan,
            message: `📸 Image limit खत्म! (${limits.image}/${limits.image} used)\nPlan upgrade करो या अगले महीने तक wait करो।`,
          })
        }
      } else {
        // Text message check
        if (planData.text_msgs_used >= limits.text) {
          const resetMsg = limits.period === "day"
            ? "कल फिर 5 free messages मिलेंगे।"
            : `अगले महीने reset होगा।`
          return NextResponse.json({
            reply: "",
            limitHit: true,
            limitType: "text",
            plan,
            used: planData.text_msgs_used,
            limit: limits.text,
            message: `⚡ Daily limit खत्म! (${planData.text_msgs_used}/${limits.text} messages)\n${resetMsg}\n\nStarter Plan (₹49/mo) से 200 messages/month पाओ!`,
          })
        }
      }
    }

    // ── AI call ───────────────────────────────────────────────────────────
    let reply: string

    if (useVision) {
      try {
        reply = await callGroq(messages, true)
      } catch {
        if (GEMINI_API_KEY) reply = await callGemini(messages)
        else return NextResponse.json({ reply: "⚠️ Image analysis अभी उपलब्ध नहीं है।" })
      }
    } else {
      const textMessages = messages.map((m: any) => {
        if (Array.isArray(m.content)) {
          const text = m.content.filter((c: any) => c.type === "text").map((c: any) => c.text).join(" ")
          return { role: m.role, content: text || "Please help me." }
        }
        return { role: m.role, content: m.content }
      })
      try {
        reply = await callGroq(textMessages, false)
      } catch {
        if (GEMINI_API_KEY) reply = await callGemini(textMessages)
        else throw new Error("No AI API available")
      }
    }

    // ── Increment usage after successful reply ────────────────────────────
    if (userId) await incrementUsage(userId, !!useVision)

    // Return reply + remaining usage info
    const remaining = userId && planData
      ? useVision
        ? Math.max(0, limits.image - (planData.image_msgs_used + 1))
        : Math.max(0, limits.text - (planData.text_msgs_used + 1))
      : null

    return NextResponse.json({ reply, plan, remaining })

  } catch (error: any) {
    console.error("Doubt API error:", error?.message)
    return NextResponse.json({
      reply: "कुछ गड़बड़ हो गई। Internet check करो और दोबारा try करो।",
    }, { status: 200 })
  }
}

export const maxDuration = 30
  
