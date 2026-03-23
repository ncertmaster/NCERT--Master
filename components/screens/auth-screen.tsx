"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react"
import Image from "next/image"
import { createClient } from "@supabase/supabase-js"

// ─── Supabase client ──────────────────────────────────────────────────────────
// NOTE: Add these to your .env.local file:
//   NEXT_PUBLIC_SUPABASE_URL=your_project_url
//   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

// ─── Types ─────────────────────────────────────────────────────────────────────
type AuthMode = "email" | "phone" | "otp-verify"

export function AuthScreen() {
  const { screen, setScreen, setUser, language } = useApp()
  const isLogin = screen === "login"

  // Shared state
  const [authMode, setAuthMode] = useState<AuthMode>("email")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Email/password fields
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Phone fields
  const [phone, setPhone] = useState("")
  const [otp, setOtp] = useState("")

  // ─── Email / Password submit ────────────────────────────────────────────────
  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!email.trim()) { setError("Email डालें"); return }
    if (!password.trim() || password.length < 6) { setError("Password कम से कम 6 characters का होना चाहिए"); return }

    setLoading(true)
    try {
      if (isLogin) {
        const { data, error: authErr } = await supabase.auth.signInWithPassword({ email, password })
        if (authErr) throw authErr
        const user = data.user
        setUser({
          name: user?.user_metadata?.name || user?.email?.split("@")[0] || "Student",
          email: user?.email || email,
          classNumber: user?.user_metadata?.classNumber || 10,
          aim: user?.user_metadata?.aim || "",
          photo: user?.user_metadata?.avatar_url || null,
        })
        setScreen("dashboard")
      } else {
        if (!name.trim()) { setError("नाम डालें"); setLoading(false); return }
        const { data, error: authErr } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { name } },
        })
        if (authErr) throw authErr
        setUser({
          name: name,
          email: email,
          classNumber: 10,
          aim: "",
          photo: null,
        })
        setScreen("setup")
      }
    } catch (err: any) {
      const msg = err?.message || "कुछ गलत हुआ। दोबारा try करें।"
      if (msg.includes("Invalid login")) setError("Email या Password गलत है।")
      else if (msg.includes("already registered")) setError("यह Email पहले से registered है। Login करें।")
      else setError(msg)
    } finally {
      setLoading(false)
    }
  }

  // ─── Google OAuth ───────────────────────────────────────────────────────────
  async function handleGoogleLogin() {
    setError("")
    setLoading(true)
    try {
      const { error: authErr } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: { access_type: "offline", prompt: "consent" },
        },
      })
      if (authErr) throw authErr
      // Redirect happens automatically
    } catch (err: any) {
      setError(err?.message || "Google login failed। दोबारा try करें।")
      setLoading(false)
    }
  }

  // ─── Phone OTP — send ────────────────────────────────────────────────────────
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    const cleaned = phone.replace(/\s/g, "")
    if (!cleaned || cleaned.length < 10) {
      setError("Valid mobile number डालें")
      return
    }

    // Add +91 if not present
    const fullPhone = cleaned.startsWith("+") ? cleaned : `+91${cleaned}`

    setLoading(true)
    try {
      const { error: authErr } = await supabase.auth.signInWithOtp({ phone: fullPhone })
      if (authErr) throw authErr
      setAuthMode("otp-verify")
    } catch (err: any) {
      setError(err?.message || "OTP भेजने में दिक्कत। दोबारा try करें।")
    } finally {
      setLoading(false)
    }
  }

  // ─── Phone OTP — verify ──────────────────────────────────────────────────────
  async function handleVerifyOtp(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!otp || otp.length < 4) {
      setError("OTP डालें")
      return
    }

    const cleaned = phone.replace(/\s/g, "")
    const fullPhone = cleaned.startsWith("+") ? cleaned : `+91${cleaned}`

    setLoading(true)
    try {
      const { data, error: authErr } = await supabase.auth.verifyOtp({
        phone: fullPhone,
        token: otp,
        type: "sms",
      })
      if (authErr) throw authErr
      const user = data.user
      const isNew = !user?.user_metadata?.classNumber

      setUser({
        name: user?.user_metadata?.name || `Student`,
        email: user?.email || fullPhone,
        classNumber: user?.user_metadata?.classNumber || 10,
        aim: user?.user_metadata?.aim || "",
        photo: null,
      })
      setScreen(isNew ? "setup" : "dashboard")
    } catch (err: any) {
      setError(err?.message || "OTP गलत है। दोबारा try करें।")
    } finally {
      setLoading(false)
    }
  }

  // ─── OTP Verify Screen ───────────────────────────────────────────────────────
  if (authMode === "otp-verify") {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="animate-fade-in w-full max-w-sm">
            <div className="mb-8 flex flex-col items-center gap-2">
              <div className="relative h-20 w-20">
                <Image src="/images/logo.png" alt="NCERT Master" fill className="object-contain" priority />
              </div>
              <h1 className="text-xl font-bold text-foreground">{getText("appName", language)}</h1>
            </div>

            <button
              onClick={() => { setAuthMode("phone"); setOtp(""); setError("") }}
              className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> वापस जाएं
            </button>

            <div className="mb-6 text-center">
              <p className="text-base font-semibold text-foreground">OTP Verify करें</p>
              <p className="mt-1 text-sm text-muted-foreground">
                <span className="font-medium text-primary">+91 {phone}</span> पर OTP भेजा गया है
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="OTP डालें (6 digit)"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                className="w-full rounded-xl border border-input bg-card py-3 px-4 text-center text-lg font-bold tracking-widest text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />

              {error && <p className="text-center text-xs text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="glow-btn w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "Verify हो रहा है..." : "✅ Verify करें"}
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="text-center text-sm text-primary underline"
              >
                OTP दोबारा भेजें
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ─── Phone OTP Screen ────────────────────────────────────────────────────────
  if (authMode === "phone") {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
          <div className="animate-fade-in w-full max-w-sm">
            <div className="mb-8 flex flex-col items-center gap-2">
              <div className="relative h-20 w-20">
                <Image src="/images/logo.png" alt="NCERT Master" fill className="object-contain" priority />
              </div>
              <h1 className="text-xl font-bold text-foreground">{getText("appName", language)}</h1>
            </div>

            <button
              onClick={() => { setAuthMode("email"); setError("") }}
              className="mb-4 flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> Email से Login करें
            </button>

            <h2 className="mb-4 text-center text-xl font-semibold text-foreground">
              📱 Mobile से Login करें
            </h2>

            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">+91</span>
                </div>
                <input
                  type="tel"
                  inputMode="numeric"
                  placeholder="Mobile Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full rounded-xl border border-input bg-card py-3 pl-16 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              {error && <p className="text-center text-xs text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="glow-btn w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? "OTP भेजा जा रहा है..." : "📨 OTP भेजें"}
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  // ─── Email/Password Screen (default) ─────────────────────────────────────────
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="animate-fade-in w-full max-w-sm">
          {/* Logo */}
          <div className="mb-8 flex flex-col items-center gap-2">
            <div className="relative h-24 w-24">
              <Image src="/images/logo.png" alt="NCERT Master" fill className="object-contain" priority />
            </div>
            <h1 className="text-xl font-bold text-foreground">{getText("appName", language)}</h1>
          </div>

          {/* ── Google Login Button ── */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="mb-4 flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-card py-3 text-sm font-semibold text-card-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98] disabled:opacity-60"
          >
            {/* Google G logo */}
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            Google से Login करें
          </button>

          {/* ── Phone OTP Button ── */}
          <button
            onClick={() => { setAuthMode("phone"); setError("") }}
            disabled={loading}
            className="mb-6 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 text-sm font-semibold text-card-foreground shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
          >
            📱 Mobile Number से Login करें
          </button>

          {/* ── Divider ── */}
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center">
              <span className="bg-background px-3 text-xs text-muted-foreground">या Email से</span>
            </div>
          </div>

          {/* ── Email / Password Form ── */}
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <h2 className="text-center text-xl font-semibold text-foreground">
              {isLogin ? getText("login", language) : getText("signup", language)}
            </h2>

            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder={getText("name", language)}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-muted-foreground" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder={getText("password", language)}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-10 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>

            {error && (
              <p className="text-center text-xs text-destructive">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="glow-btn mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98] disabled:opacity-60"
            >
              {loading
                ? (isLogin ? "Login हो रहा है..." : "Account बन रहा है...")
                : (isLogin ? getText("login", language) : getText("signup", language))
              }
            </button>
          </form>

          {/* Switch mode */}
          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isLogin ? getText("dontHaveAccount", language) : getText("alreadyHaveAccount", language)}{" "}
            <button
              onClick={() => {
                setError("")
                setScreen(isLogin ? "signup" : "login")
              }}
              className="font-semibold text-primary"
            >
              {isLogin ? getText("signup", language) : getText("login", language)}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
