// Signs Practice Quiz Hook
// Specialized hook for road signs practice with unlimited questions

import { useCallback } from "react";
import { QuestionLimit, SignsQuestion } from "@/types/quiz";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { getSignsPracticeQuestions } from "@/lib/quiz/server-actions";
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";

export interface UseSignsPracticeOptions {
  questionLimit?: QuestionLimit;
  autoStart?: boolean;
}

export interface UseSignsPracticeReturn extends UseQuizBaseReturn {
  // Signs-specific state
  signsQuestions: SignsQuestion[];

  // Signs-specific actions
  initializePractice: (options?: {
    questionLimit?: QuestionLimit;
  }) => Promise<void>;
  loadNewQuestions: (questionLimit?: QuestionLimit) => Promise<void>;
  restartPractice: () => Promise<void>;

  // Configuration
  currentLimit: QuestionLimit;
}

export function useSignsPractice(
  options: UseSignsPracticeOptions = {}
): UseSignsPracticeReturn {
  const { questionLimit = QUESTION_LIMITS.DEFAULT, autoStart = false } =
    options;

  // Base quiz functionality
  const base = useQuizBase();

  // Initialize signs practice session
  const initializePractice = useCallback(
    async (initOptions?: { questionLimit?: QuestionLimit }) => {
      const limit = initOptions?.questionLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        // Step 1: Initialize quiz state
        await base.storeActions.initializeQuiz("signs_practice");

        // Step 2: Fetch signs questions from server
        const questions = await getSignsPracticeQuestions(limit);

        // Step 3: Load questions into store
        base.storeActions.setQuestions(questions);

        // Step 4: Auto-start if requested
        if (autoStart) {
          base.storeActions.startQuiz();
        }

        return questions;
      }, "initialize signs practice");
    },
    [questionLimit, autoStart, base.actions, base.storeActions]
  );

  // Load new set of questions without resetting progress
  const loadNewQuestions = useCallback(
    async (newLimit?: QuestionLimit) => {
      const limit = newLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        const questions = await getSignsPracticeQuestions(limit);
        base.storeActions.setQuestions(questions);

        // Reset to first question
        base.storeActions.goToQuestion(0);

        return questions;
      }, "load new signs questions");
    },
    [questionLimit, base.actions, base.storeActions]
  );

  // Restart practice (reset everything and load new questions)
  const restartPractice = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      // Reset quiz state
      base.storeActions.resetQuiz();

      // Initialize with new questions
      await initializePractice();

      return true;
    }, "restart signs practice");
  }, [base.actions, base.storeActions, initializePractice]);

  // Filter questions to only signs questions (type-safe)
  const signsQuestions = base.quiz.questions.filter(
    (question): question is SignsQuestion => question.question_type === "signs"
  );

  return {
    // Inherit all base functionality
    ...base,

    // Signs-specific state
    signsQuestions,

    // Signs-specific actions
    initializePractice,
    loadNewQuestions,
    restartPractice,

    // Configuration
    currentLimit: questionLimit,
  };
}

// Default export for convenience
export default useSignsPractice;
