import type React from "react";

interface PageLayoutProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly title?: string;
  readonly subtitle?: string;
}

export function PageLayout({
  children,
  className,
  title,
  subtitle,
}: Readonly<PageLayoutProps>) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-primary focus:text-primary-foreground focus:px-3 focus:py-2 focus:rounded"
      >
        Skip to content
      </a>
      <main id="main-content" role="main" className={className ?? ""}>
        {(title || subtitle) && (
          <header className="container mx-auto px-4 py-6 text-center">
            {title && (
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-2">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </main>
    </>
  );
}
