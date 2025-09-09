// Quiz Layout - Consistent layout for all quiz pages
// Provides navigation, breadcrumbs, and quiz-optimized structure

import { Metadata } from "next";
import { Suspense } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  BookOpen,
  Car,
  SignpostBig,
  RotateCcw,
  Home,
} from "lucide-react";
import Link from "next/link";

interface QuizLayoutProps {
  children: React.ReactNode;
}

// Quiz-specific metadata
export const metadata: Metadata = {
  title: "G1 Driving Test Quiz | Ontario Practice Tests",
  description:
    "Practice for your Ontario G1 driving test with official-format quizzes. Signs practice, rules practice, and full G1 test simulation.",
  keywords: [
    "G1 test",
    "Ontario driving test",
    "practice quiz",
    "road signs",
    "driving rules",
  ],
  openGraph: {
    title: "G1 Driving Test Quiz - Practice Tests",
    description:
      "Master your Ontario G1 driving test with comprehensive practice quizzes",
    type: "website",
  },
};

export default function QuizLayout({ children }: QuizLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Quiz Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>

          {/* Main Navigation */}
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link
              href="/quiz"
              className="transition-colors hover:text-foreground/80 text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/quiz/practice"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Practice
            </Link>
            <Link
              href="/quiz/simulation"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              G1 Simulation
            </Link>
            <Link
              href="/quiz/review"
              className="transition-colors hover:text-foreground/80 text-foreground/60"
            >
              Review
            </Link>
          </nav>

          {/* Right side - Quick Actions */}
          <div className="ml-auto flex items-center space-x-2">
            <Link href="/study-guide">
              <Button variant="ghost" size="sm">
                <BookOpen className="h-4 w-4 mr-2" />
                Study Guide
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 py-6">
        {/* Content */}
        <div className="w-full">
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading quiz...</p>
                </div>
              </div>
            }
          >
            {children}
          </Suspense>
        </div>
      </main>

      {/* Quiz Footer */}
      <footer className="mt-auto border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:h-16 md:flex-row md:py-0">
          <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              Ontario G1 Driving Test Practice - Official Format Questions
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <Link
              href="/faq"
              className="hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
            <Separator orientation="vertical" className="h-4" />
            <span>© 2024</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
