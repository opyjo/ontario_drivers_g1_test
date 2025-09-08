export type AccessLevel = "free" | "subscribed_monthly" | "lifetime";

export type FeatureMode =
  | "basic_feature"
  | "premium_feature"
  | "advanced_feature";

export interface FeatureLimits {
  basic_feature: number;
  premium_feature: number;
  advanced_feature: number;
}

export const FREE_TIER_LIMITS: Readonly<FeatureLimits> = {
  basic_feature: 3,
  premium_feature: 1,
  advanced_feature: 0,
} as const;

export const PAID_ACCESS_LEVELS = ["lifetime", "subscribed_monthly"] as const;
