// Quiz Hooks - Centralized exports
// All React hooks for G1 driving test quiz functionality

// Base hook
export { useQuizBase } from "./useQuizBase";
export type { UseQuizBaseReturn } from "./useQuizBase";

// Specialized practice hooks
export {
  useSignsPractice,
  default as useSignsPracticeDefault,
} from "./useSignsPractice";
export type {
  UseSignsPracticeOptions,
  UseSignsPracticeReturn,
} from "./useSignsPractice";

export {
  useRulesPractice,
  default as useRulesPracticeDefault,
} from "./useRulesPractice";
export type {
  UseRulesPracticeOptions,
  UseRulesPracticeReturn,
} from "./useRulesPractice";

// G1 simulation hook
export {
  useSimulation,
  default as useSimulationDefault,
} from "./useSimulation";
export type {
  UseSimulationOptions,
  UseSimulationReturn,
} from "./useSimulation";

// Incorrect questions review hook
export {
  useIncorrectQuestions,
  default as useIncorrectQuestionsDefault,
} from "./useIncorrectQuestions";
export type {
  UseIncorrectQuestionsOptions,
  UseIncorrectQuestionsReturn,
} from "./useIncorrectQuestions";

// Convenience re-exports from store (for components that need direct store access)
export { useQuizStore, useQuizSelectors, useQuizActions } from "@/stores/quiz";

// Server actions re-export (for advanced usage)
export { quizServerActions } from "@/lib/quiz/server-actions";

// Note: Individual exports available above
// Use import { useSignsPractice, useRulesPractice, etc. } from "@/hooks/quiz"
