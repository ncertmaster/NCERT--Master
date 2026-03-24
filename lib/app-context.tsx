"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import type { Language } from "@/lib/translations"
import type { ClassNumber } from "@/lib/data"

// ─── Supabase client ──────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export type AppScreen =
  | "splash"
  | "login"
  | "signup"
  | "setup"
  | "dashboard"
  | "books-class"
  | "books-subject"
  | "books-chapter"
  | "books-content"
  | "notes-class"
  | "notes-subject"
  | "notes-chapter"
  | "notes-content"
  | "iq-class"
  | "iq-subject"
  | "iq-chapter"
  | "iq-content"
  | "quiz-class"
  | "quiz-subject"
  | "quiz-mode"
  | "quiz-chapter"
  | "quiz-play"
  | "quiz-result"
  | "settings"

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
  language: Language
  selectedClass: ClassNumber | null
  selectedStream: string | null
  selectedSubject: string | null
  selectedBook: string | null
  selectedChapter: string | null
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
  setSelectedClass: (c: ClassNumber) => void
  setSelectedStream: (s: string | null) => void
  setSelectedSubject: (s: string | null) => void
  setSelectedBook: (b: string | null) => void
  setSelectedChapter: (ch: string | null) => void
  setQuizMode: (m: "chapter" | "full") => void
  setQuizScore: (score: number, total: number) => void
  logout: () => void
}

const AppContext = createContext<AppContextType | null>(null)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: "splash",
    user: null,
    language: "en",
    selectedClass: null,
    selectedStream: null,
    selectedSubject: null,
    selectedBook: null,
    selectedChapter: null,
    quizMode: null,
    quizScore: 0,
    quizTotal: 0,
    screenHistory: [],
  })

  // ─── On app load: check Supabase session OR localStorage ─────────────────
  useEffect(() => {
    async function initSession() {
      try {
        const savedLanguage = localStorage.getItem("ncert_language") as Language | null

        // 1. Check Supabase session first (Google OAuth / Phone OTP users)
        const { data: { session } } = await supabase.auth.getSession()

        if (session?.user) {
          const supaUser = session.user
          const savedMeta = localStorage.getItem("ncert_user")
          let existingMeta: UserProfile | null = null
          try { existingMeta = savedMeta ? JSON.parse(savedMeta) : null } catch {}

          const user: UserProfile = {
            name: existingMeta?.name || supaUser.user_metadata?.name || supaUser.email?.split("@")[0] || "Student",
            email: supaUser.email || supaUser.phone || "",
            classNumber: existingMeta?.classNumber || supaUser.user_metadata?.classNumber || 10,
            aim: existingMeta?.aim || supaUser.user_metadata?.aim || "",
            photo: supaUser.user_metadata?.avatar_url || null,
          }

          try { localStorage.setItem("ncert_user", JSON.stringify(user)) } catch {}

          // If new Google user (no classNumber set), go to setup
          const isNew = !existingMeta?.classNumber && !supaUser.user_metadata?.classNumber
          setState(prev => ({
            ...prev,
            user,
            screen: isNew ? "setup" : "dashboard",
            language: savedLanguage || "en",
          }))
          return
        }

        // 2. Fallback: localStorage (email/password users who were already logged in)
        const savedUser = localStorage.getItem("ncert_user")
        if (savedUser) {
          const user = JSON.parse(savedUser)
          setState(prev => ({
            ...prev,
            user,
            screen: "dashboard",
            language: savedLanguage || "en",
          }))
          return
        }

        // 3. Not logged in
        setState(prev => ({ ...prev, screen: "login" }))
      } catch {
        setState(prev => ({ ...prev, screen: "login" }))
      }
    }

    initSession()

    // Listen for Supabase auth changes (login/logout events)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (_event === "SIGNED_OUT") {
        try { localStorage.removeItem("ncert_user") } catch {}
        setState(prev => ({
          screen: "login",
          user: null,
          language: prev.language,
          selectedClass: null,
          selectedStream: null,
          selectedSubject: null,
          selectedBook: null,
          selectedChapter: null,
          quizMode: null,
          quizScore: 0,
          quizTotal: 0,
          screenHistory: [],
        }))
      }
    })

    return () => subscription.unsubscribe()
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

  const setSelectedClass = useCallback((selectedClass: ClassNumber) => {
    setState(prev => ({ ...prev, selectedClass }))
  }, [])

  const setSelectedStream = useCallback((selectedStream: string | null) => {
    setState(prev => ({ ...prev, selectedStream }))
  }, [])

  const setSelectedSubject = useCallback((selectedSubject: string | null) => {
    setState(prev => ({ ...prev, selectedSubject }))
  }, [])

  const setSelectedBook = useCallback((selectedBook: string | null) => {
    setState(prev => ({ ...prev, selectedBook }))
  }, [])

  const setSelectedChapter = useCallback((selectedChapter: string | null) => {
    setState(prev => ({ ...prev, selectedChapter }))
  }, [])

  const setQuizMode = useCallback((quizMode: "chapter" | "full") => {
    setState(prev => ({ ...prev, quizMode }))
  }, [])

  const setQuizScore = useCallback((quizScore: number, quizTotal: number) => {
    setState(prev => ({ ...prev, quizScore, quizTotal }))
  }, [])

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut()
      localStorage.removeItem("ncert_user")
    } catch {}
    setState(prev => ({
      screen: "login",
      user: null,
      language: prev.language,
      selectedClass: null,
      selectedStream: null,
      selectedSubject: null,
      selectedBook: null,
      selectedChapter: null,
      quizMode: null,
      quizScore: 0,
      quizTotal: 0,
      screenHistory: [],
    }))
  }, [])

  return (
    <AppContext.Provider value={{
      ...state,
      setScreen,
      goBack,
      setUser,
      setLanguage,
      setSelectedClass,
      setSelectedStream,
      setSelectedSubject,
      setSelectedBook,
      setSelectedChapter,
      setQuizMode,
      setQuizScore,
      logout,
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
