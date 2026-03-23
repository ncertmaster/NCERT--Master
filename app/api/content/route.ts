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

function getNotesPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string): string {
  const cls = parseInt(classNum)
  let lengthGuide = "250-300 words"
  if (cls >= 9 && cls <= 10) lengthGuide = "300-500 words"
  if (cls >= 11) lengthGuide = "500-700 words"

  return `Tu ek expert NCERT teacher hai. Tera kaam hai bahut saral, sundar aur samjhne mein aasaan notes likhna.

Chapter: NCERT Class ${classNum} ${subject} - ${chapterName} (${chapterNameHi})

NOTES LIKHNE KE NIYAM:
- Bhasha: Saral Hindi jo koi bhi bachcha samajh sake
- Length: ${lengthGuide} (chapter ki importance ke hisab se badha sakte ho)
- Har chote bade topic ko cover karo
- UPSC foundation ke liye important points zaroor daalo
- Jahan process, cycle, structure ya comparison samjhana ho — wahan TEXT DIAGRAM ya EMOJI DIAGRAM zaroor banao
- Dikhne mein pyara aur organized hona chahiye

FORMAT (exactly isi tarah likho):

## [Chapter ka naam - ek line overview]
[2-3 line mein chapter ka saral parichay]

## [Pehla Main Topic]
[3-4 lines mein saral explanation]

**[Sub Topic]**
[2-3 lines]

(i) [Important point]
(ii) [Important point]
(iii) [Important point]

[Agar koi process/cycle/flow ho toh TEXT DIAGRAM banao, jaise:]
🌧️ Baadal → ⬇️ Varsha → 🏞️ Nadi → 🌊 Sagar → ☀️ Vashpikaran → 🌧️ Baadal

[Agar koi structure/parts hon toh:]
         🌍 Prithvi
        /    |    \\
   🏔️ Bhumi 🌊 Jal 💨 Vayu

[Agar comparison ho toh TABLE banao:]
| Cheez 1 | Cheez 2 |
|---------|---------|
| Point   | Point   |

## [Doosra Main Topic]
[Explanation + diagram agar zaroorat ho]

## Yaad Rakhne Wali Baatein ⭐
(i) [Most important point]
(ii) [Important point]
(iii) [UPSC ke liye important]

FORMATTING RULES:
- ## = laal bold heading
- ** = kala bold  
- (i)(ii)(iii) = numbered points
- Diagrams se concept zyada clear hota hai — zaroor use karo
- Tables se comparison zyada clear hoti hai`
}

function getIQPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string): string {
  const cls = parseInt(classNum)
  let mcqCount = "10", shortCount = "15", essayCount = "10"
  if (cls >= 9 && cls <= 10) { mcqCount = "12"; shortCount = "17"; essayCount = "12" }
  if (cls >= 11) { mcqCount = "15"; shortCount = "20"; essayCount = "15" }

  return `Tu ek expert NCERT teacher hai jo UPSC foundation ke liye questions banata hai.

Chapter: NCERT Class ${classNum} ${subject} - ${chapterName} (${chapterNameHi})

Bilkul saral aur sundar format mein questions banao jo pure chapter aur UPSC foundation cover kare.

FORMAT:

## बहुविकल्पीय प्रश्न (MCQ) 🎯
[${mcqCount} MCQ questions]

**प्रश्न 1.** [Question text]
(A) [Option]  (B) [Option]  (C) [Option]  (D) [Option]
✅ सही उत्तर: [Letter] - [Option text]

## लघु उत्तरीय प्रश्न ✍️
[${shortCount} short questions - 2-3 line answer]

**प्रश्न 1.** [Question]
**उत्तर:** [2-3 line simple answer]

## दीर्घ उत्तरीय प्रश्न 📝
[${essayCount} essay questions - 5-7 line answer]

**प्रश्न 1.** [Question]
**उत्तर:** [5-7 line detailed answer]

## UPSC स्तर के प्रश्न 🏆
[5 UPSC style questions with answers]

**प्रश्न 1.** [Higher order question]
**उत्तर:** [Detailed answer]

RULES:
- Bhasha saral Hindi mein
- Pure chapter cover karo
- UPSC foundation important hai`
}

function getQuizPrompt(scope: string, batchNum: number, topicHint: string, classNum: string): string {
  return `Tu ek expert NCERT quiz maker hai.

Quiz ke liye: ${scope}
Batch: ${batchNum}
Topic focus: ${topicHint}

Bilkul alag 10 MCQ questions banao jo is batch mein unique hon.
Class ${classNum} level ke hisab se difficulty rakho.
UPSC foundation cover karo.

SIRF JSON array return karo, kuch aur mat likho:
[
  {
    "question": "Saral Hindi mein question",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Ek line mein saral explanation"
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
  const classNum = searchParams.get("class") || "6"
  const tab = searchParams.get("tab") || "notes"
  const quizMode = searchParams.get("quiz_mode") || "chapter"

  if (!chapterName) {
    return NextResponse.json({ error: "Missing chapter_name" }, { status: 400 })
  }

  try {
    if (tab === "notes") {
      const content = await callGroq(getNotesPrompt(chapterName, chapterNameHi, subject, classNum))
      return NextResponse.json({ content, chapterId, tab })
    }

    if (tab === "iq") {
      const content = await callGroq(getIQPrompt(chapterName, chapterNameHi, subject, classNum))
      return NextResponse.json({ content, chapterId, tab })
    }

    if (tab === "quiz") {
      const cls = parseInt(classNum)
      let totalBatches = 2
      if (quizMode === "full") {
        if (cls <= 8) totalBatches = 5
        else if (cls <= 10) totalBatches = 7
        else totalBatches = 10
      } else {
        if (cls <= 8) totalBatches = 2
        else if (cls <= 10) totalBatches = 3
        else totalBatches = 5
      }

      const scope = quizMode === "full"
        ? `NCERT Class ${classNum} ${subject} (pure subject)`
        : `NCERT Class ${classNum} ${subject} - Chapter: ${chapterName}`

      const topicHints = [
        "definitions, basic concepts, introduction",
        "important facts, key terms, dates",
        "processes, causes and effects",
        "comparisons, examples, applications",
        "UPSC style - analytical questions",
        "map based, data based if applicable",
        "government schemes, policies",
        "critical thinking based",
        "current affairs connection",
        "miscellaneous important topics",
      ]

      const batchPromises = Array.from({ length: totalBatches }, (_, i) =>
        callGroq(getQuizPrompt(scope, i + 1, topicHints[i % topicHints.length], classNum))
      )

      const results = await Promise.all(batchPromises)
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

  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
