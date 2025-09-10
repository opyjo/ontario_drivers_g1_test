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
    <div className="space-y-6">
      {/* Question category skeleton */}
      <Skeleton className="h-4 w-24" />

      {/* Question text skeleton */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>

      {/* Answer options skeleton */}
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-start gap-3 p-4 border-2 rounded-lg">
            <Skeleton className="w-5 h-5 rounded-full flex-shrink-0" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Progress skeleton */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-20" />
        </div>
        <Skeleton className="h-2 w-full" />
      </div>

      {/* Navigation skeleton */}
      <div className="flex justify-between">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-20" />
      </div>
    </div>
  )
}
