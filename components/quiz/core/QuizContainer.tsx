import type React from "react";

interface QuizContainerProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * Modern quiz container with efficient full-page layout and sleek design
 */
export const QuizContainer = ({
  title,
  subtitle,
  children,
}: Readonly<QuizContainerProps>) => {
  return (
    <main
      role="main"
      className="vh-minus-nav bg-gradient-to-br from-background via-background to-muted/30 flex items-start md:items-center justify-center overflow-y-auto"
    >
      {/* Centered Content Container */}
      <div className="w-full max-w-[800px] px-4 py-4 md:py-6 flex flex-col h-full">
        {/* Compact Header Section */}
        <header className="text-center mb-4 md:mb-6 flex-shrink-0">
          <h1 className="text-lg sm:text-xl font-bold text-foreground mb-1 text-balance tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-sm text-muted-foreground leading-snug max-w-lg mx-auto text-pretty">
              {subtitle}
            </p>
          )}
        </header>

        {/* Content - Optimized for single page view */}
        <div className="flex flex-col space-y-4 md:space-y-6 flex-1 min-h-0 overflow-y-auto pb-4">
          {children}
        </div>
      </div>
    </main>
  );
};
