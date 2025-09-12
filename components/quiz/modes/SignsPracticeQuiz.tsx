"use client";

import { useEffect } from "react";
import type { QuestionLimit } from "@/types/quiz";
import { useSignsPractice } from "@/hooks/quiz"; // <-- Our specialized signs hook
import { useQuizActions } from "@/stores/quiz"; // <-- Store-wide actions (answer tracking, etc.)

// UI wrapper and core quiz building blocks
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuestionDisplay } from "@/components/quiz/core/QuestionDisplay";
import { AnswerOptions } from "@/components/quiz/core/AnswerOptions";
import { ProgressIndicator } from "@/components/quiz/core/ProgressIndicator";
import { NavigationControls } from "@/components/quiz/core/NavigationControls";

// Components for different quiz states (loading, error, completed)
import { LoadingStates } from "@/components/quiz/state/LoadingStates";
import { ErrorBoundary } from "@/components/quiz/state/ErrorBoundary";
import { ResultsDisplay } from "@/components/quiz/state/ResultsDisplay";

// ------------------------------------------
// PROPS: questionLimit decides # of questions
// ------------------------------------------
interface SignsPracticeQuizProps {
  questionLimit: QuestionLimit;
}

export default function SignsPracticeQuiz({
  questionLimit,
}: SignsPracticeQuizProps) {
  // 1. Hook in sign-specific logic
  // autoStart = true ensures the quiz will begin immediately once initialized
  const { state, quiz, storeActions, initializePractice } = useSignsPractice({
    questionLimit,
    autoStart: true,
  });

  // 2. Optional store action helper to look up chosen answers
  const { getAnswerForQuestion } = useQuizActions();

  // 3. Edge-case handler for initialization
  // Sometimes autoStart might fail (race conditions, hydration, etc.)
  // This ensures quiz gets initialized regardless
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

  // ---------------------------
  // 4. RENDER: LOADING STATE
  // ---------------------------
  if (state.isLoading) {
    return (
      <QuizContainer
        title="Traffic Signs Practice"
        subtitle="Sharpen your knowledge of traffic signs"
      >
        <LoadingStates variant="initial" />
      </QuizContainer>
    );
  }

  // ---------------------------
  // 5. RENDER: ERROR STATE
  // ---------------------------
  if (state.error) {
    return (
      <QuizContainer title="Traffic Signs Practice">
        <ErrorBoundary
          message={state.error}
          onRetry={() => initializePractice({ questionLimit })} // retry logic
        />
      </QuizContainer>
    );
  }

  // ---------------------------
  // 6. RENDER: COMPLETED STATE
  // ---------------------------
  if (quiz.isCompleted && quiz.result) {
    return (
      <QuizContainer title="Results - Traffic Signs Practice">
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

  // ---------------------------
  // 7. ACTIVE QUIZ: set up current Q + selected answer
  // ---------------------------
  const current = quiz.currentQuestion;
  const selected = current ? getAnswerForQuestion(current.id) : null;
  const selectedOptionId = selected
    ? selected.selectedOption.toUpperCase()
    : undefined;

  // ---------------------------
  // 8. MAIN QUIZ RENDER (Active)
  // ---------------------------
  return (
    <QuizContainer
      title="Traffic Signs Practice"
      subtitle={`Questions: ${quiz.totalQuestions}`}
    >
      {current ? (
        <div className="space-y-6">
          {/* Question prompt (probably an image + text) */}
          <QuestionDisplay question={current} />

          {/* Multiple choice answers */}
          <AnswerOptions
            question={current}
            selectedOptionId={selectedOptionId}
            onSelect={(opt) =>
              storeActions.selectAnswer(current.id, String(opt))
            }
            disabled={!quiz.isActive} // Disable if quiz not active
          />

          {/* Show progress as a bar or counter */}
          <ProgressIndicator
            currentIndex={quiz.currentQuestionNumber - 1} // zero-based
            total={quiz.totalQuestions}
            percentage={quiz.progressPercentage}
          />

          {/* Navigation buttons for Prev/Next/Submit */}
          <NavigationControls
            onPrev={storeActions.previousQuestion}
            onNext={storeActions.nextQuestion}
            onSubmit={() => void storeActions.submitQuiz()} // fire submit
            canGoPrev={quiz.canGoPrevious}
            canGoNext={quiz.canGoNext}
            canSubmit={quiz.canSubmit}
          />
        </div>
      ) : (
        // Fallback safeguard: if current question not found, show loader
        <LoadingStates variant="initial" />
      )}
    </QuizContainer>
  );
}
