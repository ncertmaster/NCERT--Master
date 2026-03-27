"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import { X, Send, Loader2, Sparkles, Pin, PinOff, Edit3, Check, Trash2, Plus, ChevronLeft, MessageSquare, GraduationCap, Paperclip, Camera, XCircle } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  image?: string   // base64 data URL
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

const CHATS_KEY = "ncert_ai_chats"

function loadChats(): Chat[] {
  try { return JSON.parse(localStorage.getItem(CHATS_KEY) || "[]") } catch { return [] }
}
function saveChats(chats: Chat[]) {
  try { localStorage.setItem(CHATS_KEY, JSON.stringify(chats)) } catch {}
}
function genId() { return Math.random().toString(36).slice(2, 10) }
function makeTitle(messages: Message[]) {
  const first = messages.find(m => m.role === "user")
  if (!first) return "New Chat"
  return first.content.slice(0, 40) + (first.content.length > 40 ? "..." : "")
}

const QUICK_ACTIONS = [
  { label: "📐 Explain a concept", prompt: "Explain an important NCERT concept to me in detail" },
  { label: "📝 Make study plan", prompt: "Help me make an effective study plan for today" },
  { label: "🧠 Quiz me", prompt: "Take a short quiz from me on any NCERT topic" },
  { label: "🔍 Solve a problem", prompt: "Help me solve a difficult problem step by step" },
  { label: "💪 Motivate me", prompt: "I'm feeling demotivated. Please motivate me to study" },
  { label: "📊 Important topics", prompt: "What are the most important topics for board exams?" },
]

