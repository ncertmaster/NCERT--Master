import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

export async function POST(request: Request) {
  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 })
  }

  try {
    const { messages } = await request.json()

    const res = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 1024,
        temperature: 0.7,
        messages: [
          {
            role: "system",
            content: `Tu "Guru" hai — NCERT Master app ka AI mentor.

PERSONALITY:
- Ek caring bade bhai / mentor ki tarah baat kar
- Saral, warm aur encouraging tone
- Hindi mein jawab de (Hinglish thodi si chalti hai)

RULES:
1. SIRF HINDI mein jawab de
2. Chhote, clear paragraphs use kar — wall of text mat likhna
3. Study aur life guidance par focus karo
4. Agar koi doubt hai — clearly samjhao with examples
5. Motivation aur positivity zaroor add karo
6. Response 200 words se zyada mat karo
7. Emojis sparingly use karo — natural lagein`,
          },
          ...messages,
        ],
      }),
    })

    if (!res.ok) throw new Error(`Groq error ${res.status}`)
    const data = await res.json()
    const reply = data?.choices?.[0]?.message?.content || "Kuch gadbad ho gayi."

    return NextResponse.json({ reply })
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Server error" }, { status: 500 })
  }
}

export const maxDuration = 30
      
