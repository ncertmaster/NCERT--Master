"use client"

import React from "react"

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  errorMessage: string
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, errorMessage: "" }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error?.message || "Unknown error" }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Silent — could add Sentry/logging here later
    console.error("ErrorBoundary caught:", error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false, errorMessage: "" })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
          {/* Icon */}
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
            <svg
              className="h-10 w-10 text-destructive"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
              />
            </svg>
          </div>

          {/* Text */}
          <h2 className="mb-2 text-xl font-bold text-foreground">
            Kuch Galat Ho Gaya 😕
          </h2>
          <p className="mb-1 text-sm text-muted-foreground">
            App mein ek unexpected error aa gayi.
          </p>
          <p className="mb-8 text-xs text-muted-foreground/60">
            Neeche button dabao — zyada tar theek ho jaata hai.
          </p>

          {/* Buttons */}
          <div className="flex w-full max-w-xs flex-col gap-3">
            <button
              onClick={this.handleReset}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition-all active:scale-[0.97]"
            >
              🔄 Dobara Try Karo
            </button>
            <button
              onClick={() => window.location.reload()}
              className="w-full rounded-xl border border-border bg-card py-3 text-sm font-semibold text-card-foreground transition-all active:scale-[0.97]"
            >
              🏠 App Reload Karo
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
