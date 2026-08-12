import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { publicMetadata } from "@/lib/seo";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isPaidUser } from "@/lib/authorization/helpers";

export const metadata = publicMetadata({
  title: "Ontario G1 AI Driving Tutor",
  description:
    "Ask Ontario G1 driving questions and get clear explanations grounded in Ministry of Transportation handbook material.",
  path: "/ask-ai",
});

export default async function AskAILayout({ children }: Readonly<{ children: ReactNode }>) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("access_level")
      .eq("id", user.id)
      .single();
    if (!isPaidUser(profile)) redirect("/pricing?feature=ai-assistant");
  }
  return children;
}
