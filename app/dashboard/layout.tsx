import type { ReactNode } from "react";
import { privateMetadata } from "@/lib/seo";
import { PrivateRoute } from "@/components/seo/private-route";

export const metadata = privateMetadata;

export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <PrivateRoute>{children}</PrivateRoute>;
}
