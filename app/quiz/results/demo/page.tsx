import ResultsDisplayClient from "@/components/quiz/state/ResultsDisplayClient";

export default function ResultsDemoPage() {
  // Sample data to preview the Results UI
  const total = 20;
  const correct = 16;
  const passingScore = 16; // Shows as "Passed"
  const signsCorrect = 10;
  const rulesCorrect = 6;
  const signsTotal = 10;
  const rulesTotal = 10;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        <ResultsDisplayClient
          total={total}
          correct={correct}
          passingScore={passingScore}
          signsCorrect={signsCorrect}
          rulesCorrect={rulesCorrect}
          signsTotal={signsTotal}
          rulesTotal={rulesTotal}
          retryHref="/quiz/signs?limit=20"
          reviewHref="/quiz/review?questionType=signs"
          canReviewIncorrect
        />
      </div>
    </div>
  );
}
