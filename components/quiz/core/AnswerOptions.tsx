"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import type { Question } from "@/types/quiz";
import { cn } from "@/lib/utils";

interface AnswerOptionsProps {
  readonly question: Question;
  readonly selectedOptionId?: string | number;
  readonly onSelect: (optionId: string | number) => void;
  readonly disabled?: boolean;
  readonly revealAnswer?: boolean;
}

export function AnswerOptions({
  question,
  selectedOptionId,
  onSelect,
  disabled = false,
  revealAnswer = false,
}: AnswerOptionsProps) {
  const options = [
    { id: "A", text: question.option_a },
    { id: "B", text: question.option_b },
    { id: "C", text: question.option_c },
    { id: "D", text: question.option_d },
  ].filter((option) => Boolean(option.text));
  const correctOption = question.correct_option.toUpperCase();

  return (
    <fieldset disabled={disabled} className="space-y-3" aria-label="Answer options">
      <legend className="sr-only">Choose one answer</legend>

      {options.map((option) => {
        const isSelected = selectedOptionId === option.id;
        const isCorrect = revealAnswer && option.id === correctOption;
        const isIncorrect = revealAnswer && isSelected && !isCorrect;
        const inputId = `question-${question.id}-option-${option.id}`;

        return (
          <div key={option.id} className="relative">
            <input
              type="radio"
              id={inputId}
              name={`quiz-answer-${question.id}`}
              value={option.id}
              checked={isSelected}
              onChange={() => onSelect(option.id)}
              disabled={disabled}
              className="peer sr-only"
            />
            <label
              htmlFor={inputId}
              className={cn(
                "flex min-h-14 cursor-pointer items-center justify-between rounded-xl border bg-card p-4 text-foreground shadow-sm transition-colors",
                "hover:border-primary/60 hover:bg-primary/5 peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2",
                isSelected &&
                  !revealAnswer &&
                  "border-primary bg-primary/10 ring-1 ring-primary",
                isCorrect &&
                  "border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-100",
                isIncorrect &&
                  "border-rose-600 bg-rose-50 text-rose-950 ring-1 ring-rose-600 dark:bg-rose-950/50 dark:text-rose-100",
                disabled && "cursor-not-allowed opacity-70"
              )}
            >
              <span className="flex min-w-0 flex-1 items-center gap-3 pr-2">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-muted text-sm font-bold text-muted-foreground",
                    isSelected && !revealAnswer &&
                      "border-primary bg-primary text-primary-foreground",
                    isCorrect &&
                      "border-emerald-600 bg-emerald-600 text-white",
                    isIncorrect && "border-rose-600 bg-rose-600 text-white"
                  )}
                >
                  {option.id}
                </span>
                <span className="text-sm font-medium leading-6 sm:text-base">
                  {option.text}
                </span>
              </span>

              {isCorrect ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" aria-label="Correct answer" />
              ) : null}
              {isIncorrect ? (
                <XCircle className="h-5 w-5 shrink-0 text-rose-700 dark:text-rose-300" aria-label="Incorrect answer" />
              ) : null}
              {isSelected && !revealAnswer ? (
                <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" aria-label="Selected answer" />
              ) : null}
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
