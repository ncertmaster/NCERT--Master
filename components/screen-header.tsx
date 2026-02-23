"use client"

import { ArrowLeft } from "lucide-react"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import Image from "next/image"

export function ScreenHeader({ title, onBack }: { title: string; onBack?: () => void }) {
  const { goBack, language } = useApp()

  return (
    <header className="sticky top-0 z-40 flex items-center gap-3 border-b border-border bg-card/95 px-4 py-3.5 backdrop-blur-lg">
      <button
        onClick={onBack || goBack}
        className="flex h-8 w-8 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-secondary"
        aria-label={getText("back", language)}
      >
        <ArrowLeft className="h-5 w-5" />
      </button>
      <h1 className="flex-1 truncate text-base font-semibold text-foreground">{title}</h1>
      <div className="relative h-7 w-7 shrink-0">
        <Image src="/images/logo.png" alt="NCERT Master" fill className="object-contain" />
      </div>
    </header>
  )
}
