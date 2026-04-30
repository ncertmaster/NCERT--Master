"use client"
import React, { useEffect, useState, useCallback, useRef } from "react"
import { useSheetContent } from "@/hooks/use-sheet-content"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { ScreenHeader } from "@/components/screen-header"
import { BottomTabs } from "@/components/bottom-tabs"
import { ChevronRight, Download, Loader2, BookMarked, ExternalLink, Share2, RefreshCw } from "lucide-react"
import type { ClassNumber, Subject, Stream, Book, Chapter } from "@/lib/data"
import { subjectsByClass, streamsByClass } from "@/lib/data"
import type { AppScreen } from "@/lib/app-context"
import {
  FlaskConical, Calculator, BookOpen, Languages, Globe, Atom, Leaf, Briefcase, TrendingUp, Landmark, Map, Users
} from "lucide-react"

const iconMap: Record<string, typeof FlaskConical> = {
  flask: FlaskConical,
  calculator: Calculator,
  "book-open": BookOpen,
  languages: Languages,
  globe: Globe,
  atom: Atom,
  leaf: Leaf,
  briefcase: Briefcase,
  "trending-up": TrendingUp,
  landmark: Landmark,
  map: Map,
  users: Users,
  book: BookOpen,
}

// ─── Cache helpers ────────────────────────────────────────────────────────────
function getCacheKey(chapterId: string, tab: string, className: string): string {
  return `ncert_cache__${className}__${chapterId}__${tab}`
}

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

