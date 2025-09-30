import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
  typescript: true,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const updateUserAccess = async (
  supabaseAdmin: ReturnType<typeof createAdminClient>,
  userId: string,
  updates: Record<string, unknown>
) => {
  const { error } = await supabaseAdmin
    .from("profiles")
    .update(updates)
    .eq("id", userId);

  if (error) {
    console.error("Failed to update user access:", error);
    throw error;
  }
};

const getSubscriptionPeriodEnd = (sub: Stripe.Subscription): string | null => {
  const ts = sub.current_period_end;
  if (typeof ts === "number") {
    return new Date(ts * 1000).toISOString();
  }
  return null;
};

export async function POST(req: Request) {
  if (!webhookSecret) {
    console.error("Missing STRIPE_WEBHOOK_SECRET");
    return NextResponse.json(
      { error: "Missing STRIPE_WEBHOOK_SECRET" },
      { status: 500 }
    );
  }

  const rawBody = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json(
      { error: "Missing stripe-signature" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Webhook signature verification failed:", errorMessage);
    return NextResponse.json(
      { error: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  const supabaseAdmin = createAdminClient();

  try {
    switch (event.type) {
      case "customer.created": {
        const customer = event.data.object;
        const supabaseUUID = customer.metadata?.supabaseUUID;
        if (supabaseUUID) {
          await updateUserAccess(supabaseAdmin, supabaseUUID, {
            stripe_customer_id: customer.id,
          });
        }
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object;
        const supabaseUUID = session.metadata?.supabaseUUID;
        const priceId = session.metadata?.priceId;

        if (!supabaseUUID) break;

        if (session.mode === "payment" && session.payment_status === "paid") {
          await updateUserAccess(supabaseAdmin, supabaseUUID, {
            access_level: "lifetime",
            purchased_lifetime_price_id: priceId,
            active_stripe_subscription_id: null,
            subscription_current_period_end: null,
            active_monthly_plan_price_id: null,
            stripe_subscription_status: "paid",
            cancel_at_period_end: false,
          });
        } else if (session.mode === "subscription" && session.subscription) {
          const subscriptionId =
            typeof session.subscription === "string"
              ? session.subscription
              : session.subscription.id;

          const subscription = await stripe.subscriptions.retrieve(
            subscriptionId,
            { expand: ["items.data.price"] }
          );

          const periodEnd = getSubscriptionPeriodEnd(subscription);

          await updateUserAccess(supabaseAdmin, supabaseUUID, {
            access_level: "subscribed_monthly",
            active_stripe_subscription_id: subscription.id,
            subscription_current_period_end: periodEnd,
            active_monthly_plan_price_id: subscription.items.data[0].price.id,
            purchased_lifetime_price_id: null,
            stripe_subscription_status: subscription.status,
            cancel_at_period_end: subscription.cancel_at_period_end || false,
          });
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object;
        const subId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : invoice.subscription?.id;

        if (!subId) break;

        const subscription = await stripe.subscriptions.retrieve(subId, {
          expand: ["items.data.price"],
        });

        const customerId =
          typeof subscription.customer === "string"
            ? subscription.customer
            : subscription.customer.id;

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile?.id) {
          const periodEnd = getSubscriptionPeriodEnd(subscription);
          await updateUserAccess(supabaseAdmin, profile.id, {
            subscription_current_period_end: periodEnd,
            access_level: "subscribed_monthly",
            active_monthly_plan_price_id: subscription.items.data[0].price.id,
            stripe_subscription_status: subscription.status,
            cancel_at_period_end: subscription.cancel_at_period_end || false,
          });
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const sub = event.data.object;
        const customerId =
          typeof sub.customer === "string" ? sub.customer : sub.customer.id;

        const { data: profile } = await supabaseAdmin
          .from("profiles")
          .select("id")
          .eq("stripe_customer_id", customerId)
          .single();

        if (profile?.id) {
          if (sub.status === "active") {
            const periodEnd = getSubscriptionPeriodEnd(sub);
            await updateUserAccess(supabaseAdmin, profile.id, {
              access_level: "subscribed_monthly",
              active_stripe_subscription_id: sub.id,
              subscription_current_period_end: periodEnd,
              active_monthly_plan_price_id: sub.items.data[0].price.id,
              stripe_subscription_status: sub.status,
              cancel_at_period_end: sub.cancel_at_period_end || false,
            });
          } else {
            const periodEnd = getSubscriptionPeriodEnd(sub);
            let accessLevel = "free";
            let activePriceId: string | null = null;
            let activeSubId: string | null = sub.id;

            if (
              (sub.status === "past_due" || sub.status === "unpaid") &&
              sub.cancel_at_period_end &&
              periodEnd &&
              new Date(periodEnd).getTime() > Date.now()
            ) {
              accessLevel = "subscribed_monthly";
              activePriceId = sub.items.data[0]?.price.id || null;
            } else if (
              sub.status === "canceled" ||
              sub.status === "incomplete" ||
              sub.status === "incomplete_expired"
            ) {
              activeSubId = null;
            }

            await updateUserAccess(supabaseAdmin, profile.id, {
              access_level: accessLevel,
              active_stripe_subscription_id: activeSubId,
              active_monthly_plan_price_id: activePriceId,
              subscription_current_period_end:
                accessLevel !== "free" && periodEnd ? periodEnd : null,
              stripe_subscription_status: sub.status,
              cancel_at_period_end:
                sub.cancel_at_period_end || sub.status === "canceled",
            });
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Webhook handler error:", errorMessage);
    return NextResponse.json(
      { error: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
