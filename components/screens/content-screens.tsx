"use client"
import React, { useEffect } from "react"
import { useSheetContent } from "@/hooks/use-sheet-content"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { ScreenHeader } from "@/components/screen-header"
import { BottomTabs } from "@/components/bottom-tabs"
import { ChevronRight } from "lucide-react"
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
                setSelectedStream(null)
                setSelectedSubject(null)
                setSelectedBook(null)
                setSelectedChapter(null)
                setScreen(nextScreen[flow])
              }}
              className="animate-fade-in flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
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
  const { language, selectedClass, setScreen, setSelectedStream, setSelectedSubject, setSelectedBook, setSelectedChapter } = useApp()

  // Har baar is screen par aane par state clean karo
  React.useEffect(() => {
    setSelectedStream(null)
    setSelectedSubject(null)
    setSelectedBook(null)
    setSelectedChapter(null)
  }, [])

  const tabKey: Record<string, string> = {
    books: "books", notes: "notes", iq: "importantQuestions", quiz: "quiz",
  }
  
  const nextScreen: Record<string, AppScreen> = {
    books: "books-chapter", notes: "notes-chapter", iq: "iq-chapter", quiz: "quiz-mode",
  }

  // Class 11 & 12 → Streams
  if (selectedClass === 11 || selectedClass === 12) {
    const streams: Stream[] = streamsByClass[selectedClass] || []
    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={`${getText("class", language)} ${selectedClass} - Stream`} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex flex-col gap-3">
            {streams.map((stream: Stream) => (
              <button
                key={stream.id}
                onClick={() => {
                  setSelectedStream(stream.id)
                  setSelectedSubject(null)
                  setSelectedBook(null)
                  setSelectedChapter(null)
                  setScreen(nextScreen[flow])
                }}
                className="animate-fade-in flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
              >
                <span className="text-base font-semibold text-card-foreground">{stream.nameHi}</span>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </button>
            ))}
          </div>
        </div>
        <BottomTabs activeTab={tabKey[flow]} />
      </div>
    )
  }

  // Class 6–10 → Subjects
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
                className="animate-fade-in flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
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

    // Step 1: Show subjects
    if (!selectedSubject) {
      return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
          <ScreenHeader title={`${stream.nameHi} - ${getText("selectSubject", language)}`} />
          <div className="mx-auto w-full max-w-md px-4 py-4">
            <div className="flex flex-col gap-3">
              {stream.subjects.filter((subject: Subject) => Array.isArray(subject.tabs) && subject.tabs.includes(flow)).map((subject: Subject) => {
                const Icon = iconMap[subject.icon] || BookOpen
                return (
                  <button
                    key={subject.id}
                    onClick={() => setSelectedSubject(subject.id)}
                    className="animate-fade-in flex items-center gap-4 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
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
    if (!subject) return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={getText("selectSubject", language)} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <p className="text-center text-sm text-muted-foreground py-10">Subject select karein</p>
        </div>
        <BottomTabs activeTab={tabKey[flow]} />
      </div>
    )

    // Step 2: Show books
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
                  className="animate-fade-in flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
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

    // Step 3: Show chapters
    const book = subject.books.find((b: Book) => b.id === selectedBook)
    if (!book) return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={getText("selectSubject", language)} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <p className="text-center text-sm text-muted-foreground py-10">Book select karein</p>
        </div>
        <BottomTabs activeTab={tabKey[flow]} />
      </div>
    )

    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={book.nameHi} />
        <div className="mx-auto w-full max-w-md px-4 py-3">
          <div className="flex flex-col gap-2">
            {book.chapters.map((ch: Chapter, idx: number) => (
              <div
                key={ch.id}
                className="animate-fade-in rounded-xl border border-border bg-card shadow-sm"
              >
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
                  {flow === "quiz" ? (
                    <button
                      onClick={() => { setSelectedChapter(ch.id); setScreen(nextScreen[flow]) }}
                      className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all active:scale-[0.97]"
                    >
                      🧠 Quiz शुरू करें
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => alert("डाउनलोड जल्द आ रहा है!")}
                        className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all active:scale-[0.97]"
                      >
                        ⬇ डाउनलोड करें
                      </button>
                      <button
                        onClick={() => { setSelectedChapter(ch.id); setScreen(nextScreen[flow]) }}
                        className="flex-1 rounded-lg border border-primary py-2 text-xs font-semibold text-primary transition-all active:scale-[0.97]"
                      >
                        📖 ऑनलाइन पढ़ें
                      </button>
                    </>
                  )}
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

  // Show books if multiple
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
                className="animate-fade-in flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
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
            <div
              key={ch.id}
              className="animate-fade-in rounded-xl border border-border bg-card shadow-sm"
            >
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
                {flow === "quiz" ? (
                  <button
                    onClick={() => { setSelectedChapter(ch.id); setScreen(nextScreen[flow]) }}
                    className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all active:scale-[0.97]"
                  >
                    🧠 Quiz शुरू करें
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => alert("डाउनलोड जल्द आ रहा है!")}
                      className="flex-1 rounded-lg bg-primary py-2 text-xs font-semibold text-primary-foreground transition-all active:scale-[0.97]"
                    >
                      ⬇ डाउनलोड करें
                    </button>
                    <button
                      onClick={() => { setSelectedChapter(ch.id); setScreen(nextScreen[flow]) }}
                      className="flex-1 rounded-lg border border-primary py-2 text-xs font-semibold text-primary transition-all active:scale-[0.97]"
                    >
                      📖 ऑनलाइन पढ़ें
                    </button>
                  </>
                )}
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

        // ## = Red bold heading
        if (line.startsWith("##")) {
          return (
            <p key={i} className="mt-4 mb-1 text-sm font-bold text-red-500">
              {line.replace(/^##\s*/, "")}
            </p>
          )
        }

        // === = Blue bold heading
        if (line.startsWith("===")) {
          return (
            <p key={i} className="mt-4 mb-1 text-sm font-bold text-blue-500">
              {line.replace(/^===\s*/, "")}
            </p>
          )
        }

      
        // **text** whole line = Bold black subheading
        if (line.startsWith("**") && line.endsWith("**")) {
          return (
            <p key={i} className="mt-3 mb-1 text-sm font-bold text-card-foreground">
              {line.replace(/\*\*/g, "")}
            </p>
          )
        }

        // (i), (ii), (iii) = indented point
        if (/^\([ivxIVX\d]+\)/.test(line)) {
          return (
            <p key={i} className="text-sm leading-relaxed text-card-foreground pl-4">
              {line}
            </p>
          )
        }

        // Inline **bold** inside sentence
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

        // Normal paragraph
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
    </div>
  )
}

// ===============================
// 4️⃣ CONTENT SCREENS
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
