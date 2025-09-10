"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";

interface NavigationControlsProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  canSubmit: boolean;
}

/**
 * Prev/Next/Submit with correct disabled rules and accessibility.
 * Handles navigation state and provides clear visual feedback.
 */
export function NavigationControls({
  onPrev,
  onNext,
  onSubmit,
  canGoPrev,
  canGoNext,
  canSubmit,
}: NavigationControlsProps) {
  return (
    <div className="flex justify-between items-center gap-4">
      <Button
        type="button"
        variant="outline"
        onClick={onPrev}
        disabled={!canGoPrev}
        aria-label="Go to previous question"
        className="flex items-center gap-2 bg-transparent"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex gap-2">
        {canSubmit ? (
          <Button
            type="button"
            onClick={onSubmit}
            disabled={!canSubmit}
            aria-label="Submit quiz for grading"
            className="flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4" />
            Submit Quiz
          </Button>
        ) : (
          <Button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            aria-label="Go to next question"
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
