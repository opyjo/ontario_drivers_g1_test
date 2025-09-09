"use client";

// Practice Mode Selector - Choose between signs and rules practice
// Provides detailed information about each practice mode

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  SignpostBig,
  BookOpen,
  ArrowRight,
  Clock,
  Target,
  TrendingUp,
  CheckCircle,
  Info,
} from "lucide-react";
import Link from "next/link";
import { QuizModeSelector, QuestionLimitSelector } from "@/components/quiz";
import { QuestionLimit } from "@/types/quiz";

export default function PracticePage() {
  const [selectedMode, setSelectedMode] = useState<
    "signs_practice" | "rules_practice" | null
  >(null);
  const [selectedLimit, setSelectedLimit] = useState<QuestionLimit>(20);

  const practiceStats = {
    signs: {
      attempted: 12,
      averageScore: 78,
      bestScore: 92,
      timeSpent: "2h 15m",
    },
    rules: {
      attempted: 8,
      averageScore: 85,
      bestScore: 96,
      timeSpent: "1h 45m",
    },
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Practice Mode</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose your practice focus and question count. Perfect your skills
          with targeted practice sessions.
        </p>
      </div>

      {/* Practice Mode Selection */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Mode Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Select Practice Type</CardTitle>
              <CardDescription>
                Focus on the areas where you need the most improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuizModeSelector
                selectedMode={selectedMode}
                onModeSelect={(mode) =>
                  setSelectedMode(
                    mode === "simulation"
                      ? null
                      : (mode as "signs_practice" | "rules_practice")
                  )
                }
                showDescriptions={true}
                compact={false}
              />
            </CardContent>
          </Card>

          {/* Question Limit Selection */}
          {selectedMode && (
            <Card>
              <CardHeader>
                <CardTitle>Choose Question Count</CardTitle>
                <CardDescription>
                  Select how many questions you want to practice with
                </CardDescription>
              </CardHeader>
              <CardContent>
                <QuestionLimitSelector
                  selectedLimit={selectedLimit}
                  onLimitSelect={setSelectedLimit}
                  mode="selection"
                  availableLimits={[10, 20, 40]}
                />
              </CardContent>
              <CardFooter>
                <div className="flex w-full items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>
                      Estimated time:{" "}
                      {selectedLimit === 10
                        ? "5-8"
                        : selectedLimit === 20
                        ? "10-15"
                        : "20-25"}{" "}
                      minutes
                    </span>
                  </div>
                  <Link
                    href={`/quiz/practice/${
                      selectedMode.split("_")[0]
                    }?limit=${selectedLimit}`}
                  >
                    <Button>
                      Start Practice
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          )}

          {/* Quick Start Options */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Start</CardTitle>
              <CardDescription>
                Jump straight into practice with recommended settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/quiz/practice/signs?limit=20">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <SignpostBig className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            Signs Quick Practice
                          </h3>
                          <p className="text-sm text-gray-600">
                            20 questions • ~10 min
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            Recommended
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>

                <Link href="/quiz/practice/rules?limit=20">
                  <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-green-100 rounded-lg">
                          <BookOpen className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold">
                            Rules Quick Practice
                          </h3>
                          <p className="text-sm text-gray-600">
                            20 questions • ~10 min
                          </p>
                          <Badge variant="secondary" className="mt-1">
                            Recommended
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          {/* Practice Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Your Practice Stats</CardTitle>
              <CardDescription>Track your improvement</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Signs Stats */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <SignpostBig className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">Signs Practice</span>
                  </div>
                  <Badge variant="outline">
                    {practiceStats.signs.attempted} attempts
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium">
                      {practiceStats.signs.averageScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Score</span>
                    <span className="font-medium">
                      {practiceStats.signs.bestScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Spent</span>
                    <span className="font-medium">
                      {practiceStats.signs.timeSpent}
                    </span>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Rules Stats */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Rules Practice</span>
                  </div>
                  <Badge variant="outline">
                    {practiceStats.rules.attempted} attempts
                  </Badge>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Average Score</span>
                    <span className="font-medium">
                      {practiceStats.rules.averageScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Score</span>
                    <span className="font-medium">
                      {practiceStats.rules.bestScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Spent</span>
                    <span className="font-medium">
                      {practiceStats.rules.timeSpent}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Info className="h-5 w-5" />
                <span>Practice Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Start with 10-20 questions to build confidence</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Focus on your weak areas identified in previous tests
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Review explanations for questions you miss</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>
                    Take the G1 simulation when consistently scoring 80%+
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
