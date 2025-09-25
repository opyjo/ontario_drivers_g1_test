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
