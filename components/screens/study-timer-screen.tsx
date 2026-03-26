"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { ScreenHeader } from "@/components/screen-header"
import { useApp } from "@/lib/app-context"
import {
  Plus, Play, Pause, RotateCcw, CheckCircle2, Circle,
  Trash2, Timer, BookOpen, Flame, X, ChevronDown
} from "lucide-react"
import { createClient } from "@supabase/supabase-js"

// ─── Supabase Setup ────────────────────────────────────────────────────────────
// Apne Supabase URL aur anon key yahan daalo (ya .env se lo)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

// ─── Types ─────────────────────────────────────────────────────────────────────
interface Task {
  id: string
  user_email: string
  subject: string
  chapter: string
  start_time: string   // "HH:MM"
  end_time: string     // "HH:MM"
  repeat: "daily" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
  completed: boolean
  created_at: string
  streak: number
}

// ─── Pomodoro constants ─────────────────────────────────────────────────────────
const POMODORO_WORK = 25 * 60   // 25 min
const POMODORO_BREAK = 5 * 60   // 5 min

const DAYS = [
  { value: "daily", label: "Roz" },
  { value: "mon",   label: "Mon" },
  { value: "tue",   label: "Tue" },
  { value: "wed",   label: "Wed" },
  { value: "thu",   label: "Thu" },
  { value: "fri",   label: "Fri" },
  { value: "sat",   label: "Sat" },
  { value: "sun",   label: "Sun" },
]

