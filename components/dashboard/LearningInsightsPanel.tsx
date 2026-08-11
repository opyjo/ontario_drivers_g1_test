"use client";

import Link from "next/link";
import { BookOpenCheck, Flame, Sparkles, Target } from "lucide-react";
import type { LearningInsights } from "@/app/actions/learning";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export function LearningInsightsPanel({
  insights,
  loading,
}: Readonly<{ insights?: LearningInsights; loading: boolean }>) {
  if (loading || !insights) {
    return (
      <div className="grid gap-4 lg:grid-cols-5">
        <Skeleton className="h-72 lg:col-span-2" />
        <Skeleton className="h-72 lg:col-span-3" />
      </div>
    );
  }

  const labelTone =
    insights.readiness.label === "Consistently ready"
      ? "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
      : insights.readiness.label === "Almost ready"
        ? "bg-amber-500/10 text-amber-700 dark:text-amber-300"
        : "bg-rose-500/10 text-rose-700 dark:text-rose-300";

  return (
    <div className="grid gap-4 lg:grid-cols-5">
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Target className="h-5 w-5 text-primary" aria-hidden="true" />
            G1 readiness
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border-8 border-primary/15 bg-primary/5">
              <span className="text-3xl font-bold text-primary">
                {insights.readiness.score}
              </span>
            </div>
            <div className="space-y-2">
              <Badge className={labelTone}>{insights.readiness.label}</Badge>
              <p className="text-sm text-muted-foreground">
                A study signal based on your recent work, not a guarantee of an exam result.
              </p>
            </div>
          </div>

          <details className="rounded-lg border bg-muted/20 p-3 text-sm">
            <summary className="cursor-pointer font-medium">
              How this score is calculated
            </summary>
            <div className="mt-3 space-y-3">
              {insights.readiness.factors.map((factor) => (
                <div key={factor.label} className="space-y-1">
                  <div className="flex justify-between gap-3">
                    <span>{factor.label} ({factor.weight}%)</span>
                    <span className="font-semibold">{factor.value}%</span>
                  </div>
                  <Progress value={factor.value} className="h-1.5" />
                  <p className="text-xs text-muted-foreground">{factor.detail}</p>
                </div>
              ))}
            </div>
          </details>

          <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="h-4 w-4 text-emerald-600" aria-hidden="true" />
                  Today&apos;s review
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {insights.dailyReview.completedToday
                    ? "Completed today — you can repeat it for extra practice."
                    : "10 questions selected for your learning history."}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm font-semibold text-orange-600">
                <Flame className="h-4 w-4" aria-hidden="true" />
                {insights.dailyReview.streak} day
              </div>
            </div>
            <Button asChild size="sm" className="mt-3 w-full">
              <Link href="/quiz/daily-review">
                {insights.dailyReview.completedToday ? "Review again" : "Start daily review"}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <BookOpenCheck className="h-5 w-5 text-primary" aria-hidden="true" />
            Topic mastery
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Accuracy is adjusted for practice volume, so a single correct answer does not look mastered.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {insights.mastery.map((topic) => (
            <div key={topic.topic} className="space-y-1.5">
              <div className="flex items-center justify-between gap-4 text-sm">
                <span className="font-medium">{topic.topic}</span>
                <span className="shrink-0 text-muted-foreground">
                  {topic.attempts ? `${topic.accuracy}% · ${topic.attempts} answers` : "Not started"}
                </span>
              </div>
              <Progress value={topic.score} className="h-2" />
            </div>
          ))}

          <div className="flex flex-col gap-3 rounded-lg border border-primary/20 bg-primary/5 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-semibold">Recommended next drill</p>
              <p className="text-sm text-muted-foreground">
                Focus on {insights.recommendedTopic || "your least-practiced topic"} in today&apos;s adaptive set.
              </p>
            </div>
            <Button asChild variant="outline" size="sm">
              <Link href="/quiz/daily-review">Practice now</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

