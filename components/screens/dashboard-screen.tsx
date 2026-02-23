"use client"

import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { BottomTabs } from "@/components/bottom-tabs"
import { BookOpen, FileText, HelpCircle, Brain, Settings, Target, Globe, Layers } from "lucide-react"
import type { AppScreen } from "@/lib/app-context"
import Image from "next/image"
import { useTheme } from "next-themes"

const features: { key: string; icon: typeof BookOpen; screen: AppScreen; gradient: string; iconBg: string }[] = [
  {
    key: "books",
    icon: BookOpen,
    screen: "books-class",
    gradient: "from-indigo-500/20 to-indigo-600/5",
    iconBg: "bg-indigo-500/20 text-indigo-400",
  },
  {
    key: "notes",
    icon: FileText,
    screen: "notes-class",
    gradient: "from-cyan-500/20 to-cyan-600/5",
    iconBg: "bg-cyan-500/20 text-cyan-400",
  },
  {
    key: "importantQuestions",
    icon: HelpCircle,
    screen: "iq-class",
    gradient: "from-amber-500/20 to-amber-600/5",
    iconBg: "bg-amber-500/20 text-amber-400",
  },
  {
    key: "quiz",
    icon: Brain,
    screen: "quiz-class",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    iconBg: "bg-emerald-500/20 text-emerald-400",
  },
]

export function DashboardScreen() {
  const { user, language, setScreen } = useApp()
  const { theme } = useTheme()

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      {/* Compact Header */}
      <header className="relative overflow-hidden px-5 pb-5 pt-6">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent" />
        <div className="relative mx-auto flex max-w-md items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Profile Photo */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-primary/10">
              {user?.photo ? (
                <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-base font-bold text-primary">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            {/* Name + Class */}
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-foreground leading-tight">
                {user?.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {getText("class", language)} {user?.classNumber}
              </p>
            </div>
          </div>
          {/* Settings + Logo */}
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9">
              <Image
                src="/images/logo.png"
                alt="NCERT Master"
                fill
                className="object-contain"
              />
            </div>
            <button
              onClick={() => setScreen("settings")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
              aria-label={getText("settings", language)}
            >
              <Settings className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5">
        {/* Action Cards - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {features.map((f, i) => {
            const Icon = f.icon
            return (
              <button
                key={f.key}
                onClick={() => setScreen(f.screen)}
                className="animate-fade-in group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm transition-all hover:shadow-lg hover:border-primary/30 active:scale-[0.97]"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
                {/* Icon */}
                <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${f.iconBg} transition-transform group-hover:scale-105`}>
                  <Icon className="h-7 w-7" />
                </div>
                {/* Label */}
                <span className="relative z-10 text-sm font-semibold text-card-foreground leading-tight">
                  {getText(f.key, language)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Info Strip */}
        <div className="mt-5 animate-slide-up rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <div className="grid grid-cols-3 divide-x divide-border">
            {/* Target */}
            <div className="flex flex-col items-center gap-1.5 px-2">
              <Target className="h-4 w-4 text-amber-400" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {getText("target", language)}
              </span>
              <span className="text-xs font-semibold text-card-foreground text-center leading-tight truncate max-w-full">
                {user?.aim || "---"}
              </span>
            </div>
            {/* Language */}
            <div className="flex flex-col items-center gap-1.5 px-2">
              <Globe className="h-4 w-4 text-cyan-400" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {getText("language", language)}
              </span>
              <span className="text-xs font-semibold text-card-foreground">
                {getText("hindi", language)}
              </span>
            </div>
            {/* Mode */}
            <div className="flex flex-col items-center gap-1.5 px-2">
              <Layers className="h-4 w-4 text-indigo-400" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {getText("mode", language)}
              </span>
              <span className="text-xs font-semibold text-card-foreground">
                {theme === "dark" ? getText("darkMode", language) : "Light"}
              </span>
            </div>
          </div>
        </div>

        {/* Content Language Note */}
        <p className="mt-4 text-center text-[11px] text-muted-foreground/60">
          {getText("contentLanguageNote", language)}
        </p>
      </div>

      <BottomTabs activeTab="dashboard" />
    </div>
  )
}
