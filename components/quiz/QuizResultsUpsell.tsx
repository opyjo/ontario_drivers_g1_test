"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { HardDrive } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuestionReview } from "@/components/quiz/QuestionReview";
import {
  buildQuizReviewItems,
  filterQuizReviewItems,
  type QuizReviewFilter,
} from "@/lib/quiz/review";
import type { Question, UserAnswer } from "@/types/quiz";
import {
  saveLocalQuizAttempt,
  type LocalQuizType,
} from "@/lib/quiz/local-history";

export function QuizResultsUpsell({
  score,
  totalQuestions,
  isAuthenticated,
  returnPath,
  guideHref,
  guideLabel,
  questions,
  userAnswers,
  quizType,
}: Readonly<{
  score: number;
  totalQuestions: number;
  isAuthenticated: boolean;
  returnPath: string;
  guideHref: string;
  guideLabel: string;
  questions: ReadonlyArray<Question>;
  userAnswers: Readonly<Record<number, UserAnswer>>;
  quizType: LocalQuizType;
}>) {
  const hasSavedLocally = useRef(false);
  const [localSaveState, setLocalSaveState] = useState<
    "pending" | "saved" | "failed"
  >("pending");
  const reviewItems = useMemo(
    () => buildQuizReviewItems(questions, userAnswers),
    [questions, userAnswers]
  );
  const questionNumbers = useMemo(
    () => new Map(questions.map((question, index) => [question.id, index + 1])),
    [questions]
  );
  const incorrectCount = reviewItems.filter((item) => !item.isCorrect).length;
  const [filter, setFilter] = useState<QuizReviewFilter>(() =>
    incorrectCount > 0 ? "incorrect" : "all"
  );
  const visibleItems = filterQuizReviewItems(reviewItems, filter);

  useEffect(() => {
    if (hasSavedLocally.current) return;
    hasSavedLocally.current = true;
    try {
      saveLocalQuizAttempt({
        quizType,
        score,
        totalQuestions,
        questions,
        userAnswers,
      });
      setLocalSaveState("saved");
    } catch (error) {
      setLocalSaveState("failed");
      console.error("Could not save the local quiz review", error);
    }
  }, [questions, quizType, score, totalQuestions, userAnswers]);

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <Card className="text-center" aria-labelledby="quiz-result-heading">
        <CardHeader>
          <CardTitle id="quiz-result-heading">Quiz complete</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p
            className="text-3xl font-bold"
            aria-label={`${score} out of ${totalQuestions} correct`}
          >
            {score} / {totalQuestions}
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Your answer explanations are available below. {localSaveState === "saved"
              ? "This review is saved on this device; paid access adds cloud history, adaptive review, and unlimited practice."
              : localSaveState === "failed"
                ? "This browser could not save the review, but you can still read it below."
                : "Saving this review on your device…"}
          </p>
        </CardContent>
        <CardFooter className="flex flex-col flex-wrap justify-center gap-2 sm:flex-row">
          <Button asChild>
            <Link href={isAuthenticated ? "/pricing" : `/signup?redirect=${encodeURIComponent(returnPath)}`}>
              {isAuthenticated ? "Unlock full access" : "Create free account"}
            </Link>
          </Button>
          {!isAuthenticated ? (
            <Button asChild variant="outline">
              <Link href={`/auth?redirect=${encodeURIComponent(returnPath)}`}>Sign in</Link>
            </Button>
          ) : null}
          <Button asChild variant="ghost" className="w-full">
            <Link href={guideHref}>{guideLabel}</Link>
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/quiz/recent-results">
              <HardDrive className="h-4 w-4" aria-hidden="true" />
              View recent results on this device
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <section aria-labelledby="answer-review-heading" className="space-y-4">
        <div>
          <h2 id="answer-review-heading" className="text-xl font-bold sm:text-2xl">
            Review your answers
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Learn from every answer now. The last three reviews stay in this browser;
            long-term cloud progress remains a paid feature.
          </p>
        </div>

        <Tabs value={filter} onValueChange={(value) => setFilter(value as QuizReviewFilter)}>
          <TabsList className="grid h-auto w-full grid-cols-3">
            <TabsTrigger className="min-h-11" value="incorrect">
              Incorrect ({incorrectCount})
            </TabsTrigger>
            <TabsTrigger className="min-h-11" value="all">
              All ({reviewItems.length})
            </TabsTrigger>
            <TabsTrigger className="min-h-11" value="correct">
              Correct ({reviewItems.length - incorrectCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <p className="sr-only" aria-live="polite">
          Showing {visibleItems.length} {filter} answer{visibleItems.length === 1 ? "" : "s"}.
        </p>
        <div className="space-y-4">
          {visibleItems.length ? (
            visibleItems.map((item) => (
              <QuestionReview
                key={item.question.id}
                question={item.question}
                userAnswer={item.userAnswer}
                isCorrect={item.isCorrect}
                questionNumber={questionNumbers.get(item.question.id) ?? 0}
                reviewContext={filter}
              />
            ))
          ) : (
            <p className="rounded-xl border border-border bg-card p-5 text-center text-sm text-muted-foreground">
              No answers in this category.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
