import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getStripePlanByPriceId, type StripePlan } from "@/lib/stripe";
import { PricingPageClient } from "@/components/pricing/pricing-page-client";

async function getCurrentPlan(): Promise<StripePlan | null> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("active_monthly_plan_price_id, purchased_lifetime_price_id")
    .eq("id", user.id)
    .single();

  if (profile?.purchased_lifetime_price_id) return "lifetime";
  if (profile?.active_monthly_plan_price_id) {
    return getStripePlanByPriceId(profile.active_monthly_plan_price_id)?.key ?? null;
  }
  return null;
}

export default async function PricingPage() {
  const currentPlan = await getCurrentPlan();
  return <PricingPageClient currentPlan={currentPlan} />;
}
