"use client"

import React, { useState, useRef, useEffect } from "react"
import { Bot, X, Send, Loader2, Sparkles, BookOpen, Brain, MapPin } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
  timestamp: number
}

const STORAGE_KEY = "ncert_ai_chat_history"
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions"

// Quick action buttons jo user click kar sake
const QUICK_ACTIONS = [
  { label: "📖 Explain karo", prompt: "Mujhe ek important concept samjhao" },
  { label: "📝 Study Plan", prompt: "Mera aaj ka study plan banao" },
  { label: "🧠 Quiz lo", prompt: "Mera ek chhota quiz lo" },
  { label: "💡 Motivation", prompt: "Mujhe thoda motivate karo" },
]

function loadHistory(): Message[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    return JSON.parse(raw) as Message[]
  } catch {
    return []
  }
}

function saveHistory(messages: Message[]) {
  try {
    // Sirf last 30 messages rakhna — localStorage overflow se bachne ke liye
    const trimmed = messages.slice(-30)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed))
  } catch {}
}

export function AiDoubtSolver() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Load chat history on mount
  useEffect(() => {
    const history = loadHistory()
    setMessages(history)
    if (history.length > 0) setShowQuickActions(false)
  }, [])

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return

    const userMessage: Message = {
      role: "user",
      content: text.trim(),
      timestamp: Date.now(),
    }

    const updatedMessages = [...messages, userMessage]
    setMessages(updatedMessages)
    saveHistory(updatedMessages)
    setInput("")
    setLoading(true)
    setShowQuickActions(false)

    try {
      const res = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1024,
          messages: [
            {
              role: "system",
              content: `Tu "Guru" hai — NCERT Master app ka AI mentor.

PERSONALITY:
- Ek caring bade bhai / mentor ki tarah baat kar
- Saral, warm aur encouraging tone
- Hindi mein jawab de (Hinglish thodi si chalti hai)

RULES:
1. SIRF HINDI mein jawab de (Roman script nahi, Devanagari preferred lekin Hinglish ok)
2. Chhote, clear paragraphs use kar — wall of text mat likhna
3. Study aur life guidance par focus karo
4. Agar koi doubt hai — clearly samjhao with examples
5. Motivation aur positivity zaroor add karo
6. Response 200 words se zyada mat karo (chhota crisp answer best hai)
7. Emojis sparingly use karo — natural lagein`,
            },
            // Last 6 messages ka context bhejo (token limit ke liye)
            ...updatedMessages.slice(-6).map((m) => ({
              role: m.role,
              content: m.content,
            })),
          ],
          temperature: 0.7,
        }),
      })

      if (!res.ok) throw new Error("API error")
      const data = await res.json()
      const reply = data?.choices?.[0]?.message?.content || "Kuch gadbad ho gayi, dubara try karo."

      const assistantMessage: Message = {
        role: "assistant",
        content: reply,
        timestamp: Date.now(),
      }

      const finalMessages = [...updatedMessages, assistantMessage]
      setMessages(finalMessages)
      saveHistory(finalMessages)
    } catch {
      const errorMsg: Message = {
        role: "assistant",
        content: "Maafi chahta hu, abhi kuch technical dikkat aa gayi. Thodi der baad try karo. 🙏",
        timestamp: Date.now(),
      }
      const finalMessages = [...updatedMessages, errorMsg]
      setMessages(finalMessages)
      saveHistory(finalMessages)
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const clearHistory = () => {
    setMessages([])
    setShowQuickActions(true)
    localStorage.removeItem(STORAGE_KEY)
  }

  const formatTime = (ts: number) => {
    return new Date(ts).toLocaleTimeString("hi-IN", { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <>
      {/* ─── Floating Button ─── */}
      {/* Fixed bottom-right, BottomTabs ke upar (bottom-24) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
        } bg-gradient-to-br from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 active:scale-95`}
        aria-label="AI Doubt Solver kholo"
      >
        {/* Pulse ring animation */}
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-20" />
        <Bot className="h-6 w-6 text-white" />
      </button>

      {/* ─── Chat Modal ─── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Window */}
          <div className="relative z-10 mx-auto flex h-[85vh] w-full max-w-md flex-col rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl sm:h-[80vh] overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shrink-0">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground text-sm">Guru AI</p>
                <p className="text-xs text-emerald-500">● Online — Hamesha available</p>
              </div>
              <button
                onClick={clearHistory}
                className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 rounded-lg hover:bg-secondary transition-colors"
              >
                Clear
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

              {/* Welcome message (jab koi chat nahi) */}
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-violet-500/15">
                    <Sparkles className="h-8 w-8 text-violet-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Guru AI — Tumhara Mentor 🙏</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Study doubts, life guidance, motivation — sab kuch puch sakte ho!
                    </p>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-violet-500/15 mt-1">
                      <Bot className="h-3.5 w-3.5 text-violet-400" />
                    </div>
                  )}
                  <div className="max-w-[78%]">
                    <div
                      className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                        msg.role === "user"
                          ? "bg-violet-600 text-white rounded-br-sm"
                          : "bg-card border border-border text-foreground rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                    <p className={`text-[10px] text-muted-foreground mt-0.5 ${msg.role === "user" ? "text-right" : "text-left"}`}>
                      {formatTime(msg.timestamp)}
                    </p>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
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

            {/* Quick Actions */}
            {showQuickActions && messages.length === 0 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {QUICK_ACTIONS.map((action) => (
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

            {/* Input Area */}
            <div className="border-t border-border px-3 py-3 bg-card/80 backdrop-blur">
              <div className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Apna doubt ya sawaal puchho..."
                  disabled={loading}
                  className="flex-1 rounded-full border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-60"
                />
                <button
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || loading}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-violet-600 text-white disabled:opacity-40 hover:bg-violet-500 active:scale-95 transition-all"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  )
      }
  
