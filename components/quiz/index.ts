// Quiz Components - Complete UI Library
// All quiz interface components for G1 driving test system

// ===== CORE COMPONENTS =====
// Universal components that work with any quiz mode
export { default as QuestionDisplay } from "./core/QuestionDisplay";
export type { QuestionDisplayProps } from "./core/QuestionDisplay";

export { default as AnswerOptions } from "./core/AnswerOptions";
export type { AnswerOptionsProps } from "./core/AnswerOptions";

export { default as ProgressIndicator } from "./core/ProgressIndicator";
export type { ProgressIndicatorProps } from "./core/ProgressIndicator";

export { default as NavigationControls } from "./core/NavigationControls";
export type { NavigationControlsProps } from "./core/NavigationControls";

export {
  default as QuizContainer,
  CompactQuizContainer,
  WideQuizContainer,
  MobileQuizContainer,
} from "./core/QuizContainer";
export type { QuizContainerProps } from "./core/QuizContainer";

// ===== STATE MANAGEMENT COMPONENTS =====
// Loading states and error handling
export {
  default as LoadingStates,
  QuizLoadingScreen,
  QuestionLoadingState,
  InlineLoadingSpinner,
} from "./state/LoadingStates";
export type { LoadingStatesProps } from "./state/LoadingStates";

export {
  default as QuizErrorBoundary,
  NetworkErrorDisplay,
  DatabaseErrorDisplay,
  ValidationErrorDisplay,
  InlineErrorMessage,
} from "./state/ErrorBoundary";
export type { QuizErrorBoundaryProps } from "./state/ErrorBoundary";

export { default as ResultsDisplay } from "./state/ResultsDisplay";
export type { ResultsDisplayProps } from "./state/ResultsDisplay";

// ===== SETUP COMPONENTS =====
// Configuration and selection interfaces
export { default as QuizModeSelector } from "./setup/QuizModeSelector";
export type { QuizModeSelectorProps } from "./setup/QuizModeSelector";

export { default as QuestionLimitSelector } from "./setup/QuestionLimitSelector";
export type { QuestionLimitSelectorProps } from "./setup/QuestionLimitSelector";

// ===== MODE-SPECIFIC QUIZ COMPONENTS =====
// Complete quiz interfaces for different modes
export { default as SignsPracticeQuiz } from "./modes/SignsPracticeQuiz";
export type { SignsPracticeQuizProps } from "./modes/SignsPracticeQuiz";

export { default as RulesPracticeQuiz } from "./modes/RulesPracticeQuiz";
export type { RulesPracticeQuizProps } from "./modes/RulesPracticeQuiz";

export { default as G1SimulationQuiz } from "./modes/G1SimulationQuiz";
export type { G1SimulationQuizProps } from "./modes/G1SimulationQuiz";

export { default as IncorrectQuestionsReview } from "./modes/IncorrectQuestionsReview";
export type { IncorrectQuestionsReviewProps } from "./modes/IncorrectQuestionsReview";

// ===== USAGE NOTES =====
// All components are individually exported above
// Use: import { QuestionDisplay, AnswerOptions } from "@/components/quiz"
// Or: import { SignsPracticeQuiz } from "@/components/quiz"

// End of exports
