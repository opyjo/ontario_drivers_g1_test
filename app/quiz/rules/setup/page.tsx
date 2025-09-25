import { PracticeSetupPage } from "@/components/quiz/setup/PracticeSetupPage";
import { BookOpen } from "lucide-react";
import { getIncorrectCountForUser } from "@/app/actions/check-incorrect-count";

export default async function RulesPracticeSetupPage() {
  const incorrectCount = await getIncorrectCountForUser("rules");

  return (
    <PracticeSetupPage
      title="Rules of the Road Practice"
      subtitle="Sharpen your knowledge with a quick set of random road rules or review your mistakes."
      icon={<BookOpen className="w-6 h-6 text-blue-600" />}
      basePath="rules"
      quickDescription="Start a practice session with a random set of driving rules."
      incorrectDescription="You have {count} incorrectly answered questions saved."
      incorrectCount={incorrectCount}
      infoText="Practice with real G1 test questions covering driving rules, right-of-way, intersections, and road safety."
    />
  );
}
