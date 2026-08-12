"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { QuestionLimit } from "@/types/quiz";

// ✅ Our new modular hook
import useSignsPractice from "@/hooks/quiz/useSignsPractice";

// ✅ Slice selectors (stable, no snapshot loops)
import {
  useIsLoading,
  useHasError,
  useIsCompleted,
  useQuizResult,
  useTotalQuestions,
} from "@/stores/quiz/selectors";

// ✅ Slice actions (stable)
import { useSubmitQuiz } from "@/stores/quiz/actions";

// ✅ UI components
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuizWorkspace } from "@/components/quiz/core/QuizWorkspace";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { ErrorBoundary } from "@/components/quiz/state/ErrorBoundary";
import { QuizAccessGate } from "@/components/quiz/QuizAccessGate";
import { QuizResultsUpsell } from "@/components/quiz/QuizResultsUpsell";
import { createQuizAttemptClient } from "@/lib/quiz/saveAttemptClient";
import { useAuthStore } from "@/stores";
import {
  useQuizQuestions,
  useUserAnswers,
} from "@/stores/quiz/selectors/answers";

interface SignsPracticeQuizProps {
  readonly questionLimit: QuestionLimit;
}

export default function SignsPracticeQuiz({
  questionLimit,
}: SignsPracticeQuizProps) {
  const router = useRouter();
  // 1️⃣ Domain-specific hook (fetch/init logic)
  const { access, initializePractice } = useSignsPractice({
    questionLimit,
  });

  // 2️⃣ Core quiz state (via slice selectors)
  const isLoading = useIsLoading();
  const hasError = useHasError();
  const isCompleted = useIsCompleted();
  const result = useQuizResult();
  const totalQuestions = useTotalQuestions();
  // Initialize on mount exactly once to avoid loops from changing deps
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    void initializePractice({ questionLimit });
  }, [initializePractice, questionLimit]);

  // 3️⃣ Core quiz actions (via slice actions)
  const submitQuiz = useSubmitQuiz();

  // Auth and data for saving attempts
  const user = useAuthStore((s) => s.user);
  const questions = useQuizQuestions();
  const userAnswers = useUserAnswers();
  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);

  // Save attempt after completion (effect is safe and unconditional)
  useEffect(() => {
    if (!isCompleted || !result) return;
    if (!user || !access?.isPaid || hasSavedAttempt) return;

    let cancelled = false;
    const save = async () => {
      try {
        const attemptId = await createQuizAttemptClient({
          quizType: "signs",
          isPractice: true,
          practiceType: "practice",
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
              timeSpentSeconds: userAnswers[q.id]?.timeSpentSeconds,
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
        console.error("Failed to save attempt:", e);
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
    access?.isPaid,
    hasSavedAttempt,
    questions,
    userAnswers,
    router,
  ]);

  // 5️⃣ State-based rendering
  // ---------------------------

  // LOADING
  if (isLoading) {
    return (
      <QuizContainer
        title="Traffic Signs Practice"
        subtitle="Sharpen your knowledge of traffic signs"
      >
        <LoadingStates variant="initial" />
      </QuizContainer>
    );
  }

  if (access && !access.allowed) {
    return (
      <QuizContainer title="Traffic Signs Practice">
        <QuizAccessGate
          access={access}
          returnPath={`/quiz/signs?limit=${questionLimit}`}
        />
      </QuizContainer>
    );
  }

  // ERROR
  if (hasError) {
    return (
      <QuizContainer title="Traffic Signs Practice">
        <ErrorBoundary
          message="Something went wrong loading the quiz."
          onRetry={() => initializePractice({ questionLimit })}
        />
      </QuizContainer>
    );
  }

  // COMPLETED
  if (isCompleted && result) {
    if (!access?.isPaid) {
      return (
        <QuizContainer title="Results - Traffic Signs Practice">
          <QuizResultsUpsell
            score={result.correctAnswers}
            totalQuestions={result.totalQuestions}
            isAuthenticated={Boolean(user)}
            returnPath="/quiz/signs/setup"
          />
        </QuizContainer>
      );
    }

    // Authenticated: while saving/redirecting, show minimal placeholder
    return (
      <QuizContainer title="Results - Traffic Signs Practice">
        <div className="py-12 text-center">Saving your attempt…</div>
      </QuizContainer>
    );
  }

  // ACTIVE QUIZ
  return (
    <QuizContainer
      title="Traffic Signs Practice"
      subtitle={`Questions: ${totalQuestions}`}
    >
      {totalQuestions > 0 ? (
        <QuizWorkspace onSubmit={submitQuiz} />
      ) : (
        <LoadingStates variant="initial" />
      )}
    </QuizContainer>
  );
}
