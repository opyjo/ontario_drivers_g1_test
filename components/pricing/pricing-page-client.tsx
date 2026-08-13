"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Check,
  CheckCircle2,
  Crown,
  Info,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useAuthStore } from "@/stores";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Plan {
  readonly id: "weekly" | "monthly" | "lifetime";
  readonly name: string;
  readonly price: string;
  readonly billing: string;
  readonly description: string;
  readonly icon: React.ReactNode;
  readonly cta: string;
  readonly featured?: boolean;
}

const plans: ReadonlyArray<Plan> = [
  {
    id: "weekly",
    name: "Weekly Pass",
    price: "$3.99",
    billing: "billed weekly",
    description: "A short-term option for the final week before your test.",
    icon: <Zap className="h-5 w-5" aria-hidden="true" />,
    cta: "Choose weekly",
  },
  {
    id: "monthly",
    name: "Monthly Pass",
    price: "$9.99",
    billing: "billed monthly",
    description: "More time to study at a steady pace and revisit weak areas.",
    icon: <Calendar className="h-5 w-5" aria-hidden="true" />,
    cta: "Choose monthly",
    featured: true,
  },
  {
    id: "lifetime",
    name: "Lifetime Pass",
    price: "$19.99",
    billing: "one-time payment",
    description: "One payment with no recurring subscription or renewal.",
    icon: <Crown className="h-5 w-5" aria-hidden="true" />,
    cta: "Choose lifetime",
  },
];

const PLAN_NAMES: Record<Plan["id"], string> = {
  weekly: "Weekly Pass",
  monthly: "Monthly Pass",
  lifetime: "Lifetime Pass",
};

const comparisonRows = [
  ["Ontario handbook study guide", true, true, true],
  ["10-question practice", "1 total", "5 per day", "Unlimited"],
  ["20- and 40-question practice", false, false, true],
  ["40-question G1 simulations", false, "2 per day", "Unlimited"],
  ["Last 3 answer reviews on this device", true, true, true],
  ["Saved history and adaptive mistake review", false, false, true],
  ["Spaced review and readiness dashboard", false, false, true],
  ["AI study assistant", false, false, true],
] as const;

function Availability({ value }: { readonly value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-300">
        <Check className="h-4 w-4" aria-hidden="true" /> Included
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center gap-1.5 text-muted-foreground">
        <X className="h-4 w-4" aria-hidden="true" /> Not included
      </span>
    );
  }
  return <span className="text-muted-foreground">{value}</span>;
}

