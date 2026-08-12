// useSignsPractice.ts
// ---------------------------------------
// Specialized hook for the Signs Practice Quiz
// Extends `useQuizBase` with signs-specific setup
// ---------------------------------------

import { useCallback, useRef, useState } from "react";
import { QuestionLimit, SignsQuestion } from "@/types/quiz";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { getSignsPracticeQuestions } from "@/lib/quiz/server-actions";
import type { QuizAccessDecision } from "@/lib/quiz/access";

// ✅ Now we import only our modular hooks
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";
import { useSetQuestions, useResetQuiz } from "@/stores/quiz/actions";

// Options accepted by the hook
export interface UseSignsPracticeOptions {
  questionLimit?: QuestionLimit;
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
  access: QuizAccessDecision | null;
}

// ---------------------------------------
// Hook implementation
// ---------------------------------------
export function useSignsPractice(
  options: UseSignsPracticeOptions = {}
): UseSignsPracticeReturn {
  const { questionLimit = QUESTION_LIMITS.DEFAULT } = options;

  // Base quiz functionality (loading, error, store state/actions)
  const base = useQuizBase();

  // Direct store actions (slice hooks)
  const setQuestions = useSetQuestions();
  const resetQuiz = useResetQuiz();
  const [access, setAccess] = useState<QuizAccessDecision | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const currentSessionId = useCallback(() => {
    sessionIdRef.current ??= crypto.randomUUID();
    return sessionIdRef.current;
  }, []);

  // -------------------------
  // 1. Initialize practice
  // -------------------------
  const initializePractice = useCallback(
    async (initOpts?: { questionLimit?: QuestionLimit }) => {
      const limit = initOpts?.questionLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        await base.storeActions.initializeQuiz("signs_practice");

        const response = await getSignsPracticeQuestions(
          limit,
          currentSessionId()
        );
        setAccess(response.access);

        if (!response.ok) return response;

        const { questions } = response;

        if (!questions || questions.length === 0) {
          throw new Error("getSignsPracticeQuestions returned empty/undefined");
        }

        setQuestions(questions);

        // Always start immediately after questions are set
        base.storeActions.startQuiz();

        return response;
      }, "initialize signs practice");
    },
    [base.actions, base.storeActions, currentSessionId, setQuestions, questionLimit]
  );

  // -------------------------
  // 2. Load a new batch (without reset)
  // -------------------------
  const loadNewQuestions = useCallback(
    async (newLimit?: QuestionLimit) => {
      const limit = newLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        sessionIdRef.current = crypto.randomUUID();
        const response = await getSignsPracticeQuestions(
          limit,
          sessionIdRef.current
        );
        setAccess(response.access);
        if (!response.ok) return response;

        const { questions } = response;
        setQuestions(questions);

        // Reset to first question
        base.storeActions.goToQuestion(0);

        return response;
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
      sessionIdRef.current = null;
      setAccess(null);

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
    access,
  };
}

export default useSignsPractice;
