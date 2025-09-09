// Rules Practice Quiz Hook
// Specialized hook for rules of the road practice with unlimited questions

import { useCallback } from "react";
import { QuestionLimit, RulesQuestion } from "@/types/quiz";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { getRulesPracticeQuestions } from "@/lib/quiz/server-actions";
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";

export interface UseRulesPracticeOptions {
  questionLimit?: QuestionLimit;
  autoStart?: boolean;
}

export interface UseRulesPracticeReturn extends UseQuizBaseReturn {
  // Rules-specific state
  rulesQuestions: RulesQuestion[];

  // Rules-specific actions
  initializePractice: (options?: {
    questionLimit?: QuestionLimit;
  }) => Promise<void>;
  loadNewQuestions: (questionLimit?: QuestionLimit) => Promise<void>;
  restartPractice: () => Promise<void>;

  // Configuration
  currentLimit: QuestionLimit;
}

export function useRulesPractice(
  options: UseRulesPracticeOptions = {}
): UseRulesPracticeReturn {
  const { questionLimit = QUESTION_LIMITS.DEFAULT, autoStart = false } =
    options;

  // Base quiz functionality
  const base = useQuizBase();

  // Initialize rules practice session
  const initializePractice = useCallback(
    async (initOptions?: { questionLimit?: QuestionLimit }) => {
      const limit = initOptions?.questionLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        // Step 1: Initialize quiz state
        await base.storeActions.initializeQuiz("rules_practice");

        // Step 2: Fetch rules questions from server
        const questions = await getRulesPracticeQuestions(limit);

        // Step 3: Load questions into store
        base.storeActions.setQuestions(questions);

        // Step 4: Auto-start if requested
        if (autoStart) {
          base.storeActions.startQuiz();
        }

        return questions;
      }, "initialize rules practice");
    },
    [questionLimit, autoStart, base.actions, base.storeActions]
  );

  // Load new set of questions without resetting progress
  const loadNewQuestions = useCallback(
    async (newLimit?: QuestionLimit) => {
      const limit = newLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        const questions = await getRulesPracticeQuestions(limit);
        base.storeActions.setQuestions(questions);

        // Reset to first question
        base.storeActions.goToQuestion(0);

        return questions;
      }, "load new rules questions");
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
    }, "restart rules practice");
  }, [base.actions, base.storeActions, initializePractice]);

  // Filter questions to only rules questions (type-safe)
  const rulesQuestions = base.quiz.questions.filter(
    (question): question is RulesQuestion => question.question_type === "rules"
  );

  return {
    // Inherit all base functionality
    ...base,

    // Rules-specific state
    rulesQuestions,

    // Rules-specific actions
    initializePractice,
    loadNewQuestions,
    restartPractice,

    // Configuration
    currentLimit: questionLimit,
  };
}

// Default export for convenience
export default useRulesPractice;
