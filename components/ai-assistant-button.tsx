"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

export function AIAssistantButton() {
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);
  const isStudyGuideRoute = pathSegments[0] === "study-guide";

  // Keep focused workflows clear and avoid covering sticky quiz controls.
  if (
    pathname === "/ask-ai" ||
    pathname.startsWith("/quiz") ||
    pathname.startsWith("/pricing") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/payment")
  ) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-[calc(1rem+env(safe-area-inset-bottom))] right-3 z-40 sm:right-4 ${
        isStudyGuideRoute ? "hidden sm:block" : ""
      }`}
    >
      <Button
        onClick={() => router.push("/ask-ai")}
        size="lg"
        aria-label="Open AI study assistant"
        className="min-h-11 rounded-full px-4 shadow-lg transition-colors sm:px-5"
      >
        <Bot className="h-5 w-5" aria-hidden="true" />
        <span className="hidden font-semibold sm:inline">Ask AI</span>
      </Button>
    </div>
  );
}
