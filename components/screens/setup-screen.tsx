"use client"

import { useState, useRef } from "react"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import type { ClassNumber } from "@/lib/data"
import { Camera, ChevronDown, Target, Loader2 } from "lucide-react"
import { supabase } from "@/lib/supabase"

export function SetupScreen() {
  const { user, supabaseUser, setUser, setScreen, language } = useApp()
  const [step, setStep] = useState<"auth" | "profile">(supabaseUser ? "profile" : "auth")
  const [name, setName] = useState(user?.name || supabaseUser?.user_metadata?.full_name || "")
  const [classNumber, setClassNumber] = useState<ClassNumber | "">(user?.classNumber || "")
  const [aim, setAim] = useState(user?.aim || "")
  const [photo, setPhoto] = useState<string | null>(user?.photo || supabaseUser?.user_metadata?.avatar_url || null)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setPhoto(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  async function handleGoogleLogin() {
    setLoading(true)
    setError("")
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: 
          "https://v0-ncert-master-app.vercel.app/auth/callback",
      },
    })
    if (error) { setError(error.message); setLoading(false) }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!name.trim()) { setError("Please enter your name"); return }
    if (!classNumber) { setError("Please select your class"); return }
    if (!aim.trim()) { setError("Please enter your aim"); return }

    const email = supabaseUser?.email || user?.email || ""
    setUser({ name, email, classNumber: classNumber as ClassNumber, aim, photo })
    setScreen("dashboard")
  }

  // ── Auth Step ────────────────────────────────────────────────────────────────
  if (step === "auth" && !supabaseUser) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="animate-slide-up w-full max-w-sm">
            {/* Logo */}
            <div className="flex flex-col items-center mb-8">
              <img
                src="/logo.png"
                alt="NCERT Master"
                className="h-24 w-24 object-contain mb-4"
              />
              <h1 className="text-2xl font-bold text-foreground">NCERT Master</h1>
              <p className="text-sm text-muted-foreground mt-1">Learn Smarter, Score Better</p>
            </div>

            {/* Google Login */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 rounded-2xl border border-border bg-card py-4 px-5 text-sm font-semibold text-foreground shadow-sm hover:bg-secondary active:scale-[0.98] transition-all disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                ) : (
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                )}
                {loading ? "Signing in..." : "Continue with Google"}
              </button>

              <div className="relative flex items-center gap-3 py-2">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-1 h-px bg-border" />
              </div>

              <button
                onClick={() => setStep("profile")}
                className="w-full rounded-2xl border border-border bg-card py-3.5 px-5 text-sm font-medium text-muted-foreground hover:bg-secondary active:scale-[0.98] transition-all"
              >
                Continue without account
              </button>
            </div>

            {error && <p className="text-center text-xs text-destructive mt-3">{error}</p>}

            <p className="text-center text-xs text-muted-foreground mt-6 leading-relaxed">
              By continuing, you agree to our Privacy Policy. Your data is safe with us. 🔒
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ── Profile Setup Step ───────────────────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="animate-slide-up w-full max-w-sm">
          {supabaseUser && (
            <div className="flex items-center gap-2 mb-6 p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
              {supabaseUser.user_metadata?.avatar_url && (
                <img src={supabaseUser.user_metadata.avatar_url} className="h-8 w-8 rounded-full" alt="" />
              )}
              <div>
                <p className="text-xs font-semibold text-emerald-600">✓ Signed in as</p>
                <p className="text-xs text-muted-foreground">{supabaseUser.email}</p>
              </div>
            </div>
          )}

          <h2 className="mb-2 text-center text-2xl font-bold text-foreground">Setup Profile</h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">Tell us about yourself to get started</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Photo */}
            <div className="flex justify-center">
              <button type="button" onClick={() => fileRef.current?.click()}
                className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary/40 bg-secondary hover:border-primary/70 transition-colors">
                {photo ? <img src={photo} alt="Profile" className="h-full w-full object-cover" /> : <Camera className="h-7 w-7 text-muted-foreground" />}
              </button>
              <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </div>
            <p className="text-center text-xs text-muted-foreground -mt-2">Upload photo (optional)</p>

            <input type="text" placeholder="Your name" value={name} onChange={e => setName(e.target.value)}
              className="w-full rounded-xl border border-input bg-card py-3 px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />

            <div className="relative">
              <select value={classNumber} onChange={e => setClassNumber(Number(e.target.value) as ClassNumber)}
                className="w-full appearance-none rounded-xl border border-input bg-card py-3 pl-4 pr-10 text-sm text-card-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary">
                <option value="">Select your class</option>
                {[6,7,8,9,10,11,12].map(c => <option key={c} value={c}>Class {c}</option>)}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            <div className="relative">
              <Target className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <input type="text" placeholder="Your aim (e.g. IIT JEE, UPSC, Doctor)"
                value={aim} onChange={e => setAim(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>

            {error && <p className="text-center text-xs text-destructive">{error}</p>}

            <button type="submit"
              className="mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]">
              Get Started 🚀
            </button>
          </form>
        </div>
      </div>
    </div>
  )
                                 }

                
