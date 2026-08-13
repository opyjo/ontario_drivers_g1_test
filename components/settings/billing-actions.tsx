"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BillingActionsProps {
  hasBillingAccount: boolean;
}

export function BillingActions({
  hasBillingAccount,
}: Readonly<BillingActionsProps>) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openBillingPortal = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/create-portal-session", {
        method: "POST",
        credentials: "include",
      });
      const result = (await response.json()) as {
        url?: string;
        error?: string;
      };

      if (!response.ok || !result.url) {
        throw new Error(result.error || "Could not open the billing portal.");
      }

      window.location.assign(result.url);
    } catch (portalError) {
      setError(
        portalError instanceof Error
          ? portalError.message
          : "Could not open the billing portal."
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {hasBillingAccount ? (
          <Button
            type="button"
            onClick={() => void openBillingPortal()}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="animate-spin" aria-hidden="true" />
            ) : (
              <ExternalLink aria-hidden="true" />
            )}
            Manage billing
          </Button>
        ) : null}
        <Button asChild variant={hasBillingAccount ? "outline" : "default"}>
          <Link href="/pricing">View plans</Link>
        </Button>
      </div>
      <div className="min-h-5 text-sm" aria-live="polite">
        {error ? <p className="text-destructive">{error}</p> : null}
      </div>
    </div>
  );
}
