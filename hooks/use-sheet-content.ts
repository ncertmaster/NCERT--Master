"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { subjectsByClass, streamsByClass } from "@/lib/data"
import type { Subject, Book, Chapter, Stream } from "@/lib/data"

function getChapterInfo(
  chapterId: string | null,
  selectedClass: number | null,
  selectedStream: string | null,
  selectedSubject: string | null,
  selectedBook: string | null
) {
  if (!chapterId || !selectedClass) return null

  let subjects: Subject[] = []

  if (selectedClass === 11 || selectedClass === 12) {
    const streams: Stream[] = streamsByClass[selectedClass] || []
    const stream = streams.find((s: Stream) => s.id === selectedStream)
    subjects = stream?.subjects || []
  } else {
    subjects = subjectsByClass[selectedClass] || []
  }

  for (const subject of subjects) {
    for (const book of subject.books) {
      const chapter = book.chapters.find((ch: Chapter) => ch.id === chapterId)
      if (chapter) {
        return {
          chapterName: chapter.name,
          chapterNameHi: chapter.nameHi,
          subjectName: subject.name,
          className: String(selectedClass),
        }
      }
    }
  }
  return null
}

export function useSheetContent(chapterId: string | null, tab: string) {
  const { selectedClass, selectedStream, selectedSubject, selectedBook } = useApp()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!chapterId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setContent("")
    setError(null)

    const info = getChapterInfo(chapterId, selectedClass, selectedStream, selectedSubject, selectedBook)

    if (!info) {
      setError("Chapter info नहीं मिली।")
      setLoading(false)
      return
    }

    const params = new URLSearchParams({
      chapter_id: chapterId,
      chapter_name: info.chapterName,
      chapter_name_hi: info.chapterNameHi,
      subject: info.subjectName,
      class: info.className,
      tab,
    })

    fetch(`/api/content?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
        } else {
          setContent(data.content || "")
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
        
