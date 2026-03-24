import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

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
MANDATORY RULES — inn ko kabhi mat todo:
1. POORA content HINDI (Devanagari script) mein likhna hai
2. Roman/English script mein KUCH BHI mat likho — headings, bullets, explanations sab Hindi mein
3. Scientific/technical terms: Hindi mein likho + bracket mein English: जैसे "प्रकाश संश्लेषण (Photosynthesis)"
4. Format aur structure bilkul waise rakho jaisa prompt mein bola gaya hai
5. NCERT content se bahar bilkul mat jao
6. Content COMPLETE karo — beech mein mat rokna, poora response bhejo`,
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.3,
      max_tokens: maxTokens,
    }),
  })

  if (!res.ok) {
    const errBody = await res.text().catch(() => "")
    throw new Error(`Groq API error ${res.status}: ${errBody}`)
  }

  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

function getNotesPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string): string {
  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  const lengthGuide =
    group === "6-8"  ? "500–700 words (saral bhasha, examples ke saath)" :
    group === "9-10" ? "800–1100 words (detailed, formulas aur data ke saath)" :
                       "1100–1600 words (comprehensive, UPSC level depth ke saath)"

  const difficultyTip =
    group === "6-8"  ? "Bahut saral bhasha use karo. Bacche ke liye samjhana hai." :
    group === "9-10" ? "Thodi complexity theek hai. Board exam ke liye useful banao." :
                       "University entry level. Analytical depth chahiye. UPSC connection strong ho."

  return `Tu ek expert NCERT teacher hai. Tera kaam hai bahut saral, sundar aur samjhne mein aasaan notes likhna.

Chapter: NCERT Class ${classNum} ${subject} - ${chapterName} (${chapterNameHi})
${difficultyTip}

NOTES LIKHNE KE NIYAM:
- Bhasha: Saral Hindi jo koi bhi bachcha samajh sake
- Length: ${lengthGuide}
- Chapter ke 100% content ko cover karo — saare sub-topics, examples, diagrams (text mein describe karo), maps, tables, graphs, case studies
- Har NCERT fact, definition, date, naam, formula include karo
- UPSC foundation ke liye important points zaroor daalo
- Jahan process, cycle, structure ya comparison samjhana ho — TEXT DIAGRAM ya EMOJI DIAGRAM banao
- Dikhne mein pyara aur organized hona chahiye

FORMAT (exactly isi tarah likho):

## 📖 परिचय (Introduction)
[2-3 line mein chapter ka saral parichay aur mahatva]

## 📌 मुख्य विषय एवं उप-विषय
[Har sub-topic ke liye full bullet points. Har bullet 2-3 lines. Saare NCERT examples, data, figures text mein describe karo]

[Agar koi process/cycle/flow ho toh TEXT DIAGRAM banao:
🌧️ बादल → ⬇️ वर्षा → 🏞️ नदी → 🌊 सागर → ☀️ वाष्पीकरण → 🌧️ बादल]

[Agar koi comparison ho toh TABLE banao:]
| विषय | बिंदु 1 | बिंदु 2 |
|------|---------|---------|
| ... | ... | ... |

## 📊 महत्वपूर्ण तथ्य, आंकड़े एवं जानकारी
[Saari tables, statistics, diagrams, maps bullet points mein]

## 📝 सार (Summary)
[6-8 crisp bullet points mein poore chapter ka recap]

## 🏛️ UPSC Foundation Link
[2-3 bullets: is chapter ke concepts ka UPSC Prelims/Mains se sambandh]

## 🔑 मुख्य शब्दावली (Key Terms)
[10-15 important terms with one-line definitions]

FORMATTING RULES:
- ## = bold heading with emoji
- **text** = bold text
- Diagrams se concept zyada clear hota hai — zaroor use karo
- Tables se comparison zyada clear hoti hai
- Do NOT skip any NCERT sub-topic
- Do NOT add content not in NCERT
- Response POORA complete karo, beech mein mat rokna`
}

function getIQPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string): string {
  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  const counts =
    group === "6-8"  ? { mcq: 5, short: 7,  long: 5,  analyze: 3 } :
    group === "9-10" ? { mcq: 5, short: 9,  long: 9,  analyze: 6 } :
                       { mcq: 5, short: 12, long: 14, analyze: 9 }

  return `Tu ek expert NCERT teacher hai jo UPSC foundation ke liye questions banata hai.

Chapter: NCERT Class ${classNum} ${subject} - ${chapterName} (${chapterNameHi})

QUESTION BREAKDOWN:
- ${counts.mcq} MCQ questions (easy to medium)
- ${counts.short} Laghu Uttariya Prashn / Short Answer (2-3 lines)
- ${counts.long} Dirgha Uttariya Prashn / Long Answer (5-6 lines)
- ${counts.analyze} Vishleshan / Analytical Questions (UPSC-style)

COVERAGE: Poore chapter ko cover karo — saare sub-topics, examples, case studies, data.

FORMAT (exactly isi tarah likho):

## बहुविकल्पीय प्रश्न — MCQ 🎯

**प्रश्न 1.** [Question text]
(A) [Option]  (B) [Option]  (C) [Option]  (D) [Option]
✅ सही उत्तर: ([Letter]) [Option text]
🏛️ UPSC: [One line UPSC relevance]

[Continue for all ${counts.mcq} MCQs]

## लघु उत्तरीय प्रश्न ✍️

