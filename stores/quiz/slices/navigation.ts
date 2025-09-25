// stores/quiz/slices/navigation.ts
import { StateCreator } from "zustand";
import { QuizActions } from "@/types/quiz";
import { QuizSlice } from "./types";

export interface QuizNavigationSlice {
  goToQuestion: QuizActions["goToQuestion"];
  nextQuestion: QuizActions["nextQuestion"];
  previousQuestion: QuizActions["previousQuestion"];
}

export const createNavigationSlice: StateCreator<
  QuizSlice,
  [["zustand/immer", unknown]],
  [],
  QuizNavigationSlice
> = (set, get) => ({
  goToQuestion: (i) => {
    if (i >= 0 && i < get().questions.length) {
      set((s) => {
        s.currentQuestionIndex = i;
        s.progress.currentQuestionIndex = i;
      });
    }
  },

  nextQuestion: () => {
    const current = get().currentQuestionIndex;
    if (current < get().questions.length - 1) {
      get().goToQuestion(current + 1);
    }
  },

  previousQuestion: () => {
    const current = get().currentQuestionIndex;
    if (current > 0) {
      get().goToQuestion(current - 1);
    }
  },
});
