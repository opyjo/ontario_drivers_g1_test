import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { checkFeatureAccess } from "@/lib/authorization/helpers";

export default async function SavedResultLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  const access = await checkFeatureAccess("premium_feature");
  if (!access.canAccess) {
    redirect(access.isLoggedIn ? "/pricing?feature=saved-results" : "/auth");
  }
  return children;
}
