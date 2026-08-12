"use client";

import Link from "next/link";
import { LockKeyhole } from "lucide-react";
import type { QuizAccessDecision } from "@/lib/quiz/access";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function QuizAccessGate({
  access,
  returnPath,
}: Readonly<{ access: QuizAccessDecision; returnPath: string }>) {
  const dailyLimit = access.reason === "daily_limit";
  const upgradeRequired = access.reason === "upgrade_required";
  const serviceUnavailable = access.reason === "service_unavailable";

  const title = serviceUnavailable
    ? "Access check unavailable"
    : dailyLimit
      ? "Daily free limit reached"
      : upgradeRequired
        ? "Unlock this practice session"
        : "Sign in to keep practising";

  const description = serviceUnavailable
    ? "We could not verify your quiz access. Please try again shortly."
    : dailyLimit
      ? `Your free allowance resets at ${
          access.resetAt
            ? new Date(access.resetAt).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
            : "midnight"
        }. Upgrade for unlimited practice now.`
      : upgradeRequired
        ? "Twenty- and 40-question practice sessions are included with a paid pass. Free accounts can take 10-question sessions."
        : "Your guest practice is complete. Create a free account for five practices and two full simulations each day.";

  return (
    <Card className="mx-auto w-full max-w-lg text-center">
      <CardHeader className="items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          <LockKeyhole className="h-6 w-6" aria-hidden="true" />
        </span>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        <div className="flex flex-col justify-center gap-2 sm:flex-row">
          {!access.isAuthenticated ? (
            <>
              <Button asChild>
                <Link href={`/signup?redirect=${encodeURIComponent(returnPath)}`}>
                  Create free account
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/auth?redirect=${encodeURIComponent(returnPath)}`}>
                  Sign in
                </Link>
              </Button>
            </>
          ) : serviceUnavailable ? (
            <Button asChild variant="outline">
              <Link href={returnPath}>Try again</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/pricing">View paid passes</Link>
            </Button>
          )}
          {!serviceUnavailable && (
            <Button asChild variant="ghost">
              <Link href="/">Return home</Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
