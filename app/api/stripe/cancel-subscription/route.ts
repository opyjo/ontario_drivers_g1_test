import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripeClient } from "@/lib/stripe";

export const runtime = "nodejs";

export async function POST() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Sign in to continue" }, { status: 401 });
  }

  try {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("active_stripe_subscription_id, stripe_customer_id")
      .eq("id", user.id)
      .single();

    if (profileError || !profile?.active_stripe_subscription_id) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 404 }
      );
    }

    const stripe = getStripeClient();
    const subscription = await stripe.subscriptions.retrieve(
      profile.active_stripe_subscription_id
    );
    const customerId =
      typeof subscription.customer === "string"
        ? subscription.customer
        : subscription.customer.id;

    if (!profile.stripe_customer_id || customerId !== profile.stripe_customer_id) {
      throw new Error("Subscription ownership check failed");
    }

    const updated = await stripe.subscriptions.update(subscription.id, {
      cancel_at_period_end: true,
    });
    const periodEnd = (updated as { current_period_end?: number })
      .current_period_end;
    const cancelsAt = periodEnd
      ? new Date(periodEnd * 1_000).toISOString()
      : null;

    const admin = createAdminClient();
    const { error: updateError } = await admin
      .from("profiles")
      .update({
        cancel_at_period_end: true,
        subscription_current_period_end: cancelsAt,
      })
      .eq("id", user.id);

    if (updateError) {
      throw new Error("Could not synchronize the billing profile");
    }

    return NextResponse.json({
      message: "Cancellation scheduled",
      cancelsAt,
    });
  } catch (error) {
    console.error(
      "Cancel subscription failed",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Unable to schedule cancellation." },
      { status: 503 }
    );
  }
}
