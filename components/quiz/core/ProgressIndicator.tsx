// Progress Indicator Component
// Visual progress bar and question counter with accessibility

import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Circle, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProgressIndicatorProps {
  currentQuestion: number;
  totalQuestions: number;
  answeredQuestions: number;
  correctAnswers?: number;
  mode?: "practice" | "simulation" | "review";
  quizStatus?: "not_started" | "active" | "completed";
  className?: string;
  showStats?: boolean;
  signsAnswered?: number;
  rulesAnswered?: number;
  signsTotal?: number;
  rulesTotal?: number;
}

const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentQuestion,
  totalQuestions,
  answeredQuestions,
  correctAnswers,
  mode = "practice",
  quizStatus = "not_started",
  className = "",
  showStats = false,
  signsAnswered = 0,
  rulesAnswered = 0,
  signsTotal = 0,
  rulesTotal = 0,
}) => {
  // Calculate progress percentage
  const progressPercentage =
    totalQuestions > 0
      ? Math.round((currentQuestion / totalQuestions) * 100)
      : 0;

  const answeredPercentage =
    totalQuestions > 0
      ? Math.round((answeredQuestions / totalQuestions) * 100)
      : 0;

  // Get mode-specific styling and labels
  const getModeConfig = () => {
    switch (mode) {
      case "simulation":
        return {
          title: "G1 Test Simulation",
          color: "bg-orange-500",
          badgeVariant: "secondary" as const,
          icon: <AlertCircle className="h-4 w-4" />,
        };
      case "review":
        return {
          title: "Review Session",
          color: "bg-purple-500",
          badgeVariant: "outline" as const,
          icon: <CheckCircle className="h-4 w-4" />,
        };
      default:
        return {
          title: "Practice Session",
          color: "bg-blue-500",
          badgeVariant: "default" as const,
          icon: <Circle className="h-4 w-4" />,
        };
    }
  };

  const config = getModeConfig();

  // Show G1-specific breakdown for simulation
  const showG1Breakdown =
    mode === "simulation" && (signsTotal > 0 || rulesTotal > 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            {config.icon}
            {config.title}
          </CardTitle>
          <Badge variant={config.badgeVariant}>
            {currentQuestion} of {totalQuestions}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Main Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{progressPercentage}%</span>
          </div>
          <Progress
            value={progressPercentage}
            className="h-2"
            aria-label={`Quiz progress: ${progressPercentage}% complete`}
          />
        </div>

        {/* Statistics Section */}
        {showStats && (
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {answeredQuestions}
              </div>
              <div className="text-xs text-muted-foreground">Answered</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {totalQuestions - answeredQuestions}
              </div>
              <div className="text-xs text-muted-foreground">Remaining</div>
            </div>
          </div>
        )}

        {/* G1 Test Breakdown */}
        {showG1Breakdown && (
          <div className="space-y-3 pt-2 border-t">
            <h4 className="text-sm font-medium text-muted-foreground">
              Section Progress
            </h4>

            {/* Signs Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-blue-600 font-medium">Road Signs</span>
                <span>
                  {signsAnswered} of {signsTotal}
                </span>
              </div>
              <Progress
                value={signsTotal > 0 ? (signsAnswered / signsTotal) * 100 : 0}
                className="h-1.5"
                aria-label={`Signs progress: ${signsAnswered} of ${signsTotal} answered`}
              />
            </div>

            {/* Rules Progress */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-green-600 font-medium">
                  Rules of the Road
                </span>
                <span>
                  {rulesAnswered} of {rulesTotal}
                </span>
              </div>
              <Progress
                value={rulesTotal > 0 ? (rulesAnswered / rulesTotal) * 100 : 0}
                className="h-1.5"
                aria-label={`Rules progress: ${rulesAnswered} of ${rulesTotal} answered`}
              />
            </div>
          </div>
        )}

        {/* Quiz Status Indicator */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          {quizStatus === "active" && (
            <>
              <Clock className="h-3 w-3" />
              <span>Quiz in progress</span>
            </>
          )}
          {quizStatus === "completed" && correctAnswers !== undefined && (
            <>
              <CheckCircle className="h-3 w-3 text-green-500" />
              <span>
                Completed • {correctAnswers} correct (
                {Math.round((correctAnswers / totalQuestions) * 100)}%)
              </span>
            </>
          )}
          {quizStatus === "not_started" && (
            <>
              <Circle className="h-3 w-3" />
              <span>Ready to start</span>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressIndicator;
