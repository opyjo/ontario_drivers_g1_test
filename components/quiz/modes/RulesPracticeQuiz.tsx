"use client";

import { useEffect } from "react";
import type { QuestionLimit } from "@/types/quiz";

// ✅ Our domain-specific hook
import useRulesPractice from "@/hooks/quiz/useRulesPractice";

// ✅ Store slice selectors
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

// ✅ Store slice actions
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

interface RulesPracticeQuizProps {
  questionLimit: QuestionLimit;
}

export default function RulesPracticeQuiz({
  questionLimit,
}: RulesPracticeQuizProps) {
  // 1️⃣ Domain logic: session init + restart
  const { initializePractice, restartPractice } = useRulesPractice({
    questionLimit,
    autoStart: true,
  });

  // 2️⃣ Quiz state from stable slice selectors
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

  // 3️⃣ Quiz actions from store
  const selectAnswer = useSelectAnswer();
  const nextQuestion = useNextQuestion();
  const previousQuestion = usePreviousQuestion();
  const submitQuiz = useSubmitQuiz();
  const getAnswerForQuestion = useGetAnswerForQuestion();

  // 4️⃣ Fallback init if autoStart fails
  useEffect(() => {
    if (questions.length === 0 && !isLoading) {
      void initializePractice({ questionLimit });
    }
  }, [initializePractice, questionLimit, questions.length, isLoading]);

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
    return (
      <QuizContainer title="Results - Rules Practice">
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

  // 🔹 Active quiz
  const selectedAnswer = currentQuestion
    ? getAnswerForQuestion(currentQuestion.id)
    : null;

  return (
    <QuizContainer
      title="Rules of the Road Practice"
      subtitle={`Questions: ${totalQuestions}`}
    >
      {currentQuestion ? (
        <div className="space-y-6">
          {/* Question display */}
          <QuestionDisplay question={currentQuestion} />

          {/* Answer options */}
          <AnswerOptions
            question={currentQuestion}
            selectedOptionId={selectedAnswer?.selectedOption.toUpperCase()}
            onSelect={(opt) => selectAnswer(currentQuestion.id, String(opt))}
            disabled={!currentQuestion}
          />

          {/* Progress */}
          <ProgressIndicator
            currentIndex={currentQuestionNumber - 1}
            total={totalQuestions}
            percentage={progressPercentage}
          />

          {/* Navigation */}
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
