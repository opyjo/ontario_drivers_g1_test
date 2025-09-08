"use server";

import { checkFeatureAccess } from "@/lib/authorization/helpers";
import { FeatureMode } from "@/lib/authorization/constants";

export async function checkUserAccess(featureMode: FeatureMode) {
  return await checkFeatureAccess(featureMode);
}
