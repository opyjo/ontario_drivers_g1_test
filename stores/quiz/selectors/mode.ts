// stores/quiz/selectors/mode.ts
import { useQuizStore } from "../quizStore";

// Quiz mode info
export const useIsSimulation = () =>
  useQuizStore((s) => s.mode === "simulation");

export const useIsPracticeMode = () =>
  useQuizStore(
    (s) => s.mode === "signs_practice" || s.mode === "rules_practice"
  );
