"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";

export function AIAssistantButton() {
  const router = useRouter();
  const pathname = usePathname();

  // Don't show the button on the AI page itself
  if (pathname === "/ask-ai") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        onClick={() => router.push("/ask-ai")}
        size="icon"
        aria-label="Open AI Assistant"
        className="group relative h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-2xl transition-transform duration-300 hover:scale-110 border-2 border-blue-500/20 hover:border-blue-400/40"
      >
        <div className="relative">
          <Bot className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
        </div>
        <span className="sr-only">AI Assistant</span>
      </Button>
    </div>
  );
}
