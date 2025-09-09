// Incorrect Questions Review Hook
// Specialized hook for reviewing previously missed questions

import { useCallback } from "react";
import { Question, SignsQuestion, RulesQuestion } from "@/types/quiz";
import { getIncorrectQuestions } from "@/lib/quiz/server-actions";
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";

export interface UseIncorrectQuestionsOptions {
  userId?: string;
  questionType?: "signs" | "rules" | "all";
  autoStart?: boolean;
}

export interface UseIncorrectQuestionsReturn extends UseQuizBaseReturn {
  // Incorrect questions state
  incorrectQuestions: Question[];
  signsIncorrect: SignsQuestion[];
  rulesIncorrect: RulesQuestion[];
  hasIncorrectQuestions: boolean;

  // Review-specific actions
  initializeReview: (options?: {
    userId?: string;
    questionType?: "signs" | "rules" | "all";
  }) => Promise<void>;
  loadIncorrectQuestions: (
    userId: string,
    questionType?: "signs" | "rules" | "all"
  ) => Promise<void>;
  restartReview: () => Promise<void>;

  // Configuration
  currentUserId: string | null;
  currentQuestionType: "signs" | "rules" | "all";

  // Review stats
  reviewStats: {
    totalIncorrect: number;
    signsIncorrect: number;
    rulesIncorrect: number;
    reviewProgress: number;
  };
}

export function useIncorrectQuestions(
  options: UseIncorrectQuestionsOptions = {}
): UseIncorrectQuestionsReturn {
  const { userId = null, questionType = "all", autoStart = false } = options;

  // Base quiz functionality
  const base = useQuizBase();

  // Initialize incorrect questions review
  const initializeReview = useCallback(
    async (initOptions?: {
      userId?: string;
      questionType?: "signs" | "rules" | "all";
    }) => {
      const reviewUserId = initOptions?.userId || userId;
      const reviewType = initOptions?.questionType || questionType;

      if (!reviewUserId) {
        base.actions.setError(
          "User ID is required for incorrect questions review"
        );
        return;
      }

      await base.actions.handleAsyncOperation(async () => {
        // Step 1: Initialize quiz state (use signs_practice mode as base)
        await base.storeActions.initializeQuiz("signs_practice");

        // Step 2: Fetch incorrect questions from server
        const questions = await getIncorrectQuestions(reviewUserId, reviewType);

        // Step 3: Check if user has any incorrect questions
        if (questions.length === 0) {
          base.actions.setError(
            reviewType === "all"
              ? "No incorrect questions found. Great job!"
              : `No incorrect ${reviewType} questions found. Great job!`
          );
          return [];
        }

        // Step 4: Load questions into store
        base.storeActions.setQuestions(questions);

        // Step 5: Auto-start if requested
        if (autoStart) {
          base.storeActions.startQuiz();
        }

        return questions;
      }, "initialize incorrect questions review");
    },
    [userId, questionType, autoStart, base.actions, base.storeActions]
  );

  // Load incorrect questions for a specific user and type
  const loadIncorrectQuestions = useCallback(
    async (
      reviewUserId: string,
      reviewType: "signs" | "rules" | "all" = "all"
    ) => {
      await base.actions.handleAsyncOperation(async () => {
        const questions = await getIncorrectQuestions(reviewUserId, reviewType);
        base.storeActions.setQuestions(questions);

        // Reset to first question
        base.storeActions.goToQuestion(0);

        return questions;
      }, "load incorrect questions");
    },
    [base.actions, base.storeActions]
  );

  // Restart review (reset and reload questions)
  const restartReview = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      // Reset quiz state
      base.storeActions.resetQuiz();

      // Initialize review again
      await initializeReview();

      return true;
    }, "restart incorrect questions review");
  }, [base.actions, base.storeActions, initializeReview]);

  // Separate questions by type (type-safe)
  const incorrectQuestions = base.quiz.questions;

  const signsIncorrect = incorrectQuestions.filter(
    (question): question is SignsQuestion => question.question_type === "signs"
  );

  const rulesIncorrect = incorrectQuestions.filter(
    (question): question is RulesQuestion => question.question_type === "rules"
  );

  // Check if user has any incorrect questions
  const hasIncorrectQuestions = incorrectQuestions.length > 0;

  // Review statistics
  const reviewStats = {
    totalIncorrect: incorrectQuestions.length,
    signsIncorrect: signsIncorrect.length,
    rulesIncorrect: rulesIncorrect.length,
    reviewProgress: base.quiz.progressPercentage,
  };

  return {
    // Inherit all base functionality
    ...base,

    // Incorrect questions state
    incorrectQuestions,
    signsIncorrect,
    rulesIncorrect,
    hasIncorrectQuestions,

    // Review-specific actions
    initializeReview,
    loadIncorrectQuestions,
    restartReview,

    // Configuration
    currentUserId: userId,
    currentQuestionType: questionType,

    // Review stats
    reviewStats,
  };
}

// Default export for convenience
export default useIncorrectQuestions;
