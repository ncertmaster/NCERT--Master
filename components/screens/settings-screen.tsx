"use client"

import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { ScreenHeader } from "@/components/screen-header"
import { BottomTabs } from "@/components/bottom-tabs"
import { useTheme } from "next-themes"
import { Moon, Sun, Globe, LogOut } from "lucide-react"

export function SettingsScreen() {
  const { language, setLanguage, logout } = useApp()
  const { theme, setTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={getText("settings", language)} />
      <div className="mx-auto w-full max-w-md px-4 py-5">
        <div className="flex flex-col gap-3">
          {/* Dark Mode */}
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              {isDark ? (
                <Moon className="h-5 w-5 text-primary" />
              ) : (
                <Sun className="h-5 w-5 text-primary" />
              )}
              <span className="text-sm font-medium text-card-foreground">
                {getText("darkMode", language)}
              </span>
            </div>
            <button
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                isDark ? "bg-primary" : "bg-muted"
              }`}
              role="switch"
              aria-checked={isDark}
              aria-label={getText("darkMode", language)}
            >
              <span
                className={`absolute top-0.5 left-0.5 h-6 w-6 rounded-full bg-card shadow-sm transition-transform ${
                  isDark ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Language */}
          <div className="flex items-center justify-between rounded-2xl border border-border bg-card p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-card-foreground">
                {getText("language", language)}
              </span>
            </div>
            <div className="flex overflow-hidden rounded-lg border border-border">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  language === "en"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground"
                }`}
              >
                {getText("english", language)}
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  language === "hi"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground"
                }`}
              >
                {getText("hindi", language)}
              </button>
            </div>
          </div>

          {/* Content Note */}
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <p className="text-center text-xs text-muted-foreground">
              {getText("contentLanguageNote", language)}
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={logout}
            className="mt-4 flex items-center justify-center gap-2 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm font-medium text-destructive transition-all hover:bg-destructive/10 active:scale-[0.98]"
          >
            <LogOut className="h-4 w-4" />
            {getText("logout", language)}
          </button>
        </div>
      </div>
      <BottomTabs activeTab="settings" />
    </div>
  )
}
