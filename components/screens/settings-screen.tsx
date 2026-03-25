"use client"

import React from "react"
import { useApp } from "@/lib/app-context"
import { ChevronLeft, LogOut } from "lucide-react"

export function SettingsScreen() {
  const { goBack, logout, setScreen } = useApp()

  const handleLogout = () => {
    logout()
    setScreen("setup")
  }

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="flex items-center p-4 border-b">
        <button onClick={() => goBack()} className="p-2 -ml-2 rounded-full hover:bg-accent">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-2 text-xl font-bold">Settings</h1>
      </div>
      <div className="flex-1 p-4 space-y-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-4 text-red-500 bg-red-50 border border-red-100 rounded-xl hover:bg-red-200 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-bold">Logout</span>
        </button>
      </div>
    </div>
  )
}
