"use client";

import { useRouter } from "next/navigation";
import { ResultsDisplay } from "./ResultsDisplay";

interface ResultsDisplayClientProps {
  total: number;
  correct: number;
  passingScore: number;
  signsCorrect?: number;
  rulesCorrect?: number;
  signsTotal?: number;
  rulesTotal?: number;
  retryHref: string;
  reviewHref?: string;
  canReviewIncorrect?: boolean;
}

export function ResultsDisplayClient({
  total,
  correct,
  passingScore,
  signsCorrect,
  rulesCorrect,
  signsTotal,
  rulesTotal,
  retryHref,
  reviewHref,
  canReviewIncorrect = false,
}: Readonly<ResultsDisplayClientProps>) {
  const router = useRouter();

  const handleRetry = () => {
    router.push(retryHref);
  };

  const handleReviewIncorrect = () => {
    if (!reviewHref) return;
    router.push(reviewHref);
  };

  return (
    <ResultsDisplay
      total={total}
      correct={correct}
      signsCorrect={signsCorrect}
      rulesCorrect={rulesCorrect}
      signsTotal={signsTotal}
      rulesTotal={rulesTotal}
      passingScore={passingScore}
      onRetry={handleRetry}
      onReviewIncorrect={
        canReviewIncorrect && reviewHref ? handleReviewIncorrect : undefined
      }
    />
  );
}

export default ResultsDisplayClient;
