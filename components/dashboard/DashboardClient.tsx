"use client";

import { useRouter } from "next/navigation";
import { listMyQuizAttempts } from "@/app/actions/quiz-attempts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

interface DashboardClientProps {
  readonly userId: string;
}

export default function DashboardClient({ userId }: DashboardClientProps) {
  const router = useRouter();
  const { data: attempts = [], isLoading } = useQuery({
    queryKey: ["my-attempts"],
    queryFn: () => listMyQuizAttempts({ limit: 20 }),
  });

  const renderAttempts = (filter?: "signs" | "rules" | "simulation") => {
    const list = filter
      ? attempts.filter((a: any) => a.quiz_type === filter)
      : attempts;
    if (isLoading) return <div>Loading attempts…</div>;
    if (list.length === 0)
      return (
        <div className="text-sm text-muted-foreground">
          No attempts{filter ? ` for ${filter}` : ""}. Take a quiz to see
          results here.
        </div>
      );
    return (
      <div className="space-y-3">
        {list.map((a: any) => (
          <div
            key={a.id}
            className="flex items-center justify-between rounded-md border p-3"
          >
            <div className="space-y-1">
              <div className="text-sm font-medium capitalize">
                {a.quiz_type || "quiz"}
              </div>
              <div className="text-xs text-muted-foreground">
                {new Date(a.created_at).toLocaleString()}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm">
                {a.score ?? 0}/{a.total_questions_in_attempt ?? 0}
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={() => router.push(`/quiz/results/${a.id}`)}
              >
                View
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold">Your Dashboard</h1>
          <Button onClick={() => router.push("/")}>Back Home</Button>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="signs">Signs</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">All Attempts</CardTitle>
              </CardHeader>
              <CardContent>{renderAttempts()}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="signs">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Signs Attempts</CardTitle>
              </CardHeader>
              <CardContent>{renderAttempts("signs")}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rules Attempts</CardTitle>
              </CardHeader>
              <CardContent>{renderAttempts("rules")}</CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulation">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Simulation Attempts</CardTitle>
              </CardHeader>
              <CardContent>{renderAttempts("simulation")}</CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
