import { NextResponse } from "next/server"

const SHEET_ID = "1vkT8GN7IPe3pMfQA8BV6gAo04rEbUkbsR4sbAO4-dHQ"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const chapterId = searchParams.get("chapter_id")
  const tab = searchParams.get("tab")

  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&sheet=Sheet1`

  try {
    const res = await fetch(url, { next: { revalidate: 300 } })
    const csv = await res.text()

    // CSV को सही तरीके से parse करो (multi-line cells handle करो)
    const parseCSV = (text: string) => {
      const results: string[][] = []
      let row: string[] = []
      let cell = ""
      let inQuotes = false

      for (let i = 0; i < text.length; i++) {
        const char = text[i]
        const next = text[i + 1]

        if (char === '"' && inQuotes && next === '"') {
          cell += '"'
          i++
        } else if (char === '"') {
          inQuotes = !inQuotes
        } else if (char === ',' && !inQuotes) {
          row.push(cell.trim())
          cell = ""
        } else if ((char === '\n' || char === '\r') && !inQuotes) {
          if (char === '\r' && next === '\n') i++
          row.push(cell.trim())
          results.push(row)
          row = []
          cell = ""
        } else {
          cell += char
        }
      }
      if (cell || row.length) {
        row.push(cell.trim())
        results.push(row)
      }
      return results
    }

    const rows = parseCSV(csv).slice(1) // header skip

    const data = rows
      .map((cols) => ({
        chapter_id: cols[0] || "",
        tab: cols[1] || "",
        content: cols[2] || "",
      }))
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
