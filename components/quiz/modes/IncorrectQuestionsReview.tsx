// Incorrect Questions Review Component
// Review interface for missed questions using useIncorrectQuestions hook

import React, { useEffect, useState } from "react";
import { useIncorrectQuestions } from "@/hooks/quiz";

// Core components
import QuizContainer from "../core/QuizContainer";
import QuestionDisplay from "../core/QuestionDisplay";
import AnswerOptions from "../core/AnswerOptions";
import ProgressIndicator from "../core/ProgressIndicator";
import NavigationControls from "../core/NavigationControls";

// State components
import LoadingStates, { QuizLoadingScreen } from "../state/LoadingStates";
import QuizErrorBoundary from "../state/ErrorBoundary";

// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  RotateCcw,
  Home,
  CheckCircle2,
  XCircle,
  BookOpen,
  SignpostBig,
  TrendingUp,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

export interface IncorrectQuestionsReviewProps {
  userId: string;
  questionType?: "signs" | "rules" | "all";
  autoStart?: boolean;
  onComplete?: () => void;
  onGoHome?: () => void;
  className?: string;
}

const IncorrectQuestionsReview: React.FC<IncorrectQuestionsReviewProps> = ({
  userId,
  questionType = "all",
  autoStart = false,
  onComplete,
  onGoHome,
  className = "",
}) => {
  const [selectedType, setSelectedType] = useState<"signs" | "rules" | "all">(
    questionType
  );
  const [isStarted, setIsStarted] = useState(autoStart);
  const [showExplanations, setShowExplanations] = useState(true);

  // Incorrect questions hook
  const {
    // Review data
    incorrectQuestions,
    signsIncorrect,
    rulesIncorrect,
    hasIncorrectQuestions,
    reviewStats,

    // Base data
    quiz,

    // State
    state,

    // Actions
    storeActions,
    initializeReview,
    loadIncorrectQuestions,
    restartReview,
  } = useIncorrectQuestions({
    userId,
    questionType: selectedType,
    autoStart: false,
  });

  // Initialize review when component starts
  useEffect(() => {
    if (isStarted) {
      initializeReview({ userId, questionType: selectedType });
    }
  }, [isStarted, selectedType, userId, initializeReview]);

  // Handle review completion
  useEffect(() => {
    if (quiz.status === "completed" && onComplete) {
      onComplete();
    }
  }, [quiz.status, onComplete]);

  // Handle starting the review
  const handleStart = async () => {
    setIsStarted(true);
    await initializeReview({ userId, questionType: selectedType });
  };

  // Handle review restart
  const handleRestart = async () => {
    await restartReview();
  };

  // Handle loading different question types
  const handleTypeChange = async (newType: "signs" | "rules" | "all") => {
    setSelectedType(newType);
    await loadIncorrectQuestions(userId, newType);
  };

  // Handle answer selection (for tracking progress)
  const handleAnswerSelect = (questionId: number, answerKey: string) => {
    storeActions.selectAnswer(questionId, answerKey);
  };

  // Handle review completion
  const handleFinishReview = () => {
    if (onComplete) {
      onComplete();
    } else if (onGoHome) {
      onGoHome();
    }
  };

  // Error state
  if (state.error) {
    return (
      <QuizContainer className={className}>
        <QuizErrorBoundary
          error={state.error}
          onRetry={() =>
            initializeReview({ userId, questionType: selectedType })
          }
          onGoHome={onGoHome}
          variant="detailed"
        />
      </QuizContainer>
    );
  }

  // Loading state
  if (state.isLoading) {
    return (
      <QuizContainer className={className}>
        <QuizLoadingScreen mode="review" />
      </QuizContainer>
    );
  }

  // Setup state (before starting review)
  if (!isStarted || (quiz.questions.length === 0 && hasIncorrectQuestions)) {
    return (
      <QuizContainer className={className}>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-purple-100 rounded-full">
                <Eye className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">Review Incorrect Questions</h1>
            <p className="text-lg text-muted-foreground">
              Learn from your mistakes and improve your understanding
            </p>
          </div>

          {/* Stats Overview */}
          {reviewStats.totalIncorrect > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Learning Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {reviewStats.totalIncorrect}
                    </div>
                    <div className="text-sm text-blue-600">Total Questions</div>
                  </div>

                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {reviewStats.signsIncorrect}
                    </div>
                    <div className="text-sm text-blue-600">Road Signs</div>
                  </div>

                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {reviewStats.rulesIncorrect}
                    </div>
                    <div className="text-sm text-green-600">Rules of Road</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Question Type Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Review Focus</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs
                value={selectedType}
                onValueChange={(value) => setSelectedType(value as any)}
              >
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all" className="flex items-center gap-2">
                    <HelpCircle className="h-4 w-4" />
                    All ({reviewStats.totalIncorrect})
                  </TabsTrigger>
                  <TabsTrigger
                    value="signs"
                    className="flex items-center gap-2"
                  >
                    <SignpostBig className="h-4 w-4" />
                    Signs ({reviewStats.signsIncorrect})
                  </TabsTrigger>
                  <TabsTrigger
                    value="rules"
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    Rules ({reviewStats.rulesIncorrect})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Review all questions you got wrong across both signs and
                    rules sections.
                  </p>
                </TabsContent>

                <TabsContent value="signs" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Focus on road sign recognition questions you missed.
                  </p>
                </TabsContent>

                <TabsContent value="rules" className="mt-4">
                  <p className="text-sm text-muted-foreground">
                    Review rules of the road and safety questions you got wrong.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Start Review Button */}
          {hasIncorrectQuestions ? (
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
          ) : (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  Great Work!
                </h3>
                <p className="text-green-700 mb-4">
                  You don't have any incorrect questions to review. Keep up the
                  excellent work!
                </p>
                {onGoHome && (
                  <Button onClick={onGoHome} variant="outline">
                    <Home className="h-4 w-4 mr-2" />
                    Return to Main Menu
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </QuizContainer>
    );
  }

  // Active review state
  if (quiz.status === "active" && quiz.currentQuestion) {
    const currentQuestionIndex = quiz.currentQuestionIndex + 1;
    const userAnswer = Object.values(quiz.answers).find(
      (a: any) => a.questionId === quiz.currentQuestion!.id
    ) as any;
    const isLastQuestion =
      quiz.currentQuestionIndex === quiz.questions.length - 1;

    return (
      <QuizContainer className={className}>
        <div className="space-y-6">
          {/* Review Progress Indicator */}
          <ProgressIndicator
            currentQuestion={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            answeredQuestions={Object.keys(quiz.answers).length}
            mode="review"
            quizStatus={quiz.status}
            showStats={true}
          />

          {/* Review Header */}
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-purple-600" />
                  <span className="font-medium text-purple-800">
                    Review Mode
                  </span>
                  <Badge
                    variant="outline"
                    className="text-purple-700 border-purple-300"
                  >
                    {selectedType === "all"
                      ? "All Questions"
                      : selectedType === "signs"
                      ? "Road Signs"
                      : "Rules"}
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowExplanations(!showExplanations)}
                  className="text-purple-600"
                >
                  {showExplanations ? "Hide" : "Show"} Explanations
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Question Display */}
          <QuestionDisplay
            question={quiz.currentQuestion}
            questionNumber={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            showQuestionType={true}
          />

          {/* Answer Options with Correct Answer Shown */}
          <AnswerOptions
            question={quiz.currentQuestion}
            selectedAnswer={userAnswer}
            onAnswerSelect={handleAnswerSelect}
            disabled={false}
            showCorrectAnswer={showExplanations}
          />

          {/* Navigation Controls */}
          <NavigationControls
            currentQuestion={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            canGoBack={quiz.currentQuestionIndex > 0}
            canGoForward={quiz.currentQuestionIndex < quiz.questions.length - 1}
            canSubmit={isLastQuestion}
            isQuizActive={quiz.status === "active"}
            onPrevious={storeActions.previousQuestion}
            onNext={storeActions.nextQuestion}
            onSubmit={handleFinishReview}
            isLoading={false}
            submitButtonText="Finish Review"
          />

          {/* Review Actions */}
          <div className="flex justify-center gap-4 pt-4 border-t">
            <button
              onClick={() => handleTypeChange(selectedType)}
              disabled={state.isLoading}
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Reload Questions
            </button>
            <span className="text-muted-foreground">•</span>
            <button
              onClick={() => setIsStarted(false)}
              className="text-sm text-muted-foreground hover:text-primary underline"
            >
              Change Focus
            </button>
          </div>
        </div>
      </QuizContainer>
    );
  }

  // No questions to review
  return (
    <QuizContainer className={className}>
      <div className="text-center py-8 space-y-4">
        <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
        <h2 className="text-2xl font-bold">No Questions to Review</h2>
        <p className="text-muted-foreground">
          You don't have any incorrect{" "}
          {selectedType === "all" ? "" : selectedType} questions to review.
        </p>
        {onGoHome && (
          <Button onClick={onGoHome} className="mt-4">
            <Home className="h-4 w-4 mr-2" />
            Return Home
          </Button>
        )}
      </div>
    </QuizContainer>
  );
};

export default IncorrectQuestionsReview;
