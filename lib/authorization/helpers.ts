import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PAID_ACCESS_LEVELS, FREE_TIER_LIMITS, FeatureMode } from "./constants";
import { AccessCheckResult, UserProfile } from "./types";

export function isPaidUser(profile: UserProfile | null): boolean {
  return !!(
    profile?.access_level &&
    PAID_ACCESS_LEVELS.includes(profile.access_level as any)
  );
}

export async function checkFeatureAccess(
  featureMode: FeatureMode
): Promise<AccessCheckResult> {
  const supabase = createSupabaseServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      canAccess: false,
      message: "You must be logged in to access this feature.",
      isLoggedIn: false,
    };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("access_level")
    .eq("id", user.id)
    .single();

  if (isPaidUser(profile)) {
    return { canAccess: true };
  }

  // Check usage limits for free users
  const limit = FREE_TIER_LIMITS[featureMode];

  const { data: usageData } = await supabase
    .from("user_freemium_feature_counts")
    .select("count")
    .eq("user_id", user.id)
    .eq("feature", featureMode)
    .single();

  const currentUsage = usageData?.count ?? 0;

  if (currentUsage < limit) {
    return { canAccess: true };
  }

  return {
    canAccess: false,
    message: `You've reached your limit of ${limit} ${featureMode} uses. Upgrade for unlimited access!`,
    isLoggedIn: true,
  };
}
