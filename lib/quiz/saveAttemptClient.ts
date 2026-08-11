"use client";

import { createQuizAttempt } from "@/app/actions/quiz-attempts";

export interface ClientCreateAttemptInput {
  quizType: "signs" | "rules" | "simulation" | "mixed";
  isPractice: boolean;
  practiceType?: string | null;
  isTimed?: boolean;
  timeTakenSeconds?: number | null;
  score: number;
  totalQuestions: number;
  questionIds: number[];
  answers: Array<{
    questionId: number;
    selectedOption: string | null;
    isCorrect: boolean;
    questionType: "signs" | "rules";
    snapshot: {
      question_text: string;
      option_a: string;
      option_b: string;
      option_c: string;
      option_d: string;
      correct_option: string;
    };
  }>;
  breakdown?: {
    signsCorrect?: number;
    rulesCorrect?: number;
    signsTotal?: number;
    rulesTotal?: number;
  };
}

export async function createQuizAttemptClient(
  input: ClientCreateAttemptInput
): Promise<number> {
  const result = await createQuizAttempt({
    quizType: input.quizType,
    isPractice: input.isPractice,
    practiceType: input.practiceType,
    isTimed: input.isTimed,
    timeTakenSeconds: input.timeTakenSeconds,
    score: input.score,
    totalQuestions: input.totalQuestions,
    questionIds: input.questionIds,
    userAnswers: input.answers.map((answer) => ({
      ...answer,
      selectedOption: answer.selectedOption?.toUpperCase() ?? null,
      questionType: answer.questionType,
    })),
    breakdown: input.breakdown,
  });

  return result.id;
}
