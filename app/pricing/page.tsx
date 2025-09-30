"use client";

import type React from "react";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Zap, Crown, Calendar, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

interface Plan {
  id: string;
  name: string;
  price: string;
  priceSubtext?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive";
  icon: React.ReactNode;
  uniqueFeatures: string[];
  cta: string;
  featured?: boolean;
}

const plans: Plan[] = [
  {
    id: process.env.NEXT_PUBLIC_STRIPE_WEEKLY_PRICE_ID!,
    name: "Weekly",
    price: "$3.99",
    priceSubtext: "per week",
    badge: "POPULAR",
    badgeVariant: "destructive",
    icon: <Zap className="h-5 w-5" />,
    uniqueFeatures: ["Cancel anytime", "Last-minute prep", "Most affordable"],
    cta: "Start Weekly",
    featured: true,
  },
  {
    id: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID!,
    name: "Monthly",
    price: "$9.99",
    priceSubtext: "per month",
    badge: "BEST VALUE",
    badgeVariant: "default",
    icon: <Calendar className="h-5 w-5" />,
    uniqueFeatures: [
      "Save 38% vs weekly",
      "Extended study time",
      "Cancel anytime",
    ],
    cta: "Start Monthly",
    featured: true,
  },
  {
    id: process.env.NEXT_PUBLIC_STRIPE_LIFETIME_PRICE_ID!,
    name: "Lifetime",
    price: "$19.99",
    priceSubtext: "one-time",
    icon: <Crown className="h-5 w-5" />,
    uniqueFeatures: [
      "No recurring fees",
      "Lifetime updates",
      "Best long-term value",
    ],
    cta: "Get Lifetime",
  },
];

const commonFeatures = [
  "500+ practice questions",
  "All quiz modes",
  "Progress tracking",
  "Road signs & rules",
  "Regular updates",
];

export default function PricingPage() {
  const [loadingPriceId, setLoadingPriceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  const handleCheckout = async (priceId: string) => {
    setLoadingPriceId(priceId);
    setError(null);

    if (!user) {
      router.push("/auth?redirect=/pricing");
      setLoadingPriceId(null);
      return;
    }

    try {
      const response = await fetch("/api/stripe/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId }),
        credentials: "include",
      });

      const checkoutSession = await response.json();

      if (!response.ok || checkoutSession.error) {
        throw new Error(
          checkoutSession.error || "Failed to create checkout session."
        );
      }

      const stripe = await stripePromise;
      if (stripe && checkoutSession.sessionId) {
        const { error: stripeError } = await stripe.redirectToCheckout({
          sessionId: checkoutSession.sessionId,
        });
        if (stripeError) {
          setError(stripeError.message || "Failed to redirect to Stripe.");
        }
      } else {
        setError("Stripe.js failed to load or session ID missing.");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
    }
    setLoadingPriceId(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 mb-4 border border-primary/20">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-medium text-primary">
              Limited Time Offer
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-balance">
            Plans and Pricing
          </h1>
          <p className="text-base md:text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
            Get started immediately with full access. Upgrade for unlimited
            practice questions and ace your Ontario G1 test.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-12">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative flex flex-col transition-all duration-300 hover:shadow-2xl ${
                plan.featured
                  ? "border-2 border-primary shadow-xl md:scale-105 z-10"
                  : "border border-border hover:border-primary/50"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                  <Badge
                    variant={plan.badgeVariant}
                    className="text-xs px-2.5 py-0.5 font-semibold shadow-lg"
                  >
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <CardHeader className="pb-4 pt-6 text-center space-y-3">
                <div
                  className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${
                    plan.featured
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {plan.icon}
                </div>
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="space-y-0.5">
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-extrabold tracking-tight">
                      {plan.price}
                    </span>
                  </div>
                  {plan.priceSubtext && (
                    <p className="text-xs text-muted-foreground font-medium">
                      {plan.priceSubtext}
                    </p>
                  )}
                </div>
              </CardHeader>

              <CardContent className="flex-grow px-5 pb-4 space-y-4">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Plan Features
                  </p>
                  <ul className="space-y-2">
                    {plan.uniqueFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-3 border-t border-border">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                    Everything Included
                  </p>
                  <ul className="space-y-1.5">
                    {commonFeatures.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-muted-foreground shrink-0 mt-0.5" />
                        <span className="text-xs text-muted-foreground leading-relaxed">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="px-5 pb-5 pt-0">
                <Button
                  aria-label={`Select ${plan.name} plan`}
                  className="w-full h-10 text-sm font-semibold"
                  size="default"
                  variant={plan.featured ? "default" : "outline"}
                  onClick={() => handleCheckout(plan.id)}
                  disabled={loadingPriceId === plan.id}
                >
                  {loadingPriceId === plan.id ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      Processing...
                    </span>
                  ) : (
                    plan.cta
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-auto max-w-2xl mb-6">
            <div className="rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-center">
              <p className="text-sm text-destructive font-medium">{error}</p>
            </div>
          </div>
        )}

        {/* Trust Indicators */}
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl bg-card border border-border p-6 text-center">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
              Trusted by thousands of Ontario drivers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Cancel anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Secure payment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                <span>Instant access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
