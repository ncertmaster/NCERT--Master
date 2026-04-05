"use client"

import React, { useState, useRef, useEffect, useCallback } from "react"
import {
  X, Send, Loader2, Sparkles, Pin, PinOff, Edit3, Check,
  Trash2, Plus, ChevronLeft, MessageSquare, GraduationCap,
  Camera, Paperclip, XCircle, Lock, Zap, Crown, CheckCircle2,
  Image as ImageIcon, MessageCircle,
} from "lucide-react"
import { supabase } from "@/lib/supabase"

// ── Types ──────────────────────────────────────────────────────────────────
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

interface PlanInfo {
  plan: string
  remaining: number
  textLimit: number
  imageLimit: number
  imageUsed: number
}

// ── Plans config ───────────────────────────────────────────────────────────
const PLANS = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For regular learners",
    priceLabel: "₹49",
    period: "/ month",
    color: "from-blue-500 to-cyan-500",
    badge: null,
    features: [
      "200 AI messages / month",
      "10 image questions / month",
      "All subjects Class 6–12",
      "Priority response speed",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For serious students",
    priceLabel: "₹99",
    period: "/ month",
    color: "from-indigo-500 to-violet-600",
    badge: "Most Popular",
    features: [
      "500 AI messages / month",
      "50 image questions / month",
      "All subjects Class 6–12",
      "Faster responses",
      "Chat history sync",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    tagline: "For exam warriors",
    priceLabel: "₹149",
    period: "/ month",
    color: "from-amber-500 to-orange-500",
    badge: "Best Value",
    features: [
      "1000 AI messages / month",
      "100 image questions / month",
      "All subjects Class 6–12",
      "Fastest responses",
      "Chat history sync",
      "Early access to new features",
    ],
  },
]

const PLAN_LIMITS: Record<string, { text: number; image: number }> = {
  free:    { text: 5,    image: 0   },
  starter: { text: 200,  image: 10  },
  pro:     { text: 500,  image: 50  },
  elite:   { text: 1000, image: 100 },
}

const SUGGESTIONS = [
  "Explain photosynthesis",
  "Newton's laws of motion",
  "Give important questions",
  "Solve this numerical",
]

// ── Storage helpers ────────────────────────────────────────────────────────
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
  if (!first) return "New Chat"
  return first.content.slice(0, 40) + (first.content.length > 40 ? "..." : "")
}

// Reset time helper — midnight for free, month-end for paid
function getResetLabel(plan: string) {
  if (plan === "free") {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    const h = Math.ceil((tomorrow.getTime() - Date.now()) / 3600000)
    return `Resets in ${h}h`
  }
  const now = new Date()
  const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)
  const days = Math.ceil((end.getTime() - now.getTime()) / 86400000)
  return `Resets in ${days}d`
}

// ── Razorpay loader ────────────────────────────────────────────────────────
function loadRazorpay(): Promise<boolean> {
  return new Promise(resolve => {
    if ((window as any).Razorpay) { resolve(true); return }
    const s = document.createElement("script")
    s.src = "https://checkout.razorpay.com/v1/checkout.js"
    s.onload = () => resolve(true)
    s.onerror = () => resolve(false)
    document.body.appendChild(s)
  })
}

