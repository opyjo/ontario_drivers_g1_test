// G1 Simulation Quiz Component
// Complete G1 test simulation using useSimulation hook with format validation

import React, { useEffect, useState } from "react";
import { useSimulation } from "@/hooks/quiz";

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

// UI components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Car,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target,
  BookOpen,
  SignpostBig,
  Trophy,
} from "lucide-react";

export interface G1SimulationQuizProps {
  autoStart?: boolean;
  onComplete?: (result: any) => void;
  className?: string;
}

const G1SimulationQuiz: React.FC<G1SimulationQuizProps> = ({
  autoStart = false,
  onComplete,
  className = "",
}) => {
  const [isStarted, setIsStarted] = useState(autoStart);
  const [showInstructions, setShowInstructions] = useState(!autoStart);

  // G1 simulation hook
  const {
    // G1-specific data
    signsQuestions,
    rulesQuestions,
    isValidG1Format,
    testConfig,

    // Base data
    quiz,

    // State
    state,

    // G1-specific actions
    initializeSimulation,
    startSimulation,
    restartSimulation,

    // Base actions
    storeActions,

    // Progress tracking
    signsAnswered,
    rulesAnswered,
    signsCorrect,
    rulesCorrect,

    // Validation
    canStartSimulation,
  } = useSimulation({ autoStart: false });

  // Initialize simulation when component starts
  useEffect(() => {
    if (isStarted && !showInstructions) {
      initializeSimulation();
    }
  }, [isStarted, showInstructions, initializeSimulation]);

  // Handle quiz completion
  useEffect(() => {
    if (quiz.status === "completed" && quiz.result && onComplete) {
      onComplete(quiz.result);
    }
  }, [quiz.status, quiz.result, onComplete]);

  // Handle starting the simulation
  const handleStart = async () => {
    setShowInstructions(false);
    setIsStarted(true);
    await initializeSimulation();
  };

  // Handle simulation restart
  const handleRestart = async () => {
    await restartSimulation();
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
          errorType="validation"
          onRetry={initializeSimulation}
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
        <QuizLoadingScreen mode="simulation" />
      </QuizContainer>
    );
  }

  // Instructions/Setup state
  if (showInstructions || (!isStarted && quiz.questions.length === 0)) {
    return (
      <QuizContainer className={className}>
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-orange-100 rounded-full">
                <Car className="h-12 w-12 text-orange-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold">G1 Test Simulation</h1>
            <p className="text-lg text-muted-foreground">
              Experience the real Ontario G1 driving test
            </p>
          </div>

          {/* Test Format Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Official G1 Test Format
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <SignpostBig className="h-6 w-6 text-blue-600" />
                  <div>
                    <div className="font-semibold">
                      {testConfig.signsRequired} Road Signs
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Identification questions
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <BookOpen className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="font-semibold">
                      {testConfig.rulesRequired} Rules Questions
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Traffic laws & safety
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {testConfig.totalQuestions}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Questions
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {testConfig.passingPercentage}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Required to Pass
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {testConfig.passingScore}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Correct Answers Needed
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Instructions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Test Instructions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Answer all questions to the best of your ability
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  You can navigate back and forth between questions
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  Review your answers before submitting
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  No time limit - take your time to think carefully
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Start Button */}
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

          {/* Readiness Check */}
          <Alert>
            <Trophy className="h-4 w-4" />
            <AlertTitle>Ready to Begin?</AlertTitle>
            <AlertDescription>
              Make sure you're in a quiet environment where you can focus. This
              simulation mimics the real G1 test experience.
            </AlertDescription>
          </Alert>
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
          mode="simulation"
          onRestart={handleRestart}
          onGoHome={() => {
            setIsStarted(false);
            setShowInstructions(true);
          }}
          showDetailedBreakdown={true}
        />
      </QuizContainer>
    );
  }

  // Format validation error
  if (quiz.questions.length > 0 && !isValidG1Format) {
    return (
      <QuizContainer className={className}>
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">
            Invalid G1 Test Format
          </AlertTitle>
          <AlertDescription className="text-red-700">
            The test questions don't match the required G1 format (
            {testConfig.signsRequired} signs + {testConfig.rulesRequired} rules
            = {testConfig.totalQuestions} total). Please try again.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center mt-6">
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
            onRestart={initializeSimulation}
            showRestartButton={true}
            isLoading={state.isLoading}
          />
        </div>
      </QuizContainer>
    );
  }

  // Active quiz state
  if (quiz.status === "active" && quiz.currentQuestion && isValidG1Format) {
    const currentQuestionIndex = quiz.currentQuestionIndex + 1; // 1-based for display
    const userAnswer = Object.values(quiz.answers).find(
      (a: any) => a.questionId === quiz.currentQuestion!.id
    ) as any;

    return (
      <QuizContainer className={className}>
        <div className="space-y-6">
          {/* G1 Progress Indicator with section breakdown */}
          <ProgressIndicator
            currentQuestion={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            answeredQuestions={quiz.answers.length}
            mode="simulation"
            quizStatus={quiz.status}
            showStats={true}
            signsAnswered={signsAnswered}
            rulesAnswered={rulesAnswered}
            signsTotal={testConfig.signsRequired}
            rulesTotal={testConfig.rulesRequired}
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

          {/* G1 Navigation Controls */}
          <NavigationControls
            currentQuestion={currentQuestionIndex}
            totalQuestions={quiz.questions.length}
            canGoBack={quiz.currentQuestionIndex > 0}
            canGoForward={quiz.currentQuestionIndex < quiz.questions.length - 1}
            canSubmit={quiz.answers.length >= testConfig.totalQuestions * 0.5} // Require at least 50% answered
            isQuizActive={quiz.status === "active"}
            onPrevious={storeActions.previousQuestion}
            onNext={storeActions.nextQuestion}
            onSubmit={handleSubmit}
            isLoading={(quiz.status as string) === "submitting"}
            currentQuestionAnswered={!!userAnswer}
            totalAnswered={Object.keys(quiz.answers).length}
            requireAnswerToAdvance={false} // G1 test allows skipping
            submitButtonText="Submit G1 Test"
          />

          {/* G1 Test Progress Summary */}
          <Card className="bg-orange-50 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-orange-700 border-orange-300"
                  >
                    G1 Simulation
                  </Badge>
                  <span className="text-orange-700">
                    {Object.keys(quiz.answers).length} of{" "}
                    {testConfig.totalQuestions} answered
                  </span>
                </div>
                <div className="text-orange-600 font-medium">
                  Need {testConfig.passingScore} correct to pass
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </QuizContainer>
    );
  }

  // Default fallback
  return (
    <QuizContainer className={className}>
      <div className="text-center py-8">
        <p className="text-muted-foreground">Preparing G1 simulation...</p>
        <LoadingStates variant="minimal" />
      </div>
    </QuizContainer>
  );
};

export default G1SimulationQuiz;
