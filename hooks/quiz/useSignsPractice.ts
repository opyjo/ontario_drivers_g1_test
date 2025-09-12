// useSignsPractice.ts
// ---------------------------------------
// Specialized hook for the Signs Practice Quiz
// Extends `useQuizBase` with signs-specific setup
// ---------------------------------------

import { useCallback } from "react";
import { QuestionLimit, SignsQuestion } from "@/types/quiz";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { getSignsPracticeQuestions } from "@/lib/quiz/server-actions";

// ✅ Now we import only our modular hooks
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";
import { useSetQuestions, useResetQuiz } from "@/stores/quiz/actions";

// Options accepted by the hook
export interface UseSignsPracticeOptions {
  questionLimit?: QuestionLimit;
  autoStart?: boolean;
}

// Extended return type
export interface UseSignsPracticeReturn extends UseQuizBaseReturn {
  // Signs-specific state
  signsQuestions: SignsQuestion[];

  // Signs-specific actions
  initializePractice: (opts?: {
    questionLimit?: QuestionLimit;
  }) => Promise<void>;
  loadNewQuestions: (limit?: QuestionLimit) => Promise<void>;
  restartPractice: () => Promise<void>;

  // Config
  currentLimit: QuestionLimit;
}

// ---------------------------------------
// Hook implementation
// ---------------------------------------
export function useSignsPractice(
  options: UseSignsPracticeOptions = {}
): UseSignsPracticeReturn {
  const { questionLimit = QUESTION_LIMITS.DEFAULT, autoStart = false } =
    options;

  // Base quiz functionality (loading, error, store state/actions)
  const base = useQuizBase();

  // Direct store actions (slice hooks)
  const setQuestions = useSetQuestions();
  const resetQuiz = useResetQuiz();

  // -------------------------
  // 1. Initialize practice
  // -------------------------
  const initializePractice = useCallback(
    async (initOpts?: { questionLimit?: QuestionLimit }) => {
      const limit = initOpts?.questionLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        // Step 1: reset quiz mode
        await base.storeActions.initializeQuiz("signs_practice");

        // Step 2: fetch signs practice questions
        const questions = await getSignsPracticeQuestions(limit);

        // Step 3: set them in the store
        setQuestions(questions);

        // Step 4: optionally auto start
        if (autoStart) {
          base.storeActions.startQuiz();
        }

        return questions;
      }, "initialize signs practice");
    },
    [base.actions, base.storeActions, setQuestions, questionLimit, autoStart]
  );

  // -------------------------
  // 2. Load a new batch (without reset)
  // -------------------------
  const loadNewQuestions = useCallback(
    async (newLimit?: QuestionLimit) => {
      const limit = newLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        const questions = await getSignsPracticeQuestions(limit);
        setQuestions(questions);

        // Reset to first question
        base.storeActions.goToQuestion(0);

        return questions;
      }, "load new signs questions");
    },
    [questionLimit, setQuestions, base.actions, base.storeActions]
  );

  // -------------------------
  // 3. Restart practice quiz
  // -------------------------
  const restartPractice = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      // Reset everything (clear state)
      resetQuiz();

      // Reinitialize with new question set
      await initializePractice();

      return true;
    }, "restart signs practice");
  }, [base.actions, resetQuiz, initializePractice]);

  // -------------------------
  // 4. Filter signs-only questions
  // -------------------------
  const signsQuestions = base.quiz.questions.filter(
    (q): q is SignsQuestion => q.question_type === "signs"
  );

  // -------------------------
  // Final return
  // -------------------------
  return {
    ...base, // all base quiz state/actions
    signsQuestions,
    initializePractice,
    loadNewQuestions,
    restartPractice,
    currentLimit: questionLimit,
  };
}

export default useSignsPractice;
