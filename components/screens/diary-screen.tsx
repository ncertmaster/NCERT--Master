"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { ScreenHeader } from "@/components/screen-header"
import { useApp } from "@/lib/app-context"
import {
  BookMarked, Plus, Trash2, Edit3, Check, X, Save,
  Calendar, ChevronDown, ChevronUp
} from "lucide-react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface DiaryEntry {
  id: string
  user_email: string
  title: string
  content: string
  mood: string
  created_at: string
  updated_at: string
}

const MOODS = ["😊", "😐", "😔", "🔥", "💪", "😴", "🤔"]

// Auto-save delay (milliseconds)
const AUTO_SAVE_DELAY = 2000

export function DiaryScreen() {
  const { user } = useApp()

  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)

  // Editor state
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("😊")
  const [saving, setSaving] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle")

  // Expanded entries in timeline
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())

  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null)

  // ─── Load entries ──────────────────────────────────────────────────────────
  const loadEntries = useCallback(async () => {
    if (!user?.email) return
    setLoading(true)
    const { data, error } = await supabase
      .from("diary_entries")
      .select("*")
      .eq("user_email", user.email)
      .order("created_at", { ascending: false })
    if (!error && data) setEntries(data as DiaryEntry[])
    setLoading(false)
  }, [user?.email])

  useEffect(() => { loadEntries() }, [loadEntries])

  // ─── Auto-save logic ───────────────────────────────────────────────────────
  // Jab bhi content change ho, 2 sec baad auto-save karo
  useEffect(() => {
    if (!isEditing || !editingId) return // Only auto-save existing entries
    if (!title.trim() && !content.trim()) return

    setAutoSaveStatus("saving")
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)

    autoSaveTimer.current = setTimeout(async () => {
      await supabase
        .from("diary_entries")
        .update({ title: title.trim(), content: content.trim(), mood, updated_at: new Date().toISOString() })
        .eq("id", editingId)
      setAutoSaveStatus("saved")
      setTimeout(() => setAutoSaveStatus("idle"), 2000)
    }, AUTO_SAVE_DELAY)

    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current) }
  }, [title, content, mood, editingId, isEditing])

  // ─── Save / Update entry ───────────────────────────────────────────────────
  const saveEntry = async () => {
    if (!title.trim() || !content.trim() || !user?.email) return
    setSaving(true)

    if (editingId) {
      // Update existing
      const { error } = await supabase
        .from("diary_entries")
        .update({ title: title.trim(), content: content.trim(), mood, updated_at: new Date().toISOString() })
        .eq("id", editingId)
      if (!error) {
        setEntries(prev => prev.map(e =>
          e.id === editingId ? { ...e, title: title.trim(), content: content.trim(), mood } : e
        ))
      }
    } else {
      // New entry
      const { data, error } = await supabase
        .from("diary_entries")
        .insert({
          user_email: user.email,
          title: title.trim(),
          content: content.trim(),
          mood,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select()
        .single()
      if (!error && data) setEntries(prev => [data as DiaryEntry, ...prev])
    }

    setSaving(false)
    closeEditor()
  }

  const openNewEditor = () => {
    setEditingId(null)
    setTitle("")
    setContent("")
    setMood("😊")
    setAutoSaveStatus("idle")
    setIsEditing(true)
  }

  const openEditEditor = (entry: DiaryEntry) => {
    setEditingId(entry.id)
    setTitle(entry.title)
    setContent(entry.content)
    setMood(entry.mood)
    setAutoSaveStatus("idle")
    setIsEditing(true)
  }

  const closeEditor = () => {
    setIsEditing(false)
    setEditingId(null)
    setTitle("")
    setContent("")
    setAutoSaveStatus("idle")
  }

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("diary_entries").delete().eq("id", id)
    if (!error) setEntries(prev => prev.filter(e => e.id !== id))
  }

  const toggleExpand = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString("hi-IN", { day: "numeric", month: "long", year: "numeric" })
  }

  const formatDateShort = (dateStr: string) => {
    const d = new Date(dateStr)
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
  }

  // ─── Editor View ───────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        {/* Editor Header */}
        <div className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
          <button
            onClick={closeEditor}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <span className="flex-1 text-sm font-semibold text-foreground">
            {editingId ? "Edit Entry" : "New Entry"}
          </span>
          {/* Auto-save status */}
          <span className={`text-xs transition-all ${
            autoSaveStatus === "saving" ? "text-amber-400" :
            autoSaveStatus === "saved" ? "text-emerald-400" :
            "text-transparent"
          }`}>
            {autoSaveStatus === "saving" ? "Saving..." : autoSaveStatus === "saved" ? "✓ Saved" : "."}
          </span>
          <button
            onClick={saveEntry}
            disabled={saving || !title.trim() || !content.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-semibold hover:bg-amber-400 disabled:opacity-50 transition-colors"
          >
            <Save className="h-3.5 w-3.5" />
            Save
          </button>
        </div>

        <div className="flex-1 px-4 py-4 space-y-3 max-w-md mx-auto w-full">
          {/* Mood Selector */}
          <div>
            <p className="text-xs text-muted-foreground mb-2">How are you feeling today?</p>
            <div className="flex gap-2">
              {MOODS.map(m => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`text-xl p-2 rounded-xl transition-all ${
                    mood === m ? "bg-amber-500/20 scale-110 ring-2 ring-amber-500/40" : "hover:bg-secondary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <input
            type="text"
            placeholder="Write a title... (e.g. Today's Day, Goal, Reflection)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
          />

          {/* Content */}
          <textarea
            placeholder="Write your thoughts... goals, reflections, what you learned — anything!"
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={16}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all resize-none leading-relaxed"
          />
        </div>
      </div>
    )
  }

  // ─── Timeline View ─────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title="My Diary" />

      <div className="flex-1 px-4 py-4 max-w-md mx-auto w-full pb-8">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-foreground">{entries.length} Entries</p>
            <p className="text-xs text-muted-foreground">Your personal diary ✍️</p>
          </div>
          <button
            onClick={openNewEditor}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-semibold hover:bg-amber-400 active:scale-95 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Likho
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
        ) : entries.length === 0 ? (
          <div className="text-center py-14 rounded-2xl border border-dashed border-border">
            <BookMarked className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">Diary is empty</p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Use the "Write" button above to add your first entry!
            </p>
          </div>
        ) : (
          /* Timeline */
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border" />

            <div className="space-y-4">
              {entries.map(entry => {
                const isExpanded = expandedIds.has(entry.id)
                return (
                  <div key={entry.id} className="relative flex gap-4">
                    {/* Timeline dot */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-card border-2 border-amber-500/40 text-lg">
                      {entry.mood}
                    </div>

                    {/* Entry Card */}
                    <div className="flex-1 rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
                      {/* Card Header */}
                      <button
                        onClick={() => toggleExpand(entry.id)}
                        className="w-full flex items-start gap-2 p-3.5 text-left"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground truncate">{entry.title}</p>
                          <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(entry.created_at)}
                          </p>
                        </div>
                        {isExpanded
                          ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                          : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        }
                      </button>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 border-t border-border/60">
                          <p className="text-sm text-foreground/80 leading-relaxed mt-3 whitespace-pre-wrap">
                            {entry.content}
                          </p>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
                            <button
                              onClick={() => openEditEditor(entry)}
                              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-secondary text-foreground hover:bg-secondary/80 transition-colors"
                            >
                              <Edit3 className="h-3 w-3" />
                              Edit
                            </button>
                            <button
                              onClick={() => deleteEntry(entry.id)}
                              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                            >
                              <Trash2 className="h-3 w-3" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
    }

  
