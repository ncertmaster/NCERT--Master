"use client"

import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { BookOpen, FileText, HelpCircle, Brain, Home } from "lucide-react"
import type { AppScreen } from "@/lib/app-context"

const tabs: { key: string; icon: typeof BookOpen; screen: AppScreen }[] = [
  { key: "home", icon: Home, screen: "dashboard" },
  { key: "books", icon: BookOpen, screen: "books-class" },
  { key: "notes", icon: FileText, screen: "notes-class" },
  { key: "importantQuestions", icon: HelpCircle, screen: "iq-class" },
  { key: "quiz", icon: Brain, screen: "quiz-class" },
]

export function BottomTabs({ activeTab }: { activeTab: string }) {
  const { setScreen, language } = useApp()

  return (
    <nav className="mobile-safe-bottom fixed inset-x-0 bottom-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-md items-center justify-around py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.key || (tab.key === "home" && activeTab === "dashboard")
          return (
            <button
              key={tab.key}
              onClick={() => setScreen(tab.screen)}
              className={`flex flex-col items-center gap-0.5 px-2 py-1.5 transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
              <span className="text-[10px] font-medium leading-tight">{getText(tab.key, language)}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