function AccessComparison() {
  return (
    <section className="mb-12" aria-labelledby="comparison-heading">
      <div className="mb-5 max-w-3xl">
        <p className="text-sm font-semibold text-primary">What you get today</p>
        <h2 id="comparison-heading" className="text-2xl font-bold tracking-tight">
          Know what is available before paying
        </h2>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Try one short practice as a guest. A free account adds daily practice
          and simulation allowances; a paid pass removes the limits and unlocks
          progress tools, mistake review, and the AI assistant.
        </p>
      </div>

      <div className="space-y-3 md:hidden">
        {comparisonRows.map(([feature, guest, free, paid]) => (
          <article key={feature} className="rounded-xl border border-border bg-card p-4 shadow-sm">
            <h3 className="font-semibold">{feature}</h3>
            <dl className="mt-3 grid grid-cols-3 gap-3 text-sm">
              <div>
                <dt className="mb-1 text-xs text-muted-foreground">Guest</dt>
                <dd><Availability value={guest} /></dd>
              </div>
              <div>
                <dt className="mb-1 text-xs text-muted-foreground">Free account</dt>
                <dd><Availability value={free} /></dd>
              </div>
              <div>
                <dt className="mb-1 text-xs text-muted-foreground">Paid pass</dt>
                <dd><Availability value={paid} /></dd>
              </div>
            </dl>
          </article>
        ))}
      </div>

      <div className="hidden overflow-hidden rounded-2xl border border-border bg-card shadow-sm md:block">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-muted/60">
            <tr>
              <th scope="col" className="p-4 font-semibold">Feature</th>
              <th scope="col" className="p-4 font-semibold">Guest</th>
              <th scope="col" className="p-4 font-semibold">Free account</th>
              <th scope="col" className="p-4 font-semibold">Paid pass</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map(([feature, guest, free, paid]) => (
              <tr key={feature} className="border-t border-border">
                <th scope="row" className="p-4 font-medium">{feature}</th>
                <td className="p-4"><Availability value={guest} /></td>
                <td className="p-4"><Availability value={free} /></td>
                <td className="p-4"><Availability value={paid} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

interface PricingPageClientProps {
  readonly currentPlan: Plan["id"] | null;
}

export function PricingPageClient({ currentPlan }: PricingPageClientProps) {
  const [loadingPlan, setLoadingPlan] = useState<Plan["id"] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleCheckout = async (plan: Plan["id"]) => {
    setLoadingPlan(plan);
    setError(null);

    if (!user) {
      router.push("/auth?redirect=/pricing");
      setLoadingPlan(null);
      return;
    }

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
        credentials: "include",
      });
      const checkoutSession = await response.json();

      if (!response.ok || checkoutSession.error || !checkoutSession.url) {
        throw new Error(
          checkoutSession.error || "Unable to open secure checkout."
        );
      }

      window.location.assign(checkoutSession.url);
    } catch (checkoutError: unknown) {
      setError(
        checkoutError instanceof Error
          ? checkoutError.message
          : "An unexpected checkout error occurred."
      );
      setLoadingPlan(null);
    }
  };

  return (
    <PageLayout
      title="Straightforward Pricing"
      subtitle="Start free, then unlock unlimited practice and personalized study tools when you are ready."
    >
      <div className="container mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm leading-6 text-blue-950 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-100">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
            <p>
              Prices are in CAD. Recurring passes can be cancelled at any time
              and remain active through the paid billing period. Taxes, when
              applicable, are shown before payment.
            </p>
          </div>
        </div>

        {currentPlan ? (
          <div className="mx-auto mb-8 max-w-2xl rounded-xl border border-primary/30 bg-primary/5 p-4 text-center text-sm">
            <p>
              You&apos;re currently on the{" "}
              <strong>{PLAN_NAMES[currentPlan]}</strong>.{" "}
              <Link href="/settings" className="font-semibold text-primary underline underline-offset-4">
                Manage your subscription
              </Link>
              .
            </p>
          </div>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="mx-auto mb-8 max-w-2xl rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-center text-sm font-medium text-destructive"
          >
            {error}
          </div>
        ) : null}

        <AccessComparison />

        <section aria-labelledby="plans-heading">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">Unlimited study access</p>
              <h2 id="plans-heading" className="text-2xl font-bold tracking-tight">
                Choose a billing period
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              All paid passes use the same account access. Choose based on how
              long you expect to study.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {plans.map((plan) => {
              const isCurrentPlan = plan.id === currentPlan;
              // Once any plan is active, weekly/monthly switches happen in
              // the Stripe customer portal (Settings), not here. Upgrading
              // to lifetime is still a direct purchase.
              const canPurchase =
                currentPlan === null ||
                (plan.id === "lifetime" && currentPlan !== "lifetime");
              const isDisabled = !canPurchase;

              return (
                <article
                  key={plan.id}
                  className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm ${
                    isCurrentPlan
                      ? "border-primary ring-1 ring-primary"
                      : plan.featured
                        ? "border-primary ring-1 ring-primary"
                        : "border-border"
                  }`}
                >
                  {isCurrentPlan ? (
                    <Badge className="absolute right-4 top-4">
                      Current plan
                    </Badge>
                  ) : plan.featured ? (
                    <Badge className="absolute right-4 top-4">
                      <Sparkles className="mr-1 h-3.5 w-3.5" aria-hidden="true" />
                      Best value
                    </Badge>
                  ) : null}

                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {plan.icon}
                  </div>
                  <h3 className="text-lg font-bold">{plan.name}</h3>
                  <div className="mt-3 flex items-baseline gap-2">
                    <span className="text-4xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">CAD</span>
                  </div>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {plan.billing}
                  </p>
                  <p className="mt-5 flex-1 text-sm leading-6 text-muted-foreground">
                    {plan.description}
                  </p>

                  <ul className="my-6 space-y-2 border-t border-border pt-5 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      Unlimited practice and G1 simulations
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      Saved results, mistake review, dashboard, and AI help
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      Secure Stripe-hosted checkout
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                      {plan.id === "lifetime" ? "No renewal" : "Cancel anytime"}
                    </li>
                  </ul>

                  {isCurrentPlan ? (
                    <Button
                      className="min-h-11 w-full rounded-lg font-semibold"
                      variant="outline"
                      asChild
                    >
                      <Link href="/settings">Manage plan</Link>
                    </Button>
                  ) : (
                    <>
                      <Button
                        className="min-h-11 w-full rounded-lg font-semibold"
                        variant={plan.featured ? "default" : "outline"}
                        onClick={() => handleCheckout(plan.id)}
                        disabled={isDisabled || loadingPlan !== null}
                      >
                        {loadingPlan === plan.id ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Opening checkout…
                          </span>
                        ) : (
                          plan.cta
                        )}
                      </Button>
                      {isDisabled && currentPlan !== null && plan.id !== "lifetime" ? (
                        <p className="mt-2 text-center text-xs text-muted-foreground">
                          Switch plans from{" "}
                          <Link href="/settings" className="underline underline-offset-4">
                            account settings
                          </Link>
                          .
                        </p>
                      ) : null}
                    </>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        <div className="mx-auto mt-10 max-w-3xl rounded-xl border border-border bg-muted/30 p-5 text-center">
          <ShieldCheck className="mx-auto h-6 w-6 text-emerald-600" aria-hidden="true" />
          <h2 className="mt-2 font-bold">No pass-result guarantee</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This service supports preparation but cannot guarantee an official
            test outcome. Payments are processed by Stripe; recurring plans can
            be managed from account settings.
          </p>
        </div>
      </div>
    </PageLayout>
  );
}
