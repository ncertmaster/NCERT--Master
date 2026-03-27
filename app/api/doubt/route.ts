import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
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

For IMAGE questions: carefully read ALL text, equations, diagrams visible in the image. Identify the subject and topic, then solve or explain completely.

STRICT RULES:
- NEVER give a 1-2 line answer to a real academic question
- NEVER refuse to answer any NCERT-related topic
- NEVER add unnecessary greetings or sign-offs
- NEVER say "Great question!" or similar filler phrases`

// ── Groq handler (text only) ─────────────────────────────────────────────────
async function callGroq(messages: any[]) {
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
  if (!res.ok) throw new Error(`Groq error ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || "Dobara try karo!"
}

// ── Gemini handler (text + image) ────────────────────────────────────────────
async function callGemini(messages: any[]) {
  // Build Gemini contents array from message history
  const contents: any[] = []

  // Add system instruction as first user turn
  contents.push({
    role: "user",
    parts: [{ text: SYSTEM_PROMPT }],
  })
  contents.push({
    role: "model",
    parts: [{ text: "Understood. I am Guru, your NCERT expert teacher. How can I help you?" }],
  })

  for (const msg of messages) {
    const role = msg.role === "assistant" ? "model" : "user"

    if (Array.isArray(msg.content)) {
      // Message has image + text
      const parts: any[] = []
      for (const part of msg.content) {
        if (part.type === "text" && part.text) {
          parts.push({ text: part.text })
        } else if (part.type === "image_url" && part.image_url?.url) {
          const dataUrl: string = part.image_url.url
          const matches = dataUrl.match(/^data:(.+);base64,(.+)$/)
          if (matches) {
            parts.push({
              inlineData: {
                mimeType: matches[1],
                data: matches[2],
              },
            })
          }
        }
      }
      if (parts.length > 0) {
        contents.push({ role, parts })
      }
    } else {
      // Plain text message
      contents.push({
        role,
        parts: [{ text: msg.content || "" }],
      })
    }
  }

  const res = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.7,
      },
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Gemini error ${res.status}: ${errText}`)
  }

  const data = await res.json()
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "Gemini se response nahi aaya. Dobara try karo!"
  )
}

// ── Main handler ─────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const { messages, useVision } = await request.json()

    let reply: string

    if (useVision && !GEMINI_API_KEY) {
      return NextResponse.json(
        { reply: "Image analysis needs GEMINI_API_KEY on server. Please add it in environment variables." },
        { status: 200 }
      )
    }

    if (useVision && GEMINI_API_KEY) {
      // Image message → Gemini (vision capable)
      reply = await callGemini(messages)
    } else if (GROQ_API_KEY) {
      // Text only → Groq (fast)
      // Strip any image data before sending to Groq
      const textMessages = (messages as any[]).map((m: any) => {
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
    } else {
      return NextResponse.json(
        { reply: "API keys missing. Check environment variables." },
        { status: 500 }
      )
    }

    return NextResponse.json({ reply })
  } catch (error: any) {
    console.error("Doubt API error:", error?.message)
    return NextResponse.json(
      { reply: "Connection issue aa gaya. Internet check karo aur dobara try karo." },
      { status: 200 }
    )
  }
}

export const maxDuration = 30
        
