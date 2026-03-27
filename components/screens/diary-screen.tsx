"use client"

import React, { useState, useEffect, useCallback } from "react"
import { ScreenHeader } from "@/components/screen-header"
import { useApp } from "@/lib/app-context"
import { BookMarked, Plus, Trash2, Edit3, Save, X, Calendar, Search } from "lucide-react"
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
  tags: string[]
  word_count: number
  created_at: string
  updated_at: string
}

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

export function DiaryScreen() {
  const { user } = useApp()

  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [userReady, setUserReady] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")

  // Wait for user to load from localStorage (async)
  useEffect(() => {
    if (user?.email) {
      setUserReady(true)
    }
  }, [user])

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

  useEffect(() => {
    if (userReady) loadEntries()
  }, [userReady, loadEntries])

  const saveEntry = async () => {
    if (!title.trim() || !content.trim()) {
      setSaveError("Title aur content dono likhna zaroori hai!")
      return
    }

    // User email check with retry
    const email = user?.email
    if (!email) {
      setSaveError("User session load ho rahi hai... ek second ruko aur phir Save dabao.")
      return
    }

    setSaving(true)
    setSaveError(null)

    const payload = {
      title: title.trim(),
      content: content.trim(),
      mood: "😊",
      tags: [] as string[],
      word_count: countWords(content),
      updated_at: new Date().toISOString(),
    }

    try {
      if (editingId) {
        const { error } = await supabase
          .from("diary_entries")
          .update(payload)
          .eq("id", editingId)

        if (error) throw new Error(error.message)
        setEntries(prev => prev.map(e => e.id === editingId ? { ...e, ...payload } : e))
      } else {
        const { data, error } = await supabase
          .from("diary_entries")
          .insert({
            user_email: email,
            ...payload,
            created_at: new Date().toISOString(),
          })
          .select()
          .single()

        if (error) throw new Error(error.message)
        if (data) setEntries(prev => [data as DiaryEntry, ...prev])
      }

      setSaving(false)
      setIsEditing(false)
      setEditingId(null)
      setTitle("")
      setContent("")
    } catch (err: unknown) {
      setSaveError("Save failed: " + String(err))
      setSaving(false)
    }
  }

  const openNewEditor = () => {
    setEditingId(null)
    setTitle("")
    setContent("")
    setSaveError(null)
    setIsEditing(true)
  }

  const openEditEditor = (entry: DiaryEntry) => {
    setEditingId(entry.id)
    setTitle(entry.title)
    setContent(entry.content)
    setSaveError(null)
    setIsEditing(true)
  }

  const closeEditor = () => {
    setIsEditing(false)
    setEditingId(null)
    setTitle("")
    setContent("")
    setSaveError(null)
  }

  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("diary_entries").delete().eq("id", id)
    if (!error) setEntries(prev => prev.filter(e => e.id !== id))
  }

  const toggleExpand = (id: string) =>
    setExpandedIds(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })

  const filteredEntries = entries.filter(e =>
    !searchQuery ||
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

  // ── Editor View ───────────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <div className="sticky top-0 z-40 flex items-center gap-2 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
          <button
            onClick={closeEditor}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary"
          >
            <X className="h-5 w-5" />
          </button>
          <span className="flex-1 text-sm font-semibold text-foreground">
            {editingId ? "Edit Entry" : "New Entry"}
          </span>
          <span className="text-xs text-muted-foreground mr-1">{countWords(content)}w</span>
          <button
            onClick={saveEntry}
            disabled={saving || !title.trim() || !content.trim()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 text-white text-sm font-semibold hover:bg-amber-400 disabled:opacity-50 active:scale-95 transition-all"
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="flex-1 px-4 py-4 space-y-3 max-w-md mx-auto w-full">
          {saveError && (
            <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {saveError}
            </div>
          )}

          <input
            type="text"
            placeholder="Entry title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />

          <textarea
            placeholder="Start writing..."
            value={content}
            onChange={e => setContent(e.target.value)}
            rows={22}
            autoFocus
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none leading-relaxed"
          />
        </div>
      </div>
    )
  }

  // ── List View ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title="My Diary" />
      <div className="flex-1 px-4 py-4 max-w-md mx-auto w-full pb-8">

        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-foreground">
              {entries.length} {entries.length === 1 ? "Entry" : "Entries"}
            </p>
            <p className="text-xs text-muted-foreground">Your personal journal ✍️</p>
          </div>
          <button
            onClick={openNewEditor}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-semibold hover:bg-amber-400 active:scale-95 transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" /> Write
          </button>
        </div>

        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search entries..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20"
          />
        </div>

        {!userReady ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
        ) : loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Loading entries...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-14 rounded-2xl border border-dashed border-border">
            <BookMarked className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">
              {searchQuery ? "No entries found" : "Diary is empty"}
            </p>
            {!searchQuery && (
              <p className="text-xs text-muted-foreground/60 mt-1">
                Tap "Write" to add your first entry!
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map(entry => {
              const isExpanded = expandedIds.has(entry.id)
              return (
                <div
                  key={entry.id}
                  className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleExpand(entry.id)}
                    className="w-full flex items-start gap-3 p-4 text-left"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{entry.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(entry.created_at)}
                        {entry.word_count > 0 && <span className="ml-1">· {entry.word_count}w</span>}
                      </p>
                      {!isExpanded && (
                        <p className="text-xs text-muted-foreground/70 mt-1 line-clamp-2">
                          {entry.content}
                        </p>
                      )}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-border/60">
                      <p className="text-sm text-foreground/80 leading-relaxed mt-3 whitespace-pre-wrap">
                        {entry.content}
                      </p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
                        <button
                          onClick={() => openEditEditor(entry)}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-secondary text-foreground hover:bg-secondary/80"
                        >
                          <Edit3 className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => deleteEntry(entry.id)}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20"
                        >
                          <Trash2 className="h-3 w-3" /> Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
        }
            
