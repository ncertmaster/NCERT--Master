"use client"

import Image from "next/image"

export function SplashScreen() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background animate-fade-in">
      <div className="animate-scale-in flex flex-col items-center gap-6">
        <div className="relative h-44 w-44">
          <Image
            src="/images/logo.png"
            alt="NCERT Master"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="mt-4 flex gap-1.5">
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary/40" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary/40" style={{ animationDelay: "200ms" }} />
          <span className="h-2 w-2 animate-pulse rounded-full bg-primary/40" style={{ animationDelay: "400ms" }} />
        </div>
      </div>
    </div>
  )
}
