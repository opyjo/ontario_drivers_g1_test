import type { Question, UserAnswer } from "@/types/quiz";

export const LOCAL_QUIZ_HISTORY_KEY = "drivetest-pro:quiz-history:v1";
export const LOCAL_QUIZ_HISTORY_LIMIT = 3;

export type LocalQuizType = "signs" | "rules" | "simulation";

export interface LocalQuizAttempt {
  version: 1;
  id: string;
  quizType: LocalQuizType;
  score: number;
  totalQuestions: number;
  completedAt: string;
  questions: Question[];
  userAnswers: Record<number, UserAnswer>;
}

interface NewLocalQuizAttempt {
  quizType: LocalQuizType;
  score: number;
  totalQuestions: number;
  completedAt?: string;
  questions: ReadonlyArray<Question>;
  userAnswers: Readonly<Record<number, UserAnswer>>;
}

function isQuizType(value: unknown): value is LocalQuizType {
  return value === "signs" || value === "rules" || value === "simulation";
}

function isQuestion(value: unknown): value is Question {
  if (!value || typeof value !== "object") return false;
  const question = value as Partial<Question>;
  return (
    typeof question.id === "number" &&
    (question.question_type === "signs" || question.question_type === "rules") &&
    typeof question.question_text === "string" &&
    typeof question.option_a === "string" &&
    typeof question.option_b === "string" &&
    typeof question.option_c === "string" &&
    typeof question.option_d === "string" &&
    typeof question.correct_option === "string" &&
    (question.image_url === null || typeof question.image_url === "string") &&
    (question.image_description === null ||
      typeof question.image_description === "string") &&
    typeof question.category === "string" &&
    typeof question.explanation === "string" &&
    typeof question.learning_topic === "string" &&
    typeof question.handbook_section === "string" &&
    typeof question.handbook_url === "string"
  );
}

function isUserAnswer(value: unknown): value is UserAnswer {
  if (!value || typeof value !== "object") return false;
  const answer = value as Partial<UserAnswer>;
  return (
    typeof answer.questionId === "number" &&
    typeof answer.selectedOption === "string"
  );
}

function isLocalQuizAttempt(value: unknown): value is LocalQuizAttempt {
  if (!value || typeof value !== "object") return false;
  const attempt = value as Partial<LocalQuizAttempt>;
  return (
    attempt.version === 1 &&
    typeof attempt.id === "string" &&
    isQuizType(attempt.quizType) &&
    typeof attempt.score === "number" &&
    typeof attempt.totalQuestions === "number" &&
    typeof attempt.completedAt === "string" &&
    Number.isFinite(Date.parse(attempt.completedAt)) &&
    Array.isArray(attempt.questions) &&
    attempt.questions.every(isQuestion) &&
    Boolean(attempt.userAnswers) &&
    typeof attempt.userAnswers === "object" &&
    Object.values(attempt.userAnswers).every(isUserAnswer)
  );
}

export function parseLocalQuizHistory(raw: string | null): LocalQuizAttempt[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isLocalQuizAttempt).slice(0, LOCAL_QUIZ_HISTORY_LIMIT);
  } catch {
    return [];
  }
}

export function addLocalQuizAttempt(
  history: ReadonlyArray<LocalQuizAttempt>,
  input: NewLocalQuizAttempt
): LocalQuizAttempt[] {
  const completedAt = input.completedAt || new Date().toISOString();
  const id = `${completedAt}-${input.quizType}`;
  const attempt: LocalQuizAttempt = {
    version: 1,
    id,
    quizType: input.quizType,
    score: input.score,
    totalQuestions: input.totalQuestions,
    completedAt,
    questions: [...input.questions],
    userAnswers: { ...input.userAnswers },
  };

  return [attempt, ...history.filter((item) => item.id !== id)].slice(
    0,
    LOCAL_QUIZ_HISTORY_LIMIT
  );
}

export function readLocalQuizHistory() {
  if (typeof window === "undefined") return [];
  return parseLocalQuizHistory(window.localStorage.getItem(LOCAL_QUIZ_HISTORY_KEY));
}

export function saveLocalQuizAttempt(input: NewLocalQuizAttempt) {
  if (typeof window === "undefined") return [];
  const history = addLocalQuizAttempt(readLocalQuizHistory(), input);
  window.localStorage.setItem(LOCAL_QUIZ_HISTORY_KEY, JSON.stringify(history));
  return history;
}
