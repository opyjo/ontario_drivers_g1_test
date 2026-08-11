"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useSimulation } from "@/hooks/quiz/useSimulation";

// ✅ Slice selectors
import {
  useIsLoading,
  useHasError,
  useIsCompleted,
  useQuizResult,
  useQuizQuestions,
} from "@/stores/quiz/selectors";

// ✅ Slice actions
import { useSubmitQuiz } from "@/stores/quiz/actions";

// ✅ UI Components
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuizWorkspace } from "@/components/quiz/core/QuizWorkspace";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { ErrorBoundary } from "@/components/quiz/state/ErrorBoundary";
import UnauthenticatedResultsView from "@/components/quiz/UnauthenticatedResultsView";
import { createQuizAttemptClient } from "@/lib/quiz/saveAttemptClient";
import { useAuthStore } from "@/stores";
import { useQuizStore } from "@/stores/quiz/quizStore";

export default function G1SimulationQuiz() {
  const router = useRouter();
  // 1️⃣ Domain initialization from simulation hook
  const {
    state,
    initializeSimulation,
    restartSimulation,
    isValidG1Format,
    testConfig,
  } = useSimulation({});

  // 2️⃣ Core store selectors (stable slices only)
  const isLoading = useIsLoading();
  const hasError = useHasError();
  const isCompleted = useIsCompleted();
  const result = useQuizResult();
  const questions = useQuizQuestions();

  // 3️⃣ Store actions
  const submitQuiz = useSubmitQuiz();

  // 4️⃣ Initialize on mount exactly once to avoid loops
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    void initializeSimulation();
  }, [initializeSimulation]);

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
          quizType: "simulation",
          isPractice: false,
          practiceType: null,
          isTimed: false,
          timeTakenSeconds: null,
          score: result.correctAnswers,
          totalQuestions: result.totalQuestions,
          questionIds: questions.map((q) => q.id),
          answers: questions.map((q) => {
            const selectedOpt =
              useQuizStore.getState().userAnswers[q.id]?.selectedOption ?? null;
            const upper = selectedOpt
              ? selectedOpt.toString().toUpperCase()
              : null;
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

  // ----------------------------
  // Conditional rendering
  // ----------------------------

  // LOADING
  if (isLoading) {
    return (
      <QuizContainer
        title="G1 Knowledge Test Simulation"
        subtitle="20 signs + 20 rules (80% to pass)"
      >
        <LoadingStates variant="initial" />
      </QuizContainer>
    );
  }

  // ERROR
  if (hasError || state.error) {
    return (
      <QuizContainer title="G1 Knowledge Test Simulation">
        <ErrorBoundary
          message={state.error || "Something went wrong loading the simulation"}
          onRetry={() => initializeSimulation()}
        />
      </QuizContainer>
    );
  }

  // COMPLETED
  if (isCompleted && result) {
    if (!user) {
      return (
        <QuizContainer title="Results - G1 Simulation">
          <UnauthenticatedResultsView
            score={result.correctAnswers}
            totalQuestions={result.totalQuestions}
            quizType="standard"
            onClose={restartSimulation}
          />
        </QuizContainer>
      );
    }
    return (
      <QuizContainer title="Results - G1 Simulation">
        <div className="py-12 text-center">Saving your attempt…</div>
      </QuizContainer>
    );
  }

  // ACTIVE SIMULATION
  return (
    <QuizContainer
      title="G1 Knowledge Test Simulation"
      subtitle={`Format: ${testConfig.signsRequired} signs + ${testConfig.rulesRequired} rules`}
    >
      {!isValidG1Format && (
        <ErrorBoundary
          message="Invalid G1 test format. Please try again."
          onRetry={() => initializeSimulation()}
        />
      )}

      {questions.length > 0 ? (
        <QuizWorkspace onSubmit={submitQuiz} />
      ) : (
        <LoadingStates variant="initial" />
      )}
    </QuizContainer>
  );
}
