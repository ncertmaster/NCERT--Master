"use client"

import { useState, useRef } from "react"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import type { ClassNumber } from "@/lib/data"
import { Camera, ChevronDown, Target } from "lucide-react"

export function SetupScreen() {
  const { user, setUser, setScreen, language } = useApp()
  const [name, setName] = useState(user?.name || "")
  const [classNumber, setClassNumber] = useState<ClassNumber | "">(user?.classNumber || "")
  const [aim, setAim] = useState("")
  const [photo, setPhoto] = useState<string | null>(null)
  const [error, setError] = useState("")
  const fileRef = useRef<HTMLInputElement>(null)

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setPhoto(ev.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")

    if (!name.trim()) {
      setError("Please enter your name")
      return
    }
    if (!classNumber) {
      setError("Please select your class")
      return
    }
    if (!aim.trim()) {
      setError("Please enter your aim")
      return
    }

    setUser({
      name,
      email: user?.email || "",
      classNumber: classNumber as ClassNumber,
      aim,
      photo,
    })
    setScreen("dashboard")
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12">
        <div className="animate-slide-up w-full max-w-sm">
          <h2 className="mb-2 text-center text-2xl font-bold text-foreground">
            {getText("setupProfile", language)}
          </h2>
          <p className="mb-8 text-center text-sm text-muted-foreground">
            {getText("tagline", language)}
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Photo Upload */}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-primary/40 bg-secondary transition-colors hover:border-primary/70"
              >
                {photo ? (
                  <img src={photo} alt="Profile" className="h-full w-full object-cover" />
                ) : (
                  <Camera className="h-7 w-7 text-muted-foreground" />
                )}
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>
            <p className="text-center text-xs text-muted-foreground">
              {getText("uploadPhoto", language)} {getText("optional", language)}
            </p>

            {/* Name */}
            <input
              type="text"
              placeholder={getText("name", language)}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-input bg-card py-3 px-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />

            {/* Class */}
            <div className="relative">
              <select
                value={classNumber}
                onChange={(e) => setClassNumber(Number(e.target.value) as ClassNumber)}
                className="w-full appearance-none rounded-xl border border-input bg-card py-3 pl-4 pr-10 text-sm text-card-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">{getText("selectClass", language)}</option>
                {[6, 7, 8, 9, 10, 11, 12].map((c) => (
                  <option key={c} value={c}>
                    {getText("class", language)} {c}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            </div>

            {/* Aim */}
            <div className="relative">
              <Target className="absolute left-3 top-3.5 h-4.5 w-4.5 text-muted-foreground" />
              <input
                type="text"
                placeholder={getText("yourAim", language)}
                value={aim}
                onChange={(e) => setAim(e.target.value)}
                className="w-full rounded-xl border border-input bg-card py-3 pl-10 pr-4 text-sm text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {error && (
              <p className="text-center text-xs text-destructive">{error}</p>
            )}

            <button
              type="submit"
              className="glow-btn mt-2 w-full rounded-xl bg-primary py-3.5 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 active:scale-[0.98]"
            >
              {getText("getStarted", language)}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
