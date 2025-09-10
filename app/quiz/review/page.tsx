"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores";
import { IncorrectQuestionsReview } from "@/components/quiz";

type QuestionType = "signs" | "rules" | "all";

export default function ReviewIncorrectPage() {
  const searchParams = useSearchParams();
  const user = useAuthStore((s) => s.user);

  const questionType: QuestionType = useMemo(() => {
    const raw = (searchParams.get("questionType") || "all").toLowerCase();
    return ["signs", "rules", "all"].includes(raw)
      ? (raw as QuestionType)
      : "all";
  }, [searchParams]);

  const userId = user?.id || "";

  if (!userId) {
    // Render a lightweight message; access gating handled elsewhere if needed
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-2xl font-semibold mb-2">Sign in required</h1>
        <p className="text-muted-foreground">
          Please sign in to review your incorrect questions.
        </p>
      </div>
    );
  }

  return (
    <IncorrectQuestionsReview userId={userId} questionType={questionType} />
  );
}
