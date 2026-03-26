"use client"

import React, { useState, useEffect, useCallback, useRef } from "react"
import { ScreenHeader } from "@/components/screen-header"
import { useApp } from "@/lib/app-context"
import {
  BookMarked, Plus, Trash2, Edit3, Save, X,
  Calendar, Search, Tag, ChevronDown, ChevronUp,
  Bold, Italic, List, Heading2, AlignLeft, Hash
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
  tags: string[]
  word_count: number
  created_at: string
  updated_at: string
}

const MOODS = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😐", label: "Neutral" },
  { emoji: "😔", label: "Sad" },
  { emoji: "🔥", label: "Motivated" },
  { emoji: "💪", label: "Strong" },
  { emoji: "😴", label: "Tired" },
  { emoji: "🤔", label: "Thinking" },
  { emoji: "😤", label: "Focused" },
]

const TAGS = ["Study", "Personal", "Goals", "Gratitude", "Ideas", "Reflection", "Important"]

const TAG_COLORS: Record<string, string> = {
  Study: "bg-blue-500/15 text-blue-500 border-blue-500/30",
  Personal: "bg-pink-500/15 text-pink-500 border-pink-500/30",
  Goals: "bg-amber-500/15 text-amber-500 border-amber-500/30",
  Gratitude: "bg-emerald-500/15 text-emerald-500 border-emerald-500/30",
  Ideas: "bg-violet-500/15 text-violet-500 border-violet-500/30",
  Reflection: "bg-cyan-500/15 text-cyan-500 border-cyan-500/30",
  Important: "bg-red-500/15 text-red-500 border-red-500/30",
}

const AUTO_SAVE_DELAY = 2000

function countWords(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length
}

// ── Rich Text Toolbar ─────────────────────────────────────────────────────────
function insertFormat(
  textarea: HTMLTextAreaElement,
  setContent: (v: string) => void,
  prefix: string, suffix: string = "", placeholder: string = "text"
) {
  const start = textarea.selectionStart
  const end = textarea.selectionEnd
  const selected = textarea.value.slice(start, end) || placeholder
  const before = textarea.value.slice(0, start)
  const after = textarea.value.slice(end)
  const newText = before + prefix + selected + suffix + after
  setContent(newText)
  setTimeout(() => {
    textarea.focus()
    textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length)
  }, 10)
}

