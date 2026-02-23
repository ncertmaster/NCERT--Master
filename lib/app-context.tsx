"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

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
  const [screen, setScreen] = useState<AppScreen>("splash")
  const [user, setUser] = useState<any>(null)

  const handleSetScreen = useCallback((nextScreen: AppScreen) => {
    setScreen(nextScreen)
    // Only update history if window is available
    if (typeof window !== "undefined") {
      window.history.pushState({ screen: nextScreen }, "")
    }
  }, [])

  const goBack = useCallback(() => {
    if (typeof window !== "undefined") {
      window.history.back()
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setScreen("login")
  }, [])

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.screen) {
        setScreen(event.state.screen)
      }
    }
    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  return (
    <AppContext.Provider 
      value={{ 
        screen, 
        user, 
        setScreen: handleSetScreen, 
        setUser, 
        goBack, 
        logout 
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within an AppProvider")
  return context
}
