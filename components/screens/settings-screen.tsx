"use client"

import React, { useState } from "react"
import { useApp } from "@/lib/app-context"
import { ScreenHeader } from "@/components/screen-header"
import {
  LogOut, Timer, BookMarked, Shield, ChevronRight,
  MessageSquare, Share2, Check, X
} from "lucide-react"

export function SettingsScreen() {
  const { logout, setScreen } = useApp()

  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackName, setFeedbackName] = useState("")
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [showShareToast, setShowShareToast] = useState(false)

  const handleLogout = () => { logout(); setScreen("setup") }

  const handleSendFeedback = async () => {
    if (!feedbackText.trim()) return
    setSending(true)
    const subject = encodeURIComponent("NCERT Master App Feedback")
    const body = encodeURIComponent(
      `From: ${feedbackName.trim() || "Anonymous"}\n\nFeedback:\n${feedbackText.trim()}`
    )
    window.open(`mailto:support.ncertmaster@gmail.com?subject=${subject}&body=${body}`, "_blank")
    setFeedbackSent(true)
    setSending(false)
    setTimeout(() => {
      setFeedbackSent(false)
      setShowFeedback(false)
      setFeedbackText("")
      setFeedbackName("")
    }, 2000)
  }

  const handleShare = async () => {
    const shareData = {
      title: "NCERT Master",
      text: "📚 NCERT Master - Best App for NCERT Study! Smart notes, AI Doubt Solver, Quiz Mode & more. Try it now!",
      url: window.location.origin,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
        setShowShareToast(true)
        setTimeout(() => setShowShareToast(false), 2500)
      }
    } catch (_) {
      await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
      setShowShareToast(true)
      setTimeout(() => setShowShareToast(false), 2500)
    }
  }

  const menuItems = [
    {
      icon: Timer, label: "Time Management",
      sublabel: "Pomodoro timer, schedule & daily routine",
      iconBg: "bg-violet-500/15 text-violet-400",
      onClick: () => setScreen("study-timer")
    },
    {
      icon: BookMarked, label: "My Diary",
      sublabel: "Notes, goals and life journal",
      iconBg: "bg-amber-500/15 text-amber-400",
      onClick: () => setScreen("diary")
    },
    {
      icon: Shield, label: "Privacy Policy",
      sublabel: "Data usage and AI policy",
      iconBg: "bg-emerald-500/15 text-emerald-400",
      onClick: () => setScreen("privacy-policy")
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title="Settings" />
      <div className="flex-1 px-4 py-5 space-y-3 max-w-md mx-auto w-full">

        {/* Main Menu Items */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
          {menuItems.map((item, i) => {
            const Icon = item.icon
            return (
              <button key={item.label} onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-secondary/50 active:bg-secondary ${i < menuItems.length - 1 ? "border-b border-border/60" : ""}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}><Icon className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.sublabel}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
              </button>
            )
          })}
        </div>

        {/* Share App */}
        <button onClick={handleShare}
          className="w-full flex items-center gap-3 px-4 py-4 text-left rounded-2xl border border-border/60 bg-card shadow-sm hover:bg-secondary/50 active:bg-secondary transition-colors">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
            <Share2 className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Share this App</p>
            <p className="text-xs text-muted-foreground mt-0.5">Share NCERT Master with friends</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        </button>

        {/* Feedback */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <button onClick={() => setShowFeedback(s => !s)}
            className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-secondary/50 active:bg-secondary">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/15 text-pink-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Send Feedback</p>
              <p className="text-xs text-muted-foreground mt-0.5">Help us improve NCERT Master</p>
            </div>
            <ChevronRight className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${showFeedback ? "rotate-90" : ""}`} />
          </button>

          {showFeedback && (
            <div className="px-4 pb-4 space-y-3 border-t border-border/60">
              <div className="pt-3 space-y-3">
                <input
                  type="text"
                  placeholder="Your name (optional)"
                  value={feedbackName}
                  onChange={e => setFeedbackName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                />
                <textarea
                  placeholder="What can we improve? Share your thoughts..."
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowFeedback(false); setFeedbackText(""); setFeedbackName("") }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors">
                    <X className="h-4 w-4" /> Cancel
                  </button>
                  <button
                    onClick={handleSendFeedback}
                    disabled={sending || !feedbackText.trim() || feedbackSent}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 disabled:opacity-60 transition-colors">
                    {feedbackSent
                      ? <><Check className="h-4 w-4" /> Sent!</>
                      : sending
                        ? "Sending..."
                        : <><MessageSquare className="h-4 w-4" /> Send</>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Logout */}
        <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-red-500/10 border border-red-500/20 rounded-2xl hover:bg-red-500/20 transition-colors font-semibold">
          <LogOut className="w-5 h-5" /><span>Logout</span>
        </button>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 z-50">
          <Check className="h-4 w-4" /> Link copied to clipboard!
        </div>
      )}
    </div>
  )
}
