"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ChevronLeft, ChevronRight, Book, GraduationCap } from "lucide-react"
import { subjectsByClass, streamsByClass } from "@/lib/data"
import type { ClassNumber } from "@/lib/data"

// ===============================
// 1️⃣ CLASS SELECT
// ===============================

export function ClassSelectScreen({ flow }: { flow: string }) {
  const { setScreen, setSelectedClass, goBack } = useApp()
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
  const { selectedClass, setScreen, setSelectedSubject, goBack } = useApp()

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
                setSelectedSubject(stream.id)
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
// 3️⃣ CHAPTER / BOOK SELECT
// ===============================

export function ChapterSelectScreen({ flow }: { flow: string }) {
  const {
    selectedClass,
    selectedSubject,
    setSelectedSubject,
    setSelectedChapter,
    setScreen,
    goBack,
  } = useApp()

  // ======================
  // 11th & 12th Logic
  // ======================

  if (selectedClass === 11 || selectedClass === 12) {
    const streams = streamsByClass[selectedClass] || []

    // Step 1 → Stream match
    const stream = streams.find((s) => s.id === selectedSubject)

    // अगर stream select हुआ है → subjects दिखाओ
    if (stream) {
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

    // Step 2 → Subject match (Books दिखाओ)
    for (const s of streams) {
      const subject = s.subjects.find((sub) => sub.id === selectedSubject)

      if (subject) {
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
                  onClick={() => {
                    setSelectedChapter(book.id)
                    setScreen(`${flow}-content`)
                  }}
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
    }

    return null
  }

  // ======================
  // 6th–10th Logic
  // ======================

  const subjects = subjectsByClass[selectedClass || 6] || []
  const subject = subjects.find((s) => s.id === selectedSubject)

  if (!subject) return null

  // Multiple books → Books दिखाओ
  if (subject.books.length > 1) {
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
              onClick={() => {
                setSelectedChapter(book.id)
                setScreen(`${flow}-content`)
              }}
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

  // Single book → Chapters दिखाओ
  const book = subject.books[0]

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
// 4️⃣ CONTENT SCREEN
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

      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Coming Soon...
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
