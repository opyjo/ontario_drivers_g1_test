"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, RefreshCw, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BillingActionsProps {
  hasSubscription: boolean;
  cancelAtPeriodEnd: boolean;
}

export function BillingActions({
  hasSubscription,
  cancelAtPeriodEnd,
}: Readonly<BillingActionsProps>) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateSubscription = async (action: "cancel" | "resume") => {
    if (
      action === "cancel" &&
      !window.confirm(
        "Schedule this subscription to end after the current paid period?"
      )
    ) {
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const endpoint =
        action === "cancel"
          ? "/api/stripe/cancel-subscription"
          : "/api/stripe/uncancel-subscription";
      const response = await fetch(endpoint, {
        method: "POST",
        credentials: "include",
      });
      const result = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(result.error || "Could not update the subscription.");
      }

      setMessage(result.message || "Subscription updated.");
      router.refresh();
    } catch (subscriptionError) {
      setError(
        subscriptionError instanceof Error
          ? subscriptionError.message
          : "Could not update the subscription."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {hasSubscription ? (
          cancelAtPeriodEnd ? (
            <Button
              type="button"
              onClick={() => void updateSubscription("resume")}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <RefreshCw aria-hidden="true" />
              )}
              Resume renewal
            </Button>
          ) : (
            <Button
              type="button"
              variant="destructive"
              onClick={() => void updateSubscription("cancel")}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" aria-hidden="true" />
              ) : (
                <XCircle aria-hidden="true" />
              )}
              Cancel at period end
            </Button>
          )
        ) : null}
        <Button asChild variant={hasSubscription ? "outline" : "default"}>
          <Link href="/pricing">View plans</Link>
        </Button>
      </div>
      <div className="min-h-5 text-sm" aria-live="polite">
        {message ? <p className="text-emerald-700">{message}</p> : null}
        {error ? <p className="text-destructive">{error}</p> : null}
      </div>
    </div>
  );
}
