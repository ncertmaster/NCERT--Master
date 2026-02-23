"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

export type AppScreen = string

interface AppContextType {
  screen: AppScreen
  user: any
  setScreen: (screen: AppScreen) => void
  setUser: (user: any) => void
  goBack: () => void
  logout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [screen, setScreenState] = useState<AppScreen>("splash")
  const [history, setHistory] = useState<AppScreen[]>([])
  const [user, setUserState] = useState<any>(null)

  const setScreen = useCallback((next: AppScreen) => {
    setHistory((prev) => [...prev, screen])
    setScreenState(next)
  }, [screen])

  const setUser = useCallback((user: any) => {
    setUserState(user)
    if (user) {
      setScreenState("dashboard")
    }
  }, [])

  const logout = useCallback(() => {
    setUserState(null)
    setHistory([])
    setScreenState("login")
  }, [])

  const goBack = useCallback(() => {
    setHistory((prev) => {
      if (prev.length === 0) return prev
      const newHistory = [...prev]
      const prevScreen = newHistory.pop()
      if (prevScreen) setScreenState(prevScreen)
      return newHistory
    })
  }, [])

  return (
    <AppContext.Provider value={{ screen, user, setScreen, setUser, goBack, logout }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within an AppProvider")
  return context
}
