import type { ReactNode } from "react";
import { publicMetadata } from "@/lib/seo";

export const metadata = publicMetadata({
  title: "Ontario G1 AI Driving Tutor",
  description:
    "Ask Ontario G1 driving questions and get clear explanations grounded in Ministry of Transportation handbook material.",
  path: "/ask-ai",
});

export default function AskAILayout({ children }: Readonly<{ children: ReactNode }>) {
  return children;
}
