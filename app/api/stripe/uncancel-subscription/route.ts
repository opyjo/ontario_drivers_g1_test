import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

export async function POST() {
  try {
    const supabase = createSupabaseServerClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("active_stripe_subscription_id, cancel_at_period_end")
      .eq("id", user.id)
      .single();

    if (profileError) {
      return NextResponse.json(
        { error: "Error fetching user profile" },
        { status: 500 }
      );
    }

    if (!profile?.active_stripe_subscription_id) {
      return NextResponse.json(
        { error: "No active subscription found" },
        { status: 400 }
      );
    }

    if (profile.cancel_at_period_end === false) {
      return NextResponse.json(
        { message: "Subscription already set to renew" },
        { status: 200 }
      );
    }

    const updated = await stripe.subscriptions.update(
      profile.active_stripe_subscription_id,
      { cancel_at_period_end: false }
    );

    return NextResponse.json({
      message: "Subscription set to renew",
      subscriptionId: updated.id,
      cancelAtPeriodEnd: updated.cancel_at_period_end,
    });
  } catch (error: unknown) {
    console.error("Uncancel subscription error:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "Failed to uncancel subscription";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
