"use client"

import { useState, useEffect, useRef } from "react"
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
    try {
      Object.keys(localStorage)
        .filter((k) => k.startsWith("ncert_cache__"))
        .forEach((k) => localStorage.removeItem(k))
      localStorage.setItem(key, JSON.stringify({ content, ts: Date.now() }))
    } catch {
      // Silently fail
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

// ─── Fetch with retry + AbortController timeout ───────────────────────────────
async function fetchWithRetry(
  url: string,
  signal: AbortSignal,
  retries = 3,
  delayMs = 2000
): Promise<any> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    if (signal.aborted) throw new Error("aborted")
    try {
      const res = await fetch(url, { signal })
      if (!res.ok) {
        if (res.status === 429) {
          await new Promise((r) => setTimeout(r, delayMs * attempt * 2))
          continue
        }
        throw new Error(`HTTP ${res.status}`)
      }
      return await res.json()
    } catch (err: any) {
      if (err?.name === "AbortError" || signal.aborted) throw new Error("aborted")
      if (attempt === retries) throw err
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

  // Keep a ref to abort any in-flight request when deps change
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    // Abort previous request if still running
    if (abortRef.current) {
      abortRef.current.abort()
    }

    if (!chapterId) {
      setLoading(false)
      setContent("")
      setError(null)
      return
    }

    setLoading(true)
    setContent("")
    setError(null)
    setFromCache(false)

    const info = getChapterInfo(
      chapterId,
      selectedClass,
      selectedStream,
      selectedSubject,
      selectedBook
    )

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

    // ── Not in cache — fetch from API ──
    const controller = new AbortController()
    abortRef.current = controller

    // 55 second timeout (Vercel Pro allows 60s)
    const timeoutId = setTimeout(() => controller.abort(), 55000)

    const params = new URLSearchParams({
      chapter_id: chapterId,
      chapter_name: info.chapterName,
      chapter_name_hi: info.chapterNameHi,
      subject: info.subjectName,
      class: info.className,
      tab,
    })

    fetchWithRetry(`/api/content?${params}`, controller.signal, 2, 2000)
      .then((data) => {
        clearTimeout(timeoutId)
        if (data?.error) {
          setError(`Error: ${data.error} — वापस जाएं और दोबारा try करें।`)
        } else if (!data?.content) {
          setError("Content नहीं मिला। दोबारा try करें।")
        } else {
          setContent(data.content)
          writeCache(cacheKey, data.content)
        }
        setLoading(false)
      })
      .catch((err) => {
        clearTimeout(timeoutId)
        if (err?.message === "aborted") return // Component unmounted or deps changed — ignore
        setError("Internet connection check करें और दोबारा try करें।")
        setLoading(false)
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
    // ✅ FIX: All context deps included so re-fetch happens correctly on navigation
  }, [chapterId, tab, selectedClass, selectedStream, selectedSubject, selectedBook])

  return { content, loading, error, fromCache }
        }
          
