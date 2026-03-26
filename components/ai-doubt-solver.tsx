"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { Bot, X, Send, Loader2, Sparkles, Pin, PinOff, Edit3, Check, Trash2, Plus, ChevronLeft, MessageSquare } from "lucide-react"

// ─── Types ──────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

interface Chat {
  id: string
  title: string
  messages: Message[]
  pinned: boolean
  createdAt: number
  updatedAt: number
}

// ─── Storage helpers ─────────────────────────────────────────────────────────
const CHATS_KEY = "ncert_ai_chats"

function loadChats(): Chat[] {
  try {
    const raw = localStorage.getItem(CHATS_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Chat[]
  } catch { return [] }
}

function saveChats(chats: Chat[]) {
  try { localStorage.setItem(CHATS_KEY, JSON.stringify(chats)) } catch {}
}

function generateId() {
  return Math.random().toString(36).slice(2, 10)
}

function generateTitle(messages: Message[]) {
  const first = messages.find(m => m.role === "user")
  if (!first) return "New Chat"
  return first.content.slice(0, 40) + (first.content.length > 40 ? "..." : "")
}

// ─── Quick Actions ───────────────────────────────────────────────────────────
const QUICK_ACTIONS = [
  { label: "📖 Explain a concept", prompt: "Explain an important NCERT concept" },
  { label: "📝 Make study plan", prompt: "Create my study plan for today" },
  { label: "🧠 Take a quiz", prompt: "Take a short quiz from me" },
  { label: "💪 Motivate me", prompt: "Motivate me to study" },
]

// ─── Main Component ───────────────────────────────────────────────────────────
export function AiDoubtSolver() {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<"history" | "chat">("history")
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const renameRef = useRef<HTMLInputElement>(null)

  // Load chats on mount
  useEffect(() => { setChats(loadChats()) }, [])

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats, activeChatId])

  // Focus input when chat opens
  useEffect(() => {
    if (view === "chat") setTimeout(() => inputRef.current?.focus(), 300)
  }, [view])

  // Focus rename input
  useEffect(() => {
    if (renamingId) setTimeout(() => renameRef.current?.focus(), 100)
  }, [renamingId])

  const activeChat = chats.find(c => c.id === activeChatId)

  // ── New chat ───────────────────────────────────────────────────────────────
  const startNewChat = useCallback(() => {
    const newChat: Chat = {
      id: generateId(),
      title: "New Chat",
      messages: [],
      pinned: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    const updated = [newChat, ...chats]
    setChats(updated)
    saveChats(updated)
    setActiveChatId(newChat.id)
    setView("chat")
  }, [chats])

  // ── Open existing chat ────────────────────────────────────────────────────
  const openChat = (id: string) => {
    setActiveChatId(id)
    setView("chat")
  }

  // ── Send message ──────────────────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    if (!text.trim() || loading || !activeChatId) return

    const userMsg: Message = { role: "user", content: text.trim(), timestamp: Date.now() }

    let updatedChats = chats.map(c => {
      if (c.id !== activeChatId) return c
      const newMessages = [...c.messages, userMsg]
      return {
        ...c,
        messages: newMessages,
        title: c.messages.length === 0 ? generateTitle(newMessages) : c.title,
        updatedAt: Date.now(),
      }
    })
    setChats(updatedChats)
    saveChats(updatedChats)
    setInput("")
    setLoading(true)

    try {
      const currentChat = updatedChats.find(c => c.id === activeChatId)!
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentChat.messages.slice(-6).map(m => ({ role: m.role, content: m.content })),
        }),
      })
      const data = await res.json()
      const reply = data?.reply || "Something went wrong, please try again."

      const assistantMsg: Message = { role: "assistant", content: reply, timestamp: Date.now() }
      updatedChats = updatedChats.map(c =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, assistantMsg], updatedAt: Date.now() }
          : c
      )
      setChats(updatedChats)
      saveChats(updatedChats)
    } catch {
      const errMsg: Message = { role: "assistant", content: "Connection error. Please try again.", timestamp: Date.now() }
      updatedChats = updatedChats.map(c =>
        c.id === activeChatId ? { ...c, messages: [...c.messages, errMsg] } : c
      )
      setChats(updatedChats)
      saveChats(updatedChats)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  // ── Pin / Unpin ───────────────────────────────────────────────────────────
  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = chats.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c)
    setChats(updated)
    saveChats(updated)
  }

  // ── Delete chat ───────────────────────────────────────────────────────────
  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = chats.filter(c => c.id !== id)
    setChats(updated)
    saveChats(updated)
    if (activeChatId === id) { setActiveChatId(null); setView("history") }
  }

  // ── Rename ────────────────────────────────────────────────────────────────
  const startRename = (chat: Chat, e: React.MouseEvent) => {
    e.stopPropagation()
    setRenamingId(chat.id)
    setRenameValue(chat.title)
  }

  const confirmRename = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!renamingId || !renameValue.trim()) { setRenamingId(null); return }
    const updated = chats.map(c => c.id === renamingId ? { ...c, title: renameValue.trim() } : c)
    setChats(updated)
    saveChats(updated)
    setRenamingId(null)
  }

  // Sorted: pinned first, then by updatedAt
  const sortedChats = [...chats].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return b.updatedAt - a.updatedAt
  })

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })

  const formatDate = (ts: number) => {
    const d = new Date(ts)
    const today = new Date()
    if (d.toDateString() === today.toDateString()) return "Today"
    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)
    if (d.toDateString() === yesterday.toDateString()) return "Yesterday"
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        } bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 active:scale-95`}
        aria-label="Open Guru AI"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-20" />
        <Bot className="h-6 w-6 text-white" />
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />

          <div className="relative z-10 mx-auto flex h-[85vh] w-full max-w-md flex-col rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl sm:h-[80vh] overflow-hidden">

            {/* ── HISTORY VIEW ─────────────────────────────────────────── */}
            {view === "history" && (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shrink-0">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm">Guru AI</p>
                    <p className="text-xs text-muted-foreground">Your AI Study Mentor</p>
                  </div>
                  <button
                    onClick={startNewChat}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-violet-500/15 text-violet-500 font-semibold hover:bg-violet-500/25 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> New Chat
                  </button>
                  <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Chat List */}
                <div className="flex-1 overflow-y-auto">
                  {sortedChats.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/15">
                        <Sparkles className="h-8 w-8 text-violet-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Guru AI — Your Mentor 🙏</p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">
                          Ask study doubts, get guidance, stay motivated!
                        </p>
                      </div>
                      <button
                        onClick={startNewChat}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors"
                      >
                        <Plus className="h-4 w-4" /> Start New Chat
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 space-y-2">
                      {sortedChats.map(chat => (
                        <button
                          key={chat.id}
                          onClick={() => openChat(chat.id)}
                          className="w-full flex items-center gap-3 p-3 rounded-2xl border border-border/60 bg-card hover:bg-secondary/50 active:bg-secondary transition-colors text-left"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500/15">
                            <MessageSquare className="h-4 w-4 text-violet-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            {renamingId === chat.id ? (
                              <input
                                ref={renameRef}
                                value={renameValue}
                                onChange={e => setRenameValue(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter") confirmRename(); e.stopPropagation() }}
                                onClick={e => e.stopPropagation()}
                                className="w-full text-sm font-semibold bg-transparent border-b border-violet-500 outline-none text-foreground"
                              />
                            ) : (
                              <p className="text-sm font-semibold text-foreground truncate">{chat.title}</p>
                            )}
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {chat.messages.length} messages · {formatDate(chat.updatedAt)}
                            </p>
                          </div>
                          {/* Actions */}
                          <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                            {renamingId === chat.id ? (
                              <button onClick={confirmRename} className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 transition-colors">
                                <Check className="h-3.5 w-3.5" />
                              </button>
                            ) : (
                              <button onClick={e => startRename(chat, e)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors">
                                <Edit3 className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <button onClick={e => togglePin(chat.id, e)} className={`p-1.5 rounded-lg transition-colors ${chat.pinned ? "bg-amber-500/15 text-amber-400" : "hover:bg-secondary text-muted-foreground"}`}>
                              {chat.pinned ? <Pin className="h-3.5 w-3.5" /> : <PinOff className="h-3.5 w-3.5" />}
                            </button>
                            <button onClick={e => deleteChat(chat.id, e)} className="p-1.5 rounded-lg hover:bg-red-500/15 text-muted-foreground hover:text-red-400 transition-colors">
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ── CHAT VIEW ────────────────────────────────────────────── */}
            {view === "chat" && activeChat && (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur shrink-0">
                  <button onClick={() => setView("history")} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{activeChat.title}</p>
                    <p className="text-xs text-emerald-500">● Online — Always available</p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                  {activeChat.messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/15">
                        <Sparkles className="h-8 w-8 text-violet-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Guru AI — Your Mentor 🙏</p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[220px]">
                          Ask study doubts, get guidance, stay motivated!
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center mt-2">
                        {QUICK_ACTIONS.map(action => (
                          <button
                            key={action.label}
                            onClick={() => sendMessage(action.prompt)}
                            className="text-xs px-3 py-1.5 rounded-full border border-border bg-card hover:bg-secondary text-foreground transition-colors"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeChat.messages.map((msg, i) => (
                    <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/15 mt-1">
                          <Bot className="h-3.5 w-3.5 text-violet-400" />
                        </div>
                      )}
                      <div className="max-w-[78%]">
                        <div className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-violet-600 text-white rounded-br-sm"
                            : "bg-card border border-border text-foreground rounded-bl-sm"
                        }`}>
                          {msg.content}
                        </div>
                        <p className={`text-[10px] text-muted-foreground mt-0.5 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-2 justify-start">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/15 mt-1">
                        <Bot className="h-3.5 w-3.5 text-violet-400" />
                      </div>
                      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                        <div className="flex gap-1 items-center">
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
                {/* Input */}
                <div className="border-t border-border px-3 py-3 bg-card/80 backdrop-blur shrink-0">
                  <div className="flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Ask your doubt or question..."
                      disabled={loading}
                      className="flex-1 rounded-full border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-60"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={!input.trim() || loading}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white disabled:opacity-40 hover:bg-violet-500 active:scale-95 transition-all"
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}
    </>
  )
}
