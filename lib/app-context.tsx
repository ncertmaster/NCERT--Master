"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Language } from "@/lib/translations"
import type { ClassNumber } from "@/lib/data"

export type AppScreen =
  | "splash" | "setup" | "dashboard"
  | "books-class" | "books-subject" | "books-chapter" | "books-content" | "books-list" | "books-reader"
  | "notes-class" | "notes-subject" | "notes-chapter" | "notes-content"
  | "iq-class" | "iq-subject" | "iq-chapter" | "iq-content"
  | "quiz-class" | "quiz-subject" | "quiz-mode" | "quiz-chapter" | "quiz-play" | "quiz-result"
  | "settings" | "study-timer" | "diary" | "privacy-policy" | "quiz-history"
  | "doubt"
export interface UserProfile {
  name: string
  classNumber: ClassNumber
  aim: string
  photo: string | null
  email?: string
}

interface AppState {
  screen: AppScreen
  user: UserProfile | null
  language: Language
  eyeProtection: boolean
  selectedClass: ClassNumber | null
  selectedStream: string | null
  selectedSubject: string | null
  selectedBook: string | null
  selectedChapter: string | null
  selectedBookUrl: string | null
  quizMode: "chapter" | "full" | null
  quizScore: number
  quizTotal: number
  screenHistory: AppScreen[]
}

interface AppContextType extends AppState {
  setScreen: (screen: AppScreen) => void
  goBack: () => void
  setUser: (user: UserProfile) => void
  setLanguage: (lang: Language) => void
  setEyeProtection: (v: boolean) => void
  setSelectedClass: (c: ClassNumber) => void
  setSelectedStream: (s: string | null) => void
  setSelectedSubject: (s: string | null) => void
  setSelectedBook: (b: string | null) => void
  setSelectedChapter: (ch: string | null) => void
  setSelectedBookUrl: (url: string | null) => void
  setQuizMode: (m: "chapter" | "full") => void
  setQuizScore: (score: number, total: number) => void
}

const AppContext = createContext<AppContextType | null>(null)

// ── Safe localStorage helpers ──────────────────────────────────────────────
// Reads a key; returns null on any error (missing key, corrupt JSON, SSR, quota)
function safeGet(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

// Writes a value; silently ignores quota exceeded and SSR errors
function safeSet(key: string, value: string): void {
  try {
    // Guard: warn if we're approaching 4MB to prevent silent failures
    if (typeof window !== "undefined") {
      try {
        const used = JSON.stringify(localStorage).length
        if (used > 4 * 1024 * 1024) {
          console.warn("[Storage] localStorage usage > 4MB — cleaning old quiz history")
          cleanOldQuizHistory()
        }
      } catch { /* estimation failed, proceed anyway */ }
    }
    localStorage.setItem(key, value)
  } catch {
    // QuotaExceededError — attempt cleanup and retry once
    try {
      cleanOldQuizHistory()
      localStorage.setItem(key, value)
    } catch {
      console.error(`[Storage] Failed to save "${key}" even after cleanup`)
    }
  }
}

// Removes quiz history entries older than 30 days to free up space
function cleanOldQuizHistory(): void {
  try {
    const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
    const keysToRemove: string[] = []
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i)
      if (!k?.startsWith("ncert_quiz_history")) continue
      try {
        const raw = localStorage.getItem(k)
        if (!raw) continue
        const history: any[] = JSON.parse(raw)
        // Keep only entries newer than cutoff
        const trimmed = history.filter((e: any) => {
          const ts = e.timestamp ?? e.date ?? 0
          return new Date(ts).getTime() > cutoff
        })
        if (trimmed.length < history.length) {
          if (trimmed.length === 0) keysToRemove.push(k)
          else localStorage.setItem(k, JSON.stringify(trimmed))
        }
      } catch { keysToRemove.push(k!) }
    }
    keysToRemove.forEach(k => { try { localStorage.removeItem(k) } catch {} })
  } catch { /* ignore */ }
}

