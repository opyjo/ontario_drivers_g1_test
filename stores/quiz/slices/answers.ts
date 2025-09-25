// stores/quiz/slices/answers.ts
// Handling user answers, updating progress, and helper utilities

import { StateCreator } from "zustand";
import { Question, QuizStore } from "@/types/quiz";

export interface QuizAnswersSlice {
  selectAnswer: (id: number, opt: string) => void;
  updateAnswer: (id: number, opt: string) => void;
  setQuestions: (qs: Question[]) => void;
  getCurrentQuestion: () => Question | null;
  isQuestionAnswered: (id: number) => boolean;
  getAnswerForQuestion: (
    id: number
  ) => { questionId: number; selectedOption: string } | null;
  canSubmitQuiz: () => boolean;
}

export const createAnswersSlice: StateCreator<
  QuizStore,
  [["zustand/immer", unknown]],
  [],
  QuizAnswersSlice
> = (set, get) => ({
  // Answering logic
  selectAnswer: (id, opt) => {
    set((s) => {
      s.userAnswers[id] = { questionId: id, selectedOption: opt.toLowerCase() };

      const answered = Object.keys(s.userAnswers).length;
      s.progress.questionsAnswered = answered;
      s.progress.percentComplete =
        s.progress.totalQuestions > 0
          ? Math.round((answered / s.progress.totalQuestions) * 100)
          : 0;

      // Count answered by category (signs vs rules)
      const answeredIds = Object.keys(s.userAnswers).map(Number);

      s.progress.signsQuestionsAnswered = answeredIds.filter((qid) =>
        s.questions.find((q) => q.id === qid && q.question_type === "signs")
      ).length;

      s.progress.rulesQuestionsAnswered = answeredIds.filter((qid) =>
        s.questions.find((q) => q.id === qid && q.question_type === "rules")
      ).length;
    });
  },

  updateAnswer: (id, opt) => get().selectAnswer(id, opt),

  // ✅ Improved: Set questions and reset all session state
  setQuestions: (qs: Question[]) =>
    set((s) => {
      s.questions = [...qs]; // overwrite with new set
      s.currentQuestionIndex = 0; // reset index
      s.userAnswers = {}; // clear old answers

      // reset progress
      s.progress.totalQuestions = qs.length;
      s.progress.currentQuestionIndex = 0;
      s.progress.questionsAnswered = 0;
      s.progress.signsQuestionsAnswered = 0;
      s.progress.rulesQuestionsAnswered = 0;
      s.progress.percentComplete = 0;

      // derive section type
      const hasSigns = qs.some((q) => q.question_type === "signs");
      const hasRules = qs.some((q) => q.question_type === "rules");
      s.progress.section =
        hasSigns && hasRules ? "mixed" : hasSigns ? "signs" : "rules";
    }),

  // Get the current question user is on
  getCurrentQuestion: () => {
    const st = get();
    return st.questions[st.currentQuestionIndex] || null;
  },

  // Helpers
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
});
