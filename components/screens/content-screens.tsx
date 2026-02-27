"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { subjectsByClass, streamsByClass } from "@/lib/data"
import type { ClassNumber } from "@/lib/data"

// ===============================
// 1️⃣ CLASS SELECT
// ===============================

export function ClassSelectScreen({ flow }: { flow: string }) {
  const {
    setScreen,
    setSelectedClass,
    setSelectedStream,
    setSelectedSubject,
    setSelectedBook,
    setSelectedChapter,
    goBack,
  } = useApp()

  const classes = [12, 11, 10, 9, 8, 7, 6]

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack}>
          <ChevronLeft />
        </button>
        <h1 className="ml-2 text-xl font-bold">Select Class</h1>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => {
              setSelectedClass(cls as ClassNumber)
              setSelectedStream(null)
              setSelectedSubject(null)
              setSelectedBook(null)
              setSelectedChapter(null)
              setScreen(`${flow}-subject`)
            }}
            className="w-full p-4 bg-card border rounded-xl flex justify-between"
          >
            <span>Class {cls}</span>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  )
}

// ===============================
// 2️⃣ SUBJECT / STREAM SELECT
// ===============================

export function SubjectSelectScreen({ flow }: { flow: string }) {
  const {
    selectedClass,
    setSelectedStream,
    setSelectedSubject,
    setSelectedBook,
    setSelectedChapter,
    setScreen,
    goBack,
  } = useApp()

  // 11 & 12 → Streams
  if (selectedClass === 11 || selectedClass === 12) {
    const streams = streamsByClass[selectedClass] || []

    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b">
          <button onClick={goBack}>
            <ChevronLeft />
          </button>
          <h1 className="ml-2 text-xl font-bold">Select Stream</h1>
        </div>

        <div className="flex-1 p-4 space-y-3">
          {streams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => {
                setSelectedStream(stream.id)
                setSelectedSubject(null)
                setSelectedBook(null)
                setSelectedChapter(null)
                setScreen(`${flow}-chapter`)
              }}
              className="w-full p-4 bg-card border rounded-xl flex justify-between"
            >
              <span>{stream.nameHi}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
    )
  }

  // 6–10 → Subjects
  const subjects = subjectsByClass[selectedClass || 6] || []

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack}>
          <ChevronLeft />
        </button>
        <h1 className="ml-2 text-xl font-bold">Select Subject</h1>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => {
              setSelectedSubject(subject.id)
              setSelectedBook(null)
              setSelectedChapter(null)
              setScreen(`${flow}-chapter`)
            }}
            className="w-full p-4 bg-card border rounded-xl flex justify-between"
          >
            <span>{subject.nameHi}</span>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  )
}

// ===============================
// 3️⃣ BOOK / CHAPTER SELECT
// ===============================

