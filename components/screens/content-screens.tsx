"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ChevronLeft, ChevronRight, Book, FileText, GraduationCap } from "lucide-react"
import { subjectsByClass } from "@/lib/data"
import type { ClassNumber } from "@/lib/data"

// 1. CLASS SELECTION SCREEN
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
            className="w-full flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-medium">Class {cls}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

// 2. SUBJECT SELECTION SCREEN
export function SubjectSelectScreen({ flow }: { flow: string }) {
  const { setScreen, setSelectedSubject, selectedClass, goBack } = useApp()
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
              if (subject.books.length === 1) {
                setScreen(`${flow}-chapter`)
              } else {
                setScreen(`${flow}-chapter`)
              }
            }}
            className="w-full flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                <Book className="w-5 h-5" />
              </div>
              <span className="font-medium">{subject.nameHi}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

// 3. BOOK SELECTION SCREEN
export function ChapterSelectScreen({ flow }: { flow: string }) {
  const { setScreen, setSelectedChapter, selectedClass, selectedSubject, goBack } = useApp()
  const subjects = subjectsByClass[selectedClass || 6] || []
  const subject = subjects.find(s => s.id === selectedSubject)
  const books = subject?.books || []

  if (books.length > 1) {
    return (
      <div className="flex flex-col h-full bg-background">
        <div className="flex items-center p-4 border-b">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h1 className="ml-2 text-xl font-bold">Select Book</h1>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {books.map((book) => (
            <button
              key={book.id}
              onClick={() => setScreen(`${flow}-content`)}
              className="w-full flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3">
                  <Book className="w-5 h-5" />
                </div>
                <span className="font-medium">{book.nameHi}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>
      </div>
    )
  }

  const chapters = books[0]?.chapters || []
  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold">Chapters</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chapters.length === 0 ? (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Coming Soon...
          </div>
        ) : (
          chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => {
                setSelectedChapter(chapter.id)
                setScreen(`${flow}-content`)
              }}
              className="w-full flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary transition-colors"
            >
              <div className="flex items-center text-left">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center mr-3 shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm leading-tight">{chapter.nameHi}</span>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
            </button>
          ))
        )}
      </div>
    </div>
  )
}

// 4. CONTENT SCREENS
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
      <div className="flex-1 p-4 flex items-center justify-center text-muted-foreground">
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
      <div className="flex-1 p-4 flex items-center justify-center text-muted-foreground">
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
      <div className="flex-1 p-4 flex items-center justify-center text-muted-foreground">
        Coming Soon...
      </div>
    </div>
  )
      }
