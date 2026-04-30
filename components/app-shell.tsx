"use client"
import React, { useState } from "react"
import { useApp } from "@/lib/app-context"
import { SplashScreen } from "@/components/screens/splash-screen"
import { SetupScreen } from "@/components/screens/setup-screen"
import { DashboardScreen } from "@/components/screens/dashboard-screen"
import {
  ClassSelectScreen,
  SubjectSelectScreen,
  ChapterSelectScreen,
  BookContentScreen,
  NotesContentScreen,
  IQContentScreen,
  BooksListScreen,
  BooksReaderScreen,
} from "@/components/screens/content-screens"
import { QuizModeScreen } from "@/components/screens/quiz-mode-screen"
import { QuizPlayScreen } from "@/components/screens/quiz-play-screen"
import { QuizHistoryScreen } from "@/components/screens/quiz-history-screen"
import { SettingsScreen } from "@/components/screens/settings-screen"
import { StudyTimerScreen } from "@/components/screens/study-timer-screen"
import { DiaryScreen } from "@/components/screens/diary-screen"
import { PrivacyPolicyScreen } from "@/components/screens/privacy-policy-screen"
import { AiDoubtSolverScreen } from "@/components/screens/ai-doubt-solver"
import { MessageCircle, X } from "lucide-react"
import { AiDoubtSolverScreen } from "@/components/screens/ai-doubt-solver"

// ── Per-screen Error Boundary ────────────────────────────────────────────────
// A crash inside one screen will NOT take down the whole app.
interface EBState { hasError: boolean; message: string }

class ErrorBoundary extends React.Component<
  { children: React.ReactNode; screenKey: string },
  EBState
> {
  constructor(props: { children: React.ReactNode; screenKey: string }) {
    super(props)
    this.state = { hasError: false, message: "" }
  }

  static getDerivedStateFromError(error: Error): EBState {
    return { hasError: true, message: error?.message || "Unknown error" }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Non-fatal logging — does not affect the user
    console.error(`[ErrorBoundary] Screen "${this.props.screenKey}" crashed:`, error, info)
  }

  // Reset when the user navigates to a different screen
  componentDidUpdate(prevProps: { screenKey: string }) {
    if (prevProps.screenKey !== this.props.screenKey && this.state.hasError) {
      this.setState({ hasError: false, message: "" })
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-3xl">
            ⚠️
          </div>
          <h2 className="text-base font-semibold text-foreground">
            Kuch galat ho gaya
          </h2>
          <p className="text-xs text-muted-foreground max-w-xs leading-relaxed">
            {this.state.message || "Screen load nahi ho saki. Wapas jao aur dobara try karo."}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, message: "" })}
            className="mt-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.97]"
          >
            🔄 Dobara Try Karo
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

// ── AppShell ──────────────────────────────────────────────────────────────────
export function AppShell() {
  const { screen, eyeProtection } = useApp()

  const renderScreen = () => {
    switch (screen) {
      case "splash":         return <SplashScreen />
      case "setup":          return <SetupScreen />
      case "dashboard":      return <DashboardScreen />
      case "books-class":    return <ClassSelectScreen flow="books" />
      case "books-subject":  return <SubjectSelectScreen flow="books" />
      case "books-chapter":  return <ChapterSelectScreen flow="books" />
      case "books-list":     return <BooksListScreen />
      case "books-reader":   return <BooksReaderScreen />
      case "books-content":  return <BookContentScreen />
      case "notes-class":    return <ClassSelectScreen flow="notes" />
      case "notes-subject":  return <SubjectSelectScreen flow="notes" />
      case "notes-chapter":  return <ChapterSelectScreen flow="notes" />
      case "notes-content":  return <NotesContentScreen />
      case "iq-class":       return <ClassSelectScreen flow="iq" />
      case "iq-subject":     return <SubjectSelectScreen flow="iq" />
      case "iq-chapter":     return <ChapterSelectScreen flow="iq" />
      case "iq-content":     return <IQContentScreen />
      case "quiz-class":     return <ClassSelectScreen flow="quiz" />
      case "quiz-subject":   return <SubjectSelectScreen flow="quiz" />
      case "quiz-mode":      return <QuizModeScreen />
      case "quiz-chapter":   return <ChapterSelectScreen flow="quiz" />
      case "quiz-play":      return <QuizPlayScreen />
      case "settings":       return <SettingsScreen />
      case "study-timer":    return <StudyTimerScreen />
      case "diary":          return <DiaryScreen />
      case "privacy-policy": return <PrivacyPolicyScreen />
      case "quiz-history":   return <QuizHistoryScreen />
      case "doubt":          return <AiDoubtSolverScreen />
      default:               return <DashboardScreen />
    }
  }

  const [doubtOpen, setDoubtOpen] = useState(false)

  // Hide FAB on splash and setup screens
  const showFAB = screen !== "splash" && screen !== "setup" && screen !== "doubt"

  return (
    <main
      className="mx-auto min-h-screen max-w-md"
      style={
        eyeProtection
          ? { filter: "sepia(25%) brightness(0.93) saturate(0.85)", transition: "filter 0.4s ease" }
          : { filter: "none", transition: "filter 0.4s ease" }
      }
    >
      <ErrorBoundary key={screen} screenKey={screen}>
        <div key={screen}>
          {renderScreen()}
        </div>
      </ErrorBoundary>

      {/* ── Guru AI Floating Button (Meta AI style) ── */}
      {showFAB && (
        <button
          onClick={() => setDoubtOpen(true)}
          className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all active:scale-95"
          style={{
            background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
            boxShadow: "0 4px 20px rgba(139, 92, 246, 0.5)",
          }}
          aria-label="Guru AI - Doubt Solver"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </button>
      )}

      {/* ── Guru AI Fullscreen Overlay ── */}
      {doubtOpen && (
        <div className="fixed inset-0 z-[100] flex flex-col bg-background animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 shadow-sm">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ background: "linear-gradient(135deg, #6366f1, #ec4899)" }}
            >
              <MessageCircle className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground">Guru AI</p>
              <p className="text-[10px] text-muted-foreground">NCERT Doubt Solver</p>
            </div>
            <button
              onClick={() => setDoubtOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Body */}
          <div className="flex-1 overflow-hidden">
            <AiDoubtSolverScreen />
          </div>
        </div>
      )}
    </main>
  )
}
