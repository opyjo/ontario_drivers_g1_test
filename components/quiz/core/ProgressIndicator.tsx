import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  currentIndex: number;
  total: number;
  percentage: number;
}

/**
 * Modern progress indicator with sleek design and enhanced visual feedback.
 * Uses Shadcn Progress component with accessible labeling and modern styling.
 */
export const ProgressIndicator = ({
  currentIndex,
  total,
  percentage,
}: Readonly<ProgressIndicatorProps>) => {
  return (
    <div className="bg-card/50 backdrop-blur-sm border rounded-xl p-4 space-y-3 shadow-sm flex-shrink-0">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full" />
          <span className="text-sm font-medium text-foreground">
            Question {currentIndex + 1}
          </span>
          <span className="text-xs text-muted-foreground">of {total}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Progress</span>
          <span className="text-sm font-semibold text-primary">
            {Math.round(percentage)}%
          </span>
        </div>
      </div>

      <Progress
        value={percentage}
        className="h-2 bg-muted/30"
        aria-label={`Quiz progress: ${Math.round(
          percentage
        )}% complete, question ${currentIndex + 1} of ${total}`}
      />
    </div>
  );
};
