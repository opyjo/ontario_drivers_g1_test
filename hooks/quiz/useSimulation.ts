// useSimulation.ts
// ---------------------------------------------------
// Specialized hook for full G1 driving test simulation
// 20 signs + 20 rules (40 total)
// ---------------------------------------------------

import { useCallback } from "react";
import { SignsQuestion, RulesQuestion } from "@/types/quiz";
import { G1_TEST_CONFIG } from "@/lib/quiz/constants";
import { getG1SimulationQuestions } from "@/lib/quiz/server-actions";

// Base hook
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";

// Slice store actions
import {
  useSetQuestions,
  useResetQuiz,
  useIsQuestionAnswered,
} from "@/stores/quiz/actions";

// ---------------------------------------------------
// Hook return type
// ---------------------------------------------------
export interface UseSimulationOptions {}

export interface UseSimulationReturn extends UseQuizBaseReturn {
  // G1-specific state
  signsQuestions: SignsQuestion[];
  rulesQuestions: RulesQuestion[];
  isValidG1Format: boolean;

  // G1 configuration
  testConfig: {
    totalQuestions: number;
    signsRequired: number;
    rulesRequired: number;
    passingScore: number;
    passingPercentage: number;
  };

  // Actions
  initializeSimulation: () => Promise<void>;
  startSimulation: () => void;
  restartSimulation: () => Promise<void>;

  // Progress tracking
  signsAnswered: number;
  rulesAnswered: number;
  signsCorrect: number;
  rulesCorrect: number;

  // Helpers
  canStartSimulation: boolean;
}

// ---------------------------------------------------
// Implementation
// ---------------------------------------------------
export function useSimulation(
  options: UseSimulationOptions = {}
): UseSimulationReturn {
  // No options currently; all modes auto-start

  // Base engine
  const base = useQuizBase();

  // Slice actions
  const setQuestions = useSetQuestions();
  const resetQuiz = useResetQuiz();
  const isQuestionAnswered = useIsQuestionAnswered();

  // -----------------------------
  // Initialize simulation
  // -----------------------------
  const initializeSimulation = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      // Step 1: initialize store for "simulation" mode
      await base.storeActions.initializeQuiz("simulation");

      // Step 2: fetch 40 questions (20 signs + 20 rules)
      const questions = await getG1SimulationQuestions();

      // Step 3: validate format counts
      const signsCount = questions.filter(
        (q) => q.question_type === "signs"
      ).length;
      const rulesCount = questions.filter(
        (q) => q.question_type === "rules"
      ).length;

      if (
        questions.length !== G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST ||
        signsCount !== G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST ||
        rulesCount !== G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST
      ) {
        throw new Error(
          `Invalid G1 test format: expected ${G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST} signs + ${G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST} rules = ${G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST} total`
        );
      }

      // Step 4: set in store
      setQuestions(questions);

      // Step 5: always auto-start
      base.storeActions.startQuiz();

      return questions;
    }, "initialize G1 simulation");
  }, [base.actions, base.storeActions, setQuestions]);

  // -----------------------------
  // Start simulation manually
  // -----------------------------
  const startSimulation = useCallback(() => {
    if (
      base.quiz.questions.length === G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST
    ) {
      base.storeActions.startQuiz();
    } else {
      base.actions.setError("Cannot start simulation: Invalid question count");
    }
  }, [base.quiz.questions.length, base.storeActions, base.actions]);

  // -----------------------------
  // Restart simulation
  // -----------------------------
  const restartSimulation = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      resetQuiz();
      await initializeSimulation();
      return true;
    }, "restart G1 simulation");
  }, [base.actions, resetQuiz, initializeSimulation]);

  // -----------------------------
  // Separate into types
  // -----------------------------
  const signsQuestions = base.quiz.questions.filter(
    (q): q is SignsQuestion => q.question_type === "signs"
  );
  const rulesQuestions = base.quiz.questions.filter(
    (q): q is RulesQuestion => q.question_type === "rules"
  );

  // -----------------------------
  // Validate format
  // -----------------------------
  const isValidG1Format =
    base.quiz.questions.length === G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST &&
    signsQuestions.length === G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST &&
    rulesQuestions.length === G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST;

  // -----------------------------
  // Progress by type
  // -----------------------------
  const signsAnswered = signsQuestions.filter((q) =>
    isQuestionAnswered(q.id)
  ).length;
  const rulesAnswered = rulesQuestions.filter((q) =>
    isQuestionAnswered(q.id)
  ).length;

  // Placeholder: correct counts are only fully known after submission + grading
  const signsCorrect = 0;
  const rulesCorrect = 0;

  // -----------------------------
  // G1 Test config constants
  // -----------------------------
  const testConfig = {
    totalQuestions: G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST,
    signsRequired: G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST,
    rulesRequired: G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST,
    passingScore: G1_TEST_CONFIG.MINIMUM_CORRECT_ANSWERS,
    passingPercentage: G1_TEST_CONFIG.PASSING_PERCENTAGE,
  };

  const canStartSimulation = isValidG1Format && !base.quiz.isActive;

  // -----------------------------
  // Return API
  // -----------------------------
  return {
    ...base,
    signsQuestions,
    rulesQuestions,
    isValidG1Format,
    testConfig,
    initializeSimulation,
    startSimulation,
    restartSimulation,
    signsAnswered,
    rulesAnswered,
    signsCorrect,
    rulesCorrect,
    canStartSimulation,
  };
}

export default useSimulation;
