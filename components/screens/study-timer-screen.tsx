"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { ScreenHeader } from "@/components/screen-header"
import { useApp } from "@/lib/app-context"
import {
  Plus, Play, Pause, RotateCcw, CheckCircle2, Circle,
  Trash2, Timer, X, Coffee, Settings2,
  Calendar, Sun, Sunset, Moon, Zap, Bell, BellOff
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { getUserId } from "@/lib/utils"
interface Task {
  id: string
  user_email: string
  subject: string
  chapter: string
  start_time: string
  end_time: string
  repeat: "daily" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun"
  completed: boolean
  created_at: string
  streak: number
  time_slot: "morning" | "afternoon" | "evening" | "night"
}

const DAYS = [
  { value: "daily", label: "Daily" },
  { value: "mon", label: "Mon" }, { value: "tue", label: "Tue" },
  { value: "wed", label: "Wed" }, { value: "thu", label: "Thu" },
  { value: "fri", label: "Fri" }, { value: "sat", label: "Sat" },
  { value: "sun", label: "Sun" },
]

const TIME_SLOTS = [
  { value: "morning", label: "Morning", icon: Sun, color: "text-amber-400", bg: "bg-amber-500/15" },
  { value: "afternoon", label: "Afternoon", icon: Zap, color: "text-orange-400", bg: "bg-orange-500/15" },
  { value: "evening", label: "Evening", icon: Sunset, color: "text-pink-400", bg: "bg-pink-500/15" },
  { value: "night", label: "Night", icon: Moon, color: "text-indigo-400", bg: "bg-indigo-500/15" },
]

type TabType = "timer" | "schedule" | "routine"

// ── Notification helpers ───────────────────────────────────────────────────────

function getTodayKey(): Task["repeat"] {
  return (["sun","mon","tue","wed","thu","fri","sat"] as Task["repeat"][])[new Date().getDay()]
}

function taskRepeatsTodaay(task: Task): boolean {
  return task.repeat === "daily" || task.repeat === getTodayKey()
}

async function requestNotifPermission(): Promise<NotificationPermission> {
  if (typeof window === "undefined" || !("Notification" in window)) return "denied"
  if (Notification.permission !== "default") return Notification.permission
  return Notification.requestPermission()
}

// ── Schedule via Service Worker ────────────────────────────────────────────────
function sendToSW(type: string, payload?: object) {
  if (typeof navigator === "undefined" || !("serviceWorker" in navigator)) return
  navigator.serviceWorker.ready.then(reg => {
    if (reg.active) reg.active.postMessage({ type, ...payload })
  }).catch(() => {})
}

function scheduleViaSW(tasks: Task[]) {
  sendToSW("SCHEDULE_NOTIFICATIONS", {
    tasks: tasks.filter(t => taskRepeatsTodaay(t) && !t.completed),
  })
}

// ── Page-level scheduler (works when app is open) ──────────────────────────────
function usePageNotifications(tasks: Task[], permission: NotificationPermission) {
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  useEffect(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []

    if (permission !== "granted") return

    const now = Date.now()

    tasks.forEach(task => {
      if (task.completed || !taskRepeatsTodaay(task)) return

      const [hStr, mStr] = (task.start_time || "").split(":")
      const h = parseInt(hStr, 10)
      const m = parseInt(mStr, 10)
      if (isNaN(h) || isNaN(m)) return

      const taskTime = new Date()
      taskTime.setHours(h, m, 0, 0)
      let delay = taskTime.getTime() - now

      // Within 5 minutes past due → fire immediately
      if (delay <= 0 && delay > -300000) delay = 800

      if (delay > 0 && delay < 86400000) {
        const tid = setTimeout(() => {
          try {
            new Notification(`📚 Study Time: ${task.subject}`, {
              body: `${task.start_time} – ${task.end_time} | Time to study! 🚀`,
              icon: "/icons/ncert_master_192x192.png",
              tag: `ncert-page-${task.id}`,
            })
          } catch {}
        }, delay)
        timeoutsRef.current.push(tid)
      }
    })

    return () => timeoutsRef.current.forEach(clearTimeout)
  }, [tasks, permission])
}

// ── Pomodoro completion notification ──────────────────────────────────────────
function firePomoNotification(mode: "work" | "break" | "longBreak", count: number) {
  if (typeof window === "undefined" || !("Notification" in window)) return
  if (Notification.permission !== "granted") return
  try {
    if (mode === "work") {
      new Notification("📚 Focus Session Complete! 🎉", {
        body: `Session #${count} done! Time for a break. Bahut badhiya! 💪`,
        icon: "/icons/ncert_master_192x192.png",
        tag: "ncert-pomo-work",
      })
    } else {
      new Notification("⏰ Break Khatam! Padhai Shuru Karo 🚀", {
        body: "Break over — focus session shuru karo. You got this! 📚",
        icon: "/icons/ncert_master_192x192.png",
        tag: "ncert-pomo-break",
      })
    }
  } catch {}
}
// ──────────────────────────────────────────────────────────────────────────────

