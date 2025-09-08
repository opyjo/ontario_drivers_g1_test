"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const NavButton = ({ href, children, className }: NavButtonProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Button
      variant={isActive ? "secondary" : "ghost"}
      size="sm"
      asChild
      className={cn("", className)}
    >
      <Link
        href={href}
        className={cn(
          "flex items-center space-x-2",
          isActive && "bg-secondary"
        )}
        tabIndex={0}
      >
        {children}
      </Link>
    </Button>
  );
};
