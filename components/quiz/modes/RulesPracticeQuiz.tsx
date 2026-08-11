"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { QuestionLimit } from "@/types/quiz";

// ✅ Our domain-specific hook
import useRulesPractice from "@/hooks/quiz/useRulesPractice";

// ✅ Store slice selectors
import {
  useIsLoading,
  useHasError,
  useIsCompleted,
  useQuizResult,
  useTotalQuestions,
  useQuizQuestions,
} from "@/stores/quiz/selectors";

// ✅ Store slice actions
import { useSubmitQuiz } from "@/stores/quiz/actions";

// ✅ UI components
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuizWorkspace } from "@/components/quiz/core/QuizWorkspace";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { ErrorBoundary } from "@/components/quiz/state/ErrorBoundary";
import UnauthenticatedResultsView from "@/components/quiz/UnauthenticatedResultsView";
import { createQuizAttemptClient } from "@/lib/quiz/saveAttemptClient";
import { useAuthStore } from "@/stores";
import { useQuizStore } from "@/stores/quiz/quizStore";

interface RulesPracticeQuizProps {
  readonly questionLimit: QuestionLimit;
}

export default function RulesPracticeQuiz({
  questionLimit,
}: RulesPracticeQuizProps) {
  const router = useRouter();
  // 1️⃣ Domain logic: session init + restart
  const { initializePractice, restartPractice } = useRulesPractice({
    questionLimit,
  });

  // 2️⃣ Quiz state from stable slice selectors
  const isLoading = useIsLoading();
  const hasError = useHasError();
  const isCompleted = useIsCompleted();
  const result = useQuizResult();
  const totalQuestions = useTotalQuestions();
  const questions = useQuizQuestions();

  // 3️⃣ Quiz actions from store
  const submitQuiz = useSubmitQuiz();

  // 4️⃣ Initialize on mount exactly once to avoid loops
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    void initializePractice({ questionLimit });
  }, [initializePractice, questionLimit]);

  // Auth and data for saving attempts
  const user = useAuthStore((s) => s.user);
  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);

  // Save attempt after completion
  useEffect(() => {
    if (!isCompleted || !result) return;
    if (!user || hasSavedAttempt) return;

    let cancelled = false;
    const save = async () => {
      try {
        const attemptId = await createQuizAttemptClient({
          quizType: "rules",
          isPractice: true,
          practiceType: "practice",
          isTimed: false,
          timeTakenSeconds: null,
          score: result.correctAnswers,
          totalQuestions: result.totalQuestions,
          questionIds: questions.map((q) => q.id),
          answers: questions.map((q) => {
            const ans =
              useQuizStore.getState().userAnswers[q.id]?.selectedOption ?? null;
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
        console.error("Failed to save attempt:", e);
      }
    };
    void save();
    return () => {
      cancelled = true;
    };
  }, [isCompleted, result, user, hasSavedAttempt, questions, router]);

  // 5️⃣ State-based rendering
  // 🔹 Loading
  if (isLoading) {
    return (
      <QuizContainer
        title="Rules of the Road Practice"
        subtitle="Sharpen your knowledge of road rules"
      >
        <LoadingStates variant="initial" />
      </QuizContainer>
    );
  }

  // 🔹 Error
  if (hasError) {
    return (
      <QuizContainer title="Rules of the Road Practice">
        <ErrorBoundary
          message="Something went wrong loading the quiz."
          onRetry={() => initializePractice({ questionLimit })}
        />
      </QuizContainer>
    );
  }

  // 🔹 Completed
  if (isCompleted && result) {
    if (!user) {
      return (
        <QuizContainer title="Results - Rules Practice">
          <UnauthenticatedResultsView
            score={result.correctAnswers}
            totalQuestions={result.totalQuestions}
            quizType="practice"
            onTryAgain={restartPractice}
          />
        </QuizContainer>
      );
    }
    return (
      <QuizContainer title="Results - Rules Practice">
        <div className="py-12 text-center">Saving your attempt…</div>
      </QuizContainer>
    );
  }

  // 🔹 Active quiz
  return (
    <QuizContainer
      title="Rules of the Road Practice"
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
