import { NextResponse } from "next/server"

const SHEET_ID = "1vkT8GN7IPe3pMfQA8BV6gAo04rEbUkbsR4sbAO4-dHQ"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chapterId = searchParams.get("chapter_id")
  const tab = searchParams.get("tab")

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&sheet=Sheet1`

  try {
    const res = await fetch(url, { cache: "no-store" })
    const csv = await res.text()

    const rows = csv.split("\n").slice(1)
    
    const data = rows
      .map((row) => {
        const cols = row.split(",")
        const chapter_id = cols[0]?.replace(/"/g, "").trim()
        const tabVal = cols[1]?.replace(/"/g, "").trim()
        // Content में commas हो सकते हैं इसलिए बाकी सब join करो
        const content = cols.slice(2).join(",").replace(/"/g, "").trim()
        return { chapter_id, tab: tabVal, content }
      })
      .filter((r) => {
        if (!r.chapter_id) return false
        if (chapterId && r.chapter_id !== chapterId) return false
        if (tab && r.tab !== tab) return false
        return true
      })

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: "Sheet fetch failed" }, { status: 500 })
  }
}
