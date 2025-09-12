"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { QuestionLimit } from "@/types/quiz";
import { isValidQuestionLimit } from "@/lib/quiz/utils";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { RulesPracticeQuiz } from "@/components/quiz";

function RulesPracticePageInner() {
  const searchParams = useSearchParams();

  const limit: QuestionLimit = useMemo(() => {
    const raw = Number(searchParams.get("limit"));
    if (Number.isFinite(raw) && isValidQuestionLimit(raw)) {
      return raw as QuestionLimit;
    }
    return QUESTION_LIMITS.MEDIUM_PRACTICE as QuestionLimit; // default 20
  }, [searchParams]);

  return <RulesPracticeQuiz questionLimit={limit} />;
}

// ✅ Suspense boundary at the page root
export default function RulesPracticePage() {
  return (
    <Suspense fallback={<div>Loading rules practice quiz…</div>}>
      <RulesPracticePageInner />
    </Suspense>
  );
}