export function AiDoubtSolver() {
  const [isOpen, setIsOpen] = useState(false)
  const [view, setView] = useState<"history" | "chat">("history")
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageError, setImageError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const renameRef = useRef<HTMLInputElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { setChats(loadChats()) }, [])
  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [chats, activeChatId, loading])
  useEffect(() => { if (view === "chat") setTimeout(() => inputRef.current?.focus(), 300) }, [view])
  useEffect(() => { if (renamingId) setTimeout(() => renameRef.current?.focus(), 100) }, [renamingId])

  const activeChat = chats.find(c => c.id === activeChatId)

  const startNewChat = useCallback(() => {
    const chat: Chat = { id: genId(), title: "New Chat", messages: [], pinned: false, createdAt: Date.now(), updatedAt: Date.now() }
    const updated = [chat, ...chats]
    setChats(updated); saveChats(updated)
    setActiveChatId(chat.id); setView("chat")
  }, [chats])

  const sendMessage = async (text: string) => {
    if ((!text.trim() && !selectedImage) || loading || !activeChatId) return
    const userMsg: Message = {
      role: "user",
      content: text.trim() || "Is image ke baare mein explain karo",
      image: selectedImage || undefined,
      timestamp: Date.now()
    }
    let updated = chats.map(c => {
      if (c.id !== activeChatId) return c
      const msgs = [...c.messages, userMsg]
      return { ...c, messages: msgs, title: c.messages.length === 0 ? makeTitle(msgs) : c.title, updatedAt: Date.now() }
    })
    setChats(updated); saveChats(updated); setInput(""); setSelectedImage(null); setLoading(true)

    try {
      const current = updated.find(c => c.id === activeChatId)!
      // Build messages — for image messages use vision-compatible format
      const apiMessages = current.messages.slice(-8).map(m => {
        if (m.image) {
          // Extract base64 data and mime type from data URL
          const matches = m.image.match(/^data:(image\/.+);base64,(.+)$/)
          const mimeType = matches ? matches[1] : "image/jpeg"
          const base64Data = matches ? matches[2] : m.image
          
          return {
            role: m.role,
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:${mimeType};base64,${base64Data}`
                }
              },
              {
                type: "text",
                text: m.content || "Is image mein kya hai? Mera doubt solve karo."
              }
            ]
          }
        }
        return { role: m.role, content: m.content }
      })

      // Check if any message has an image — use vision model
      const hasImage = current.messages.slice(-8).some(m => m.image)

      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages, useVision: hasImage }),
      })
      const data = await res.json()
      const reply = data?.reply || "Kuch gadbad ho gayi. Dobara try karo bhai!"
      const assistantMsg: Message = { role: "assistant", content: reply, timestamp: Date.now() }
      updated = updated.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, assistantMsg], updatedAt: Date.now() } : c)
      setChats(updated); saveChats(updated)
    } catch {
      const errMsg: Message = { role: "assistant", content: "Connection error. Check your internet and try again.", timestamp: Date.now() }
      updated = updated.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, errMsg] } : c)
      setChats(updated); saveChats(updated)
    } finally { setLoading(false) }
  }

  const compressImage = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        const img = new Image()
        img.onload = () => {
          const maxSide = 1400
          const scale = Math.min(1, maxSide / Math.max(img.width, img.height))
          const canvas = document.createElement("canvas")
          canvas.width = Math.max(1, Math.round(img.width * scale))
          canvas.height = Math.max(1, Math.round(img.height * scale))
          const ctx = canvas.getContext("2d")
          if (!ctx) return reject(new Error("Canvas unavailable"))
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
          resolve(canvas.toDataURL("image/jpeg", 0.78))
        }
        img.onerror = () => reject(new Error("Image load failed"))
        img.src = reader.result as string
      }
      reader.onerror = () => reject(new Error("File read failed"))
      reader.readAsDataURL(file)
    })

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImageError(null)
    if (!file.type.startsWith("image/")) {
      setImageError("Only images are supported right now (PDF not supported).")
      e.target.value = ""
      return
    }
    try {
      const compressed = await compressImage(file)
      setSelectedImage(compressed)
    } catch {
      setImageError("Image read failed. Please try another image.")
    }
    e.target.value = ""
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input) }
  }

  const togglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = chats.map(c => c.id === id ? { ...c, pinned: !c.pinned } : c)
    setChats(updated); saveChats(updated)
  }

  const deleteChat = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const updated = chats.filter(c => c.id !== id)
    setChats(updated); saveChats(updated)
    if (activeChatId === id) { setActiveChatId(null); setView("history") }
  }

  const startRename = (chat: Chat, e: React.MouseEvent) => {
    e.stopPropagation(); setRenamingId(chat.id); setRenameValue(chat.title)
  }

  const confirmRename = (e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (!renamingId || !renameValue.trim()) { setRenamingId(null); return }
    const updated = chats.map(c => c.id === renamingId ? { ...c, title: renameValue.trim() } : c)
    setChats(updated); saveChats(updated); setRenamingId(null)
  }

  const sorted = [...chats].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1
    if (!a.pinned && b.pinned) return 1
    return b.updatedAt - a.updatedAt
  })

  const formatTime = (ts: number) => new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })
  const formatDate = (ts: number) => {
    const d = new Date(ts), today = new Date()
    if (d.toDateString() === today.toDateString()) return "Today"
    const y = new Date(today); y.setDate(today.getDate() - 1)
    if (d.toDateString() === y.toDateString()) return "Yesterday"
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
  }

  // Format AI response with basic markdown
  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("## ")) return <p key={i} className="font-bold text-foreground mt-2 mb-1">{line.slice(3)}</p>
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-foreground">{line.slice(2, -2)}</p>
      if (line.match(/^\d+\. /)) return <p key={i} className="ml-2">{line}</p>
      if (line.startsWith("• ") || line.startsWith("- ")) return <p key={i} className="ml-2">{line}</p>
      if (!line.trim()) return <br key={i} />
      // Inline bold
      if (line.includes("**")) {
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return <p key={i}>{parts.map((p, j) => p.startsWith("**") && p.endsWith("**") ? <strong key={j}>{p.slice(2,-2)}</strong> : p)}</p>
      }
      return <p key={i}>{line}</p>
    })
  }

  return (
    <>
      {/* Floating Button — Graduation cap icon, study themed */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        } bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 active:scale-95`}
        aria-label="Open Guru AI"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-2xl bg-indigo-400 opacity-20" />
        <GraduationCap className="h-7 w-7 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 mx-auto flex h-[88vh] w-full max-w-md flex-col rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl sm:h-[82vh] overflow-hidden">

            {/* ── HISTORY ──────────────────────────────────────────────── */}
            {view === "history" && (
              <>
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-sm">Guru AI</p>
                    <p className="text-xs text-emerald-500">● Always available</p>
                  </div>
                  <button onClick={startNewChat} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-indigo-500/15 text-indigo-500 font-semibold hover:bg-indigo-500/25 transition-colors">
                    <Plus className="h-3.5 w-3.5" /> New Chat
                  </button>
                  <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                  {sorted.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 px-6 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
                        <GraduationCap className="h-10 w-10 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground text-lg">Guru AI 🎓</p>
                        <p className="text-sm text-muted-foreground mt-1 max-w-[240px] leading-relaxed">
                          Your personal NCERT mentor — ask anything, anytime!
                        </p>
                      </div>
                      <button onClick={startNewChat} className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg">
                        <Plus className="h-4 w-4" /> Start Chatting
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 space-y-2">
                      {sorted.map(chat => (
                        <button key={chat.id} onClick={() => { setActiveChatId(chat.id); setView("chat") }}
                          className="w-full flex items-center gap-3 p-3 rounded-2xl border border-border/60 bg-card hover:bg-secondary/50 active:bg-secondary transition-colors text-left">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15">
                            {chat.pinned ? <Pin className="h-4 w-4 text-amber-400" /> : <MessageSquare className="h-4 w-4 text-indigo-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            {renamingId === chat.id ? (
                              <input ref={renameRef} value={renameValue} onChange={e => setRenameValue(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter") confirmRename(); e.stopPropagation() }}
                                onClick={e => e.stopPropagation()}
                                className="w-full text-sm font-semibold bg-transparent border-b border-indigo-500 outline-none text-foreground" />
                            ) : (
                              <p className="text-sm font-semibold text-foreground truncate">{chat.title}</p>
                            )}
                            <p className="text-[11px] text-muted-foreground mt-0.5">{chat.messages.length} messages · {formatDate(chat.updatedAt)}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                            {renamingId === chat.id ? (
                              <button onClick={confirmRename} className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25 transition-colors"><Check className="h-3.5 w-3.5" /></button>
                            ) : (
                              <button onClick={e => startRename(chat, e)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground transition-colors"><Edit3 className="h-3.5 w-3.5" /></button>
                            )}
                            <button onClick={e => togglePin(chat.id, e)} className={`p-1.5 rounded-lg transition-colors ${chat.pinned ? "bg-amber-500/15 text-amber-400" : "hover:bg-secondary text-muted-foreground"}`}>
                              {chat.pinned ? <Pin className="h-3.5 w-3.5" /> : <PinOff className="h-3.5 w-3.5" />}
                            </button>
                            <button onClick={e => deleteChat(chat.id, e)} className="p-1.5 rounded-lg hover:bg-red-500/15 text-muted-foreground hover:text-red-400 transition-colors"><Trash2 className="h-3.5 w-3.5" /></button>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}

            {/* ── CHAT ─────────────────────────────────────────────────── */}
            {view === "chat" && activeChat && (
              <>
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur shrink-0">
                  <button onClick={() => setView("history")} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{activeChat.title}</p>
                    <p className="text-xs text-emerald-500">● Guru AI</p>
                  </div>
                  <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {activeChat.messages.length === 0 && (
                    <div className="flex flex-col items-center gap-4 text-center pt-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
                        <Sparkles className="h-8 w-8 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Guru AI — Your Mentor 🎓</p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[260px] leading-relaxed">
                          Ask anything — type your doubt or share an image 📷
                        </p>
                      </div>
                    </div>
                  )}

                  {activeChat.messages.map((msg, i) => (
                    <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                      {msg.role === "assistant" && (
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 mt-1">
                          <GraduationCap className="h-4 w-4 text-indigo-400" />
                        </div>
                      )}
                      <div className="max-w-[80%]">
                        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                          msg.role === "user"
                            ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-sm"
                            : "bg-card border border-border text-foreground rounded-bl-sm space-y-1"
                        }`}>
                          {msg.image && (
                            <img src={msg.image} alt="Attached" className="rounded-xl mb-2 max-h-48 w-auto object-contain" />
                          )}
                          {msg.role === "assistant" ? formatContent(msg.content) : msg.content}
                        </div>
                        <p className={`text-[10px] text-muted-foreground mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                          {formatTime(msg.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}

                  {loading && (
                    <div className="flex gap-2 justify-start">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 mt-1">
                        <GraduationCap className="h-4 w-4 text-indigo-400" />
                      </div>
                      <div className="bg-card border border-border rounded-2xl rounded-bl-sm px-4 py-3">
                        <div className="flex gap-1 items-center">
                          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                          <span className="h-2 w-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <div className="border-t border-border px-3 py-3 bg-card/80 backdrop-blur shrink-0">
                  {/* Image Preview */}
                  {selectedImage && (
                    <div className="mb-2 relative inline-block">
                      <img src={selectedImage} alt="Selected" className="h-20 w-20 rounded-xl object-cover border border-border" />
                      <button onClick={() => setSelectedImage(null)} className="absolute -top-1.5 -right-1.5 bg-background rounded-full text-muted-foreground hover:text-foreground">
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  {imageError && (
                    <p className="mb-2 text-xs text-red-400">{imageError}</p>
                  )}
                  {/* Hidden file inputs */}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
                  <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />
                  <div className="flex items-center gap-2">
                    <button onClick={() => cameraInputRef.current?.click()} title="Take Photo"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all">
                      <Camera className="h-4 w-4" />
                    </button>
                    <button onClick={() => fileInputRef.current?.click()} title="Attach File"
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-all">
                      <Paperclip className="h-4 w-4" />
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={selectedImage ? "Add a question about image..." : "Ask your doubt..."}
                      disabled={loading}
                      className="flex-1 rounded-2xl border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-60"
                    />
                    <button
                      onClick={() => sendMessage(input)}
                      disabled={(!input.trim() && !selectedImage) || loading}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white disabled:opacity-40 hover:opacity-90 active:scale-95 transition-all"
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
