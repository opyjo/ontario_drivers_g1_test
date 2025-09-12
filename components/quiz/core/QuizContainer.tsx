import type React from "react";

interface QuizContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Clean page container with a compact header section and flexible body.
 * Balanced and modern UI/UX without a heavy "hero".
 */
export function QuizContainer({
  title,
  subtitle,
  children,
}: QuizContainerProps) {
  return (
    <main role="main" className="w-full min-h-screen bg-background">
      {/* Compact Header Section */}
      <section className="w-full bg-muted/30 border-b border-border/40">
        <div className="max-w-6xl mx-auto px-6 py-6 text-center space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {children}
      </section>
    </main>
  );
}
