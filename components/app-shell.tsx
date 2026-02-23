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
import { useEffect } from "react"

export function AppShell() {
  const { screen, goBack } = useApp()

  useEffect(() => {
    // Har screen change par history mein ek entry push karo
    window.history.pushState({ screen }, "", "")

    const handlePopState = (event: PopStateEvent) => {
      // Splash, Login ya Dashboard par back button kaam nahi karega (App exit hoga)
      const noBackScreens = ["splash", "login", "signup", "dashboard"]
      
      if (!noBackScreens.includes(screen)) {
        // Default back behaviour ko roko
        event.preventDefault()
        // App ke andar pichli screen par jao
        goBack()
        // Dobara state push karo taaki next back bhi handle ho sake
        window.history.pushState({ screen }, "", "")
      }
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [screen, goBack])

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
    <main className="mx-auto min-h-screen max-w-md bg-background">
      {screens[screen] || <DashboardScreen />}
    </main>
  )
}
