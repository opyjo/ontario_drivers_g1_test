"use client";

import { useEffect } from "react";
import { useIncorrectQuestions } from "@/hooks/quiz";
import { useQuizActions } from "@/stores/quiz";
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuestionDisplay } from "@/components/quiz/core/QuestionDisplay";
import { AnswerOptions } from "@/components/quiz/core/AnswerOptions";
import { ProgressIndicator } from "@/components/quiz/core/ProgressIndicator";
import { NavigationControls } from "@/components/quiz/core/NavigationControls";
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { ErrorBoundary } from "@/components/quiz/state/ErrorBoundary";

interface IncorrectQuestionsReviewProps {
  userId: string;
  questionType?: "signs" | "rules" | "all";
}

export default function IncorrectQuestionsReview({
  userId,
  questionType = "all",
}: IncorrectQuestionsReviewProps) {
  const {
    state,
    quiz,
    storeActions,
    initializeReview,
    hasIncorrectQuestions,
    reviewStats,
  } = useIncorrectQuestions({ userId, questionType, autoStart: true });

  const { getAnswerForQuestion } = useQuizActions();

  useEffect(() => {
    if (!quiz.questions.length && !state.isLoading) {
      void initializeReview({ userId, questionType });
    }
  }, [
    initializeReview,
    userId,
    questionType,
    quiz.questions.length,
    state.isLoading,
  ]);

  if (state.isLoading) {
    return (
      <QuizContainer
        title="Review Incorrect Questions"
        subtitle="Focus on your missed questions to improve"
      >
        <LoadingStates variant="initial" />
      </QuizContainer>
    );
  }

  if (state.error) {
    return (
      <QuizContainer title="Review Incorrect Questions">
        <ErrorBoundary
          message={state.error}
          onRetry={() => initializeReview({ userId, questionType })}
        />
      </QuizContainer>
    );
  }

  if (!hasIncorrectQuestions) {
    return (
      <QuizContainer
        title="Review Incorrect Questions"
        subtitle="No incorrect questions found. Great job!"
      >
        <div className="sr-only">No incorrect questions</div>
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
      title="Review Incorrect Questions"
      subtitle={`Total: ${reviewStats.totalIncorrect} • Signs: ${reviewStats.signsIncorrect} • Rules: ${reviewStats.rulesIncorrect}`}
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
