"use client";

import { useEffect } from "react";
import type { QuestionLimit } from "@/types/quiz";
import { useRulesPractice } from "@/hooks/quiz";
import { useQuizActions } from "@/stores/quiz";
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
  const { state, quiz, storeActions, initializePractice } = useRulesPractice({
    questionLimit,
    autoStart: true,
  });

  const { getAnswerForQuestion } = useQuizActions();

  useEffect(() => {
    if (!quiz.questions.length && !state.isLoading) {
      void initializePractice({ questionLimit });
    }
  }, [
    initializePractice,
    questionLimit,
    quiz.questions.length,
    state.isLoading,
  ]);

  if (state.isLoading) {
    return (
      <QuizContainer
        title="Rules of the Road Practice"
        subtitle="Practice traffic laws and driving regulations"
      >
        <LoadingStates variant="initial" />
      </QuizContainer>
    );
  }

  if (state.error) {
    return (
      <QuizContainer title="Rules of the Road Practice">
        <ErrorBoundary
          message={state.error}
          onRetry={() => initializePractice({ questionLimit })}
        />
      </QuizContainer>
    );
  }

  if (quiz.isCompleted && quiz.result) {
    return (
      <QuizContainer title="Results - Rules of the Road Practice">
        <ResultsDisplay
          total={quiz.result.totalQuestions}
          correct={quiz.result.correctAnswers}
          passingScore={
            quiz.result.passed
              ? quiz.result.correctAnswers
              : quiz.result.totalQuestions
          }
          onRetry={() => initializePractice({ questionLimit })}
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
      title="Rules of the Road Practice"
      subtitle={`Questions: ${quiz.totalQuestions}`}
    >
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