// ── Main Component ─────────────────────────────────────────────────────────────
export function StudyTimerScreen() {
  const { user } = useApp()
  const userEmail = getUserId()
  const [activeTab, setActiveTab] = useState<TabType>("timer")
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [showForm, setShowForm] = useState(false)

  // Notification state
  const [notifPermission, setNotifPermission] = useState<NotificationPermission>("default")
  const [notifBanner, setNotifBanner] = useState(false)

  // Timer settings
  const [workMin, setWorkMin] = useState(25)
  const [breakMin, setBreakMin] = useState(5)
  const [longBreakMin, setLongBreakMin] = useState(15)
  const [showTimerSettings, setShowTimerSettings] = useState(false)

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(workMin * 60)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerMode, setTimerMode] = useState<"work" | "break" | "longBreak">("work")
  const [pomodoroCount, setPomodoroCount] = useState(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Form state
  const [subject, setSubject] = useState("")
  const [chapter, setChapter] = useState("")
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("10:00")
  const [repeat, setRepeat] = useState<Task["repeat"]>("daily")
  const [timeSlot, setTimeSlot] = useState<Task["time_slot"]>("morning")

  // Page-level notifications
  usePageNotifications(tasks, notifPermission)

  // Check permission on mount
  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const perm = Notification.permission
      setNotifPermission(perm)
      if (perm === "default") setNotifBanner(true)
    }
  }, [])

  // Re-schedule via SW whenever tasks or permission changes
  useEffect(() => {
    if (notifPermission === "granted") scheduleViaSW(tasks)
  }, [tasks, notifPermission])

  const handleEnableNotifications = async () => {
    const perm = await requestNotifPermission()
    setNotifPermission(perm)
    setNotifBanner(false)
    if (perm === "granted") {
      scheduleViaSW(tasks)
      // Send test notification to confirm it works
      setTimeout(() => sendToSW("TEST_NOTIFICATION"), 500)
    }
  }

  // Load tasks
  const loadTasks = useCallback(async () => {
    if (!supabase) { setLoading(false); return }
    setLoading(true)
    const { data, error } = await supabase
      .from("study_tasks").select("*")
      .eq("user_email", userEmail).order("start_time")
    if (!error && data) setTasks(data as Task[])
    setLoading(false)
  }, [userEmail])

  useEffect(() => {
    const ready = true
    if (ready) loadTasks()
  
}, [loadTasks])
  // Timer logic
  useEffect(() => {
    if (timerRunning) {
      intervalRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            if (timerMode === "work") {
              const nc = pomodoroCount + 1
              setPomodoroCount(nc)
              firePomoNotification("work", nc)
              if (nc % 4 === 0) { setTimerMode("longBreak"); setTimerSeconds(longBreakMin * 60) }
              else { setTimerMode("break"); setTimerSeconds(breakMin * 60) }
            } else {
              firePomoNotification("break", pomodoroCount)
              setTimerMode("work")
              setTimerSeconds(workMin * 60)
            }
            setTimerRunning(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [timerRunning, timerMode, workMin, breakMin, longBreakMin, pomodoroCount])

  const toggleTimer = () => setTimerRunning(r => !r)
  const resetTimer = () => { setTimerRunning(false); setTimerMode("work"); setTimerSeconds(workMin * 60) }
  const takeBreak = () => { setTimerRunning(false); setTimerMode("break"); setTimerSeconds(breakMin * 60); setTimerRunning(true) }
  const skipBreak = () => { setTimerMode("work"); setTimerSeconds(workMin * 60); setTimerRunning(false) }
  const formatTime = (s: number) => `${Math.floor(s/60).toString().padStart(2,"0")}:${(s%60).toString().padStart(2,"0")}`

  const totalSecs = timerMode === "work" ? workMin*60 : timerMode === "break" ? breakMin*60 : longBreakMin*60
  const progress = 1 - timerSeconds / totalSecs
  const circumference = 2 * Math.PI * 54
  const timerColor = timerMode === "work" ? "#8b5cf6" : timerMode === "break" ? "#10b981" : "#3b82f6"
  const timerLabel = timerMode === "work" ? "Focus Time" : timerMode === "break" ? "Short Break" : "Long Break"
  const timerEmoji = timerMode === "work" ? "📚" : timerMode === "break" ? "☕" : "🧘"

  // Task CRUD
  const addTask = async () => {
    if (!supabase) { alert("Supabase env variables missing!"); return }
    if (!subject.trim()) { alert("Schedule name likhna zaroori hai!"); return }
    let email = user?.email
    if (!email) {
      try { email = JSON.parse(localStorage.getItem("ncert_user") || "{}").email } catch {}
    }
    if (!email) return

    // Auto-ask notification permission on first task add
    if (notifPermission === "default") {
      const perm = await requestNotifPermission()
      setNotifPermission(perm)
      setNotifBanner(false)
      if (perm === "granted") setTimeout(() => sendToSW("TEST_NOTIFICATION"), 500)
    }

    setSaving(true)
    try {
      const insertData: Record<string, unknown> = {
        user_email: email, subject: subject.trim(),
        start_time: startTime, end_time: endTime, repeat, completed: false,
      }
      try { insertData.chapter = "" } catch {}
      try { insertData.streak = 0 } catch {}
      try { insertData.time_slot = timeSlot } catch {}

      const { data, error } = await supabase.from("study_tasks").insert(insertData).select().single()
      if (error) {
        const { data: d2, error: e2 } = await supabase.from("study_tasks").insert({
          user_email: email, subject: subject.trim(),
          start_time: startTime, end_time: endTime, repeat, completed: false,
        }).select().single()
        if (!e2 && d2) {
          setTasks(prev => [...prev, d2 as Task].sort((a,b) => a.start_time.localeCompare(b.start_time)))
          setSubject(""); setChapter(""); setShowForm(false)
        }
      } else if (data) {
        setTasks(prev => [...prev, data as Task].sort((a,b) => a.start_time.localeCompare(b.start_time)))
        setSubject(""); setChapter(""); setShowForm(false)
      }
    } catch (err) { alert("Save failed: " + String(err)) }
    setSaving(false)
  }

  const toggleTask = async (task: Task) => {
    if (!supabase) return
    const nc = !task.completed
    const ns = nc ? task.streak + 1 : Math.max(0, task.streak - 1)
    const { error } = await supabase.from("study_tasks").update({ completed: nc, streak: ns }).eq("id", task.id)
    if (!error) setTasks(prev => prev.map(t => t.id === task.id ? { ...t, completed: nc, streak: ns } : t))
  }

  const deleteTask = async (id: string) => {
    if (!supabase) return
    const { error } = await supabase.from("study_tasks").delete().eq("id", id)
    if (!error) setTasks(prev => prev.filter(t => t.id !== id))
  }

  const completedToday = tasks.filter(t => t.completed).length
  const totalTasks = tasks.length
  const progressPct = totalTasks > 0 ? Math.round((completedToday / totalTasks) * 100) : 0
  const maxStreak = tasks.reduce((max, t) => Math.max(max, t.streak), 0)

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title="Time Management" />

      {/* Notification Banner */}
      {notifBanner && notifPermission === "default" && (
        <div className="mx-4 mt-3 rounded-2xl border border-violet-500/30 bg-violet-500/10 p-3 flex items-center gap-3">
          <Bell className="h-5 w-5 text-violet-400 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-violet-400">Schedule Notifications Enable Karo</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">You will get a notification on your device at the scheduled time!</p>
          </div>
          <button onClick={handleEnableNotifications}
            className="shrink-0 text-xs px-3 py-1.5 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-500 transition-colors">
            Allow
          </button>
          <button onClick={() => setNotifBanner(false)} className="shrink-0 text-muted-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-border bg-card mt-3">
        {(["timer","schedule","routine"] as TabType[]).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 text-xs font-semibold capitalize transition-all ${activeTab === tab ? "text-violet-500 border-b-2 border-violet-500" : "text-muted-foreground hover:text-foreground"}`}>
            {tab === "timer" ? "⏱ Timer" : tab === "schedule" ? "📅 Schedule" : "🔄 Routine"}
          </button>
        ))}
      </div>

      <div className="flex-1 px-4 py-4 space-y-4 max-w-md mx-auto w-full pb-8">

        {/* TIMER TAB */}
        {activeTab === "timer" && (
          <>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: "Sessions", value: pomodoroCount, color: "text-violet-400" },
                { label: "Done", value: completedToday, color: "text-emerald-400" },
                { label: "🔥 Streak", value: maxStreak, color: "text-orange-400" },
              ].map(s => (
                <div key={s.label} className="rounded-2xl border border-border/60 bg-card p-3 text-center shadow-sm">
                  <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{timerEmoji}</span>
                  <span className="text-sm font-semibold text-foreground">{timerLabel}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs bg-violet-500/15 text-violet-400 px-2 py-0.5 rounded-full font-medium">#{pomodoroCount + 1}</span>
                  <button onClick={() => setShowTimerSettings(s => !s)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground">
                    <Settings2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {showTimerSettings && (
                <div className="mb-4 p-3 rounded-xl bg-secondary/50 border border-border space-y-2">
                  {[
                    { label: "Focus (min)", value: workMin, set: setWorkMin, min: 5, max: 90 },
                    { label: "Short Break (min)", value: breakMin, set: setBreakMin, min: 1, max: 30 },
                    { label: "Long Break (min)", value: longBreakMin, set: setLongBreakMin, min: 5, max: 60 },
                  ].map(({ label, value, set, min, max }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-xs text-muted-foreground w-36">{label}</span>
                      <input type="range" min={min} max={max} value={value}
                        onChange={e => { set(Number(e.target.value)); resetTimer() }}
                        className="flex-1 accent-violet-500" />
                      <span className="text-xs font-semibold text-foreground w-6 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex flex-col items-center gap-4">
                <div className="relative h-40 w-40">
                  <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary" />
                    <circle cx="60" cy="60" r="54" fill="none" stroke={timerColor} strokeWidth="8" strokeLinecap="round"
                      strokeDasharray={circumference} strokeDashoffset={circumference * (1 - progress)}
                      className="transition-all duration-1000" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-foreground tabular-nums">{formatTime(timerSeconds)}</span>
                    <span className="text-xs text-muted-foreground mt-0.5">{timerLabel}</span>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap justify-center">
                  <button onClick={toggleTimer}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white active:scale-95 transition-all"
                    style={{ background: timerColor }}>
                    {timerRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    {timerRunning ? "Pause" : "Start"}
                  </button>
                  <button onClick={resetTimer}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-border bg-secondary text-foreground text-sm hover:bg-secondary/80 active:scale-95 transition-all">
                    <RotateCcw className="h-4 w-4" /> Reset
                  </button>
                  {timerMode === "work" && (
                    <button onClick={takeBreak}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-500 text-sm hover:bg-emerald-500/20 active:scale-95 transition-all">
                      <Coffee className="h-4 w-4" /> Take Break
                    </button>
                  )}
                  {(timerMode === "break" || timerMode === "longBreak") && (
                    <button onClick={skipBreak}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-500 text-sm hover:bg-violet-500/20 active:scale-95 transition-all">
                      Skip Break
                    </button>
                  )}
                </div>

                <div className="flex gap-1.5">
                  {[1,2,3,4].map(i => (
                    <div key={i} className={`h-2 w-2 rounded-full transition-all ${i <= (pomodoroCount % 4) ? "bg-violet-500" : "bg-secondary"}`} />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">After 4 sessions → 15 min long break</p>
              </div>
            </div>

            {totalTasks > 0 && (
              <div className="rounded-2xl border border-border/60 bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-semibold text-foreground">Today's Progress</p>
                  <p className="text-sm font-bold text-violet-400">{progressPct}%</p>
                </div>
    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-violet-500 transition-all duration-500" style={{ width: `${progressPct}%` }} />
                </div>
                <p className="text-xs text-muted-foreground mt-1.5">{completedToday} of {totalTasks} tasks completed</p>
              </div>
            )}
          </>
        )}

        {/* SCHEDULE TAB */}
        {activeTab === "schedule" && (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-foreground">Today's Schedule</p>
                <button
                  onClick={notifPermission === "default" ? handleEnableNotifications : undefined}
                  className={`mt-0.5 flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    notifPermission === "granted"
                      ? "text-emerald-400 bg-emerald-500/10"
                      : notifPermission === "denied"
                      ? "text-red-400 bg-red-500/10"
                      : "text-violet-400 bg-violet-500/10 cursor-pointer hover:bg-violet-500/20"
                  }`}
                >
                  {notifPermission === "granted"
                    ? <><Bell className="h-3 w-3" /> Notifications ON</>
                    : notifPermission === "denied"
                    ? <><BellOff className="h-3 w-3" /> Notifications Blocked</>
                    : <><Bell className="h-3 w-3" /> Enable Notifications</>}
                </button>
              </div>
              <button onClick={() => setShowForm(!showForm)}
                className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-violet-500/15 text-violet-400 hover:bg-violet-500/25 font-medium">
                <Plus className="h-3.5 w-3.5" /> Add Schedule
              </button>
            </div>

            {showForm && (
              <div className="rounded-2xl border border-violet-500/30 bg-card p-4 shadow-sm space-y-3">
                <input type="text" placeholder="Add Schedule"
                  value={subject} onChange={e => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20" />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">Start Time</label>
                    <input type="time" value={startTime} onChange={e => setStartTime(e.target.value)}
                      className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500" />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1 block">End Time</label>
                    <input type="time" value={endTime} onChange={e => setEndTime(e.target.value)}
                      className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2 text-sm text-foreground outline-none focus:border-violet-500" />
                  </div>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">Repeat</label>
                  <div className="flex flex-wrap gap-1.5">
                    {DAYS.map(day => (
                      <button key={day.value} onClick={() => setRepeat(day.value as Task["repeat"])}
                        className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${repeat === day.value ? "bg-violet-600 border-violet-600 text-white" : "border-border text-muted-foreground hover:border-violet-500"}`}>
                        {day.label}
                      </button>
                    ))}
                  </div>
                </div>
                {notifPermission === "granted" && (
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <Bell className="h-3 w-3" /> Notification scheduled at {startTime}
                  </p>
                )}
                <div className="flex gap-2">
                  <button onClick={addTask} disabled={saving || !subject.trim()}
                    className="flex-1 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 disabled:opacity-50">
                    {saving ? "Saving..." : "Add Schedule"}
                  </button>
                  <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-border text-muted-foreground hover:bg-secondary">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {loading ? (
              <div className="text-center py-8 text-muted-foreground text-sm">Loading...</div>
            ) : tasks.length === 0 ? (
              <div className="text-center py-10 rounded-2xl border border-dashed border-border">
                <Calendar className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">No tasks yet</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Add a task to get started!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {tasks.map(task => (
                  <div key={task.id} className={`flex items-center gap-3 rounded-2xl border p-3.5 transition-all ${task.completed ? "border-emerald-500/20 bg-emerald-500/5 opacity-70" : "border-border/60 bg-card"}`}>
                    <button onClick={() => toggleTask(task)} className="shrink-0">
                      {task.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5 text-muted-foreground hover:text-violet-400" />}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.subject}</p>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[10px] text-muted-foreground/70">{task.start_time} – {task.end_time}</span>
                        {task.streak > 0 && <span className="text-[10px] text-orange-400">🔥 {task.streak} day streak</span>}
                        {notifPermission === "granted" && !task.completed && taskRepeatsTodaay(task) && (
                          <span className="text-[10px] text-violet-400 flex items-center gap-0.5">
                            <Bell className="h-2.5 w-2.5" /> reminder set
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={() => deleteTask(task.id)} className="shrink-0 p-1 rounded-lg text-muted-foreground hover:text-red-400 hover:bg-red-500/10">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* ROUTINE TAB */}
        {activeTab === "routine" && (
          <>
            <p className="text-sm text-muted-foreground">Your tasks organized by time of day</p>
            {TIME_SLOTS.map(slot => {
              const slotTasks = tasks.filter(t => (t.time_slot || "morning") === slot.value)
              const Icon = slot.icon
              if (slotTasks.length === 0) return null
              return (
                <div key={slot.value} className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
                  <div className={`flex items-center gap-2 px-4 py-3 border-b border-border/40 ${slot.bg}`}>
                    <Icon className={`h-4 w-4 ${slot.color}`} />
                    <p className={`text-sm font-semibold ${slot.color}`}>{slot.label}</p>
                    <span className="ml-auto text-xs text-muted-foreground">{slotTasks.filter(t => t.completed).length}/{slotTasks.length} done</span>
                  </div>
                  <div className="divide-y divide-border/40">
                    {slotTasks.map(task => (
                      <div key={task.id} className="flex items-center gap-3 px-4 py-3">
                        <button onClick={() => toggleTask(task)} className="shrink-0">
                          {task.completed ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <Circle className="h-4 w-4 text-muted-foreground hover:text-violet-400" />}
                        </button>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}>{task.subject}</p>
                          <p className="text-xs text-muted-foreground">{task.start_time} – {task.end_time}</p>
                        </div>
                        {task.streak > 0 && <span className="text-[10px] text-orange-400 shrink-0">🔥 {task.streak}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
            {tasks.length === 0 && (
              <div className="text-center py-10 rounded-2xl border border-dashed border-border">
                <Timer className="h-8 w-8 mx-auto text-muted-foreground/40 mb-2" />
                <p className="text-sm text-muted-foreground">No routine set yet</p>
                <p className="text-xs text-muted-foreground/60 mt-1">Add tasks from the Schedule tab</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
                }
