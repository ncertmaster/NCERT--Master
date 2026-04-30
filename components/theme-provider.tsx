"use client"

import * as React from "react"

// Dark mode has been permanently removed from NCERT Master.
// This file is kept as a stub so any stale imports do not break the build.
export function ThemeProvider({
  children,
}: {
  children: React.ReactNode
  [key: string]: unknown
}) {
  return <>{children}</>
}
