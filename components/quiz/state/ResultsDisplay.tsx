"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, RotateCcw, Eye } from "lucide-react";

interface ResultsDisplayProps {
  total: number;
  correct: number;
  signsCorrect?: number;
  rulesCorrect?: number;
  signsTotal?: number;
  rulesTotal?: number;
  passingScore: number;
  onRetry?: () => void;
  onReviewIncorrect?: () => void;
}

/**
 * Show score, pass/fail, section stats, and actions to retry/review incorrect.
 * Displays comprehensive quiz results with clear pass/fail indication.
 */
export function ResultsDisplay({
  total,
  correct,
  signsCorrect,
  rulesCorrect,
  signsTotal,
  rulesTotal,
  passingScore,
  onRetry,
  onReviewIncorrect,
}: Readonly<ResultsDisplayProps>) {
  const percentage = Math.round((correct / total) * 100);
  const passed = correct >= passingScore;
  const incorrect = total - correct;

  return (
    <Card className="w-full">
      <CardHeader className="text-center space-y-4">
        <div className="flex justify-center">
          {passed ? (
            <CheckCircle className="w-16 h-16 text-success" />
          ) : (
            <XCircle className="w-16 h-16 text-destructive" />
          )}
        </div>

        <div className="space-y-2">
          <CardTitle className="text-2xl">
            {passed ? "Congratulations!" : "Keep Practicing"}
          </CardTitle>
          <Badge
            variant={passed ? "default" : "destructive"}
            className="text-lg px-4 py-2"
          >
            {passed ? "PASSED" : "FAILED"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Overall Score */}
        <div className="text-center space-y-2">
          <div className="text-4xl font-bold">
            {correct}/{total}
          </div>
          <div className="text-xl text-muted-foreground">
            {percentage}% ({passingScore} required to pass)
          </div>
        </div>

        {/* Section Breakdown */}
        {(signsCorrect !== undefined || rulesCorrect !== undefined) && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {signsCorrect !== undefined && (
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-semibold">
                  {signsCorrect}/{signsTotal ?? 20}
                </div>
                <div className="text-sm text-muted-foreground">
                  Traffic Signs
                </div>
              </div>
            )}
            {rulesCorrect !== undefined && (
              <div className="text-center p-4 border rounded-lg">
                <div className="text-2xl font-semibold">
                  {rulesCorrect}/{rulesTotal ?? 20}
                </div>
                <div className="text-sm text-muted-foreground">
                  Rules of the Road
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="flex items-center gap-2"
              aria-label="Retake the quiz"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </Button>
          )}

          {onReviewIncorrect && incorrect > 0 && (
            <Button
              variant="outline"
              onClick={onReviewIncorrect}
              className="flex items-center gap-2 bg-transparent"
              aria-label={`Review ${incorrect} incorrect questions`}
            >
              <Eye className="w-4 h-4" />
              Review Incorrect ({incorrect})
            </Button>
          )}
        </div>

        {/* Encouragement Message */}
        <div className="text-center text-sm text-muted-foreground">
          {passed
            ? "You're ready for your G1 knowledge test!"
            : "Keep studying and practicing. You'll get there!"}
        </div>
      </CardContent>
    </Card>
  );
}
