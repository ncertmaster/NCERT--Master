import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

// ─── Class group helper ───────────────────────────────────────────────────────
function getClassGroup(cls: number): "6-8" | "9-10" | "11-12" {
  if (cls <= 8) return "6-8"
  if (cls <= 10) return "9-10"
  return "11-12"
}

// ─── Groq caller ─────────────────────────────────────────────────────────────
async function callGroq(prompt: string, maxTokens = 3000): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.4,
      max_tokens: maxTokens,
    })
  })
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTES PROMPT
// ─────────────────────────────────────────────────────────────────────────────
function getNotesPrompt(
  chapterName: string,
  chapterNameHi: string,
  subject: string,
  classNum: string
): string {
  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  const lengthGuide =
    group === "6-8"  ? "400–600 words" :
    group === "9-10" ? "600–900 words" :
                       "900–1400 words"

  return `Tu ek expert NCERT teacher hai. Tera kaam hai bahut saral, sundar aur samjhne mein aasaan notes likhna.

Chapter: NCERT Class ${classNum} ${subject} - ${chapterName} (${chapterNameHi})

NOTES LIKHNE KE NIYAM:
- Bhasha: Saral Hindi jo koi bhi bachcha samajh sake
- Length: ${lengthGuide} (strictly follow karo)
- Chapter ke 100% content ko cover karo — saare sub-topics, examples, diagrams (text mein describe karo), maps, tables, graphs, case studies — KUCH BHI MISS NAHI HONA CHAHIYE
- Har NCERT fact, definition, date, naam, formula include karo
- UPSC foundation ke liye important points zaroor daalo
- Jahan process, cycle, structure ya comparison samjhana ho — wahan TEXT DIAGRAM ya EMOJI DIAGRAM zaroor banao
- Dikhne mein pyara aur organized hona chahiye

FORMAT (exactly isi tarah likho):

## 📖 Parichay (Introduction)
[2-3 line mein chapter ka saral parichay aur mahatva]

## 📌 Mukhya Vishay aur Sub-topics
[Har sub-topic ke liye full bullet points. Har bullet 2-3 lines. Saare NCERT examples, data, figures text mein describe karo]

[Agar koi process/cycle/flow ho toh TEXT DIAGRAM banao, jaise:]
🌧️ Baadal → ⬇️ Varsha → 🏞️ Nadi → 🌊 Sagar → ☀️ Vashpikaran → 🌧️ Baadal

[Agar koi structure/parts hon toh visual banao]

[Agar comparison ho toh TABLE banao:]
| Cheez 1 | Cheez 2 |
|---------|---------|
| Point   | Point   |

## 📊 Mahatvapurn Tathya, Ankde aur Jaankari
[Saari tables, statistics, diagrams, maps bullet points mein]

## 📝 Saar (Summary)
[5-8 crisp bullet points mein poore chapter ka recap]

## 🏛️ UPSC Foundation Link
[2-3 bullets: is chapter ke concepts ka UPSC Prelims/Mains se sambandh — specific topics, papers]

## 🔑 Mukhya Shabdavali (Key Terms)
[10-15 important terms with one-line definitions]

FORMATTING RULES:
- ## = bold heading
- ** = bold text
- Diagrams se concept zyada clear hota hai — zaroor use karo
- Tables se comparison zyada clear hoti hai
- Do NOT skip any NCERT sub-topic
- Do NOT add content not in NCERT`
}

