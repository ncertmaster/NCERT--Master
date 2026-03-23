"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { subjectsByClass, streamsByClass } from "@/lib/data"
import type { Subject, Book, Chapter, Stream } from "@/lib/data"

// ─── Cache key builder ────────────────────────────────────────────────────────
function getCacheKey(chapterId: string, tab: string, className: string): string {
  return `ncert_cache__${className}__${chapterId}__${tab}`
}

// ─── LocalStorage cache read ──────────────────────────────────────────────────
function readCache(key: string): string | null {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    // Cache expires in 7 days
    if (Date.now() - parsed.ts > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem(key)
      return null
    }
    return parsed.content as string
  } catch {
    return null
  }
}

// ─── LocalStorage cache write ─────────────────────────────────────────────────
function writeCache(key: string, content: string): void {
  try {
    localStorage.setItem(key, JSON.stringify({ content, ts: Date.now() }))
  } catch {
    // Storage full — clear old ncert cache entries and retry
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("ncert_cache__"))
        .forEach((k) => localStorage.removeItem(k))
      localStorage.setItem(key, JSON.stringify({ content, ts: Date.now() }))
    } catch {
      // Silently fail — app still works, just no cache
    }
  }
}

// ─── Chapter info lookup ──────────────────────────────────────────────────────
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

// ─── Fetch with retry ─────────────────────────────────────────────────────────
async function fetchWithRetry(url: string, retries = 3, delayMs = 1500): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        // Rate limit — wait longer
        if (res.status === 429) {
          await new Promise((r) => setTimeout(r, delayMs * attempt * 2))
          continue
        }
        throw new Error(`HTTP ${res.status}`)
      }
      return await res.json()
    } catch (err) {
      if (attempt === retries) throw err
      // Wait before retry
      await new Promise((r) => setTimeout(r, delayMs * attempt))
    }
  }
}

// ─── Main hook ────────────────────────────────────────────────────────────────
export function useSheetContent(chapterId: string | null, tab: string) {
  const { selectedClass, selectedStream, selectedSubject, selectedBook } = useApp()
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fromCache, setFromCache] = useState(false)

  useEffect(() => {
    if (!chapterId) {
      setLoading(false)
      return
    }

    setLoading(true)
    setContent("")
    setError(null)
    setFromCache(false)

    const info = getChapterInfo(chapterId, selectedClass, selectedStream, selectedSubject, selectedBook)

    if (!info) {
      setError("Chapter info नहीं मिली। वापस जाएं और दोबारा try करें।")
      setLoading(false)
      return
    }

    // ── Check localStorage cache first ──
    const cacheKey = getCacheKey(chapterId, tab, info.className)
    const cached = readCache(cacheKey)
    if (cached) {
      setContent(cached)
      setFromCache(true)
      setLoading(false)
      return
    }

    // ── Not in cache — fetch from API with retry ──
    const params = new URLSearchParams({
      chapter_id: chapterId,
      chapter_name: info.chapterName,
      chapter_name_hi: info.chapterNameHi,
      subject: info.subjectName,
      class: info.className,
      tab,
    })

    fetchWithRetry(`/api/content?${params}`, 3, 1500)
      .then((data) => {
        if (data.error) {
          setError(`Error: ${data.error} — वापस जाएं और दोबारा try करें।`)
        } else if (!data.content) {
          setError("Content नहीं मिला। दोबारा try करें।")
        } else {
          setContent(data.content)
          // Save to cache so next time instant load hoga
          writeCache(cacheKey, data.content)
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Internet connection check करें और दोबारा try करें।")
        setLoading(false)
      })
  }, [chapterId, tab])

  return { content, loading, error, fromCache }
                                              }
      
