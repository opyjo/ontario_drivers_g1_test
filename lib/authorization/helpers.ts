import { createSupabaseServerClient } from "@/lib/supabase/server";
import { PAID_ACCESS_LEVELS, FeatureMode } from "./constants";
import { AccessCheckResult, UserProfile } from "./types";

export function isPaidUser(profile: UserProfile | null): boolean {
  return Boolean(
    profile?.access_level &&
      PAID_ACCESS_LEVELS.some((level) => level === profile.access_level)
  );
}

export async function checkFeatureAccess(
  featureMode: FeatureMode
): Promise<AccessCheckResult> {
  const supabase = await createSupabaseServerClient();

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

  if (featureMode === "basic_feature") {
    return { canAccess: true };
  }

  return {
    canAccess: false,
    message: "Upgrade to access this premium feature.",
    isLoggedIn: true,
  };
}
