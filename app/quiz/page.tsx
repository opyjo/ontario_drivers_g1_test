"use client";

// Quiz Dashboard - Main landing page for quiz functionality
// Shows mode selection, user stats, and quick actions

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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Car,
  SignpostBig,
  BookOpen,
  Eye,
  Trophy,
  TrendingUp,
  Clock,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { QuizModeSelector } from "@/components/quiz";

export default function QuizDashboard() {
  const [selectedMode, setSelectedMode] = useState<
    "signs_practice" | "rules_practice" | "simulation" | undefined
  >(undefined);

  // Mock user stats (in real app, this would come from the database)
  const userStats = {
    totalQuizzes: 15,
    signsQuizzes: 8,
    rulesQuizzes: 4,
    simulations: 3,
    averageScore: 85,
    highestScore: 95,
    currentStreak: 5,
    lastQuizDate: "2024-01-15",
  };

  const recentActivity = [
    { type: "simulation", score: 88, date: "2024-01-15", passed: true },
    { type: "rules_practice", score: 92, date: "2024-01-14", passed: true },
    { type: "signs_practice", score: 76, date: "2024-01-13", passed: false },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8">
      {/* Welcome Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          G1 Driving Test Quiz
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master your Ontario G1 driving test with comprehensive practice
          quizzes. Choose from signs practice, rules practice, or take a full G1
          simulation.
        </p>
      </div>

      {/* Quick Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Quizzes
                </p>
                <p className="text-2xl font-bold">{userStats.totalQuizzes}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Average Score
                </p>
                <p className="text-2xl font-bold">{userStats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Highest Score
                </p>
                <p className="text-2xl font-bold">{userStats.highestScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Streak
                </p>
                <p className="text-2xl font-bold">{userStats.currentStreak}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quiz Mode Selection */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Choose Your Quiz Mode</CardTitle>
              <CardDescription>
                Select the type of practice that best fits your learning goals
              </CardDescription>
            </CardHeader>
            <CardContent>
              <QuizModeSelector
                selectedMode={selectedMode}
                onModeSelect={setSelectedMode}
                showDescriptions={true}
                compact={false}
              />
            </CardContent>
            <CardFooter>
              {selectedMode && (
                <div className="flex w-full items-center justify-between">
                  <p className="text-sm text-gray-600">
                    Ready to start{" "}
                    {selectedMode === "signs_practice"
                      ? "Signs Practice"
                      : selectedMode === "rules_practice"
                      ? "Rules Practice"
                      : "G1 Simulation"}
                    ?
                  </p>
                  <Link
                    href={
                      selectedMode === "simulation"
                        ? "/quiz/simulation"
                        : `/quiz/practice/${selectedMode.split("_")[0]}`
                    }
                  >
                    <Button className="ml-4">
                      Start Quiz
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </CardFooter>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/quiz/practice/signs">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <SignpostBig className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Signs Practice</h3>
                      <p className="text-sm text-gray-600">Quick practice</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/quiz/practice/rules">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <BookOpen className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Rules Practice</h3>
                      <p className="text-sm text-gray-600">Learn the rules</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/quiz/simulation">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Car className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">G1 Simulation</h3>
                      <p className="text-sm text-gray-600">Full test</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Right Column - Stats and Activity */}
        <div className="space-y-6">
          {/* Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
              <CardDescription>
                Track your improvement over time
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Signs Knowledge</span>
                  <span>78%</span>
                </div>
                <Progress value={78} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Rules Knowledge</span>
                  <span>92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Readiness</span>
                  <span>85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest quiz attempts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-1 rounded ${
                          activity.passed ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {activity.passed ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">
                          {activity.type === "simulation"
                            ? "G1 Simulation"
                            : activity.type === "signs_practice"
                            ? "Signs Practice"
                            : "Rules Practice"}
                        </p>
                        <p className="text-xs text-gray-600">{activity.date}</p>
                      </div>
                    </div>
                    <Badge
                      variant={activity.passed ? "default" : "destructive"}
                    >
                      {activity.score}%
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/quiz/review" className="w-full">
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Review Mistakes
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
