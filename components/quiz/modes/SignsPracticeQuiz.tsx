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
  useCurrentQuestion,
  useTotalQuestions,
  useCurrentQuestionNumber,
  useProgressPercentage,
  useCanGoNext,
  useCanGoPrevious,
  useCanSubmit,
} from "@/stores/quiz/selectors";

// ✅ Slice actions (stable)
import {
  useSelectAnswer,
  useNextQuestion,
  usePreviousQuestion,
  useSubmitQuiz,
  useGetAnswerForQuestion,
} from "@/stores/quiz/actions";

// ✅ UI components
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuestionDisplay } from "@/components/quiz/core/QuestionDisplay";
import { AnswerOptions } from "@/components/quiz/core/AnswerOptions";
import { ProgressIndicator } from "@/components/quiz/core/ProgressIndicator";
import { NavigationControls } from "@/components/quiz/core/NavigationControls";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { ErrorBoundary } from "@/components/quiz/state/ErrorBoundary";
import UnauthenticatedResultsView from "@/components/quiz/UnauthenticatedResultsView";
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
  const { initializePractice, restartPractice } = useSignsPractice({
    questionLimit,
  });

  // 2️⃣ Core quiz state (via slice selectors)
  const isLoading = useIsLoading();
  const hasError = useHasError();
  const isCompleted = useIsCompleted();
  const result = useQuizResult();
  const currentQuestion = useCurrentQuestion();
  const totalQuestions = useTotalQuestions();
  const currentQuestionNumber = useCurrentQuestionNumber();
  const progressPercentage = useProgressPercentage();
  const canGoNext = useCanGoNext();
  const canGoPrevious = useCanGoPrevious();
  const canSubmit = useCanSubmit();
  // Initialize on mount exactly once to avoid loops from changing deps
  const didInitRef = useRef(false);
  useEffect(() => {
    if (didInitRef.current) return;
    didInitRef.current = true;
    void initializePractice({ questionLimit });
  }, [initializePractice, questionLimit]);

  // 3️⃣ Core quiz actions (via slice actions)
  const selectAnswer = useSelectAnswer();
  const nextQuestion = useNextQuestion();
  const previousQuestion = usePreviousQuestion();
  const submitQuiz = useSubmitQuiz();
  const getAnswerForQuestion = useGetAnswerForQuestion();

  // Auth and data for saving attempts
  const user = useAuthStore((s) => s.user);
  const questions = useQuizQuestions();
  const userAnswers = useUserAnswers();
  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);

  // Save attempt after completion (effect is safe and unconditional)
  useEffect(() => {
    if (!isCompleted || !result) return;
    if (!user || hasSavedAttempt) return;

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
    // If not authenticated, show unauthenticated inline results
    if (!user) {
      return (
        <QuizContainer title="Results - Traffic Signs Practice">
          <UnauthenticatedResultsView
            score={result.correctAnswers}
            totalQuestions={result.totalQuestions}
            quizType="practice"
            onTryAgain={restartPractice}
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
  const selectedAnswer = currentQuestion
    ? getAnswerForQuestion(currentQuestion.id)
    : null;

  return (
    <QuizContainer
      title="Traffic Signs Practice"
      subtitle={`Questions: ${totalQuestions}`}
    >
      {currentQuestion ? (
        <>
          {/* Question */}
          <QuestionDisplay question={currentQuestion} />

          {/* Answer Options */}
          <AnswerOptions
            question={currentQuestion}
            selectedOptionId={selectedAnswer?.selectedOption.toUpperCase()}
            onSelect={(opt) => selectAnswer(currentQuestion.id, String(opt))}
            disabled={!currentQuestion}
          />

          {/* Progress Bar */}
          <ProgressIndicator
            currentIndex={currentQuestionNumber - 1}
            total={totalQuestions}
            percentage={progressPercentage}
          />

          {/* Navigation Controls */}
          <NavigationControls
            onPrev={previousQuestion}
            onNext={nextQuestion}
            onSubmit={() => void submitQuiz()}
            canGoPrev={canGoPrevious}
            canGoNext={canGoNext}
            canSubmit={canSubmit}
          />
        </>
      ) : (
        <LoadingStates variant="initial" />
      )}
    </QuizContainer>
  );
}
