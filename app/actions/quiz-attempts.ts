"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Json } from "@/types/supabase";

export type QuizType = "signs" | "rules" | "simulation";

export interface UserAnswerRecord {
  questionId: number;
  selectedOption: string | null; // e.g. "A" | "B" | ... or null if skipped
  isCorrect: boolean;
  questionType?: "signs" | "rules"; // optional for mixed attempts
  // Minimal snapshot to support results rendering
  snapshot?: {
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string; // "A"|"B"|"C"|"D"
  };
}

export interface CreateQuizAttemptInput {
  quizType: QuizType;
  isPractice: boolean;
  practiceType?: string | null; // e.g. "quick", "medium", "extended", "review_incorrect"
  isTimed?: boolean;
  timeTakenSeconds?: number | null;
  score: number;
  totalQuestions: number;
  questionIds: number[];
  userAnswers: UserAnswerRecord[];
  // optional extra details stored within user_answers JSON
  breakdown?: {
    signsCorrect?: number;
    rulesCorrect?: number;
    signsTotal?: number;
    rulesTotal?: number;
  };
}

export interface CreateQuizAttemptResult {
  id: number;
}

// Inserts a quiz attempt for the authenticated user and returns the attempt id
export async function createQuizAttempt(
  input: CreateQuizAttemptInput
): Promise<CreateQuizAttemptResult> {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Failed to get user: ${userError.message}`);
  }

  if (!user) {
    throw new Error("Must be signed in to save quiz attempts");
  }

  const userAnswersJson: Json = {
    answers: input.userAnswers.map((a) => ({
      questionId: a.questionId,
      selectedOption: a.selectedOption,
      isCorrect: a.isCorrect,
      questionType: a.questionType ?? null,
      snapshot: a.snapshot
        ? {
            question_text: a.snapshot.question_text,
            option_a: a.snapshot.option_a,
            option_b: a.snapshot.option_b,
            option_c: a.snapshot.option_c,
            option_d: a.snapshot.option_d,
            correct_option: a.snapshot.correct_option,
          }
        : null,
    })),
    breakdown: input.breakdown ?? null,
  };

  const payload = {
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
  };

  const { data, error } = await supabase
    .from("quiz_attempts")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to save quiz attempt: ${error.message}`);
  }

  return { id: data.id };
}

export interface QuizAttemptRow {
  id: number;
  created_at: string;
  user_id: string;
  quiz_type: string | null;
  is_practice: boolean | null;
  practice_type: string | null;
  is_timed: boolean | null;
  time_taken_seconds: number | null;
  score: number | null;
  total_questions_in_attempt: number | null;
  question_ids: number[] | null;
  user_answers: Json | null;
}

// Fetch a single quiz attempt owned by the current user
export async function getQuizAttemptById(
  id: number
): Promise<QuizAttemptRow | null> {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Failed to get user: ${userError.message}`);
  }
  if (!user) {
    throw new Error("Must be signed in to fetch quiz attempts");
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select(
      "id, created_at, user_id, quiz_type, is_practice, practice_type, is_timed, time_taken_seconds, score, total_questions_in_attempt, question_ids, user_answers"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116: row not found
    throw new Error(`Failed to fetch quiz attempt: ${error.message}`);
  }

  return (data as unknown as QuizAttemptRow) ?? null;
}

export interface ListQuizAttemptsOptions {
  limit?: number; // default 20
  offset?: number; // default 0
}

export async function listMyQuizAttempts(
  options: ListQuizAttemptsOptions = {}
): Promise<QuizAttemptRow[]> {
  const { limit = 20, offset = 0 } = options;
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Failed to get user: ${userError.message}`);
  }
  if (!user) {
    throw new Error("Must be signed in to list quiz attempts");
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select(
      "id, created_at, user_id, quiz_type, is_practice, practice_type, is_timed, time_taken_seconds, score, total_questions_in_attempt, question_ids, user_answers"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + Math.max(0, limit - 1));

  if (error) {
    throw new Error(`Failed to list quiz attempts: ${error.message}`);
  }

  return (data as unknown as QuizAttemptRow[]) ?? [];
}
