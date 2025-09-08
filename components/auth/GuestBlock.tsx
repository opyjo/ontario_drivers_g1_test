"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";

export const GuestBlock = () => {
  const pathname = usePathname();

  // Don't show auth buttons on auth pages
  if (pathname?.startsWith("/auth") || pathname?.startsWith("/signup")) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2">
      <Button variant="ghost" size="sm" asChild>
        <Link
          href="/auth"
          className="flex items-center space-x-2"
          tabIndex={0}
          aria-label="Sign in"
        >
          <LogIn className="h-4 w-4" />
          <span className="hidden sm:inline">Sign In</span>
        </Link>
      </Button>
      <Button size="sm" asChild>
        <Link
          href="/signup"
          className="flex items-center space-x-2"
          tabIndex={0}
          aria-label="Sign up"
        >
          <UserPlus className="h-4 w-4" />
          <span className="hidden sm:inline">Sign Up</span>
        </Link>
      </Button>
    </div>
  );
};
