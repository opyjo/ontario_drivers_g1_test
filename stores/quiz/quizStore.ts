// stores/quiz/quizStore.ts
// Main Zustand store: defines base state and attaches all slices

import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { createLifecycleSlice } from "./slices/lifecycle";
import { createNavigationSlice } from "./slices/navigation";
import { createAnswersSlice } from "./slices/answers";
import { QuizStore, QuizState, QuizSettings } from "@/types/quiz";

// ✅ Default quiz settings
const DEFAULT_SETTINGS: QuizSettings = {
  questionsPerSection: 20,
  totalQuestions: 40,
  passingScore: 80,
  showExplanations: false,
  shuffleQuestions: false,
  shuffleOptions: false,
};

// ✅ Base initial state, typed as QuizState
const baseState: QuizState = {
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
  settings: DEFAULT_SETTINGS,
  result: null,
  error: null,
};

// ✅ Hook: useQuizStore
export const useQuizStore = create<QuizStore>()(
  devtools(
    persist(
      immer((...a) => ({
        ...baseState, // <-- All QuizState fields available to slices

        // Attach slices (only actions!)
        ...createLifecycleSlice(...a),
        ...createNavigationSlice(...a),
        ...createAnswersSlice(...a),
      })),
      {
        name: "quiz-storage", // key in localStorage
        version: 1, // storage schema version
        migrate: (persistedState: unknown, _version) => {
          // Gracefully handle old shapes by merging over defaults
          if (!persistedState || typeof persistedState !== "object") {
            return baseState;
          }
          const s = persistedState as Partial<QuizState> & {
            progress?: Partial<QuizState["progress"]>;
            settings?: Partial<QuizState["settings"]>;
          };
          return {
            ...baseState,
            ...s,
            progress: {
              ...baseState.progress,
              ...(s.progress || {}),
            },
            settings: {
              ...baseState.settings,
              ...(s.settings || {}),
            },
          } as QuizState;
        },
        storage: createJSONStorage(() => {
          // Only use localStorage on client side
          if (typeof window !== "undefined") {
            return localStorage;
          }
          // Return a no-op storage for server side
          return {
            getItem: () => null,
            setItem: () => {},
            removeItem: () => {},
          };
        }),
        partialize: (state) => ({
          mode: state.mode,
          userAnswers: state.userAnswers,
          progress: state.progress,
          settings: state.settings,
        }),
        // Important: This prevents hydration during server-side rendering
        skipHydration: true,
      }
    ),
    { name: "Quiz Store" }
  )
);

// Helper to manually hydrate the store on the client side
export const hydrateQuizStore = () => {
  if (typeof window !== "undefined") {
    useQuizStore.persist.rehydrate();
  }
};