// ── Provider ───────────────────────────────────────────────────────────────
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: "splash",
    user: null,
    language: "en",
    eyeProtection: false,
    selectedClass: null,
    selectedStream: null,
    selectedSubject: null,
    selectedBook: null,
    selectedChapter: null,
    selectedBookUrl: null,
    quizMode: null,
    quizScore: 0,
    quizTotal: 0,
    screenHistory: [],
  })

  useEffect(() => {
    async function init() {
      await new Promise<void>(resolve => setTimeout(resolve, 1500))

      let savedProfile: UserProfile | null = null
      try {
        const raw = safeGet("ncert_user")
        if (raw) savedProfile = JSON.parse(raw)
      } catch { savedProfile = null }

      const savedLanguage      = safeGet("ncert_language") as Language | null
      const savedEyeProtection = safeGet("ncert_eye_protection") === "true"
      const screen             = savedProfile?.name && savedProfile?.classNumber ? "dashboard" : "setup"

      setState(prev => ({
        ...prev,
        user:          savedProfile,
        screen,
        language:      savedLanguage || "en",
        eyeProtection: savedEyeProtection,
      }))
    }
    init()
  }, [])

  const setScreen = useCallback((screen: AppScreen) => {
    window.history.pushState(null, "", "")
    setState(prev => ({
      ...prev,
      screen,
      screenHistory: [...prev.screenHistory, prev.screen],
    }))
  }, [])

  const goBack = useCallback(() => {
    setState(prev => {
      const history       = [...prev.screenHistory]
      const previousScreen = history.pop() || "dashboard"
      return { ...prev, screen: previousScreen as AppScreen, screenHistory: history }
    })
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setState(prev => {
        const history        = [...prev.screenHistory]
        const previousScreen = history.pop() || "dashboard"
        return { ...prev, screen: previousScreen as AppScreen, screenHistory: history }
      })
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const setUser = useCallback((user: UserProfile) => {
    safeSet("ncert_user", JSON.stringify(user))
    setState(prev => ({ ...prev, user }))
  }, [])

  const setLanguage = useCallback((language: Language) => {
    safeSet("ncert_language", language)
    setState(prev => ({ ...prev, language }))
  }, [])

  const setEyeProtection = useCallback((eyeProtection: boolean) => {
    safeSet("ncert_eye_protection", String(eyeProtection))
    setState(prev => ({ ...prev, eyeProtection }))
  }, [])

  const setSelectedClass   = useCallback((selectedClass: ClassNumber) =>   setState(prev => ({ ...prev, selectedClass })), [])
  const setSelectedStream  = useCallback((selectedStream: string | null) => setState(prev => ({ ...prev, selectedStream })), [])
  const setSelectedSubject = useCallback((selectedSubject: string | null) => setState(prev => ({ ...prev, selectedSubject })), [])
  const setSelectedBook    = useCallback((selectedBook: string | null) =>   setState(prev => ({ ...prev, selectedBook })), [])
  const setSelectedChapter = useCallback((selectedChapter: string | null) => setState(prev => ({ ...prev, selectedChapter })), [])
  const setSelectedBookUrl = useCallback((selectedBookUrl: string | null) => setState(prev => ({ ...prev, selectedBookUrl })), [])
  const setQuizMode        = useCallback((quizMode: "chapter" | "full") =>  setState(prev => ({ ...prev, quizMode })), [])
  const setQuizScore       = useCallback((quizScore: number, quizTotal: number) => setState(prev => ({ ...prev, quizScore, quizTotal })), [])

  return (
    <AppContext.Provider value={{
      ...state,
      setScreen, goBack, setUser, setLanguage, setEyeProtection,
      setSelectedClass, setSelectedStream, setSelectedSubject,
      setSelectedBook, setSelectedChapter, setSelectedBookUrl,
      setQuizMode, setQuizScore,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within AppProvider")
  return context
}
