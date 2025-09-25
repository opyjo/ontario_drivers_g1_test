// stores/quiz/selectors/lifecycle.ts
import { useQuizStore } from "../quizStore";

// Lifecycle state
export const useQuizMode = () => useQuizStore((s) => s.mode);
export const useQuizStatus = () => useQuizStore((s) => s.status);
export const useQuizResult = () => useQuizStore((s) => s.result);
export const useQuizSettings = () => useQuizStore((s) => s.settings);
export const useQuizError = () => useQuizStore((s) => s.error);

// Status flags
export const useIsLoading = () => useQuizStore((s) => s.status === "loading");
export const useIsActive = () => useQuizStore((s) => s.status === "active");
export const useIsCompleted = () =>
  useQuizStore((s) => s.status === "completed");
export const useIsSubmitting = () =>
  useQuizStore((s) => s.status === "submitting");
export const useHasError = () => useQuizStore((s) => s.status === "error");
