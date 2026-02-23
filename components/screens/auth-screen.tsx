"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"
import Image from "next/image"

export function AuthScreen() {
  const { screen, setScreen, setUser, language } = useApp()
  const isLogin = screen === "login"
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!isLogin && !name.trim()) {
      setError("Please enter your name")
      return
    }
    if (!email.trim()) {
      setError("Please enter email or mobile")
      return
    }
    if (!password.trim() || password.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setUser({
      name: isLogin ? "Student" : name,
      email,
      classNumber: 10,
      aim: "",
      photo: null,
    })
    setScreen("setup")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="animate-fade-in w-full max-w-sm">
          {/* Logo */}
          <div className="mb-10 flex flex-col items-center gap-2">
            <div className="relative h-24 w-24">
              <Image
                src="/images/logo.png"
                alt="NCERT Master"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-xl font-bold text-foreground">
              {getText("appName", language)}
            </h1>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                type="text"
                placeholder={getText("email", language)}
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
              className="glow-btn mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
            >
              {isLogin ? getText("login", language) : getText("signup", language)}
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
