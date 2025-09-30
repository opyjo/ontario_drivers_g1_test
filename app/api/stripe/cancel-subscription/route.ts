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
      .select("active_stripe_subscription_id")
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

    const subscriptionId = profile.active_stripe_subscription_id;

    await stripe.subscriptions.update(subscriptionId, {
      cancel_at_period_end: true,
    });

    const updated = await stripe.subscriptions.retrieve(subscriptionId);
    const cancelsAtISO = updated.current_period_end
      ? new Date(updated.current_period_end * 1000).toISOString()
      : null;

    return NextResponse.json({
      message: "Cancellation scheduled",
      subscriptionId: updated.id,
      cancelsAt: cancelsAtISO,
    });
  } catch (error: unknown) {
    console.error("Cancel subscription error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to cancel subscription";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
