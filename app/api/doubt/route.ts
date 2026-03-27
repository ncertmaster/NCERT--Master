import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
// gemini-2.0-flash supports vision + text
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

const SYSTEM_PROMPT = `You are "Guru" — an expert NCERT teacher and mentor inside the NCERT Master study app, specializing in Class 6 to Class 12 syllabus.

WHO YOU ARE:
- A deeply knowledgeable NCERT subject expert across all streams: Science, Commerce, Arts
- You know every NCERT book, chapter, concept, diagram, and formula from Class 6 to 12
- You are like a brilliant senior teacher who explains clearly, step by step
- You are direct, precise, and focused — no unnecessary filler or small talk

HOW YOU TEACH:
1. Answer the question directly and completely — never give vague answers
2. For numerical problems: solve every step clearly with working shown
3. For concepts: explain the "why" behind it, not just the "what"
4. Use real-life Indian examples students can relate to
5. Reference the exact NCERT chapter/topic when you know it
6. End with a crisp summary or key formula box

YOUR FORMAT:
- Use headings with emojis: 📌 Concept | 🔢 Solution | 💡 Key Point | ✅ Summary
- Short paragraphs, bullet points for lists
- For formulas: write clearly with every variable explained
- Bold important terms

LANGUAGE:
- Write in clear, simple English
- Use technical terms in English (Newton, Mitosis, Democracy, etc.)
- Keep tone friendly and encouraging but FOCUSED on academics

SUBJECTS YOU KNOW DEEPLY:
- Science: Physics, Chemistry, Biology (6-12)
- Maths (6-12, including Calculus, Statistics, Algebra)
- Social Science: History, Geography, Political Science, Economics
- English Literature & Grammar
- Commerce: Accountancy, Business Studies, Economics
- Arts: History, Political Science, Sociology, Psychology, Geography

For IMAGE questions:
- Carefully read ALL text, equations, numbers, and diagrams visible in the image
- Identify the subject and topic from visual context
- If it is a question/problem — solve it completely step by step
- If it is notes/textbook page — summarize and explain the key concepts
- Always start with: "Image mein dekha: [what you see]..."

STRICT RULES:
- NEVER give a 1-2 line answer to a real academic question
- NEVER refuse to answer any NCERT-related topic
- NEVER add unnecessary greetings or sign-offs
- NEVER say "Great question!" or similar filler phrases`

// ── Groq handler — text only ──────────────────────────────────────────────────
async function callGroq(messages: any[]) {
  if (!GROQ_API_KEY) throw new Error("GROQ_API_KEY missing")

  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      max_tokens: 2048,
      temperature: 0.7,
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

// ── Parse data URL → { mimeType, base64 } ────────────────────────────────────
function parseDataUrl(dataUrl: string): { mimeType: string; base64: string } | null {
  // Format: data:<mimeType>;base64,<data>
  // Use indexOf to avoid regex issues with very long base64 strings
  const commaIdx = dataUrl.indexOf(",")
  if (commaIdx === -1) return null

  const prefix = dataUrl.substring(0, commaIdx)           // "data:image/jpeg;base64"
  const base64  = dataUrl.substring(commaIdx + 1)          // pure base64 data

  const mimeMatch = prefix.match(/^data:([^;]+)/)
  if (!mimeMatch) return null

  return { mimeType: mimeMatch[1], base64 }
}

// ── Gemini handler — text + vision ───────────────────────────────────────────
async function callGemini(messages: any[]) {
  if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY missing")

  // Build Gemini contents array
  const contents: any[] = []

  for (const msg of messages) {
    const role = msg.role === "assistant" ? "model" : "user"

    if (Array.isArray(msg.content)) {
      // Multi-modal message (image + text)
      const parts: any[] = []

      for (const part of msg.content) {
        if (part.type === "text" && part.text) {
          parts.push({ text: part.text })
        } else if (part.type === "image_url" && part.image_url?.url) {
          const parsed = parseDataUrl(part.image_url.url)
          if (parsed) {
            parts.push({
              inlineData: {
                mimeType: parsed.mimeType,
                data: parsed.base64,
              },
            })
          }
        }
      }

      if (parts.length > 0) {
        contents.push({ role, parts })
      }
    } else if (typeof msg.content === "string") {
      contents.push({ role, parts: [{ text: msg.content }] })
    }
  }

  // Use systemInstruction field (supported by gemini-2.0-flash)
  const requestBody = {
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    contents,
    generationConfig: {
      maxOutputTokens: 2048,
      temperature: 0.7,
    },
  }

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Gemini ${res.status}: ${errText.slice(0, 300)}`)
  }

  const data = await res.json()

  // Check for safety blocks or empty candidates
  const candidate = data?.candidates?.[0]
  if (!candidate) {
    console.error("Gemini: no candidates", JSON.stringify(data).slice(0, 500))
    throw new Error("Gemini returned no candidates")
  }

  const text = candidate?.content?.parts
    ?.filter((p: any) => p.text)
    ?.map((p: any) => p.text)
    ?.join("\n")

  if (!text) {
    const finishReason = candidate?.finishReason
    if (finishReason === "SAFETY") throw new Error("Gemini blocked response (safety filter)")
    throw new Error(`Gemini empty response (finishReason: ${finishReason})`)
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
      // Image attached → use Gemini Vision
      if (!GEMINI_API_KEY) {
        return NextResponse.json({
          reply: "⚠️ Image analysis ke liye GEMINI_API_KEY server pe set karni hai. Vercel Environment Variables mein GEMINI_API_KEY add karo.",
        })
      }
      reply = await callGemini(messages)
    } else {
      // Text only → use Groq (faster)
      if (!GROQ_API_KEY) {
        // Fallback to Gemini if only Gemini key available
        if (GEMINI_API_KEY) {
          reply = await callGemini(messages)
        } else {
          return NextResponse.json({ reply: "API keys missing. GROQ_API_KEY ya GEMINI_API_KEY set karo." }, { status: 500 })
        }
      } else {
        // Strip any accidental image data before sending to Groq (text model)
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
        reply = await callGroq(textMessages)
      }
    }

    return NextResponse.json({ reply })

  } catch (error: any) {
    console.error("Doubt API error:", error?.message)

    // Return friendly error instead of crashing
    return NextResponse.json({
      reply: `Connection issue: ${error?.message?.slice(0, 100) || "Unknown error"}. Internet check karo aur dobara try karo.`,
    }, { status: 200 })
  }
}

export const maxDuration = 30
        
