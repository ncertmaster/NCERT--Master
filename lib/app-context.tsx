"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

export type AppScreen = string

interface AppState {
  screen: AppScreen
  history: AppScreen[]
}

interface AppContextType {
  screen: AppScreen
  setScreen: (screen: AppScreen) => void
  goBack: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>({
    screen: "splash",
    history: [],
  })

  const setScreen = useCallback((nextScreen: AppScreen) => {
    setState((prev) => {
      // अगर हम उसी स्क्रीन पर जा रहे हैं तो हिस्ट्री न बढ़ाएं
      if (prev.screen === nextScreen) return prev
      return {
        screen: nextScreen,
        history: [...prev.history, prev.screen],
      }
    })
  }, [])

  const goBack = useCallback(() => {
    setState((prev) => {
      if (prev.history.length === 0) return { ...prev, screen: "dashboard" }
      
      const newHistory = [...prev.history]
      const lastScreen = newHistory.pop() || "dashboard"
      
      return {
        screen: lastScreen,
        history: newHistory,
      }
    })
  }, [])

  return (
    <AppContext.Provider value={{ screen: state.screen, setScreen, goBack }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (!context) throw new Error("useApp must be used within an AppProvider")
  return context
        }
