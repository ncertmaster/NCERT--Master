import { NextResponse } from "next/server"

const GROQ_API_KEY = process.env.GROQ_API_KEY
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

function getPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string, tab: string): string {
  const context = `NCERT Class ${classNum} ${subject} - Chapter: ${chapterName} (${chapterNameHi})`

  if (tab === "notes") {
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

  if (tab === "iq") {
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

  if (tab === "quiz") {
    return `Create exactly 10 MCQ questions for NCERT Class ${classNum} ${subject} - ${chapterName}.

Return ONLY a valid JSON array, no extra text:
[
  {
    "question": "Question text in Hindi",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Why this answer is correct"
  }
]`
  }

  return `${context} ke baare mein Hindi mein batao.`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chapterId = searchParams.get("chapter_id") || ""
  const chapterName = searchParams.get("chapter_name") || ""
  const chapterNameHi = searchParams.get("chapter_name_hi") || ""
  const subject = searchParams.get("subject") || ""
  const classNum = searchParams.get("class") || ""
  const tab = searchParams.get("tab") || "notes"

  if (!chapterName) {
    return NextResponse.json({ error: "Missing chapter_name" }, { status: 400 })
  }

  const prompt = getPrompt(chapterName, chapterNameHi, subject, classNum, tab)

  try {
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
    const content = data?.choices?.[0]?.message?.content || ""

    return NextResponse.json({ content, chapterId, tab })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
      }
