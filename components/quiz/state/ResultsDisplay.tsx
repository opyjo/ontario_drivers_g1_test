// Results Display Component
// Show quiz completion results with score breakdown and pass/fail status

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Trophy,
  XCircle,
  CheckCircle2,
  RotateCcw,
  Home,
  Eye,
  TrendingUp,
  Target,
  Clock,
  BookOpen,
  SignpostBig,
  BarChart3,
} from "lucide-react";
import { QuizResult, QuizMode } from "@/types/quiz";
import { cn } from "@/lib/utils";

export interface ResultsDisplayProps {
  result: QuizResult;
  mode: QuizMode;
  onRestart?: () => void;
  onReviewIncorrect?: () => void;
  onGoHome?: () => void;
  showDetailedBreakdown?: boolean;
  className?: string;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  result,
  mode,
  onRestart,
  onReviewIncorrect,
  onGoHome,
  showDetailedBreakdown = true,
  className = "",
}) => {
  const {
    score,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    completedAt,
    mode: resultMode,
  } = result;

  // Calculate percentages
  const scorePercentage =
    totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;
  const passingScore =
    mode === "simulation" ? 32 : Math.ceil(totalQuestions * 0.8); // 80% passing
  const hasPassed = score >= passingScore;

  // Get mode-specific configuration
  const getModeConfig = () => {
    switch (mode) {
      case "simulation":
        return {
          title: "G1 Test Simulation Results",
          subtitle: "Official G1 driving test format",
          icon: <Target className="h-8 w-8" />,
          passingText: hasPassed ? "G1 Test Passed!" : "More study needed",
          passThreshold: "32/40 (80%)",
        };
      case "signs_practice":
        return {
          title: "Road Signs Practice Results",
          subtitle: "Road sign identification practice",
          icon: <SignpostBig className="h-8 w-8" />,
          passingText: hasPassed ? "Excellent work!" : "Keep practicing",
          passThreshold: `${passingScore}/${totalQuestions} (80%)`,
        };
      case "rules_practice":
        return {
          title: "Rules Practice Results",
          subtitle: "Rules of the road practice",
          icon: <BookOpen className="h-8 w-8" />,
          passingText: hasPassed
            ? "Great understanding!"
            : "Review recommended",
          passThreshold: `${passingScore}/${totalQuestions} (80%)`,
        };
      default:
        return {
          title: "Quiz Results",
          subtitle: "Practice session complete",
          icon: <BarChart3 className="h-8 w-8" />,
          passingText: hasPassed ? "Well done!" : "Keep learning",
          passThreshold: `${passingScore}/${totalQuestions} (80%)`,
        };
    }
  };

  const config = getModeConfig();

  // Results styling based on performance
  const getResultsTheme = () => {
    if (scorePercentage >= 90) {
      return {
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        textColor: "text-green-800",
        iconColor: "text-green-600",
        badgeVariant: "default" as const,
        progressColor: "bg-green-500",
      };
    } else if (scorePercentage >= 80) {
      return {
        bgColor: "bg-blue-50",
        borderColor: "border-blue-200",
        textColor: "text-blue-800",
        iconColor: "text-blue-600",
        badgeVariant: "secondary" as const,
        progressColor: "bg-blue-500",
      };
    } else if (scorePercentage >= 60) {
      return {
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        textColor: "text-yellow-800",
        iconColor: "text-yellow-600",
        badgeVariant: "outline" as const,
        progressColor: "bg-yellow-500",
      };
    } else {
      return {
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        textColor: "text-red-800",
        iconColor: "text-red-600",
        badgeVariant: "destructive" as const,
        progressColor: "bg-red-500",
      };
    }
  };

  const theme = getResultsTheme();

  // Performance message
  const getPerformanceMessage = () => {
    if (scorePercentage >= 95) return "Outstanding performance! 🌟";
    if (scorePercentage >= 90) return "Excellent work! 🎯";
    if (scorePercentage >= 80) return "Good job! You're ready! ✅";
    if (scorePercentage >= 70) return "Almost there! A bit more practice. 📚";
    if (scorePercentage >= 60) return "Making progress! Keep studying. 💪";
    return "More practice needed. You've got this! 🚀";
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Main Results Card */}
      <Card className={cn("w-full border-2", theme.borderColor, theme.bgColor)}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div
              className={cn(
                "p-4 rounded-full",
                hasPassed ? "bg-green-100" : "bg-red-100"
              )}
            >
              {hasPassed ? (
                <Trophy className={cn("h-12 w-12", theme.iconColor)} />
              ) : (
                <XCircle className="h-12 w-12 text-red-500" />
              )}
            </div>
          </div>

          <CardTitle className="text-2xl font-bold">{config.title}</CardTitle>
          <p className="text-muted-foreground">{config.subtitle}</p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Score Display */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <div className="text-6xl font-bold">
                {score}
                <span className="text-3xl text-muted-foreground">
                  /{totalQuestions}
                </span>
              </div>
              <div className="text-xl font-semibold">
                {Math.round(scorePercentage)}%
              </div>
            </div>

            <Progress
              value={scorePercentage}
              className="h-4 w-full max-w-md mx-auto"
            />

            <div className="space-y-1">
              <Badge variant={theme.badgeVariant} className="text-lg px-4 py-1">
                {config.passingText}
              </Badge>
              <p className="text-sm text-muted-foreground">
                {getPerformanceMessage()}
              </p>
            </div>
          </div>

          {/* Pass/Fail Status */}
          <div className="flex items-center justify-center gap-4 p-4 bg-background rounded-lg">
            <div className="flex items-center gap-2">
              {hasPassed ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className="font-medium">
                {hasPassed ? "Passing Score Achieved" : "Below Passing Score"}
              </span>
            </div>
            <Separator orientation="vertical" className="h-6" />
            <div className="text-sm text-muted-foreground">
              Required: {config.passThreshold}
            </div>
          </div>

          {/* Detailed Breakdown */}
          {showDetailedBreakdown && (
            <div className="space-y-4">
              <h3 className="font-semibold text-center">
                Performance Breakdown
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle2 className="h-6 w-6 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">
                    {correctAnswers}
                  </div>
                  <div className="text-sm text-green-600">Correct</div>
                </div>

                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <XCircle className="h-6 w-6 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">
                    {incorrectAnswers.length}
                  </div>
                  <div className="text-sm text-red-600">Incorrect</div>
                </div>
              </div>
            </div>
          )}

          {/* Additional Stats for G1 Simulation */}
          {mode === "simulation" && showDetailedBreakdown && (
            <div className="space-y-3">
              <h4 className="font-medium text-center">Section Performance</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <SignpostBig className="h-4 w-4 text-blue-500" />
                  <span>
                    Road Signs: {/* TODO: Calculate signs score */}?/20
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-green-500" />
                  <span>Rules: {/* TODO: Calculate rules score */}?/20</span>
                </div>
              </div>
            </div>
          )}

          {/* Completion Time */}
          {completedAt && (
            <div className="text-center text-sm text-muted-foreground">
              <Clock className="h-4 w-4 inline mr-1" />
              Completed on {new Date(completedAt).toLocaleString()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {onRestart && (
          <Button
            onClick={onRestart}
            variant="default"
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Try Again
          </Button>
        )}

        {onReviewIncorrect && incorrectAnswers.length > 0 && (
          <Button
            onClick={onReviewIncorrect}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Eye className="h-4 w-4" />
            Review Mistakes ({incorrectAnswers.length})
          </Button>
        )}

        {onGoHome && (
          <Button
            onClick={onGoHome}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Main Menu
          </Button>
        )}
      </div>

      {/* Study Recommendations */}
      {!hasPassed && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="space-y-2">
                <h4 className="font-medium">Study Recommendations</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Review the questions you got wrong</li>
                  <li>• Practice more in areas where you struggled</li>
                  {mode === "simulation" && (
                    <li>• Try focused practice on signs or rules separately</li>
                  )}
                  <li>• Come back and take another practice test</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsDisplay;
