"use client";

import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot, Sparkles } from "lucide-react";

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
        size="lg"
        className="group relative rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-2xl transition-all duration-300 hover:scale-110 px-6 py-3 border-2 border-blue-500/20 hover:border-blue-400/40"
      >
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Bot className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span className="font-semibold text-base">AI Assistant</span>
          <Sparkles className="h-4 w-4 text-yellow-300 animate-pulse" />
        </div>

        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block">
          <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
            Ask about Ontario driving rules
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        </div>
      </Button>
    </div>
  );
}
