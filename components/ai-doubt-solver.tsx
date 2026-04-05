"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import {
  X, Send, Loader2, Sparkles, Pin, PinOff, Edit3, Check,
  Trash2, Plus, ChevronLeft, MessageSquare, GraduationCap,
  Camera, Paperclip, XCircle, Lock, Zap,
} from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Message {
  role: "user" | "assistant"
  content: string
  image?: string
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

const CHATS_KEY = "ncert_ai_chats_v2"

function loadChats(): Chat[] {
  try { return JSON.parse(localStorage.getItem(CHATS_KEY) || "[]") } catch { return [] }
}
function saveChats(chats: Chat[]) {
  try { localStorage.setItem(CHATS_KEY, JSON.stringify(chats)) } catch {}
}
function genId() { return Math.random().toString(36).slice(2, 10) }
function makeTitle(messages: Message[]) {
  const first = messages.find(m => m.role === "user")
  if (!first) return "नई Chat"
  return first.content.slice(0, 40) + (first.content.length > 40 ? "..." : "")
}

const SUGGESTIONS = [
  "प्रकाश संश्लेषण समझाओ",
  "Newton के नियम",
  "Important questions दो",
  "Numerical solve करो",
]

// Plan display names
const PLAN_NAMES: Record<string, string> = {
  free: "Free",
  starter: "Starter",
  pro: "Pro",
  elite: "Elite",
}

export function AiDoubtSolver() {
  const [isOpen, setIsOpen]             = useState(false)
  const [view, setView]                 = useState<"history" | "chat">("history")
  const [chats, setChats]               = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [input, setInput]               = useState("")
  const [loading, setLoading]           = useState(false)
  const [renamingId, setRenamingId]     = useState<string | null>(null)
  const [renameValue, setRenameValue]   = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Auth + plan state
  const [authToken, setAuthToken]   = useState<string | null>(null)
  const [userPlan, setUserPlan]     = useState<string>("free")
  const [remaining, setRemaining]   = useState<number | null>(null)
  const [showUpgrade, setShowUpgrade] = useState(false)
  const [upgradeMsg, setUpgradeMsg]   = useState("")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLInputElement>(null)
  const renameRef      = useRef<HTMLInputElement>(null)
  const fileInputRef   = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  // Load chats and auth token on mount
  useEffect(() => {
    setChats(loadChats())
    // Get current session token
    supabase.auth.getSession().then(({ data }) => {
      const token = data.session?.access_token || null
      setAuthToken(token)
    })
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthToken(session?.access_token || null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [chats, activeChatId, loading])
  useEffect(() => { if (view === "chat") setTimeout(() => inputRef.current?.focus(), 300) }, [view])
  useEffect(() => { if (renamingId) setTimeout(() => renameRef.current?.focus(), 100) }, [renamingId])

  const activeChat = chats.find(c => c.id === activeChatId)
  const isPaidUser = userPlan !== "free"

  const startNewChat = useCallback(() => {
    const chat: Chat = {
      id: genId(), title: "नई Chat", messages: [],
      pinned: false, createdAt: Date.now(), updatedAt: Date.now(),
    }
    const updated = [chat, ...chats]
    setChats(updated); saveChats(updated)
    setActiveChatId(chat.id); setView("chat")
  }, [chats])

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 4 * 1024 * 1024) {
      alert("Image 4MB से छोटी होनी चाहिए।")
      return
    }
    const reader = new FileReader()
    reader.onload = () => setSelectedImage(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  // Show upgrade modal instead of allowing image for free users
  const handleImageClick = (source: "camera" | "gallery") => {
    if (!isPaidUser) {
      setUpgradeMsg("📸 Image से doubt solve करना paid feature है!\n\nStarter Plan (₹49/month) लो और पाओ:\n• 10 images/month\n• 200 text messages/month")
      setShowUpgrade(true)
      return
    }
    if (source === "camera") cameraInputRef.current?.click()
    else fileInputRef.current?.click()
  }

  const sendMessage = async (text: string) => {
    const hasText  = text.trim().length > 0
    const hasImage = !!selectedImage
    if ((!hasText && !hasImage) || loading || !activeChatId) return

    const userMsg: Message = {
      role: "user",
      content: hasText ? text.trim() : "इस image के बारे में explain करो",
      image: selectedImage || undefined,
      timestamp: Date.now(),
    }

    let updated = chats.map(c => {
      if (c.id !== activeChatId) return c
      const msgs = [...c.messages, userMsg]
      return {
        ...c,
        messages: msgs,
        title: c.messages.length === 0 ? makeTitle(msgs) : c.title,
        updatedAt: Date.now(),
      }
    })
    setChats(updated); saveChats(updated)
    setInput(""); setSelectedImage(null); setLoading(true)

    try {
      const current = updated.find(c => c.id === activeChatId)!
      const recentMsgs = current.messages.slice(-10)
      const hasVision  = recentMsgs.some(m => m.image)

      const apiMessages = recentMsgs.map(m => {
        if (m.image) {
          const parsed = m.image.match(/^data:(.+);base64,(.+)$/)
          const mimeType = parsed ? parsed[1] : "image/jpeg"
          const base64   = parsed ? parsed[2] : m.image
          return {
            role: m.role,
            content: [
              { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } },
              { type: "text",      text: m.content || "इस image में क्या है? मेरा doubt solve करो।" },
            ],
          }
        }
        return { role: m.role, content: m.content }
      })

      // Build headers — include auth token if available
      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`

      const res  = await fetch("/api/doubt", {
        method: "POST",
        headers,
        body: JSON.stringify({ messages: apiMessages, useVision: hasVision }),
      })
      const data = await res.json()

      // Handle limit hit
      if (data.limitHit) {
        setUpgradeMsg(data.message || "Limit खत्म हो गई। Plan upgrade करो!")
        setShowUpgrade(true)
        // Remove the user message we just added since it wasn't processed
        updated = updated.map(c =>
          c.id !== activeChatId ? c : { ...c, messages: c.messages.slice(0, -1) }
        )
        setChats(updated); saveChats(updated)
        setLoading(false)
        return
      }

      // Update plan info from response
      if (data.plan) setUserPlan(data.plan)
      if (data.remaining !== null && data.remaining !== undefined) setRemaining(data.remaining)

      const reply = data?.reply || "कुछ गड़बड़ हो गई। दोबारा try करो!"
      const assistantMsg: Message = { role: "assistant", content: reply, timestamp: Date.now() }
      updated = updated.map(c =>
        c.id === activeChatId
          ? { ...c, messages: [...c.messages, assistantMsg], updatedAt: Date.now() }
          : c
      )
      setChats(updated); saveChats(updated)
    } catch {
      const errMsg: Message = {
        role: "assistant",
        content: "Connection error। Internet check करो और दोबारा try करो।",
        timestamp: Date.now(),
      }
      updated = updated.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, errMsg] } : c)
      setChats(updated); saveChats(updated)
    } finally {
      setLoading(false)
    }
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

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })

  const formatDate = (ts: number) => {
    const d = new Date(ts), today = new Date()
    if (d.toDateString() === today.toDateString()) return "आज"
    const y = new Date(today); y.setDate(today.getDate() - 1)
    if (d.toDateString() === y.toDateString()) return "कल"
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" })
  }

  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("━━━")) return <hr key={i} className="border-border/40 my-2" />
      if (line.startsWith("## ")) return (
        <p key={i} className="font-bold text-foreground mt-3 mb-1 text-[13px]">{line.slice(3)}</p>
      )
      if (line.startsWith("**") && line.endsWith("**") && line.length > 4) return (
        <p key={i} className="font-semibold text-foreground text-[13px]">{line.slice(2, -2)}</p>
      )
      if (line.includes("⭐")) return (
        <p key={i} className="text-amber-600 dark:text-amber-400 font-medium text-[12px] bg-amber-500/10 rounded-lg px-2 py-1 my-1">{line}</p>
      )
      if (line.match(/^\d+\. /)) return (
        <p key={i} className="ml-3 text-[13px] leading-relaxed">{line}</p>
      )
      if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("(i)") || line.startsWith("(ii)") || line.startsWith("(iii)")) return (
        <p key={i} className="ml-3 text-[13px] leading-relaxed">{line}</p>
      )
      if (!line.trim()) return <div key={i} className="h-1" />
      if (line.includes("**")) {
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return (
          <p key={i} className="text-[13px] leading-relaxed">
            {parts.map((p, j) =>
              p.startsWith("**") && p.endsWith("**")
                ? <strong key={j} className="font-semibold">{p.slice(2, -2)}</strong>
                : p
            )}
          </p>
        )
      }
      return <p key={i} className="text-[13px] leading-relaxed">{line}</p>
    })
  }

  return (
    <>
      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"
        } bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 active:scale-95`}
        aria-label="Guru AI खोलो"
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-2xl bg-indigo-400 opacity-20" />
        <GraduationCap className="h-7 w-7 text-white" />
      </button>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowUpgrade(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-3xl bg-background border border-border p-6 shadow-2xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 mx-auto mb-4">
              <Zap className="h-7 w-7 text-indigo-400" />
            </div>
            <h3 className="text-center font-bold text-foreground text-lg mb-2">Plan Upgrade करो</h3>
            <p className="text-center text-sm text-muted-foreground leading-relaxed whitespace-pre-line mb-5">
              {upgradeMsg}
            </p>
            {/* Plan options */}
            <div className="space-y-2 mb-4">
              {[
                { name: "Starter", price: "₹49/month", text: "200 messages", img: "10 images" },
                { name: "Pro",     price: "₹99/month", text: "500 messages", img: "50 images" },
                { name: "Elite",   price: "₹149/month", text: "1000 messages", img: "100 images" },
              ].map(p => (
                <div key={p.name} className="flex items-center justify-between rounded-2xl border border-indigo-500/30 bg-indigo-500/5 px-4 py-3">
                  <div>
                    <p className="font-bold text-foreground text-sm">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{p.text} + {p.img}</p>
                  </div>
                  <span className="font-bold text-indigo-500 text-sm">{p.price}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-muted-foreground mb-4">
              💳 Razorpay से secure payment — जल्द आ रहा है!
            </p>
            <button
              onClick={() => setShowUpgrade(false)}
              className="w-full py-2.5 rounded-2xl border border-border text-muted-foreground text-sm font-medium hover:bg-secondary transition-colors"
            >
              बाद में
            </button>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 mx-auto flex h-[88vh] w-full max-w-md flex-col rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl sm:h-[82vh] overflow-hidden">

            {/* ── HISTORY ──────────────────────────────────────────── */}
            {view === "history" && (
              <>
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground text-sm">Guru AI 🎓</p>
                    {/* Plan badge */}
                    <p className="text-xs text-emerald-500 flex items-center gap-1">
                      ● {PLAN_NAMES[userPlan] || "Free"} Plan
                    </p>
                  </div>
                  <button
                    onClick={startNewChat}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-indigo-500/15 text-indigo-500 font-semibold hover:bg-indigo-500/25 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> नई Chat
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                  >
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
                          तुम्हारा personal NCERT शिक्षक — कुछ भी पूछो, कभी भी!
                        </p>
                      </div>
                      <button
                        onClick={startNewChat}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg"
                      >
                        <Plus className="h-4 w-4" /> Chat शुरू करो
                      </button>
                    </div>
                  ) : (
                    <div className="p-3 space-y-2">
                      {sorted.map(chat => (
                        <button
                          key={chat.id}
                          onClick={() => { setActiveChatId(chat.id); setView("chat") }}
                          className="w-full flex items-center gap-3 p-3 rounded-2xl border border-border/60 bg-card hover:bg-secondary/50 active:bg-secondary transition-colors text-left"
                        >
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/15">
                            {chat.pinned
                              ? <Pin className="h-4 w-4 text-amber-400" />
                              : <MessageSquare className="h-4 w-4 text-indigo-400" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            {renamingId === chat.id ? (
                              <input
                                ref={renameRef}
                                value={renameValue}
                                onChange={e => setRenameValue(e.target.value)}
                                onKeyDown={e => { if (e.key === "Enter") confirmRename(); e.stopPropagation() }}
                                onClick={e => e.stopPropagation()}
                                className="w-full text-sm font-semibold bg-transparent border-b border-indigo-500 outline-none text-foreground"
                              />
                            ) : (
                              <p className="text-sm font-semibold text-foreground truncate">{chat.title}</p>
                            )}
                            <p className="text-[11px] text-muted-foreground mt-0.5">
                              {chat.messages.length} messages · {formatDate(chat.updatedAt)}
                            </p>
                          </div>
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
                            <button
                              onClick={e => togglePin(chat.id, e)}
                              className={`p-1.5 rounded-lg transition-colors ${chat.pinned ? "bg-amber-500/15 text-amber-400" : "hover:bg-secondary text-muted-foreground"}`}
                            >
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

            {/* ── CHAT ─────────────────────────────────────────────── */}
            {view === "chat" && activeChat && (
              <>
                {/* Chat Header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur shrink-0">
                  <button
                    onClick={() => setView("history")}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0">
                    <GraduationCap className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-foreground text-sm truncate">{activeChat.title}</p>
                    <p className="text-xs text-emerald-500">● Guru AI</p>
                  </div>
                  {/* Remaining messages badge */}
                  {remaining !== null && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500 font-semibold">
                      {remaining} बचे
                    </span>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {activeChat.messages.length === 0 && (
                    <div className="flex flex-col items-center gap-4 text-center pt-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
                        <Sparkles className="h-8 w-8 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">नमस्ते! मैं Guru हूँ 🎓</p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[240px] leading-relaxed">
                          कोई भी NCERT doubt पूछो — text में
                          {isPaidUser ? " या photo खींचकर!" : "!"}
                        </p>
                        {/* Free plan notice */}
                        {!isPaidUser && (
                          <button
                            onClick={() => {
                              setUpgradeMsg("⚡ Free Plan में 5 messages/day मिलते हैं।\n\nज़्यादा messages और image support के लिए plan upgrade करो!")
                              setShowUpgrade(true)
                            }}
                            className="mt-2 text-[11px] px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 font-medium"
                          >
                            Free: 5 messages/day · Upgrade करो ⚡
                          </button>
                        )}
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center max-w-[280px]">
                        {SUGGESTIONS.map(s => (
                          <button
                            key={s}
                            onClick={() => sendMessage(s)}
                            className="text-xs px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition-colors font-medium"
                          >
                            {s}
                          </button>
                        ))}
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
                            : "bg-card border border-border text-foreground rounded-bl-sm space-y-0.5"
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

                {/* Input Area */}
                <div className="border-t border-border px-3 py-3 bg-card/80 backdrop-blur shrink-0">
                  {selectedImage && (
                    <div className="mb-2 relative inline-block">
                      <img src={selectedImage} alt="Selected" className="h-20 w-20 rounded-xl object-cover border border-border" />
                      <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute -top-1.5 -right-1.5 bg-background rounded-full text-muted-foreground hover:text-foreground"
                      >
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  )}

                  <div className="flex items-center gap-2">
                    {/* Camera button — lock icon for free users */}
                    <button
                      onClick={() => handleImageClick("camera")}
                      title={isPaidUser ? "Photo लो" : "Paid feature — Upgrade करो"}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${
                        isPaidUser
                          ? "border-border bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {isPaidUser ? <Camera className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </button>
                    {/* Gallery button — lock icon for free users */}
                    <button
                      onClick={() => handleImageClick("gallery")}
                      title={isPaidUser ? "Image attach करो" : "Paid feature — Upgrade करो"}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${
                        isPaidUser
                          ? "border-border bg-secondary text-muted-foreground hover:text-foreground hover:bg-secondary/80"
                          : "border-amber-500/30 bg-amber-500/10 text-amber-500"
                      }`}
                    >
                      {isPaidUser ? <Paperclip className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    </button>
                    {/* Text input */}
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={selectedImage ? "Image के बारे में question लिखो..." : "अपना doubt पूछो..."}
                      disabled={loading}
                      className="flex-1 rounded-2xl border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-60"
                    />
                    {/* Send button */}
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
