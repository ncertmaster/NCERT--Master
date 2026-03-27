import type { Metadata } from "next"
import "./globals.css"

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
    <html lang="en" className="light">
      <head />
      <body>{children}</body>
    </html>
  )
}
