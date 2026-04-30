"use client"

import { useState, useRef } from "react"
import { useApp } from "@/lib/app-context"
import { ScreenHeader } from "@/components/screen-header"
import {
  Send, Image as ImageIcon, X, Loader2,
  Lightbulb, BookOpen, Calculator, FlaskConical, Globe, Sparkles
} from "lucide-react"

// ── Quick suggestion chips ─────────────────────────────────────────────────
const SUGGESTIONS = [
  { icon: Calculator, label: "Math solve karo", q: "Yeh math problem solve karo step by step:" },
  { icon: FlaskConical, label: "Science explain", q: "Yeh concept simple words mein explain karo:" },
  { icon: BookOpen, label: "Chapter summary", q: "Is chapter ki key points batao:" },
  { icon: Globe, label: "History/Geography", q: "Yeh topic NCERT mein kaise important hai:" },
  { icon: Lightbulb, label: "Exam tip", q: "Is topic se exam mein kya aata hai:" },
]

// ── Render markdown-like response ─────────────────────────────────────────
function renderAnswer(text: string) {
  const lines = text.split("\n")
  return lines.map((line, i) => {
    if (line.startsWith("### ")) return <h3 key={i} className="mt-3 mb-1 text-sm font-bold text-foreground">{line.slice(4)}</h3>
    if (line.startsWith("## "))  return <h2 key={i} className="mt-3 mb-1 text-base font-bold text-foreground">{line.slice(3)}</h2>
    if (line.startsWith("**") && line.endsWith("**")) return <p key={i} className="font-semibold text-foreground text-sm mt-2">{line.slice(2, -2)}</p>
    if (line.startsWith("- ") || line.startsWith("• ")) return (
      <div key={i} className="flex gap-2 mt-1">
        <span className="text-primary mt-0.5 shrink-0">•</span>
        <span className="text-sm text-foreground/90 leading-relaxed">{line.slice(2)}</span>
      </div>
    )
    if (line.trim() === "") return <div key={i} className="h-2" />
    return <p key={i} className="text-sm text-foreground/90 leading-relaxed mt-0.5">{line}</p>
  })
}

// ── Main component ─────────────────────────────────────────────────────────
export function AiDoubtSolverScreen() {
  const { language, selectedClass } = useApp()

  const [question, setQuestion]     = useState("")
  const [answer, setAnswer]         = useState("")
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState("")
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const answerRef    = useRef<HTMLDivElement>(null)

  const isHindi = language === "hi"

  // ── Image picker ──────────────────────────────────────────────────────────
  const handleImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 4 * 1024 * 1024) {
      setError("Image 4MB se badi hai. Choti image choose karo.")
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setImagePreview(result)
      // Strip data URL prefix for API
      setImageBase64(result.split(",")[1])
    }
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setImageBase64(null)
    setImagePreview(null)
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    const q = question.trim()
    if (!q && !imageBase64) return
    if (loading) return

    setLoading(true)
    setAnswer("")
    setError("")

    try {
      const res = await fetch("/api/doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: q || "Is image mein jo problem hai usse solve karo.",
          imageBase64: imageBase64 || null,
          language,
          classNum: String(selectedClass || "10"),
        }),
      })

      const data = await res.json()

      if (!res.ok || data.error) {
        setError(data.error || "Kuch galat ho gaya. Dobara try karo.")
      } else {
        setAnswer(data.answer || "")
        setTimeout(() => answerRef.current?.scrollIntoView({ behavior: "smooth" }), 100)
      }
    } catch {
      setError("Internet connection check karo aur dobara try karo.")
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestion = (q: string) => {
    setQuestion(q)
    setAnswer("")
    setError("")
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-background pb-8">
      <ScreenHeader title={isHindi ? "Doubt Solver" : "Doubt Solver"} />

      <div className="mx-auto w-full max-w-md px-4 py-4 space-y-4">

        {/* ── Hero banner ── */}
        <div className="rounded-2xl bg-gradient-to-br from-rose-500/15 to-pink-500/5 border border-rose-500/20 p-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-rose-500/20 shrink-0">
            <Sparkles className="h-5 w-5 text-rose-400" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Guru AI</p>
            <p className="text-xs text-muted-foreground leading-snug">
              {isHindi
                ? "Koi bhi NCERT doubt poocho — text ya photo se"
                : "Ask any NCERT doubt — by text or photo"}
            </p>
          </div>
        </div>

        {/* ── Quick suggestions ── */}
        {!answer && !loading && (
          <div>
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
              {isHindi ? "Jaldi poocho" : "Quick Ask"}
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => {
                const Icon = s.icon
                return (
                  <button
                    key={s.label}
                    onClick={() => handleSuggestion(s.q)}
                    className="flex items-center gap-1.5 rounded-xl border border-border bg-card px-3 py-1.5 text-xs font-medium text-foreground hover:bg-muted transition-colors active:scale-95"
                  >
                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                    {s.label}
                  </button>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Input box ── */}
        <div className="rounded-2xl border border-border bg-card p-3 space-y-3">

          {/* Image preview */}
          {imagePreview && (
            <div className="relative w-fit">
              <img
                src={imagePreview}
                alt="Selected"
                className="h-28 w-28 rounded-xl object-cover border border-border"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          )}

          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              isHindi
                ? "Apna doubt yahan likho... (Enter se bhejo)"
                : "Type your doubt here... (Enter to send)"
            }
            rows={3}
            className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-1 border-t border-border">
            {/* Image upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <ImageIcon className="h-4 w-4" />
              {isHindi ? "Photo add karo" : "Add photo"}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImagePick}
            />

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading || (!question.trim() && !imageBase64)}
              className="flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50 transition-all active:scale-95"
            >
              {loading
                ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                : <Send className="h-3.5 w-3.5" />
              }
              {loading
                ? (isHindi ? "Soch raha hoon..." : "Thinking...")
                : (isHindi ? "Poocho" : "Ask")
              }
            </button>
          </div>
        </div>

        {/* ── Error state ── */}
        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {/* ── Loading state ── */}
        {loading && (
          <div className="rounded-2xl border border-border bg-card p-4 space-y-2">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-4 w-4 text-rose-400 animate-pulse" />
              <span className="text-xs font-semibold text-muted-foreground">
                {isHindi ? "Guru AI soch raha hai..." : "Guru AI is thinking..."}
              </span>
            </div>
            <div className="space-y-2">
              <div className="h-3 rounded-full bg-muted animate-pulse w-full" />
              <div className="h-3 rounded-full bg-muted animate-pulse w-4/5" />
              <div className="h-3 rounded-full bg-muted animate-pulse w-3/5" />
            </div>
          </div>
        )}

        {/* ── Answer ── */}
        {answer && !loading && (
          <div ref={answerRef} className="rounded-2xl border border-rose-500/20 bg-card p-4">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-border">
              <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-500/20">
                <Sparkles className="h-3.5 w-3.5 text-rose-400" />
              </div>
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wide">Guru AI</span>
            </div>
            <div className="space-y-0.5">
              {renderAnswer(answer)}
            </div>

            {/* Ask another */}
            <button
              onClick={() => { setAnswer(""); setQuestion(""); removeImage() }}
              className="mt-4 w-full rounded-xl border border-border bg-muted/50 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              {isHindi ? "✨ Naya doubt poocho" : "✨ Ask another doubt"}
            </button>
          </div>
        )}

      </div>
    </div>
  )
    }
