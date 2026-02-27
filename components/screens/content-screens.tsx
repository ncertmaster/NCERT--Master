"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ChevronLeft, ChevronRight, GraduationCap } from "lucide-react"
import { subjectsByClass, streamsByClass } from "@/lib/data"
import type { ClassNumber } from "@/lib/data"

// ============================
// 1. CLASS SCREEN
// ============================

export function ClassSelectScreen({ flow }: { flow: string }) {
  const { setScreen, setSelectedClass, goBack } = useApp()
  const classes = [12, 11, 10, 9, 8, 7, 6]

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold">Select Class</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {classes.map((cls) => (
          <button
            key={cls}
            onClick={() => {
              setSelectedClass(cls as ClassNumber)
              setScreen(`${flow}-subject`)
            }}
            className="w-full flex justify-between p-4 bg-card border rounded-xl"
          >
            <div className="flex items-center">
              <GraduationCap className="w-5 h-5 mr-3" />
              <span>Class {cls}</span>
            </div>
            <ChevronRight className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================
// 2. SUBJECT / STREAM SCREEN
// ============================

export function SubjectSelectScreen({ flow }: { flow: string }) {
  const { setScreen, setSelectedSubject, selectedClass, goBack } = useApp()

  if (selectedClass === 11 || selectedClass === 12) {
    const streams = streamsByClass[selectedClass] || []

    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-2 text-xl font-bold">Select Stream</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {streams.map((stream) => (
            <button
              key={stream.id}
              onClick={() => {
                setSelectedSubject(stream.id)
                setScreen(`${flow}-chapter`)
              }}
              className="w-full flex justify-between p-4 bg-card border rounded-xl"
            >
              <span>{stream.nameHi}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ))}
        </div>
      </div>
    )
  }

  const subjects = subjectsByClass[selectedClass || 6] || []

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold">Select Subject</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {subjects.map((subject) => (
          <button
            key={subject.id}
            onClick={() => {
              setSelectedSubject(subject.id)
              setScreen(`${flow}-chapter`)
            }}
            className="w-full flex justify-between p-4 bg-card border rounded-xl"
          >
            <span>{subject.nameHi}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        ))}
      </div>
    </div>
  )
}

// ============================
// 3. CHAPTER SCREEN
// ============================

export function ChapterSelectScreen({ flow }: { flow: string }) {
  const {
    setScreen,
    setSelectedChapter,
    selectedClass,
    selectedSubject,
    goBack,
  } = useApp()

  if (selectedClass === 11 || selectedClass === 12) {
    const streams = streamsByClass[selectedClass] || []

    const stream = streams.find((s) => s.id === selectedSubject)
    if (stream) {
      return (
        <div className="flex flex-col h-full bg-background">
          <div className="flex items-center p-4 border-b">
            <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <h1 className="ml-2 text-xl font-bold">Select Subject</h1>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {stream.subjects.map((subject) => (
              <button
                key={subject.id}
                onClick={() => {
                  setSelectedSubject(subject.id)
                  setScreen(`${flow}-chapter`)
                }}
                className="w-full flex justify-between p-4 bg-card border rounded-xl"
              >
                <span>{subject.nameHi}</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            ))}
          </div>
        </div>
      )
    }

    for (const s of streams) {
      const subject = s.subjects.find((sub) => sub.id === selectedSubject)
      if (subject) {
        return (
          <div className="flex flex-col h-full bg-background">
            <div className="flex items-center p-4 border-b">
              <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <h1 className="ml-2 text-xl font-bold">Select Book</h1>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {subject.books.map((book) => (
                <button
                  key={book.id}
                  onClick={() => {
                    setSelectedChapter(book.id)
                    setScreen(`${flow}-content`)
                  }}
                  className="w-full flex justify-between p-4 bg-card border rounded-xl"
                >
                  <span>{book.nameHi}</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>
        )
      }
    }
  }

  const subjects = subjectsByClass[selectedClass || 6] || []
  const subject = subjects.find((s) => s.id === selectedSubject)
  if (!subject) return null

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold">Chapters</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {subject.books.flatMap((book) =>
          book.chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                setSelectedChapter(chapter.id)
                setScreen(`${flow}-content`)
              }}
              className="w-full flex justify-between p-4 bg-card border rounded-xl"
            >
              <span>{chapter.nameHi}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          ))
        )}
      </div>
    </div>
  )
}

// ============================
// 4. CONTENT SCREENS
// ============================

export function BookContentScreen() {
  const { goBack } = useApp()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold">Book Content</h1>
      </div>

      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Coming Soon...
      </div>
    </div>
  )
}

export function NotesContentScreen() {
  const { goBack } = useApp()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold">Notes</h1>
      </div>

      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Coming Soon...
      </div>
    </div>
  )
}

export function IQContentScreen() {
  const { goBack } = useApp()

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold">Important Questions</h1>
      </div>

      <div className="flex-1 flex items-center justify-center text-muted-foreground">
        Coming Soon...
      </div>
    </div>
  )
          }
