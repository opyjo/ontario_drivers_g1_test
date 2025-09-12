// Base Quiz Hook
// Shared across all quiz types (Signs, Rules, Mixed, etc.)
// Provides common quiz operations and connects to global store

import { useState, useCallback } from "react";
import { Question, QuizMode, QuizResult } from "@/types/quiz";
import { useQuizActions, useQuizSelectors } from "@/stores/quiz";

// ----------------------------------------
// Local state shape inside this hook
// ----------------------------------------
interface QuizBaseState {
  isLoading: boolean; // True while an async op (fetch, submit) is running
  error: string | null; // Human-readable error message if something fails
  isInitialized: boolean; // Whether a quiz session has been initialized
}

// ----------------------------------------
// Local action methods this hook offers
// ----------------------------------------
interface QuizBaseActions {
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void; // Reset errors
  handleAsyncOperation: <T>(
    operation: () => Promise<T>, // Any async logic (fetch, reset, submit)
    operationName?: string // Helpful name for logging/debug
  ) => Promise<T | null>; // Centralized try/catch wrapper
}

// ----------------------------------------
// What the hook returns
// ----------------------------------------
export interface UseQuizBaseReturn {
  // Local state flags
  state: QuizBaseState;

  // Local helper actions
  actions: QuizBaseActions;

  // Derived/selected quiz state from global store
  quiz: {
    mode: QuizMode; // Which quiz mode is active (e.g. "signs_practice")
    questions: Question[]; // Current list of loaded questions
    currentQuestion: Question | null;
    currentQuestionNumber: number;
    totalQuestions: number;
    progressPercentage: number;
    isActive: boolean; // Is quiz in progress?
    isCompleted: boolean; // Has quiz been submitted?
    result: QuizResult | null; // Final result after completion
    canSubmit: boolean; // Ready to submit?
    canGoNext: boolean; // Next button enabled?
    canGoPrevious: boolean; // Prev button enabled?
  };

  // Global store actions to mutate state
  storeActions: {
    initializeQuiz: (mode: QuizMode) => Promise<void>; // Reset/setup state
    startQuiz: () => void; // Start the quiz
    resetQuiz: () => void; // Clear all state
    submitQuiz: () => Promise<any>; // Submit and compute results
    selectAnswer: (questionId: number, option: string) => void; // Save user answer
    nextQuestion: () => void;
    previousQuestion: () => void;
    goToQuestion: (index: number) => void;
    setQuestions: (questions: Question[]) => void; // Inject new questions
  };
}

// ----------------------------------------
// Hook Implementation
// ----------------------------------------
export function useQuizBase(): UseQuizBaseReturn {
  const [isLoading, setIsLoading] = useState(false); // For showing spinners
  const [error, setError] = useState<string | null>(null); // For error messages
  const [isInitialized, setIsInitialized] = useState(false); // Track setup status

  // --------------------------
  // 2. Connect to global store
  // --------------------------
  const storeActions = useQuizActions(); // Mutators from the quiz store
  const selectors = useQuizSelectors(); // Optimized selectors to read state slice

  // --------------------------
  // 3. Local error clearing
  // --------------------------
  const clearError = useCallback(() => {
    setError(null); // Clear local error
    storeActions.clearError(); // Clear global error
  }, [storeActions]);

  // --------------------------
  // 4. Async operation handler
  // --------------------------
  const handleAsyncOperation = useCallback(
    async <T>(
      operation: () => Promise<T>,
      operationName = "operation" // Optional label
    ): Promise<T | null> => {
      try {
        // Before running async logic
        setIsLoading(true);
        clearError();

        // Run provided operation (await fetch, reset, submit, etc.)
        const result = await operation();

        // Done successfully
        setIsLoading(false);
        return result;
      } catch (error) {
        // If something blows up
        const errorMessage =
          error instanceof Error
            ? error.message
            : `Failed to execute ${operationName}`;

        // Save locally + push into store
        setError(errorMessage);
        storeActions.setError(errorMessage);

        // Turn off loading
        setIsLoading(false);

        // Debug log
        console.error(`Error in ${operationName}:`, error);
        return null;
      }
    },
    [clearError, storeActions]
  );

  // --------------------------
  // 5. Expose full API outward
  // --------------------------
  return {
    // Local UI-friendly state
    state: { isLoading, error, isInitialized },

    // Local helper actions
    actions: {
      setLoading: setIsLoading,
      setError: (err) => {
        setError(err);
        storeActions.setError(err); // Mirror error into global state too
      },
      clearError,
      handleAsyncOperation,
    },

    // Optimized quiz state pulled from store selectors
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

    // Direct pass-through to quiz store actions
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
