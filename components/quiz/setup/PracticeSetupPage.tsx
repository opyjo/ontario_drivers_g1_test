"use client";

import type React from "react";

import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { Button } from "@/components/ui/button";
import { BackButton } from "@/components/ui/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CircleHelp, Layers, ListChecks, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import type { QuestionLimit } from "@/types/quiz";
import { QUESTION_LIMITS } from "@/lib/quiz/constants";

interface PracticeSetupPageProps {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  basePath: string; // "rules" or "signs"
  quickDescription: string;
  incorrectDescription: string;
  incorrectCount: number;
  infoText?: string;
}

export function PracticeSetupPage({
  title,
  subtitle,
  icon,
  basePath,
  quickDescription,
  incorrectDescription,
  incorrectCount,
  infoText,
}: Readonly<PracticeSetupPageProps>) {
  const router = useRouter();

  const startPractice = (limit: QuestionLimit) => {
    router.push(`/quiz/${basePath}?limit=${limit}`);
  };

  const startIncorrectPractice = () => {
    router.push(`/quiz/review?questionType=${basePath}`);
  };

  return (
    <QuizContainer title={title} subtitle={subtitle}>
      {/* Back Navigation */}
      <div className="mb-4 sm:mb-6 flex-shrink-0">
        <BackButton text="Back to Home" />
      </div>

      {/* Quick Practice Section */}
      <Card className="card-enhanced">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-primary">{icon}</div>
            <CardTitle className="text-lg font-medium">
              Quick Practice
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground leading-relaxed">
            {quickDescription}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 gap-2 sm:gap-3">
            <Button
              variant="outline"
              size="sm"
              className="h-10 sm:h-12 text-sm font-medium justify-start gap-3 hover:bg-accent/50 transition-colors bg-transparent cursor-pointer"
              onClick={() => startPractice(QUESTION_LIMITS.QUICK_PRACTICE)}
            >
              <CircleHelp className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span>10 Questions</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Quick review
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-10 sm:h-12 text-sm font-medium justify-start gap-3 hover:bg-accent/50 transition-colors bg-transparent cursor-pointer"
              onClick={() => startPractice(QUESTION_LIMITS.MEDIUM_PRACTICE)}
            >
              <Layers className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span>20 Questions</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Standard practice
                </span>
              </div>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-10 sm:h-12 text-sm font-medium justify-start gap-3 hover:bg-accent/50 transition-colors bg-transparent cursor-pointer"
              onClick={() => startPractice(QUESTION_LIMITS.EXTENDED_PRACTICE)}
            >
              <ListChecks className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-col items-start">
                <span>50 Questions</span>
                <span className="text-xs text-muted-foreground font-normal">
                  Extended session
                </span>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Incorrect Questions Section */}
      <Card className="border border-warning/20 bg-warning/10 dark:border-warning/30 dark:bg-warning/5 card-enhanced">
        <CardHeader className="pb-3 sm:pb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-warning" />
            <CardTitle className="text-lg font-medium">
              Review Mistakes
            </CardTitle>
          </div>
          <CardDescription className="text-xs text-muted-foreground leading-relaxed">
            {incorrectDescription.replace("{count}", incorrectCount.toString())}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Button
            onClick={startIncorrectPractice}
            disabled={incorrectCount === 0}
            size="sm"
            className="w-full h-9 sm:h-10 text-sm font-medium cursor-pointer"
            variant={incorrectCount === 0 ? "secondary" : "default"}
          >
            {incorrectCount > 0
              ? `Review ${incorrectCount} Questions`
              : "No Questions to Review"}
          </Button>
        </CardContent>
      </Card>

      {/* Info Section */}
      {infoText && (
        <div className="text-center flex-shrink-0">
          <p className="text-xs text-muted-foreground leading-relaxed max-w-md mx-auto">
            {infoText}
          </p>
        </div>
      )}
    </QuizContainer>
  );
}
