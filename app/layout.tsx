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
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `localStorage.removeItem('ncert-theme'); localStorage.removeItem('theme');`
        }} />
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          storageKey="ncert-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
