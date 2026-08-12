import Link from "next/link";
import { AlertTriangle, LogIn } from "lucide-react";
import { z } from "zod";
import { VerifiedPaymentSuccess } from "@/components/payment/verified-payment-success";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripeClient, getStripePlanByPriceId } from "@/lib/stripe";

const checkoutSessionIdSchema = z
  .string()
  .regex(/^cs_(?:test|live)_[A-Za-z0-9]+$/)
  .max(255);

interface PaymentSuccessPageProps {
  searchParams: Promise<{ session_id?: string | string[] }>;
}

type VerifiedPlan = { key: "weekly" | "monthly" | "lifetime"; name: string };

function PaymentVerificationIssue({
  requiresSignIn = false,
}: Readonly<{ requiresSignIn?: boolean }>) {
  return (
    <main id="main-content" className="container mx-auto flex min-h-[80vh] items-center justify-center px-4 py-12">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <div className="rounded-full bg-amber-100 p-3 text-amber-700">
              {requiresSignIn ? (
                <LogIn className="h-12 w-12" aria-hidden="true" />
              ) : (
                <AlertTriangle className="h-12 w-12" aria-hidden="true" />
              )}
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">
            {requiresSignIn ? "Sign in to confirm payment" : "Payment not verified"}
          </CardTitle>
          <CardDescription className="mt-2 text-base">
            {requiresSignIn
              ? "Use the same DriveTest Pro account that started checkout."
              : "We could not confirm a completed Stripe payment for this account."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="rounded-lg bg-muted/50 p-4 text-sm text-muted-foreground">
            If you completed checkout, sign in and check your account settings.
            Stripe webhooks will continue syncing valid purchases automatically.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button asChild className="w-full" size="lg">
            <Link href={requiresSignIn ? "/auth?redirect=/settings" : "/settings"}>
              {requiresSignIn ? "Sign in" : "Open account settings"}
            </Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/pricing">Return to pricing</Link>
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

async function verifyCheckoutSession(
  sessionId: string,
  userId: string,
  stripeCustomerId: string
): Promise<VerifiedPlan | null> {
  try {
    const session = await getStripeClient().checkout.sessions.retrieve(
      sessionId,
      { expand: ["line_items.data.price"] }
    );
    const customerId =
      typeof session.customer === "string"
        ? session.customer
        : session.customer?.id;
    const priceId = session.line_items?.data[0]?.price?.id;
    const plan = priceId ? getStripePlanByPriceId(priceId) : undefined;
    const isPaid =
      session.payment_status === "paid" ||
      session.payment_status === "no_payment_required";
    const belongsToUser =
      session.client_reference_id === userId &&
      session.metadata?.supabaseUUID === userId &&
      customerId === stripeCustomerId;
    const matchesPlan =
      Boolean(plan) &&
      session.mode === plan?.mode &&
      session.metadata?.plan === plan?.key &&
      session.metadata?.priceId === plan?.priceId;

    if (
      session.status !== "complete" ||
      !isPaid ||
      !belongsToUser ||
      !matchesPlan ||
      !plan
    ) {
      return null;
    }

    return {
      key: plan.key,
      name:
        plan.key === "weekly"
          ? "Weekly Pass"
          : plan.key === "monthly"
            ? "Monthly Pass"
            : "Lifetime Pass",
    };
  } catch (error) {
    console.warn(
      "Payment confirmation rejected",
      error instanceof Error ? error.message : "Unknown verification error"
    );
    return null;
  }
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const rawSessionId = (await searchParams).session_id;
  const parsedSessionId = checkoutSessionIdSchema.safeParse(
    Array.isArray(rawSessionId) ? rawSessionId[0] : rawSessionId
  );

  if (!parsedSessionId.success) {
    return <PaymentVerificationIssue />;
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return <PaymentVerificationIssue requiresSignIn />;
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", user.id)
    .single();
  if (profileError || !profile?.stripe_customer_id) {
    return <PaymentVerificationIssue />;
  }

  const verifiedPlan = await verifyCheckoutSession(
    parsedSessionId.data,
    user.id,
    profile.stripe_customer_id
  );
  if (!verifiedPlan) return <PaymentVerificationIssue />;

  return (
    <VerifiedPaymentSuccess
      planName={verifiedPlan.name}
      planKey={verifiedPlan.key}
    />
  );
}
