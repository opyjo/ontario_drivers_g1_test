"use client"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw } from "lucide-react"

interface ErrorBoundaryProps {
  message?: string
  onRetry?: () => void
}

/**
 * Error display with retry action and accessibility announcements.
 * Provides user-friendly error handling with recovery options.
 */
export function ErrorBoundary({
  message = "Something went wrong while loading the quiz.",
  onRetry,
}: ErrorBoundaryProps) {
  return (
    <Alert variant="destructive" role="alert" aria-live="polite">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription className="space-y-4">
        <p>{message}</p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="flex items-center gap-2 bg-transparent"
            aria-label="Retry loading the quiz"
          >
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}