// ─── Main Component ─────────────────────────────────────────────────────────────
export function StudyTimerScreen() {
  const { user } = useApp()

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Add task form
  const [showForm, setShowForm] = useState(false)
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [repeat, setRepeat] = useState<Task["repeat"]>("daily")

  // Pomodoro timer
  const [timerSeconds, setTimerSeconds] = useState(POMODORO_WORK)
  const [timerRunning, setTimerRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // ─── Load tasks from Supabase ────────────────────────────────────────────────
  const loadTasks = useCallback(async () => {
    if (!user?.email) return
    setLoading(true)
    const { data, error } = await supabase
      .from("study_tasks")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false })
    if (!error && data) setTasks(data as Task[])
    setLoading(false)
  }, [user?.email])

  useEffect(() => { loadTasks() }, [loadTasks])

  // ─── Pomodoro Timer Logic ─────────────────────────────────────────────────────
  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            // Timer complete — switch between work/break
            setIsBreak(b => {
              if (!b) setPomodoroCount(c => c + 1) // work session complete
              return !b
            })
            return isBreak ? POMODORO_WORK : POMODORO_BREAK
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [timerRunning, isBreak])

  const toggleTimer = () => setTimerRunning(r => !r)
  const resetTimer = () => {
    setTimerRunning(false)
    setIsBreak(false)
    setTimerSeconds(POMODORO_WORK)
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, "0")
    const s = (secs % 60).toString().padStart(2, "0")
    return `${m}:${s}`
  }

  const progress = isBreak
    ? 1 - timerSeconds / POMODORO_BREAK
    : 1 - timerSeconds / POMODORO_WORK

  // ─── Add Task ─────────────────────────────────────────────────────────────────
  const addTask = async () => {
    if (!subject.trim() || !chapter.trim() || !user?.email) return
    setSaving(true)
    const newTask = {
      user_email: user.email,
      subject: subject.trim(),
      chapter: chapter.trim(),
      start_time: startTime,
      end_time: endTime,
      repeat,
      completed: false,
      streak: 0,
    }
    const { data, error } = await supabase.from("study_tasks").insert(newTask).select().single()
    if (!error && data) {
      setTasks(prev => [data as Task, ...prev])
      setSubject(""); setChapter(""); setShowForm(false)
    }
    setSaving(false)
  }

  // ─── Toggle Task Complete ─────────────────────────────────────────────────────
  const toggleTask = async (task: Task) => {
    const newCompleted = !task.completed
    const newStreak = newCompleted ? task.streak + 1 : Math.max(0, task.streak - 1)
    const { error } = await supabase
      .from("study_tasks")
      .update({ completed: newCompleted, streak: newStreak })
      .eq("id", task.id)
    if (!error) {
      setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: newCompleted, streak: newStreak } : t))
    }
  }

  // ─── Delete Task ──────────────────────────────────────────────────────────────
  const deleteTask = async (id: string) => {
    const { error } = await supabase.from("study_tasks").delete().eq("id", id)
    if (!error) setTasks(prev => prev.filter(t => t.id !== id))
  }

  const completedCount = tasks.filter(t => t.completed).length
  const maxStreak = tasks.reduce((max, t) => Math.max(max, t.streak), 0)

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title="Study Timer & Tasks" />

      <div className="flex-1 px-4 py-4 space-y-4 max-w-md mx-auto w-full pb-8">

        {/* ─── Stats Row ─── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Tasks", value: tasks.length, icon: BookOpen, color: "text-cyan-400" },
            { label: "Done", value: completedCount, icon: CheckCircle2, color: "text-emerald-400" },
            { label: "🔥 Streak", value: maxStreak, icon: Flame, color: "text-orange-400" },
          ].map(stat => {
            const Icon = stat.icon
            return (
              <div key={stat.label} className="rounded-2xl border border-border/60 bg-card p-3 text-center shadow-sm">
                <Icon className={`h-5 w-5 mx-auto mb-1 ${stat.color}`} />
                <p className="text-lg font-bold text-foreground">{stat.value}</p>
                <p className="text-[10px] text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* ─── Pomodoro Timer ─── */}
        <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-violet-400" />
              <span className="text-sm font-semibold text-foreground">
                {isBreak ? "☕ Break Time" : "📚 Focus Time"}
              </span>
            </div>
            <span className="text-xs bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full font-medium">
              #{pomodoroCount + 1}
            </span>
          </div>

          {/* Circular Progress */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative h-36 w-36">
              <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke={isBreak ? "#10b981" : "#8b5cf6"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 54}`}
                  strokeDashoffset={`${2 * Math.PI * 54 * (1 - progress)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-foreground tabular-nums">
                  {formatTime(timerSeconds)}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={toggleTimer}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 text-white font-semibold hover:bg-violet-500 active:scale-95 transition-all"
              >
                {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {timerRunning ? "Pause" : "Start"}
              </button>
              <button
                onClick={resetTimer}
                className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-secondary text-foreground hover:bg-secondary/80 active:scale-95 transition-all"
              >
                <RotateCcw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* ─── Tasks Section ─── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-foreground">Daily Tasks</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-violet-500/15 text-violet-400 hover:bg-violet-500/25 transition-colors font-medium"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Task
            </button>
          </div>

          {/* Add Task Form */}
          {showForm && (
            <div className="mb-3 rounded-2xl border border-violet-500/30 bg-card p-4 shadow-sm space-y-3">
              <input
                type="text"
                placeholder="Subject (jaise: History, Science)"
                value={subject}
                onChange={e => setSubject(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
              <input
                type="text"
                placeholder="Chapter (jaise: Ch 3 - Nazism)"
                value={chapter}
                onChange={e => setChapter(e.target.value)}
                className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Start Time</label>
                  <input
                    type="time"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">End Time</label>
                  <input
                    type="time"
                    value={endTime}
                    onChange={e => setEndTime(e.target.value)}
                    className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500 transition-all"
                  />
                </div>
              </div>
              {/* Repeat selector */}
              <div>
                <label className="text-xs text-muted-foreground mb-2 block">Repeat</label>
                <div className="flex flex-wrap gap-1.5">
                  {DAYS.map(day => (
                    <button
                      key={day.value}
                      onClick={() => setRepeat(day.value as Task["repeat"])}
                      className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                        repeat === day.value
                          ? "bg-violet-600 border-violet-600 text-white"
                          : "border-border text-muted-foreground hover:border-violet-500"
                      }`}
                    >
                      {day.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={addTask}
                  disabled={saving || !subject.trim() || !chapter.trim()}
                  className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 disabled:opacity-50 transition-colors"
                >
                  {saving ? "Saving..." : "Task Add Karo"}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-secondary transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Task List */}
          {loading ? (
            <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-10 rounded-2xl border border-dashed border-border">
              <Timer className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground">Koi task nahi hai</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Upar se task add karo!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {tasks.map(task => (
                <div
                  key={task.id}
                  className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-all ${
                    task.completed
                      ? "border-emerald-500/20 bg-emerald-500/5 opacity-70"
                      : "border-border/60 bg-card"
                  }`}
                >
                  <button onClick={() => toggleTask(task)} className="shrink-0">
                    {task.completed
                      ? <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                      : <Circle className="h-5 w-5 text-muted-foreground hover:text-violet-400 transition-colors" />
                    }
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                      {task.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">{task.chapter}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground/70">
                        {task.start_time} – {task.end_time}
                      </span>
                      {task.streak > 0 && (
                        <span className="text-[10px] text-orange-400">🔥 {task.streak} streak</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="shrink-0 p-1 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

         
