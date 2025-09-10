"use client";

import { useEffect } from "react";
import { useSimulation } from "@/hooks/quiz";
import { useQuizActions } from "@/stores/quiz";
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuestionDisplay } from "@/components/quiz/core/QuestionDisplay";
import { AnswerOptions } from "@/components/quiz/core/AnswerOptions";
import { ProgressIndicator } from "@/components/quiz/core/ProgressIndicator";
import { NavigationControls } from "@/components/quiz/core/NavigationControls";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { ErrorBoundary } from "@/components/quiz/state/ErrorBoundary";
import { ResultsDisplay } from "@/components/quiz/state/ResultsDisplay";

export default function G1SimulationQuiz() {
  const {
    state,
    quiz,
    storeActions,
    initializeSimulation,
    canStartSimulation,
    isValidG1Format,
    testConfig,
  } = useSimulation({ autoStart: false });

  const { getAnswerForQuestion } = useQuizActions();

  useEffect(() => {
    if (!quiz.questions.length && !state.isLoading) {
      void initializeSimulation();
    }
  }, [initializeSimulation, quiz.questions.length, state.isLoading]);

  if (state.isLoading) {
    return (
      <QuizContainer
        title="G1 Knowledge Test Simulation"
        subtitle="20 signs + 20 rules (80% to pass)"
      >
        <LoadingStates variant="initial" />
      </QuizContainer>
    );
  }

  if (state.error) {
    return (
      <QuizContainer title="G1 Knowledge Test Simulation">
        <ErrorBoundary
          message={state.error}
          onRetry={() => initializeSimulation()}
        />
      </QuizContainer>
    );
  }

  if (quiz.isCompleted && quiz.result) {
    return (
      <QuizContainer title="Results - G1 Simulation">
        <ResultsDisplay
          total={quiz.result.totalQuestions}
          correct={quiz.result.correctAnswers}
          signsCorrect={quiz.result.signsScore}
          rulesCorrect={quiz.result.rulesScore}
          signsTotal={testConfig.signsRequired}
          rulesTotal={testConfig.rulesRequired}
          passingScore={testConfig.passingScore}
          onRetry={() => initializeSimulation()}
        />
      </QuizContainer>
    );
  }

  const current = quiz.currentQuestion;
  const selected = current ? getAnswerForQuestion(current.id) : null;
  const selectedOptionId = selected
    ? selected.selectedOption.toUpperCase()
    : undefined;

  return (
    <QuizContainer
      title="G1 Knowledge Test Simulation"
      subtitle={`Format: ${testConfig.signsRequired} signs + ${testConfig.rulesRequired} rules`}
    >
      {!isValidG1Format && (
        <ErrorBoundary
          message="Invalid test format. Please try again."
          onRetry={() => initializeSimulation()}
        />
      )}

      {current ? (
        <div className="space-y-6">
          <QuestionDisplay question={current} />

          <AnswerOptions
            question={current}
            selectedOptionId={selectedOptionId}
            onSelect={(opt) =>
              storeActions.selectAnswer(current.id, String(opt))
            }
            disabled={!quiz.isActive}
          />

          <ProgressIndicator
            currentIndex={quiz.currentQuestionNumber - 1}
            total={quiz.totalQuestions}
            percentage={quiz.progressPercentage}
          />

          <NavigationControls
            onPrev={storeActions.previousQuestion}
            onNext={storeActions.nextQuestion}
            onSubmit={() => void storeActions.submitQuiz()}
            canGoPrev={quiz.canGoPrevious}
            canGoNext={quiz.canGoNext}
            canSubmit={quiz.canSubmit}
          />
        </div>
      ) : (
        <LoadingStates variant="initial" />
      )}
    </QuizContainer>
  );
}
