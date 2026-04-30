"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { useApp } from "@/lib/app-context"
import {
  Send, Loader2, Sparkles, Menu, X, Plus, Pin, PinOff,
  Pencil, Trash2, Check, BookOpen, MessageSquare, ChevronRight,
  Mic, MicOff, Paperclip, Copy, CheckCheck, Image as ImageIcon, FileText,
  MoreVertical,
} from "lucide-react"
import Image from "next/image"

// ── Types ──────────────────────────────────────────────────────────────────
interface AttachedFile {
  base64: string
  type: string
  name: string
  previewUrl?: string
}

interface Message {
  role: "user" | "assistant"
  content: string
  ts: number
  imageBase64?: string
  imageType?: string
  fileName?: string
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
    if (line.startsWith("📌")) return (
      <div key={i} className="flex gap-1.5 mt-1.5 rounded-lg bg-primary/5 px-2.5 py-1.5">
        <span className="shrink-0">📌</span>
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

// ── Copy Button ────────────────────────────────────────────────────────────
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {}
  }
  return (
    <button
      onClick={handleCopy}
      title="Copy"
      className="flex h-6 w-6 items-center justify-center rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
    >
      {copied ? <CheckCheck className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
    </button>
  )
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
  // Ghost-click guard: ignore backdrop clicks within 350ms of opening
  const openedAtRef = useRef<number>(0)

  useEffect(() => {
    if (renamingId && renameInputRef.current) renameInputRef.current.focus()
  }, [renamingId])

  useEffect(() => {
    if (open) openedAtRef.current = Date.now()
  }, [open])

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
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={() => {
            // Guard against ghost click on mobile (< 350ms after open)
            if (Date.now() - openedAtRef.current > 350) onClose()
          }}
        />
      )}
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
  const [attachedFile, setAttachedFile] = useState<AttachedFile | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [micError, setMicError] = useState("")

  // 3-dot menu state
  const [chatMenuOpen, setChatMenuOpen] = useState(false)
  const [isRenamingHeader, setIsRenamingHeader] = useState(false)
  const [headerRenameVal, setHeaderRenameVal] = useState("")
  const [menuDeleteConfirm, setMenuDeleteConfirm] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const recognitionRef = useRef<any>(null)
  const menuOpenedAtRef = useRef<number>(0)
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

  useEffect(() => {
    if (chats.length > 0) saveChats(chats)
  }, [chats])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats, activeChatId, loading])

  // Cleanup recognition on unmount
  useEffect(() => {
    return () => {
      recognitionRef.current?.stop()
    }
  }, [])

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
    setAttachedFile(null)
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

  // ── Mic ──
  const handleMic = useCallback(() => {
    setMicError("")
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setMicError(isHindi ? "Mic is browser mein support nahi hai" : "Mic not supported in this browser")
      return
    }

    if (isRecording) {
      recognitionRef.current?.stop()
      setIsRecording(false)
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = isHindi ? "hi-IN" : "en-IN"
      recognition.continuous = false
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setInput(prev => prev ? prev + " " + transcript : transcript)
        setIsRecording(false)
      }
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error)
        if (event.error !== "no-speech") {
          setMicError(isHindi ? "Mic error — dobara try karo" : "Mic error — please try again")
        }
        setIsRecording(false)
      }
      recognition.onend = () => setIsRecording(false)

      recognitionRef.current = recognition
      recognition.start()
      setIsRecording(true)
    } catch (err) {
      setMicError(isHindi ? "Mic start nahi ho saka" : "Could not start microphone")
    }
  }, [isRecording, isHindi])

  // ── File Select ──
  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Limit to images and PDFs
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/heic", "application/pdf"]
    if (!allowedTypes.some(t => file.type === t || file.type.startsWith("image/"))) {
      setError(isHindi ? "Sirf image files allowed hain (JPG/PNG/WEBP)" : "Only image files are allowed (JPG/PNG/WEBP)")
      return
    }

    // Max 5MB
    if (file.size > 5 * 1024 * 1024) {
      setError(isHindi ? "File 5MB se chhoti honi chahiye" : "File must be under 5MB")
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      const base64 = result.split(",")[1]
      setAttachedFile({
        base64,
        type: file.type,
        name: file.name,
        previewUrl: file.type.startsWith("image/") ? result : undefined,
      })
    }
    reader.readAsDataURL(file)
    e.target.value = ""
  }, [isHindi])

  // ── Submit ──
  const handleSubmit = useCallback(async () => {
    const q = input.trim()
    if ((!q && !attachedFile) || loading) return

    setLoading(true)
    setError("")
    setMicError("")

    const messageText = q || (attachedFile ? `[Image: ${attachedFile.name}]` : "")
    const userMsg: Message = {
      role: "user",
      content: messageText,
      ts: Date.now(),
      imageBase64: attachedFile?.base64,
      imageType: attachedFile?.type,
      fileName: attachedFile?.name,
    }

    setInput("")
    setAttachedFile(null)

    // Compute currentMessages directly (avoids race condition with setState callback)
    const currentMessages = [...(activeChat?.messages || []), userMsg]

    setChats(prev => prev.map(c => {
      if (c.id !== activeChatId) return c
      const title = c.messages.length === 0 ? firstUserTitle([userMsg]) : c.title
      return { ...c, messages: currentMessages, title }
    }))

    try {
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: currentMessages.map(m => ({ role: m.role, content: m.content })),
          language,
          classNum: String(selectedClass || "10"),
          fileData: userMsg.imageBase64 || null,
          fileType: userMsg.imageType || null,
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
      setError(isHindi ? "Internet connection check karo aur dobara try karo." : "Check your internet connection and try again.")
    } finally {
      setLoading(false)
      setTimeout(() => textareaRef.current?.focus(), 100)
    }
  }, [input, loading, activeChatId, language, selectedClass, attachedFile, isHindi])

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
        <button
          onClick={() => setSidebarOpen(true)}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground hover:bg-secondary transition-colors shrink-0"
          aria-label="Open chats"
        >
          <Menu className="h-5 w-5" />
        </button>

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

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleNewChat}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-muted transition-colors"
            title="New Chat"
          >
            <Plus className="h-4 w-4" />
          </button>

          {/* 3-dot menu */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation()
                menuOpenedAtRef.current = Date.now()
                setChatMenuOpen(o => !o)
                setMenuDeleteConfirm(false)
              }}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-secondary text-foreground hover:bg-muted transition-colors"
              title="Chat options"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {chatMenuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => {
                    if (Date.now() - menuOpenedAtRef.current > 350) {
                      setChatMenuOpen(false)
                      setMenuDeleteConfirm(false)
                    }
                  }}
                />
                <div className="absolute right-0 top-full mt-1 z-50 w-52 rounded-2xl border border-border bg-card shadow-2xl py-1.5 overflow-hidden">
                  {menuDeleteConfirm ? (
                    <div className="px-3 py-2.5">
                      <p className="text-xs font-medium text-foreground mb-2.5">Yeh chat delete karein?</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (activeChat) handleDelete(activeChat.id)
                            setChatMenuOpen(false)
                            setMenuDeleteConfirm(false)
                          }}
                          className="flex-1 rounded-xl bg-destructive text-destructive-foreground py-2 text-xs font-semibold active:scale-95 transition-all"
                        >
                          Haan, delete
                        </button>
                        <button
                          onClick={() => setMenuDeleteConfirm(false)}
                          className="flex-1 rounded-xl bg-secondary text-foreground py-2 text-xs font-semibold active:scale-95 transition-all"
                        >
                          Nahi
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => { handleNewChat(); setChatMenuOpen(false) }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <Plus className="h-4 w-4 text-primary shrink-0" />
                        <span>Naya Sawaal</span>
                      </button>
                      <button
                        onClick={() => {
                          setHeaderRenameVal(activeChat?.title || "")
                          setIsRenamingHeader(true)
                          setChatMenuOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        <Pencil className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span>Rename</span>
                      </button>
                      <button
                        onClick={() => {
                          if (activeChat) handlePin(activeChat.id)
                          setChatMenuOpen(false)
                        }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary transition-colors"
                      >
                        {activeChat?.pinned
                          ? <PinOff className="h-4 w-4 text-muted-foreground shrink-0" />
                          : <Pin className="h-4 w-4 text-muted-foreground shrink-0" />}
                        <span>{activeChat?.pinned ? "Unpin Chat" : "Pin Chat"}</span>
                      </button>
                      <div className="my-1 border-t border-border" />
                      <button
                        onClick={() => setMenuDeleteConfirm(true)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 className="h-4 w-4 shrink-0" />
                        <span>Delete Chat</span>
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>

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
                  onClick={() => setInput(q)}
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
            <div className={`max-w-[85%] flex flex-col gap-1 ${msg.role === "user" ? "items-end" : "items-start"}`}>
              {/* Image attachment in user message */}
              {msg.imageBase64 && msg.imageType?.startsWith("image/") && (
                <div className="rounded-xl overflow-hidden border border-border shadow-sm max-w-[220px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`data:${msg.imageType};base64,${msg.imageBase64}`}
                    alt={msg.fileName || "Attached image"}
                    className="w-full h-auto max-h-48 object-cover"
                  />
                </div>
              )}
              {/* PDF attachment indicator */}
              {msg.fileName && !msg.imageType?.startsWith("image/") && (
                <div className="flex items-center gap-1.5 rounded-xl border border-border bg-secondary px-3 py-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-xs text-foreground truncate max-w-[150px]">{msg.fileName}</span>
                </div>
              )}
              <div
                className={`rounded-2xl px-4 py-3 ${
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
              {/* Copy button for assistant messages */}
              {msg.role === "assistant" && (
                <div className="flex items-center gap-1 px-1">
                  <CopyButton text={msg.content} />
                  <span className="text-[10px] text-muted-foreground">
                    {new Date(msg.ts).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
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
        {/* File preview chip */}
        {attachedFile && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="flex items-center gap-2 rounded-xl border border-border bg-secondary px-3 py-1.5 max-w-[220px]">
              {attachedFile.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={attachedFile.previewUrl}
                  alt="preview"
                  className="h-8 w-8 rounded-lg object-cover shrink-0"
                />
              ) : (
                <FileText className="h-4 w-4 text-primary shrink-0" />
              )}
              <span className="text-xs text-foreground truncate flex-1">{attachedFile.name}</span>
              <button
                onClick={() => setAttachedFile(null)}
                className="flex h-4 w-4 items-center justify-center text-muted-foreground hover:text-destructive transition-colors shrink-0"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </div>
        )}

        {/* Mic error */}
        {micError && (
          <p className="text-[10px] text-destructive text-center mb-1">{micError}</p>
        )}

        {/* Main input row */}
        <div className="flex items-end gap-2 rounded-2xl border border-border bg-background px-2 py-2">
          {/* File attach button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            title={isHindi ? "Image attach karo" : "Attach image"}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors shrink-0 disabled:opacity-40"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => {
              setInput(e.target.value)
              e.target.style.height = "auto"
              e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px"
            }}
            onKeyDown={handleKeyDown}
            placeholder={
              isRecording
                ? (isHindi ? "🎤 Sun raha hoon..." : "🎤 Listening...")
                : attachedFile
                  ? (isHindi ? "Image ke baare mein kuch poocho..." : "Ask something about the image...")
                  : (isHindi ? "Apna sawaal likho..." : "Type your doubt...")
            }
            rows={1}
            className="flex-1 resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed min-h-[22px] max-h-[120px]"
          />

          {/* Mic button */}
          <button
            onClick={handleMic}
            disabled={loading}
            title={isRecording ? (isHindi ? "Rokna" : "Stop") : (isHindi ? "Voice se poocho" : "Ask by voice")}
            className={`flex h-8 w-8 items-center justify-center rounded-xl transition-colors shrink-0 disabled:opacity-40 ${
              isRecording
                ? "bg-destructive text-destructive-foreground animate-pulse"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
          >
            {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          {/* Send button */}
          <button
            onClick={handleSubmit}
            disabled={loading || (!input.trim() && !attachedFile)}
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

      {/* ── Rename Modal ── */}
      {isRenamingHeader && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setIsRenamingHeader(false)}
        >
          <div
            className="bg-card rounded-2xl border border-border shadow-2xl p-5 w-80 mx-4"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-sm font-bold text-foreground mb-1">Chat Rename Karo</p>
            <p className="text-xs text-muted-foreground mb-3">Is chat ka naya naam likhо</p>
            <input
              autoFocus
              value={headerRenameVal}
              onChange={e => setHeaderRenameVal(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && headerRenameVal.trim()) {
                  handleRename(activeChatId, headerRenameVal.trim())
                  setIsRenamingHeader(false)
                }
                if (e.key === "Escape") setIsRenamingHeader(false)
              }}
              className="w-full bg-secondary rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary mb-4"
              placeholder="Chat ka naam..."
            />
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (headerRenameVal.trim()) handleRename(activeChatId, headerRenameVal.trim())
                  setIsRenamingHeader(false)
                }}
                className="flex-1 rounded-xl bg-primary text-primary-foreground py-2.5 text-sm font-semibold active:scale-95 transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setIsRenamingHeader(false)}
                className="flex-1 rounded-xl bg-secondary text-foreground py-2.5 text-sm font-semibold active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

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
