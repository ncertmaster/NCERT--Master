import { NextResponse } from "next/server"

const GEMINI_API_KEY = process.env.GEMINI_API_KEY
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-04-17:generateContent?key=${GEMINI_API_KEY}`

function getPrompt(chapterName: string, chapterNameHi: string, subject: string, classNum: string, tab: string): string {
  const context = `NCERT Class ${classNum} ${subject} - Chapter: ${chapterName} (${chapterNameHi})`

  if (tab === "notes") {
    return `Tu ek expert NCERT teacher hai. ${context} ke comprehensive Hindi notes banao. Minimum 300 words.`
  }
  if (tab === "iq") {
    return `Tu ek expert NCERT teacher hai. ${context} ke 10 important questions aur answers Hindi mein banao.`
  }
  if (tab === "quiz") {
    return `Create 10 MCQ questions for ${context}. Return ONLY JSON array: [{"question":"...","options":["A","B","C","D"],"correctIndex":0}]`
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
    const res = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })

    const data = await res.json()
    
    // Full response return karo debug ke liye
    const content = data?.candidates?.[0]?.content?.parts?.[0]?.text || ""
    
    return NextResponse.json({ 
      content, 
      chapterId, 
      tab,
      debug: data?.error || data?.promptFeedback || null
    })
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
