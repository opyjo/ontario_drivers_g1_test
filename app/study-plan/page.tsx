import { StudyPlanner } from "@/components/study-plan/study-planner";
import { PageLayout } from "@/components/layouts/PageLayout";
import { publicMetadata } from "@/lib/seo";

export const metadata = publicMetadata({
  title: "Ontario G1 Study Planner",
  description:
    "Set an Ontario G1 test date, choose a daily study goal, and download calendar reminders.",
  path: "/study-plan",
});

export default function StudyPlanPage() {
  return (
    <PageLayout
      title="Build Your G1 Study Plan"
      subtitle="Choose a test date, set a realistic daily target, and keep the plan private on your device."
    >
      <div className="container mx-auto max-w-6xl px-4 pb-16">
        <StudyPlanner />
      </div>
    </PageLayout>
  );
}
