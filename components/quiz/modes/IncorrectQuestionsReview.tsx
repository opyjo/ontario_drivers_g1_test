// useIncorrectQuestions.ts
// ---------------------------------------
// Specialized hook for reviewing incorrect questions
// Extends useQuizBase with review-specific logic
// ---------------------------------------

import { useCallback, useMemo } from "react";
import { RulesQuestion, SignsQuestion } from "@/types/quiz";
import { getIncorrectQuestions } from "@/lib/quiz/server-actions";

// ✅ Base engine hook

import { useQuizBase, UseQuizBaseReturn } from "@/hooks/quiz/useQuizBase";

// ✅ Slice actions
import { useSetQuestions, useResetQuiz } from "@/stores/quiz/actions";

// ---------------------------------------
// Options & Return types
// ---------------------------------------
type IncorrectType = "signs" | "rules" | "all";

export interface UseIncorrectQuestionsOptions {
  userId: string;
  questionType?: IncorrectType;
}

export interface UseIncorrectQuestionsReturn extends UseQuizBaseReturn {
  // Incorrect questions subset by type
  signsQuestions: SignsQuestion[];
  rulesQuestions: RulesQuestion[];
  hasIncorrectQuestions: boolean;

  // Stats
  reviewStats: {
    totalIncorrect: number;
    signsIncorrect: number;
    rulesIncorrect: number;
  };

  // Actions
  initializeReview: (opts?: {
    userId: string;
    questionType?: IncorrectType;
  }) => Promise<void>;
  restartReview: () => Promise<void>;
}

// ---------------------------------------
// Hook implementation
// ---------------------------------------
export function useIncorrectQuestions(
  options: UseIncorrectQuestionsOptions
): UseIncorrectQuestionsReturn {
  const { userId, questionType = "all" } = options;

  // Base engine (loading/error/store)
  const base = useQuizBase();

  // Slice actions
  const setQuestions = useSetQuestions();
  const resetQuiz = useResetQuiz();

  // -----------------------------
  // 1. Initialize incorrect q review
  // -----------------------------
  const initializeReview = useCallback(
    async (initOpts?: {
      userId: string;
      questionType?: "signs" | "rules" | "all";
    }) => {
      const uid = initOpts?.userId || userId;
      const type = initOpts?.questionType || questionType;

      await base.actions.handleAsyncOperation(async () => {
        // Reset quiz mode at start
        await base.storeActions.initializeQuiz("review_incorrect");

        // Fetch incorrect questions from server
        const questions = await getIncorrectQuestions(uid, type);

        // Load into store
        setQuestions(questions);

        // Always auto-start after setting questions
        base.storeActions.startQuiz();

        return questions;
      }, "initialize incorrect review");
    },
    [userId, questionType, base.actions, base.storeActions, setQuestions]
  );

  // -----------------------------
  // 2. Restart review
  // -----------------------------
  const restartReview = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      resetQuiz();
      await initializeReview({ userId, questionType });
      return true;
    }, "restart incorrect review");
  }, [resetQuiz, initializeReview, userId, questionType, base.actions]);

  // -----------------------------
  // 3. Derived slices
  // -----------------------------
  const signsQuestions = base.quiz.questions.filter(
    (q): q is SignsQuestion => q.question_type === "signs"
  );
  const rulesQuestions = base.quiz.questions.filter(
    (q): q is RulesQuestion => q.question_type === "rules"
  );

  const hasIncorrectQuestions = base.quiz.questions.length > 0;

  const reviewStats = useMemo(
    () => ({
      totalIncorrect: base.quiz.questions.length,
      signsIncorrect: signsQuestions.length,
      rulesIncorrect: rulesQuestions.length,
    }),
    [base.quiz.questions.length, signsQuestions.length, rulesQuestions.length]
  );

  // -----------------------------
  // Final return
  // -----------------------------
  return {
    ...base,
    signsQuestions,
    rulesQuestions,
    hasIncorrectQuestions,
    reviewStats,
    initializeReview,
    restartReview,
  };
}

export default useIncorrectQuestions;
