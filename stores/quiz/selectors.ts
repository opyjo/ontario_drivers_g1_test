// selectors.ts
// Slice selectors: read-only convenience hooks
import { useQuizStore } from "./quizStore";

export const useQuizMode = () => useQuizStore((s) => s.mode);
export const useQuizStatus = () => useQuizStore((s) => s.status);
export const useQuizQuestions = () => useQuizStore((s) => s.questions);
export const useQuizResult = () => useQuizStore((s) => s.result);
export const useQuizProgress = () => useQuizStore((s) => s.progress);
export const useCurrentQuestionIndex = () =>
  useQuizStore((s) => s.currentQuestionIndex);
export const useUserAnswers = () => useQuizStore((s) => s.userAnswers);

export const useCurrentQuestion = () =>
  useQuizStore((s) => s.questions[s.currentQuestionIndex] || null);

export const useIsLoading = () => useQuizStore((s) => s.status === "loading");
export const useIsActive = () => useQuizStore((s) => s.status === "active");
export const useIsCompleted = () =>
  useQuizStore((s) => s.status === "completed");
export const useIsSubmitting = () =>
  useQuizStore((s) => s.status === "submitting");
export const useHasError = () => useQuizStore((s) => s.status === "error");

export const useProgressPercentage = () =>
  useQuizStore((s) => s.progress.percentComplete);

export const useIsFirstQuestion = () =>
  useQuizStore((s) => s.currentQuestionIndex === 0);
export const useIsLastQuestion = () =>
  useQuizStore((s) => s.currentQuestionIndex === s.questions.length - 1);
export const useCanGoNext = () =>
  useQuizStore((s) => s.currentQuestionIndex < s.questions.length - 1);
export const useCanGoPrevious = () =>
  useQuizStore((s) => s.currentQuestionIndex > 0);

export const useCanSubmit = () =>
  useQuizStore(
    (s) =>
      s.questions.length > 0 &&
      Object.keys(s.userAnswers).length === s.questions.length &&
      s.status === "active"
  );

export const useTotalQuestions = () => useQuizStore((s) => s.questions.length);
export const useCurrentQuestionNumber = () =>
  useQuizStore((s) => s.currentQuestionIndex + 1);
export const useAnsweredQuestionsCount = () =>
  useQuizStore((s) => Object.keys(s.userAnswers).length);

export const useIsSimulation = () =>
  useQuizStore((s) => s.mode === "simulation");
export const useIsPracticeMode = () =>
  useQuizStore(
    (s) => s.mode === "signs_practice" || s.mode === "rules_practice"
  );
