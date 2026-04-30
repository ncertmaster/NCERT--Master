import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "NCERT Master — Class 6 to 12 Study App",
  description:
    "NCERT Master: AI-powered study app for Class 6–12. Smart Notes, Important Questions, Quiz Mode, Study Timer & Diary — sab kuch ek jagah.",
  keywords: [
    "NCERT", "NCERT app", "Class 6 to 12", "study app",
    "NCERT notes", "NCERT quiz", "board exam", "CBSE", "Hindi medium",
    "free study app", "NCERT Master",
  ],
  applicationName: "NCERT Master",
  authors: [{ name: "NCERT Master" }],
  themeColor: "#1e3a5f",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "NCERT Master",
  },
  openGraph: {
    type: "website",
    title: "NCERT Master — Class 6 to 12 Study App",
    description:
      "AI-powered NCERT study app. Smart Notes, Quiz & more — bilkul free!",
    siteName: "NCERT Master",
    images: [
      {
        url: "/icons/ncert_master_512x512.png",
        width: 512,
        height: 512,
        alt: "NCERT Master App",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "NCERT Master — Class 6 to 12 Study App",
    description:
      "AI-powered NCERT study app. Smart Notes, Quiz & more — bilkul free!",
    images: ["/icons/ncert_master_512x512.png"],
  },
  icons: {
    icon: "/icons/ncert_master_192x192.png",
    apple: "/icons/ncert_master_192x192.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        {children}
      </body>
    </html>
  )
}
