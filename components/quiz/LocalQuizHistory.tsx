"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Clock3, HardDrive, History, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QuestionReview } from "@/components/quiz/QuestionReview";
import { buildQuizReviewItems } from "@/lib/quiz/review";
import {
  LOCAL_QUIZ_HISTORY_KEY,
  readLocalQuizHistory,
  type LocalQuizAttempt,
} from "@/lib/quiz/local-history";

const QUIZ_LABELS = {
  signs: "Traffic signs practice",
  rules: "Rules of the road practice",
  simulation: "G1 exam simulation",
} as const;

export function LocalQuizHistory() {
  const [history, setHistory] = useState<LocalQuizAttempt[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const refresh = () => {
      const attempts = readLocalQuizHistory();
      setHistory(attempts);
      setSelectedId((current) =>
        current && attempts.some((attempt) => attempt.id === current)
          ? current
          : attempts[0]?.id ?? null
      );
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === LOCAL_QUIZ_HISTORY_KEY) refresh();
    };

    refresh();
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const selectedAttempt = history.find((attempt) => attempt.id === selectedId);
  const reviewItems = useMemo(
    () =>
      selectedAttempt
        ? buildQuizReviewItems(
            selectedAttempt.questions,
            selectedAttempt.userAnswers
          )
        : [],
    [selectedAttempt]
  );
  const questionNumbers = useMemo(
    () =>
      new Map(
        (selectedAttempt?.questions ?? []).map((question, index) => [
          question.id,
          index + 1,
        ])
      ),
    [selectedAttempt]
  );

  if (!history.length) {
    return (
      <Card className="text-center">
        <CardHeader>
          <History className="mx-auto h-10 w-10 text-primary" aria-hidden="true" />
          <CardTitle>No recent results on this device</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="mx-auto max-w-xl text-sm leading-6 text-muted-foreground">
            Complete a free practice test or simulation and the last three answer
            reviews will appear here in this browser.
          </p>
          <Button asChild>
            <Link href="/g1-practice-test">Start a practice test</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start">
      <aside className="space-y-3" aria-label="Recent results">
        {history.map((attempt) => {
          const selected = attempt.id === selectedId;
          const percentage = attempt.totalQuestions
            ? Math.round((attempt.score / attempt.totalQuestions) * 100)
            : 0;
          return (
            <button
              key={attempt.id}
              type="button"
              onClick={() => setSelectedId(attempt.id)}
              aria-pressed={selected}
              className={`w-full rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                selected
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:bg-muted/50"
              }`}
            >
              <span className="block font-semibold">
                {QUIZ_LABELS[attempt.quizType]}
              </span>
              <span className="mt-2 block text-2xl font-bold text-primary">
                {attempt.score}/{attempt.totalQuestions} · {percentage}%
              </span>
              <span className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
                {new Intl.DateTimeFormat("en-CA", {
                  dateStyle: "medium",
                  timeStyle: "short",
                }).format(new Date(attempt.completedAt))}
              </span>
            </button>
          );
        })}

        <div className="rounded-xl border border-border bg-muted/30 p-4 text-xs leading-5 text-muted-foreground">
          <p className="flex items-center gap-2 font-semibold text-foreground">
            <HardDrive className="h-4 w-4" aria-hidden="true" />
            Stored only on this device
          </p>
          <p className="mt-2">
            Clearing browser storage removes these reviews. Paid cloud history is
            available across devices.
          </p>
        </div>
      </aside>

      {selectedAttempt ? (
        <section aria-labelledby="local-review-heading" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle id="local-review-heading">
                {QUIZ_LABELS[selectedAttempt.quizType]}
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>
                Review all {selectedAttempt.totalQuestions} answers and their
                handbook explanations.
              </p>
              <Button asChild variant="outline" className="shrink-0">
                <Link href="/pricing">
                  <LockKeyhole className="h-4 w-4" aria-hidden="true" />
                  Compare cloud history
                </Link>
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-4">
            {reviewItems.map((item) => (
              <QuestionReview
                key={item.question.id}
                question={item.question}
                userAnswer={item.userAnswer}
                isCorrect={item.isCorrect}
                questionNumber={questionNumbers.get(item.question.id) ?? 0}
                reviewContext="all"
              />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
