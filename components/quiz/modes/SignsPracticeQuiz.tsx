"use client";

import { useEffect } from "react";
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
  useQuizQuestions,
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
import { ResultsDisplay } from "@/components/quiz/state/ResultsDisplay";

interface SignsPracticeQuizProps {
  questionLimit: QuestionLimit;
}

export default function SignsPracticeQuiz({
  questionLimit,
}: SignsPracticeQuizProps) {
  // 1️⃣ Domain-specific hook (fetch/init logic)
  const { initializePractice, restartPractice } = useSignsPractice({
    questionLimit,
    autoStart: true,
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
  const questions = useQuizQuestions();

  // 3️⃣ Core quiz actions (via slice actions)
  const selectAnswer = useSelectAnswer();
  const nextQuestion = useNextQuestion();
  const previousQuestion = usePreviousQuestion();
  const submitQuiz = useSubmitQuiz();
  const getAnswerForQuestion = useGetAnswerForQuestion();

  // 4️⃣ Safety: fallback init if autoStart fails
  useEffect(() => {
    if (questions.length === 0 && !isLoading) {
      void initializePractice({ questionLimit });
    }
  }, [initializePractice, questionLimit, questions.length, isLoading]);

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
    return (
      <QuizContainer title="Results - Traffic Signs Practice">
        <ResultsDisplay
          total={result.totalQuestions}
          correct={result.correctAnswers}
          passingScore={
            result.passed ? result.correctAnswers : result.totalQuestions
          }
          onRetry={restartPractice}
        />
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
        <div className="space-y-6">
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
        </div>
      ) : (
        <LoadingStates variant="initial" />
      )}
    </QuizContainer>
  );
}
