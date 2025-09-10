// Quiz system types for G1 driving test
// Defines all TypeScript interfaces and types for the quiz functionality

// G1 test specific question interface (aligned with database functions)
export interface Question {
  id: number;
  question_text: string;
  question_type: "signs" | "rules"; // Required - matches database return
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  image_url: string | null; // Matches database return exactly
  image_description: string | null; // Matches database return exactly
  category: string; // Required - matches database return
  explanation: string; // Required - matches database return
}

// G1 test quiz modes
export type QuizMode =
  | "signs_practice" // Unlimited signs practice
  | "rules_practice" // Unlimited rules practice
  | "simulation"; // G1 simulation (20 signs + 20 rules)

// Quiz state for different phases
export type QuizStatus =
  | "idle" // Not started
  | "loading" // Loading questions
  | "active" // Quiz in progress
  | "submitting" // Submitting answers
  | "completed" // Quiz finished
  | "error"; // Error occurred

// Quiz configuration
export interface QuizSettings {
  questionsPerSection: number; // 20 for G1 test
  totalQuestions: number; // 40 for G1 simulation (20 signs + 20 rules)
  passingScore: number; // Percentage required to pass (typically 80%)
  showExplanations: boolean; // Show explanations after each question
  shuffleQuestions: boolean; // Randomize question order
  shuffleOptions: boolean; // Randomize option order
}

// User's answer selection
export interface UserAnswer {
  questionId: number;
  selectedOption: string; // 'a', 'b', 'c', or 'd'
  isCorrect?: boolean; // Calculated after submission
}

// Quiz progress tracking
export interface QuizProgress {
  currentQuestionIndex: number;
  totalQuestions: number;
  questionsAnswered: number;
  signsQuestionsAnswered: number;
  rulesQuestionsAnswered: number;
  percentComplete: number;
  section: "signs" | "rules" | "mixed";
}

// Quiz attempt result
export interface QuizResult {
  id?: number;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  signsScore: number;
  rulesScore: number;
  percentageScore: number;
  passed: boolean;
  userAnswers: UserAnswer[];
  submittedAt: string;
}

// Main quiz state interface
export interface QuizState {
  // Core state
  mode: QuizMode;
  status: QuizStatus;
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: Record<number, UserAnswer>;

  // Progress tracking
  progress: QuizProgress;

  // Configuration
  settings: QuizSettings;

  // Results
  result: QuizResult | null;

  // Error handling
  error: string | null;
}

// Quiz actions interface
export interface QuizActions {
  // Quiz lifecycle
  initializeQuiz: (
    mode: QuizMode,
    settings?: Partial<QuizSettings>
  ) => Promise<void>;
  startQuiz: () => void;
  resetQuiz: () => void;
  submitQuiz: () => Promise<QuizResult | void>;

  // Navigation
  goToQuestion: (index: number) => void;
  nextQuestion: () => void;
  previousQuestion: () => void;

  // Answer handling
  selectAnswer: (questionId: number, option: string) => void;
  updateAnswer: (questionId: number, option: string) => void;

  // Settings
  updateSettings: (settings: Partial<QuizSettings>) => void;

  // Error handling
  setError: (error: string | null) => void;
  clearError: () => void;

  // Helper methods (for internal store use)
  setQuestions: (questions: Question[]) => void;
  getCurrentQuestion: () => Question | null;
  isQuestionAnswered: (questionId: number) => boolean;
  getAnswerForQuestion: (questionId: number) => UserAnswer | null;
  canSubmitQuiz: () => boolean;
}

// Combined quiz store type
export type QuizStore = QuizState & QuizActions;

// Hook return types
export interface UseQuizReturn {
  // State
  quiz: QuizState;

  // Computed properties
  currentQuestion: Question | null;
  isLastQuestion: boolean;
  isFirstQuestion: boolean;
  canGoNext: boolean;
  canGoPrevious: boolean;
  canSubmit: boolean;

  // Actions
  actions: Pick<
    QuizActions,
    | "selectAnswer"
    | "nextQuestion"
    | "previousQuestion"
    | "goToQuestion"
    | "submitQuiz"
  >;

  // Loading states
  isLoading: boolean;
  isSubmitting: boolean;

  // Error state
  error: string | null;
}

// API response types
export interface QuizApiResponse {
  success: boolean;
  data?: any;
  error?: string;
  message?: string;
}

export interface QuizSubmissionPayload {
  mode: QuizMode;
  userAnswers: Record<number, UserAnswer>;
  questionIds: number[];
  settings: QuizSettings;
}

// Freemium access control
export interface QuizAccess {
  canAttempt: boolean;
  attemptsRemaining: number;
  nextResetTime?: string;
  message: string;
  upgradeRequired: boolean;
}

// Frontend question limit options (passed to database functions)
export type QuestionLimit = 10 | 20 | 40;

// Database function parameter types (aligned with Stage 2 functions)
export interface GetQuestionsParams {
  limit: QuestionLimit; // For practice functions
}

export interface GetIncorrectQuestionsParams {
  user_id: string; // UUID as string
  question_type: "signs" | "rules" | "all";
}

// Database function return types
export interface DatabaseFunctionResponse<T = Question[]> {
  data: T;
  error?: string;
}

// Quiz initialization parameters
export interface QuizInitParams {
  mode: QuizMode;
  questionLimit?: QuestionLimit; // Optional for practice modes (defaults to 10)
  userId?: string; // For incorrect questions review
}

// Strict question type filtering
export type SignsQuestion = Question & {
  question_type: "signs";
  image_url: string; // Signs typically have images
  image_description: string;
};

export type RulesQuestion = Question & {
  question_type: "rules";
  image_url: null; // Rules typically don't have images
  image_description: null;
};

export default {};
