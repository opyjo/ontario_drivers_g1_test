"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import type { QuestionLimit } from "@/types/quiz";
import { isValidQuestionLimit } from "@/lib/quiz/utils";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";
import { SignsPracticeQuiz } from "@/components/quiz";

function SignsPracticePageInner() {
  const searchParams = useSearchParams();

  // 1️⃣ Compute & validate question limit
  const limit: QuestionLimit = useMemo(() => {
    const raw = Number(searchParams.get("limit"));

    if (Number.isFinite(raw) && isValidQuestionLimit(raw)) {
      return raw as QuestionLimit;
    }

    // fallback to default 20
    return QUESTION_LIMITS.MEDIUM_PRACTICE as QuestionLimit;
  }, [searchParams]);

  // 2️⃣ Render the quiz with a safe validated questionLimit
  return <SignsPracticeQuiz questionLimit={limit} />;
}

export default function SignsPracticePage() {
  return (
    <Suspense fallback={<div>Loading signs practice quiz…</div>}>
      <SignsPracticePageInner />
    </Suspense>
  );
}
