"use client";

import type { Question } from "@/types/quiz";

interface AnswerOptionsProps {
  question: Question;
  selectedOptionId?: string | number;
  onSelect: (optionId: string | number) => void;
  disabled?: boolean;
}

/**
 * Modern answer options with sleek card design and enhanced interaction states.
 * Uses radio button semantics for proper accessibility with contemporary styling.
 */
export const AnswerOptions = ({
  question,
  selectedOptionId,
  onSelect,
  disabled = false,
}: AnswerOptionsProps) => {
  const options = [
    { id: "A", text: question.option_a },
    { id: "B", text: question.option_b },
    { id: "C", text: question.option_c },
    { id: "D", text: question.option_d },
  ].filter((o) => Boolean(o.text));

  return (
    <fieldset
      disabled={disabled}
      className="flex-1 space-y-2"
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
            aria-label={`Select option ${option.id}: ${option.text}`}
            className={`
              flex items-center gap-3 p-4 rounded-xl border bg-card/50 cursor-pointer
              transition-colors duration-200 hover:bg-card
              peer-checked:border-primary peer-checked:bg-primary/5
              peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2
              peer-disabled:cursor-not-allowed peer-disabled:opacity-50
              ${disabled ? "cursor-not-allowed opacity-50" : ""}
              ${
                selectedOptionId === option.id
                  ? "border-primary bg-primary/5"
                  : "border-border"
              }
            `}
          >
            <div className="flex items-center gap-3 w-full">
              <div
                className={`
                  w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                  transition-colors duration-200
                  ${
                    selectedOptionId === option.id
                      ? "border-primary bg-primary"
                      : "border-muted-foreground/40"
                  }
                `}
              >
                {selectedOptionId === option.id && (
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  {option.id}
                </span>
              </div>

              <div
                id={`option-${option.id}-text`}
                className="flex-1 text-sm font-medium text-balance"
              >
                {option.text}
              </div>
            </div>
          </label>
        </div>
      ))}
    </fieldset>
  );
};
