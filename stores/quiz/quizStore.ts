// quizStore.ts
// Core Zustand store: State + reducers
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import { Question, QuizStore, QuizState, QuizMode } from "@/types/quiz";
import {
  G1_TEST_CONFIG,
  DEFAULT_QUIZ_SETTINGS,
  QUESTION_LIMITS,
  STORAGE_KEYS,
} from "@/lib/quiz/constants";
import {
  calculateScore,
  validateUserAnswers,
  debugQuizState,
} from "@/lib/quiz/utils";

// ---------------------------------------------------
// Initial state
// ---------------------------------------------------
const initialState: QuizState = {
  mode: "signs_practice",
  status: "idle",
  questions: [],
  currentQuestionIndex: 0,
  userAnswers: {},
  progress: {
    currentQuestionIndex: 0,
    totalQuestions: 0,
    questionsAnswered: 0,
    signsQuestionsAnswered: 0,
    rulesQuestionsAnswered: 0,
    percentComplete: 0,
    section: "mixed",
  },
  settings: DEFAULT_QUIZ_SETTINGS,
  result: null,
  error: null,
};

// ---------------------------------------------------
// Zustand store
// ---------------------------------------------------
export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      immer<QuizStore>((set, get) => ({
        ...initialState,

        // -------------------------------
        // Quiz lifecycle
        // -------------------------------
        initializeQuiz: async (mode: QuizMode, settings = {}) => {
          set((s) => {
            s.status = "loading";
            s.error = null;
            s.mode = mode;
            s.settings = { ...s.settings, ...settings };
          });

          try {
            set((s) => {
              s.status = "idle";
              s.currentQuestionIndex = 0;
              s.userAnswers = {};
              s.result = null;

              if (mode === "simulation") {
                s.progress.totalQuestions =
                  G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST;
                s.progress.section = "mixed";
              } else {
                s.progress.totalQuestions = QUESTION_LIMITS.DEFAULT;
                s.progress.section =
                  mode === "signs_practice" ? "signs" : "rules";
              }

              s.progress.questionsAnswered = 0;
              s.progress.signsQuestionsAnswered = 0;
              s.progress.rulesQuestionsAnswered = 0;
              s.progress.percentComplete = 0;
              s.progress.currentQuestionIndex = 0;
            });

            debugQuizState(get());
          } catch (err) {
            set((s) => {
              s.status = "error";
              s.error =
                err instanceof Error
                  ? err.message
                  : "Failed to initialize quiz";
            });
          }
        },

        startQuiz: () => {
          const st = get();
          if (st.questions.length === 0) {
            set((s) => {
              s.status = "error";
              s.error = "No questions available to start quiz";
            });
            return;
          }

          set((s) => {
            s.status = "active";
            s.currentQuestionIndex = 0;
            s.error = null;
          });

          debugQuizState(get());
        },

        resetQuiz: () => {
          set((s) => {
            const { mode, settings } = s;
            Object.assign(s, { ...initialState, mode, settings });
          });
          debugQuizState(get());
        },

        submitQuiz: async () => {
          const st = get();
          set((s) => {
            s.status = "submitting";
            s.error = null;
          });

          try {
            const validation = validateUserAnswers(
              st.questions,
              st.userAnswers
            );
            if (!validation.isValid) {
              throw new Error(
                `Please answer all questions before submitting. Missing: ${validation.missingAnswers.length} questions.`
              );
            }

            const result = calculateScore(st.questions, st.userAnswers);

            set((s) => {
              s.status = "completed";
              s.result = result;
            });

            debugQuizState(get());
            return result;
          } catch (err) {
            set((s) => {
              s.status = "error";
              s.error =
                err instanceof Error ? err.message : "Failed to submit quiz";
            });
            return undefined;
          }
        },

        // -------------------------------
        // Navigation
        // -------------------------------
        goToQuestion: (i: number) => {
          const st = get();
          if (i >= 0 && i < st.questions.length) {
            set((s) => {
              s.currentQuestionIndex = i;
              s.progress.currentQuestionIndex = i;
            });
          }
        },
        nextQuestion: () => {
          const st = get();
          const next = st.currentQuestionIndex + 1;
          if (next < st.questions.length) get().goToQuestion(next);
        },
        previousQuestion: () => {
          const st = get();
          const prev = st.currentQuestionIndex - 1;
          if (prev >= 0) get().goToQuestion(prev);
        },

        // -------------------------------
        // Answers
        // -------------------------------
        selectAnswer: (id: number, opt: string) => {
          set((s) => {
            s.userAnswers[id] = {
              questionId: id,
              selectedOption: opt.toLowerCase(),
            };
            const answeredCount = Object.keys(s.userAnswers).length;
            s.progress.questionsAnswered = answeredCount;
            s.progress.percentComplete =
              s.progress.totalQuestions > 0
                ? Math.round((answeredCount / s.progress.totalQuestions) * 100)
                : 0;

            const answeredIds = Object.keys(s.userAnswers).map(Number);

            s.progress.signsQuestionsAnswered = answeredIds.filter((qid) =>
              s.questions.find(
                (q) => q.id === qid && q.question_type === "signs"
              )
            ).length;
            s.progress.rulesQuestionsAnswered = answeredIds.filter((qid) =>
              s.questions.find(
                (q) => q.id === qid && q.question_type === "rules"
              )
            ).length;
          });

          debugQuizState(get());
        },

        updateAnswer: (qid, opt) => get().selectAnswer(qid, opt),

        // -------------------------------
        // Settings / Error
        // -------------------------------
        updateSettings: (newSettings) => {
          set((s) => {
            s.settings = { ...s.settings, ...newSettings };
          });
        },
        setError: (err: string | null) => {
          set((s) => {
            s.error = err;
            if (err) s.status = "error";
          });
        },
        clearError: () => {
          set((s) => {
            s.error = null;
            if (s.status === "error") s.status = "idle";
          });
        },

        // -------------------------------
        // Helpers
        // -------------------------------
        setQuestions: (qs: Question[]) => {
          set((s) => {
            s.questions = qs;
            s.progress.totalQuestions = qs.length;
            const hasSigns = qs.some((q) => q.question_type === "signs");
            const hasRules = qs.some((q) => q.question_type === "rules");
            if (hasSigns && hasRules) s.progress.section = "mixed";
            else if (hasSigns) s.progress.section = "signs";
            else if (hasRules) s.progress.section = "rules";
          });
        },
        getCurrentQuestion: () => {
          const st = get();
          return st.questions[st.currentQuestionIndex] || null;
        },
        isQuestionAnswered: (id) => Boolean(get().userAnswers[id]),
        getAnswerForQuestion: (id) => get().userAnswers[id] || null,
        canSubmitQuiz: () => {
          const st = get();
          return (
            st.questions.length > 0 &&
            Object.keys(st.userAnswers).length === st.questions.length &&
            st.status === "active"
          );
        },
      })),
      { name: STORAGE_KEYS.QUIZ_STATE }
    )
  )
);
