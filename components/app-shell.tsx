"use client"

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

  const screens: Record<string, React.ReactNode> = {
    splash: <SplashScreen />,
    login: <AuthScreen />,
    signup: <AuthScreen />,
    setup: <SetupScreen />,
    dashboard: <DashboardScreen />,

    "books-class": <ClassSelectScreen flow="books" />,
    "books-subject": <SubjectSelectScreen flow="books" />,
    "books-chapter": <ChapterSelectScreen flow="books" />,
    "books-content": <BookContentScreen />,

    "notes-class": <ClassSelectScreen flow="notes" />,
    "notes-subject": <SubjectSelectScreen flow="notes" />,
    "notes-chapter": <ChapterSelectScreen flow="notes" />,
    "notes-content": <NotesContentScreen />,

    "iq-class": <ClassSelectScreen flow="iq" />,
    "iq-subject": <SubjectSelectScreen flow="iq" />,
    "iq-chapter": <ChapterSelectScreen flow="iq" />,
    "iq-content": <IQContentScreen />,

    "quiz-class": <ClassSelectScreen flow="quiz" />,
    "quiz-subject": <SubjectSelectScreen flow="quiz" />,
    "quiz-mode": <QuizModeScreen />,
    "quiz-chapter": <ChapterSelectScreen flow="quiz" />,
    "quiz-play": <QuizPlayScreen />,

    settings: <SettingsScreen />,
  }

  return (
    <main className="mx-auto min-h-screen max-w-md">
      {screens[screen] || <DashboardScreen />}
    </main>
  )
}
