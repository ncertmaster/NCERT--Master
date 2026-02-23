"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ChevronLeft, LogOut, Globe } from "lucide-react"

export function SettingsScreen() {
  const { goBack, setUser, setScreen, language, setLanguage } = useApp()

  const handleLogout = () => {
    // 1. Memory saaf karo
    localStorage.removeItem("ncert_user")
    // 2. User state null karo
    setUser(null)
    // 3. Login screen par bhejo
    setScreen("login")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Back Button Fixed */}
      <div className="flex items-center p-4 border-b">
        <button onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold">Settings</h1>
      </div>

      <div className="flex-1 p-4 space-y-6">
        {/* Language Selection Fixed */}
        <div className="p-4 bg-card border rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-medium">Language</span>
            </div>
            <div className="flex bg-muted rounded-lg p-1">
              <button 
                onClick={() => setLanguage("English")}
                className={`px-4 py-1 rounded-md text-sm transition-all ${language === "English" ? "bg-background shadow-sm font-bold" : ""}`}
              >
                English
              </button>
              <button 
                onClick={() => setLanguage("Hindi")}
                className={`px-4 py-1 rounded-md text-sm transition-all ${language === "Hindi" ? "bg-background shadow-sm font-bold" : ""}`}
              >
                Hindi
              </button>
            </div>
          </div>
        </div>

        {/* Logout Button Fixed */}
        <button 
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-red-50 border border-red-100 rounded-xl hover:bg-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </div>
  )
}
