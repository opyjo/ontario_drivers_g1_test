"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CheckCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
} from "lucide-react";
import { meetsG1PassingStandard } from "@/lib/quiz/scoring";

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
  const passed = meetsG1PassingStandard({
    score: correct,
    total,
    breakdown: { signsCorrect, rulesCorrect, signsTotal, rulesTotal },
  });
  const incorrect = total - correct;
  const hasSectionBreakdown =
    typeof signsCorrect === "number" &&
    typeof rulesCorrect === "number" &&
    typeof signsTotal === "number" &&
    typeof rulesTotal === "number";
  const signsRequired = hasSectionBreakdown
    ? Math.ceil(signsTotal * 0.8)
    : null;
  const rulesRequired = hasSectionBreakdown
    ? Math.ceil(rulesTotal * 0.8)
    : null;
  const signsPassed =
    hasSectionBreakdown && signsRequired !== null
      ? signsCorrect >= signsRequired
      : null;
  const rulesPassed =
    hasSectionBreakdown && rulesRequired !== null
      ? rulesCorrect >= rulesRequired
      : null;
  const improvementMessage = hasSectionBreakdown
    ? [
        signsPassed
          ? null
          : `Traffic Signs needs ${Math.max(0, (signsRequired ?? 0) - signsCorrect)} more correct`,
        rulesPassed
          ? null
          : `Rules of the Road needs ${Math.max(0, (rulesRequired ?? 0) - rulesCorrect)} more correct`,
      ]
        .filter(Boolean)
        .join(". ")
    : null;

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
          <div className="text-base text-muted-foreground sm:text-lg">
            {hasSectionBreakdown
              ? `${percentage}% overall · ${signsRequired}/${signsTotal} required in signs and ${rulesRequired}/${rulesTotal} in rules`
              : `${percentage}% (${passingScore} required to pass)`}
          </div>
        </div>

        {/* Section Breakdown */}
        {(signsCorrect !== undefined || rulesCorrect !== undefined) && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {signsCorrect !== undefined && (
              <div
                className={`rounded-lg border p-4 text-center ${
                  signsPassed === false
                    ? "border-destructive/40 bg-destructive/5"
                    : signsPassed
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : "border-border"
                }`}
              >
                <div className="text-2xl font-semibold">
                  {signsCorrect}/{signsTotal ?? 20}
                </div>
                <div className="text-sm text-muted-foreground">
                  Traffic Signs
                </div>
                {signsPassed !== null ? (
                  <div
                    className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                      signsPassed ? "text-emerald-700" : "text-destructive"
                    }`}
                  >
                    {signsPassed ? (
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {signsPassed ? "Section passed" : `Need ${signsRequired}`}
                  </div>
                ) : null}
              </div>
            )}
            {rulesCorrect !== undefined && (
              <div
                className={`rounded-lg border p-4 text-center ${
                  rulesPassed === false
                    ? "border-destructive/40 bg-destructive/5"
                    : rulesPassed
                      ? "border-emerald-500/40 bg-emerald-500/5"
                      : "border-border"
                }`}
              >
                <div className="text-2xl font-semibold">
                  {rulesCorrect}/{rulesTotal ?? 20}
                </div>
                <div className="text-sm text-muted-foreground">
                  Rules of the Road
                </div>
                {rulesPassed !== null ? (
                  <div
                    className={`mt-2 inline-flex items-center gap-1 text-xs font-semibold ${
                      rulesPassed ? "text-emerald-700" : "text-destructive"
                    }`}
                  >
                    {rulesPassed ? (
                      <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    )}
                    {rulesPassed ? "Section passed" : `Need ${rulesRequired}`}
                  </div>
                ) : null}
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
            ? "You met the passing standard in every required section."
            : improvementMessage
              ? `${improvementMessage}. Review those questions, then try again.`
              : "Keep studying and practicing. You'll get there!"}
        </div>
      </CardContent>
    </Card>
  );
}
