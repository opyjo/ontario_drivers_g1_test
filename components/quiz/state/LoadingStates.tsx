import { Skeleton } from "@/components/ui/skeleton"
import { Loader2 } from "lucide-react"

interface LoadingStatesProps {
  variant?: "initial" | "inline"
}

/**
 * Skeletons/spinners for initial load and per-question transitions.
 * Provides appropriate loading states for different contexts.
 */
export function LoadingStates({ variant = "initial" }: LoadingStatesProps) {
  if (variant === "inline") {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        <span className="sr-only">Loading next question...</span>
      </div>
    )
  }

  return (
    <div className="space-y-5" aria-label="Loading quiz" aria-busy="true">
      <Skeleton className="h-24 w-full rounded-xl" />

      <div className="space-y-3 rounded-xl border border-border p-5">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-7 w-full" />
        <Skeleton className="h-7 w-3/4" />
      </div>

      {/* Answer options skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-16 w-full rounded-xl" />
        ))}
      </div>

      <Skeleton className="h-16 w-full rounded-xl" />
    </div>
  )
}
