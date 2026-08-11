import type { ReactNode } from "react";
import { publicMetadata } from "@/lib/seo";

export const metadata = publicMetadata({
  title: "Ontario G1 Practice Test Pricing",
  description:
    "Compare weekly, monthly, and lifetime access to Ontario G1 practice questions, simulations, incorrect-answer review, and AI explanations.",
  path: "/pricing",
});

export default function PricingLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
