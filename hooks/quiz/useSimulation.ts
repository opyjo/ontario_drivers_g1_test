// G1 Test Simulation Hook
// Specialized hook for full G1 driving test simulation (20 signs + 20 rules)

import { useCallback } from "react";
import { Question, SignsQuestion, RulesQuestion } from "@/types/quiz";
import { G1_TEST_CONFIG } from "@/lib/quiz/constants";
import { getG1SimulationQuestions } from "@/lib/quiz/server-actions";
import { useQuizBase, UseQuizBaseReturn } from "./useQuizBase";

export interface UseSimulationOptions {
  autoStart?: boolean;
}

export interface UseSimulationReturn extends UseQuizBaseReturn {
  // G1-specific state
  signsQuestions: SignsQuestion[];
  rulesQuestions: RulesQuestion[];
  isValidG1Format: boolean;

  // G1 test configuration
  testConfig: {
    totalQuestions: number;
    signsRequired: number;
    rulesRequired: number;
    passingScore: number;
    passingPercentage: number;
  };

  // G1-specific actions
  initializeSimulation: () => Promise<void>;
  startSimulation: () => void;
  restartSimulation: () => Promise<void>;

  // Progress tracking
  signsAnswered: number;
  rulesAnswered: number;
  signsCorrect: number;
  rulesCorrect: number;

  // Validation helpers
  canStartSimulation: boolean;
}

export function useSimulation(
  options: UseSimulationOptions = {}
): UseSimulationReturn {
  const { autoStart = false } = options;

  // Base quiz functionality
  const base = useQuizBase();

  // Initialize G1 simulation
  const initializeSimulation = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      // Step 1: Initialize quiz state for simulation
      await base.storeActions.initializeQuiz("simulation");

      // Step 2: Fetch G1 simulation questions (20 signs + 20 rules)
      const questions = await getG1SimulationQuestions();

      // Step 3: Validate G1 format
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
          `Invalid G1 test format: Expected ${G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST} signs + ${G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST} rules = ${G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST} total`
        );
      }

      // Step 4: Load questions into store
      base.storeActions.setQuestions(questions);

      // Step 5: Auto-start if requested
      if (autoStart) {
        base.storeActions.startQuiz();
      }

      return questions;
    }, "initialize G1 simulation");
  }, [autoStart, base.actions, base.storeActions]);

  // Start the G1 simulation (with validation)
  const startSimulation = useCallback(() => {
    if (
      base.quiz.questions.length === G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST
    ) {
      base.storeActions.startQuiz();
    } else {
      base.actions.setError("Cannot start simulation: Invalid question count");
    }
  }, [base.quiz.questions.length, base.storeActions, base.actions]);

  // Restart simulation (reset and reload questions)
  const restartSimulation = useCallback(async () => {
    await base.actions.handleAsyncOperation(async () => {
      // Reset quiz state
      base.storeActions.resetQuiz();

      // Initialize with new G1 questions
      await initializeSimulation();

      return true;
    }, "restart G1 simulation");
  }, [base.actions, base.storeActions, initializeSimulation]);

  // Separate questions by type (type-safe)
  const signsQuestions = base.quiz.questions.filter(
    (question): question is SignsQuestion => question.question_type === "signs"
  );

  const rulesQuestions = base.quiz.questions.filter(
    (question): question is RulesQuestion => question.question_type === "rules"
  );

  // Validate G1 format
  const isValidG1Format =
    base.quiz.questions.length === G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST &&
    signsQuestions.length === G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST &&
    rulesQuestions.length === G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST;

  // Calculate progress by question type
  const signsAnswered = signsQuestions.filter(
    (q) =>
      base.storeActions.isQuestionAnswered &&
      base.storeActions.isQuestionAnswered(q.id)
  ).length;

  const rulesAnswered = rulesQuestions.filter(
    (q) =>
      base.storeActions.isQuestionAnswered &&
      base.storeActions.isQuestionAnswered(q.id)
  ).length;

  // TODO: Calculate correct answers (will be implemented in results processing)
  const signsCorrect = 0; // Placeholder - calculated after submission
  const rulesCorrect = 0; // Placeholder - calculated after submission

  // Test configuration
  const testConfig = {
    totalQuestions: G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST,
    signsRequired: G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST,
    rulesRequired: G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST,
    passingScore: G1_TEST_CONFIG.MINIMUM_CORRECT_ANSWERS,
    passingPercentage: G1_TEST_CONFIG.PASSING_PERCENTAGE,
  };

  // Can start simulation if questions are loaded and valid
  const canStartSimulation = isValidG1Format && !base.quiz.isActive;

  return {
    // Inherit all base functionality
    ...base,

    // G1-specific state
    signsQuestions,
    rulesQuestions,
    isValidG1Format,

    // Test configuration
    testConfig,

    // G1-specific actions
    initializeSimulation,
    startSimulation,
    restartSimulation,

    // Progress tracking
    signsAnswered,
    rulesAnswered,
    signsCorrect,
    rulesCorrect,

    // Validation helpers
    canStartSimulation,
  };
}

// Default export for convenience
export default useSimulation;
