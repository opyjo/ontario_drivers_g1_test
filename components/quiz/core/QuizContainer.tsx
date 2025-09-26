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
    <main role="main" className="vh-minus-nav bg-background flex flex-col">
      {/* Centered Content Container */}
      <div className="flex-1 max-w-2xl mx-auto px-4 py-4 sm:py-6 flex flex-col min-h-0">
        {/* Header Section */}
        <header className="text-center mb-6 sm:mb-8 flex-shrink-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-foreground mb-2 text-balance">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground leading-relaxed max-w-lg mx-auto text-pretty">
              {subtitle}
            </p>
          )}
        </header>

        {/* Content */}
        <div className="flex-1 space-y-4 sm:space-y-6 overflow-y-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
