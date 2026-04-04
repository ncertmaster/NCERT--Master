"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import type { Language } from "@/lib/translations"
import type { ClassNumber } from "@/lib/data"
import { supabase } from "@/lib/supabase"
import type { User } from "@supabase/supabase-js"

export type AppScreen =
  | "splash" | "setup" | "dashboard"
  | "books-class" | "books-subject" | "books-chapter" | "books-content" | "books-list" | "books-reader"
  | "notes-class" | "notes-subject" | "notes-chapter" | "notes-content"
  | "iq-class" | "iq-subject" | "iq-chapter" | "iq-content"
  | "quiz-class" | "quiz-subject" | "quiz-mode" | "quiz-chapter" | "quiz-play" | "quiz-result"
  | "settings" | "study-timer" | "diary" | "privacy-policy" | "quiz-history"

export interface UserProfile {
  name: string
  email: string
  classNumber: ClassNumber
  aim: string
  photo: string | null
}

interface AppState {
  screen: AppScreen
  user: UserProfile | null
  supabaseUser: User | null
  sessionReady: boolean
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
  logout: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: "splash",
    user: null,
    supabaseUser: null,
    sessionReady: false,
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

  // ── Load session + user profile on mount ──────────────────────────────────
  useEffect(() => {
    async function init() {
      // Run Supabase session check + minimum splash display time (1.5s) in parallel
      const [sessionResult] = await Promise.all([
        supabase.auth.getSession(),
        new Promise<void>(resolve => setTimeout(resolve, 1500)),
      ])

      const supabaseUser = sessionResult.data?.session?.user ?? null

      // Load saved profile from localStorage
      let savedProfile: UserProfile | null = null
      try {
        const raw = localStorage.getItem("ncert_user")
        if (raw) savedProfile = JSON.parse(raw)
      } catch {}

      const savedLanguage = localStorage.getItem("ncert_language") as Language | null
      const savedEyeProtection = localStorage.getItem("ncert_eye_protection") === "true"

      // If Supabase user exists, sync their email
      if (supabaseUser && savedProfile) {
        savedProfile.email = supabaseUser.email || savedProfile.email
        savedProfile.photo = savedProfile.photo || supabaseUser.user_metadata?.avatar_url || null
        savedProfile.name = savedProfile.name || supabaseUser.user_metadata?.full_name || ""
      }

      // Determine correct screen — dashboard only if profile is complete
      const screen = savedProfile?.name && savedProfile?.classNumber ? "dashboard" : "setup"

      setState(prev => ({
        ...prev,
        supabaseUser,
        sessionReady: true,
        user: savedProfile,
        screen,
        language: savedLanguage || "en",
        eyeProtection: savedEyeProtection,
      }))
    }

    init()

    // Listen for auth changes (Google login callback etc.)
    // IMPORTANT: Only change screen AFTER sessionReady (init completed).
    // This prevents the flash where setup screen shows briefly before dashboard.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      const supabaseUser = session?.user ?? null
      setState(prev => {
        // During initial load (sessionReady = false), let init() handle screen.
        // Only act on auth changes AFTER app is fully initialized.
        if (!prev.sessionReady) {
          return { ...prev, supabaseUser }
        }
        let screen = prev.screen
        if (event === "SIGNED_IN" && supabaseUser) {
          const hasProfile = prev.user?.name && prev.user?.classNumber
          screen = hasProfile ? "dashboard" : "setup"
        }
        if (event === "SIGNED_OUT") screen = "setup"
        return { ...prev, supabaseUser, sessionReady: true, screen }
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  const setScreen = useCallback((screen: AppScreen) => {
    window.history.pushState(null, "", "")
    setState(prev => ({ ...prev, screen, screenHistory: [...prev.screenHistory, prev.screen] }))
  }, [])

  const goBack = useCallback(() => {
    setState(prev => {
      const history = [...prev.screenHistory]
      const previousScreen = history.pop() || "dashboard"
      return { ...prev, screen: previousScreen as AppScreen, screenHistory: history }
    })
  }, [])

  useEffect(() => {
    const handlePopState = () => {
      setState(prev => {
        const history = [...prev.screenHistory]
        const previousScreen = history.pop() || "dashboard"
        return { ...prev, screen: previousScreen as AppScreen, screenHistory: history }
      })
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const setUser = useCallback((user: UserProfile) => {
    try { localStorage.setItem("ncert_user", JSON.stringify(user)) } catch {}
    setState(prev => ({ ...prev, user }))
  }, [])

  const setLanguage = useCallback((language: Language) => {
    try { localStorage.setItem("ncert_language", language) } catch {}
    setState(prev => ({ ...prev, language }))
  }, [])

  const setEyeProtection = useCallback((eyeProtection: boolean) => {
    try { localStorage.setItem("ncert_eye_protection", String(eyeProtection)) } catch {}
    setState(prev => ({ ...prev, eyeProtection }))
  }, [])

  const setSelectedClass = useCallback((selectedClass: ClassNumber) => setState(prev => ({ ...prev, selectedClass })), [])
  const setSelectedStream = useCallback((selectedStream: string | null) => setState(prev => ({ ...prev, selectedStream })), [])
  const setSelectedSubject = useCallback((selectedSubject: string | null) => setState(prev => ({ ...prev, selectedSubject })), [])
  const setSelectedBook = useCallback((selectedBook: string | null) => setState(prev => ({ ...prev, selectedBook })), [])
  const setSelectedChapter = useCallback((selectedChapter: string | null) => setState(prev => ({ ...prev, selectedChapter })), [])
  const setSelectedBookUrl = useCallback((selectedBookUrl: string | null) => setState(prev => ({ ...prev, selectedBookUrl })), [])
  const setQuizMode = useCallback((quizMode: "chapter" | "full") => setState(prev => ({ ...prev, quizMode })), [])
  const setQuizScore = useCallback((quizScore: number, quizTotal: number) => setState(prev => ({ ...prev, quizScore, quizTotal })), [])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    try { localStorage.removeItem("ncert_user") } catch {}
    setState(prev => ({
      screen: "setup", user: null, supabaseUser: null, sessionReady: true,
      language: prev.language, eyeProtection: prev.eyeProtection,
      selectedClass: null, selectedStream: null,
      selectedSubject: null, selectedBook: null, selectedChapter: null,
      selectedBookUrl: null, quizMode: null, quizScore: 0, quizTotal: 0, screenHistory: [],
    }))
  }, [])

  return (
    <AppContext.Provider value={{
      ...state, setScreen, goBack, setUser, setLanguage, setEyeProtection,
      setSelectedClass, setSelectedStream, setSelectedSubject,
      setSelectedBook, setSelectedChapter, setSelectedBookUrl,
      setQuizMode, setQuizScore, logout,
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

    
