import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase-admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAppUrl, getStripeClient, getStripePlan } from "@/lib/stripe";

export const runtime = "nodejs";

const checkoutSchema = z
  .object({ plan: z.enum(["weekly", "monthly", "lifetime"]) })
  .strict();

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = checkoutSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return NextResponse.json({ error: "Sign in to continue" }, { status: 401 });
  }

  try {
    const stripe = getStripeClient();
    const plan = getStripePlan(parsed.data.plan);
    const price = await stripe.prices.retrieve(plan.priceId);
    const expectedType = plan.mode === "subscription" ? "recurring" : "one_time";

    if (!price.active || price.type !== expectedType) {
      throw new Error("The selected Stripe price is inactive or misconfigured");
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select(
        "stripe_customer_id, active_stripe_subscription_id, purchased_lifetime_price_id"
      )
      .eq("id", user.id)
      .single();

    if (profileError) {
      throw new Error("User billing profile is unavailable");
    }

    if (profile.purchased_lifetime_price_id) {
      return NextResponse.json(
        { error: "You already have lifetime access." },
        { status: 409 }
      );
    }
    // Weekly/monthly subscribers switch plans through the Stripe customer
    // portal (see /api/stripe/create-portal-session) rather than starting a
    // second checkout. Lifetime is exempt: it's a one-time purchase that
    // supersedes an existing subscription, which the webhook cancels once
    // this is paid.
    if (profile.active_stripe_subscription_id && plan.key !== "lifetime") {
      return NextResponse.json(
        {
          error:
            "You already have an active subscription. Manage or switch your plan from account settings.",
        },
        { status: 409 }
      );
    }

    let stripeCustomerId = profile.stripe_customer_id;
    if (!stripeCustomerId) {
      const customer = await stripe.customers.create(
        {
          email: user.email,
          metadata: { supabaseUUID: user.id },
        },
        { idempotencyKey: `create-customer-${user.id}` }
      );
      stripeCustomerId = customer.id;

      const admin = createAdminClient();
      const { error: updateError } = await admin
        .from("profiles")
        .update({ stripe_customer_id: stripeCustomerId })
        .eq("id", user.id);

      if (updateError) {
        throw new Error("Could not save the billing customer");
      }
    }

    const appUrl = getAppUrl();
    const session = await stripe.checkout.sessions.create({
      customer: stripeCustomerId,
      line_items: [{ price: plan.priceId, quantity: 1 }],
      mode: plan.mode,
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment/cancelled`,
      client_reference_id: user.id,
      metadata: {
        supabaseUUID: user.id,
        plan: plan.key,
        priceId: plan.priceId,
      },
      subscription_data:
        plan.mode === "subscription"
          ? { metadata: { supabaseUUID: user.id, plan: plan.key } }
          : undefined,
    });

    if (!session.url) {
      throw new Error("Stripe did not return a Checkout URL");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error(
      "Checkout session failed",
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Checkout is temporarily unavailable." },
      { status: 503 }
    );
  }
}
