"use client";

import { useRouter } from "next/navigation";
import { listMyQuizAttempts } from "@/app/actions/quiz-attempts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { Trophy, TrendingUp, Clock, Eye } from "lucide-react";

interface DashboardClientProps {
  readonly userId: string;
}

export default function DashboardClient({ userId }: DashboardClientProps) {
  const router = useRouter();
  const { data: attempts = [], isLoading } = useQuery({
    queryKey: ["my-attempts"],
    queryFn: () => listMyQuizAttempts({ limit: 20 }),
  });

  // Calculate statistics
  const totalAttempts = attempts.length;
  const passedAttempts = attempts.filter((a: any) => {
    const percentage = (a.score / a.total_questions_in_attempt) * 100;
    return percentage >= 80;
  }).length;
  const averageScore =
    attempts.length > 0
      ? Math.round(
          attempts.reduce(
            (sum: number, a: any) =>
              sum + ((a.score / a.total_questions_in_attempt) * 100 || 0),
            0
          ) / attempts.length
        )
      : 0;

  const renderAttempts = (filter?: "signs" | "rules" | "simulation") => {
    const list = filter
      ? attempts.filter((a: any) => a.quiz_type === filter)
      : attempts;
    if (isLoading)
      return (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center justify-between rounded-lg border border-white/20 bg-white/40 p-4">
                <div className="space-y-2">
                  <div className="h-4 w-20 bg-primary/20 rounded"></div>
                  <div className="h-3 w-32 bg-primary/10 rounded"></div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-4 w-12 bg-primary/20 rounded"></div>
                  <div className="h-8 w-16 bg-primary/20 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
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
        {list.map((a: any, index) => {
          const score = a.score ?? 0;
          const total = a.total_questions_in_attempt ?? 0;
          const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
          const isPassing = percentage >= 80;

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
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between animate-slide-up">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-foreground via-primary to-primary/80 bg-clip-text text-transparent">
              Your Dashboard
            </h1>
            <p className="text-muted-foreground mt-1">
              Track your progress and review your quiz attempts
            </p>
          </div>
          <Button
            onClick={() => router.push("/")}
            className="button-modern focus-ring-modern cursor-pointer"
          >
            Back Home
          </Button>
        </div>

        {/* Statistics Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-slide-up"
          style={{ animationDelay: "100ms" }}
        >
          <Card className="card-enhanced">
            <CardContent className="p-6">
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
            <CardContent className="p-6">
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
            <CardContent className="p-6">
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
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                    <Trophy className="w-3 h-3 text-white" />
                  </div>
                  All Attempts
                </CardTitle>
              </CardHeader>
              <CardContent>{renderAttempts()}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signs" className="animate-fade-in">
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  Signs Attempts
                </CardTitle>
              </CardHeader>
              <CardContent>{renderAttempts("signs")}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="animate-fade-in">
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center">
                    <div className="w-3 h-3 bg-white rounded-sm"></div>
                  </div>
                  Rules Attempts
                </CardTitle>
              </CardHeader>
              <CardContent>{renderAttempts("rules")}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation" className="animate-fade-in">
            <Card className="card-enhanced">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                    <TrendingUp className="w-3 h-3 text-white" />
                  </div>
                  Simulation Attempts
                </CardTitle>
              </CardHeader>
              <CardContent>{renderAttempts("simulation")}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
