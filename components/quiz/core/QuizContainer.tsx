import type React from "react";

interface QuizContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Modern, centered quiz container with clean typography and minimal design
 */
export function QuizContainer({
  title,
  subtitle,
  children,
}: Readonly<QuizContainerProps>) {
  return (
    <main role="main" className="min-h-screen bg-background">
      {/* Centered Content Container */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-2xl font-semibold text-foreground mb-3 text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto text-pretty">
              {subtitle}
            </p>
          )}
        </header>

        {/* Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </main>
  );
}
