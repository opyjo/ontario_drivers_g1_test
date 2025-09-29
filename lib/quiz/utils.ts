// Quiz system utility functions
// Helper functions for quiz logic, scoring, formatting, and validation

import {
  Question,
  QuizResult,
  UserAnswer,
  QuizSettings,
  QuestionLimit,
  SignsQuestion,
  RulesQuestion,
} from "@/types/quiz";
import { G1_TEST_CONFIG, QUESTION_LIMITS } from "./constants";

// Question utilities
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const isValidQuestion = (question: Question): boolean => {
  return !!(
    question.id &&
    question.question_text &&
    question.question_type &&
    ["signs", "rules"].includes(question.question_type) &&
    question.option_a &&
    question.option_b &&
    question.option_c &&
    question.option_d &&
    question.correct_option &&
    ["a", "b", "c", "d"].includes(question.correct_option?.toLowerCase()) &&
    question.category &&
    question.explanation
  );
};

export const getQuestionsByType = (
  questions: Question[],
  type: "signs" | "rules"
): Question[] => {
  return questions.filter((q) => q.question_type === type);
};

// Scoring utilities
export const calculateScore = (
  questions: Question[],
  userAnswers: Record<number, UserAnswer>
): QuizResult => {
  const totalQuestions = questions.length;
  let correctAnswers = 0;
  let signsCorrect = 0;
  let rulesCorrect = 0;
  let signsTotal = 0;
  let rulesTotal = 0;

  const answersArray: UserAnswer[] = [];

  questions.forEach((question) => {
    const userAnswer = userAnswers[question.id];
    if (!userAnswer) return;

    const isCorrect =
      userAnswer.selectedOption.toLowerCase() ===
      question.correct_option.toLowerCase();

    answersArray.push({
      ...userAnswer,
      isCorrect,
    });

    if (isCorrect) {
      correctAnswers++;
    }

    // Track by question type
    if (question.question_type === "signs") {
      signsTotal++;
      if (isCorrect) signsCorrect++;
    } else if (question.question_type === "rules") {
      rulesTotal++;
      if (isCorrect) rulesCorrect++;
    }
  });

  const percentageScore =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;

  const signsScore =
    signsTotal > 0 ? Math.round((signsCorrect / signsTotal) * 100) : 0;

  const rulesScore =
    rulesTotal > 0 ? Math.round((rulesCorrect / rulesTotal) * 100) : 0;

  const passed = percentageScore >= G1_TEST_CONFIG.PASSING_PERCENTAGE;

  return {
    score: correctAnswers,
    totalQuestions,
    correctAnswers,
    signsScore,
    rulesScore,
    percentageScore,
    passed,
    userAnswers: answersArray,
    submittedAt: new Date().toISOString(),
  };
};

export const getPassingStatus = (
  score: number,
  total: number
): {
  passed: boolean;
  percentage: number;
  message: string;
} => {
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = percentage >= G1_TEST_CONFIG.PASSING_PERCENTAGE;

  let message = "";
  if (passed) {
    message = `Congratulations! You passed with ${percentage}%.`;
  } else {
    const needed = G1_TEST_CONFIG.PASSING_PERCENTAGE;
    message = `You need ${needed}% to pass. You scored ${percentage}%.`;
  }

  return { passed, percentage, message };
};

// Progress utilities
export const calculateProgress = (
  currentIndex: number,
  totalQuestions: number,
  answeredCount: number
): {
  currentProgress: number;
  completionProgress: number;
  questionsRemaining: number;
} => {
  const currentProgress =
    totalQuestions > 0
      ? Math.round(((currentIndex + 1) / totalQuestions) * 100)
      : 0;

  const completionProgress =
    totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  const questionsRemaining = totalQuestions - answeredCount;

  return {
    currentProgress,
    completionProgress,
    questionsRemaining,
  };
};

// Validation utilities
export const validateUserAnswers = (
  questions: Question[],
  userAnswers: Record<number, UserAnswer>
): {
  isValid: boolean;
  missingAnswers: number[];
  invalidAnswers: number[];
} => {
  const missingAnswers: number[] = [];
  const invalidAnswers: number[] = [];

  questions.forEach((question) => {
    const answer = userAnswers[question.id];

    if (!answer || !answer.selectedOption) {
      missingAnswers.push(question.id);
    } else if (
      !["a", "b", "c", "d"].includes(answer.selectedOption.toLowerCase())
    ) {
      invalidAnswers.push(question.id);
    }
  });

  return {
    isValid: missingAnswers.length === 0 && invalidAnswers.length === 0,
    missingAnswers,
    invalidAnswers,
  };
};

