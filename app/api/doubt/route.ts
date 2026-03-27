import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

// ── System Prompt ─────────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Guru — the expert AI teacher built into NCERT Master app.

WHO YOU ARE:
You are a highly experienced, passionate teacher with 20+ years of teaching all NCERT subjects from Class 6 to 12. You are also a motivator who genuinely cares about every student's success. Think of yourself as the best teacher the student has ever had — knowledgeable, patient, clear, and encouraging.

THE APP YOU ARE PART OF (NCERT Master):
This app has 4 main sections that students use:
1. 📚 NCERT Books — Read full NCERT PDFs chapter by chapter (all classes 6-12, all subjects)
2. 📝 Notes & IQ Points — Smart summarized notes and important points from each chapter
3. 🧠 Quiz — Chapter-wise and full-subject MCQ quizzes for practice
4. 📊 Dashboard — Student's progress, streak, and study overview

When students mention any of these features, guide them accordingly. Example: "Quiz mein try karo" or "Notes section mein dekho".

YOUR SUBJECTS (deep expertise):
- Physics, Chemistry, Biology (Class 6-12)
- Mathematics (Class 6-12: Arithmetic → Calculus → Statistics)
- History, Geography, Political Science, Economics (Class 6-12)
- English Literature & Grammar
- Accountancy, Business Studies (Class 11-12 Commerce)
- Sociology, Psychology (Class 11-12 Arts)

HOW YOU TEACH — YOUR STYLE:
1. Get straight to the answer — no filler greetings like "Great question!" or "Sure, I'd be happy to help"
2. For numerical/problems: Show EVERY step clearly, never skip
3. For concepts: Explain WHY it happens, not just WHAT. Use real-life Indian examples
4. Reference exact NCERT chapter/book when relevant: e.g., "Class 10 Science, Chapter 3 — Metals and Non-metals"
5. End responses with a crisp ✅ Summary or key formula box
6. For motivation: Be like a coach — tough love + genuine belief in the student

RESPONSE FORMAT:
- 📌 for concepts, 🔢 for solutions, 💡 for key points, ⚠️ for common mistakes, ✅ for summary
- Bold **important terms**
- Numbered steps for multi-step problems
- Short paragraphs — never walls of text

FOR IMAGES:
- Read ALL visible text, numbers, equations, diagrams carefully
- State what you see: "Yeh [topic/question] hai..."
- Solve or explain completely

LANGUAGE:
- Simple, clear English as default
- Mix Hindi naturally when helpful: "Dekho yaar, jab current flow karta hai..."
- Technical terms always in English

ABSOLUTE RULES:
- Never give a 1-2 line answer to a real academic question
- Never say "I cannot help" for any school/study topic
- Never add unnecessary sign-offs or greetings
- If a student shares a photo of their notes/question paper — analyze it fully`

// ── Groq — text only ──────────────────────────────────────────────────────────
async function callGroq(messages: any[], useVision = false) {
  if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY missing")

  const model = useVision ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile"

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      max_tokens: 2048,
      temperature: 0.6,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Groq ${res.status}: ${errText.slice(0, 200)}`)
  }

  const data = await res.json()
  return data?.choices?.[0]?.message?.content || "Dobara try karo!"
}

// ── Parse data URL safely (no regex on huge base64) ───────────────────────────
function parseDataUrl(dataUrl: string): { mimeType: string; base64: string } | null {
  const commaIdx = dataUrl.indexOf(",")
  if (commaIdx === -1) return null
  const prefix = dataUrl.substring(0, commaIdx)         // "data:image/jpeg;base64"
  const base64  = dataUrl.substring(commaIdx + 1)        // pure base64
  const mimeMatch = prefix.match(/^data:([^;]+)/)
  if (!mimeMatch) return null
  return { mimeType: mimeMatch[1], base64 }
}

