import type React from "react";
import Link from "next/link";
import { Car, Heart } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <main id="main-content" role="main" className={`flex-1 ${className ?? ""}`}>
        {(title || subtitle) && (
          <header className="container mx-auto px-4 py-10 text-center max-w-4xl">
            {title && (
              <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground mb-3">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </main>

      {/* Global Modern Footer */}
      <footer className="mt-16 border-t border-border bg-background py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
            <div className="space-y-3 md:col-span-1">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                  🚗
                </div>
                <span className="font-extrabold text-lg text-foreground tracking-tight">
                  DriveTest Pro
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                An independent Ontario G1 study system for road signs, traffic rules, and realistic knowledge-test practice.
              </p>
            </div>

            <div>
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                Practice Tests
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                <li>
                  <Link href="/ontario-road-signs-practice-test" className="hover:text-primary transition-colors">
                    Traffic Signs Practice
                  </Link>
                </li>
                <li>
                  <Link href="/g1-rules-of-the-road-practice" className="hover:text-primary transition-colors">
                    Rules of the Road Practice
                  </Link>
                </li>
                <li>
                  <Link href="/g1-test-simulation" className="hover:text-primary transition-colors">
                    Full G1 Exam Simulation
                  </Link>
                </li>
                <li>
                  <Link href="/guides" className="hover:text-primary transition-colors">
                    G1 Learning Guides
                  </Link>
                </li>
                <li>
                  <Link href="/quiz/review?questionType=all" className="hover:text-primary transition-colors">
                    Review Missed Questions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                About & Policies
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                <li><Link href="/about" className="hover:text-primary transition-colors">About</Link></li>
                <li><Link href="/sources" className="hover:text-primary transition-colors">Sources</Link></li>
                <li><Link href="/editorial-policy" className="hover:text-primary transition-colors">Editorial Policy</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                Study Resources
              </h2>
              <ul className="space-y-2 text-sm text-muted-foreground font-medium">
                <li>
                  <Link href="/study-guide" className="hover:text-primary transition-colors">
                    Ontario Handbook Study Guide
                  </Link>
                </li>
                <li>
                  <Link href="/study-plan" className="hover:text-primary transition-colors">
                    G1 Study Planner
                  </Link>
                </li>
                <li>
                  <Link href="/ask-ai" className="hover:text-primary transition-colors">
                    Ask AI Driving Tutor
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-primary transition-colors">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-primary transition-colors">
                    Subscription Plans
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xs font-bold text-foreground uppercase tracking-wider mb-3">
                Ontario Licensing
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Based on the official Ministry of Transportation Ontario (MTO) Driver's Handbook.
              </p>
              <div className="text-xs text-muted-foreground">
                Not affiliated with or endorsed by the MTO or DriveTest Canada.
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <div>
              © {new Date().getFullYear()} DriveTest Pro. All rights reserved.
            </div>
            <div className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Ontario drivers
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