// Question selection utilities
export const selectQuestionsForSimulation = (
  signsQuestions: Question[],
  rulesQuestions: Question[]
): Question[] => {
  const selectedSigns = shuffleArray(signsQuestions).slice(
    0,
    G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST
  );

  const selectedRules = shuffleArray(rulesQuestions).slice(
    0,
    G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST
  );

  // Mix questions together for simulation
  return shuffleArray([...selectedSigns, ...selectedRules]);
};

export const selectPracticeQuestions = (
  questions: Question[],
  count: QuestionLimit = QUESTION_LIMITS.DEFAULT
): Question[] => {
  return shuffleArray(questions).slice(0, count);
};

// Question limit utilities
export const isValidQuestionLimit = (limit: number): limit is QuestionLimit => {
  return QUESTION_LIMITS.OPTIONS.includes(limit as QuestionLimit);
};

export const getQuestionLimitLabel = (limit: QuestionLimit): string => {
  switch (limit) {
    case QUESTION_LIMITS.QUICK_PRACTICE:
      return `Quick Practice (${limit} questions)`;
    case QUESTION_LIMITS.MEDIUM_PRACTICE:
      return `Medium Practice (${limit} questions)`;
    case QUESTION_LIMITS.EXTENDED_PRACTICE:
      return `Extended Practice (${limit} questions)`;
    default:
      return `Practice (${limit} questions)`;
  }
};

export const getRecommendedQuestionLimit = (
  userLevel: "beginner" | "intermediate" | "advanced"
): QuestionLimit => {
  switch (userLevel) {
    case "beginner":
      return QUESTION_LIMITS.QUICK_PRACTICE;
    case "intermediate":
      return QUESTION_LIMITS.MEDIUM_PRACTICE;
    case "advanced":
      return QUESTION_LIMITS.EXTENDED_PRACTICE;
    default:
      return QUESTION_LIMITS.DEFAULT;
  }
};

// Type guards for question types
export const isSignsQuestion = (
  question: Question
): question is SignsQuestion => {
  return question.question_type === "signs";
};

export const isRulesQuestion = (
  question: Question
): question is RulesQuestion => {
  return question.question_type === "rules";
};

// Database function parameter helpers
export const createGetQuestionsParams = (limit: QuestionLimit) => ({
  limit,
});

export const createGetIncorrectQuestionsParams = (
  userId: string,
  questionType: "signs" | "rules" | "all"
) => ({
  user_id: userId,
  question_type: questionType,
});

// Local storage utilities
export const saveQuizState = (key: string, state: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(state));
  } catch (error) {
    console.warn("Failed to save quiz state to localStorage:", error);
  }
};

export const loadQuizState = <T>(key: string, defaultValue: T): T => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.warn("Failed to load quiz state from localStorage:", error);
    return defaultValue;
  }
};

export const clearQuizState = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn("Failed to clear quiz state from localStorage:", error);
  }
};

// Accessibility utilities
export const getAriaLabel = (question: Question, index: number): string => {
  return `Question ${index + 1} of ${question.question_text}`;
};

export const getAnswerAriaLabel = (
  option: string,
  text: string,
  isSelected: boolean
): string => {
  const status = isSelected ? "selected" : "not selected";
  return `Option ${option.toUpperCase()}: ${text} (${status})`;
};

// Debug utilities (for development)
export const debugQuizState = (state: any): void => {
  if (process.env.NODE_ENV === "development") {
    console.group("🧪 Quiz State Debug");
    console.table({
      Mode: state.mode,
      Status: state.status,
      "Current Question": state.currentQuestionIndex + 1,
      "Total Questions": state.questions?.length || 0,
      "Answers Given": Object.keys(state.userAnswers || {}).length,
    });
    console.groupEnd();
  }
};

export default {
  shuffleArray,
  isValidQuestion,
  getQuestionsByType,
  calculateScore,
  getPassingStatus,
  calculateProgress,
  validateUserAnswers,
  selectQuestionsForSimulation,
  selectPracticeQuestions,
  isValidQuestionLimit,
  getQuestionLimitLabel,
  getRecommendedQuestionLimit,
  isSignsQuestion,
  isRulesQuestion,
  createGetQuestionsParams,
  createGetIncorrectQuestionsParams,
  saveQuizState,
  loadQuizState,
  clearQuizState,
  getAriaLabel,
  getAnswerAriaLabel,
  debugQuizState,
};
