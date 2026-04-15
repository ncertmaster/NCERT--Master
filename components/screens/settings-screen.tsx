"use client"

import React, { useState } from "react"
import { useApp } from "@/lib/app-context"
import { ScreenHeader } from "@/components/screen-header"
import { getText } from "@/lib/translations"
import {
  Timer, BookMarked, Shield, ChevronRight,
  MessageSquare, Share2, Check, X, Eye, Languages, Trophy
} from "lucide-react"

export function SettingsScreen() {
  const { setScreen, language, setLanguage, eyeProtection, setEyeProtection } = useApp()

  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackText, setFeedbackText] = useState("")
  const [feedbackName, setFeedbackName] = useState("")
  const [feedbackSent, setFeedbackSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [showShareToast, setShowShareToast] = useState(false)

  const g = (key: string) => getText(key, language)

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
      text: "📚 NCERT Master - Best App for NCERT Study! Smart notes, Quiz Mode & more. Try it now!",
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
      icon: Trophy,
      label: "Quiz History",
      sublabel: "Apne past quiz results dekho",
      iconBg: "bg-amber-500/15 text-amber-400",
      onClick: () => setScreen("quiz-history"),
    },
    {
      icon: Timer,
      label: g("timeManagement"),
      sublabel: g("timeManagementSub"),
      iconBg: "bg-violet-500/15 text-violet-400",
      onClick: () => setScreen("study-timer"),
    },
    {
      icon: BookMarked,
      label: g("myDiary"),
      sublabel: g("myDiarySub"),
      iconBg: "bg-amber-500/15 text-amber-400",
      onClick: () => setScreen("diary"),
    },
    {
      icon: Shield,
      label: g("privacyPolicy"),
      sublabel: g("privacyPolicySub"),
      iconBg: "bg-emerald-500/15 text-emerald-400",
      onClick: () => setScreen("privacy-policy"),
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title={g("settings")} />
      <div className="flex-1 px-4 py-5 space-y-3 max-w-md mx-auto w-full">

        {/* ── APPEARANCE ────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">

          {/* Language */}
          <div className="flex items-center gap-3 px-4 py-4 border-b border-border/60">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
              <Languages className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{g("languageLabel")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {language === "hi" ? g("hindiSelected") : g("englishSelected")}
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-xl border border-border bg-secondary p-1">
              <button
                onClick={() => setLanguage("en")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${language === "en" ? "bg-blue-500 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage("hi")}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${language === "hi" ? "bg-blue-500 text-white shadow-sm" : "text-muted-foreground hover:text-foreground"}`}
              >
                हि
              </button>
            </div>
          </div>

          {/* Eye Protection */}
          <div className="flex items-center gap-3 px-4 py-4">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${eyeProtection ? "bg-green-500/15 text-green-400" : "bg-teal-500/15 text-teal-400"}`}>
              <Eye className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{g("eyeProtection")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {eyeProtection ? g("eyeProtectionOnDesc") : g("eyeProtectionOffDesc")}
              </p>
            </div>
            <button
              onClick={() => setEyeProtection(!eyeProtection)}
              className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full transition-colors duration-300 focus:outline-none ${eyeProtection ? "bg-green-500" : "bg-border"}`}
            >
              <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ${eyeProtection ? "translate-x-6" : "translate-x-1"}`} />
            </button>
          </div>
        </div>

        {/* ── MENU ──────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
          {menuItems.map((item, i) => {
            const Icon = item.icon
            return (
              <button
                key={i}
                onClick={item.onClick}
                className={`w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-secondary/50 active:bg-secondary ${i < menuItems.length - 1 ? "border-b border-border/60" : ""}`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.iconBg}`}>
                  <Icon className="h-5 w-5" />
                </div>
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
        <button
          onClick={handleShare}
          className="w-full flex items-center gap-3 px-4 py-4 text-left rounded-2xl border border-border/60 bg-card shadow-sm hover:bg-secondary/50 active:bg-secondary transition-colors"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
            <Share2 className="h-5 w-5" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">{g("shareApp")}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{g("shareAppSub")}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        </button>

        {/* Feedback */}
        <div className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm">
          <button
            onClick={() => setShowFeedback(s => !s)}
            className="w-full flex items-center gap-3 px-4 py-4 text-left transition-colors hover:bg-secondary/50 active:bg-secondary"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-pink-500/15 text-pink-400">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">{g("sendFeedback")}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{g("sendFeedbackSub")}</p>
            </div>
            <ChevronRight className={`h-4 w-4 text-muted-foreground shrink-0 transition-transform ${showFeedback ? "rotate-90" : ""}`} />
          </button>

          {showFeedback && (
            <div className="px-4 pb-4 space-y-3 border-t border-border/60">
              <div className="pt-3 space-y-3">
                <input
                  type="text"
                  placeholder={g("yourName")}
                  value={feedbackName}
                  onChange={e => setFeedbackName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20"
                />
                <textarea
                  placeholder={g("feedbackPlaceholder")}
                  value={feedbackText}
                  onChange={e => setFeedbackText(e.target.value)}
                  rows={4}
                  className="w-full rounded-xl border border-border bg-secondary/50 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/20 resize-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => { setShowFeedback(false); setFeedbackText(""); setFeedbackName("") }}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-border bg-secondary text-foreground text-sm font-semibold hover:bg-secondary/80 transition-colors"
                  >
                    <X className="h-4 w-4" /> {g("cancel")}
                  </button>
                  <button
                    onClick={handleSendFeedback}
                    disabled={sending || !feedbackText.trim() || feedbackSent}
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-pink-500 text-white text-sm font-semibold hover:bg-pink-600 disabled:opacity-60 transition-colors"
                  >
                    {feedbackSent
                      ? <><Check className="h-4 w-4" /> {g("sent")}</>
                      : sending
                        ? g("sending")
                        : <><MessageSquare className="h-4 w-4" /> {g("send")}</>}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-2.5 rounded-full text-sm font-semibold shadow-lg flex items-center gap-2 z-50">
          <Check className="h-4 w-4" /> {g("linkCopied")}
        </div>
      )}
    </div>
  )
          }
                
