// Specialized hook for road signs practice
// Builds ON TOP of useQuizBase and adds:
// - Fetching sign questions from server
// - Signs-specific actions (init, load new, restart)
// - Config for question limit
// - Filtering only "signs" type questions

import { useCallback } from "react";
import { QuestionLimit, SignsQuestion } from "@/types/quiz";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { getSignsPracticeQuestions } from "@/lib/quiz/server-actions";
// Server-side function to fetch sign questions

import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";

// --------------------------------------
// Options when using this hook
// --------------------------------------
export interface UseSignsPracticeOptions {
  questionLimit?: QuestionLimit; // Max # of questions
  autoStart?: boolean; // Should the quiz auto-start?
}

// --------------------------------------
// Returned API extends base hook
// --------------------------------------
export interface UseSignsPracticeReturn extends UseQuizBaseReturn {
  signsQuestions: SignsQuestion[]; // Only "signs" questions from quiz list

  // Signs-specific actions
  initializePractice: (options?: {
    questionLimit?: QuestionLimit;
  }) => Promise<void>;

  loadNewQuestions: (questionLimit?: QuestionLimit) => Promise<void>;

  restartPractice: () => Promise<void>;

  // Configuration
  currentLimit: QuestionLimit;
}

// --------------------------------------
// Hook Implementation
// --------------------------------------
export function useSignsPractice(
  options: UseSignsPracticeOptions = {}
): UseSignsPracticeReturn {
  // Pull out limit and autostart preference
  const { questionLimit = QUESTION_LIMITS.DEFAULT, autoStart = false } =
    options;

  // Grab base engine (provides state, actions, store access)
  const base = useQuizBase();

  // --------------------------
  // 1. Initialize Practice
  // --------------------------
  // Creates a NEW signs quiz session
  const initializePractice = useCallback(
    async (initOptions?: { questionLimit?: QuestionLimit }) => {
      // Use passed-in override OR fallback to initial limit
      const limit = initOptions?.questionLimit || questionLimit;

      // Use base's async helper to run with error/loading handling
      await base.actions.handleAsyncOperation(async () => {
        // Step 1: Initialize quiz mode in store
        await base.storeActions.initializeQuiz("signs_practice");

        // Step 2: Fetch traffic sign questions from server
        const questions = await getSignsPracticeQuestions(limit);

        // Step 3: Put questions into the quiz store
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

  // --------------------------
  // 2. Load a fresh batch of questions
  // --------------------------
  // Unlike initialize, this does NOT reset the entire quiz
  const loadNewQuestions = useCallback(
    async (newLimit?: QuestionLimit) => {
      const limit = newLimit || questionLimit;

      await base.actions.handleAsyncOperation(async () => {
        // Fetch new questions
        const questions = await getSignsPracticeQuestions(limit);

        // Replace in store
        base.storeActions.setQuestions(questions);

        // Reset quiz pointer to first question
        base.storeActions.goToQuestion(0);

        return questions;
      }, "load new signs questions");
    },
    [questionLimit, base.actions, base.storeActions]
  );

  // --------------------------
  // 3. Restart practice session
  // --------------------------
  // Hard reset + initialize again
  const restartPractice = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      // Clear current quiz progress entirely
      base.storeActions.resetQuiz();

      // Kick off fresh initialization (fetch + start)
      await initializePractice();

      return true;
    }, "restart signs practice");
  }, [base.actions, base.storeActions, initializePractice]);

  // --------------------------
  // 4. Filter to only "signs" type questions
  // --------------------------
  // This ensures type safety and prevents mixing with other modes
  const signsQuestions = base.quiz.questions.filter(
    (question): question is SignsQuestion => question.question_type === "signs"
  );

  // --------------------------
  // 5. Return API outward
  // --------------------------
  return {
    ...base, // all core state + actions from useQuizBase
    signsQuestions, // signs-specific filtered list
    initializePractice, // start a new signs quiz
    loadNewQuestions, // load different batch of signs
    restartPractice, // reset and rerun
    currentLimit: questionLimit, // current configured question limit
  };
}

// Default export for convenience
export default useSignsPractice;
