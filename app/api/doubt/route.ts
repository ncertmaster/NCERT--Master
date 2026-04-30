import { NextResponse } from "next/server"

const GROQ_API_KEY   = process.env.GROQ_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GROQ_URL       = "https://api.groq.com/openai/v1/chat/completions"
const GEMINI_URL     = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent"

// ── System prompt ──────────────────────────────────────────────────────────
function getSystemPrompt(language: string): string {
  if (language === "en") {
    return `You are Guru AI, a friendly and expert NCERT teacher for Indian students (Class 6-12).
Answer doubts clearly, step-by-step, in simple English.
Rules:
1. Stay within NCERT syllabus only
2. Use examples relevant to Indian students
3. For Math/Science: show step-by-step solution
4. Keep answers concise but complete
5. End with a motivating line for the student`
  }
  return `Tu Guru AI hai — ek friendly aur expert NCERT teacher jo Class 6-12 ke Indian students ki madad karta hai.
Doubts HINDI (Devanagari) mein clearly, step-by-step samjha.
Rules:
1. Sirf NCERT syllabus ke andar reh
2. Indian students ke liye relatable examples use kar
3. Math/Science mein: step-by-step solution dikha
4. Answers concise but complete rakh
5. Ant mein student ke liye motivating line likho
6. Technical/Scientific terms: Hindi + (English) bracket mein likho`
}

// ── Groq caller ────────────────────────────────────────────────────────────
async function callGroq(messages: any[], systemPrompt: string): Promise<string> {
  if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY not set")
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      temperature: 0.4,
      max_tokens: 1500,
    }),
  })
  if (!res.ok) throw new Error(`Groq error ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

// ── Gemini caller (fallback) ───────────────────────────────────────────────
async function callGemini(userMessage: string, imageBase64: string | null, systemPrompt: string): Promise<string> {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not set")

  const parts: any[] = []
  if (imageBase64) {
    parts.push({
      inline_data: {
        mime_type: "image/jpeg",
        data: imageBase64,
      },
    })
  }
  parts.push({ text: userMessage })

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemPrompt }] },
      contents: [{ role: "user", parts }],
      generationConfig: { temperature: 0.4, maxOutputTokens: 1500 },
    }),
  })
  if (!res.ok) throw new Error(`Gemini error ${res.status}`)
  const data = await res.json()
  return data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
}

// ── Main handler ───────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      question,
      imageBase64,
      language = "hi",
      classNum = "10",
      subject = "",
    }: {
      question: string
      imageBase64?: string | null
      language?: string
      classNum?: string
      subject?: string
    } = body

    if (!question?.trim()) {
      return NextResponse.json({ error: "Question missing" }, { status: 400 })
    }

    if (!GROQ_API_KEY && !GEMINI_API_KEY) {
      return NextResponse.json({ error: "No AI API key configured" }, { status: 500 })
    }

    const systemPrompt = getSystemPrompt(language)

    const contextLine = subject
      ? `[Context: Class ${classNum} ${subject} student]`
      : `[Context: Class ${classNum} student]`

    const userMessage = `${contextLine}\n\n${question.trim()}`

    let answer = ""

    // ── Try Groq first (fast, free) — text only ──
    if (!imageBase64) {
      try {
        answer = await callGroq(
          [{ role: "user", content: userMessage }],
          systemPrompt
        )
      } catch (groqErr) {
        console.error("[Doubt] Groq failed, trying Gemini:", groqErr)
        try {
          answer = await callGemini(userMessage, null, systemPrompt)
        } catch (geminiErr) {
          throw new Error(`Both AI providers failed`)
        }
      }
    } else {
      // ── Image query → Gemini Vision directly ──
      try {
        answer = await callGemini(userMessage, imageBase64, systemPrompt)
      } catch (geminiErr) {
        console.error("[Doubt] Gemini Vision failed:", geminiErr)
        // Fallback: try text-only with Groq
        try {
          answer = await callGroq(
            [{ role: "user", content: userMessage + "\n[Note: Student sent an image but it could not be processed. Answer based on the text question only.]" }],
            systemPrompt
          )
        } catch {
          throw new Error("Image processing failed. Please try without image.")
        }
      }
    }

    if (!answer?.trim()) {
      return NextResponse.json({ error: "AI ne response nahi diya. Dobara try karo." }, { status: 500 })
    }

    return NextResponse.json({ answer: answer.trim() })

  } catch (error: any) {
    console.error("[Doubt API] Error:", error)
    return NextResponse.json(
      { error: error?.message || "Kuch galat ho gaya. Dobara try karo." },
      { status: 500 }
    )
  }
}

export const maxDuration = 30
