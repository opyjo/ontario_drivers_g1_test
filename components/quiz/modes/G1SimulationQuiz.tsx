"use client";

import { useEffect } from "react";
import { useSimulation } from "@/hooks/quiz/useSimulation";

// ✅ Slice selectors
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

// ✅ Slice actions
import {
  useSelectAnswer,
  useNextQuestion,
  usePreviousQuestion,
  useSubmitQuiz,
  useGetAnswerForQuestion,
} from "@/stores/quiz/actions";

// ✅ UI Components
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuestionDisplay } from "@/components/quiz/core/QuestionDisplay";
import { AnswerOptions } from "@/components/quiz/core/AnswerOptions";
import { ProgressIndicator } from "@/components/quiz/core/ProgressIndicator";
import { NavigationControls } from "@/components/quiz/core/NavigationControls";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { ErrorBoundary } from "@/components/quiz/state/ErrorBoundary";
import { ResultsDisplay } from "@/components/quiz/state/ResultsDisplay";

export default function G1SimulationQuiz() {
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
  const currentQuestion = useCurrentQuestion();
  const totalQuestions = useTotalQuestions();
  const currentQuestionNumber = useCurrentQuestionNumber();
  const progressPercentage = useProgressPercentage();
  const canGoNext = useCanGoNext();
  const canGoPrevious = useCanGoPrevious();
  const canSubmit = useCanSubmit();
  const questions = useQuizQuestions();

  // 3️⃣ Store actions
  const selectAnswer = useSelectAnswer();
  const nextQuestion = useNextQuestion();
  const previousQuestion = usePreviousQuestion();
  const submitQuiz = useSubmitQuiz();
  const getAnswerForQuestion = useGetAnswerForQuestion();

  // 4️⃣ Ensure initial questions are loaded
  useEffect(() => {
    if (questions.length === 0 && !isLoading) {
      void initializeSimulation();
    }
  }, [initializeSimulation, questions.length, isLoading]);

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
    return (
      <QuizContainer title="Results - G1 Simulation">
        <ResultsDisplay
          total={result.totalQuestions}
          correct={result.correctAnswers}
          signsCorrect={result.signsScore}
          rulesCorrect={result.rulesScore}
          signsTotal={testConfig.signsRequired}
          rulesTotal={testConfig.rulesRequired}
          passingScore={testConfig.passingScore}
          onRetry={restartSimulation}
        />
      </QuizContainer>
    );
  }

  // ACTIVE SIMULATION
  const selected = currentQuestion
    ? getAnswerForQuestion(currentQuestion.id)
    : null;

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

      {currentQuestion ? (
        <div className="space-y-6">
          {/* Question */}
          <QuestionDisplay question={currentQuestion} />

          {/* Answers */}
          <AnswerOptions
            question={currentQuestion}
            selectedOptionId={selected?.selectedOption.toUpperCase()}
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
