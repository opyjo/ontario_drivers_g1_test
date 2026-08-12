"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Question } from "@/types/quiz";
import { useAuthStore } from "@/stores";
import { useQuizStore } from "@/stores/quiz/quizStore";
import {
  useIsCompleted,
  useQuizQuestions,
  useQuizResult,
  useTotalQuestions,
} from "@/stores/quiz/selectors";
import { useSubmitQuiz } from "@/stores/quiz/actions";
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuizWorkspace } from "@/components/quiz/core/QuizWorkspace";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { Button } from "@/components/ui/button";
import { createQuizAttemptClient } from "@/lib/quiz/saveAttemptClient";

export function DailyReviewQuiz({
  initialQuestions,
}: Readonly<{ initialQuestions: Question[] }>) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const questions = useQuizQuestions();
  const totalQuestions = useTotalQuestions();
  const isCompleted = useIsCompleted();
  const result = useQuizResult();
  const submitQuiz = useSubmitQuiz();
  const initialized = useRef(false);
  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);

  useEffect(() => {
    if (initialized.current || initialQuestions.length === 0) return;
    initialized.current = true;
    const store = useQuizStore.getState();
    void store.initializeQuiz("daily_review").then(() => {
      const current = useQuizStore.getState();
      current.setQuestions(initialQuestions);
      current.startQuiz();
    });
  }, [initialQuestions]);

  useEffect(() => {
    if (!isCompleted || !result || !user || hasSavedAttempt) return;
    let cancelled = false;
    const save = async () => {
      try {
        const answers = useQuizStore.getState().userAnswers;
        const attemptId = await createQuizAttemptClient({
          quizType: "mixed",
          isPractice: true,
          practiceType: "daily_review",
          isTimed: false,
          timeTakenSeconds: null,
          score: result.correctAnswers,
          totalQuestions: result.totalQuestions,
          questionIds: questions.map((question) => question.id),
          answers: questions.map((question) => {
            const answer = answers[question.id];
            const selectedOption = answer?.selectedOption?.toUpperCase() ?? null;
            return {
              questionId: question.id,
              selectedOption,
              isCorrect: selectedOption === question.correct_option,
              questionType: question.question_type,
              timeSpentSeconds: answer?.timeSpentSeconds,
              snapshot: {
                question_text: question.question_text,
                option_a: question.option_a,
                option_b: question.option_b,
                option_c: question.option_c,
                option_d: question.option_d,
                correct_option: question.correct_option,
              },
            };
          }),
        });
        if (!cancelled) {
          setHasSavedAttempt(true);
          router.push(`/quiz/results/${attemptId}`);
        }
      } catch (error) {
        console.error("Failed to save daily review", error);
      }
    };
    void save();
    return () => {
      cancelled = true;
    };
  }, [hasSavedAttempt, isCompleted, questions, result, router, user]);

  if (initialQuestions.length === 0) {
    return (
      <QuizContainer
        title="Daily Spaced Review"
        subtitle="Your review schedule is clear"
      >
        <div className="mx-auto max-w-lg space-y-4 py-12 text-center">
          <h2 className="text-2xl font-semibold">You&apos;re all caught up</h2>
          <p className="text-muted-foreground">
            Nothing is due right now. Correct answers will return after longer
            intervals, while missed questions come back sooner.
          </p>
          <Button asChild>
            <Link href="/dashboard">Return to dashboard</Link>
          </Button>
        </div>
      </QuizContainer>
    );
  }

  if (isCompleted) {
    return (
      <QuizContainer title="Daily Spaced Review">
        <div className="py-12 text-center">Saving your daily review…</div>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer
      title="Daily Spaced Review"
      subtitle={`${initialQuestions.length} question${initialQuestions.length === 1 ? "" : "s"} selected from items due today, flags, and new material`}
    >
      {totalQuestions > 0 ? (
        <QuizWorkspace onSubmit={submitQuiz} />
      ) : (
        <LoadingStates variant="initial" />
      )}
    </QuizContainer>
  );
}
