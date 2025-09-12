// useRulesPractice.ts
// ---------------------------------------
// Specialized hook for "Rules of the Road" practice quiz
// Extends useQuizBase with rules-specific logic
// ---------------------------------------

import { useCallback } from "react";
import { QuestionLimit, RulesQuestion } from "@/types/quiz";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { getRulesPracticeQuestions } from "@/lib/quiz/server-actions";

// ✅ Base engine hook
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";

// ✅ Slice actions for direct interaction with the store
import { useSetQuestions, useResetQuiz } from "@/stores/quiz/actions";

export interface UseRulesPracticeOptions {
  questionLimit?: QuestionLimit;
  autoStart?: boolean;
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
}

export function useRulesPractice(
  options: UseRulesPracticeOptions = {}
): UseRulesPracticeReturn {
  const { questionLimit = QUESTION_LIMITS.DEFAULT, autoStart = false } =
    options;

  // Base quiz engine (loading, UI state, store APIs)
  const base = useQuizBase();

  // Slice actions
  const setQuestions = useSetQuestions();
  const resetQuiz = useResetQuiz();

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
        const questions = await getRulesPracticeQuestions(limit);

        // Step 3: Load questions into store
        setQuestions(questions);

        // Step 4: Auto-start if requested
        if (autoStart) {
          base.storeActions.startQuiz();
        }

        return questions;
      }, "initialize rules practice");
    },
    [questionLimit, autoStart, base.actions, base.storeActions, setQuestions]
  );

  // -----------------------------
  // 2. Load new set of questions
  // -----------------------------
  const loadNewQuestions = useCallback(
    async (newLimit?: QuestionLimit) => {
      const limit = newLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        const questions = await getRulesPracticeQuestions(limit);
        setQuestions(questions);

        // Reset pointer to first question
        base.storeActions.goToQuestion(0);

        return questions;
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
  };
}

export default useRulesPractice;
