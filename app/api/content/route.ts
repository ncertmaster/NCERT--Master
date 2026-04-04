import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

// ── Simple in-memory rate limiter ──────────────────────────────────────────
// Max 10 requests per IP per minute
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10
const RATE_WINDOW_MS = 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}
// ──────────────────────────────────────────────────────────────────────────

function getClassGroup(cls: number): "6-8" | "9-10" | "11-12" {
  if (cls <= 8) return "6-8"
  if (cls <= 10) return "9-10"
  return "11-12"
}

async function callGroq(prompt: string, maxTokens = 4000): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `Tu ek expert NCERT teacher hai jo SIRF DEVANAGARI HINDI mein likhta hai.
MANDATORY RULES:
1. POORA content HINDI (Devanagari) mein likhna hai
2. Scientific/technical terms: Hindi + bracket mein English dono likho
3. Format EXACTLY waise rakho jaisa prompt mein bataya gaya hai
4. NCERT content se bahar bilkul mat jao
5. Content POORA complete karo — beech mein mat rokna
6. Headings SAAF aur KHULE KHULE rakho — har topic clearly alag dikhe`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  })
  if (!res.ok) throw new Error(`Groq error ${res.status}`)
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

function getNotesPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string): string {
  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  const lengthGuide =
    group === "6-8"   ? "300–500 shabd" :
    group === "9-10"  ? "360–600 shabd" :
                        "430–720 shabd"

  const depthTip =
    group === "6-8"   ? "Bahut saral bhasha. Chhote chhote sentences. Har concept ko ek example se samjhao." :
    group === "9-10"  ? "Board exam level. Definitions, processes, data clearly explain karo." :
                        "UPSC analytical depth. Concepts ka broader impact, causes, effects clearly batao."

  return `NCERT Class ${classNum} ${subject}
Chapter: ${chapterName} (${chapterNameHi})
${depthTip}
Target length: ${lengthGuide}

NIYAM:
- Chapter ke HARE EK sub-topic ko cover karo — koi bhi topic skip nahi
- Har heading clearly alag aur bold dikhe (## use karo)
- Sub-headings ke liye ** use karo
- Points ke liye (i)(ii)(iii) use karo  
- Jahan process/cycle/flow samjhana ho → emoji diagram banao
- Jahan comparison ho → table banao
- UPSC connection zaroor batao
- Saral aur pyari Hindi mein likho

FORMAT (exactly isi tarah — headings khuli khuli rakho):

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📖 अध्याय परिचय
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2-3 line mein chapter ka overview aur mahatva]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔹 [Pehla Main Topic ka naam]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[3-4 lines detailed explanation]

**[Sub Topic 1]**
[2-3 lines]
(i) [Point]
(ii) [Point]

**[Sub Topic 2]**
[Explanation]

[Agar diagram chahiye:]
🔄 [Step 1] → [Step 2] → [Step 3] → [Step 4]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔹 [Doosra Main Topic ka naam]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[Explanation]

[Agar comparison chahiye:]
| विषय | [Cheez 1] | [Cheez 2] |
|------|-----------|-----------|
| [Point] | [Value] | [Value] |

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📊 महत्वपूर्ण तथ्य एवं आंकड़े
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(i) [Fact/date/name/formula]
(ii) [Fact]
(iii) [Fact]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🔑 मुख्य शब्दावली (Key Terms)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
**[Term 1]:** [One line definition]
**[Term 2]:** [One line definition]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ⭐ याद रखने योग्य बातें
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
(i) [Most important point]
(ii) [Important point]
(iii) [Important point]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🏛️ UPSC दृष्टि से महत्व
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[2-3 lines: is chapter ka UPSC Prelims/Mains se seedha connection]

IMPORTANT: Har ## heading ke upar-neeche ━━━ line zaroor daalo taaki topics clearly alag dikhen`
}

function getIQPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string): string {
  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  const counts =
    group === "6-8"   ? { short: 8,  long: 5,  analyze: 3 } :
    group === "9-10"  ? { short: 12, long: 8,  analyze: 5 } :
                        { short: 15, long: 10, analyze: 7 }

  const total = counts.short + counts.long + counts.analyze

  return `NCERT Class ${classNum} ${subject}
Chapter: ${chapterName} (${chapterNameHi})

${total} important questions banao (${counts.short} Short + ${counts.long} Long + ${counts.analyze} Analytical).
Chapter ke HARE EK sub-topic se questions aane chahiye.
UPSC Prelims/Mains style mein questions banao.
NOTE: MCQ mat banana — sirf Short, Long aur Analytical questions.

FORMAT:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## ✍️ लघु उत्तरीय प्रश्न (2-3 अंक)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**प्रश्न 1.** [Question - direct, factual]
💡 **उत्तर:** [2-3 line clear answer]

**प्रश्न 2.** [Question]
💡 **उत्तर:** [Answer]

[${counts.short} short questions total — continuously number karo]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 📝 दीर्घ उत्तरीय प्रश्न (5 अंक)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**प्रश्न ${counts.short + 1}.** [Question - detailed, conceptual]
💡 **उत्तर:** [5-6 line detailed answer with examples]

[${counts.long} long questions total]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
## 🧠 विश्लेषणात्मक प्रश्न — UPSC स्तर
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**प्रश्न ${counts.short + counts.long + 1}.** [Higher order analytical question]
🏛️ **UPSC संबंध:** [One line UPSC relevance]
💡 **उत्तर:** [4-5 line analytical answer]

[${counts.analyze} analytical questions total]

RULES:
- MCQ bilkul mat banana
- Saare questions NCERT content se hon
- Questions continuously number karo
- Response POORA complete karo`
}

