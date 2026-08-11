import type React from "react";
import { Badge } from "@/components/ui/badge";

interface QuizContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Modern glassmorphic quiz container with responsive card wrapper
 */
export const QuizContainer = ({
  title,
  subtitle,
  children,
}: Readonly<QuizContainerProps>) => {
  return (
    <main
      role="main"
      className="min-h-[calc(100vh-3.75rem)] bg-muted/30 px-3 py-4 sm:px-4 sm:py-6 lg:py-8"
    >
      <div className="relative mx-auto w-full max-w-5xl space-y-5 rounded-2xl border border-border bg-background p-4 shadow-sm sm:p-6 lg:p-8">

        {/* Header Section */}
        <header className="space-y-2 border-b border-border pb-5 text-left">
          <Badge variant="outline" className="px-3 py-1 border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
            Ontario G1 Test Simulator
          </Badge>
          <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
            {title}
          </h1>
          {subtitle && (
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {subtitle}
            </p>
          )}
        </header>

        {/* Main Quiz Flow */}
        <div>{children}</div>
      </div>
    </main>
  );
};
