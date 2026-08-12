import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, Sparkles, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

export function Features() {
  return (
    <section className="py-20 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-3 py-1 border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
            Comprehensive Learning Ecosystem
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            A Clear Path to <span className="gradient-text">Test-Day Readiness</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Move from handbook review to focused practice and a full test simulation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Step 1: Study Guide */}
          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm flex flex-col justify-between relative group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6" />
                </div>
                <Badge className="bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20 text-xs font-bold">
                  Step 1
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Interactive Study Guide
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Review handbook-based material covering road signs, traffic laws, right-of-way rules, and safe-driving fundamentals.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <Button
                asChild
                className="w-full btn-gradient py-5 font-semibold rounded-xl text-sm"
              >
                <Link href="/study-guide" className="flex items-center justify-center gap-2">
                  Start Reading Guide <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Step 2: Targeted Practice */}
          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm flex flex-col justify-between relative group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-700 dark:text-sky-300 flex items-center justify-center border border-sky-500/20 group-hover:scale-110 transition-transform">
                  <Target className="w-6 h-6" />
                </div>
                <Badge className="bg-sky-500/10 text-sky-700 dark:text-sky-300 border-sky-500/20 text-xs font-bold">
                  Step 2
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors">
                  Topic-Based Practice
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Work through road-sign and traffic-rules questions, revisit answers, and review explanations after grading.
                </p>
              </div>
            </div>

            <div className="pt-8 space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full border-sky-500/30 text-sky-700 dark:text-sky-300 hover:bg-sky-500/10 py-5 font-semibold rounded-xl text-sm"
              >
                <Link href="/ontario-road-signs-practice-test" className="flex items-center justify-center gap-2">
                  Practice Signs <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full border-indigo-500/30 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-500/10 py-5 font-semibold rounded-xl text-sm"
              >
                <Link href="/g1-rules-of-the-road-practice" className="flex items-center justify-center gap-2">
                  Practice Rules <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Step 3: G1 Simulation & AI */}
          <div className="rounded-2xl border border-border bg-card p-7 shadow-sm flex flex-col justify-between relative group">
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 flex items-center justify-center border border-emerald-500/20 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <Badge className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-500/20 text-xs font-bold">
                  Step 3
                </Badge>
              </div>

              <div>
                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                  Realistic G1 Simulation
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Take 40-question practice simulations with 20 road-sign and 20 rules questions.
                </p>
              </div>
            </div>

            <div className="pt-8">
              <Button
                asChild
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white py-5 font-semibold rounded-xl text-sm shadow-md shadow-emerald-700/20"
              >
                <Link href="/g1-test-simulation" className="flex items-center justify-center gap-2">
                  Start Full Simulation <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
