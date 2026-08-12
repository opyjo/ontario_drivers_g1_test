"use client";

import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavigationControlsProps {
  readonly onPrev: () => void;
  readonly onNext: () => void;
  readonly onSubmit: () => void;
  readonly canGoPrev: boolean;
  readonly canGoNext: boolean;
  readonly allAnswered: boolean;
}

export function NavigationControls({
  onPrev,
  onNext,
  onSubmit,
  canGoPrev,
  canGoNext,
  allAnswered,
}: NavigationControlsProps) {
  return (
    <div className="sticky bottom-0 z-30 rounded-xl border border-border bg-background/95 p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/90 sm:bottom-3 sm:p-3">
      <div className="grid grid-cols-3 gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onPrev}
          disabled={!canGoPrev}
          aria-label="Go to previous question"
          className="min-h-11 rounded-lg px-3 text-sm"
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
          <span className="hidden sm:inline">Previous</span>
        </Button>

        <Button
          type="button"
          variant={allAnswered ? "default" : "outline"}
          onClick={onSubmit}
          aria-label={
            allAnswered
              ? "Review and submit quiz"
              : "Review unanswered questions before submitting"
          }
          className={`min-h-11 rounded-lg px-2 text-sm sm:px-3 ${
            allAnswered
              ? "font-semibold"
              : "border-primary/40 text-primary hover:bg-primary/5 hover:text-primary"
          }`}
        >
          <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
          <span className="sm:hidden">Review</span>
          <span className="hidden sm:inline">Review &amp; Submit</span>
        </Button>

        <Button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          aria-label="Go to next question"
          variant={allAnswered ? "outline" : "default"}
          className="min-h-11 rounded-lg px-3 text-sm font-semibold"
        >
          <span>Next</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
