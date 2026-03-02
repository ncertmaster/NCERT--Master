"use client"

import { useState, useEffect } from "react"

export function useSheetContent(chapterId: string | null, tab: "notes" | "iq" | "books") {
  const [content, setContent] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!chapterId) {
      setContent("Chapter not found")
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    fetch(`/api/content?chapter_id=${chapterId}&tab=${tab}`)
      .then((r) => r.json())
      .then(({ data }) => {
        if (data && data.length > 0) {
          setContent(data[0].content)
        } else {
          setContent("Content जल्द आएगा... 🚀")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Content load नहीं हुआ। दोबारा try करें।")
        setLoading(false)
      })
  }, [chapterId, tab])

  return { content, loading, error }
}
