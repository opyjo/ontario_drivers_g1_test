// Zustand Quiz Store for G1 Driving Test
// Handles all quiz state management with type safety

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import {
  Question,
  QuizMode,
  QuizStatus,
  QuizState,
  QuizActions,
  QuizStore,
  UserAnswer,
  QuizProgress,
  QuizResult,
  QuestionLimit,
  QuizInitParams,
} from "@/types/quiz";
import {
  G1_TEST_CONFIG,
  DEFAULT_QUIZ_SETTINGS,
  QUESTION_LIMITS,
  STORAGE_KEYS,
} from "@/lib/quiz/constants";
import {
  calculateScore,
  calculateProgress,
  validateUserAnswers,
  shuffleArray,
  saveQuizState,
  loadQuizState,
  debugQuizState,
} from "@/lib/quiz/utils";

// Initial quiz state
const initialState: QuizState = {
  // Core state
  mode: "signs_practice",
  status: "idle",
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},

  // Progress tracking
  progress: {
    currentQuestionIndex: 0,
    totalQuestions: 0,
    questionsAnswered: 0,
    signsQuestionsAnswered: 0,
    rulesQuestionsAnswered: 0,
    percentComplete: 0,
    section: "mixed",
  },

  // Configuration
  settings: DEFAULT_QUIZ_SETTINGS,

  // Results
  result: null,

  // Error handling
  error: null,
};

// Quiz store implementation with full type safety
export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      immer<QuizStore>((set, get) => ({
        ...initialState,

        // Quiz lifecycle actions
        initializeQuiz: async (mode: QuizMode, settings = {}) => {
          set((state) => {
            state.status = "loading";
            state.error = null;
            state.mode = mode;
            state.settings = { ...state.settings, ...settings };
          });

          try {
            // The actual question loading will be handled by the hooks in Stage 5
            // For now, we just set up the basic state structure
            set((state) => {
              state.status = "idle";
              state.currentQuestionIndex = 0;
              state.userAnswers = {};
              state.result = null;

              // Initialize progress based on mode
              if (mode === "simulation") {
                state.progress.totalQuestions =
                  G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST;
                state.progress.section = "mixed";
              } else {
                // Default for practice modes - will be updated when questions load
                state.progress.totalQuestions = QUESTION_LIMITS.DEFAULT;
                state.progress.section =
                  mode === "signs_practice" ? "signs" : "rules";
              }

              state.progress.questionsAnswered = 0;
              state.progress.signsQuestionsAnswered = 0;
              state.progress.rulesQuestionsAnswered = 0;
              state.progress.percentComplete = 0;
              state.progress.currentQuestionIndex = 0;
            });

            debugQuizState(get());
          } catch (error) {
            set((state) => {
              state.status = "error";
              state.error =
                error instanceof Error
                  ? error.message
                  : "Failed to initialize quiz";
            });
          }
        },

        startQuiz: () => {
          const state = get();
          if (state.questions.length === 0) {
            set((draft) => {
              draft.status = "error";
              draft.error = "No questions available to start quiz";
            });
            return;
          }

          set((draft) => {
            draft.status = "active";
            draft.currentQuestionIndex = 0;
            draft.error = null;
          });

          debugQuizState(get());
        },

        resetQuiz: () => {
          set((state) => {
            // Keep mode and settings, reset everything else
            const { mode, settings } = state;
            Object.assign(state, {
              ...initialState,
              mode,
              settings,
            });
          });

          debugQuizState(get());
        },

        submitQuiz: async () => {
          const state = get();

          set((draft) => {
            draft.status = "submitting";
            draft.error = null;
          });

          try {
            // Validate all questions are answered
            const validation = validateUserAnswers(
              state.questions,
              state.userAnswers
            );
            if (!validation.isValid) {
              throw new Error(
                `Please answer all questions before submitting. Missing: ${validation.missingAnswers.length} questions.`
              );
            }

            // Calculate the quiz result
            const result = calculateScore(
              state.questions,
              state.userAnswers,
              state.mode
            );

            set((draft) => {
              draft.status = "completed";
              draft.result = result;
            });

            debugQuizState(get());
            return result;
          } catch (error) {
            set((draft) => {
              draft.status = "error";
              draft.error =
                error instanceof Error
                  ? error.message
                  : "Failed to submit quiz";
            });
            return undefined;
          }
        },

        // Navigation actions
        goToQuestion: (index: number) => {
          const state = get();
          if (index >= 0 && index < state.questions.length) {
            set((draft) => {
              draft.currentQuestionIndex = index;
              draft.progress.currentQuestionIndex = index;
            });
          }
        },

        nextQuestion: () => {
          const state = get();
          const nextIndex = state.currentQuestionIndex + 1;
          if (nextIndex < state.questions.length) {
            get().goToQuestion(nextIndex);
          }
        },

        previousQuestion: () => {
          const state = get();
          const prevIndex = state.currentQuestionIndex - 1;
          if (prevIndex >= 0) {
            get().goToQuestion(prevIndex);
          }
        },

        // Answer handling
        selectAnswer: (questionId: number, option: string) => {
          set((state) => {
            // Add or update the user answer
            state.userAnswers[questionId] = {
              questionId,
              selectedOption: option.toLowerCase(),
            };

            // Update progress tracking
            const answeredCount = Object.keys(state.userAnswers).length;
            state.progress.questionsAnswered = answeredCount;
            state.progress.percentComplete =
              state.progress.totalQuestions > 0
                ? Math.round(
                    (answeredCount / state.progress.totalQuestions) * 100
                  )
                : 0;

            // Update section-specific progress
            const question = state.questions.find(
              (q: Question) => q.id === questionId
            );
            if (question) {
              // Calculate answered questions by type
              const answeredQuestionIds = Object.keys(state.userAnswers).map(
                (id) => parseInt(id)
              );

              const answeredSigns = answeredQuestionIds.filter((id) => {
                const quest = state.questions.find(
                  (q: Question) => q.id === id
                );
                return quest?.question_type === "signs";
              }).length;

              const answeredRules = answeredQuestionIds.filter((id) => {
                const quest = state.questions.find(
                  (q: Question) => q.id === id
                );
                return quest?.question_type === "rules";
              }).length;

              state.progress.signsQuestionsAnswered = answeredSigns;
              state.progress.rulesQuestionsAnswered = answeredRules;
            }
          });

          debugQuizState(get());
        },

        updateAnswer: (questionId: number, option: string) => {
          // Same as selectAnswer for now - could be extended for different behavior
          get().selectAnswer(questionId, option);
        },

        // Settings management
        updateSettings: (newSettings) => {
          set((state) => {
            state.settings = { ...state.settings, ...newSettings };
          });
        },

        // Error handling
        setError: (error: string | null) => {
          set((state) => {
            state.error = error;
            if (error) {
              state.status = "error";
            }
          });
        },

        clearError: () => {
          set((state) => {
            state.error = null;
            if (state.status === "error") {
              state.status = "idle";
            }
          });
        },

        // Additional helper actions (not in the interface but useful)
        setQuestions: (questions: Question[]) => {
          set((state) => {
            state.questions = questions;
            state.progress.totalQuestions = questions.length;

            // Update section type based on questions
            const hasSignsQuestions = questions.some(
              (q) => q.question_type === "signs"
            );
            const hasRulesQuestions = questions.some(
              (q) => q.question_type === "rules"
            );

            if (hasSignsQuestions && hasRulesQuestions) {
              state.progress.section = "mixed";
            } else if (hasSignsQuestions) {
              state.progress.section = "signs";
            } else if (hasRulesQuestions) {
              state.progress.section = "rules";
            }
          });
        },

        getCurrentQuestion: () => {
          const state = get();
          return state.questions[state.currentQuestionIndex] || null;
        },

        isQuestionAnswered: (questionId: number) => {
          const state = get();
          return questionId in state.userAnswers;
        },

        getAnswerForQuestion: (questionId: number) => {
          const state = get();
          return state.userAnswers[questionId] || null;
        },

        canSubmitQuiz: () => {
          const state = get();
          return (
            state.questions.length > 0 &&
            Object.keys(state.userAnswers).length === state.questions.length &&
            state.status === "active"
          );
        },
      })),
      {
        name: STORAGE_KEYS.QUIZ_STATE,
        // Only persist specific parts of the state
        partialize: (state) => ({
          mode: state.mode,
          settings: state.settings,
          userAnswers: state.userAnswers,
          currentQuestionIndex: state.currentQuestionIndex,
          progress: state.progress,
        }),
        // Don't persist if quiz is completed or has errors
        skipHydration: false,
      }
    ),
    {
      name: "quiz-store",
      enabled: process.env.NODE_ENV === "development",
    }
  )
);

