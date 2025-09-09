// Signs Practice Quiz Component
// Complete signs practice interface using useSignsPractice hook

import React, { useEffect, useState } from "react";
import { QuestionLimit } from "@/types/quiz";
import { useSignsPractice } from "@/hooks/quiz";

// Core components
import QuizContainer from "../core/QuizContainer";
import QuestionDisplay from "../core/QuestionDisplay";
import AnswerOptions from "../core/AnswerOptions";
import ProgressIndicator from "../core/ProgressIndicator";
import NavigationControls from "../core/NavigationControls";

// State components
import LoadingStates, { QuizLoadingScreen } from "../state/LoadingStates";
import QuizErrorBoundary from "../state/ErrorBoundary";
import ResultsDisplay from "../state/ResultsDisplay";

// Setup components
import QuestionLimitSelector from "../setup/QuestionLimitSelector";

export interface SignsPracticeQuizProps {
  questionLimit?: QuestionLimit;
  autoStart?: boolean;
  showLimitSelector?: boolean;
  onComplete?: (result: any) => void;
  className?: string;
}

const SignsPracticeQuiz: React.FC<SignsPracticeQuizProps> = ({
  questionLimit = 20,
  autoStart = false,
  showLimitSelector = true,
  onComplete,
  className = "",
}) => {
  const [selectedLimit, setSelectedLimit] =
    useState<QuestionLimit>(questionLimit);
  const [isStarted, setIsStarted] = useState(autoStart);

  // Signs practice hook
  const {
    // Data
    signsQuestions,
    quiz,

    // State
    state,

    // Actions
    storeActions,
    initializePractice,
    loadNewQuestions,
    restartPractice,
  } = useSignsPractice({
    questionLimit: selectedLimit,
    autoStart: false, // We control starting manually
  });

  // Initialize practice when limit changes or component starts
  useEffect(() => {
    if (isStarted) {
      initializePractice({ questionLimit: selectedLimit });
    }
  }, [isStarted, selectedLimit, initializePractice]);

  // Handle quiz completion
  useEffect(() => {
    if (quiz.status === "completed" && quiz.result && onComplete) {
      onComplete(quiz.result);
    }
  }, [quiz.status, quiz.result, onComplete]);

  // Handle starting the quiz
  const handleStart = async () => {
    setIsStarted(true);
    await initializePractice({ questionLimit: selectedLimit });
  };

  // Handle quiz restart
  const handleRestart = async () => {
    await restartPractice();
  };

  // Handle loading new questions with same settings
  const handleNewQuestions = async () => {
    await loadNewQuestions(selectedLimit);
  };

  // Handle answer selection
  const handleAnswerSelect = (questionId: number, answerKey: string) => {
    storeActions.selectAnswer(questionId, answerKey);
  };

  // Handle quiz submission
  const handleSubmit = async () => {
    await storeActions.submitQuiz();
  };

  // Error state
  if (state.error) {
    return (
      <QuizContainer className={className}>
        <QuizErrorBoundary
          error={state.error}
          onRetry={initializePractice}
          onGoHome={() => setIsStarted(false)}
          variant="detailed"
        />
      </QuizContainer>
    );
  }

  // Loading state
  if (state.isLoading) {
    return (
      <QuizContainer className={className}>
        <QuizLoadingScreen mode="practice" />
      </QuizContainer>
    );
  }

  // Setup state (question limit selection)
  if (!isStarted || (showLimitSelector && quiz.questions.length === 0)) {
    return (
      <QuizContainer className={className}>
        <div className="space-y-8">
          <div className="text-center space-y-3">
            <h1 className="text-3xl font-bold">Road Signs Practice</h1>
            <p className="text-lg text-muted-foreground">
              Master Ontario road sign recognition with targeted practice
            </p>
          </div>

          {showLimitSelector && (
            <QuestionLimitSelector
              selectedLimit={selectedLimit}
              onLimitSelect={setSelectedLimit}
              mode="selection"
              showDescriptions={true}
            />
          )}

          <div className="flex justify-center">
            <NavigationControls
              currentQuestion={0}
              totalQuestions={0}
              canGoBack={false}
              canGoForward={false}
              canSubmit={false}
              isQuizActive={false}
              onPrevious={() => {}}
              onNext={() => {}}
              onSubmit={() => {}}
              onStart={handleStart}
              showStartButton={true}
              isLoading={state.isLoading}
            />
          </div>
        </div>
      </QuizContainer>
    );
  }

  // Results state
  if (quiz.status === "completed" && quiz.result) {
    return (
      <QuizContainer className={className}>
        <ResultsDisplay
          result={quiz.result}
          mode="signs_practice"
          onRestart={handleRestart}
          onGoHome={() => setIsStarted(false)}
          showDetailedBreakdown={true}
        />
      </QuizContainer>
    );
  }

  // Active quiz state
  if (quiz.status === "active" && quiz.currentQuestion) {
    const currentQuestionIndex = quiz.currentQuestionIndex + 1; // 1-based for display
    const userAnswer = Object.values(quiz.answers).find(
      (a: any) => a.questionId === quiz.currentQuestion!.id
    ) as any;

    return (
      <QuizContainer className={className}>
        <div className="space-y-6">
          {/* Progress Indicator */}
          <ProgressIndicator
            currentQuestion={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            answeredQuestions={quiz.answers.length}
            mode="practice"
            quizStatus={quiz.status}
            showStats={true}
          />

          {/* Question Display */}
          <QuestionDisplay
            question={quiz.currentQuestion}
            questionNumber={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            showQuestionType={true}
          />

          {/* Answer Options */}
          <AnswerOptions
            question={quiz.currentQuestion}
            selectedAnswer={userAnswer}
            onAnswerSelect={handleAnswerSelect}
            disabled={(quiz.status as string) === "submitting"}
            showCorrectAnswer={false}
          />

          {/* Navigation Controls */}
          <NavigationControls
            currentQuestion={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            canGoBack={quiz.currentQuestionIndex > 0}
            canGoForward={quiz.currentQuestionIndex < quiz.questions.length - 1}
            canSubmit={quiz.answers.length > 0} // Allow submit with any answers for practice
            isQuizActive={quiz.status === "active"}
            onPrevious={storeActions.previousQuestion}
            onNext={storeActions.nextQuestion}
            onSubmit={handleSubmit}
            isLoading={(quiz.status as string) === "submitting"}
            currentQuestionAnswered={!!userAnswer}
            totalAnswered={Object.keys(quiz.answers).length}
            requireAnswerToAdvance={false} // Practice mode allows skipping
          />

          {/* Practice Mode Actions */}
          <div className="flex justify-center gap-4 pt-4 border-t">
            <button
              onClick={handleNewQuestions}
              disabled={state.isLoading}
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Load New Questions
            </button>
            <span className="text-muted-foreground">•</span>
            <button
              onClick={() => setIsStarted(false)}
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Change Settings
            </button>
          </div>
        </div>
      </QuizContainer>
    );
  }

  // Default fallback (shouldn't normally reach here)
  return (
    <QuizContainer className={className}>
      <div className="text-center py-8">
        <p className="text-muted-foreground">Preparing signs practice...</p>
        <LoadingStates variant="minimal" />
      </div>
    </QuizContainer>
  );
};

export default SignsPracticeQuiz;
