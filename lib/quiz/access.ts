import type { Question } from "@/types/quiz";

export type QuizAccessReason =
  | "allowed"
  | "sign_in_required"
  | "upgrade_required"
  | "daily_limit"
  | "invalid_session"
  | "service_unavailable";

export interface QuizAccessDecision {
  allowed: boolean;
  isAuthenticated: boolean;
  isPaid: boolean;
  reason: QuizAccessReason;
  practiceRemaining: number | null;
  simulationRemaining: number | null;
  resetAt: string | null;
}

export type QuizStartResult =
  | {
      ok: true;
      questions: Question[];
      access: QuizAccessDecision;
    }
  | {
      ok: false;
      questions: [];
      access: QuizAccessDecision;
    };

export const UNAVAILABLE_QUIZ_ACCESS: QuizAccessDecision = {
  allowed: false,
  isAuthenticated: false,
  isPaid: false,
  reason: "service_unavailable",
  practiceRemaining: null,
  simulationRemaining: null,
  resetAt: null,
};
