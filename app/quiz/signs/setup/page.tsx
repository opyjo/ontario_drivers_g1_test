"use client";

import { PracticeSetupPage } from "@/components/quiz/setup/PracticeSetupPage";
import { Target } from "lucide-react";

export default function SignsPracticeSetupPage() {
  return (
    <PracticeSetupPage
      title="Traffic Signs Practice"
      subtitle="Sharpen your skills with a quick set of random traffic signs or review your mistakes."
      icon={<Target className="w-6 h-6 text-red-600" />}
      basePath="signs"
      quickDescription="Start a practice session with a random set of traffic signs."
      incorrectDescription="You have {count} incorrectly answered questions saved."
      incorrectCount={24} // Replace with real state
      infoText="Practice with real G1 test questions covering traffic signs, road markings, and traffic control devices."
    />
  );
}
