"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getIncorrectQuestions } from "@/lib/quiz/server-actions";

export async function getIncorrectCountForUser(
  questionType: "signs" | "rules" | "all"
): Promise<number> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id ?? null;
  if (!userId) return 0;

  const questions = await getIncorrectQuestions(userId, questionType);
  return questions.length;
}

/**
 * Check if user has ever taken any quizzes
 * Returns true if user has quiz attempts, false if they're a new user
 */
export async function hasUserTakenQuizzes(): Promise<boolean> {
  const supabase = createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const userId = user?.id ?? null;
  if (!userId) return false;

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select("id")
    .eq("user_id", userId)
    .limit(1)
    .single();

  // If no error and we have data, user has taken quizzes
  // If error is "PGRST116" (no rows), user hasn't taken any quizzes
  return !error && !!data;
}
