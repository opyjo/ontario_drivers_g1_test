// stores/quiz/index.ts
// Central export for easy imports throughout the app

export { useQuizStore, hydrateQuizStore } from "./quizStore"; // Zustand store hook
export * from "./selectors"; // Convenience state selectors
