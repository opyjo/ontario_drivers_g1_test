import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import DashboardClient from "@/components/dashboard/DashboardClient";
import { listMyQuizAttempts } from "@/app/actions/quiz-attempts";
import { getLearningInsights } from "@/app/actions/learning";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?redirect=/dashboard");
  }

  const [attempts, insights] = await Promise.all([
    listMyQuizAttempts({ limit: 20 }),
    getLearningInsights(),
  ]);

  return <DashboardClient attempts={attempts} insights={insights} />;
}