export function DiaryScreen() {
  const { user } = useApp()
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [mood, setMood] = useState("😊")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [autoSaveStatus, setAutoSaveStatus] = useState<"idle" | "saving" | "saved">("idle")
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [filterTag, setFilterTag] = useState<string | null>(null)
  const autoSaveTimer = useRef<NodeJS.Timeout | null>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

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

  // Auto-save for existing entries
  useEffect(() => {
    if (!isEditing || !editingId) return
    if (!title.trim() && !content.trim()) return
    setAutoSaveStatus("saving")
    if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current)
    autoSaveTimer.current = setTimeout(async () => {
      await supabase.from("diary_entries").update({
        title: title.trim(), content: content.trim(), mood,
        tags: selectedTags, word_count: countWords(content),
        updated_at: new Date().toISOString()
      }).eq("id", editingId)
      setAutoSaveStatus("saved")
      setTimeout(() => setAutoSaveStatus("idle"), 2000)
    }, AUTO_SAVE_DELAY)
    return () => { if (autoSaveTimer.current) clearTimeout(autoSaveTimer.current) }
  }, [title, content, mood, selectedTags, editingId, isEditing])

  const saveEntry = async () => {
    if (!title.trim() || !content.trim() || !user?.email) return
    setSaving(true)
    const payload = {
      title: title.trim(), content: content.trim(), mood,
      tags: selectedTags, word_count: countWords(content),
      updated_at: new Date().toISOString()
    }
    try {
      if (editingId) {
        const { error } = await supabase.from("diary_entries").update(payload).eq("id", editingId)
        if (error) { alert("Save failed: " + error.message); setSaving(false); return }
        setEntries(prev => prev.map(e => e.id === editingId ? { ...e, ...payload } : e))
      } else {
        const { data, error } = await supabase.from("diary_entries").insert({
          user_email: user.email, ...payload,
          created_at: new Date().toISOString()
        }).select().single()
        if (error) { alert("Save failed: " + error.message); setSaving(false); return }
        if (data) setEntries(prev => [data as DiaryEntry, ...prev])
      }
      setSaving(false)
      closeEditor()
    } catch (err: unknown) {
      alert("Save failed: " + String(err))
      setSaving(false)
    }

  const openNewEditor = () => {
    setEditingId(null); setTitle(""); setContent(""); setMood("😊"); setSelectedTags([]); setAutoSaveStatus("idle"); setIsEditing(true)
  }
  const openEditEditor = (entry: DiaryEntry) => {
    setEditingId(entry.id); setTitle(entry.title); setContent(entry.content); setMood(entry.mood)
    setSelectedTags(entry.tags || []); setAutoSaveStatus("idle"); setIsEditing(true)
  }
  const closeEditor = () => { setIsEditing(false); setEditingId(null); setTitle(""); setContent(""); setSelectedTags([]) }
  const deleteEntry = async (id: string) => {
    const { error } = await supabase.from("diary_entries").delete().eq("id", id)
    if (!error) setEntries(prev => prev.filter(e => e.id !== id))
  }
  const toggleExpand = (id: string) => setExpandedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  const toggleTag = (tag: string) => setSelectedTags(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])

  const filteredEntries = entries.filter(e => {
    const matchSearch = !searchQuery || e.title.toLowerCase().includes(searchQuery.toLowerCase()) || e.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchTag = !filterTag || (e.tags || []).includes(filterTag)
    return matchSearch && matchTag
  })

  const formatDate = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })

  // ── Editor ────────────────────────────────────────────────────────────────────
  if (isEditing) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        {/* Editor Header */}
        <div className="sticky top-0 z-40 flex items-center gap-2 border-b border-border bg-card/95 px-4 py-3 backdrop-blur">
          <button onClick={closeEditor} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary">
            <X className="h-5 w-5" />
          </button>
          <span className="flex-1 text-sm font-semibold text-foreground">{editingId ? "Edit Entry" : "New Entry"}</span>
          <span className={`text-xs transition-all ${autoSaveStatus === "saving" ? "text-amber-400" : autoSaveStatus === "saved" ? "text-emerald-400" : "text-transparent"}`}>
            {autoSaveStatus === "saving" ? "Saving..." : autoSaveStatus === "saved" ? "✓ Saved" : "."}
          </span>
          <span className="text-xs text-muted-foreground">{countWords(content)}w</span>
          <button onClick={saveEntry} disabled={saving || !title.trim() || !content.trim()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 text-white text-xs font-semibold hover:bg-amber-400 disabled:opacity-50">
            <Save className="h-3.5 w-3.5" /> Save
          </button>
        </div>

        <div className="flex-1 px-4 py-4 space-y-3 max-w-md mx-auto w-full">
          {/* Mood */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium">How are you feeling?</p>
            <div className="flex gap-1.5 flex-wrap">
              {MOODS.map(m => (
                <button key={m.emoji} onClick={() => setMood(m.emoji)}
                  className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs transition-all border ${mood === m.emoji ? "bg-amber-500/20 border-amber-500/40 scale-105" : "border-border hover:bg-secondary"}`}>
                  <span>{m.emoji}</span><span className="text-muted-foreground">{m.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs text-muted-foreground mb-2 font-medium flex items-center gap-1"><Hash className="h-3 w-3" /> Tags</p>
            <div className="flex gap-1.5 flex-wrap">
              {TAGS.map(tag => (
                <button key={tag} onClick={() => toggleTag(tag)}
                  className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${selectedTags.includes(tag) ? TAG_COLORS[tag] : "border-border text-muted-foreground hover:bg-secondary"}`}>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <input type="text" placeholder="Entry title..."
            value={title} onChange={e => setTitle(e.target.value)}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base font-semibold text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />

          {/* Formatting Toolbar */}
          <div className="flex gap-1 p-1 rounded-xl border border-border bg-card">
            {[
              { icon: Bold, action: () => textareaRef.current && insertFormat(textareaRef.current, setContent, "**", "**", "bold text"), title: "Bold" },
              { icon: Italic, action: () => textareaRef.current && insertFormat(textareaRef.current, setContent, "_", "_", "italic text"), title: "Italic" },
              { icon: Heading2, action: () => textareaRef.current && insertFormat(textareaRef.current, setContent, "## ", "", "Heading"), title: "Heading" },
              { icon: List, action: () => textareaRef.current && insertFormat(textareaRef.current, setContent, "\n• ", "", "list item"), title: "List" },
              { icon: AlignLeft, action: () => textareaRef.current && insertFormat(textareaRef.current, setContent, "\n", "", ""), title: "New line" },
            ].map(({ icon: Icon, action, title: t }) => (
              <button key={t} onClick={action} title={t}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                <Icon className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>

          {/* Content */}
          <textarea ref={textareaRef} placeholder="Start writing... your thoughts, goals, reflections — anything!"
            value={content} onChange={e => setContent(e.target.value)}
            rows={18}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 resize-none leading-relaxed font-mono" />
        </div>
      </div>
    )
  }

  // ── List View ─────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title="My Diary" />
      <div className="flex-1 px-4 py-4 max-w-md mx-auto w-full pb-8">

        {/* Header Row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-foreground">{entries.length} {entries.length === 1 ? "Entry" : "Entries"}</p>
            <p className="text-xs text-muted-foreground">Your personal journal ✍️</p>
          </div>
          <button onClick={openNewEditor}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-500 text-white text-sm font-semibold hover:bg-amber-400 active:scale-95 transition-all shadow-sm">
            <Plus className="h-4 w-4" /> Write
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search entries..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20" />
        </div>

        {/* Tag Filter */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto pb-1 scrollbar-hide">
          <button onClick={() => setFilterTag(null)}
            className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all ${!filterTag ? "bg-amber-500 border-amber-500 text-white" : "border-border text-muted-foreground hover:bg-secondary"}`}>
            All
          </button>
          {TAGS.map(tag => (
            <button key={tag} onClick={() => setFilterTag(filterTag === tag ? null : tag)}
              className={`shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-all ${filterTag === tag ? TAG_COLORS[tag] : "border-border text-muted-foreground hover:bg-secondary"}`}>
              {tag}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground text-sm">Loading...</div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-14 rounded-2xl border border-dashed border-border">
            <BookMarked className="h-10 w-10 mx-auto text-muted-foreground/30 mb-3" />
            <p className="text-sm font-medium text-muted-foreground">{searchQuery || filterTag ? "No entries found" : "Diary is empty"}</p>
            <p className="text-xs text-muted-foreground/60 mt-1">{!searchQuery && !filterTag && 'Tap "Write" to add your first entry!'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredEntries.map(entry => {
              const isExpanded = expandedIds.has(entry.id)
              return (
                <div key={entry.id} className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
                  <button onClick={() => toggleExpand(entry.id)} className="w-full flex items-start gap-3 p-4 text-left">
                    <span className="text-2xl shrink-0 mt-0.5">{entry.mood}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{entry.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />{formatDate(entry.created_at)}
                        {entry.word_count > 0 && <span className="ml-1">· {entry.word_count}w</span>}
                      </p>
                      {(entry.tags || []).length > 0 && (
                        <div className="flex gap-1 mt-1.5 flex-wrap">
                          {(entry.tags || []).map(tag => (
                            <span key={tag} className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${TAG_COLORS[tag] || "bg-secondary text-muted-foreground border-border"}`}>{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground shrink-0 mt-1" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />}
                  </button>
                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-border/60">
                      <p className="text-sm text-foreground/80 leading-relaxed mt-3 whitespace-pre-wrap">{entry.content}</p>
                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/40">
                        <button onClick={() => openEditEditor(entry)}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-secondary text-foreground hover:bg-secondary/80">
                          <Edit3 className="h-3 w-3" /> Edit
                        </button>
                        <button onClick={() => deleteEntry(entry.id)}
                          className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full bg-red-500/10 text-red-400 hover:bg-red-500/20">
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

    
