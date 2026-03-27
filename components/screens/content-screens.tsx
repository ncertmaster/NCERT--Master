"use client"
import React, { useEffect, useState, useCallback, useRef } from "react"
import { useSheetContent } from "@/hooks/use-sheet-content"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { ScreenHeader } from "@/components/screen-header"
import { BottomTabs } from "@/components/bottom-tabs"
import { ChevronRight, Download, Loader2, BookMarked } from "lucide-react"
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

// ─── Download helper ─────────────────────────────────────────────────────────
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
  // BOM (Byte Order Mark) add karo — Windows/Android me Hindi text sahi dikhega
  const BOM = "\uFEFF"
  const blob = new Blob([BOM + content], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

// ─── Download Button Component ────────────────────────────────────────────────
function DownloadButton({
  chapter,
  flow,
  classNum,
  subjectName,
}: {
  chapter: Chapter
  flow: "notes" | "iq"
  classNum: number
  subjectName: string
}) {
  const [downloading, setDownloading] = useState(false)

  const tab = flow === "notes" ? "notes" : "iq"
  const cacheKey = getCacheKey(chapter.id, tab, String(classNum))

  const handleDownload = useCallback(async () => {
    setDownloading(true)
    try {
      // Check cache first — instant download if already loaded
      let content = readCache(cacheKey)

      if (!content) {
        // Fetch fresh content
        const params = new URLSearchParams({
          chapter_id: chapter.id,
          chapter_name: chapter.name,
          chapter_name_hi: chapter.nameHi,
          subject: subjectName,
          class: String(classNum),
          tab,
        })
        const res = await fetch(`/api/content?${params}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        if (!data?.content) throw new Error("Empty content")
        content = data.content

        // Save to cache
        try {
          localStorage.setItem(cacheKey, JSON.stringify({ content, ts: Date.now() }))
        } catch {}
      }

      const tabLabel = tab === "notes" ? "Notes" : "IQ"
      const filename = `NCERT_Class${classNum}_${subjectName}_${chapter.name}_${tabLabel}.txt`
        .replace(/[^a-zA-Z0-9_\u0900-\u097F.-]/g, "_")

      triggerDownload(content!, filename)
    } catch (err) {
      alert("Download failed. Please try again. / डाउनलोड नहीं हुआ, दोबारा try करें।")
    } finally {
      setDownloading(false)
    }
  }, [chapter, tab, classNum, subjectName, cacheKey])

  return (
    <button
      onClick={handleDownload}
      disabled={downloading}
      className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all active:opacity-90 disabled:opacity-70"
    >
      {downloading ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin" />
      ) : (
        <Download className="h-3.5 w-3.5" />
      )}
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
    books: "books-subject",
    notes: "notes-subject",
    iq: "iq-subject",
    quiz: "quiz-subject",
  }

  const tabKey: Record<string, string> = {
    books: "books",
    notes: "notes",
    iq: "importantQuestions",
    quiz: "quiz",
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={getText(tabKey[flow], language)} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <p className="mb-4 text-sm text-muted-foreground">
          {getText("selectClassFirst", language)}
        </p>
        <div className="grid grid-cols-2 gap-3">
          {classes.map((c) => (
            <button
              key={c}
              onClick={() => {
                setSelectedClass(c)
                // Reset all selections when class changes
                setSelectedStream(null)
                setSelectedSubject(null)
                setSelectedBook(null)
                setSelectedChapter(null)
                setScreen(nextScreen[flow])
              }}
              className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:opacity-90"
            >
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
    setSelectedSubject(null)
    setSelectedBook(null)
    setSelectedChapter(null)
  }, [])

  const tabKey: Record<string, string> = {
    books: "books", notes: "notes", iq: "importantQuestions", quiz: "quiz",
  }

  const nextScreen: Record<string, AppScreen> = {
    books: "books-list", notes: "notes-chapter", iq: "iq-chapter", quiz: "quiz-mode",
  }

  const is1112 = selectedClass === 11 || selectedClass === 12

  // ── CASE 1: Class 11/12, stream NOT yet selected → show stream list
  if (is1112 && !selectedStream) {
    const streams: Stream[] = streamsByClass[selectedClass!] || []
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={`${getText("class", language)} ${selectedClass} - Stream`} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex flex-col gap-3">
            {streams.map((stream: Stream) => (
              <button
                key={stream.id}
                onClick={() => setSelectedStream(stream.id)}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:opacity-90"
              >
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

  // ── CASE 2: Class 11/12, stream selected → show subjects
  if (is1112 && selectedStream) {
    const streams: Stream[] = streamsByClass[selectedClass!] || []
    const stream = streams.find((s: Stream) => s.id === selectedStream)
    
    // If stream not found (e.g. invalid ID in state), reset and show stream list
    if (!stream) {
      setSelectedStream(null)
      return null
    }

    const subjects = (stream?.subjects || []).filter((s: Subject) => Array.isArray(s.tabs) && s.tabs.includes(flow))
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={`${stream?.nameHi || ""} - ${getText("selectSubject", language)}`} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex flex-col gap-3">
            {subjects.map((subject: Subject) => {
              const Icon = iconMap[subject.icon] || BookOpen
              return (
                <button
                  key={subject.id}
                  onClick={() => {
                    setSelectedSubject(subject.id)
                    setSelectedBook(null)
                    setSelectedChapter(null)
                    setScreen(nextScreen[flow])
                  }}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:opacity-90"
                >
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

  // ── CASE 3: Class 6–10 → show subjects directly
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
              <button
                key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject.id)
                  setSelectedBook(null)
                  setSelectedChapter(null)
                  setScreen(nextScreen[flow])
                }}
                className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:opacity-90"
              >
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
    setSelectedStream, setSelectedSubject, setSelectedBook, setSelectedChapter, setScreen,
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
    flow === "iq" ? "iq-subject" : "quiz-subject"

  const is1112 = selectedClass === 11 || selectedClass === 12
  const streams1112: Stream[] = is1112 ? (streamsByClass[selectedClass!] || []) : []
  const matchedStream = is1112 ? streams1112.find((s: Stream) => s.id === selectedStream) : null

  React.useEffect(() => {
    if (is1112 && selectedStream && !matchedStream) {
      setSelectedStream(null)
      setScreen(backScreen)
    }
  }, [selectedStream, selectedClass])

  // Helper to render chapter buttons — avoids code duplication
  function ChapterButtons({ ch, subjectName }: { ch: Chapter; subjectName: string }) {
    if (flow === "quiz") {
      return (
        <button
          onClick={() => { setSelectedChapter(ch.id); setScreen(nextScreen[flow]) }}
          className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all active:opacity-90"
        >
          🧠 Quiz शुरू करें
        </button>
      )
    }

    if (flow === "books") {
      return null // Books tab mein koi button nahi
    }

    // notes or iq — show Download + Online Read
    return (
      <>
        <DownloadButton
          chapter={ch}
          flow={flow as "notes" | "iq"}
          classNum={selectedClass!}
          subjectName={subjectName}
        />
        <button
          onClick={() => { setSelectedChapter(ch.id); setScreen(nextScreen[flow]) }}
          className="flex-1 rounded-lg border border-primary py-2 text-xs font-semibold text-primary transition-all active:opacity-90"
        >
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
                    <button
                      key={subject.id}
                      onClick={() => setSelectedSubject(subject.id)}
                      className="flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:opacity-90"
                    >
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
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book.id)}
                  className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:opacity-90"
                >
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
                {flow !== "books" && (
                  <div className="flex gap-2 px-3 pb-3">
                    <ChapterButtons ch={ch} subjectName={subject.name} />
                  </div>
                )}
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
              <button
                key={book.id}
                onClick={() => setSelectedBook(book.id)}
                className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:opacity-90"
              >
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
              {flow !== "books" && (
                <div className="flex gap-2 px-3 pb-3">
                  <ChapterButtons ch={ch} subjectName={subject.name} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <BottomTabs activeTab={tabKey[flow]} />
    </div>
  )
}

// ===============================
// 4️⃣ CONTENT RENDERER HELPER
// ===============================
function renderContent(content: string) {
  if (!content) return (
    <p className="text-center text-sm text-muted-foreground py-10">अभी content उपलब्ध नहीं है।</p>
  )
  return (
    <div className="space-y-1">
      {content.split("\n").map((line: string, i: number) => {
        if (!line.trim()) return <div key={i} className="h-2" />

        if (line.startsWith("##")) {
          return (
            <p key={i} className="mt-4 mb-1 text-sm font-bold text-red-500">
              {line.replace(/^##\s*/, "")}
            </p>
          )
        }

        if (line.startsWith("===")) {
          return (
            <p key={i} className="mt-4 mb-1 text-sm font-bold text-blue-500">
              {line.replace(/^===\s*/, "")}
            </p>
          )
        }

        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="mt-3 mb-1 text-sm font-bold text-card-foreground">
              {line.replace(/\*\*/g, "")}
            </p>
          )
        }

        if (/^\([ivxIVX\d]+\)/.test(line)) {
          return (
            <p key={i} className="text-sm leading-relaxed text-card-foreground pl-4">
              {line}
            </p>
          )
        }

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

        return (
          <p key={i} className="text-sm leading-relaxed text-card-foreground">
            {line}
          </p>
        )
      })}
    </div>
  )
}

function ContentLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-10 gap-3">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <p className="text-sm text-muted-foreground">Content load हो रहा है...</p>
      <p className="text-xs text-muted-foreground">पहली बार 15-30 sec लग सकते हैं</p>
    </div>
  )
}

// ===============================
// 5️⃣ CONTENT SCREENS
// ===============================
export function NotesContentScreen() {
  const { language, selectedChapter } = useApp()
  const { content, loading, error } = useSheetContent(selectedChapter, "notes")
  return (
    <div className="flex min-h-screen flex-col bg-background pb-6">
      <ScreenHeader title={getText("notes", language)} />
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

export function IQContentScreen() {
  const { language, selectedChapter } = useApp()
  const { content, loading, error } = useSheetContent(selectedChapter, "iq")
  return (
    <div className="flex min-h-screen flex-col bg-background pb-6">
      <ScreenHeader title={getText("importantQuestions", language)} />
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
// Sirf books ke naam dikhte hain — koi chapter link nahi
// ===============================
// ─── NCERT URL Generator ─────────────────────────────────────────────────────
// Generates official NCERT epathshala URL for any book
// Uses the standard NCERT digital textbook URL pattern
function getNcertUrl(classNum: number, bookId: string, bookName: string): string {
  // epathshala.nic.in — official NCERT govt platform, allows embedding
  return `https://epathshala.nic.in/e-pathshala-4/profile/?id=${classNum}`
}

// ──────────────────────────────────────────────────────────────────────────────
// 📚 BOOKS LIST SCREEN
// ──────────────────────────────────────────────────────────────────────────────
export function BooksListScreen() {
  const { language, selectedClass, selectedStream, selectedSubject, setScreen, setSelectedBook } = useApp()

  let books: Book[] = []

  if (selectedClass === 11 || selectedClass === 12) {
    const streams: Stream[] = streamsByClass[selectedClass] || []
    const stream = streams.find((s: Stream) => s.id === selectedStream)
    const subject = stream?.subjects.find((s: Subject) => s.id === selectedSubject)
    books = subject?.books || []
  } else {
    const subjects: Subject[] = selectedClass ? (subjectsByClass[selectedClass] || []) : []
    const subject = subjects.find((s: Subject) => s.id === selectedSubject)
    books = subject?.books || []
  }

  const handleOpenBook = (book: Book) => {
    // Navigate to chapters list within the app — user stays inside
    setSelectedBook(book.id)
    setScreen("books-chapter")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={getText("books", language)} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        {/* Info banner */}
        <div className="mb-4 rounded-xl bg-blue-500/10 border border-blue-500/20 px-3 py-2.5 flex items-start gap-2">
          <BookMarked className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
          <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
            Select a book to view all chapters inside the app.
          </p>
        </div>

        {books.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-10">
            कोई पुस्तक उपलब्ध नहीं है।
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {books.map((book: Book) => (
              <div
                key={book.id}
                className="rounded-xl border border-border bg-card shadow-sm overflow-hidden"
              >
                <div className="flex items-center gap-3 p-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <BookMarked className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-card-foreground">{book.name}</p>
                    <p className="text-xs text-muted-foreground">{book.nameHi}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{book.chapters.length} Chapters</p>
                  </div>
                </div>
                <div className="flex gap-2 px-4 pb-4">
                  <button
                    onClick={() => handleOpenBook(book)}
                    className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-all active:opacity-90"
                  >
                    <BookMarked className="h-4 w-4" />
                    View Chapters
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomTabs activeTab="books" />
    </div>
  )
}

// ──────────────────────────────────────────────────────────────────────────────
// 🌐 BOOKS READER SCREEN — kept for backward compat, redirects back
// ──────────────────────────────────────────────────────────────────────────────
export function BooksReaderScreen() {
  const { goBack } = useApp()
  React.useEffect(() => { goBack() }, [])
  return null
            }
