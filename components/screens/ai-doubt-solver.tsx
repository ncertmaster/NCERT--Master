"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useApp } from "@/lib/app-context"
import {
  Send, Loader2, Sparkles, Menu, X, Plus, Pin, PinOff,
  Pencil, Trash2, Check, BookOpen, MessageSquare, ChevronRight
} from "lucide-react"
import Image from "next/image"

// ── Types ──────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant"
  content: string
  ts: number
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  createdAt: number
  pinned: boolean
}

// ── Storage helpers ────────────────────────────────────────────────────────
const STORAGE_KEY = "ncert_guru_chats"

function loadChats(): Chat[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function saveChats(chats: Chat[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(chats)) } catch {}
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
}

function createNewChat(): Chat {
  return { id: genId(), title: "Naya Sawaal", messages: [], createdAt: Date.now(), pinned: false }
}

function firstUserTitle(messages: Message[]): string {
  const first = messages.find(m => m.role === "user")
  if (!first) return "Naya Sawaal"
  const txt = first.content.trim()
  return txt.length > 40 ? txt.slice(0, 37) + "…" : txt
}

// ── Render markdown-like response ─────────────────────────────────────────
function renderAnswer(text: string) {
  const lines = text.split("\n")
  return lines.map((line, i) => {
    if (line.startsWith("### ")) return (
      <h3 key={i} className="mt-3 mb-1 text-sm font-bold text-foreground">{line.slice(4)}</h3>
    )
    if (line.startsWith("## ")) return (
      <h2 key={i} className="mt-3 mb-1 text-[15px] font-bold text-foreground">{line.slice(3)}</h2>
    )
    if (line.startsWith("# ")) return (
      <h2 key={i} className="mt-3 mb-1 text-base font-bold text-foreground">{line.slice(2)}</h2>
    )
    // **bold** inline
    if (line.includes("**")) {
      const parts = line.split(/(\*\*[^*]+\*\*)/)
      return (
        <p key={i} className="text-sm text-foreground/90 leading-relaxed mt-0.5">
          {parts.map((p, j) =>
            p.startsWith("**") && p.endsWith("**")
              ? <strong key={j}>{p.slice(2, -2)}</strong>
              : p
          )}
        </p>
      )
    }
    if (line.startsWith("- ") || line.startsWith("• ")) return (
      <div key={i} className="flex gap-2 mt-1">
        <span className="text-primary mt-0.5 shrink-0">•</span>
        <span className="text-sm text-foreground/90 leading-relaxed">{line.slice(2)}</span>
      </div>
    )
    if (/^\d+\.\s/.test(line)) {
      const [num, ...rest] = line.split(". ")
      return (
        <div key={i} className="flex gap-2 mt-1">
          <span className="text-primary font-semibold text-sm shrink-0">{num}.</span>
          <span className="text-sm text-foreground/90 leading-relaxed">{rest.join(". ")}</span>
        </div>
      )
    }
    if (line.trim() === "") return <div key={i} className="h-2" />
    return <p key={i} className="text-sm text-foreground/90 leading-relaxed mt-0.5">{line}</p>
  })
}

