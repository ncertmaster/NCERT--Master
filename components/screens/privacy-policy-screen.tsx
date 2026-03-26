"use client"

import React from "react"
import { ScreenHeader } from "@/components/screen-header"
import { Shield, Bot, Database, Eye, Bell, Mail } from "lucide-react"

const sections = [
  {
    icon: Database,
    iconBg: "bg-blue-500/15 text-blue-400",
    title: "Data Usage (Tumhara Data)",
    content: `NCERT Master mein aap jo bhi information dete ho — name, class, aim, diary entries, tasks — woh sirf tumhare account ke liye use hoti hai.

• Kisi bhi third-party ke saath tumhara personal data share NAHI kiya jaata
• Tumhara data Supabase ke secure servers par store hota hai
• Tum apna data kisi bhi waqt delete kar sakte ho`,
  },
  {
    icon: Bot,
    iconBg: "bg-violet-500/15 text-violet-400",
    title: "AI Usage (Groq / LLaMA)",
    content: `App mein AI features ke liye Groq API (LLaMA model) use hota hai — Notes, Important Questions, Quiz, aur Guru AI chat ke liye.

• Tumhare sawaal AI ko bheje jaate hain jawab paane ke liye
• AI chat history sirf tumhare device par store hoti hai
• Groq ke apne privacy terms bhi laagu hote hain`,
  },
  {
    icon: Eye,
    iconBg: "bg-emerald-500/15 text-emerald-400",
    title: "Kya Data Collect Hota Hai",
    content: `Hum sirf woh data collect karte hain jo app chalane ke liye zaroori hai:

• Name, Email, Class, Target (setup ke waqt)
• Study tasks aur diary entries (Supabase mein)
• Language preference (device mein)
• Koi bhi location ya payment data NAHI`,
  },
  {
    icon: Bell,
    iconBg: "bg-amber-500/15 text-amber-400",
    title: "Notifications",
    content: `App kisi bhi tarah ki push notifications ya spam nahi bhejta.

Future mein study reminders ka option aayega — lekin woh completely optional rahega aur tumhari permission se hi enable hoga.`,
  },
  {
    icon: Shield,
    iconBg: "bg-rose-500/15 text-rose-400",
    title: "Tumhare Rights",
    content: `Tum apne data ke poore malik ho:

• Apna account aur data delete kar sakte ho (Settings > Logout > Data Delete)
• Kisi bhi waqt app use karna band kar sakte ho
• Apni information update kar sakte ho

Agar koi sawaal ho toh contact karo.`,
  },
  {
    icon: Mail,
    iconBg: "bg-cyan-500/15 text-cyan-400",
    title: "Contact Us",
    content: `Koi bhi privacy concern ho toh humse sampark karo:

📧 support@ncertmaster.app

Hum 48 ghante ke andar jawab denge. Tumhari privacy humari zimmedaari hai. 🙏`,
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
          <p className="text-xs text-muted-foreground mt-1">
            Last updated: January 2025
          </p>
          <p className="text-xs text-muted-foreground/80 mt-3 leading-relaxed">
            NCERT Master tumhari privacy ka pura khayal rakhta hai. Yeh policy batati hai ki hum tumhara data kaise use karte hain.
          </p>
        </div>

        {/* Sections */}
        {sections.map(section => {
          const Icon = section.icon
          return (
            <div key={section.title} className="rounded-2xl border border-border/60 bg-card shadow-sm overflow-hidden">
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/40">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${section.iconBg}`}>
                  <Icon className="h-4.5 w-4.5" />
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
          © 2025 NCERT Master. Sab rights reserved.
        </p>
      </div>
    </div>
  )
        }
              
