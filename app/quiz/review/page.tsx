"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useAuthStore } from "@/stores";

type QuestionType = "signs" | "rules" | "all";

// Inner component that actually calls useSearchParams
function ReviewIncorrectPageInner() {
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
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-2xl font-semibold mb-2">Sign in required</h1>
        <p className="text-muted-foreground">
          Please sign in to review your incorrect questions.
        </p>
      </div>
    );
  }
}

// ✅ Default export wraps inner in Suspense
export default function ReviewIncorrectPage() {
  return (
    <Suspense fallback={<div>Loading review…</div>}>
      <ReviewIncorrectPageInner />
    </Suspense>
  );
}
