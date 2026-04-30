"use client"

import React, { useState, useEffect } from "react"
import { ScreenHeader } from "@/components/screen-header"
import { useApp } from "@/lib/app-context"
import { Trophy, Trash2, BarChart2, BookOpen, Target, TrendingUp } from "lucide-react"

interface QuizResult {
  subject: string
  chapter: string | null
  class: number | null
  score: number
  total: number
  percent: number
  date: string
}

// ── Class-specific key — must match quiz-play-screen.tsx ───────────────────
function quizHistoryKey(classNumber: number | null | undefined): string {
  return classNumber ? `ncert_quiz_history_class_${classNumber}` : "ncert_quiz_history"
}

function formatDate(iso: string): string {
  try {
    const d     = new Date(iso)
    const day   = d.getDate()
    const month = d.toLocaleString("hi-IN", { month: "short" })
    const time  = d.toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" })
    return `${day} ${month}, ${time}`
  } catch {
    return ""
  }
}

function getGradeInfo(percent: number): { label: string; color: string; bg: string } {
  if (percent >= 90) return { label: "Excellent! 🏆", color: "text-emerald-400", bg: "bg-emerald-500/10" }
  if (percent >= 75) return { label: "Very Good 🌟", color: "text-blue-400",    bg: "bg-blue-500/10"   }
  if (percent >= 60) return { label: "Good 👍",       color: "text-amber-400",  bg: "bg-amber-500/10"  }
  if (percent >= 40) return { label: "Average 📚",    color: "text-orange-400", bg: "bg-orange-500/10" }
  return               { label: "Try Again 💪",      color: "text-red-400",    bg: "bg-red-500/10"    }
}

export function QuizHistoryScreen() {
  const { user, setScreen } = useApp()
  const [history, setHistory]             = useState<QuizResult[]>([])
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const classNumber = user?.classNumber ? Number(user.classNumber) : null
  const storageKey  = quizHistoryKey(classNumber)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      if (raw) setHistory(JSON.parse(raw))
    } catch {
      setHistory([])
    }
  }, [storageKey])

  // ── Stats ──────────────────────────────────────────────────────────────────
  const totalQuizzes = history.length
  const avgPercent   = totalQuizzes > 0
    ? Math.round(history.reduce((s, r) => s + r.percent, 0) / totalQuizzes)
    : 0
  const bestPercent  = totalQuizzes > 0
    ? Math.max(...history.map(r => r.percent))
    : 0
  const totalQ       = history.reduce((s, r) => s + r.total, 0)
  const totalCorrect = history.reduce((s, r) => s + r.score, 0)

  const handleClear = () => {
    try { localStorage.removeItem(storageKey) } catch {}
    setHistory([])
    setShowClearConfirm(false)
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScreenHeader title="Quiz History" />

      <div className="mx-auto w-full max-w-md flex-1 px-4 py-4">

        {/* ── Empty state ──────────────────────────────────────────────────── */}
        {totalQuizzes === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-10 w-10 text-primary/40" />
            </div>
            <p className="text-base font-semibold text-muted-foreground">Abhi koi quiz nahi khela</p>
            <p className="mt-1 text-sm text-muted-foreground/60">Quiz khelo — results yahan dikhenge!</p>
            <button
              onClick={() => setScreen("quiz-class")}
              className="mt-6 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.97]"
            >
              Quiz Khelo 🎯
            </button>
          </div>
        )}

        {/* ── Stats cards ─────────────────────────────────────────────────── */}
        {totalQuizzes > 0 && (
          <>
            <div className="mb-4 grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <BarChart2 className="h-4 w-4 text-primary" />
                  <span className="text-xs text-muted-foreground">Total Quizzes</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{totalQuizzes}</span>
              </div>

              <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-muted-foreground">Average Score</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{avgPercent}%</span>
              </div>

              <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  <span className="text-xs text-muted-foreground">Best Score</span>
                </div>
                <span className="text-2xl font-bold text-foreground">{bestPercent}%</span>
              </div>

              <div className="flex flex-col gap-1 rounded-2xl border border-border bg-card p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs text-muted-foreground">Sahi Jawab</span>
                </div>
                <span className="text-2xl font-bold text-foreground">
                  {totalCorrect}
                  <span className="text-sm font-normal text-muted-foreground">/{totalQ}</span>
                </span>
              </div>
            </div>

            {/* ── List header ─────────────────────────────────────────────── */}
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Recent Results</p>
              {!showClearConfirm ? (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs text-muted-foreground transition-all active:scale-95"
                >
                  <Trash2 className="h-3 w-3" />
                  Clear All
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Sure ho?</span>
                  <button
                    onClick={handleClear}
                    className="rounded-lg bg-destructive/10 px-2 py-1 text-xs font-semibold text-destructive"
                  >
                    Haan
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="rounded-lg bg-secondary px-2 py-1 text-xs font-semibold text-secondary-foreground"
                  >
                    Nahi
                  </button>
                </div>
              )}
            </div>

            {/* ── Result cards ────────────────────────────────────────────── */}
            <div className="flex flex-col gap-3 pb-8">
              {history.map((result, idx) => {
                const grade = getGradeInfo(result.percent)
                return (
                  <div key={idx} className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                    <div className="mb-3 flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-3.5 w-3.5 shrink-0 text-primary" />
                          <p className="truncate text-sm font-semibold text-foreground capitalize">
                            {result.subject}
                          </p>
                          {result.class && (
                            <span className="shrink-0 rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                              Cl.{result.class}
                            </span>
                          )}
                        </div>
                        {result.chapter && (
                          <p className="mt-0.5 truncate pl-5 text-xs text-muted-foreground capitalize">
                            {result.chapter}
                          </p>
                        )}
                      </div>
                      <span className={`shrink-0 rounded-lg px-2 py-1 text-xs font-semibold ${grade.color} ${grade.bg}`}>
                        {grade.label}
                      </span>
                    </div>

                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-2xl font-bold text-foreground">
                        {result.score}
                        <span className="text-sm font-normal text-muted-foreground">/{result.total}</span>
                      </span>
                      <span className="text-lg font-bold text-primary">{result.percent}%</span>
                    </div>

                    <div className="mb-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${result.percent}%` }}
                      />
                    </div>

                    <p className="text-right text-[10px] text-muted-foreground/60">
                      {formatDate(result.date)}
                    </p>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
