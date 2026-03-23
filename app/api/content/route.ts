import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

async function callGroq(prompt: string): Promise<string> {
  const res = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2048,
    })
  })
  const data = await res.json()
  return data?.choices?.[0]?.message?.content || ""
}

function getNotesPrompt(context: string): string {
  return `Tu ek expert NCERT teacher hai jo UPSC, RAS aur government exams ki preparation karata hai.

Chapter: ${context}

Is chapter ke comprehensive Hindi notes banao. Format exactly aisa hona chahiye:

## [Main Topic Heading]
[Topic ki explanation 2-3 lines mein]

**[Sub Topic]**
[Sub topic ki explanation]

(i) [Point 1]
(ii) [Point 2]
(iii) [Point 3]

Rules:
- ## se red bold heading banegi
- ** se bold subheading banegi
- (i)(ii)(iii) se numbered points
- UPSC/government exam ke important points zaroor include karo
- Hindi mein likho, technical terms English mein rakh sakte ho
- Minimum 400 words ka content do`
}

function getIQPrompt(context: string): string {
  return `Tu ek expert NCERT teacher hai jo UPSC, RAS aur government exams ki preparation karata hai.

Chapter: ${context}

Is chapter ke important questions aur unke answers Hindi mein banao. Format:

## महत्वपूर्ण प्रश्न

**प्रश्न 1: [Question]**
उत्तर: [2-3 line detailed answer]

**प्रश्न 2: [Question]**
उत्तर: [Answer]

## UPSC/RAS स्तर के प्रश्न

**प्रश्न: [Higher order question]**
उत्तर: [Detailed answer]

Rules:
- Minimum 10 questions do
- UPSC previous year related questions zaroor include karo
- Hindi mein likho`
}

function getQuizPrompt(scope: string, batchNum: number, topicsHint: string): string {
  return `Create exactly 10 unique MCQ questions for ${scope}.
This is batch ${batchNum} - create DIFFERENT questions from previous batches.
Focus on: ${topicsHint}

Return ONLY a valid JSON array, no extra text, no markdown:
[
  {
    "question": "Question text in Hindi",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Ek line mein explanation Hindi mein"
  }
]

Rules:
- Questions Hindi mein
- Mix of easy, medium, hard
- UPSC/government exam style
- correctIndex is 0-based index
- All 10 questions must be unique and different`
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
  const chapterId = searchParams.get("chapter_id") || ""
  const chapterName = searchParams.get("chapter_name") || ""
  const chapterNameHi = searchParams.get("chapter_name_hi") || ""
  const subject = searchParams.get("subject") || ""
  const classNum = searchParams.get("class") || ""
  const tab = searchParams.get("tab") || "notes"
  const quizMode = searchParams.get("quiz_mode") || "chapter"

  if (!chapterName) {
    return NextResponse.json({ error: "Missing chapter_name" }, { status: 400 })
  }

  const context = `NCERT Class ${classNum} ${subject} - Chapter: ${chapterName} (${chapterNameHi})`

  try {
    // Notes aur IQ — single call
    if (tab === "notes") {
      const content = await callGroq(getNotesPrompt(context))
      return NextResponse.json({ content, chapterId, tab })
    }

    if (tab === "iq") {
      const content = await callGroq(getIQPrompt(context))
      return NextResponse.json({ content, chapterId, tab })
    }

    // Quiz — multiple calls
    if (tab === "quiz") {
      const classNumber = parseInt(classNum) || 6

      // Chapter wise: 2 batches = 20 questions
      // Subject wise: class ke hisaab se batches
      let totalBatches = 2
      if (quizMode === "full") {
        if (classNumber <= 8) totalBatches = 10       // ~100 questions
        else if (classNumber <= 10) totalBatches = 15  // ~150 questions
        else totalBatches = 20                          // ~200 questions
      }

      const scope = quizMode === "full"
        ? `NCERT Class ${classNum} ${subject} (pure subject se)`
        : `NCERT Class ${classNum} ${subject} - Chapter: ${chapterName}`

      const topicHints = [
        "definitions, basic concepts, introduction",
        "important facts, dates, key terms",
        "processes, methods, how things work",
        "comparisons, differences, similarities",
        "causes and effects, reasons",
        "examples, case studies, applications",
        "diagrams, structures, parts",
        "historical context, background",
        "modern relevance, current affairs connection",
        "UPSC previous year style questions",
        "critical thinking, analysis based",
        "map based, location based if applicable",
        "numerical, data based if applicable",
        "government schemes, policies related",
        "environment, ecology related if applicable",
        "social issues, human rights related",
        "economic aspects",
        "scientific principles",
        "cultural aspects",
        "miscellaneous important topics",
      ]

      // Parallel calls karo — faster response
      const batchPromises = Array.from({ length: totalBatches }, (_, i) =>
        callGroq(getQuizPrompt(scope, i + 1, topicHints[i % topicHints.length]))
      )

      const batchResults = await Promise.all(batchPromises)
      const allQuestions = batchResults.flatMap(parseQuizJSON)

      // Duplicates hatao question text ke basis pe
      const seen = new Set<string>()
      const uniqueQuestions = allQuestions.filter((q: any) => {
        if (!q?.question || seen.has(q.question)) return false
        seen.add(q.question)
        return true
      })

      return NextResponse.json({
        content: JSON.stringify(uniqueQuestions),
        chapterId,
        tab,
        total: uniqueQuestions.length
      })
    }

    return NextResponse.json({ error: "Invalid tab" }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
      }
