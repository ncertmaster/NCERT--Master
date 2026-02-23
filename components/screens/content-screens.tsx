"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ChevronLeft, ChevronRight, Book, FileText, Brain, GraduationCap } from "lucide-react"

// 1. CLASS SELECTION SCREEN
export function ClassSelectScreen({ flow }: { flow: string }) {
  const { setScreen, goBack } = useApp()
  const classes = ["Class 12", "Class 11", "Class 10", "Class 9", "Class 8", "Class 7", "Class 6"]

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold capitalize">{flow} - Select Class</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {classes.map((className) => (
          <button
            key={className}
            onClick={() => setScreen(`${flow}-subject`)}
            className="w-full flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="font-medium">{className}</span>
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
  const { setScreen, goBack } = useApp()
  const subjects = ["Physics", "Chemistry", "Mathematics", "Biology", "English", "Hindi"]

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold capitalize">Select Subject</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {subjects.map((subject) => (
          <button
            key={subject}
            onClick={() => setScreen(`${flow}-chapter`)}
            className="w-full flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary transition-colors"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mr-3">
                <Book className="w-5 h-5" />
              </div>
              <span className="font-medium">{subject}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  )
}

// 3. CHAPTER SELECTION SCREEN
export function ChapterSelectScreen({ flow }: { flow: string }) {
  const { setScreen, goBack } = useApp()
  const chapters = ["Chapter 1: Electric Charges", "Chapter 2: Potential", "Chapter 3: Current"]

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold capitalize">Chapters</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {chapters.map((chapter) => (
          <button
            key={chapter}
            onClick={() => setScreen(`${flow}-content`)}
            className="w-full flex items-center justify-between p-4 bg-card border rounded-xl hover:border-primary transition-colors"
          >
            <div className="flex items-center text-left">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground mr-3 shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <span className="font-medium text-sm leading-tight">{chapter}</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground shrink-0" />
          </button>
        ))}
      </div>
    </div>
  )
}

// 4. CONTENT VIEWERS
export function BookContentScreen() {
  const { goBack } = useApp()
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center p-4 border-b bg-background">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold truncate">NCERT Book Content</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto italic text-muted-foreground text-center flex items-center justify-center">
        PDF Viewer / Content will load here...
      </div>
    </div>
  )
}

export function NotesContentScreen() {
  const { goBack } = useApp()
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center p-4 border-b bg-background">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold">Notes Content</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Summary of Chapter</h2>
        <p className="text-muted-foreground">Detailed notes will be displayed here for the student.</p>
      </div>
    </div>
  )
}

export function IQContentScreen() {
  const { goBack } = useApp()
  return (
    <div className="flex flex-col h-full bg-white">
      <div className="flex items-center p-4 border-b bg-background">
        <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-lg font-bold">Important Questions</h1>
      </div>
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        <div className="p-4 bg-accent/30 rounded-lg">
          <p className="font-bold">Q1: What is Electric Charge?</p>
          <p className="mt-2 text-sm">Ans: Physical property of matter that causes it to experience a force...</p>
        </div>
      </div>
    </div>
  )
      }
      
