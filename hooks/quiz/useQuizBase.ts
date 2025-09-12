// useQuizBase.ts
// ----------------------------------------------------
// Shared base hook for all quiz types
// Uses slice-based Zustand hooks for stability
// ----------------------------------------------------

import { useState, useCallback } from "react";
import { QuizMode, QuizResult, Question } from "@/types/quiz";

// ✅ Slice selectors (read-only slices)
import {
  useQuizMode,
  useQuizQuestions,
  useCurrentQuestion,
  useCurrentQuestionNumber,
  useTotalQuestions,
  useProgressPercentage,
  useIsActive,
  useIsCompleted,
  useQuizResult,
  useCanSubmit,
  useCanGoNext,
  useCanGoPrevious,
} from "@/stores/quiz/selectors";

// ✅ Slice actions (mutations)
import {
  useInitializeQuiz,
  useStartQuiz,
  useResetQuiz,
  useSubmitQuiz,
  useSelectAnswer,
  useNextQuestion,
  usePreviousQuestion,
  useGoToQuestion,
  useSetQuestions,
  useSetError,
  useClearError,
} from "@/stores/quiz/actions";

// ----------------------------------------------------
// Local UI-only state (loading + error + initialized)
// ----------------------------------------------------
interface QuizBaseState {
  isLoading: boolean;
  error: string | null;
  isInitialized: boolean;
}

// Local helper actions
interface QuizBaseActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
  handleAsyncOperation: <T>(
    op: () => Promise<T>,
    opName?: string
  ) => Promise<T | null>;
}

export interface UseQuizBaseReturn {
  // Local UI state
  state: QuizBaseState;

  // Local UI actions
  actions: QuizBaseActions;

  // Store-derived state
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
    initializeQuiz: ReturnType<typeof useInitializeQuiz>;
    startQuiz: ReturnType<typeof useStartQuiz>;
    resetQuiz: ReturnType<typeof useResetQuiz>;
    submitQuiz: ReturnType<typeof useSubmitQuiz>;
    selectAnswer: ReturnType<typeof useSelectAnswer>;
    nextQuestion: ReturnType<typeof useNextQuestion>;
    previousQuestion: ReturnType<typeof usePreviousQuestion>;
    goToQuestion: ReturnType<typeof useGoToQuestion>;
    setQuestions: ReturnType<typeof useSetQuestions>;
  };
}

// ----------------------------------------------------
// Implementation
// ----------------------------------------------------
export function useQuizBase(): UseQuizBaseReturn {
  // Local UI-only state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setErrorState] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Selectors (stable slices)
  const mode = useQuizMode();
  const questions = useQuizQuestions();
  const currentQuestion = useCurrentQuestion();
  const currentQuestionNumber = useCurrentQuestionNumber();
  const totalQuestions = useTotalQuestions();
  const progressPercentage = useProgressPercentage();
  const isActive = useIsActive();
  const isCompleted = useIsCompleted();
  const result = useQuizResult();
  const canSubmit = useCanSubmit();
  const canGoNext = useCanGoNext();
  const canGoPrevious = useCanGoPrevious();

  // ✅ Actions (stable references)
  const initializeQuiz = useInitializeQuiz();
  const startQuiz = useStartQuiz();
  const resetQuiz = useResetQuiz();
  const submitQuiz = useSubmitQuiz();
  const selectAnswer = useSelectAnswer();
  const nextQuestion = useNextQuestion();
  const previousQuestion = usePreviousQuestion();
  const goToQuestion = useGoToQuestion();
  const setQuestions = useSetQuestions();
  const setError = useSetError();
  const clearError = useClearError();

  // Local error handler wraps both local + store resets
  const clearLocalError = useCallback(() => {
    setErrorState(null);
    clearError();
  }, [clearError]);

  // Async operation helper
  const handleAsyncOperation = useCallback(
    async <T>(
      op: () => Promise<T>,
      opName = "operation"
    ): Promise<T | null> => {
      try {
        setIsLoading(true);
        clearLocalError();
        const result = await op();
        setIsLoading(false);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : `Failed to execute ${opName}`;
        setErrorState(message);
        setError(message);
        setIsLoading(false);
        console.error(`Error in ${opName}:`, err);
        return null;
      }
    },
    [clearLocalError, setError]
  );

  // ------------------------------------------------
  // Return combined API
  // ------------------------------------------------
  return {
    state: { isLoading, error, isInitialized },
    actions: {
      setLoading: setIsLoading,
      setError: (err) => {
        setErrorState(err);
        setError(err);
      },
      clearError: clearLocalError,
      handleAsyncOperation,
    },
    quiz: {
      mode,
      questions,
      currentQuestion,
      currentQuestionNumber,
      totalQuestions,
      progressPercentage,
      isActive,
      isCompleted,
      result,
      canSubmit,
      canGoNext,
      canGoPrevious,
    },
    storeActions: {
      initializeQuiz,
      startQuiz,
      resetQuiz,
      submitQuiz,
      selectAnswer,
      nextQuestion,
      previousQuestion,
      goToQuestion,
      setQuestions,
    },
  };
}
