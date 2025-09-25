// stores/quiz/selectors/navigation.ts
import { useQuizStore } from "../quizStore";

export const useCurrentQuestionIndex = () =>
  useQuizStore((s) => s.currentQuestionIndex);

export const useCurrentQuestionNumber = () =>
  useQuizStore((s) => s.currentQuestionIndex + 1);

export const useIsFirstQuestion = () =>
  useQuizStore((s) => s.currentQuestionIndex === 0);

export const useIsLastQuestion = () =>
  useQuizStore((s) => s.currentQuestionIndex === s.questions.length - 1);

export const useCanGoNext = () =>
  useQuizStore((s) => s.currentQuestionIndex < s.questions.length - 1);

export const useCanGoPrevious = () =>
  useQuizStore((s) => s.currentQuestionIndex > 0);