// ── Component ──────────────────────────────────────────────────────────────
export function AiDoubtSolver() {
  const [isOpen, setIsOpen]               = useState(false)
  const [view, setView]                   = useState<"history" | "chat" | "upgrade">("history")
  const [chats, setChats]                 = useState<Chat[]>([])
  const [activeChatId, setActiveChatId]   = useState<string | null>(null)
  const [input, setInput]                 = useState("")
  const [loading, setLoading]             = useState(false)
  const [renamingId, setRenamingId]       = useState<string | null>(null)
  const [renameValue, setRenameValue]     = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  // Auth + plan
  const [authToken, setAuthToken] = useState<string | null>(null)
  const [planInfo, setPlanInfo]   = useState<PlanInfo>({ plan: "free", remaining: 5, textLimit: 5, imageLimit: 0, imageUsed: 0 })
  const [payingPlan, setPayingPlan] = useState<string | null>(null)
  const [paySuccess, setPaySuccess] = useState(false)
  const [limitType, setLimitType]   = useState<"text" | "image">("text")

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef       = useRef<HTMLInputElement>(null)
  const renameRef      = useRef<HTMLInputElement>(null)
  const fileInputRef   = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const isPaid      = planInfo.plan !== "free"
  const isLimitHit  = planInfo.remaining <= 0
  const isLow       = planInfo.remaining <= 1 && planInfo.remaining > 0

  // Load chats + auth
  useEffect(() => {
    setChats(loadChats())
    supabase.auth.getSession().then(({ data }) => {
      setAuthToken(data.session?.access_token || null)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setAuthToken(session?.access_token || null)
    })
    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }) }, [chats, activeChatId, loading])
  useEffect(() => { if (view === "chat") setTimeout(() => inputRef.current?.focus(), 300) }, [view])
  useEffect(() => { if (renamingId) setTimeout(() => renameRef.current?.focus(), 100) }, [renamingId])

  const activeChat = chats.find(c => c.id === activeChatId)

  // ── Chat management ──────────────────────────────────────────────────────
  const startNewChat = useCallback(() => {
    const chat: Chat = {
      id: genId(), title: "New Chat", messages: [],
      pinned: false, createdAt: Date.now(), updatedAt: Date.now(),
    }
    const updated = [chat, ...chats]
    setChats(updated); saveChats(updated)
    setActiveChatId(chat.id); setView("chat")
  }, [chats])

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

  // ── Image handling ───────────────────────────────────────────────────────
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 4 * 1024 * 1024) { alert("Image must be under 4MB."); return }
    const reader = new FileReader()
    reader.onload = () => setSelectedImage(reader.result as string)
    reader.readAsDataURL(file)
    e.target.value = ""
  }

  const handleImageClick = (source: "camera" | "gallery") => {
    if (!isPaid) { setLimitType("image"); setView("upgrade"); return }
    if (source === "camera") cameraInputRef.current?.click()
    else fileInputRef.current?.click()
  }

  // ── Send message ─────────────────────────────────────────────────────────
  const sendMessage = async (text: string) => {
    const hasText  = text.trim().length > 0
    const hasImage = !!selectedImage
    if ((!hasText && !hasImage) || loading || !activeChatId) return

    // Hard block — show upgrade screen
    if (isLimitHit && !hasImage) { setLimitType("text"); setView("upgrade"); return }
    if (hasImage && !isPaid)     { setLimitType("image"); setView("upgrade"); return }

    const userMsg: Message = {
      role: "user",
      content: hasText ? text.trim() : "Explain what's in this image",
      image: selectedImage || undefined,
      timestamp: Date.now(),
    }

    let updated = chats.map(c => {
      if (c.id !== activeChatId) return c
      const msgs = [...c.messages, userMsg]
      return { ...c, messages: msgs, title: c.messages.length === 0 ? makeTitle(msgs) : c.title, updatedAt: Date.now() }
    })
    setChats(updated); saveChats(updated)
    setInput(""); setSelectedImage(null); setLoading(true)

    try {
      const current   = updated.find(c => c.id === activeChatId)!
      const recent    = current.messages.slice(-10)
      const hasVision = recent.some(m => m.image)

      const apiMessages = recent.map(m => {
        if (m.image) {
          const parsed   = m.image.match(/^data:(.+);base64,(.+)$/)
          const mimeType = parsed ? parsed[1] : "image/jpeg"
          const base64   = parsed ? parsed[2] : m.image
          return {
            role: m.role,
            content: [
              { type: "image_url", image_url: { url: `data:${mimeType};base64,${base64}` } },
              { type: "text", text: m.content || "What is in this image? Solve my doubt." },
            ],
          }
        }
        return { role: m.role, content: m.content }
      })

      const headers: Record<string, string> = { "Content-Type": "application/json" }
      if (authToken) headers["Authorization"] = `Bearer ${authToken}`

      const res  = await fetch("/api/doubt", { method: "POST", headers, body: JSON.stringify({ messages: apiMessages, useVision: hasVision }) })
      const data = await res.json()

      // Server-side limit hit — show upgrade
      if (data.limitHit) {
        setLimitType(data.limitType || "text")
        setView("upgrade")
        updated = updated.map(c => c.id !== activeChatId ? c : { ...c, messages: c.messages.slice(0, -1) })
        setChats(updated); saveChats(updated)
        setLoading(false)
        return
      }

      // Update remaining count
      if (data.remaining !== undefined && data.remaining !== null) {
        setPlanInfo(prev => ({ ...prev, plan: data.plan || prev.plan, remaining: data.remaining }))
      }

      const reply = data?.reply || "Something went wrong. Please try again."
      const assistantMsg: Message = { role: "assistant", content: reply, timestamp: Date.now() }
      updated = updated.map(c =>
        c.id === activeChatId ? { ...c, messages: [...c.messages, assistantMsg], updatedAt: Date.now() } : c
      )
      setChats(updated); saveChats(updated)
    } catch {
      const errMsg: Message = { role: "assistant", content: "Connection error. Please check your internet.", timestamp: Date.now() }
      updated = updated.map(c => c.id === activeChatId ? { ...c, messages: [...c.messages, errMsg] } : c)
      setChats(updated); saveChats(updated)
    } finally {
      setLoading(false)
    }
  }

  // ── Razorpay payment ─────────────────────────────────────────────────────
  const handlePay = async (planId: string) => {
    if (!authToken) { alert("Please sign in to subscribe."); return }
    setPayingPlan(planId)
    try {
      const loaded = await loadRazorpay()
      if (!loaded) { alert("Payment gateway failed to load. Try again."); return }

      const orderRes = await fetch("/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
        body: JSON.stringify({ action: "create", plan: planId }),
      })
      const order = await orderRes.json()
      if (order.error) { alert(order.error); return }

      const rzp = new (window as any).Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "NCERT Master",
        description: order.planName,
        order_id: order.orderId,
        theme: { color: "#6366f1" },
        handler: async (response: any) => {
          const verifyRes = await fetch("/api/payment", {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: `Bearer ${authToken}` },
            body: JSON.stringify({
              action: "verify", plan: planId,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          })
          const verify = await verifyRes.json()
          if (verify.success) {
            const limits = PLAN_LIMITS[planId] || PLAN_LIMITS.starter
            setPlanInfo({ plan: planId, remaining: limits.text, textLimit: limits.text, imageLimit: limits.image, imageUsed: 0 })
            setPaySuccess(true)
            setTimeout(() => { setPaySuccess(false); setView("chat") }, 2500)
          } else {
            alert("Payment verification failed. Contact support.")
          }
        },
        modal: { ondismiss: () => setPayingPlan(null) },
      })
      rzp.open()
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setPayingPlan(null)
    }
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
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
  const formatContent = (text: string) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("━━━")) return <hr key={i} className="border-border/40 my-2" />
      if (line.startsWith("## ")) return <p key={i} className="font-bold text-foreground mt-3 mb-1 text-[13px]">{line.slice(3)}</p>
      if (line.startsWith("**") && line.endsWith("**") && line.length > 4) return <p key={i} className="font-semibold text-foreground text-[13px]">{line.slice(2, -2)}</p>
      if (line.includes("⭐")) return <p key={i} className="text-amber-600 dark:text-amber-400 font-medium text-[12px] bg-amber-500/10 rounded-lg px-2 py-1 my-1">{line}</p>
      if (line.match(/^\d+\. /)) return <p key={i} className="ml-3 text-[13px] leading-relaxed">{line}</p>
      if (line.startsWith("• ") || line.startsWith("- ") || line.startsWith("(i)") || line.startsWith("(ii)") || line.startsWith("(iii)")) return <p key={i} className="ml-3 text-[13px] leading-relaxed">{line}</p>
      if (!line.trim()) return <div key={i} className="h-1" />
      if (line.includes("**")) {
        const parts = line.split(/(\*\*[^*]+\*\*)/)
        return <p key={i} className="text-[13px] leading-relaxed">{parts.map((p, j) => p.startsWith("**") && p.endsWith("**") ? <strong key={j} className="font-semibold">{p.slice(2, -2)}</strong> : p)}</p>
      }
      return <p key={i} className="text-[13px] leading-relaxed">{line}</p>
    })
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <>
      <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleImageSelect} />
      <input ref={cameraInputRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={handleImageSelect} />

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 ${isOpen ? "scale-0 opacity-0 pointer-events-none" : "scale-100 opacity-100"} bg-gradient-to-br from-indigo-500 to-violet-600 hover:from-indigo-400 hover:to-violet-500 active:scale-95`}
      >
        <span className="absolute inline-flex h-full w-full animate-ping rounded-2xl bg-indigo-400 opacity-20" />
        <GraduationCap className="h-7 w-7 text-white" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="relative z-10 mx-auto flex h-[88vh] w-full max-w-md flex-col rounded-t-3xl bg-background shadow-2xl sm:rounded-3xl sm:h-[82vh] overflow-hidden">

            {/* ── UPGRADE SCREEN ───────────────────────────────────────── */}
            {view === "upgrade" && (
              <>
                {/* Header */}
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur shrink-0">
                  <button
                    onClick={() => setView(activeChatId ? "chat" : "history")}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <p className="font-bold text-foreground text-sm flex-1">Get more Guru AI</p>
                  <button onClick={() => setIsOpen(false)} className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground">
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {/* Payment success state */}
                {paySuccess ? (
                  <div className="flex flex-col items-center justify-center flex-1 gap-4 px-6 text-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500">
                      <CheckCircle2 className="h-10 w-10 text-white" />
                    </div>
                    <p className="font-bold text-foreground text-xl">Payment Successful!</p>
                    <p className="text-muted-foreground text-sm">Your plan is now active. Enjoy unlimited access!</p>
                  </div>
                ) : (
                  <div className="flex-1 overflow-y-auto">
                    {/* Subtitle */}
                    <div className="px-5 pt-5 pb-3 text-center">
                      <p className="text-muted-foreground text-sm">
                        {limitType === "image"
                          ? "Upload photos of textbook pages, handwritten notes & diagrams."
                          : "You've used all free messages for today. Upgrade for more."}
                      </p>
                    </div>

                    {/* Plan cards */}
                    <div className="px-4 pb-4 space-y-3">
                      {PLANS.map(plan => (
                        <div key={plan.id} className="rounded-2xl border border-border bg-card overflow-hidden">
                          {/* Plan header */}
                          <div className="px-5 pt-5 pb-4">
                            <div className="flex items-start justify-between mb-1">
                              <div>
                                <p className="font-bold text-foreground text-lg flex items-center gap-2">
                                  {plan.id === "elite" && <Crown className="h-4 w-4 text-amber-400" />}
                                  {plan.name}
                                  {plan.badge && (
                                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500">
                                      {plan.badge}
                                    </span>
                                  )}
                                </p>
                                <p className="text-sm text-muted-foreground">{plan.tagline}</p>
                              </div>
                            </div>

                            {/* Price box */}
                            <div className="mt-3 rounded-xl border-2 border-indigo-500/30 bg-indigo-500/5 px-4 py-3 mb-4">
                              <p className="text-2xl font-black text-foreground">
                                {plan.priceLabel}
                                <span className="text-sm font-normal text-muted-foreground ml-1">{plan.period}</span>
                              </p>
                              <p className="text-xs text-muted-foreground mt-0.5">Billed monthly · Cancel anytime</p>
                            </div>

                            {/* Subscribe button */}
                            <button
                              onClick={() => handlePay(plan.id)}
                              disabled={!!payingPlan}
                              className={`w-full py-3 rounded-xl text-white font-bold text-sm bg-gradient-to-r ${plan.color} hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-md flex items-center justify-center gap-2`}
                            >
                              {payingPlan === plan.id
                                ? <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                                : `Get ${plan.name} plan`
                              }
                            </button>
                          </div>

                          {/* Features */}
                          <div className="border-t border-border px-5 py-4">
                            <p className="text-xs font-semibold text-muted-foreground mb-2">
                              {plan.id === "starter" ? "Everything in Free, plus:" : `Everything in ${plan.id === "pro" ? "Starter" : "Pro"}, plus:`}
                            </p>
                            <div className="space-y-2">
                              {plan.features.map(f => (
                                <div key={f} className="flex items-center gap-2">
                                  <Check className="h-3.5 w-3.5 text-foreground shrink-0" />
                                  <span className="text-[13px] text-foreground">{f}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Free plan reminder */}
                      <div className="rounded-2xl border border-border bg-card px-5 py-4">
                        <p className="font-semibold text-foreground text-base mb-1">Free</p>
                        <p className="text-sm text-muted-foreground mb-3">For casual use</p>
                        <div className="space-y-2">
                          {["5 messages per day", "Text only — no image support", "Resets every day"].map(f => (
                            <div key={f} className="flex items-center gap-2">
                              <Check className="h-3.5 w-3.5 text-foreground shrink-0" />
                              <span className="text-[13px] text-foreground">{f}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <p className="text-center text-[11px] text-muted-foreground pb-1">
                        🔒 Secure payment via Razorpay
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}

            {/* ── HISTORY ──────────────────────────────────────────────── */}
            {view === "history" && (
              <>
                <div className="flex items-center gap-3 border-b border-border px-4 py-3 bg-card/80 backdrop-blur shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shrink-0">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-foreground text-sm">Guru AI</p>
                      {isPaid && (
                        <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-500 border border-indigo-500/20">
                          <Crown className="h-2.5 w-2.5" />
                          {planInfo.plan.charAt(0).toUpperCase() + planInfo.plan.slice(1)}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-emerald-500">● Always online</p>
                  </div>
                  <button
                    onClick={startNewChat}
                    className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-xl bg-secondary text-muted-foreground font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    <Plus className="h-3.5 w-3.5" /> New
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
                        <p className="text-sm text-muted-foreground mt-1 max-w-[240px] leading-relaxed">Your personal NCERT teacher — ask anything, anytime.</p>
                      </div>
                      <button
                        onClick={startNewChat}
                        className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all shadow-lg"
                      >
                        <Plus className="h-4 w-4" /> Start a Chat
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
                            {chat.pinned ? <Pin className="h-4 w-4 text-amber-400" /> : <MessageSquare className="h-4 w-4 text-indigo-400" />}
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
                            <p className="text-[11px] text-muted-foreground mt-0.5">{chat.messages.length} messages · {formatDate(chat.updatedAt)}</p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0" onClick={e => e.stopPropagation()}>
                            {renamingId === chat.id ? (
                              <button onClick={confirmRename} className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-500"><Check className="h-3.5 w-3.5" /></button>
                            ) : (
                              <button onClick={e => startRename(chat, e)} className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground"><Edit3 className="h-3.5 w-3.5" /></button>
                            )}
                            <button onClick={e => togglePin(chat.id, e)} className={`p-1.5 rounded-lg transition-colors ${chat.pinned ? "bg-amber-500/15 text-amber-400" : "hover:bg-secondary text-muted-foreground"}`}>
                              {chat.pinned ? <Pin className="h-3.5 w-3.5" /> : <PinOff className="h-3.5 w-3.5" />}
                            </button>
                            <button onClick={e => deleteChat(chat.id, e)} className="p-1.5 rounded-lg hover:bg-red-500/15 text-muted-foreground hover:text-red-400">
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

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
                  {activeChat.messages.length === 0 && (
                    <div className="flex flex-col items-center gap-4 text-center pt-6">
                      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20">
                        <Sparkles className="h-8 w-8 text-indigo-400" />
                      </div>
                      <div>
                        <p className="font-bold text-foreground">Hi, I'm Guru 🎓</p>
                        <p className="text-xs text-muted-foreground mt-1 max-w-[240px] leading-relaxed">
                          Ask any NCERT doubt{isPaid ? " or upload a photo" : ""}.
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center max-w-[280px]">
                        {SUGGESTIONS.map(s => (
                          <button key={s} onClick={() => sendMessage(s)} className="text-xs px-3 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-600 hover:bg-indigo-500/20 transition-colors font-medium">
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
                        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-gradient-to-br from-indigo-500 to-violet-600 text-white rounded-br-sm" : "bg-card border border-border text-foreground rounded-bl-sm space-y-0.5"}`}>
                          {msg.image && <img src={msg.image} alt="Attached" className="rounded-xl mb-2 max-h-48 w-auto object-contain" />}
                          {msg.role === "assistant" ? formatContent(msg.content) : msg.content}
                        </div>
                        <p className={`text-[10px] text-muted-foreground mt-1 ${msg.role === "user" ? "text-right" : "text-left"}`}>{formatTime(msg.timestamp)}</p>
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

                {/* ── Bottom bar — remaining messages (Claude style) ──── */}
                {!isPaid && (
                  <div className="flex items-center justify-between border-t border-border bg-card/80 px-4 py-2 shrink-0">
                    <p className="text-xs text-muted-foreground">
                      {isLimitHit
                        ? "No messages remaining"
                        : `${planInfo.remaining} message${planInfo.remaining === 1 ? "" : "s"} remaining · ${getResetLabel(planInfo.plan)}`
                      }
                    </p>
                    <button
                      onClick={() => { setLimitType("text"); setView("upgrade") }}
                      className="text-xs font-semibold text-indigo-500 hover:text-indigo-400 transition-colors"
                    >
                      Upgrade to Pro
                    </button>
                  </div>
                )}

                {/* Input Area */}
                <div className="border-t border-border px-3 py-3 bg-card/80 backdrop-blur shrink-0">
                  {selectedImage && (
                    <div className="mb-2 relative inline-block">
                      <img src={selectedImage} alt="Selected" className="h-20 w-20 rounded-xl object-cover border border-border" />
                      <button onClick={() => setSelectedImage(null)} className="absolute -top-1.5 -right-1.5 bg-background rounded-full text-muted-foreground hover:text-foreground">
                        <XCircle className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleImageClick("camera")}
                      title={isPaid ? "Take photo" : "Upgrade to use images"}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${isPaid ? "border-border bg-secondary text-muted-foreground hover:text-foreground" : "border-border bg-secondary text-muted-foreground/50"}`}
                    >
                      {isPaid ? <Camera className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                    </button>
                    <button
                      onClick={() => handleImageClick("gallery")}
                      title={isPaid ? "Attach image" : "Upgrade to use images"}
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border transition-all ${isPaid ? "border-border bg-secondary text-muted-foreground hover:text-foreground" : "border-border bg-secondary text-muted-foreground/50"}`}
                    >
                      {isPaid ? <Paperclip className="h-4 w-4" /> : <Lock className="h-3.5 w-3.5" />}
                    </button>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input) } }}
                      placeholder={isLimitHit ? "Upgrade to continue chatting..." : selectedImage ? "Ask about this image..." : "Ask your doubt..."}
                      disabled={loading || isLimitHit}
                      className="flex-1 rounded-2xl border border-border bg-secondary/50 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-60"
                    />
                    <button
                      onClick={() => isLimitHit ? (setLimitType("text"), setView("upgrade")) : sendMessage(input)}
                      disabled={(!input.trim() && !selectedImage && !isLimitHit) || loading}
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-white disabled:opacity-40 hover:opacity-90 active:scale-95 transition-all ${isLimitHit ? "bg-indigo-500" : "bg-gradient-to-br from-indigo-500 to-violet-600"}`}
                    >
                      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : isLimitHit ? <Zap className="h-4 w-4" /> : <Send className="h-4 w-4" />}
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
