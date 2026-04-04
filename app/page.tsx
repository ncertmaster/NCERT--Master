import { AppProvider } from "@/lib/app-context"
import { AppShell } from "@/components/app-shell"
import { ErrorBoundary } from "@/components/error-boundary"

export default function Page() {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppShell />
      </AppProvider>
    </ErrorBoundary>
  )
}
