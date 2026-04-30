"use client"

import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { BottomTabs } from "@/components/bottom-tabs"
import { BookOpen, FileText, HelpCircle, Brain, Settings, Target, Globe, Trophy, TrendingUp, BarChart2 } from "lucide-react"
import type { AppScreen } from "@/lib/app-context"
import Image from "next/image"
import { useEffect, useState } from "react"

// ── Simple analytics helper (works with Vercel Analytics / Plausible) ────────
function track(event: string, props?: Record<string, string | number>) {
  try {
    // Vercel Analytics
    if (typeof window !== "undefined" && (window as any).va) {
      (window as any).va("event", event, props)
    }
    // Plausible fallback
    if (typeof window !== "undefined" && (window as any).plausible) {
      (window as any).plausible(event, { props })
    }
  } catch { /* analytics failure is non-fatal */ }
}

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

interface QuizStat {
  total: number
  avg: number
  best: number
}

// Class-specific key — matches quiz-play and quiz-history
function quizHistoryKey(classNumber: number | null | undefined): string {
  return classNumber ? `ncert_quiz_history_class_${classNumber}` : "ncert_quiz_history"
}

function useQuizStats(classNumber: number | null | undefined): QuizStat | null {
  const [stats, setStats] = useState<QuizStat | null>(null)
  useEffect(() => {
    try {
      const key = quizHistoryKey(classNumber)
      const raw = localStorage.getItem(key)
      if (!raw) return
      const history = JSON.parse(raw)
      if (!history.length) return
      const avg  = Math.round(history.reduce((s: number, r: any) => s + r.percent, 0) / history.length)
      const best = Math.max(...history.map((r: any) => r.percent))
      setStats({ total: history.length, avg, best })
    } catch {}
  }, [classNumber])
  return stats
}

export function DashboardScreen() {
  const { user, language, setScreen } = useApp()
  const quizStats = useQuizStats(user?.classNumber ? Number(user.classNumber) : null)

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">

      {/* Header */}
      <header className="relative overflow-hidden px-5 pb-5 pt-6">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/8 to-transparent" />
        <div className="relative mx-auto flex max-w-md items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-primary/30 bg-primary/10">
              {user?.photo ? (
                <img src={user.photo} alt={user.name} className="h-full w-full object-cover" />
              ) : (
                <span className="text-base font-bold text-primary">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-semibold text-foreground leading-tight">
                {user?.name}
              </h2>
              <p className="text-xs text-muted-foreground">
                {getText("class", language)} {user?.classNumber}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-9">
              {/* Replace logo.png with logo.webp once asset is converted */}
              <Image src="/images/logo.png" alt="NCERT Master" fill className="object-contain" />
            </div>
            <button
              onClick={() => {
                track("settings_opened")
                setScreen("settings")
              }}
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

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-2 gap-3">
          {features.map((f) => {
            const Icon = f.icon
            return (
              <button
                key={f.key}
                onClick={() => {
                  track("feature_clicked", { feature: f.key, class: String(user?.classNumber || "") })
                  setScreen(f.screen)
                }}
                className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-border/60 bg-card p-5 text-center shadow-sm transition-colors hover:border-primary/30 active:opacity-90"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${f.gradient} opacity-0 transition-opacity group-hover:opacity-100`} />
                <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl ${f.iconBg}`}>
                  <Icon className="h-7 w-7" />
                </div>
                <span className="relative z-10 text-sm font-semibold text-card-foreground leading-tight">
                  {getText(f.key, language)}
                </span>
              </button>
            )
          })}
        </div>

        {/* Quiz Stats Card */}
        {quizStats && (
          <button
            onClick={() => {
              track("quiz_history_opened")
              setScreen("quiz-history")
            }}
            className="mt-4 w-full rounded-2xl border border-amber-500/20 bg-amber-500/5 p-4 text-left transition-all active:opacity-80"
          >
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-amber-400" />
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-wide">
                  Quiz Progress
                </span>
              </div>
              <span className="text-[10px] text-muted-foreground">Sabhi dekho →</span>
            </div>
            <div className="grid grid-cols-3 divide-x divide-border/50">
              <div className="flex flex-col items-center gap-0.5 pr-3">
                <BarChart2 className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-lg font-bold text-foreground">{quizStats.total}</span>
                <span className="text-[10px] text-muted-foreground">Quizzes</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 px-3">
                <TrendingUp className="h-3.5 w-3.5 text-blue-400" />
                <span className="text-lg font-bold text-foreground">{quizStats.avg}%</span>
                <span className="text-[10px] text-muted-foreground">Average</span>
              </div>
              <div className="flex flex-col items-center gap-0.5 pl-3">
                <Trophy className="h-3.5 w-3.5 text-amber-400" />
                <span className="text-lg font-bold text-foreground">{quizStats.best}%</span>
                <span className="text-[10px] text-muted-foreground">Best</span>
              </div>
            </div>
          </button>
        )}

        {/* Info Strip */}
        <div className="mt-4 rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
          <div className="grid grid-cols-2 divide-x divide-border">
            <div className="flex flex-col items-center gap-1.5 px-2">
              <Target className="h-4 w-4 text-amber-400" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {getText("target", language)}
              </span>
              <span className="text-xs font-semibold text-card-foreground text-center leading-tight truncate max-w-full">
                {user?.aim || "---"}
              </span>
            </div>
            <div className="flex flex-col items-center gap-1.5 px-2">
              <Globe className="h-4 w-4 text-cyan-400" />
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide">
                {getText("language", language)}
              </span>
              <span className="text-xs font-semibold text-card-foreground">
                {language === "en" ? "English" : getText("hindi", language)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[11px] text-muted-foreground/60">
          {getText("contentLanguageNote", language)}
        </p>
      </div>

      <BottomTabs activeTab="dashboard" />
    </div>
  )
}
