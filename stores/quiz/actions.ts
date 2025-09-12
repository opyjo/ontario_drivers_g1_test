// actions.ts
// Slice action hooks: stable references to mutations
import { useQuizStore } from "./quizStore";

export const useInitializeQuiz = () => useQuizStore((s) => s.initializeQuiz);
export const useStartQuiz = () => useQuizStore((s) => s.startQuiz);
export const useResetQuiz = () => useQuizStore((s) => s.resetQuiz);
export const useSubmitQuiz = () => useQuizStore((s) => s.submitQuiz);

export const useGoToQuestion = () => useQuizStore((s) => s.goToQuestion);
export const useNextQuestion = () => useQuizStore((s) => s.nextQuestion);
export const usePreviousQuestion = () =>
  useQuizStore((s) => s.previousQuestion);
export const useSelectAnswer = () => useQuizStore((s) => s.selectAnswer);
export const useUpdateAnswer = () => useQuizStore((s) => s.updateAnswer);

export const useUpdateSettings = () => useQuizStore((s) => s.updateSettings);
export const useSetError = () => useQuizStore((s) => s.setError);
export const useClearError = () => useQuizStore((s) => s.clearError);

export const useSetQuestions = () => useQuizStore((s) => s.setQuestions);
export const useGetCurrentQuestion = () =>
  useQuizStore((s) => s.getCurrentQuestion);
export const useIsQuestionAnswered = () =>
  useQuizStore((s) => s.isQuestionAnswered);
export const useGetAnswerForQuestion = () =>
  useQuizStore((s) => s.getAnswerForQuestion);
export const useCanSubmitQuiz = () => useQuizStore((s) => s.canSubmitQuiz);
