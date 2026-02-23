"use client"

import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { ScreenHeader } from "@/components/screen-header"
import { BottomTabs } from "@/components/bottom-tabs"
import { Layers, BookOpen } from "lucide-react"

export function QuizModeScreen() {
  const { language, setScreen, setQuizMode } = useApp()

  return (
    <div className="flex min-h-screen flex-col bg-background pb-20">
      <ScreenHeader title={getText("selectMode", language)} />
      <div className="mx-auto w-full max-w-md px-4 py-6">
        <div className="flex flex-col gap-4">
          <button
            onClick={() => {
              setQuizMode("chapter")
              setScreen("quiz-chapter")
            }}
            className="animate-fade-in flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-base font-semibold text-card-foreground">
                {getText("chapterWise", language)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {language === "hi" ? "एक अध्याय से प्रश्न" : "Questions from one chapter"}
              </p>
            </div>
          </button>

          <button
            onClick={() => {
              setQuizMode("full")
              setScreen("quiz-play")
            }}
            className="animate-fade-in flex items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-sm transition-all hover:shadow-md active:scale-[0.97]"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <Layers className="h-6 w-6 text-accent" />
            </div>
            <div>
              <p className="text-base font-semibold text-card-foreground">
                {getText("fullSubject", language)}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {language === "hi" ? "पूरे विषय से प्रश्न" : "Questions from full subject"}
              </p>
            </div>
          </button>
        </div>
      </div>
      <BottomTabs activeTab="quiz" />
    </div>
  )
}
