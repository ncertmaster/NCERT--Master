"use client"

import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { ScreenHeader } from "@/components/screen-header"
import { BottomTabs } from "@/components/bottom-tabs"
import { ChevronRight } from "lucide-react"
import type { ClassNumber, Subject, Chapter } from "@/lib/data"
import { subjectsByClass, getBookContent, getNotesContent, getImportantQuestions } from "@/lib/data"
import type { AppScreen } from "@/lib/app-context"
import {
  FlaskConical, Calculator, BookOpen, Languages, Globe, Atom, Leaf
} from "lucide-react"

const iconMap: Record<string, typeof FlaskConical> = {
  flask: FlaskConical,
  calculator: Calculator,
  "book-open": BookOpen,
  languages: Languages,
  globe: Globe,
  atom: Atom,
  leaf: Leaf,
}

// --- Class Selection ---
export function ClassSelectScreen({ flow }: { flow: "books" | "notes" | "iq" | "quiz" }) {
  const { language, setScreen, setSelectedClass } = useApp()
  const classes: ClassNumber[] = [6, 7, 8, 9, 10, 11, 12]

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

// --- Subject Selection ---
export function SubjectSelectScreen({ flow }: { flow: "books" | "notes" | "iq" | "quiz" }) {
  const { language, selectedClass, setScreen, setSelectedSubject } = useApp()
  const subjects: Subject[] = selectedClass ? (subjectsByClass[selectedClass] || []) : []

  const nextScreen: Record<string, AppScreen> = {
    books: "books-chapter",
    notes: "notes-chapter",
    iq: "iq-chapter",
    quiz: "quiz-mode",
  }

  const tabKey: Record<string, string> = {
    books: "books",
    notes: "notes",
    iq: "importantQuestions",
    quiz: "quiz",
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={`${getText("class", language)} ${selectedClass} - ${getText("selectSubject", language)}`} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="flex flex-col gap-3">
          {subjects.map((subject) => {
            const Icon = iconMap[subject.icon] || BookOpen
            return (
              <button
                key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject.id)
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

// --- Chapter Selection ---
export function ChapterSelectScreen({ flow }: { flow: "books" | "notes" | "iq" | "quiz" }) {
  const { language, selectedClass, selectedSubject, setScreen, setSelectedChapter } = useApp()
  const subjects = selectedClass ? (subjectsByClass[selectedClass] || []) : []
  const subject = subjects.find((s) => s.id === selectedSubject)
  const chapters: Chapter[] = subject?.chapters || []

  const nextScreen: Record<string, AppScreen> = {
    books: "books-content",
    notes: "notes-content",
    iq: "iq-content",
    quiz: "quiz-play",
  }

  const tabKey: Record<string, string> = {
    books: "books",
    notes: "notes",
    iq: "importantQuestions",
    quiz: "quiz",
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={`${subject?.name || ""} - ${getText("selectChapter", language)}`} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="flex flex-col gap-2.5">
          {chapters.map((ch, idx) => (
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

// --- Book Content ---
export function BookContentScreen() {
  const { language, selectedClass, selectedSubject, selectedChapter } = useApp()
  const subjects = selectedClass ? (subjectsByClass[selectedClass] || []) : []
  const subject = subjects.find((s) => s.id === selectedSubject)
  const chapter = subject?.chapters.find((ch) => ch.id === selectedChapter)
  const content = getBookContent(chapter?.nameHi || "")

  return (
    <div className="flex min-h-screen flex-col bg-background pb-6">
      <ScreenHeader title={chapter?.name || getText("books", language)} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-1 text-base font-bold text-card-foreground">{chapter?.name}</h2>
          <p className="mb-4 text-xs text-muted-foreground">{chapter?.nameHi}</p>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-card-foreground/90">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Notes Content ---
export function NotesContentScreen() {
  const { language, selectedClass, selectedSubject, selectedChapter } = useApp()
  const subjects = selectedClass ? (subjectsByClass[selectedClass] || []) : []
  const subject = subjects.find((s) => s.id === selectedSubject)
  const chapter = subject?.chapters.find((ch) => ch.id === selectedChapter)
  const content = getNotesContent(chapter?.nameHi || "")

  return (
    <div className="flex min-h-screen flex-col bg-background pb-6">
      <ScreenHeader title={`${getText("notes", language)} - ${chapter?.name || ""}`} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="animate-fade-in rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="mb-1 text-base font-bold text-card-foreground">{chapter?.name}</h2>
          <p className="mb-4 text-xs text-muted-foreground">{chapter?.nameHi}</p>
          <div className="whitespace-pre-wrap text-sm leading-relaxed text-card-foreground/90">
            {content}
          </div>
        </div>
      </div>
    </div>
  )
}

// --- Important Questions ---
export function IQContentScreen() {
  const { language, selectedClass, selectedSubject, selectedChapter } = useApp()
  const subjects = selectedClass ? (subjectsByClass[selectedClass] || []) : []
  const subject = subjects.find((s) => s.id === selectedSubject)
  const chapter = subject?.chapters.find((ch) => ch.id === selectedChapter)
  const questions = getImportantQuestions(chapter?.nameHi || "")

  return (
    <div className="flex min-h-screen flex-col bg-background pb-6">
      <ScreenHeader title={`${getText("importantQuestions", language)} - ${chapter?.name || ""}`} />
      <div className="mx-auto w-full max-w-md px-4 py-4">
        <div className="flex flex-col gap-3">
          {questions.map((q, idx) => (
            <div
              key={idx}
              className="animate-fade-in rounded-2xl border border-border bg-card p-4 shadow-sm"
            >
              <div className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {idx + 1}
                </span>
                <p className="text-sm leading-relaxed text-card-foreground">{q}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
