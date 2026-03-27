"use client"

import { useEffect, useState } from "react"
import { useApp } from "@/lib/app-context"
import Image from "next/image"

export function SplashScreen() {
  // Splash bas dikhti hai — app-context ki init() hi screen change karegi
  // Yahan koi setScreen("setup") nahi — warna race condition se flash aata tha
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0a0e2a]">
      <div className="animate-scale-in flex flex-col items-center gap-6">
        <div className="relative h-44 w-44">
          <Image
            src="/images/logo.png"
            alt="NCERT Master"
            fill
            className="object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]"
            priority
          />
        </div>
        <div className="mt-4 flex gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]/50" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]/50" style={{ animationDelay: "200ms" }} />
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#d4af37]/50" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  )
}
