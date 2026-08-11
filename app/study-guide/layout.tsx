import type { ReactNode } from "react";
import { publicMetadata } from "@/lib/seo";

export const metadata = publicMetadata({
  title: "Ontario G1 Study Guide",
  description:
    "Study Ontario road signs, rules of the road, licensing, intersections, safe driving, emergencies, and weather with an MTO-based G1 guide.",
  path: "/study-guide",
});

export default function StudyGuideLayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