function getQuizPrompt(scope: string, batchNum: number, topicHint: string, classNum: string): string {
  return `Quiz: ${scope}
Batch ${batchNum} — Focus: ${topicHint}
Class: ${classNum}

10 UNIQUE UPSC-style MCQ questions banao.
- Har question DIFFERENT topic se ho
- Mix: factual + conceptual + application-based
- 1 Assertion-Reason type zaroor ho
- NCERT content se bahar mat jao

SIRF valid JSON array return karo:
[
  {
    "question": "Saral Hindi mein UPSC style question",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Ek line saral explanation kyun sahi hai"
  }
]`
}

function parseQuizJSON(text: string): any[] {
  try {
    const clean = text.replace(/```json|```/g, "").trim()
    const start = clean.indexOf("[")
    const end = clean.lastIndexOf("]")
    if (start === -1 || end === -1) return []
    return JSON.parse(clean.slice(start, end + 1))
  } catch { return [] }
}

export async function GET(request: Request) {
  // ── Rate limit check ──────────────────────────────────────────────────────
  const ip =
    (request.headers as any).get?.("x-forwarded-for")?.split(",")[0]?.trim() ||
    (request.headers as any).get?.("x-real-ip") ||
    "unknown"
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Bahut zyada requests. 1 minute baad try karein." },
      { status: 429 }
    )
  }
  // ─────────────────────────────────────────────────────────────────────────

  const { searchParams } = new URL(request.url)
  const chapterId     = searchParams.get("chapter_id") || ""
  const chapterName   = searchParams.get("chapter_name") || ""
  const chapterNameHi = searchParams.get("chapter_name_hi") || ""
  const subject       = searchParams.get("subject") || ""
  const classNum      = searchParams.get("class") || "6"
  const tab           = searchParams.get("tab") || "notes"
  const quizMode      = searchParams.get("quiz_mode") || "chapter"

  if (!chapterName) return NextResponse.json({ error: "Missing chapter_name" }, { status: 400 })
  if (!GROQ_API_KEY) return NextResponse.json({ error: "GROQ_API_KEY not set" }, { status: 500 })

  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  try {
    if (tab === "notes") {
      const maxTok = group === "6-8" ? 3000 : group === "9-10" ? 4000 : 5000
      const content = await callGroq(getNotesPrompt(chapterName, chapterNameHi, subject, classNum), maxTok)
      return NextResponse.json({ content, chapterId, tab })
    }

    if (tab === "iq") {
      const maxTok = group === "6-8" ? 3500 : group === "9-10" ? 5000 : 6000
      const content = await callGroq(getIQPrompt(chapterName, chapterNameHi, subject, classNum), maxTok)
      return NextResponse.json({ content, chapterId, tab })
    }

    if (tab === "quiz") {
      // Hamesha 2 batches = 20 questions per chapter
      const totalBatches = quizMode === "full"
        ? (group === "6-8" ? 5 : group === "9-10" ? 7 : 10)
        : 2

      const scope = quizMode === "full"
        ? `NCERT Class ${classNum} ${subject}`
        : `NCERT Class ${classNum} ${subject} - ${chapterName}`

      const topicHints = [
        "definitions, basic concepts, key facts",
        "processes, causes, effects, examples",
        "comparisons, applications, UPSC analytical",
        "dates, names, places, statistics",
        "critical thinking, inference based",
        "government schemes, policies, acts",
        "maps, data, case studies",
        "current affairs connection",
        "assertion-reason, match the following style",
        "miscellaneous important topics",
      ]

      const results = await Promise.all(
        Array.from({ length: totalBatches }, (_, i) =>
          callGroq(getQuizPrompt(scope, i + 1, topicHints[i % topicHints.length], classNum), 2048)
        )
      )

      const allQ = results.flatMap(parseQuizJSON)
      const seen = new Set<string>()
      const unique = allQ.filter((q: any) => {
        if (!q?.question || seen.has(q.question)) return false
        seen.add(q.question)
        return true
      })

      return NextResponse.json({ content: JSON.stringify(unique), chapterId, tab, total: unique.length })
    }

    return NextResponse.json({ error: "Invalid tab" }, { status: 400 })

  } catch (error: any) {
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 })
  }
}

export const maxDuration = 60

    
