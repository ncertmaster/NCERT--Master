"use client"

import React from "react"
import { ScreenHeader } from "@/components/screen-header"
import { Shield, Bot, Database, Eye, Mail } from "lucide-react"

const sections = [
  {
    icon: Database,
    iconBg: "bg-blue-500/15 text-blue-400",
    title: "Data Usage",
    content: `All information you provide in NCERT Master — name, class, aim, diary entries, tasks — is used only for your account.

• Your personal data is NOT shared with any third party
• Your data is stored on Supabase secure servers
• You can delete your data at any time`,
  },
  {
    icon: Bot,
    iconBg: "bg-violet-500/15 text-violet-400",
    title: "AI Usage (Groq / LLaMA)",
    content: `The app uses Groq API (LLaMA model) for AI features — Notes, Important Questions, and Quiz.

• Your questions are sent to the AI to generate answers
• No AI chat history is stored on our servers
• Groq's own privacy terms also apply`,
  },
  {
    icon: Eye,
    iconBg: "bg-emerald-500/15 text-emerald-400",
    title: "What Data We Collect",
    content: `We collect only what is necessary to run the app:

• Name, Email, Class, Target (during setup)
• Study tasks and diary entries (on Supabase)
• Language preference (on device)
• No location or payment data`,
  },
  {
    icon: Shield,
    iconBg: "bg-rose-500/15 text-rose-400",
    title: "Your Rights",
    content: `You are the complete owner of your data:

• You can delete your account and data (Settings > Logout > Data Delete)
• You can stop using the app at any time
• You can update your information

Contact us if you have any questions.`,
  },
  {
    icon: Mail,
    iconBg: "bg-cyan-500/15 text-cyan-400",
    title: "Contact Us",
    content: `For any privacy concerns, reach out to us:

📧 support.ncertmaster@gmail.com

We will respond within 48 hours. Your privacy is our responsibility. 🙏`,
  },
]

export function PrivacyPolicyScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <ScreenHeader title="Privacy Policy" />

      <div className="flex-1 px-4 py-5 space-y-4 max-w-md mx-auto w-full pb-10">

        {/* Hero */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/15 to-cyan-500/10 border border-emerald-500/20 p-5 text-center">
          <Shield className="h-10 w-10 mx-auto text-emerald-400 mb-2" />
          <h1 className="text-base font-bold text-foreground">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground mt-1">Last updated: January 2025</p>
          <p className="text-xs text-muted-foreground/80 mt-3 leading-relaxed">
            NCERT Master takes your privacy seriously. This policy explains how we use your data.
          </p>
        </div>

        {/* Sections */}
        {sections.map(section => {
          const Icon = section.icon
          return (
            <div key={section.title} className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/40">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${section.iconBg}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <h2 className="text-sm font-semibold text-foreground">{section.title}</h2>
              </div>
              <div className="px-4 py-3.5">
                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </div>
            </div>
          )
        })}

        <p className="text-center text-[11px] text-muted-foreground/50 pt-2">
          © 2025 NCERT Master. All rights reserved.
        </p>
      </div>
    </div>
  )
              }
