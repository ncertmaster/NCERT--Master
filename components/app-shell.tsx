"use client"
import React from "react"
import { useApp } from "@/lib/app-context"
import { SplashScreen } from "@/components/screens/splash-screen"
import { AuthScreen } from "@/components/screens/auth-screen"
import { SetupScreen } from "@/components/screens/setup-screen"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import {
  ClassSelectScreen,
  SubjectSelectScreen,
  ChapterSelectScreen,
  BookContentScreen,
  NotesContentScreen,
  IQContentScreen,
} from "@/components/screens/content-screens"
import { QuizModeScreen } from "@/components/screens/quiz-mode-screen"
import { QuizPlayScreen } from "@/components/screens/quiz-play-screen"
import { SettingsScreen } from "@/components/screens/settings-screen"

export function AppShell() {
  const { screen } = useApp()

  const renderScreen = () => {
    switch (screen) {
      case "splash": return <SplashScreen />
      case "login": return <AuthScreen />
      case "signup": return <AuthScreen />
      case "setup": return <SetupScreen />
      case "dashboard": return <DashboardScreen />
      case "books-class": return <ClassSelectScreen flow="books" />
      case "books-subject": return <SubjectSelectScreen flow="books" />
      case "books-chapter": return <ChapterSelectScreen flow="books" />
      case "books-content": return <BookContentScreen />
      case "notes-class": return <ClassSelectScreen flow="notes" />
      case "notes-subject": return <SubjectSelectScreen flow="notes" />
      case "notes-chapter": return <ChapterSelectScreen flow="notes" />
      case "notes-content": return <NotesContentScreen />
      case "iq-class": return <ClassSelectScreen flow="iq" />
      case "iq-subject": return <SubjectSelectScreen flow="iq" />
      case "iq-chapter": return <ChapterSelectScreen flow="iq" />
      case "iq-content": return <IQContentScreen />
      case "quiz-class": return <ClassSelectScreen flow="quiz" />
      case "quiz-subject": return <SubjectSelectScreen flow="quiz" />
      case "quiz-mode": return <QuizModeScreen />
      case "quiz-chapter": return <ChapterSelectScreen flow="quiz" />
      case "quiz-play": return <QuizPlayScreen />
      case "settings": return <SettingsScreen />
      default: return <DashboardScreen />
    }
  }

  return (
    <main className="mx-auto min-h-screen max-w-md">
      {renderScreen()}
    </main>
  )
