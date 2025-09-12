"use client";

import { PracticeSetupPage } from "@/components/quiz/setup/PracticeSetupPage";
import { BookOpen } from "lucide-react";

export default function RulesPracticeSetupPage() {
  return (
    <PracticeSetupPage
      title="Rules of the Road Practice"
      subtitle="Sharpen your knowledge with a quick set of random road rules or review your mistakes."
      icon={<BookOpen className="w-6 h-6 text-blue-600" />}
      basePath="rules"
      quickDescription="Start a practice session with a random set of driving rules."
      incorrectDescription="You have {count} incorrectly answered questions saved."
      incorrectCount={51} // Replace with real state
      infoText="Practice with real G1 test questions covering driving rules, right-of-way, intersections, and road safety."
    />
  );
}
