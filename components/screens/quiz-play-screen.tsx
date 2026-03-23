"use client"

import { useState, useCallback, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { getText } from "@/lib/translations"
import { ScreenHeader } from "@/components/screen-header"
import { CheckCircle2, XCircle, Trophy, RotateCcw } from "lucide-react"

type QuizQuestion = {
  question: string
  options: string[]
  correctIndex: number
  explanation?: string
}

export function QuizPlayScreen() {
  const {
    language,
    selectedClass,
    selectedStream,
    selectedSubject,
    selectedBook,
    selectedChapter,
    quizMode,
    setQuizScore,
    setScreen,
  } = useApp()

  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)

  useEffect(() => {
    if (!selectedClass || !selectedSubject) {
      setError("Subject select karein pehle.")
      setLoading(false)
      return
    }

    const params = new URLSearchParams({
      chapter_id: selectedChapter || "full",
      chapter_name: selectedChapter || selectedSubject,
      chapter_name_hi: "",
      subject: selectedSubject,
      class: String(selectedClass),
      tab: "quiz",
      quiz_mode: quizMode || "chapter",
    })

    fetch(`/api/content?${params}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }
        try {
          const clean = data.content.replace(/```json|```/g, "").trim()
          const start = clean.indexOf("[")
          const end = clean.lastIndexOf("]")
          const parsed = JSON.parse(clean.slice(start, end + 1))
          setQuestions(parsed)
        } catch {
          setError("Questions parse नहीं हो सके।")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Quiz load नहीं हो सका।")
        setLoading(false)
      })
  }, [selectedChapter, selectedSubject, selectedClass, quizMode])

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <ScreenHeader title="Quiz" />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">AI प्रश्न तैयार कर रहा है...</p>
          <p className="text-xs text-muted-foreground">इसमें 10-15 सेकंड लग सकते हैं</p>
        </div>
      </div>
    )
  }

  if (error || !questions || questions.length === 0) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <ScreenHeader title="Quiz" />
        <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
          <Trophy className="h-16 w-16 text-muted-foreground/30" />
          <p className="text-base font-semibold text-muted-foreground">
            {error || "प्रश्न उपलब्ध नहीं हैं।"}
          </p>
          <button
            onClick={() => setScreen("dashboard")}
            className="rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground"
          >
            {getText("backToDashboard", language)}
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentIndex]

  const handleSelect = useCallback(
    (optionIdx: number) => {
      if (isAnswered) return
      setSelectedOption(optionIdx)
      setIsAnswered(true)
      if (optionIdx === currentQuestion.correctIndex) {
        setScore((s) => s + 1)
      }
    },
    [isAnswered, currentQuestion]
  )

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= questions.length) {
      setQuizScore(score, questions.length)
      setShowResult(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    }
  }, [currentIndex, questions.length, score, setQuizScore])

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100)
    return (
      <div className="flex min-h-screen flex-col bg-background">
        <ScreenHeader title={getText("quizComplete", language)} />
        <div className="flex flex-1 flex-col items-center justify-center px-6">
          <div className="flex flex-col items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-12 w-12 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              {getText("quizComplete", language)}
            </h2>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-primary">{score}</span>
              <span className="text-lg text-muted-foreground">/ {questions.length}</span>
            </div>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-700"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <p className="text-sm text-muted-foreground">{percentage}%</p>
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  setCurrentIndex(0)
                  setSelectedOption(null)
                  setIsAnswered(false)
                  setScore(0)
                  setShowResult(false)
                }}
                className="flex items-center gap-2 rounded-xl border border-border bg-card px-5 py-2.5 text-sm font-medium text-card-foreground transition-all active:scale-[0.97]"
              >
                <RotateCcw className="h-4 w-4" />
                {getText("tryAgain", language)}
              </button>
              <button
                onClick={() => setScreen("dashboard")}
                className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all active:scale-[0.97]"
              >
                {getText("backToDashboard", language)}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScreenHeader title={`${getText("question", language)} ${currentIndex + 1} ${getText("of", language)} ${questions.length}`} />
      <div className="mx-auto w-full max-w-md flex-1 px-4 py-5">
        <div className="mb-5 h-1.5 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-base font-semibold leading-relaxed text-card-foreground">
            {currentQuestion.question}
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2.5">
          {currentQuestion.options.map((option, idx) => {
            let optionStyle = "border-border bg-card text-card-foreground"
            if (isAnswered) {
              if (idx === currentQuestion.correctIndex) {
                optionStyle = "border-success bg-success/10 text-success"
              } else if (idx === selectedOption && idx !== currentQuestion.correctIndex) {
                optionStyle = "border-destructive bg-destructive/10 text-destructive"
              }
            } else if (idx === selectedOption) {
              optionStyle = "border-primary bg-primary/10 text-primary"
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all active:scale-[0.98] ${optionStyle}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-xs font-bold text-secondary-foreground">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="text-sm font-medium">{option}</span>
                {isAnswered && idx === currentQuestion.correctIndex && (
                  <CheckCircle2 className="ml-auto h-5 w-5 shrink-0 text-success" />
                )}
                {isAnswered && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                  <XCircle className="ml-auto h-5 w-5 shrink-0 text-destructive" />
                )}
              </button>
            )
          })}
        </div>
        {isAnswered && (
          <div className="mt-5">
            {currentQuestion.explanation && (
              <div className="mb-3 rounded-xl border border-border bg-card/50 p-3">
                <p className="text-xs text-muted-foreground">{currentQuestion.explanation}</p>
              </div>
            )}
            <div className={`mb-4 rounded-xl p-3 text-center text-sm font-semibold ${
              selectedOption === currentQuestion.correctIndex
                ? "bg-success/10 text-success"
                : "bg-destructive/10 text-destructive"
            }`}>
              {selectedOption === currentQuestion.correctIndex
                ? getText("correct", language)
                : `${getText("wrong", language)} — ${getText("correctAnswer", language)}: ${currentQuestion.options[currentQuestion.correctIndex]}`}
            </div>
            <button
              onClick={handleNext}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.98]"
            >
              {currentIndex + 1 >= questions.length
                ? getText("score", language)
                : getText("next", language)}
            </button>
          </div>
        )}
      </div>
    </div>
  )
      }
