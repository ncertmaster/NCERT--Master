"use client"

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
    setSelectedSubject, setSelectedBook, setSelectedChapter, setScreen,
  } = useApp()

  const tabKey: Record<string, string> = {
    books: "books", notes: "notes", iq: "importantQuestions", quiz: "quiz",
  }

  const nextScreen: Record<string, AppScreen> = {
    books: "books-content", notes: "notes-content", iq: "iq-content", quiz: "quiz-play",
  }

  // ── Class 11 & 12 ──
  if (selectedClass === 11 || selectedClass === 12) {
    const streams: Stream[] = streamsByClass[selectedClass] || []
    const stream = streams.find((s: Stream) => s.id === selectedStream)
    if (!stream) return null

    // Step 1: Show subjects
    if (!selectedSubject) {
      return (
        <div className="flex min-h-screen flex-col bg-background pb-20">
          <ScreenHeader title={`${stream.nameHi} - ${getText("selectSubject", language)}`} />
          <div className="mx-auto w-full max-w-md px-4 py-4">
            <div className="flex flex-col gap-3">
              {stream.subjects.filter((subject: Subject) => subject.tabs.includes(flow)).map((subject: Subject) => {
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
    if (!subject) return null

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
    if (!book) return null

    return (
      <div className="flex min-h-screen flex-col bg-background pb-20">
        <ScreenHeader title={book.nameHi} />
        <div className="mx-auto w-full max-w-md px-4 py-4">
          <div className="flex flex-col gap-2.5">
            {book.chapters.map((ch: Chapter, idx: number) => (
              <button
                key={ch.id}
                onClick={() => {
                  setSelectedChapter(ch.id)
                  setScreen(nextScreen[flow])
                }}
                className="animate-fade-in flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground">
                  {idx + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-card-foreground">{ch.name}</p>
                  <p className="text-xs text-muted-foreground">{ch.nameHi}</p>
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
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="flex flex-col gap-2.5">
          {book.chapters.map((ch: Chapter, idx: number) => (
            <button
              key={ch.id}
              onClick={() => {
                setSelectedChapter(ch.id)
                setScreen(nextScreen[flow])
              }}
              className="animate-fade-in flex items-center gap-3 rounded-2xl border border-border bg-card p-4 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary text-sm font-bold text-secondary-foreground">
                {idx + 1}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-card-foreground">{ch.name}</p>
                <p className="text-xs text-muted-foreground">{ch.nameHi}</p>
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
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Content load हो रहा है...</p>
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            {content.split("\n").map((para: string, i: number) => {
              if (!para.trim()) return <div key={i} className="mb-2" />
              const isBold = para.startsWith("**") && para.includes("**", 2)
              const text = isBold ? para.replace(/\*\*/g, "") : para
              return isBold ? (
                <p key={i} className="mt-3 mb-1 font-bold text-sm text-card-foreground">{text}</p>
              ) : (
                <p key={i} className="mb-1 leading-snug text-card-foreground text-sm">{para}</p>
              )
            })}
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
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Content load हो रहा है...</p>
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            {content.split("\n").map((para: string, i: number) => {
              if (!para.trim()) return <div key={i} className="mb-2" />
              const isBold = para.startsWith("**") && para.includes("**", 2)
              const text = isBold ? para.replace(/\*\*/g, "") : para
              return isBold ? (
                <p key={i} className="mt-3 mb-1 font-bold text-sm text-card-foreground">{text}</p>
              ) : (
                <p key={i} className="mb-1 leading-snug text-card-foreground text-sm">{para}</p>
              )
            })}
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
        {loading && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            <p className="text-sm text-muted-foreground">Content load हो रहा है...</p>
          </div>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            {content.split("\n").map((para: string, i: number) => {
              if (!para.trim()) return <div key={i} className="mb-2" />
              const isBold = para.startsWith("**") && para.includes("**", 2)
              const text = isBold ? para.replace(/\*\*/g, "") : para
              return isBold ? (
                <p key={i} className="mt-3 mb-1 font-bold text-sm text-card-foreground">{text}</p>
              ) : (
                <p key={i} className="mb-1 leading-snug text-card-foreground text-sm">{para}</p>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
                }
