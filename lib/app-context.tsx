"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

type AppScreen =
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
  | "settings"

interface AppContextType {
  screen: AppScreen
  setScreen: (screen: AppScreen) => void
  user: any
  setUser: (user: any) => void
  language: string
  setLanguage: (lang: string) => void
  goBack: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreen] = useState<AppScreen>("splash")
  const [user, setUser] = useState<any>(null)
  const [language, setLanguage] = useState("Hindi")
  const [history, setHistory] = useState<AppScreen[]>([])

  useEffect(() => {
    const savedUser = localStorage.getItem("ncert_user")
    const savedLang = localStorage.getItem("ncert_lang")
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setScreen("dashboard")
    }
    if (savedLang) {
      setLanguage(savedLang)
    }
  }, [])

  const handleSetUser = (userData: any) => {
    setUser(userData)
    if (userData) {
      localStorage.setItem("ncert_user", JSON.stringify(userData))
    } else {
      localStorage.removeItem("ncert_user")
    }
  }

  const handleSetLanguage = (lang: string) => {
    setLanguage(lang)
    localStorage.setItem("ncert_lang", lang)
  }

  const handleSetScreen = (newScreen: AppScreen) => {
    setHistory((prev) => [...prev, screen])
    setScreen(newScreen)
  }

  const goBack = () => {
    if (history.length > 0) {
      const lastScreen = history[history.length - 1]
      setHistory((prev) => prev.slice(0, -1))
      setScreen(lastScreen)
    }
  }

  return (
    <AppContext.Provider 
      value={{ 
        screen, 
        setScreen: handleSetScreen, 
        user, 
        setUser: handleSetUser, 
        language, 
        setLanguage: handleSetLanguage,
        goBack 
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
