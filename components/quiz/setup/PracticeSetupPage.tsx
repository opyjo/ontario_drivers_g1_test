"use client";

import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  CircleHelp,
  Layers,
  ListChecks,
  AlertTriangle,
} from "lucide-react";
import Link from "next/link";
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
}: PracticeSetupPageProps) {
  const router = useRouter();

  const startPractice = (limit: QuestionLimit) => {
    router.push(`/quiz/${basePath}?limit=${limit}`);
  };

  const startIncorrectPractice = () => {
    router.push(`/quiz/incorrect?type=${basePath}`);
  };

  return (
    <div className="space-y-6">
      {/* Back button at the very top */}
      <div className="w-full flex justify-center pt-4">
        <Link href="/" passHref>
          <Button className="cursor-pointer bg-muted text-foreground hover:bg-muted/70 px-6 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <QuizContainer title={title} subtitle={subtitle}>
        <div className="max-w-6xl mx-auto space-y-8 font-sans">
          {/* Quick Practice */}
          <Card className="rounded-xl shadow-sm bg-muted/20 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                {icon}
                <CardTitle className="text-xl font-semibold">
                  Quick Practice
                </CardTitle>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {quickDescription}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Choose how many questions you’d like to practice:
              </p>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="cursor-pointer h-14 rounded-xl font-medium hover:border-primary hover:text-primary"
                  onClick={() => startPractice(QUESTION_LIMITS.QUICK_PRACTICE)}
                >
                  <CircleHelp className="w-4 h-4 mr-2" />
                  Start 10
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer h-14 rounded-xl font-medium hover:border-primary hover:text-primary"
                  onClick={() => startPractice(QUESTION_LIMITS.MEDIUM_PRACTICE)}
                >
                  <Layers className="w-4 h-4 mr-2" />
                  Start 20
                </Button>
                <Button
                  variant="outline"
                  className="cursor-pointer h-14 rounded-xl font-medium hover:border-primary hover:text-primary"
                  onClick={() =>
                    startPractice(QUESTION_LIMITS.EXTENDED_PRACTICE)
                  }
                >
                  <ListChecks className="w-4 h-4 mr-2" />
                  Start 50
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Practice Incorrect Questions */}
          <Card className="rounded-xl shadow-sm bg-muted/20 hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <CardTitle className="text-xl font-semibold">
                  Practice Incorrect Questions
                </CardTitle>
              </div>
              <CardDescription className="text-sm leading-relaxed">
                {incorrectDescription.replace(
                  "{count}",
                  incorrectCount.toString()
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Focus on your past mistakes and strengthen your weak areas.
              </p>
              <Button
                onClick={startIncorrectPractice}
                disabled={incorrectCount === 0}
                className="cursor-pointer w-full h-14 rounded-xl font-semibold"
                variant={incorrectCount === 0 ? "secondary" : "default"}
              >
                {incorrectCount > 0
                  ? `Practice ${incorrectCount} Incorrect Questions`
                  : "No Incorrect Questions"}
              </Button>
            </CardContent>
          </Card>

          {/* Additional Info */}
          {infoText && (
            <div className="text-center text-sm text-muted-foreground max-w-2xl mx-auto">
              {infoText}
            </div>
          )}
        </div>
      </QuizContainer>
    </div>
  );
}
