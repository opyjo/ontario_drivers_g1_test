import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, ArrowRight, CheckCircle2, Sparkles, ShieldCheck } from "lucide-react";

type IconType = React.ComponentType<{
  className?: string;
  "aria-hidden"?: boolean;
}>;

interface StatItem {
  readonly number: string;
  readonly label: string;
  readonly icon: IconType;
}

interface HeroProps {
  readonly stats: ReadonlyArray<StatItem>;
}

export function Hero({ stats }: Readonly<HeroProps>) {
  return (
    <section
      className="relative overflow-hidden bg-mesh-gradient py-16 lg:py-24 border-b border-border/40"
      aria-labelledby="hero-heading"
    >
      {/* Decorative ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[300px] h-[300px] bg-sky-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Copy & Actions */}
          <div className="lg:col-span-7 text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Updated for 2026 Ontario G1 preparation</span>
            </div>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.15]"
            >
              Prepare for Your Ontario G1 Test{" "}
              <span className="gradient-text">With Confidence.</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-normal max-w-2xl">
              Study Ontario road signs and rules with handbook-based practice questions, realistic simulations, and clear explanations.
            </p>

            {/* Smart Learning Callout */}
            <div className="flex items-center gap-3 rounded-xl border border-primary/20 bg-card p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 border border-amber-500/20">
                  <Target className="w-5 h-5" />
                </div>
                <div className="text-sm leading-6">
                  <span className="font-semibold text-foreground">Start free, upgrade when ready. </span>
                  <span className="text-muted-foreground">Free accounts get five short practices and two simulations daily; paid passes add unlimited sessions and personalized review.</span>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                size="lg"
                className="btn-gradient px-8 py-6 text-base font-semibold rounded-xl"
                asChild
              >
                <Link href="/quiz/signs?limit=10" className="flex items-center justify-center gap-2">
                  <Target className="w-4 h-4" aria-hidden="true" />
                  Start Free Practice <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="px-6 py-6 text-base font-medium rounded-xl border-border bg-card"
                asChild
              >
                <Link href="/study-guide" className="flex items-center justify-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" aria-hidden="true" />
                  View Study Guide
                </Link>
              </Button>
            </div>

          </div>

          {/* Right Column: Live Interactive Card Mockup */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-primary/20 bg-card p-6 shadow-md">
              <div className="flex items-center justify-between border-b border-border/50 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    G1 Practice Example
                  </span>
                </div>
                <Badge variant="outline" className="text-xs border-primary/30 text-primary">
                  Question 1 of 40
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="text-sm font-semibold text-foreground leading-snug">
                  What does a flashing red traffic light mean at an intersection?
                </div>

                <div className="space-y-2 text-xs">
                  <div className="p-3 rounded-xl border border-border/60 bg-background/60 flex items-center justify-between text-muted-foreground">
                    <span>A. Slow down and proceed with caution</span>
                  </div>
                  <div className="p-3 rounded-xl border-2 border-emerald-500 bg-emerald-500/10 text-emerald-900 dark:text-emerald-200 font-semibold flex items-center justify-between">
                    <span>B. Come to a complete stop, yield, then proceed safely</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="p-3 rounded-xl border border-border/60 bg-background/60 flex items-center justify-between text-muted-foreground">
                    <span>C. Right of way over all traffic</span>
                  </div>
                  <div className="p-3 rounded-xl border border-border/60 bg-background/60 flex items-center justify-between text-muted-foreground">
                    <span>D. Stop only if other vehicles are coming</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-xs text-muted-foreground flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>Paid passes add saved results and AI study support</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="mt-16 pt-10 border-t border-border/40 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-card p-5 text-center shadow-sm"
              >
                <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <IconComponent className="w-5 h-5" aria-hidden={true} />
                </div>
                <div className="text-2xl lg:text-3xl font-extrabold text-foreground tracking-tight">
                  {stat.number}
                </div>
                <div className="text-xs font-medium text-muted-foreground mt-1">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
