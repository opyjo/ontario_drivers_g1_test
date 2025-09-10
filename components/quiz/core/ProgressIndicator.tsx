import { Progress } from "@/components/ui/progress"

interface ProgressIndicatorProps {
  currentIndex: number
  total: number
  percentage: number
}

/**
 * Visualize progress and show "Question X of Y".
 * Uses Shadcn Progress component with accessible labeling.
 */
export function ProgressIndicator({ currentIndex, total, percentage }: ProgressIndicatorProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-sm text-muted-foreground">
        <span>
          Question {currentIndex + 1} of {total}
        </span>
        <span>{Math.round(percentage)}% complete</span>
      </div>

      <Progress
        value={percentage}
        className="h-2"
        aria-label={`Quiz progress: ${Math.round(percentage)}% complete, question ${currentIndex + 1} of ${total}`}
      />
    </div>
  )
}
