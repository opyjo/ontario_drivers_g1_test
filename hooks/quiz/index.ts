// Quiz Hooks - Centralized exports
// All React hooks for G1 driving test quiz functionality

// Base hook (import for local usage and re-export for consumers)
import { useQuizBase } from "./useQuizBase";
export { useQuizBase } from "./useQuizBase";
export type { UseQuizBaseReturn } from "./useQuizBase";

// Specialized practice hooks
import { useSignsPractice } from "./useSignsPractice";
export {
  useSignsPractice,
  default as useSignsPracticeDefault,
} from "./useSignsPractice";
export type {
  UseSignsPracticeOptions,
  UseSignsPracticeReturn,
} from "./useSignsPractice";

import { useRulesPractice } from "./useRulesPractice";
export {
  useRulesPractice,
  default as useRulesPracticeDefault,
} from "./useRulesPractice";
export type {
  UseRulesPracticeOptions,
  UseRulesPracticeReturn,
} from "./useRulesPractice";

// G1 simulation hook
import { useSimulation } from "./useSimulation";
export {
  useSimulation,
  default as useSimulationDefault,
} from "./useSimulation";
export type {
  UseSimulationOptions,
  UseSimulationReturn,
} from "./useSimulation";

// Incorrect questions review hook
import { useIncorrectQuestions } from "./useIncorrectQuestions";
export {
  useIncorrectQuestions,
  default as useIncorrectQuestionsDefault,
} from "./useIncorrectQuestions";
export type {
  UseIncorrectQuestionsOptions,
  UseIncorrectQuestionsReturn,
} from "./useIncorrectQuestions";

// Convenience re-exports from store (for components that need direct store access)
import { useQuizStore, useQuizSelectors, useQuizActions } from "@/stores/quiz";
export { useQuizStore, useQuizSelectors, useQuizActions } from "@/stores/quiz";

// Server actions re-export (for advanced usage)
export { quizServerActions } from "@/lib/quiz/server-actions";

// Default export object for easy importing
const quizHooks = {
  useQuizBase,
  useSignsPractice,
  useRulesPractice,
  useSimulation,
  useIncorrectQuestions,
  // Store hooks
  useQuizStore,
  useQuizSelectors,
  useQuizActions,
} as const;

export default quizHooks;
