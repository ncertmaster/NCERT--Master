import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"

// ── System Prompt ─────────────────────────────────────────────────────────────
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
STRICT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• लंबे answers मत दो
• complex words use मत करो
• NCERT से बाहर मत जाओ
• unnecessary theory मत जोड़ो

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SMART BEHAVIOR
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. ERROR HANDLING
   • अगर unsure हो → कहो: "इसका सटीक उत्तर सुनिश्चित नहीं है"
   • कभी गलत answers guess मत करो

2. FOLLOW-UP CHECK
   • कभी-कभी 1 short question पूछो:
     "क्या तुम इसका example खुद बना सकते हो?"

3. EXAM FOCUS
   • Important lines highlight करो:
     "⭐ यह exam में पूछा जा सकता है"

4. MEMORY BOOST
   • Simple tricks या patterns use करो
   • Answers easy to remember रखो

5. CONSISTENCY RULE
   • Same concept → same style explanation
   • Random variation नहीं

6. RESPONSE CONTROL
   • Answer length question के साथ match करो
   • Short question → short answer
   • Detail request → structured detail

7. USER EXPERIENCE
   • Student को guided feel करवाओ, overloaded नहीं
   • Clarity को completeness से ऊपर रखो

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
IMAGE QUESTIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Image में सभी visible text, numbers, equations, diagrams ध्यान से पढ़ो
• बताओ: "यह [topic/question] है..."
• पूरी तरह solve या explain करो

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APP FEATURES (NCERT Master)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 📚 Books → NCERT PDFs chapter by chapter
• 📝 Notes & IQ → Smart notes and important points
• 🧠 Quiz → Chapter-wise MCQ practice
• जब relevant हो, guide करो: "Quiz में try करो" या "Notes section देखो"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GOAL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Student को जल्दी समझाओ
• Retention improve करो
• Exam के लिए effectively prepare करवाओ
• Learning simple और stress-free रखो`

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
      temperature: 0.5,
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
  return data?.choices?.[0]?.message?.content || "दोबारा try करो!"
}

// ── Parse data URL safely ─────────────────────────────────────────────────────
function parseDataUrl(dataUrl: string): { mimeType: string; base64: string } | null {
  const commaIdx = dataUrl.indexOf(",")
  if (commaIdx === -1) return null
  const prefix = dataUrl.substring(0, commaIdx)
  const base64  = dataUrl.substring(commaIdx + 1)
  const mimeMatch = prefix.match(/^data:([^;]+)/)
  if (!mimeMatch) return null
  return { mimeType: mimeMatch[1], base64 }
}

// ── Gemini — text + vision ────────────────────────────────────────────────────
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
      generationConfig: { maxOutputTokens: 2048, temperature: 0.5 },
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
      return NextResponse.json({ reply: "कोई message नहीं मिला।" }, { status: 400 })
    }

    let reply: string

    if (useVision) {
      // Image attached → Try Groq Vision first, fallback to Gemini
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
                reply: `⚠️ Image analysis अभी उपलब्ध नहीं है। Text में अपना question लिखकर try करो।`,
              })
            }
          } else {
            return NextResponse.json({
              reply: "⚠️ Image analysis के लिए GROQ_API_KEY या GEMINI_API_KEY चाहिए।",
            })
          }
        }
      } else if (GEMINI_API_KEY) {
        try {
          reply = await callGemini(messages)
        } catch (geminiErr: any) {
          const msg = geminiErr?.message || ""
          if (msg.includes("429")) {
            return NextResponse.json({
              reply: "⚠️ Image analysis का quota खत्म हो गया। थोड़ी देर बाद try करो या text में पूछो।",
            })
          }
          return NextResponse.json({
            reply: `⚠️ Image analysis error। Text में पूछो।`,
          })
        }
      } else {
        return NextResponse.json({
          reply: "⚠️ Image analysis के लिए server पर GROQ_API_KEY set करो।",
        })
      }
    } else {
      // Text only → Groq fast model
      if (GROQ_API_KEY) {
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
          { reply: "API keys missing। Server पर GROQ_API_KEY set करो।" },
          { status: 500 }
        )
      }
    }

    return NextResponse.json({ reply })

  } catch (error: any) {
    console.error("Doubt API error:", error?.message)
    return NextResponse.json({
      reply: `कुछ गड़बड़ हो गई। Internet check करो और दोबारा try करो।`,
    }, { status: 200 })
  }
}

export const maxDuration = 30
          
