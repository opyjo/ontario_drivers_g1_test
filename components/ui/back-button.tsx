"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BackButtonProps {
  /** Text to display. Defaults to "Back Home" */
  text?: string;
  /** URL to navigate to. Defaults to "/" */
  href?: string;
  /** Optional click handler instead of href navigation */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
  /** Size variant */
  size?: "sm" | "default" | "lg";
  /** Style variant */
  variant?: "default" | "ghost" | "outline";
}

/**
 * Unified BackButton component for consistent navigation across the app
 *
 * @example
 * // Basic usage - goes to home
 * <BackButton />
 *
 * // Custom text and destination
 * <BackButton text="Back to Dashboard" href="/dashboard" />
 *
 * // With onClick handler instead of Link
 * <BackButton onClick={() => router.push("/")} variant="default" />
 *
 * // Custom styling
 * <BackButton className="text-primary" size="default" />
 */
export function BackButton({
  text = "Back Home",
  href = "/",
  onClick,
  className,
  size = "sm",
  variant = "ghost",
}: Readonly<BackButtonProps>) {
  const buttonContent = (
    <>
      <ArrowLeft className="w-3 h-3 mr-1.5" />
      {text}
    </>
  );

  const buttonClassName = cn(
    "text-xs transition-colors cursor-pointer focus-ring-modern",
    // Apply appropriate text color based on variant
    variant === "ghost" ? "text-muted-foreground hover:text-foreground" : "", // Let the Button component handle text color for non-ghost variants
    "-ml-2", // Negative margin for better visual alignment
    className
  );

  // If onClick is provided, use it instead of Link
  if (onClick) {
    return (
      <Button
        variant={variant}
        size={size}
        onClick={onClick}
        className={buttonClassName}
      >
        {buttonContent}
      </Button>
    );
  }

  // Default behavior with Link
  return (
    <Link href={href} passHref>
      <Button variant={variant} size={size} className={buttonClassName}>
        {buttonContent}
      </Button>
    </Link>
  );
}