// Selectors for common state access patterns
export const useQuizSelectors = () => {
  const store = useQuizStore();

  return {
    // Basic state
    mode: store.mode,
    questions: store.questions,
    currentQuestion: store.getCurrentQuestion(),
    status: store.status, // Added missing status
    result: store.result, // Added missing result
    answers: store.userAnswers, // Added missing answers (as userAnswers)
    currentQuestionIndex: store.currentQuestionIndex, // Added missing currentQuestionIndex
    isLoading: store.status === "loading",
    isActive: store.status === "active",
    isCompleted: store.status === "completed",
    isSubmitting: store.status === "submitting",
    hasError: store.status === "error",

    // Progress indicators
    isFirstQuestion: store.currentQuestionIndex === 0,
    isLastQuestion: store.currentQuestionIndex === store.questions.length - 1,
    progressPercentage: store.progress.percentComplete,
    questionsRemaining:
      store.progress.totalQuestions - store.progress.questionsAnswered,

    // Navigation helpers
    canGoNext: store.currentQuestionIndex < store.questions.length - 1,
    canGoPrevious: store.currentQuestionIndex > 0,
    canSubmit: store.canSubmitQuiz(),

    // Question helpers
    totalQuestions: store.questions.length,
    answeredQuestions: Object.keys(store.userAnswers).length,
    currentQuestionNumber: store.currentQuestionIndex + 1,

    // Mode-specific
    isSimulation: store.mode === "simulation",
    isPracticeMode:
      store.mode === "signs_practice" || store.mode === "rules_practice",
  };
};

// Action-only hook for performance optimization
export const useQuizActions = () => {
  return useQuizStore((state) => ({
    initializeQuiz: state.initializeQuiz,
    startQuiz: state.startQuiz,
    resetQuiz: state.resetQuiz,
    submitQuiz: state.submitQuiz,
    goToQuestion: state.goToQuestion,
    nextQuestion: state.nextQuestion,
    previousQuestion: state.previousQuestion,
    selectAnswer: state.selectAnswer,
    updateAnswer: state.updateAnswer,
    updateSettings: state.updateSettings,
    setError: state.setError,
    clearError: state.clearError,
    setQuestions: state.setQuestions,
    getCurrentQuestion: state.getCurrentQuestion,
    isQuestionAnswered: state.isQuestionAnswered,
    getAnswerForQuestion: state.getAnswerForQuestion,
    canSubmitQuiz: state.canSubmitQuiz,
  }));
};
