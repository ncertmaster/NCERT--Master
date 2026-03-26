"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ScreenHeader } from "@/components/screen-header"
import { useTheme } from "next-themes"
import {
  LogOut, Timer, BookMarked, Shield, ChevronRight,
  Sun, Moon, Globe
} from "lucide-react"

export function SettingsScreen() {
  const { logout, setScreen, language, setLanguage } = useApp()
  const { theme, setTheme } = useTheme()

  const handleLogout = () => {
    logout()
    setScreen("setup")
  }

  const menuItems = [
    {
      icon: Timer,
      label: "Time Management",
      sublabel: "Daily routine and Pomodoro timer",
      iconBg: "bg-violet-500/15 text-violet-400",
      onClick: () => setScreen("study-timer"),
    },
    {
      icon: BookMarked,
      label: "My Diary",
      sublabel: "Daily notes, goals and life journey",
      iconBg: "bg-amber-500/15 text-amber-400",
      onClick: () => setScreen("diary"),
    },
    {
      icon: Shield,
      label: "Privacy Policy",
      sublabel: "Data usage and AI policy",
      iconBg: "bg-emerald-500/15 text-emerald-400",
      onClick: () => setScreen("privacy-policy"),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title="Settings" />

      <div className="flex-1 px-4 py-5 space-y-3 max-w-md mx-auto w-full">

        {/* Theme Toggle */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Theme</p>
              <p className="text-xs text-muted-foreground mt-0.5">Light or Dark mode</p>
            </div>
            <div className="flex bg-muted rounded-xl p-1 gap-1">
              <button
                onClick={() => setTheme("light")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  theme === "light" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                <Sun className="h-3 w-3" /> Light
              </button>
              <button
                onClick={() => setTheme("dark")}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  theme === "dark" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                <Moon className="h-3 w-3" /> Dark
              </button>
            </div>
          </div>
        </div>

        {/* Language Toggle */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <div className="flex items-center gap-3 px-4 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
              <Globe className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">App Language</p>
              <p className="text-xs text-muted-foreground mt-0.5">UI language (content always in Hindi)</p>
            </div>
            <div className="flex bg-muted rounded-xl p-1 gap-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  language === "en" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  language === "hi" ? "bg-background shadow-sm text-foreground" : "text-muted-foreground"
                }`}
              >
                हि
              </button>
            </div>
          </div>
        </div>

        {/* Feature Menu */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
          {menuItems.map((item, i) => {
            const Icon = item.icon
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-secondary/50 active:bg-secondary ${
                  i < menuItems.length - 1 ? "border-b border-border/60" : ""
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sublabel}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            )
          })}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500/20 transition-colors font-semibold"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>

      </div>
    </div>
  )
}