// ── Recent Chats Sidebar ───────────────────────────────────────────────────
function ChatSidebar({
  open, onClose, chats, activeChatId,
  onSelect, onNew, onDelete, onPin, onRename,
}: {
  open: boolean
  onClose: () => void
  chats: Chat[]
  activeChatId: string
  onSelect: (id: string) => void
  onNew: () => void
  onDelete: (id: string) => void
  onPin: (id: string) => void
  onRename: (id: string, title: string) => void
}) {
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameVal, setRenameVal] = useState("")
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)
  const renameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (renamingId && renameInputRef.current) renameInputRef.current.focus()
  }, [renamingId])

  const sorted = [
    ...chats.filter(c => c.pinned).sort((a, b) => b.createdAt - a.createdAt),
    ...chats.filter(c => !c.pinned).sort((a, b) => b.createdAt - a.createdAt),
  ]

  const startRename = (c: Chat) => {
    setRenamingId(c.id)
    setRenameVal(c.title)
    setDeleteConfirmId(null)
  }

  const submitRename = (id: string) => {
    if (renameVal.trim()) onRename(id, renameVal.trim())
    setRenamingId(null)
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts)
    const now = new Date()
    if (d.toDateString() === now.toDateString()) {
      return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
    }
    return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" })
  }

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-card border-r border-border shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
              <MessageSquare className="h-4 w-4 text-primary" />
            </div>
            <span className="font-semibold text-sm text-foreground">Recent Chats</span>
          </div>
          <button
            onClick={onClose}
            className="flex h-7 w-7 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="px-3 py-3 border-b border-border">
          <button
            onClick={() => { onNew(); onClose() }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold transition-all active:scale-95"
          >
            <Plus className="h-4 w-4" />
            Naya Sawaal
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto py-2">
          {sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 gap-2 text-center px-4">
              <BookOpen className="h-8 w-8 text-muted-foreground/40" />
              <p className="text-xs text-muted-foreground">Koi chat nahi hai abhi.</p>
              <p className="text-xs text-muted-foreground">Pehla sawaal poocho!</p>
            </div>
          ) : (
            sorted.map((chat) => (
              <div
                key={chat.id}
                className={`group mx-2 mb-1 rounded-xl border transition-colors ${
                  activeChatId === chat.id
                    ? "border-primary/30 bg-primary/5"
                    : "border-transparent hover:bg-secondary"
                }`}
              >
                {renamingId === chat.id ? (
                  <div className="flex items-center gap-1.5 p-2">
                    <input
                      ref={renameInputRef}
                      value={renameVal}
                      onChange={e => setRenameVal(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === "Enter") submitRename(chat.id)
                        if (e.key === "Escape") setRenamingId(null)
                      }}
                      className="flex-1 bg-secondary rounded-lg px-2 py-1 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      onClick={() => submitRename(chat.id)}
                      className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary text-primary-foreground shrink-0"
                    >
                      <Check className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => setRenamingId(null)}
                      className="flex h-6 w-6 items-center justify-center rounded-lg bg-secondary text-muted-foreground shrink-0"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : deleteConfirmId === chat.id ? (
                  <div className="p-3">
                    <p className="text-xs text-foreground mb-2">Yeh chat delete karein?</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => { onDelete(chat.id); setDeleteConfirmId(null) }}
                        className="flex-1 rounded-lg bg-destructive text-destructive-foreground py-1.5 text-xs font-semibold"
                      >
                        Haan, delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="flex-1 rounded-lg bg-secondary text-foreground py-1.5 text-xs font-semibold"
                      >
                        Nahi
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => { onSelect(chat.id); onClose() }}
                    className="w-full text-left p-3"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5">
                          {chat.pinned && <Pin className="h-3 w-3 text-primary shrink-0" />}
                          <p className="text-xs font-medium text-foreground truncate">{chat.title}</p>
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">
                          {chat.messages.length} message{chat.messages.length !== 1 ? "s" : ""} · {formatTime(chat.createdAt)}
                        </p>
                      </div>
                      {/* Action buttons - visible on hover */}
                      <div
                        className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0"
                        onClick={e => e.stopPropagation()}
                      >
                        <button
                          onClick={() => onPin(chat.id)}
                          title={chat.pinned ? "Unpin" : "Pin"}
                          className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {chat.pinned ? <PinOff className="h-3 w-3" /> : <Pin className="h-3 w-3" />}
                        </button>
                        <button
                          onClick={() => startRename(chat)}
                          title="Rename"
                          className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Pencil className="h-3 w-3" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(chat.id)}
                          title="Delete"
                          className="flex h-6 w-6 items-center justify-center rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-border">
          <p className="text-[10px] text-muted-foreground text-center">
            Guru AI · NCERT Master by Farru
          </p>
        </div>
      </aside>
    </>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
export function AiDoubtSolverScreen() {
  const { language, selectedClass, goBack } = useApp()

  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string>("")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const isHindi = language === "hi"

  // Load chats from localStorage on mount
  useEffect(() => {
    const stored = loadChats()
    if (stored.length > 0) {
      setChats(stored)
      setActiveChatId(stored.find(c => c.pinned)?.id || stored.sort((a, b) => b.createdAt - a.createdAt)[0]?.id || "")
    } else {
      const fresh = createNewChat()
      setChats([fresh])
      setActiveChatId(fresh.id)
    }
  }, [])

  // Save to localStorage whenever chats change
  useEffect(() => {
    if (chats.length > 0) saveChats(chats)
  }, [chats])

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats, activeChatId, loading])

  const activeChat = chats.find(c => c.id === activeChatId)
  const messages = activeChat?.messages || []

  const updateChat = useCallback((id: string, updater: (c: Chat) => Chat) => {
    setChats(prev => prev.map(c => c.id === id ? updater(c) : c))
  }, [])

  // ── New Chat ──
  const handleNewChat = useCallback(() => {
    const fresh = createNewChat()
    setChats(prev => [fresh, ...prev])
    setActiveChatId(fresh.id)
    setInput("")
    setError("")
  }, [])

  // ── Delete Chat ──
  const handleDelete = useCallback((id: string) => {
    setChats(prev => {
      const next = prev.filter(c => c.id !== id)
      if (activeChatId === id) {
        if (next.length > 0) {
          setActiveChatId(next[0].id)
        } else {
          const fresh = createNewChat()
          setActiveChatId(fresh.id)
          return [fresh]
        }
      }
      return next
    })
  }, [activeChatId])

  // ── Pin/Unpin ──
  const handlePin = useCallback((id: string) => {
    updateChat(id, c => ({ ...c, pinned: !c.pinned }))
  }, [updateChat])

  // ── Rename ──
  const handleRename = useCallback((id: string, title: string) => {
    updateChat(id, c => ({ ...c, title }))
  }, [updateChat])

  // ── Submit question ──
  const handleSubmit = useCallback(async () => {
    const q = input.trim()
    if (!q || loading) return

    setLoading(true)
    setError("")
    setInput("")

    // Add user message
    const userMsg: Message = { role: "user", content: q, ts: Date.now() }
    let currentMessages: Message[] = []

    setChats(prev => prev.map(c => {
      if (c.id !== activeChatId) return c
      const newMsgs = [...c.messages, userMsg]
      currentMessages = newMsgs
      const title = c.messages.length === 0 ? firstUserTitle([userMsg]) : c.title
      return { ...c, messages: newMsgs, title }
    }))

    try {
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...currentMessages].map(m => ({ role: m.role, content: m.content })),
          language,
          classNum: String(selectedClass || "10"),
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || "Kuch galat ho gaya. Dobara try karo.")
      } else {
        const assistantMsg: Message = {
          role: "assistant",
          content: data.answer || "",
          ts: Date.now(),
        }
        setChats(prev => prev.map(c => {
          if (c.id !== activeChatId) return c
          return { ...c, messages: [...c.messages, assistantMsg] }
        }))
      }
    } catch {
      setError("Internet connection check karo aur dobara try karo.")
    } finally {
      setLoading(false)
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [input, loading, activeChatId, language, selectedClass])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* ── Custom Header ── */}
      <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-border bg-card px-4 py-3">
        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground hover:bg-secondary transition-colors shrink-0"
          aria-label="Open chats"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Title + Guru AI badge */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-primary/10 shrink-0">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            </div>
            <span className="text-sm font-bold text-foreground truncate">Guru AI</span>
            <span className="text-[10px] bg-primary/10 text-primary rounded-full px-2 py-0.5 font-semibold shrink-0">
              NCERT 6-12
            </span>
          </div>
          {activeChat && activeChat.title !== "Naya Sawaal" && (
            <p className="text-[10px] text-muted-foreground truncate mt-0.5 ml-8">{activeChat.title}</p>
          )}
        </div>

        {/* Logo + New Chat */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleNewChat}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-muted transition-colors"
            title="New Chat"
          >
            <Plus className="h-4 w-4" />
          </button>
          <div className="relative h-7 w-7">
            <Image src="/images/logo.png" alt="NCERT Master" fill className="object-contain" />
          </div>
        </div>
      </header>

      {/* ── Chat Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">

        {/* Empty state */}
        {messages.length === 0 && !loading && (
          <div className="flex flex-col items-center justify-center h-full min-h-[50vh] gap-4 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="text-base font-bold text-foreground">Guru AI</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs leading-relaxed">
                {isHindi
                  ? "NCERT Class 6-12 ka koi bhi sawaal poocho. Main har cheez step-by-step samjhaunga! 📚"
                  : "Ask any NCERT Class 6-12 doubt. I'll explain everything step-by-step! 📚"}
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-2 max-w-xs">
              {[
                isHindi ? "Newton ke laws explain karo" : "Explain Newton's laws",
                isHindi ? "Photosynthesis kya hai?" : "What is Photosynthesis?",
                isHindi ? "Quadratic equation solve karo" : "Solve a quadratic equation",
                isHindi ? "Mughal Empire ki history" : "Mughal Empire history",
              ].map(q => (
                <button
                  key={q}
                  onClick={() => { setInput(q) }}
                  className="flex items-center gap-1 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-secondary transition-colors active:scale-95"
                >
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 shrink-0 mr-2 mt-0.5">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
              </div>
            )}
            <div
              className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-card border border-border rounded-bl-sm"
              }`}
            >
              {msg.role === "user" ? (
                <p className="text-sm leading-relaxed">{msg.content}</p>
              ) : (
                <div className="space-y-0.5">{renderAnswer(msg.content)}</div>
              )}
            </div>
          </div>
        ))}

        {/* Loading bubble */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 shrink-0 mr-2 mt-0.5">
              <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            </div>
            <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:0ms]" />
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:150ms]" />
                <div className="h-2 w-2 rounded-full bg-primary/60 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 mx-auto max-w-sm">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* ── Input Area ── */}
      <div className="border-t border-border bg-card px-4 py-3 pb-safe">
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-background px-3 py-2">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              // Auto-resize
              e.target.style.height = "auto"
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
            }}
            onKeyDown={handleKeyDown}
            placeholder={isHindi ? "Apna sawaal likho... (Enter se bhejo)" : "Type your doubt... (Enter to send)"}
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed min-h-[22px] max-h-[120px]"
          />
          <button
            onClick={handleSubmit}
            disabled={loading || !input.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground disabled:opacity-40 transition-all active:scale-95 shrink-0"
          >
            {loading
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Send className="h-4 w-4" />
            }
          </button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Guru AI · NCERT Class 6-12 · Powered by NCERT Master
        </p>
      </div>

      {/* ── Sidebar ── */}
      <ChatSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        chats={chats}
        activeChatId={activeChatId}
        onSelect={id => { setActiveChatId(id); setError("") }}
        onNew={handleNewChat}
        onDelete={handleDelete}
        onPin={handlePin}
        onRename={handleRename}
      />
    </div>
  )
}
