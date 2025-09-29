import { PracticeSetupPage } from "@/components/quiz/setup/PracticeSetupPage";
import { Target } from "lucide-react";
import {
  getIncorrectCountForUser,
  hasUserTakenQuizzes,
} from "@/app/actions/check-incorrect-count";

export default async function SignsPracticeSetupPage() {
  const [incorrectCount, userHasTakenQuizzes] = await Promise.all([
    getIncorrectCountForUser("signs"),
    hasUserTakenQuizzes(),
  ]);

  return (
    <PracticeSetupPage
      title="Traffic Signs Practice"
      subtitle="Sharpen your skills with a quick set of random traffic signs or review your mistakes."
      icon={<Target className="w-6 h-6 text-primary" />}
      basePath="signs"
      quickDescription="Start a practice session with a random set of traffic signs."
      incorrectDescription="You have {count} incorrectly answered questions saved."
      incorrectCount={incorrectCount}
      hasUserTakenQuizzes={userHasTakenQuizzes}
      infoText="Practice with real G1 test questions covering traffic signs, road markings, and traffic control devices."
    />
  );
}