**प्रश्न ${counts.mcq + 1}.** [Question]
- अंक: 2
- 🏛️ UPSC: [relevance]
- 💡 उत्तर: [2-3 line answer]

[Continue for all ${counts.short} short questions]

## दीर्घ उत्तरीय प्रश्न 📝

**प्रश्न [N].** [Question]
- अंक: 5
- 🏛️ UPSC: [relevance]
- 💡 उत्तर: [5-6 line detailed answer]

[Continue for all ${counts.long} long questions]

## विश्लेषणात्मक प्रश्न 🧠

**प्रश्न [N].** [Higher order / analytical question]
- अंक: 5
- 🏛️ UPSC: [Strong UPSC connection]
- 💡 उत्तर: [Analytical answer 4-5 lines]

[Continue for all ${counts.analyze} analytical questions]

RULES:
- Saare questions actual NCERT content se hon
- Factual, conceptual aur application-based questions mix karo
- Class ${classNum} ke hisab se appropriate difficulty
- Questions continuously number karo
- Response POORA complete karo`
}

function getQuizPrompt(scope: string, batchNum: number, topicHint: string, classNum: string): string {
  return `Tu ek expert NCERT quiz maker hai.

Quiz ke liye: ${scope}
Batch: ${batchNum}
Topic focus: ${topicHint}
Class: ${classNum}

Bilkul alag 10 MCQ questions banao jo is batch mein unique hon.
Class ${classNum} level ke hisab se difficulty rakho.
UPSC foundation cover karo.
Har batch mein ek Assertion-Reason question zaroor ho.

SIRF valid JSON array return karo, kuch aur mat likho:
[
  {
    "question": "Saral Hindi mein question",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Ek line mein saral explanation",
    "difficulty": "easy|medium|hard",
    "type": "normal|assertion-reason|upsc-style"
  }
]`
}

function getQuizBatchCounts(cls: number, quizMode: string): number {
  const group = getClassGroup(cls)
  if (quizMode === "full") {
    return group === "6-8" ? 5 : group === "9-10" ? 7 : 10
  }
  return group === "6-8" ? 2 : group === "9-10" ? 3 : 4
}

function getMaxTokens(tab: string, cls: number): number {
  const group = getClassGroup(cls)
  if (tab === "notes") {
    return group === "6-8" ? 3000 : group === "9-10" ? 4000 : 5000
  }
  if (tab === "iq") {
    return group === "6-8" ? 3500 : group === "9-10" ? 5000 : 6000
  }
  return 2048
}

function parseQuizJSON(text: string): any[] {
  try {
    const clean = text.replace(/```json|```/g, "").trim()
    const start = clean.indexOf("[")
    const end = clean.lastIndexOf("]")
    if (start === -1 || end === -1) return []
    return JSON.parse(clean.slice(start, end + 1))
  } catch {
    return []
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chapterId     = searchParams.get("chapter_id") || ""
  const chapterName   = searchParams.get("chapter_name") || ""
  const chapterNameHi = searchParams.get("chapter_name_hi") || ""
  const subject       = searchParams.get("subject") || ""
  const classNum      = searchParams.get("class") || "6"
  const tab           = searchParams.get("tab") || "notes"
  const quizMode      = searchParams.get("quiz_mode") || "chapter"

  if (!chapterName) {
    return NextResponse.json({ error: "Missing chapter_name" }, { status: 400 })
  }

  if (!GROQ_API_KEY) {
    return NextResponse.json({ error: "GROQ_API_KEY not configured" }, { status: 500 })
  }

  const cls = parseInt(classNum)

  try {
    if (tab === "notes") {
      const content = await callGroq(getNotesPrompt(chapterName, chapterNameHi, subject, classNum), getMaxTokens("notes", cls))
      if (!content) throw new Error("Empty response from Groq")
      return NextResponse.json({ content, chapterId, tab })
    }

    if (tab === "iq") {
      const content = await callGroq(getIQPrompt(chapterName, chapterNameHi, subject, classNum), getMaxTokens("iq", cls))
      if (!content) throw new Error("Empty response from Groq")
      return NextResponse.json({ content, chapterId, tab })
    }

    if (tab === "quiz") {
      const totalBatches = getQuizBatchCounts(cls, quizMode)
      const scope = quizMode === "full"
        ? `NCERT Class ${classNum} ${subject} (pure subject)`
        : `NCERT Class ${classNum} ${subject} - Chapter: ${chapterName}`

      const topicHints = [
        "definitions, basic concepts, introduction",
        "important facts, key terms, dates, names",
        "processes, causes and effects, sequences",
        "comparisons, examples, real-world applications",
        "UPSC style — analytical, higher-order questions",
        "map based, data based, table based if applicable",
        "government schemes, policies, acts if applicable",
        "critical thinking, inference based",
        "current affairs connection",
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

      const group = getClassGroup(cls)
      return NextResponse.json({
        content: JSON.stringify(unique),
        chapterId,
        tab,
        total: unique.length,
        meta: {
          timeLimit: group === "6-8" ? "5 min" : group === "9-10" ? "6 min" : "7 min",
          negativeMarking: "-1 per wrong answer",
          classGroup: group,
        },
      })
    }

    return NextResponse.json({ error: "Invalid tab" }, { status: 400 })

  } catch (error: any) {
    console.error("Content API error:", error)
    return NextResponse.json({ error: error?.message || String(error) }, { status: 500 })
  }
}

export const maxDuration = 60
