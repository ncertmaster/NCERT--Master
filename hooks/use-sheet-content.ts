"use client"

import { useState, useEffect } from "react"

const SHEET_ID = "1FgrIlKKhP9vwIXV6hn0ok3IxpZxgQbuTlSfstG7m-sE"
const SHEET_NAME = "Sheet1"

export function useSheetContent(chapterId: string | null, tab: string) {
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!chapterId) {
      setLoading(false)
      return
    }

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}&headers=1`

    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        // Remove Google's wrapper
        const cleanText = text.replace(/^[^{]*/, "").replace(/[^}]*$/, "")
        const json = JSON.parse(cleanText)
        const rows = json.table.rows

        if (!rows || rows.length === 0) {
          setContent("")
          setLoading(false)
          return
        }

        const match = rows.find(
          (row: any) =>
            row.c?.[0]?.v?.toString().trim() === chapterId.trim() &&
            row.c?.[1]?.v?.toString().trim().toLowerCase() === tab.trim().toLowerCase()
        )

        if (match && match.c?.[2]?.v) {
          setContent(match.c[2].v.toString())
        } else {
          setContent("")
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error("Sheet fetch error:", err)
        setError("Content load नहीं हो सका।")
        setLoading(false)
      })
  }, [chapterId, tab])

  return { content, loading, error }
}
