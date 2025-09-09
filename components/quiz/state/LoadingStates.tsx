// Loading States Component
// Skeleton loaders and loading indicators for async operations

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2, FileText, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LoadingStatesProps {
  variant?:
    | "question"
    | "options"
    | "progress"
    | "navigation"
    | "full"
    | "minimal";
  message?: string;
  className?: string;
  showIcon?: boolean;
}

const LoadingStates: React.FC<LoadingStatesProps> = ({
  variant = "full",
  message = "Loading quiz...",
  className = "",
  showIcon = true,
}) => {
  // Question skeleton loader
  const QuestionSkeleton = () => (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Image skeleton */}
        <div className="flex justify-center">
          <Skeleton className="aspect-square w-full max-w-md rounded-lg" />
        </div>

        {/* Question text skeleton */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  );

  // Answer options skeleton loader
  const OptionsaSkeleton = () => (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-3">
          {["A", "B", "C", "D"].map((option) => (
            <div
              key={option}
              className="w-full p-4 border-2 border-border rounded-md"
            >
              <div className="flex items-start gap-3">
                <Skeleton className="h-4 w-4 rounded-full mt-0.5" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Progress skeleton loader
  const ProgressSkeleton = () => (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-6 w-16 rounded-full" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-3 w-8" />
          </div>
          <Skeleton className="h-2 w-full rounded-full" />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2 border-t">
          <div className="text-center space-y-1">
            <Skeleton className="h-6 w-8 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
          <div className="text-center space-y-1">
            <Skeleton className="h-6 w-8 mx-auto" />
            <Skeleton className="h-3 w-12 mx-auto" />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Navigation skeleton loader
  const NavigationSkeleton = () => (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="flex items-center justify-between gap-4">
          <Skeleton className="h-10 w-24" />
          <div className="flex-1 flex justify-center">
            <div className="text-center space-y-1">
              <Skeleton className="h-4 w-24 mx-auto" />
              <Skeleton className="h-3 w-32 mx-auto" />
            </div>
          </div>
          <Skeleton className="h-10 w-20" />
        </div>
      </CardContent>
    </Card>
  );

  // Minimal spinner loader
  const MinimalLoader = () => (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3 text-muted-foreground">
        {showIcon && <Loader2 className="h-5 w-5 animate-spin" />}
        <span className="text-sm">{message}</span>
      </div>
    </div>
  );

  // Full page loader with context
  const FullPageLoader = () => (
    <div className={cn("space-y-6", className)}>
      {/* Header with loading message */}
      <div className="text-center space-y-3 py-8">
        {showIcon && (
          <div className="flex justify-center">
            <div className="relative">
              <HelpCircle className="h-12 w-12 text-muted-foreground/50" />
              <Loader2 className="h-6 w-6 animate-spin absolute top-3 left-3 text-primary" />
            </div>
          </div>
        )}
        <div className="space-y-1">
          <h3 className="text-lg font-semibold">Preparing Your Quiz</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
      </div>

      {/* Skeleton components */}
      <ProgressSkeleton />
      <QuestionSkeleton />
      <OptionsaSkeleton />
      <NavigationSkeleton />
    </div>
  );

  // Component renderer based on variant
  switch (variant) {
    case "question":
      return <QuestionSkeleton />;
    case "options":
      return <OptionsaSkeleton />;
    case "progress":
      return <ProgressSkeleton />;
    case "navigation":
      return <NavigationSkeleton />;
    case "minimal":
      return <MinimalLoader />;
    case "full":
    default:
      return <FullPageLoader />;
  }
};

// Specialized loading components for specific contexts
export const QuizLoadingScreen: React.FC<{
  mode?: "practice" | "simulation" | "review";
  className?: string;
}> = ({ mode = "practice", className }) => {
  const messages = {
    practice: "Loading practice questions...",
    simulation: "Preparing G1 test simulation...",
    review: "Loading your missed questions...",
  };

  return (
    <LoadingStates
      variant="full"
      message={messages[mode]}
      className={className}
    />
  );
};

export const QuestionLoadingState: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={cn("space-y-6", className)}>
    <LoadingStates variant="question" />
    <LoadingStates variant="options" />
    <LoadingStates variant="navigation" />
  </div>
);

export const InlineLoadingSpinner: React.FC<{
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}> = ({ message = "Loading...", size = "md", className }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div
      className={cn("flex items-center gap-2 text-muted-foreground", className)}
    >
      <Loader2 className={cn("animate-spin", sizeClasses[size])} />
      <span className="text-sm">{message}</span>
    </div>
  );
};

export default LoadingStates;