// ─────────────────────────────────────────────────────────────────────────────
// IQ PROMPT
// ─────────────────────────────────────────────────────────────────────────────
function getIQPrompt(
  chapterName: string,
  chapterNameHi: string,
  subject: string,
  classNum: string
): string {
  const cls = parseInt(classNum)
  const group = getClassGroup(cls)

  // Question counts per class group
  const counts =
    group === "6-8"  ? { short: 7,  long: 5,  analyze: 5,  total: 17 } :
    group === "9-10" ? { short: 9,  long: 9,  analyze: 7,  total: 25 } :
                       { short: 12, long: 14, analyze: 9,  total: 35 }

  const rangeNote =
    group === "6-8"  ? "15–20 questions" :
    group === "9-10" ? "20–25+ questions" :
                       "25–40+ questions"

  return `Tu ek expert NCERT teacher hai jo UPSC foundation ke liye questions banata hai.

Chapter: NCERT Class ${classNum} ${subject} - ${chapterName} (${chapterNameHi})

TARGET: ${rangeNote} (${counts.total} questions generate karo)
COVERAGE: Questions poore chapter ko cover karein — saare sub-topics, examples, case studies, data.

QUESTION BREAKDOWN:
- ${counts.short} Laghu Uttariya Prashn / Short Answer (1–2 marks, 2–3 line answer)
- ${counts.long} Dirgha Uttariya Prashn / Long Answer (3–5 marks, paragraph answer)
- ${counts.analyze} Vishleshan / Analyze Questions (5 marks, critical thinking)

FORMAT:

## बहुविकल्पीय प्रश्न — MCQ 🎯
[Pehle 5 MCQ questions — easy se medium difficulty]

**प्रश्न 1.** [Question text]
(A) [Option]  (B) [Option]  (C) [Option]  (D) [Option]
✅ सही उत्तर: ([Letter]) [Option text]
🏛️ UPSC: [One line UPSC relevance ya "Direct connection nahi"]

## लघु उत्तरीय प्रश्न ✍️ (${counts.short} Questions)

**प्रश्न 1.** [Question]
- Marks: 2
- 🏛️ UPSC Basic: [relevance]
- 💡 Answer: [2-3 line answer]

[Continue for all ${counts.short} short questions]

## दीर्घ उत्तरीय प्रश्न 📝 (${counts.long} Questions)

**प्रश्न 1.** [Question]
- Marks: 5
- 🏛️ UPSC Basic: [relevance]
- 💡 Answer: [5-6 line detailed answer]

[Continue for all ${counts.long} long questions]

## विश्लेषणात्मक प्रश्न 🧠 (${counts.analyze} Questions)

**प्रश्न 1.** [Higher order / analytical question]
- Marks: 5
- 🏛️ UPSC Basic: [relevance — these should have strong UPSC link]
- 💡 Answer: [Analytical answer 4-5 lines]

[Continue for all ${counts.analyze} analyze questions]

RULES:
- Saare questions actual NCERT content se hon
- Factual, conceptual aur application-based questions mix karo
- Class ${classNum} ke hisab se appropriate difficulty
- Questions Q1 se Q${counts.total} tak continuously number karo
- Koi bhi sub-topic miss mat karo`
}

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ PROMPT
// ─────────────────────────────────────────────────────────────────────────────
function getQuizPrompt(
  scope: string,
  batchNum: number,
  topicHint: string,
  classNum: string
): string {
  return `Tu ek expert NCERT quiz maker hai.

Quiz ke liye: ${scope}
Batch: ${batchNum}
Topic focus: ${topicHint}
Class: ${classNum}

Bilkul alag 10 MCQ questions banao jo is batch mein unique hon.
Class ${classNum} level ke hisab se difficulty rakho.
UPSC foundation cover karo.
Har batch mein ek Assertion-Reason question zaroor ho.

SIRF JSON array return karo, kuch aur mat likho:
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

// ─────────────────────────────────────────────────────────────────────────────
// Quiz batch counts per class group
// ─────────────────────────────────────────────────────────────────────────────
function getQuizBatchCounts(cls: number, quizMode: string): number {
  const group = getClassGroup(cls)
  if (quizMode === "full") {
    // Full subject mode — more batches
    return group === "6-8" ? 5 : group === "9-10" ? 7 : 10
  } else {
    // Chapter mode:
    // 6-8  → target 15–20 MCQs → 2 batches (20 questions)
    // 9-10 → target 20–25+ MCQs → 3 batches (30 questions)
    // 11-12→ target 25–40+ MCQs → 4 batches (40 questions)
    return group === "6-8" ? 2 : group === "9-10" ? 3 : 4
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Max tokens per tab & class group
// ─────────────────────────────────────────────────────────────────────────────
function getMaxTokens(tab: string, cls: number): number {
  const group = getClassGroup(cls)
  if (tab === "notes") {
    return group === "6-8" ? 1800 : group === "9-10" ? 2500 : 3500
  }
  if (tab === "iq") {
    return group === "6-8" ? 2500 : group === "9-10" ? 3500 : 4500
  }
  return 2048 // quiz per batch
}

// ─────────────────────────────────────────────────────────────────────────────
// JSON parser for quiz
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// MAIN GET HANDLER
// ─────────────────────────────────────────────────────────────────────────────
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

  const cls = parseInt(classNum)

  try {
    // ── NOTES ──────────────────────────────────────────────────────────────
    if (tab === "notes") {
      const maxTokens = getMaxTokens("notes", cls)
      const content = await callGroq(
        getNotesPrompt(chapterName, chapterNameHi, subject, classNum),
        maxTokens
      )
      return NextResponse.json({ content, chapterId, tab })
    }

    // ── IQ ─────────────────────────────────────────────────────────────────
    if (tab === "iq") {
      const maxTokens = getMaxTokens("iq", cls)
      const content = await callGroq(
        getIQPrompt(chapterName, chapterNameHi, subject, classNum),
        maxTokens
      )
      return NextResponse.json({ content, chapterId, tab })
    }

    // ── QUIZ ────────────────────────────────────────────────────────────────
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

      const batchPromises = Array.from({ length: totalBatches }, (_, i) =>
        callGroq(
          getQuizPrompt(scope, i + 1, topicHints[i % topicHints.length], classNum),
          2048
        )
      )

      const results = await Promise.all(batchPromises)
      const allQ = results.flatMap(parseQuizJSON)

      // Deduplicate
      const seen = new Set<string>()
      const unique = allQ.filter((q: any) => {
        if (!q?.question || seen.has(q.question)) return false
        seen.add(q.question)
        return true
      })

      // Add quiz footer metadata
      const group = getClassGroup(cls)
      const timeLimit = group === "6-8" ? "5 min" : group === "9-10" ? "6 min" : "7 min"

      return NextResponse.json({
        content: JSON.stringify(unique),
        chapterId,
        tab,
        total: unique.length,
        meta: {
          timeLimit,
          negativeMarking: "-1 per wrong answer",
          classGroup: group,
        }
      })
    }

    return NextResponse.json({ error: "Invalid tab" }, { status: 400 })

  } catch (error) {
    console.error("Content API error:", error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
    }
      