export function ChapterSelectScreen({ flow }: { flow: string }) {
  const {
    selectedClass,
    selectedStream,
    selectedSubject,
    selectedBook,
    setSelectedSubject,
    setSelectedBook,
    setSelectedChapter,
    setScreen,
    goBack,
  } = useApp()

  // ======================
  // 11th & 12th
  // ======================

  if (selectedClass === 11 || selectedClass === 12) {
    const streams = streamsByClass[selectedClass] || []

    // 1️⃣ Stream → Show Subjects
    if (selectedStream) {
      const stream = streams.find((s) => s.id === selectedStream)
      if (!stream) return null

      if (!selectedSubject) {
        return (
          <div className="flex flex-col h-full bg-background">
            <div className="flex items-center p-4 border-b">
              <button onClick={goBack}>
                <ChevronLeft />
              </button>
              <h1 className="ml-2 text-xl font-bold">Select Subject</h1>
            </div>

            <div className="flex-1 p-4 space-y-3">
              {stream.subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => {
                    setSelectedSubject(subject.id)
                    setSelectedBook(null)
                  }}
                  className="w-full p-4 bg-card border rounded-xl flex justify-between"
                >
                  <span>{subject.nameHi}</span>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        )
      }

      // 2️⃣ Subject → Show Books
      const subject = stream.subjects.find((s) => s.id === selectedSubject)
      if (!subject) return null

      if (!selectedBook) {
        return (
          <div className="flex flex-col h-full bg-background">
            <div className="flex items-center p-4 border-b">
              <button onClick={goBack}>
                <ChevronLeft />
              </button>
              <h1 className="ml-2 text-xl font-bold">Select Book</h1>
            </div>

            <div className="flex-1 p-4 space-y-3">
              {subject.books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => setSelectedBook(book.id)}
                  className="w-full p-4 bg-card border rounded-xl flex justify-between"
                >
                  <span>{book.nameHi}</span>
                  <ChevronRight />
                </button>
              ))}
            </div>
          </div>
        )
      }

      // 3️⃣ Book → Show Chapters
      const book = subject.books.find((b) => b.id === selectedBook)
      if (!book) return null

      return (
        <div className="flex flex-col h-full bg-background">
          <div className="flex items-center p-4 border-b">
            <button onClick={goBack}>
              <ChevronLeft />
            </button>
            <h1 className="ml-2 text-xl font-bold">Chapters</h1>
          </div>

          <div className="flex-1 p-4 space-y-3">
            {book.chapters.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => {
                  setSelectedChapter(chapter.id)
                  setScreen(`${flow}-content`)
                }}
                className="w-full p-4 bg-card border rounded-xl flex justify-between"
              >
                <span>{chapter.nameHi}</span>
                <ChevronRight />
              </button>
            ))}
          </div>
        </div>
      )
    }
  }

  // ======================
  // 6th–10th
  // ======================

  const subjects = subjectsByClass[selectedClass || 6] || []
  const subject = subjects.find((s) => s.id === selectedSubject)
  if (!subject) return null

  // 1️⃣ Show Books (if multiple)
  if (!selectedBook && subject.books.length > 1) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b">
          <button onClick={goBack}>
            <ChevronLeft />
          </button>
          <h1 className="ml-2 text-xl font-bold">Select Book</h1>
        </div>

        <div className="flex-1 p-4 space-y-3">
          {subject.books.map((book) => (
            <button
              key={book.id}
              onClick={() => setSelectedBook(book.id)}
              className="w-full p-4 bg-card border rounded-xl flex justify-between"
            >
              <span>{book.nameHi}</span>
              <ChevronRight />
            </button>
          ))}
        </div>
      </div>
    )
  }

  const book =
    subject.books.length === 1
      ? subject.books[0]
      : subject.books.find((b) => b.id === selectedBook)

  if (!book) return null

  // 2️⃣ Show Chapters
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack}>
          <ChevronLeft />
        </button>
        <h1 className="ml-2 text-xl font-bold">Chapters</h1>
      </div>

      <div className="flex-1 p-4 space-y-3">
        {book.chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => {
              setSelectedChapter(chapter.id)
              setScreen(`${flow}-content`)
            }}
            className="w-full p-4 bg-card border rounded-xl flex justify-between"
          >
            <span>{chapter.nameHi}</span>
            <ChevronRight />
          </button>
        ))}
      </div>
    </div>
  )
}

// ===============================
// 4️⃣ CONTENT WRAPPERS
// ===============================

export function ContentScreen({ title }: { title: string }) {
  const { goBack } = useApp()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack}>
          <ChevronLeft />
        </button>
        <h1 className="ml-2 text-lg font-bold">{title}</h1>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
  <div className="prose dark:prose-invert max-w-none">
    Content Load Ho Raha Hai...
  </div>
</div>
      </div>
    </div>
  )
}

export function BookContentScreen() {
  return <ContentScreen title="Book Content" />
}
export function NotesContentScreen() {
  return <ContentScreen title="Notes" />
}
export function IQContentScreen() {
  return <ContentScreen title="Important Questions" />
}
export function QuizModeScreen() {
  return <ContentScreen title="Quiz Mode" />
}
export function QuizPlayScreen() {
  return <ContentScreen title="Quiz Play" />
}
