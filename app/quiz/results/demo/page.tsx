import ResultsDisplayClient from "@/components/quiz/state/ResultsDisplayClient";

export default function ResultsDemoPage() {
  // Sample data to preview the Results UI
  const total = 40;
  const correct = 32;
  const passingScore = 32;
  const signsCorrect = 18;
  const rulesCorrect = 14;
  const signsTotal = 20;
  const rulesTotal = 20;

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
