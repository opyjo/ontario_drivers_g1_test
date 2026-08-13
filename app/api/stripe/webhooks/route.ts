import Stripe from "stripe";
import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import {
  getStripeClient,
  getStripePlanByPriceId,
  type StripePlanConfig,
} from "@/lib/stripe";
import type { Database } from "@/types/supabase";

export const runtime = "nodejs";

type AdminClient = ReturnType<typeof createAdminClient>;
type ProfileUpdate = Database["public"]["Tables"]["profiles"]["Update"];

function getPeriodEnd(subscription: Stripe.Subscription) {
  const timestamp = (subscription as { current_period_end?: number })
    .current_period_end;
  return timestamp ? new Date(timestamp * 1_000).toISOString() : null;
}

function getCustomerId(customer: string | Stripe.Customer | Stripe.DeletedCustomer) {
  return typeof customer === "string" ? customer : customer.id;
}

function getSubscriptionPlan(subscription: Stripe.Subscription) {
  const priceId = subscription.items.data[0]?.price.id;
  if (!priceId) {
    throw new Error("Subscription has no price");
  }

  const plan = getStripePlanByPriceId(priceId);
  if (!plan || plan.mode !== "subscription") {
    throw new Error("Subscription price is not allowlisted");
  }

  return plan;
}

async function updateProfile(
  admin: AdminClient,
  userId: string,
  updates: ProfileUpdate
) {
  const { error } = await admin.from("profiles").update(updates).eq("id", userId);
  if (error) throw new Error("Failed to update the billing profile");
}

async function getUserIdForCustomer(admin: AdminClient, customerId: string) {
  const { data, error } = await admin
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();

  if (error) throw new Error("Failed to find the billing profile");
  return data?.id ?? null;
}

async function syncSubscription(
  admin: AdminClient,
  userId: string,
  subscription: Stripe.Subscription,
  plan: StripePlanConfig
) {
  const hasAccess = ["active", "trialing"].includes(subscription.status);
  const { data: existingProfile, error: profileError } = await admin
    .from("profiles")
    .select("purchased_lifetime_price_id")
    .eq("id", userId)
    .single();
  if (profileError) throw new Error("Failed to load the billing profile");

  const hasLifetimeAccess = Boolean(
    existingProfile.purchased_lifetime_price_id
  );
  await updateProfile(admin, userId, {
    access_level: hasLifetimeAccess
      ? "lifetime"
      : hasAccess
        ? "subscribed_monthly"
        : "free",
    active_stripe_subscription_id: hasAccess ? subscription.id : null,
    subscription_current_period_end: hasAccess
      ? getPeriodEnd(subscription)
      : null,
    active_monthly_plan_price_id: hasAccess ? plan.priceId : null,
    purchased_lifetime_price_id:
      existingProfile.purchased_lifetime_price_id,
    stripe_subscription_status: subscription.status,
    cancel_at_period_end: subscription.cancel_at_period_end,
  });
}

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is not configured");
    return NextResponse.json(
      { error: "Webhook is not configured" },
      { status: 503 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  const stripe = getStripeClient();
  try {
    event = stripe.webhooks.constructEvent(
      await request.text(),
      signature,
      webhookSecret
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const admin = createAdminClient();

  try {
    switch (event.type) {
      case "customer.created": {
        const customer = event.data.object;
        const userId = customer.metadata?.supabaseUUID;
        if (userId) {
          await updateProfile(admin, userId, {
            stripe_customer_id: customer.id,
          });
        }
        break;
      }

      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.supabaseUUID;
        if (!userId || session.client_reference_id !== userId) {
          throw new Error("Checkout user metadata is invalid");
        }

        const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
          limit: 5,
        });
        const priceId = lineItems.data[0]?.price?.id;
        const plan = priceId ? getStripePlanByPriceId(priceId) : undefined;
        if (
          !plan ||
          session.metadata?.priceId !== plan.priceId ||
          session.metadata?.plan !== plan.key ||
          session.mode !== plan.mode
        ) {
          throw new Error("Checkout price is not allowlisted");
        }

        if (plan.mode === "payment") {
          if (session.payment_status !== "paid" || plan.key !== "lifetime") {
            throw new Error("Lifetime Checkout is not paid");
          }

          const { data: existingProfile, error: existingProfileError } =
            await admin
              .from("profiles")
              .select("active_stripe_subscription_id")
              .eq("id", userId)
              .single();
          if (existingProfileError) {
            throw new Error("Failed to load the billing profile");
          }

          // Set lifetime access first so a concurrently delivered
          // subscription.deleted event (triggered by the cancellation below)
          // sees purchased_lifetime_price_id already set and keeps
          // access_level as "lifetime" instead of reverting to "free".
          await updateProfile(admin, userId, {
            access_level: "lifetime",
            purchased_lifetime_price_id: plan.priceId,
            active_stripe_subscription_id: null,
            subscription_current_period_end: null,
            active_monthly_plan_price_id: null,
            stripe_subscription_status: "paid",
            cancel_at_period_end: false,
          });

          if (existingProfile.active_stripe_subscription_id) {
            // Lifetime access supersedes any recurring plan; stop future billing.
            await stripe.subscriptions
              .cancel(existingProfile.active_stripe_subscription_id)
              .catch((cancelError) => {
                console.error(
                  "Failed to cancel superseded subscription",
                  cancelError instanceof Error
                    ? cancelError.message
                    : cancelError
                );
              });
          }
          break;
        }

        if (!session.subscription) {
          throw new Error("Checkout is missing its subscription");
        }
        const subscriptionId =
          typeof session.subscription === "string"
            ? session.subscription
            : session.subscription.id;
        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ["items.data.price"],
        });
        await syncSubscription(admin, userId, subscription, plan);
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice & {
          subscription?: string | Stripe.Subscription | null;
        };
        const subscriptionId =
          typeof invoice.subscription === "string"
            ? invoice.subscription
            : invoice.subscription?.id;
        if (!subscriptionId) break;

        const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ["items.data.price"],
        });
        const userId = await getUserIdForCustomer(
          admin,
          getCustomerId(subscription.customer)
        );
        if (userId) {
          await syncSubscription(
            admin,
            userId,
            subscription,
            getSubscriptionPlan(subscription)
          );
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const userId = await getUserIdForCustomer(
          admin,
          getCustomerId(subscription.customer)
        );
        if (userId) {
          await syncSubscription(
            admin,
            userId,
            subscription,
            getSubscriptionPlan(subscription)
          );
        }
        break;
      }
    }
  } catch (error) {
    console.error(
      `Stripe webhook ${event.id} failed`,
      error instanceof Error ? error.message : "Unknown error"
    );
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ received: true });
}