function triggerDownload(content: string, filename: string) {
  const BOM  = "\uFEFF"
  const blob = new Blob([BOM + content], { type: "text/plain;charset=utf-8" })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement("a")
  a.href     = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── Share helper ─────────────────────────────────────────────────────────────
async function shareContent(title: string, content: string) {
  if (typeof navigator === "undefined") return
  const text = content.slice(0, 800) + (content.length > 800 ? "\n\n...NCERT Master App se" : "")
  try {
    if (navigator.share) {
      await navigator.share({ title, text, url: "https://ncertmaster.vercel.app" })
    } else {
      await navigator.clipboard.writeText(content)
      alert("Content copied to clipboard!")
    }
  } catch { /* user cancelled or clipboard blocked */ }
}

// ─── Download Button ──────────────────────────────────────────────────────────
function DownloadButton({
  chapter, flow, classNum, subjectName,
}: {
  chapter: Chapter
  flow: "notes" | "iq"
  classNum: number
  subjectName: string
}) {
  const [downloading, setDownloading] = useState(false)
  const tab      = flow === "notes" ? "notes" : "iq"
  const cacheKey = getCacheKey(chapter.id, tab, String(classNum))

  const handleDownload = useCallback(async () => {
    setDownloading(true)
    try {
      let content = readCache(cacheKey)
      if (!content) {
        const params = new URLSearchParams({
          chapter_id:      chapter.id,
          chapter_name:    chapter.name,
          chapter_name_hi: chapter.nameHi,
          subject:         subjectName,
          class:           String(classNum),
          tab,
        })
        const res = await fetch(`/api/content?${params}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!data?.content) throw new Error("Empty content")
        content = data.content
        try { localStorage.setItem(cacheKey, JSON.stringify({ content, ts: Date.now() })) } catch {}
      }
      const tabLabel = tab === "notes" ? "Notes" : "IQ"
      const filename = `NCERT_Class${classNum}_${subjectName}_${chapter.name}_${tabLabel}.txt`
        .replace(/[^a-zA-Z0-9_\u0900-\u097F.-]/g, "_")
      triggerDownload(content!, filename)
    } catch {
      alert("Download failed. Please try again.")
    } finally {
      setDownloading(false)
    }
  }, [chapter, tab, classNum, subjectName, cacheKey])

  return (
    <button onClick={handleDownload} disabled={downloading}
      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all active:opacity-90 disabled:opacity-70">
      {downloading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
      {downloading ? "Loading..." : "⬇ डाउनलोड करें"}
    </button>
  )
}

// ===============================
// 1️⃣ CLASS SELECT
// ===============================
export function ClassSelectScreen({ flow }: { flow: "books" | "notes" | "iq" | "quiz" }) {
  const { language, setScreen, setSelectedClass, setSelectedStream, setSelectedSubject, setSelectedBook, setSelectedChapter } = useApp()
  const classes: ClassNumber[] = [12, 11, 10, 9, 8, 7, 6]

  const nextScreen: Record<string, AppScreen> = {
    books: "books-subject", notes: "notes-subject", iq: "iq-subject", quiz: "quiz-subject",
  }

  const tabKey: Record<string, string> = {
    books: "books", notes: "notes", iq: "importantQuestions", quiz: "quiz",
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={getText(tabKey[flow], language)} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <p className="mb-4 text-sm text-muted-foreground">{getText("selectClassFirst", language)}</p>
        <div className="grid grid-cols-2 gap-3">
          {classes.map((c) => (
            <button key={c}
              onClick={() => {
                setSelectedClass(c)
                setSelectedStream(null); setSelectedSubject(null)
                setSelectedBook(null); setSelectedChapter(null)
                setScreen(nextScreen[flow])
              }}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:opacity-90">
              <span className="text-base font-semibold text-card-foreground">
                {getText("class", language)} {c}
              </span>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
      <BottomTabs activeTab={tabKey[flow]} />
    </div>
  )
}

// ===============================
// 2️⃣ SUBJECT / STREAM SELECT
// ===============================
export function SubjectSelectScreen({ flow }: { flow: "books" | "notes" | "iq" | "quiz" }) {
  const { language, selectedClass, selectedStream, setScreen, setSelectedStream, setSelectedSubject, setSelectedBook, setSelectedChapter } = useApp()

  React.useEffect(() => {
    setSelectedSubject(null); setSelectedBook(null); setSelectedChapter(null)
  }, [])

  const tabKey: Record<string, string> = {
    books: "books", notes: "notes", iq: "importantQuestions", quiz: "quiz",
  }
  const nextScreen: Record<string, AppScreen> = {
    books: "books-list", notes: "notes-chapter", iq: "iq-chapter", quiz: "quiz-mode",
  }

  const is1112 = selectedClass === 11 || selectedClass === 12

  React.useEffect(() => {
    if (is1112 && selectedStream) {
      const streams: Stream[] = streamsByClass[selectedClass!] || []
      const found = streams.find((s: Stream) => s.id === selectedStream)
      if (!found) setSelectedStream(null)
    }
  }, [selectedStream, selectedClass, is1112])

  if (is1112 && !selectedStream) {
    const streams: Stream[] = streamsByClass[selectedClass!] || []
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={`${getText("class", language)} ${selectedClass} - Stream`} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex flex-col gap-3">
            {streams.map((stream: Stream) => (
              <button key={stream.id} onClick={() => setSelectedStream(stream.id)}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:opacity-90">
                <div>
                  <p className="text-base font-semibold text-card-foreground">{stream.nameHi}</p>
                  <p className="text-xs text-muted-foreground">{stream.name}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
        <BottomTabs activeTab={tabKey[flow]} />
      </div>
    )
  }

  if (is1112 && selectedStream) {
    const streams: Stream[] = streamsByClass[selectedClass!] || []
    const stream = streams.find((s: Stream) => s.id === selectedStream)
    if (!stream) return null

    const subjects = (stream?.subjects || []).filter((s: Subject) => Array.isArray(s.tabs) && s.tabs.includes(flow))
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={`${stream?.nameHi || ""} - ${getText("selectSubject", language)}`} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex flex-col gap-3">
            {subjects.map((subject: Subject) => {
              const Icon = iconMap[subject.icon] || BookOpen
              return (
                <button key={subject.id}
                  onClick={() => {
                    setSelectedSubject(subject.id); setSelectedBook(null)
                    setSelectedChapter(null); setScreen(nextScreen[flow])
                  }}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:opacity-90">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-card-foreground">{subject.name}</p>
                    <p className="text-xs text-muted-foreground">{subject.nameHi}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              )
            })}
          </div>
        </div>
        <BottomTabs activeTab={tabKey[flow]} />
      </div>
    )
  }

  const subjects: Subject[] = selectedClass
    ? (subjectsByClass[selectedClass] || []).filter((s: Subject) => s.tabs.includes(flow))
    : []

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={`${getText("class", language)} ${selectedClass} - ${getText("selectSubject", language)}`} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="flex flex-col gap-3">
          {subjects.map((subject: Subject) => {
            const Icon = iconMap[subject.icon] || BookOpen
            return (
              <button key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject.id); setSelectedBook(null)
                  setSelectedChapter(null); setScreen(nextScreen[flow])
                }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:opacity-90">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-card-foreground">{subject.name}</p>
                  <p className="text-xs text-muted-foreground">{subject.nameHi}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            )
          })}
        </div>
      </div>
      <BottomTabs activeTab={tabKey[flow]} />
    </div>
  )
}

// ===============================
// 3️⃣ CHAPTER SELECT
// ===============================
export function ChapterSelectScreen({ flow }: { flow: "books" | "notes" | "iq" | "quiz" }) {
  const {
    language, selectedClass, selectedStream, selectedSubject, selectedBook,
    setSelectedStream, setSelectedSubject, setSelectedBook, setSelectedChapter, setScreen, setSelectedBookUrl,
  } = useApp()

  const tabKey: Record<string, string> = {
    books: "books", notes: "notes", iq: "importantQuestions", quiz: "quiz",
  }
  const nextScreen: Record<string, AppScreen> = {
    books: "books-content", notes: "notes-content", iq: "iq-content", quiz: "quiz-play",
  }
  const backScreen: AppScreen =
    flow === "books" ? "books-subject" :
    flow === "notes" ? "notes-subject" :
    flow === "iq"    ? "iq-subject"    : "quiz-subject"

  const is1112         = selectedClass === 11 || selectedClass === 12
  const streams1112: Stream[] = is1112 ? (streamsByClass[selectedClass!] || []) : []
  const matchedStream  = is1112 ? streams1112.find((s: Stream) => s.id === selectedStream) : null

  React.useEffect(() => {
    if (is1112 && selectedStream && !matchedStream) {
      setSelectedStream(null); setScreen(backScreen)
    }
  }, [selectedStream, selectedClass])

  function buildNcertUrl(code: string | undefined, chapterIndex: number): string | null {
    if (!code) return null
    const ch = String(chapterIndex).padStart(2, "0")
    return `https://ncert.nic.in/textbook/pdf/${code}${ch}.pdf`
  }

  function ChapterButtons({ ch, subjectName, ncertPdfCode, chapterIndex }: {
    ch: Chapter; subjectName: string; ncertPdfCode?: string; chapterIndex: number
  }) {
    if (flow === "quiz") {
      return (
        <button onClick={() => { setSelectedChapter(ch.id); setScreen(nextScreen[flow]) }}
          className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all active:opacity-90">
          🧠 Quiz शुरू करें
        </button>
      )
    }

    if (flow === "books") {
      const ncertUrl = buildNcertUrl(ncertPdfCode, chapterIndex)
      if (!ncertUrl) {
        return (
          <button onClick={() => window.open("https://ncert.nic.in/textbook.php", "_blank", "noopener,noreferrer")}
            className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground active:opacity-90">
            📖 NCERT Site पर पढ़ें
          </button>
        )
      }
      return (
        <button onClick={() => window.open(ncertUrl, "_blank", "noopener,noreferrer")}
          className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground active:opacity-90">
          📖 ऑनलाइन पढ़ें / Download
        </button>
      )
    }

    return (
      <>
        <DownloadButton chapter={ch} flow={flow as "notes" | "iq"} classNum={selectedClass!} subjectName={subjectName} />
        <button onClick={() => { setSelectedChapter(ch.id); setScreen(nextScreen[flow]) }}
          className="flex-1 rounded-lg border border-primary py-2 text-xs font-semibold text-primary transition-all active:opacity-90">
          📖 ऑनलाइन पढ़ें
        </button>
      </>
    )
  }

  // ── Class 11 & 12 ──
  if (selectedClass === 11 || selectedClass === 12) {
    const streams: Stream[] = streamsByClass[selectedClass] || []
    const stream = streams.find((s: Stream) => s.id === selectedStream)
    if (!stream) return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={getText("selectSubject", language)} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <p className="text-center text-sm text-muted-foreground py-10">Stream select karein</p>
        </div>
        <BottomTabs activeTab={tabKey[flow]} />
      </div>
    )

    if (!selectedSubject) {
      return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
          <ScreenHeader title={`${stream.nameHi} - ${getText("selectSubject", language)}`} />
          <div className="mx-auto w-full max-w-md px-4 py-4">
            <div className="flex flex-col gap-3">
              {stream.subjects
                .filter((subject: Subject) => Array.isArray(subject.tabs) && subject.tabs.includes(flow))
                .map((subject: Subject) => {
                  const Icon = iconMap[subject.icon] || BookOpen
                  return (
                    <button key={subject.id} onClick={() => setSelectedSubject(subject.id)}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:opacity-90">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-card-foreground">{subject.name}</p>
                        <p className="text-xs text-muted-foreground">{subject.nameHi}</p>
                      </div>
                      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </button>
                  )
                })}
            </div>
          </div>
          <BottomTabs activeTab={tabKey[flow]} />
        </div>
      )
    }

    const subject = stream.subjects.find((s: Subject) => s.id === selectedSubject)
    if (!subject) return null

    if (!selectedBook) {
      return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
          <ScreenHeader title={`${subject.nameHi} - Book`} />
          <div className="mx-auto w-full max-w-md px-4 py-4">
            <div className="flex flex-col gap-3">
              {subject.books.map((book: Book) => (
                <button key={book.id} onClick={() => setSelectedBook(book.id)}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:opacity-90">
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{book.name}</p>
                    <p className="text-xs text-muted-foreground">{book.nameHi}</p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
          <BottomTabs activeTab={tabKey[flow]} />
        </div>
      )
    }

    const book = subject.books.find((b: Book) => b.id === selectedBook)
    if (!book) return null

    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={book.nameHi} />
        <div className="mx-auto w-full max-w-md px-4 py-3">
          <div className="flex flex-col gap-2">
            {book.chapters.map((ch: Chapter, idx: number) => (
              <div key={ch.id} className="rounded-xl border border-border bg-card shadow-sm">
                <div className="flex items-center gap-3 px-3 pt-3 pb-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                    {idx + 1}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-semibold leading-tight text-card-foreground">{ch.name}</p>
                    <p className="text-[11px] text-muted-foreground">{ch.nameHi}</p>
                  </div>
                </div>
                <div className="flex gap-2 px-3 pb-3">
                  <ChapterButtons ch={ch} subjectName={subject.name} ncertPdfCode={book.ncertPdfCode} chapterIndex={idx + 1} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomTabs activeTab={tabKey[flow]} />
      </div>
    )
  }

  // ── Class 6–10 ──
  const subjects: Subject[] = selectedClass ? (subjectsByClass[selectedClass] || []) : []
  const subject = subjects.find((s: Subject) => s.id === selectedSubject)
  if (!subject) return null

  if (!selectedBook && subject.books.length > 1) {
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={`${subject.nameHi} - Book`} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex flex-col gap-3">
            {subject.books.map((book: Book) => (
              <button key={book.id} onClick={() => setSelectedBook(book.id)}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:opacity-90">
                <div>
                  <p className="text-sm font-semibold text-card-foreground">{book.name}</p>
                  <p className="text-xs text-muted-foreground">{book.nameHi}</p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
        <BottomTabs activeTab={tabKey[flow]} />
      </div>
    )
  }

  const book = subject.books.length === 1
    ? subject.books[0]
    : subject.books.find((b: Book) => b.id === selectedBook)
  if (!book) return null

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={`${subject.name} - ${getText("selectChapter", language)}`} />
      <div className="mx-auto w-full max-w-md px-4 py-3">
        <div className="flex flex-col gap-2">
          {book.chapters.map((ch: Chapter, idx: number) => (
            <div key={ch.id} className="rounded-xl border border-border bg-card shadow-sm">
              <div className="flex items-center gap-3 px-3 pt-3 pb-2">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10 text-xs font-bold text-primary">
                  {idx + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[13px] font-semibold leading-tight text-card-foreground">{ch.name}</p>
                  <p className="text-[11px] text-muted-foreground">{ch.nameHi}</p>
                </div>
              </div>
              <div className="flex gap-2 px-3 pb-3">
                <ChapterButtons ch={ch} subjectName={subject.name} ncertPdfCode={book.ncertPdfCode} chapterIndex={idx + 1} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <BottomTabs activeTab={tabKey[flow]} />
    </div>
  )
}

// ===============================
// 4️⃣ CONTENT RENDERER
// ===============================
function renderContent(content: string) {
  if (!content) return (
    <p className="text-center text-sm text-muted-foreground py-10">अभी content उपलब्ध नहीं है।</p>
  )
  return (
    <div className="space-y-1">
      {content.split("\n").map((line: string, i: number) => {
        if (!line.trim()) return <div key={i} className="h-2" />

        if (line.startsWith("##")) return (
          <p key={i} className="mt-4 mb-1 text-sm font-bold text-red-500">
            {line.replace(/^##\s*/, "")}
          </p>
        )
        if (line.startsWith("===")) return (
          <p key={i} className="mt-4 mb-1 text-sm font-bold text-blue-500">
            {line.replace(/^===\s*/, "")}
          </p>
        )
        if (line.startsWith("**") && line.endsWith("**")) return (
          <p key={i} className="mt-3 mb-1 text-sm font-bold text-card-foreground">
            {line.replace(/\*\*/g, "")}
          </p>
        )
        if (/^\([ivxIVX\d]+\)/.test(line)) return (
          <p key={i} className="text-sm leading-relaxed text-card-foreground pl-4">{line}</p>
        )
        if (line.includes("**")) {
          const parts = line.split(/(\*\*[^*]+\*\*)/)
          return (
            <p key={i} className="text-sm leading-relaxed text-card-foreground">
              {parts.map((part, j) =>
                part.startsWith("**") && part.endsWith("**")
                  ? <strong key={j}>{part.replace(/\*\*/g, "")}</strong>
                  : part
              )}
            </p>
          )
        }
        return <p key={i} className="text-sm leading-relaxed text-card-foreground">{line}</p>
      })}
    </div>
  )
}

function ContentLoader() {
  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="h-5 w-2/5 animate-pulse rounded-lg bg-muted" />
      <div className="flex flex-col gap-2.5">
        {[1, 0.92, 0.85, 1, 0.78].map((w, i) => (
          <div key={i} className="h-3.5 animate-pulse rounded-md bg-muted" style={{ width: `${w * 100}%` }} />
        ))}
      </div>
      <div className="h-4 w-1/3 animate-pulse rounded-lg bg-muted mt-2" />
      <div className="flex flex-col gap-2.5">
        {[1, 0.88, 1, 0.70].map((w, i) => (
          <div key={i} className="h-3.5 animate-pulse rounded-md bg-muted" style={{ width: `${w * 100}%` }} />
        ))}
      </div>
      <p className="mt-2 text-center text-xs text-muted-foreground/50">
        AI content taiyaar kar raha hai... ⏳
      </p>
    </div>
  )
}

// ── Shared content action bar (Share + Retry) ─────────────────────────────────
function ContentActionBar({
  title, content, onRetry,
}: { title: string; content: string; onRetry: () => void }) {
  return (
    <div className="flex items-center justify-end gap-2 mb-3">
      <button onClick={onRetry}
        className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors">
        <RefreshCw className="h-3.5 w-3.5" />
        Refresh
      </button>
      <button onClick={() => shareContent(title, content)}
        className="flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors">
        <Share2 className="h-3.5 w-3.5" />
        Share
      </button>
    </div>
  )
}

// ===============================
// 5️⃣ CONTENT SCREENS
// ===============================
export function NotesContentScreen() {
  const { language, selectedChapter } = useApp()
  const { content, loading, error, refetch, fromCache } = useSheetContent(selectedChapter, "notes")

  return (
    <div className="flex min-h-screen flex-col bg-background pb-6">
      <ScreenHeader title={getText("notes", language)} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        {loading && <ContentLoader />}

        {/* Error state with retry */}
        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <button onClick={refetch}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              <RefreshCw className="h-4 w-4" />
              दोबारा Try करें
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <ContentActionBar title={`NCERT Notes — ${selectedChapter || ""}`} content={content} onRetry={refetch} />
            <div className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
              {renderContent(content)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function IQContentScreen() {
  const { language, selectedChapter } = useApp()
const { content, loading, error, refetch, fromCache } = useSheetContent(selectedChapter, "iq")  

  return (
    <div className="flex min-h-screen flex-col bg-background pb-6">
      <ScreenHeader title={getText("importantQuestions", language)} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        {loading && <ContentLoader />}

        {!loading && error && (
          <div className="flex flex-col items-center gap-4 py-16 text-center">
            <p className="text-sm text-destructive">{error}</p>
            <button onClick={refetch}
              className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">
              <RefreshCw className="h-4 w-4" />
              दोबारा Try करें
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <ContentActionBar title={`NCERT Important Questions — ${selectedChapter || ""}`} content={content} onRetry={refetch} />
            <div className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
              {renderContent(content)}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export function BookContentScreen() {
  const { language, selectedChapter } = useApp()
  const { content, loading, error } = useSheetContent(selectedChapter, "books")
  return (
    <div className="flex min-h-screen flex-col bg-background pb-6">
      <ScreenHeader title={getText("books", language)} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        {loading && <ContentLoader />}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="rounded-xl border border-border bg-card px-4 py-4 shadow-sm">
            {renderContent(content)}
          </div>
        )}
      </div>
    </div>
  )
}

// ===============================
// 📚 BOOKS LIST SCREEN
// ===============================
export function BooksListScreen() {
  const { language, selectedClass } = useApp()
  const ncertUrl = `https://ncert.nic.in/textbook.php?class=${selectedClass || ""}`

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={getText("books", language)} />
      <div className="mx-auto w-full max-w-md px-4 py-6 flex flex-col items-center gap-6">
        <div className="flex h-24 w-24 items-center justify-center rounded-3xl bg-primary/10 border border-primary/20">
          <BookOpen className="h-12 w-12 text-primary" />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-lg font-bold text-foreground">NCERT Official Books</h2>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            NCERT की official website पर Class {selectedClass} की सभी books freely available हैं।
          </p>
        </div>
        <div className="w-full rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 space-y-2">
          <p className="text-xs font-semibold text-amber-600">📌 Important</p>
          <p className="text-xs text-amber-700 leading-relaxed">
            NCERT books copyright protected हैं इसलिए हम इन्हें app के अंदर नहीं दिखा सकते।
            NCERT की official site पर जाकर आप free में पढ़ और download कर सकते हैं।
          </p>
        </div>
        <div className="w-full rounded-2xl border border-border/60 bg-card p-4 space-y-3">
          <p className="text-xs font-semibold text-foreground">NCERT site पर मिलेगा:</p>
          {[
            "📖 सभी chapters online पढ़ें",
            "⬇️ Full book PDF download करें",
            "📑 Chapter-wise PDF download",
            "🆓 Completely free — कोई charge नहीं",
          ].map(item => (
            <div key={item} className="flex items-center gap-2">
              <p className="text-sm text-muted-foreground">{item}</p>
            </div>
          ))}
        </div>
        <button
          onClick={() => window.open(ncertUrl, "_blank", "noopener,noreferrer")}
          className="w-full flex items-center justify-center gap-2 rounded-2xl bg-primary py-4 text-sm font-semibold text-primary-foreground active:scale-[0.98] transition-all shadow-sm">
          <ExternalLink className="h-4 w-4" />
          NCERT Official Site पर जाएं
        </button>
        <p className="text-xs text-muted-foreground text-center">
          ncert.nic.in — Government of India
        </p>
      </div>
      <BottomTabs activeTab="books" />
    </div>
  )
}

// ===============================
// 📖 BOOKS READER SCREEN
// ===============================
export function BooksReaderScreen() {
  const { selectedClass, selectedBookUrl, goBack } = useApp()
  const [loading, setLoading]       = React.useState(true)
  const [iframeError, setIframeError] = React.useState(false)

  // Fallback: official NCERT epathshala class page
  const readerUrl = selectedBookUrl ||
    `https://epathshala.nic.in/e-pathshala-4/profile/?id=${selectedClass || 6}`

  // ── directPdfUrl — strip Google Docs/Drive viewer wrapper if present ──────
  function extractDirectUrl(url: string): string {
    // Pattern: https://docs.google.com/viewer?url=<ENCODED_URL>&embedded=true
    if (url.includes("docs.google.com/viewer")) {
      try {
        const u = new URL(url)
        const inner = u.searchParams.get("url")
        if (inner) return decodeURIComponent(inner)
      } catch {}
    }
    // Pattern: https://drive.google.com/file/d/<ID>/view
    if (url.includes("drive.google.com")) return url
    // Already a direct URL (NCERT PDF, epathshala etc.)
    return url
  }

  const directPdfUrl = extractDirectUrl(readerUrl)

  React.useEffect(() => {
    setLoading(true)
    setIframeError(false)
    const timer = setTimeout(() => setLoading(false), 10000)
    return () => clearTimeout(timer)
  }, [readerUrl])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur">
        <button onClick={goBack}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-foreground text-lg">
          ←
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">NCERT किताब पढ़ें</p>
          <p className="text-xs text-muted-foreground">Class {selectedClass} — Official NCERT</p>
        </div>
        <button onClick={() => window.open(directPdfUrl, "_blank")}
          className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-2 text-xs font-semibold text-foreground">
          <ExternalLink className="h-3.5 w-3.5" />
          Browser
        </button>
      </div>

      {/* Iframe reader */}
      <div className="relative flex-1">
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">NCERT किताब लोड हो रही है...</p>
            <p className="text-xs text-muted-foreground opacity-60">10-20 सेकंड लग सकते हैं</p>
          </div>
        )}
        {!iframeError && (
          <iframe
            key={readerUrl}
            src={readerUrl}
            title="NCERT Books"
            className="h-full w-full border-0"
            style={{ height: "calc(100vh - 120px)" }}
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setIframeError(true) }}
            allow="fullscreen"
          />
        )}
        {iframeError && (
          <div className="flex flex-col items-center justify-center h-full gap-4 px-6">
            <p className="text-sm text-muted-foreground text-center">
              यह PDF यहाँ नहीं खुल सका। नीचे से Browser में खोलें।
            </p>
          </div>
        )}
      </div>

      {/* Bottom fallback */}
      <div className="border-t border-border bg-card px-4 py-3">
        <button onClick={() => window.open(directPdfUrl, "_blank")}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-sm font-semibold text-primary-foreground">
          <ExternalLink className="h-4 w-4" />
          Browser में खोलें / Download करें
        </button>
      </div>
    </div>
  )
}
