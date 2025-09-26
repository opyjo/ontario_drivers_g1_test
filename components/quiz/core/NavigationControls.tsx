"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, CheckCircle, ArrowRight } from "lucide-react";

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  canSubmit: boolean;
}

/**
 * Modern navigation controls with enhanced styling and visual feedback.
 * Handles navigation state with sleek button design and accessibility features.
 */
export const NavigationControls = ({
  onPrev,
  onNext,
  onSubmit,
  canGoPrev,
  canGoNext,
  canSubmit,
}: NavigationControlsProps) => {
  return (
    <div className="bg-card/30 backdrop-blur-sm border rounded-xl p-4 flex-shrink-0">
      <div className="flex justify-between items-center gap-3">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={!canGoPrev}
          aria-label="Go to previous question"
          className="flex items-center gap-2 hover:bg-muted hover:text-foreground transition-colors duration-200"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Previous</span>
        </Button>

        <div className="flex gap-2">
          {canSubmit ? (
            <Button
              type="button"
              onClick={onSubmit}
              disabled={!canSubmit}
              aria-label="Submit quiz for grading"
              className="flex items-center gap-2 px-6 rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 transition-colors duration-200 shadow-lg"
            >
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-semibold">Submit Quiz</span>
            </Button>
          ) : (
            <Button
              type="button"
              onClick={onNext}
              disabled={!canGoNext}
              aria-label="Go to next question"
              className={`
                flex items-center gap-2 px-6 rounded-lg transition-colors duration-200
                ${
                  !canGoNext
                    ? "opacity-50 cursor-not-allowed"
                    : "bg-primary hover:bg-primary/90 shadow-md"
                }
              `}
            >
              <span className="text-sm font-semibold">Next</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
