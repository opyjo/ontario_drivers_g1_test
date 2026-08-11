import "server-only";
import Stripe from "stripe";

export type StripePlan = "weekly" | "monthly" | "lifetime";

export interface StripePlanConfig {
  key: StripePlan;
  priceId: string;
  mode: "subscription" | "payment";
}

let stripeClient: Stripe | undefined;

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  stripeClient ??= new Stripe(secretKey, { typescript: true });
  return stripeClient;
}

export function getStripePlan(plan: StripePlan): StripePlanConfig {
  const envNames: Record<StripePlan, string> = {
    weekly: "STRIPE_WEEKLY_PRICE_ID",
    monthly: "STRIPE_MONTHLY_PRICE_ID",
    lifetime: "STRIPE_LIFETIME_PRICE_ID",
  };
  const priceId = process.env[envNames[plan]];

  if (!priceId) {
    throw new Error(`${envNames[plan]} is not configured`);
  }

  return {
    key: plan,
    priceId,
    mode: plan === "lifetime" ? "payment" : "subscription",
  };
}

export function getStripePlanByPriceId(priceId: string) {
  const plans: StripePlan[] = ["weekly", "monthly", "lifetime"];
  return plans.map(getStripePlan).find((plan) => plan.priceId === priceId);
}

export function getAppUrl() {
  const configured = process.env.APP_URL;
  if (!configured && process.env.NODE_ENV === "production") {
    throw new Error("APP_URL is not configured");
  }

  const appUrl = new URL(configured || "http://localhost:3000");
  if (
    process.env.NODE_ENV === "production" &&
    appUrl.protocol !== "https:"
  ) {
    throw new Error("APP_URL must use HTTPS in production");
  }

  return appUrl.origin;
}
