"use client";

import { useRouter } from "next/navigation";
import type { QuizAttemptRow } from "@/app/actions/quiz-attempts";
import type { LearningInsights } from "@/app/actions/learning";
import { LearningInsightsPanel } from "@/components/dashboard/LearningInsightsPanel";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, TrendingUp, Clock, Eye } from "lucide-react";
import { BackButton } from "@/components/ui/back-button";
import {
  isPassedQuizAttempt,
  type QuizSectionBreakdown,
} from "@/lib/quiz/scoring";

interface DashboardClientProps {
  readonly attempts: QuizAttemptRow[];
  readonly insights: LearningInsights;
}

function attemptBreakdown(attempt: { user_answers: unknown }) {
  const payload = attempt.user_answers;
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) return null;
  const breakdown = (payload as { breakdown?: unknown }).breakdown;
  if (!breakdown || typeof breakdown !== "object" || Array.isArray(breakdown)) {
    return null;
  }
  return breakdown as QuizSectionBreakdown;
}

export default function DashboardClient({
  attempts,
  insights,
}: DashboardClientProps) {
  const router = useRouter();

  // Calculate statistics
  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter((attempt) =>
    isPassedQuizAttempt({
      isPractice: Boolean(attempt.is_practice),
      score: attempt.score ?? 0,
      total: attempt.total_questions_in_attempt ?? 0,
      breakdown: attemptBreakdown(attempt),
    })
  ).length;
  const averageScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce(
            (sum: number, a) =>
              sum +
              (((a.score ?? 0) / (a.total_questions_in_attempt ?? 0)) * 100 ||
                0),
            0
          ) / attempts.length
        )
      : 0;

  const renderAttempts = (filter?: "signs" | "rules" | "simulation") => {
    const list = filter
      ? attempts.filter((attempt) => attempt.quiz_type === filter)
      : attempts;
    if (list.length === 0)
      return (
        <div className="text-center py-8 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
            <Trophy className="w-8 h-8 text-primary/50" />
          </div>
          <p className="text-sm text-muted-foreground">
            No attempts{filter ? ` for ${filter}` : ""}. Take a quiz to see
            results here.
          </p>
        </div>
      );
    return (
      <div className="space-y-3">
        {list.map((a, index) => {
          const score = a.score ?? 0;
          const total = a.total_questions_in_attempt ?? 0;
          const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
          const isPassing = isPassedQuizAttempt({
            isPractice: Boolean(a.is_practice),
            score,
            total,
            breakdown: attemptBreakdown(a),
          });

          return (
            <div
              key={a.id}
              className="card-enhanced animate-fade-in hover:scale-[1.02] transition-all duration-300 cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
              onClick={() => router.push(`/quiz/results/${a.id}`)}
            >
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      isPassing
                        ? "bg-gradient-to-br from-emerald-500 to-green-600"
                        : "bg-gradient-to-br from-orange-500 to-red-600"
                    }`}
                  >
                    {isPassing ? (
                      <Trophy className="w-5 h-5 text-white" />
                    ) : (
                      <TrendingUp className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-sm font-semibold capitalize text-foreground group-hover:text-primary transition-colors">
                      {a.quiz_type?.replace("_", " ") || "Quiz"}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {new Date(a.created_at).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div
                      className={`text-lg font-bold ${
                        isPassing ? "text-emerald-600" : "text-orange-600"
                      }`}
                    >
                      {percentage}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {score}/{total}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="focus-ring-modern hover:bg-primary/10 hover:text-primary cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/quiz/results/${a.id}`);
                    }}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto max-w-6xl space-y-5 px-4 py-6">
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/80 bg-clip-text text-transparent">
              Your Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your progress and review your quiz attempts
            </p>
          </div>
          <BackButton
            onClick={() => router.push("/")}
            variant="default"
            className="button-modern"
          />
        </div>

        {/* Statistics Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-3 animate-slide-up flex-shrink-0"
          style={{ animationDelay: "100ms" }}
        >
          <Card className="card-enhanced">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {totalAttempts}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Attempts
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-enhanced">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {passedAttempts}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Passed (≥80%)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="card-enhanced">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center">
                  <div className="text-white font-bold text-sm">
                    {averageScore}%
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-foreground">
                    {averageScore}%
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Average Score
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <LearningInsightsPanel insights={insights} loading={false} />

        <Tabs
          defaultValue="all"
          className="w-full animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <TabsList className="grid w-full grid-cols-4 card-enhanced">
            <TabsTrigger
              value="all"
              className="focus-ring-modern cursor-pointer"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="signs"
              className="focus-ring-modern cursor-pointer"
            >
              Signs
            </TabsTrigger>
            <TabsTrigger
              value="rules"
              className="focus-ring-modern cursor-pointer"
            >
              Rules
            </TabsTrigger>
            <TabsTrigger
              value="simulation"
              className="focus-ring-modern cursor-pointer"
            >
              Simulation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="animate-fade-in">
            <Card className="card-enhanced">
              <CardHeader className="flex-shrink-0 pb-2 pt-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                  All Attempts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {renderAttempts()}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signs" className="animate-fade-in">
            <Card className="card-enhanced">
              <CardHeader className="flex-shrink-0 pb-2 pt-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  Signs Attempts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {renderAttempts("signs")}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="animate-fade-in">
            <Card className="card-enhanced">
              <CardHeader className="flex-shrink-0 pb-2 pt-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  Rules Attempts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {renderAttempts("rules")}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent
            value="simulation"
            className="animate-fade-in"
          >
            <Card className="card-enhanced">
              <CardHeader className="flex-shrink-0 pb-2 pt-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                  Simulation Attempts
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                {renderAttempts("simulation")}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
