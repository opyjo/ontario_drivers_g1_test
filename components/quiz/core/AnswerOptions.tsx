// Answer Options Component
// Multiple choice interface with selection state and accessibility

import React from "react";
import { Question, UserAnswer } from "@/types/quiz";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AnswerOptionsProps {
  question: Question;
  selectedAnswer?: UserAnswer;
  onAnswerSelect: (questionId: number, answerKey: string) => void;
  disabled?: boolean;
  showCorrectAnswer?: boolean;
  className?: string;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  disabled = false,
  showCorrectAnswer = false,
  className = "",
}) => {
  if (!question) {
    return (
      <Card className={`w-full ${className}`}>
        <CardContent className="p-6">
          <div className="text-center text-muted-foreground">
            No answer options available
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleAnswerSelect = (answerKey: string) => {
    if (disabled) return;
    onAnswerSelect(question.id, answerKey);
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    answerKey: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleAnswerSelect(answerKey);
    }
  };

  const getAnswerButtonState = (answerKey: string) => {
    const isSelected = selectedAnswer?.selectedOption === answerKey;
    const isCorrect =
      showCorrectAnswer && question.correct_option === answerKey;
    const isIncorrect =
      showCorrectAnswer &&
      selectedAnswer?.selectedOption === answerKey &&
      question.correct_option !== answerKey;

    return {
      isSelected,
      isCorrect,
      isIncorrect,
    };
  };

  const getAnswerButtonClasses = (answerKey: string) => {
    const { isSelected, isCorrect, isIncorrect } =
      getAnswerButtonState(answerKey);

    return cn(
      // Base styles
      "w-full p-4 text-left border-2 transition-all duration-200",
      "hover:shadow-md focus:ring-2 focus:ring-offset-2",
      "min-h-[60px] justify-start",

      // Default state
      "border-border bg-background hover:bg-accent",

      // Selected state (during quiz)
      !showCorrectAnswer &&
        isSelected &&
        "border-primary bg-primary/10 ring-2 ring-primary/20",

      // Correct answer state (results/review)
      showCorrectAnswer && isCorrect && "border-green-500 bg-green-50",

      // Incorrect answer state (results/review)
      showCorrectAnswer && isIncorrect && "border-red-500 bg-red-50",

      // Disabled state
      disabled && "opacity-50 cursor-not-allowed hover:bg-background",

      className
    );
  };

  const getAnswerIcon = (answerKey: string) => {
    const { isSelected, isCorrect, isIncorrect } =
      getAnswerButtonState(answerKey);

    if (showCorrectAnswer && isCorrect) {
      return <Check className="h-5 w-5 text-green-600 flex-shrink-0" />;
    }

    if (showCorrectAnswer && isIncorrect) {
      return (
        <Circle className="h-5 w-5 text-red-600 fill-red-600 flex-shrink-0" />
      );
    }

    if (isSelected) {
      return (
        <Circle className="h-5 w-5 text-primary fill-primary flex-shrink-0" />
      );
    }

    return <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />;
  };

  // Create options object from individual option properties
  const options = {
    a: question.option_a,
    b: question.option_b,
    c: question.option_c,
    d: question.option_d,
  };

  // Sort options by key (A, B, C, D)
  const sortedOptions = Object.entries(options).sort(([a], [b]) =>
    a.localeCompare(b)
  );

  return (
    <Card className={`w-full ${className}`}>
      <CardContent className="p-6">
        <div
          className="space-y-3"
          role="radiogroup"
          aria-labelledby="question-text"
          aria-required="true"
        >
          {sortedOptions.map(([answerKey, answerText]) => (
            <Button
              key={answerKey}
              variant="outline"
              className={getAnswerButtonClasses(answerKey)}
              onClick={() => handleAnswerSelect(answerKey)}
              onKeyDown={(e) => handleKeyDown(e, answerKey)}
              disabled={disabled}
              role="radio"
              aria-checked={selectedAnswer?.selectedOption === answerKey}
              aria-label={`Option ${answerKey}: ${answerText}`}
              tabIndex={0}
            >
              <div className="flex items-start gap-3 w-full">
                {/* Answer Key Letter */}
                <span className="font-semibold text-sm min-w-[24px] mt-0.5">
                  {answerKey}.
                </span>

                {/* Answer Text */}
                <span className="flex-1 text-sm leading-relaxed">
                  {answerText}
                </span>

                {/* Selection Icon */}
                {getAnswerIcon(answerKey)}
              </div>
            </Button>
          ))}
        </div>

        {/* Show correct answer explanation if available */}
        {showCorrectAnswer && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
            <h4 className="font-semibold text-blue-900 mb-2">Explanation:</h4>
            <p className="text-sm text-blue-800 leading-relaxed">
              {question.explanation}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AnswerOptions;
