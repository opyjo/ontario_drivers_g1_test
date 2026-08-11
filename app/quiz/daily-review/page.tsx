import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getDailyReviewQuestions } from "@/app/actions/learning";
import { DailyReviewQuiz } from "@/components/quiz/modes/DailyReviewQuiz";

export default async function DailyReviewPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?redirect=/quiz/daily-review");

  const questions = await getDailyReviewQuestions();
  return <DailyReviewQuiz initialQuestions={questions} />;
}

