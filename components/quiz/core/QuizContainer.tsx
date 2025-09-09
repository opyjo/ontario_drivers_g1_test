// Quiz Container Component
// Main responsive layout wrapper with accessibility features

import React from "react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

export interface QuizContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  padding?: "sm" | "md" | "lg";
  showScrollArea?: boolean;
  ariaLabel?: string;
  role?: string;
}

const QuizContainer: React.FC<QuizContainerProps> = ({
  children,
  className = "",
  maxWidth = "2xl",
  padding = "md",
  showScrollArea = true,
  ariaLabel = "Quiz interface",
  role = "main",
}) => {
  const getMaxWidthClass = () => {
    switch (maxWidth) {
      case "sm":
        return "max-w-sm";
      case "md":
        return "max-w-md";
      case "lg":
        return "max-w-lg";
      case "xl":
        return "max-w-xl";
      case "2xl":
        return "max-w-2xl";
      case "full":
        return "max-w-full";
      default:
        return "max-w-2xl";
    }
  };

  const getPaddingClass = () => {
    switch (padding) {
      case "sm":
        return "p-4";
      case "md":
        return "p-6";
      case "lg":
        return "p-8";
      default:
        return "p-6";
    }
  };

  const containerClasses = cn(
    // Base layout
    "w-full mx-auto",
    getMaxWidthClass(),

    // Responsive spacing
    "px-4 sm:px-6 lg:px-8",

    // Minimum height for consistent layout
    "min-h-[calc(100vh-200px)]",

    className
  );

  const contentClasses = cn(
    // Flexible layout
    "flex flex-col space-y-6",
    getPaddingClass(),

    // Focus management
    "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary/50",
    "rounded-lg"
  );

  // Main content area
  const MainContent = ({ children }: { children: React.ReactNode }) => {
    if (showScrollArea) {
      return (
        <ScrollArea className="h-full">
          <div className={contentClasses}>{children}</div>
        </ScrollArea>
      );
    }

    return <div className={contentClasses}>{children}</div>;
  };

  return (
    <div className={containerClasses} role={role} aria-label={ariaLabel}>
      {/* Skip to content link for accessibility */}
      <a
        href="#quiz-main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50"
      >
        Skip to quiz content
      </a>

      {/* Main quiz content area */}
      <div id="quiz-main-content" className="w-full" tabIndex={-1}>
        <Card className="w-full shadow-lg border-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <MainContent>{children}</MainContent>
        </Card>
      </div>

      {/* Screen reader announcements */}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        id="quiz-announcements"
      />

      <div
        aria-live="assertive"
        aria-atomic="true"
        className="sr-only"
        id="quiz-urgent-announcements"
      />
    </div>
  );
};

// Layout variations for different quiz contexts
export const CompactQuizContainer: React.FC<
  Omit<QuizContainerProps, "maxWidth" | "padding">
> = (props) => <QuizContainer {...props} maxWidth="lg" padding="sm" />;

export const WideQuizContainer: React.FC<
  Omit<QuizContainerProps, "maxWidth">
> = (props) => <QuizContainer {...props} maxWidth="full" />;

export const MobileQuizContainer: React.FC<
  Omit<QuizContainerProps, "maxWidth" | "showScrollArea">
> = (props) => (
  <QuizContainer {...props} maxWidth="sm" showScrollArea={false} />
);

export default QuizContainer;
