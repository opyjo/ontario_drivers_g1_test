// Navigation Controls Component
// Previous/Next/Submit buttons with intelligent state management

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertTriangle,
  Play,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavigationControlsProps {
  // Navigation state
  currentQuestion: number;
  totalQuestions: number;
  canGoBack: boolean;
  canGoForward: boolean;
  canSubmit: boolean;
  isQuizActive: boolean;

  // Actions
  onPrevious: () => void;
  onNext: () => void;
  onSubmit: () => void;
  onStart?: () => void;
  onRestart?: () => void;

  // UI state
  isLoading?: boolean;
  disabled?: boolean;
  showStartButton?: boolean;
  showRestartButton?: boolean;
  submitButtonText?: string;
  className?: string;

  // Question state
  currentQuestionAnswered?: boolean;
  totalAnswered?: number;
  requireAnswerToAdvance?: boolean;
}

const NavigationControls: React.FC<NavigationControlsProps> = ({
  currentQuestion,
  totalQuestions,
  canGoBack,
  canGoForward,
  canSubmit,
  isQuizActive,
  onPrevious,
  onNext,
  onSubmit,
  onStart,
  onRestart,
  isLoading = false,
  disabled = false,
  showStartButton = false,
  showRestartButton = false,
  submitButtonText = "Submit Quiz",
  className = "",
  currentQuestionAnswered = false,
  totalAnswered = 0,
  requireAnswerToAdvance = false,
}) => {
  const isFirstQuestion = currentQuestion === 1;
  const isLastQuestion = currentQuestion === totalQuestions;

  // Determine if we can advance to next question
  const canAdvance =
    canGoForward && (!requireAnswerToAdvance || currentQuestionAnswered);

  // Calculate completion percentage for submit button styling
  const completionPercentage =
    totalQuestions > 0 ? (totalAnswered / totalQuestions) * 100 : 0;
  const isHighCompletion = completionPercentage >= 80;

  const handleKeyDown = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  // Pre-quiz state (show start button)
  if (showStartButton && !isQuizActive && onStart) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <Button
              onClick={onStart}
              disabled={isLoading || disabled}
              size="lg"
              className="min-w-[120px]"
              onKeyDown={(e) => handleKeyDown(e, onStart)}
            >
              <Play className="h-4 w-4 mr-2" />
              Start Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Post-quiz state (show restart button)
  if (showRestartButton && !isQuizActive && onRestart) {
    return (
      <Card className={cn("w-full", className)}>
        <CardContent className="p-6">
          <div className="flex justify-center">
            <Button
              onClick={onRestart}
              disabled={isLoading || disabled}
              variant="outline"
              size="lg"
              className="min-w-[120px]"
              onKeyDown={(e) => handleKeyDown(e, onRestart)}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restart Quiz
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Active quiz navigation
  return (
    <Card className={cn("w-full", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          {/* Previous Button */}
          <Button
            onClick={onPrevious}
            disabled={!canGoBack || isLoading || disabled}
            variant="outline"
            size="lg"
            className="min-w-[100px]"
            onKeyDown={(e) => handleKeyDown(e, onPrevious)}
            aria-label="Go to previous question"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          {/* Center Info / Submit Area */}
          <div className="flex-1 flex justify-center">
            {isLastQuestion ? (
              // Submit Button (last question)
              <div className="flex flex-col items-center gap-2">
                <Button
                  onClick={onSubmit}
                  disabled={!canSubmit || isLoading || disabled}
                  size="lg"
                  className={cn(
                    "min-w-[140px]",
                    isHighCompletion
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-orange-600 hover:bg-orange-700"
                  )}
                  onKeyDown={(e) => handleKeyDown(e, onSubmit)}
                  aria-label={`${submitButtonText} - ${totalAnswered} of ${totalQuestions} questions answered`}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {submitButtonText}
                </Button>

                {/* Completion warning */}
                {completionPercentage < 100 && (
                  <div className="flex items-center gap-1 text-xs text-orange-600">
                    <AlertTriangle className="h-3 w-3" />
                    {totalQuestions - totalAnswered} unanswered
                  </div>
                )}
              </div>
            ) : (
              // Progress indicator for middle questions
              <div className="text-center">
                <div className="text-sm text-muted-foreground">
                  Question {currentQuestion} of {totalQuestions}
                </div>
                {requireAnswerToAdvance && !currentQuestionAnswered && (
                  <div className="text-xs text-orange-600 mt-1">
                    Answer required to continue
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Next Button */}
          <Button
            onClick={onNext}
            disabled={!canAdvance || isLoading || disabled}
            variant={isLastQuestion ? "outline" : "default"}
            size="lg"
            className="min-w-[100px]"
            onKeyDown={(e) => handleKeyDown(e, onNext)}
            aria-label={isLastQuestion ? "Go to submit" : "Go to next question"}
          >
            {isLastQuestion ? "Review" : "Next"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Keyboard shortcuts hint */}
        <div className="mt-4 flex justify-center text-xs text-muted-foreground">
          <span>Use arrow keys or buttons to navigate</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default NavigationControls;
