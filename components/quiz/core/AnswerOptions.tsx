"use client";

import type { Question } from "@/types/quiz";

interface AnswerOptionsProps {
  question: Question;
  selectedOptionId?: string | number;
  onSelect: (optionId: string | number) => void;
  disabled?: boolean;
}

/**
 * Render multiple-choice answers with selection, keyboard navigation, and disabled when quiz completed.
 * Uses radio button semantics for proper accessibility.
 */
export function AnswerOptions({
  question,
  selectedOptionId,
  onSelect,
  disabled = false,
}: AnswerOptionsProps) {
  const options = [
    { id: "A", text: question.option_a },
    { id: "B", text: question.option_b },
    { id: "C", text: question.option_c },
    { id: "D", text: question.option_d },
  ].filter((o) => Boolean(o.text));

  return (
    <fieldset
      disabled={disabled}
      className="space-y-3"
      role="radiogroup"
      aria-label="Answer options"
    >
      <legend className="sr-only">Answer options</legend>

      {options.map((option) => (
        <div key={option.id} className="relative">
          <input
            type="radio"
            id={`option-${option.id}`}
            name="quiz-answer"
            value={option.id}
            checked={selectedOptionId === option.id}
            onChange={() => onSelect(option.id)}
            disabled={disabled}
            className="sr-only peer"
            aria-describedby={`option-${option.id}-text`}
          />
          <label
            htmlFor={`option-${option.id}`}
            className={`
              flex items-start gap-3 p-4 rounded-lg border-2 cursor-pointer
              transition-all duration-200 hover:bg-muted/50
              peer-checked:border-primary peer-checked:bg-primary/5
              peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2
              peer-disabled:cursor-not-allowed peer-disabled:opacity-50
              ${disabled ? "cursor-not-allowed opacity-50" : ""}
            `}
          >
            <div
              className={`
              w-5 h-5 rounded-full border-2 flex-shrink-0 mt-0.5
              transition-colors duration-200
              ${
                selectedOptionId === option.id
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/30"
              }
            `}
            >
              {selectedOptionId === option.id && (
                <div className="w-full h-full rounded-full bg-primary-foreground scale-50" />
              )}
            </div>

            <div className="flex-1">
              <div className="font-medium text-sm text-muted-foreground mb-1">
                Option {option.id}
              </div>
              <div id={`option-${option.id}-text`} className="text-balance">
                {option.text}
              </div>
            </div>
          </label>
        </div>
      ))}
    </fieldset>
  );
}
