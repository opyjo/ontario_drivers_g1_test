import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getDailyReviewQuestions } from "@/app/actions/learning";
import { DailyReviewQuiz } from "@/components/quiz/modes/DailyReviewQuiz";
import { checkFeatureAccess } from "@/lib/authorization/helpers";

export default async function DailyReviewPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?redirect=/quiz/daily-review");
  const access = await checkFeatureAccess("premium_feature");
  if (!access.canAccess) redirect("/pricing?feature=daily-review");

  const questions = await getDailyReviewQuestions();
  return <DailyReviewQuiz initialQuestions={questions} />;
}
