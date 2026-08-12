// useRulesPractice.ts
// ---------------------------------------
// Specialized hook for "Rules of the Road" practice quiz
// Extends useQuizBase with rules-specific logic
// ---------------------------------------

import { useCallback, useRef, useState } from "react";
import { QuestionLimit, RulesQuestion } from "@/types/quiz";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { getRulesPracticeQuestions } from "@/lib/quiz/server-actions";
import type { QuizAccessDecision } from "@/lib/quiz/access";

// ✅ Base engine hook
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";

// ✅ Slice actions for direct interaction with the store
import { useSetQuestions, useResetQuiz } from "@/stores/quiz/actions";

export interface UseRulesPracticeOptions {
  questionLimit?: QuestionLimit;
}

export interface UseRulesPracticeReturn extends UseQuizBaseReturn {
  // Rules-specific questions (type-safe)
  rulesQuestions: RulesQuestion[];

  // Rules-specific actions
  initializePractice: (options?: {
    questionLimit?: QuestionLimit;
  }) => Promise<void>;
  loadNewQuestions: (questionLimit?: QuestionLimit) => Promise<void>;
  restartPractice: () => Promise<void>;

  // Config
  currentLimit: QuestionLimit;
  access: QuizAccessDecision | null;
}

export function useRulesPractice(
  options: UseRulesPracticeOptions = {}
): UseRulesPracticeReturn {
  const { questionLimit = QUESTION_LIMITS.DEFAULT } = options;

  // Base quiz engine (loading, UI state, store APIs)
  const base = useQuizBase();

  // Slice actions
  const setQuestions = useSetQuestions();
  const resetQuiz = useResetQuiz();
  const [access, setAccess] = useState<QuizAccessDecision | null>(null);
  const sessionIdRef = useRef<string | null>(null);

  const currentSessionId = useCallback(() => {
    sessionIdRef.current ??= crypto.randomUUID();
    return sessionIdRef.current;
  }, []);

  // -----------------------------
  // 1. Initialize rules practice
  // -----------------------------
  const initializePractice = useCallback(
    async (initOptions?: { questionLimit?: QuestionLimit }) => {
      const limit = initOptions?.questionLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        // Step 1: Initialize quiz with "rules_practice" mode
        await base.storeActions.initializeQuiz("rules_practice");

        // Step 2: Fetch rules questions from server
        const response = await getRulesPracticeQuestions(
          limit,
          currentSessionId()
        );
        setAccess(response.access);
        if (!response.ok) return response;

        const { questions } = response;

        // Step 3: Load questions into store
        setQuestions(questions);

        // Step 4: Always auto-start after loading questions
        base.storeActions.startQuiz();

        return response;
      }, "initialize rules practice");
    },
    [questionLimit, base.actions, base.storeActions, currentSessionId, setQuestions]
  );

  // -----------------------------
  // 2. Load new set of questions
  // -----------------------------
  const loadNewQuestions = useCallback(
    async (newLimit?: QuestionLimit) => {
      const limit = newLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        sessionIdRef.current = crypto.randomUUID();
        const response = await getRulesPracticeQuestions(
          limit,
          sessionIdRef.current
        );
        setAccess(response.access);
        if (!response.ok) return response;

        const { questions } = response;
        setQuestions(questions);

        // Reset pointer to first question
        base.storeActions.goToQuestion(0);

        return response;
      }, "load new rules questions");
    },
    [questionLimit, base.actions, base.storeActions, setQuestions]
  );

  // -----------------------------
  // 3. Restart rules practice
  // -----------------------------
  const restartPractice = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      // Reset quiz state fully
      resetQuiz();
      sessionIdRef.current = null;
      setAccess(null);

      // Reinitialize with fresh set
      await initializePractice();

      return true;
    }, "restart rules practice");
  }, [base.actions, resetQuiz, initializePractice]);

  // -----------------------------
  // 4. Filter down to rules questions only
  // -----------------------------
  const rulesQuestions = base.quiz.questions.filter(
    (q): q is RulesQuestion => q.question_type === "rules"
  );

  // -----------------------------
  // 5. Return combined API
  // -----------------------------
  return {
    ...base, // Inherit all base functionality
    rulesQuestions, // Extra state (rules-only)
    initializePractice, // Extra actions
    loadNewQuestions,
    restartPractice,
    currentLimit: questionLimit,
    access,
  };
}

export default useRulesPractice;
