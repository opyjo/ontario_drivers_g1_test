"use client";

import { Suspense, useMemo, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";
import useIncorrectQuestions from "@/hooks/quiz/useIncorrectQuestions";
import { useQuizStore } from "@/stores/quiz/quizStore";
import { useTotalQuestions } from "@/stores/quiz/selectors/answers";
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuizWorkspace } from "@/components/quiz/core/QuizWorkspace";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { QuizPageSkeleton } from "@/components/loading/PageSkeletons";
import { createQuizAttemptClient } from "@/lib/quiz/saveAttemptClient";

type QuestionType = "signs" | "rules" | "all";

// Inner component that actually calls useSearchParams
function ReviewIncorrectPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const questionType = useMemo<QuestionType>(() => {
    const raw = (searchParams.get("questionType") || "all").toLowerCase();
    return ["signs", "rules", "all"].includes(raw)
      ? (raw as QuestionType)
      : "all";
  }, [searchParams]);

  const userId = user?.id || "";

  // Initialize review flow using the dedicated hook (always call hooks)
  const {
    state,
    storeActions,
    initializeReview,
    hasIncorrectQuestions,
  } = useIncorrectQuestions({ userId, questionType });

  const initializedRef = useRef(false);

  // Get quiz state from store for completion handling
  const isCompleted = useQuizStore((s) => s.status === "completed");
  const result = useQuizStore((s) => s.result);
  const questions = useQuizStore((s) => s.questions);
  const userAnswers = useQuizStore((s) => s.userAnswers);

  const totalQuestions = useTotalQuestions();

  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);

  useEffect(() => {
    if (userId && !initializedRef.current) {
      initializedRef.current = true;
      void initializeReview({ userId, questionType });
    }
  }, [userId, questionType, initializeReview]);

  // Save attempt and update incorrect questions after completion
  useEffect(() => {
    if (!isCompleted || !result) return;
    if (!user || hasSavedAttempt) return;

    let cancelled = false;
    const save = async () => {
      try {
        // Create attempt record for the review quiz
        const attemptId = await createQuizAttemptClient({
          quizType: questionType === "all" ? "mixed" : questionType,
          isPractice: true,
          practiceType: "incorrect_review",
          isTimed: false,
          timeTakenSeconds: null,
          score: result.correctAnswers,
          totalQuestions: result.totalQuestions,
          questionIds: questions.map((q) => q.id),
          answers: questions.map((q) => {
            const ans = userAnswers[q.id]?.selectedOption ?? null;
            const upper = ans ? ans.toString().toUpperCase() : null;
            const isCorrect = upper === q.correct_option;
            return {
              questionId: q.id,
              selectedOption: upper,
              isCorrect,
              questionType: q.question_type,
              snapshot: {
                question_text: q.question_text,
                option_a: q.option_a,
                option_b: q.option_b,
                option_c: q.option_c,
                option_d: q.option_d,
                correct_option: q.correct_option,
              },
            };
          }),
          breakdown: undefined,
        });

        if (!cancelled) {
          setHasSavedAttempt(true);
          router.push(`/quiz/results/${attemptId}`);
        }
      } catch (e) {
        console.error("Failed to save review attempt:", e);
      }
    };
    void save();
    return () => {
      cancelled = true;
    };
  }, [
    isCompleted,
    result,
    user,
    hasSavedAttempt,
    questions,
    userAnswers,
    router,
    questionType,
  ]);

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

  // Loading/Error states
  if (state.isLoading) {
    return (
      <QuizContainer title="Review Incorrect Questions">
        <LoadingStates variant="initial" />
      </QuizContainer>
    );
  }

  if (state.error) {
    return (
      <QuizContainer title="Review Incorrect Questions">
        <div className="py-12 text-center text-destructive">
          {state.error || "Failed to load incorrect questions."}
        </div>
      </QuizContainer>
    );
  }

  if (!hasIncorrectQuestions) {
    return (
      <QuizContainer title="Review Incorrect Questions">
        <div className="py-12 text-center text-muted-foreground">
          No incorrect questions found. Great job!
        </div>
      </QuizContainer>
    );
  }

  return (
    <QuizContainer
      title="Review Incorrect Questions"
      subtitle={`Questions: ${totalQuestions}`}
    >
      {totalQuestions > 0 ? (
        <QuizWorkspace onSubmit={storeActions.submitQuiz} />
      ) : (
        <LoadingStates variant="initial" />
      )}
    </QuizContainer>
  );
}

// ✅ Default export wraps inner in Suspense
export default function ReviewIncorrectPage() {
  return (
    <Suspense fallback={<QuizPageSkeleton />}>
      <ReviewIncorrectPageInner />
    </Suspense>
  );
}
