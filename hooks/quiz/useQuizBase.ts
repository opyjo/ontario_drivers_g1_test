// Base Quiz Hook - Shared functionality for all quiz types
// Provides common quiz operations and state management

import { useState, useCallback } from "react";
import { Question, QuizMode, QuizResult } from "@/types/quiz";
import { useQuizActions, useQuizSelectors } from "@/stores/quiz";

interface QuizBaseState {
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

interface QuizBaseActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  handleAsyncOperation: <T>(
    operation: () => Promise<T>,
    operationName?: string
  ) => Promise<T | null>;
}

export interface UseQuizBaseReturn {
  // State from this hook
  state: QuizBaseState;

  // Actions from this hook
  actions: QuizBaseActions;

  // Store state (optimized selectors)
  quiz: {
    mode: QuizMode;
    questions: Question[];
    currentQuestion: Question | null;
    currentQuestionNumber: number;
    totalQuestions: number;
    progressPercentage: number;
    isActive: boolean;
    isCompleted: boolean;
    result: QuizResult | null;
    canSubmit: boolean;
    canGoNext: boolean;
    canGoPrevious: boolean;
  };

  // Store actions
  storeActions: {
    initializeQuiz: (mode: QuizMode) => Promise<void>;
    startQuiz: () => void;
    resetQuiz: () => void;
    submitQuiz: () => Promise<any>;
    selectAnswer: (questionId: number, option: string) => void;
    nextQuestion: () => void;
    previousQuestion: () => void;
    goToQuestion: (index: number) => void;
    setQuestions: (questions: Question[]) => void;
  };
}

export function useQuizBase(): UseQuizBaseReturn {
  // Local state for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Store integration
  const storeActions = useQuizActions();
  const selectors = useQuizSelectors();

  // Clear error handler
  const clearError = useCallback(() => {
    setError(null);
    storeActions.clearError();
  }, [storeActions]);

  // Generic async operation handler with error handling
  const handleAsyncOperation = useCallback(
    async <T>(
      operation: () => Promise<T>,
      operationName = "operation"
    ): Promise<T | null> => {
      try {
        setIsLoading(true);
        clearError();

        const result = await operation();

        setIsLoading(false);
        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to execute ${operationName}`;

        setError(errorMessage);
        storeActions.setError(errorMessage);
        setIsLoading(false);

        console.error(`Error in ${operationName}:`, error);
        return null;
      }
    },
    [clearError, storeActions]
  );

  return {
    // Local state
    state: {
      isLoading,
      error,
      isInitialized,
    },

    // Local actions
    actions: {
      setLoading: setIsLoading,
      setError: (err) => {
        setError(err);
        storeActions.setError(err);
      },
      clearError,
      handleAsyncOperation,
    },

    // Store state (optimized)
    quiz: {
      mode: selectors.mode,
      questions: selectors.questions,
      currentQuestion: selectors.currentQuestion,
      currentQuestionNumber: selectors.currentQuestionNumber,
      totalQuestions: selectors.totalQuestions,
      progressPercentage: selectors.progressPercentage,
      isActive: selectors.isActive,
      isCompleted: selectors.isCompleted,
      result: selectors.result,
      canSubmit: selectors.canSubmit,
      canGoNext: selectors.canGoNext,
      canGoPrevious: selectors.canGoPrevious,
    },

    // Store actions
    storeActions: {
      initializeQuiz: storeActions.initializeQuiz,
      startQuiz: storeActions.startQuiz,
      resetQuiz: storeActions.resetQuiz,
      submitQuiz: storeActions.submitQuiz,
      selectAnswer: storeActions.selectAnswer,
      nextQuestion: storeActions.nextQuestion,
      previousQuestion: storeActions.previousQuestion,
      goToQuestion: storeActions.goToQuestion,
      setQuestions: storeActions.setQuestions,
    },
  };
}
