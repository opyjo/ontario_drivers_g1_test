"use client";

import { Flag } from "lucide-react";
import type { Question } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface QuestionNavigatorProps {
  readonly questions: ReadonlyArray<Question>;
  readonly currentIndex: number;
  readonly answeredIds: ReadonlySet<number>;
  readonly flaggedIds: ReadonlySet<number>;
  readonly onGoToQuestion: (index: number) => void;
}

export function QuestionNavigator({
  questions,
  currentIndex,
  answeredIds,
  flaggedIds,
  onGoToQuestion,
}: QuestionNavigatorProps) {
  return (
    <aside className="rounded-xl border border-border bg-card p-4 shadow-sm lg:sticky lg:top-20">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-bold">Question navigator</h3>
        <span className="text-xs text-muted-foreground">
          {answeredIds.size}/{questions.length}
        </span>
      </div>

      <div className="grid grid-cols-5 gap-2" role="list" aria-label="Quiz questions">
        {questions.map((question, index) => {
          const isCurrent = index === currentIndex;
          const isAnswered = answeredIds.has(question.id);
          const isFlagged = flaggedIds.has(question.id);

          return (
            <button
              key={question.id}
              type="button"
              onClick={() => onGoToQuestion(index)}
              aria-label={`Question ${index + 1}: ${
                isAnswered ? "answered" : "unanswered"
              }${isFlagged ? ", flagged for review" : ""}`}
              aria-current={isCurrent ? "step" : undefined}
              className={cn(
                "relative flex aspect-square min-h-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isAnswered
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary/60 hover:text-foreground",
                isCurrent && "ring-2 ring-primary ring-offset-2 ring-offset-background"
              )}
            >
              {index + 1}
              {isFlagged ? (
                <Flag
                  className="absolute -right-1 -top-1 h-3.5 w-3.5 fill-amber-500 text-amber-600"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          );
        })}
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm bg-primary" aria-hidden="true" />
          Answered
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-sm border border-border bg-background" aria-hidden="true" />
          Unanswered
        </span>
        <span className="flex items-center gap-1.5">
          <Flag className="h-3 w-3 fill-amber-500 text-amber-600" aria-hidden="true" />
          Flagged
        </span>
      </div>
    </aside>
  );
}
