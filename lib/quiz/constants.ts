// Quiz system constants for G1 driving test
// Defines all constants, limits, and configuration values

// G1 Test Configuration
export const G1_TEST_CONFIG = {
  // Question counts per section
  SIGNS_QUESTIONS_PER_TEST: 20,
  RULES_QUESTIONS_PER_TEST: 20,
  TOTAL_QUESTIONS_PER_TEST: 40,

  // Scoring
  PASSING_PERCENTAGE: 80, // 80% to pass G1 test
  MINIMUM_CORRECT_ANSWERS: 32, // 32 out of 40 questions
  SIGNS_PASSING_SCORE: 16, // 16 out of 20 signs questions
  RULES_PASSING_SCORE: 16, // 16 out of 20 rules questions
} as const;

// Quiz modes configuration
export const QUIZ_MODE_CONFIG = {
  signs_practice: {
    name: "Signs Practice",
    description: "Practice road signs and traffic control devices",
    questionSource: "signs_questions",
    unlimited: true,
    timed: false,
    showExplanations: true,
    icon: "🚦",
  },
  rules_practice: {
    name: "Rules Practice",
    description: "Practice rules of the road and driving regulations",
    questionSource: "rules_questions",
    unlimited: true,
    timed: false,
    showExplanations: true,
    icon: "📋",
  },
  simulation: {
    name: "G1 Test Simulation",
    description: "Full G1 test simulation with 20 signs + 20 rules questions",
    questionSource: "mixed",
    unlimited: false,
    timed: false,
    showExplanations: false,
    icon: "🎯",
    questionsCount: G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST,
  },
} as const;

// Default quiz settings
export const DEFAULT_QUIZ_SETTINGS = {
  questionsPerSection: G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST,
  totalQuestions: G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST,
  passingScore: G1_TEST_CONFIG.PASSING_PERCENTAGE,
  showExplanations: false,
  shuffleQuestions: true,
  shuffleOptions: false,
} as const;

// Frontend question limit options (for practice modes)
export const QUESTION_LIMITS = {
  QUICK_PRACTICE: 10,
  MEDIUM_PRACTICE: 20,
  EXTENDED_PRACTICE: 40,
  // Available options for user selection
  OPTIONS: [10, 20, 40] as const,
  DEFAULT: 10,
} as const;

// Database function names (aligned with Stage 2)
export const DATABASE_FUNCTIONS = {
  GET_SIGNS_PRACTICE: "get_signs_practice_questions",
  GET_RULES_PRACTICE: "get_rules_practice_questions",
  GET_G1_SIMULATION: "get_g1_simulation_questions",
  GET_INCORRECT_QUESTIONS: "get_incorrect_questions",
} as const;

// Freemium limits
export const FREEMIUM_LIMITS = {
  // Daily quiz attempts for free users
  DAILY_PRACTICE_ATTEMPTS: 5,
  DAILY_SIMULATION_ATTEMPTS: 2,

  // Questions per practice session (use QUESTION_LIMITS.DEFAULT for free users)
  FREE_PRACTICE_QUESTIONS: QUESTION_LIMITS.DEFAULT,
  PREMIUM_PRACTICE_UNLIMITED: -1,

  // Reset intervals
  DAILY_RESET_HOUR: 0, // Reset at midnight
} as const;

// UI Constants
export const UI_CONSTANTS = {
  // Animation durations (in milliseconds)
  QUESTION_TRANSITION_DURATION: 300,
  ANSWER_FEEDBACK_DURATION: 1500,
  // Progress indicators
  PROGRESS_BAR_SEGMENTS: 40, // One segment per question
  PROGRESS_COLORS: {
    incomplete: "#e5e5e5",
    current: "#3b82f6",
    completed: "#10b981",
    incorrect: "#ef4444",
  },

  // Breakpoints for responsive design
  MOBILE_BREAKPOINT: 768,
  TABLET_BREAKPOINT: 1024,
} as const;

// Question difficulty weights (for practice mode)
export const DIFFICULTY_WEIGHTS = {
  easy: 1,
  medium: 2,
  hard: 3,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  // Network errors
  NETWORK_ERROR: "Network error. Please check your connection.",
  SERVER_ERROR: "Server error. Please try again later.",

  // Quiz errors
  NO_QUESTIONS_AVAILABLE: "No questions available for this quiz type.",
  QUIZ_ALREADY_STARTED: "Quiz has already been started.",
  QUIZ_NOT_STARTED: "Quiz has not been started yet.",
  INVALID_QUIZ_MODE: "Invalid quiz mode selected.",

  // Submission errors
  SUBMISSION_FAILED: "Failed to submit quiz. Please try again.",
  INCOMPLETE_ANSWERS: "Please answer all questions before submitting.",

  // Access errors
  FREEMIUM_LIMIT_REACHED: "Daily quiz limit reached. Upgrade to continue.",
  AUTHENTICATION_REQUIRED: "Please sign in to save your progress.",
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  QUIZ_SUBMITTED: "Quiz submitted successfully!",
  PROGRESS_SAVED: "Progress saved.",
  QUIZ_RESET: "Quiz has been reset.",
} as const;

// Storage keys for local storage
export const STORAGE_KEYS = {
  QUIZ_STATE: "quiz_state",
  QUIZ_SETTINGS: "quiz_settings",
  QUIZ_PROGRESS: "quiz_progress",
} as const;

// API endpoints (aligned with database functions)
export const API_ENDPOINTS = {
  // Quiz question endpoints
  GET_SIGNS_PRACTICE: "/api/quiz/signs-practice",
  GET_RULES_PRACTICE: "/api/quiz/rules-practice",
  GET_G1_SIMULATION: "/api/quiz/g1-simulation",
  GET_INCORRECT_QUESTIONS: "/api/quiz/incorrect-questions",

  // Quiz management endpoints
  SUBMIT_QUIZ: "/api/quiz/submit",
  GET_RESULTS: "/api/quiz/results",
  CHECK_ACCESS: "/api/quiz/access",
  GET_PROGRESS: "/api/quiz/progress",
} as const;

// Question limit selection labels (for UI)
export const QUESTION_LIMIT_LABELS = {
  [QUESTION_LIMITS.QUICK_PRACTICE]: "Quick Practice (10 questions)",
  [QUESTION_LIMITS.MEDIUM_PRACTICE]: "Medium Practice (20 questions)",
  [QUESTION_LIMITS.EXTENDED_PRACTICE]: "Extended Practice (40 questions)",
} as const;

// Question validation
export const VALIDATION_RULES = {
  MIN_QUESTION_TEXT_LENGTH: 10,
  MAX_QUESTION_TEXT_LENGTH: 500,
  REQUIRED_OPTIONS: ["a", "b", "c", "d"],
  VALID_CORRECT_OPTIONS: ["a", "b", "c", "d"],
} as const;

// Export all constants as a single object for convenience
export const QUIZ_CONSTANTS = {
  G1_TEST_CONFIG,
  QUIZ_MODE_CONFIG,
  DEFAULT_QUIZ_SETTINGS,
  QUESTION_LIMITS,
  DATABASE_FUNCTIONS,
  FREEMIUM_LIMITS,
  UI_CONSTANTS,
  DIFFICULTY_WEIGHTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  API_ENDPOINTS,
  QUESTION_LIMIT_LABELS,
  VALIDATION_RULES,
} as const;

export default QUIZ_CONSTANTS;
