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

const comparisonRows = [
  ["Ontario handbook study guide", true, true],
  ["Road-sign and rules practice", true, true],
  ["40-question G1 simulations", true, true],
  ["Saved results and incorrect-answer review", "Account required", true],
  ["AI study assistant", "Account required", true],
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

export default function PricingPage() {
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
      subtitle="Core study tools are available free. Optional paid passes support the service and add paid access to your account."
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

        {error ? (
          <div
            role="alert"
            className="mx-auto mb-8 max-w-2xl rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-center text-sm font-medium text-destructive"
          >
            {error}
          </div>
        ) : null}

        <section aria-labelledby="plans-heading">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-primary">Optional paid passes</p>
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
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`relative flex flex-col rounded-2xl border bg-card p-6 shadow-sm ${
                  plan.featured ? "border-primary ring-1 ring-primary" : "border-border"
                }`}
              >
                {plan.featured ? (
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
                    Paid access recorded on your account
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

                <Button
                  className="min-h-11 w-full rounded-lg font-semibold"
                  variant={plan.featured ? "default" : "outline"}
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loadingPlan !== null}
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
              </article>
            ))}
          </div>
        </section>

        <section className="mt-14" aria-labelledby="comparison-heading">
          <div className="mb-5 max-w-2xl">
            <p className="text-sm font-semibold text-primary">Free vs paid</p>
            <h2 id="comparison-heading" className="text-2xl font-bold tracking-tight">
              Know what is available before paying
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-border bg-card shadow-sm">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <thead className="bg-muted/60">
                <tr>
                  <th scope="col" className="p-4 font-semibold">Feature</th>
                  <th scope="col" className="p-4 font-semibold">Free access</th>
                  <th scope="col" className="p-4 font-semibold">Paid pass</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map(([feature, free, paid]) => (
                  <tr key={feature} className="border-t border-border">
                    <th scope="row" className="p-4 font-medium">{feature}</th>
                    <td className="p-4"><Availability value={free} /></td>
                    <td className="p-4"><Availability value={paid} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
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
