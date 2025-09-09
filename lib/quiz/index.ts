// Quiz system main exports
// Centralized exports for the quiz system

export * from "./constants";
export * from "./utils";

// Re-export types from the types directory
export type {
  Question,
  QuizMode,
  QuizStatus,
  QuizState,
  QuizActions,
  QuizStore,
  QuizResult,
  UserAnswer,
  QuizProgress,
  QuizSettings,
  UseQuizReturn,
  QuizAccess,
  QuizApiResponse,
  QuizSubmissionPayload,
  // New Stage 3 types
  QuestionLimit,
  GetQuestionsParams,
  GetIncorrectQuestionsParams,
  DatabaseFunctionResponse,
  QuizInitParams,
  SignsQuestion,
  RulesQuestion,
} from "@/types/quiz";

export default {};
