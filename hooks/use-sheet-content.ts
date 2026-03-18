"use client"

import { useState, useEffect } from "react"

const SHEET_ID = "1g69GuccPRSVzoHQGvmaCXmMNBZXYv3NrKPVAMosSGHg"
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

    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`

    fetch(url)
      .then((res) => res.text())
      .then((text) => {
        const json = JSON.parse(text.substring(47).slice(0, -2))
        const rows = json.table.rows

        const match = rows.find(
          (row: any) =>
            row.c[0]?.v === chapterId &&
            row.c[1]?.v === tab
        )

        if (match && match.c[2]?.v) {
          setContent(match.c[2].v)
        } else {
          setContent("")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Content load नहीं हो सका।")
        setLoading(false)
      })
  }, [chapterId, tab])

  return { content, loading, error }
}
