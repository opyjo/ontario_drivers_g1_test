"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export function QuizResultsUpsell({
  score,
  totalQuestions,
  isAuthenticated,
  returnPath,
}: Readonly<{
  score: number;
  totalQuestions: number;
  isAuthenticated: boolean;
  returnPath: string;
}>) {
  return (
    <Card className="mx-auto w-full max-w-md text-center">
      <CardHeader>
        <CardTitle>Quiz complete</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-3xl font-bold">
          {score} / {totalQuestions}
        </p>
        <p className="text-sm leading-6 text-muted-foreground">
          {isAuthenticated
            ? "Upgrade to save results, review every mistake, and unlock unlimited practice."
            : "Your guest result is not saved. Create a free account to continue with daily practice."}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col justify-center gap-2 sm:flex-row">
        <Button asChild>
          <Link href={isAuthenticated ? "/pricing" : `/signup?redirect=${encodeURIComponent(returnPath)}`}>
            {isAuthenticated ? "Unlock full access" : "Create free account"}
          </Link>
        </Button>
        {!isAuthenticated && (
          <Button asChild variant="outline">
            <Link href={`/auth?redirect=${encodeURIComponent(returnPath)}`}>Sign in</Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
