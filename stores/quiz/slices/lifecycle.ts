import { StateCreator } from "zustand";
import { calculateScore, validateUserAnswers } from "@/lib/quiz/utils";
import { QuizActions } from "@/types/quiz";
import { QuizSlice } from "./types";

// ✅ Define interface for the Lifecycle slice actions
//    These are the lifecycle-related operations for the quiz.
export interface QuizLifecycleSlice {
  initializeQuiz: QuizActions["initializeQuiz"];
  startQuiz: QuizActions["startQuiz"];
  resetQuiz: QuizActions["resetQuiz"];
  submitQuiz: QuizActions["submitQuiz"];
  updateSettings: QuizActions["updateSettings"];
  setError: QuizActions["setError"];
  clearError: QuizActions["clearError"];
}

// ✅ Lifecycle slice factory
export const createLifecycleSlice: StateCreator<
  QuizSlice,
  [["zustand/immer", unknown]], // enable immer middleware for mutation-like code
  [],
  QuizLifecycleSlice
> = (set, get) => ({
  // -----------------------
  // Initialize the quiz with a given mode & settings
  // - resets status, clears old data from persistence
  // - ensures the quiz starts clean
  // -----------------------
  initializeQuiz: async (mode, settings = {}) => {
    set((s) => {
      s.status = "loading"; // loading while initializing
      s.error = null;

      // ✅ Reset all main state fields
      s.mode = mode;
      s.settings = { ...s.settings, ...settings }; // merge new with old
      s.questions = []; // discard previously persisted questions
      s.userAnswers = {}; // clear old answers
      s.result = null;
      s.currentQuestionIndex = 0;
    });

    // ✅ Reset progress separately after init
    set((s) => {
      s.status = "idle"; // ready to start
      s.progress = {
        currentQuestionIndex: 0,
        totalQuestions: 0,
        questionsAnswered: 0,
        signsQuestionsAnswered: 0,
        rulesQuestionsAnswered: 0,
        percentComplete: 0,
        section: "mixed", // default until setQuestions determines otherwise
      };
    });
  },

  // -----------------------
  // Start quiz (activate user session)
  // - Fails if no questions loaded
  // -----------------------
  startQuiz: () => {
    if (get().questions.length === 0) {
      // ⚠️ Error state if there are no questions ready
      set((s) => {
        s.status = "error";
        s.error = "No questions available";
      });
      return;
    }
    // ✅ Start normally
    set((s) => {
      s.status = "active";
      s.currentQuestionIndex = 0;
    });
  },

  // -----------------------
  // Reset quiz back to "idle"
  // - Clears all progress, answers, and questions
  // - Keeps current mode/settings intact
  // -----------------------
  resetQuiz: () => {
    const { mode, settings } = get(); // preserve current config
    set((s) => {
      s.mode = mode;
      s.settings = settings;
      s.status = "idle";
      s.result = null;
      s.error = null;
      s.questions = [];
      s.userAnswers = {};
      // reset progress to fresh state
      s.progress = {
        currentQuestionIndex: 0,
        totalQuestions: 0,
        questionsAnswered: 0,
        signsQuestionsAnswered: 0,
        rulesQuestionsAnswered: 0,
        percentComplete: 0,
        section: "mixed",
      };
    });
  },

  // -----------------------
  // Submit quiz
  // - Validates user answers
  // - Calculates score using helper
  // - Moves status to "completed"
  // -----------------------
  submitQuiz: async () => {
    const { questions, userAnswers } = get();

    // Step 1: mark as submitting (UI can show spinner)
    set((s) => {
      s.status = "submitting";
    });

    try {
      // Step 2: check if every question has an answer
      const validation = validateUserAnswers(questions, userAnswers);
      if (!validation.isValid) {
        throw new Error("Please answer all questions before submitting.");
      }

      // Step 3: calculate the actual score
      const result = calculateScore(questions, userAnswers);

      // Step 4: mark quiz as completed and save result
      set((s) => {
        s.status = "completed";
        s.result = result;
      });

      return result;
    } catch (err) {
      // ⚠️ Handle submission failure
      set((s) => {
        s.status = "error";
        s.error = err instanceof Error ? err.message : "Submit failed";
      });
      return;
    }
  },

  // -----------------------
  // Update quiz settings on the fly
  // - Merges new settings into existing ones
  // -----------------------
  updateSettings: (settings) =>
    set((s) => {
      s.settings = { ...s.settings, ...settings };
    }),

  // -----------------------
  // Set an error manually
  // - Also forces status into "error" state
  // -----------------------
  setError: (err) =>
    set((s) => {
      s.error = err;
      if (err) s.status = "error";
    }),

  // -----------------------
  // Clear any existing error
  // - If the quiz was in "error", reset to "idle"
  // -----------------------
  clearError: () =>
    set((s) => {
      s.error = null;
      if (s.status === "error") s.status = "idle";
    }),
});