// ── Gemini — text + vision fallback ──────────────────────────────────────────
async function callGemini(messages: any[]) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY missing")

  const contents: any[] = []

  for (const msg of messages) {
    const role = msg.role === "assistant" ? "model" : "user"

    if (Array.isArray(msg.content)) {
      const parts: any[] = []
      for (const part of msg.content) {
        if (part.type === "text" && part.text) {
          parts.push({ text: part.text })
        } else if (part.type === "image_url" && part.image_url?.url) {
          const parsed = parseDataUrl(part.image_url.url)
          if (parsed) {
            parts.push({ inlineData: { mimeType: parsed.mimeType, data: parsed.base64 } })
          }
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
      generationConfig: { maxOutputTokens: 2048, temperature: 0.6 },
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Gemini ${res.status}: ${errText.slice(0, 200)}`)
  }

  const data = await res.json()
  const candidate = data?.candidates?.[0]
  if (!candidate) throw new Error("Gemini: no candidates returned")

  const text = candidate?.content?.parts
    ?.filter((p: any) => p.text)
    ?.map((p: any) => p.text)
    ?.join("\n")

  if (!text) {
    const reason = candidate?.finishReason
    if (reason === "SAFETY") throw new Error("Gemini safety filter triggered")
    throw new Error(`Gemini empty response (reason: ${reason})`)
  }

  return text
}

// ── Main handler ──────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { messages, useVision } = await request.json()

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ reply: "No messages received." }, { status: 400 })
    }

    let reply: string

    if (useVision) {
      // Image attached → Try Groq Vision first (generous free quota)
      // Fallback to Gemini if Groq vision fails
      if (GROQ_API_KEY) {
        try {
          reply = await callGroq(messages, true)
        } catch (groqErr: any) {
          console.warn("Groq vision failed, trying Gemini:", groqErr?.message)
          if (GEMINI_API_KEY) {
            try {
              reply = await callGemini(messages)
            } catch (geminiErr: any) {
              return NextResponse.json({
                reply: `⚠️ Image analysis temporarily unavailable: ${geminiErr?.message?.slice(0, 80)}. Text mein apna question likhkar try karo.`,
              })
            }
          } else {
            return NextResponse.json({
              reply: "⚠️ Image analysis ke liye GROQ_API_KEY ya GEMINI_API_KEY chahiye. Environment variables check karo.",
            })
          }
        }
      } else if (GEMINI_API_KEY) {
        // Only Gemini available
        try {
          reply = await callGemini(messages)
        } catch (geminiErr: any) {
          const msg = geminiErr?.message || ""
          if (msg.includes("429")) {
            return NextResponse.json({
              reply: "⚠️ Image analysis ka quota khatam ho gaya (429). Thodi der baad try karo ya text mein apna question likhkar puchho.",
            })
          }
          return NextResponse.json({
            reply: `⚠️ Image analysis error: ${msg.slice(0, 100)}. Text mein puchho.`,
          })
        }
      } else {
        return NextResponse.json({
          reply: "⚠️ Image analysis ke liye server pe GROQ_API_KEY set karo (Vercel Environment Variables).",
        })
      }
    } else {
      // Text only → Groq fast model
      if (GROQ_API_KEY) {
        // Strip any accidental image data before sending text model
        const textMessages = messages.map((m: any) => {
          if (Array.isArray(m.content)) {
            const text = m.content
              .filter((c: any) => c.type === "text")
              .map((c: any) => c.text)
              .join(" ")
            return { role: m.role, content: text || "Please help me." }
          }
          return { role: m.role, content: m.content }
        })
        try {
          reply = await callGroq(textMessages, false)
        } catch (err: any) {
          // Groq text failed → try Gemini
          if (GEMINI_API_KEY) {
            reply = await callGemini(textMessages)
          } else {
            throw err
          }
        }
      } else if (GEMINI_API_KEY) {
        reply = await callGemini(messages)
      } else {
        return NextResponse.json(
          { reply: "API keys missing. Server pe GROQ_API_KEY set karo." },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ reply })

  } catch (error: any) {
    console.error("Doubt API error:", error?.message)
    return NextResponse.json({
      reply: `Kuch gadbad ho gayi (${error?.message?.slice(0, 60) || "unknown"}). Internet check karo aur dobara try karo.`,
    }, { status: 200 })
  }
}

export const maxDuration = 30
    
