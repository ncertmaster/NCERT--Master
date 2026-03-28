import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "NCERT Master",
  description: "NCERT Study App",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        {/*
          forcedTheme="light" — localStorage, system preference, sab ignore.
          .dark class kabhi <html> pe add nahi hogi.
          Dark mode CSS permanently disabled.
        */}
        <ThemeProvider
          attribute="class"
          forcedTheme="light"
          enableSystem={false}
          storageKey="ncert-theme"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
