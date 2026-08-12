import { LocalQuizHistory } from "@/components/quiz/LocalQuizHistory";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function RecentResultsPage() {
  return (
    <PageLayout
      title="Recent Results on This Device"
      subtitle="Revisit the last three free answer reviews saved in this browser."
    >
      <div className="container mx-auto max-w-6xl px-4 pb-16">
        <LocalQuizHistory />
      </div>
    </PageLayout>
  );
}
