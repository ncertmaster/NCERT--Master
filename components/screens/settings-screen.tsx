"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ChevronLeft, LogOut, Globe, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function SettingsScreen() {
  const { goBack, logout, setScreen, language, setLanguage } = useApp()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    logout()
    setScreen("login")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold">Settings</h1>
      </div>

      <div className="flex-1 p-4 space-y-6">

        {/* Language Toggle */}
        <div className="p-4 bg-card border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-medium">Language</span>
            </div>
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-4 py-1 rounded-md text-sm transition-all ${language === "en" ? "bg-background shadow-sm font-bold" : ""}`}
              >
                English
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-4 py-1 rounded-md text-sm transition-all ${language === "hi" ? "bg-background shadow-sm font-bold" : ""}`}
              >
                Hindi
              </button>
            </div>
          </div>
        </div>

        {/* Dark/Light Mode Toggle */}
        <div className="p-4 bg-card border rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? (
                <Moon className="w-5 h-5 text-primary" />
              ) : (
                <Sun className="w-5 h-5 text-primary" />
              )}
              <span className="font-medium">Theme</span>
            </div>
            <div className="flex bg-muted rounded-lg p-1">
              <button
                onClick={() => setTheme("light")}
                className={`px-4 py-1 rounded-md text-sm transition-all ${theme === "light" ? "bg-background shadow-sm font-bold" : ""}`}
              >
                Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`px-4 py-1 rounded-md text-sm transition-all ${theme === "dark" ? "bg-background shadow-sm font-bold" : ""}`}
              >
                Dark
              </button>
            </div>
          </div>
        </div>

        {/* Logout */}
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
