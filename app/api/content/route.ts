import { NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`

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

## [Agla Main Topic]

Rules:
- ## se red bold heading banegi
- ** se bold subheading banegi
- (i)(ii)(iii) se numbered points
- Sabse pehle chapter ka ek line overview do
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
- Mix of 1 mark, 3 mark aur 5 mark questions
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
]

Rules:
- Questions Hindi mein, options Hindi ya English
- Mix of easy, medium, hard difficulty
- UPSC/government exam style questions
- correctIndex is 0-based index of correct option`
  }

  return ""
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chapterId = searchParams.get("chapter_id") || ""
  const chapterName = searchParams.get("chapter_name") || ""
  const chapterNameHi = searchParams.get("chapter_name_hi") || ""
  const subject = searchParams.get("subject") || ""
  const classNum = searchParams.get("class") || ""
  const tab = searchParams.get("tab") || "notes"

  if (!chapterName || !tab) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 })
  }

  const prompt = getPrompt(chapterName, chapterNameHi, subject, classNum, tab)

  try {
    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 2048,
        }
      }),
      next: { revalidate: 86400 }
    })

    const data = await res.json()
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || ""

    return NextResponse.json({ content, chapterId, tab })
  } catch (error) {
    return NextResponse.json({ error: "AI content load नहीं हो सका।" }, { status: 500 })
  }
}
