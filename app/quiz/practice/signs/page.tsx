"use client";

// Signs Practice Page - Road sign practice quiz interface
// Uses SignsPracticeQuiz component with URL parameter support

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SignsPracticeQuiz, QuizLoadingScreen } from "@/components/quiz";
import { QuestionLimit } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

function SignsPracticeContent() {
  const searchParams = useSearchParams();
  const [questionLimit, setQuestionLimit] = useState<QuestionLimit>(20);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const limitParam = searchParams.get("limit");
    if (limitParam) {
      const limit = parseInt(limitParam);
      if ([10, 20, 40].includes(limit)) {
        setQuestionLimit(limit as QuestionLimit);
      }
    }
  }, [searchParams]);

  const handleComplete = (result: any) => {
    console.log("Signs practice completed:", result);
    setIsComplete(true);
    // In a real app, you would save the result to the database here
  };

  if (isComplete) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Practice Complete!</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                Great job completing your signs practice session!
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/quiz/practice/signs">
                  <Button>Practice Again</Button>
                </Link>
                <Link href="/quiz/practice">
                  <Button variant="outline">Choose Different Mode</Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto space-y-6">
      {/* Header with Back Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/quiz/practice">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Practice
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">Road Signs Practice</h1>
            <p className="text-gray-600">
              Practice identifying Ontario road signs ({questionLimit}{" "}
              questions)
            </p>
          </div>
        </div>
      </div>

      {/* Quiz Component */}
      <SignsPracticeQuiz
        questionLimit={questionLimit}
        autoStart={false}
        showLimitSelector={true}
        onComplete={handleComplete}
        className="w-full"
      />
    </div>
  );
}

export default function SignsPracticePage() {
  return (
    <Suspense fallback={<QuizLoadingScreen mode="signs_practice" />}>
      <SignsPracticeContent />
    </Suspense>
  );
}
