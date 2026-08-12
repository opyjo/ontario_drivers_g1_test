import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { BillingActions } from "@/components/settings/billing-actions";

export default async function SettingsPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/auth?redirect=/settings");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select(
      "access_level, active_stripe_subscription_id, stripe_subscription_status, subscription_current_period_end, cancel_at_period_end"
    )
    .eq("id", user.id)
    .single();

  if (profileError) {
    throw new Error("Could not load billing settings");
  }

  return (
    <main className="mx-auto min-h-[calc(100vh-60px)] max-w-3xl space-y-6 px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Account settings</CardTitle>
          <CardDescription>Security and billing information.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="font-medium">Password</p>
            <p className="text-sm text-muted-foreground">
              Send a secure recovery link before choosing a new password.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/auth/reset-password">Reset password</Link>
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>Your current DriveTest Pro access.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p>
            Plan: <strong>{profile?.access_level || "free"}</strong>
          </p>
          {profile?.stripe_subscription_status && (
            <p>
              Subscription status: {profile.stripe_subscription_status}
            </p>
          )}
          {profile?.subscription_current_period_end && (
            <p>
              {profile.cancel_at_period_end ? "Access ends" : "Renews"}: {" "}
              {new Date(
                profile.subscription_current_period_end
              ).toLocaleDateString("en-CA")}
            </p>
          )}
          <BillingActions
            hasSubscription={Boolean(profile.active_stripe_subscription_id)}
            cancelAtPeriodEnd={Boolean(profile.cancel_at_period_end)}
          />
        </CardContent>
      </Card>
    </main>
  );
}
