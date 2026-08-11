"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export const GuestBlock = () => {
  const pathname = usePathname();

  // Don't show auth buttons on auth pages
  if (pathname?.startsWith("/auth") || pathname?.startsWith("/signup")) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        asChild
        className="text-[13px] font-medium text-muted-foreground hover:text-foreground px-3 rounded-lg"
      >
        <Link href="/auth" tabIndex={0} aria-label="Sign in">
          Sign In
        </Link>
      </Button>
      <Button
        size="sm"
        asChild
        className="text-[13px] font-semibold px-4 rounded-lg bg-gradient-to-r from-primary to-indigo-500 hover:from-primary/90 hover:to-indigo-500/90 shadow-md shadow-primary/25 hover:shadow-primary/40 transition-all duration-200"
      >
        <Link href="/signup" tabIndex={0} aria-label="Get started">
          Get Started
        </Link>
      </Button>
    </div>
  );
};
