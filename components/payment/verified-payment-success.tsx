"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics/events";
import type { StripePlan } from "@/lib/stripe";

interface VerifiedPaymentSuccessProps {
  planName: string;
  planKey: StripePlan;
}

export function VerifiedPaymentSuccess({
  planName,
  planKey,
}: Readonly<VerifiedPaymentSuccessProps>) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);
  const hasTrackedPurchase = useRef(false);

  useEffect(() => {
    if (hasTrackedPurchase.current) return;
    hasTrackedPurchase.current = true;
    trackEvent("purchase_complete", {
      source: "stripe_checkout",
      plan: planKey,
    });
  }, [planKey]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((current) => {
        if (current <= 1) {
          window.clearInterval(timer);
          router.push("/dashboard");
          return 0;
        }
        return current - 1;
      });
    }, 1_000);

    return () => window.clearInterval(timer);
  }, [router]);

  return (
    <div className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-green-100 p-3">
              <CheckCircle2
                className="h-12 w-12 text-green-600"
                aria-hidden="true"
              />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            Payment confirmed
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            Stripe confirmed your {planName} purchase.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            Your account access is being synchronized. It should appear in your
            dashboard and account settings within a few moments.
          </p>
          <p className="text-sm text-muted-foreground" aria-live="polite">
            Redirecting to dashboard in{" "}
            <span className="font-semibold text-foreground">{countdown}</span>{" "}
            seconds…
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full" size="lg">
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/settings">View billing settings</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
