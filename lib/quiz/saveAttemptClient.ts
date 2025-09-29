"use client";

import supabase from "@/lib/supabase-client";
import type { Json } from "@/types/supabase";

export interface ClientCreateAttemptInput {
  quizType: "signs" | "rules" | "simulation";
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
    questionType?: "signs" | "rules";
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
  const userAnswersJson: Json = {
    answers: input.answers,
    breakdown: input.breakdown ?? null,
  };

  // Ensure user is authenticated and capture user_id for RLS
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError) throw new Error(authError.message);
  if (!user) throw new Error("You must be signed in to save attempts");

  const { data, error } = await supabase
    .from("quiz_attempts")
    .insert({
      user_id: user.id,
      quiz_type: input.quizType,
      is_practice: input.isPractice,
      practice_type: input.practiceType ?? null,
      is_timed: Boolean(input.isTimed),
      time_taken_seconds: input.timeTakenSeconds ?? null,
      score: input.score,
      total_questions_in_attempt: input.totalQuestions,
      question_ids: input.questionIds,
      user_answers: userAnswersJson,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);

  // Upsert incorrect questions for targeted review
  try {
    const incorrectQuestionIds = input.answers
      .filter((a) => a.isCorrect === false)
      .map((a) => a.questionId);

    if (incorrectQuestionIds.length > 0) {
      // Alternative approach: delete existing, then insert new ones
      await supabase
        .from("user_incorrect_questions")
        .delete()
        .eq("user_id", user.id)
        .in("question_id", incorrectQuestionIds);

      const rows = input.answers
        .filter((a) => a.isCorrect === false)
        .map((a) => ({
          user_id: user.id,
          question_id: a.questionId,
          question_type: a.questionType,
        }));

      const { error: insertError } = await supabase
        .from("user_incorrect_questions")
        .insert(rows);

      if (insertError) {
        throw insertError;
      }
    }
  } catch (e) {
    // Non-fatal: attempt saved even if incorrect tracking fails
    // Silently handle errors to avoid disrupting the user experience
  }

  return data.id;
}

/**
 * Removes correctly answered questions from the user's incorrect questions list
 * This is used after completing an incorrect questions review quiz
 */
export async function removeCorrectlyAnsweredQuestions(
  questionIds: number[]
): Promise<void> {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError) throw new Error(authError.message);
  if (!user)
    throw new Error("You must be signed in to update incorrect questions");

  if (questionIds.length === 0) return;

  const { error } = await supabase
    .from("user_incorrect_questions")
    .delete()
    .eq("user_id", user.id)
    .in("question_id", questionIds);

  if (error) {
    throw new Error(`Failed to remove questions: ${error.message}`);
  }
}
