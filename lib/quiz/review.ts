import type { Question, UserAnswer } from "@/types/quiz";

export type QuizReviewFilter = "all" | "correct" | "incorrect";

export interface QuizReviewItem {
  readonly question: Question;
  readonly userAnswer: string | undefined;
  readonly isCorrect: boolean;
}

export function buildQuizReviewItems(
  questions: ReadonlyArray<Question>,
  userAnswers: Readonly<Record<number, UserAnswer>>
): QuizReviewItem[] {
  return questions.map((question) => {
    const userAnswer = userAnswers[question.id]?.selectedOption;
    return {
      question,
      userAnswer,
      isCorrect:
        userAnswer?.toUpperCase() === question.correct_option.toUpperCase(),
    };
  });
}

export function filterQuizReviewItems(
  items: ReadonlyArray<QuizReviewItem>,
  filter: QuizReviewFilter
): QuizReviewItem[] {
  if (filter === "correct") return items.filter((item) => item.isCorrect);
  if (filter === "incorrect") return items.filter((item) => !item.isCorrect);
  return [...items];
}
