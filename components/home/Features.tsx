import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Target, TrendingUp, Plus, ArrowRight } from "lucide-react";

export function Features() {
  return (
    <section className="py-16 lg:py-20 bg-background relative">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold mb-4 text-foreground">
              Your Path to Success
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Master driving theory with our comprehensive three-step approach
              designed to build your confidence
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Study Guide Card */}
            <Card className="group relative bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-primary/10 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors duration-300">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <Badge
                        variant="secondary"
                        className="mb-1.5 text-xs font-medium"
                      >
                        Step 1
                      </Badge>
                      <h3 className="text-lg lg:text-xl font-semibold text-foreground">
                        Study Guide
                      </h3>
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Complete curriculum covering traffic laws, road signs, safe
                  driving practices, and vehicle operation fundamentals.
                </p>

                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group/btn"
                >
                  <Link
                    href="/study-guide"
                    className="flex items-center justify-center gap-2"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
              </div>
            </Card>

            {/* Practice Questions Card */}
            <Card className="group relative bg-card border border-border hover:border-accent/50 transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-accent/10 rounded-xl border border-accent/20 group-hover:bg-accent/20 transition-colors duration-300">
                      <Target className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <Badge
                        variant="secondary"
                        className="mb-1.5 text-xs font-medium"
                      >
                        Step 2
                      </Badge>
                      <h3 className="text-lg lg:text-xl font-semibold text-foreground">
                        Practice Questions
                      </h3>
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:rotate-45 transition-all duration-300" />
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Build confidence with unlimited practice questions in a
                  pressure-free environment designed for optimal learning.
                </p>

                <div className="space-y-3">
                  <Button
                    asChild
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group/btn"
                  >
                    <Link
                      href="/quiz/signs?limit=20"
                      className="flex items-center justify-center gap-2"
                    >
                      Practice Signs
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-accent text-accent hover:bg-accent hover:text-accent-foreground group/btn bg-transparent"
                  >
                    <Link
                      href="/quiz/rules?limit=20"
                      className="flex items-center justify-center gap-2"
                    >
                      Practice Rules
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Card>

            {/* Test Simulations Card */}
            <Card className="group relative bg-card border border-border hover:border-chart-3/50 transition-all duration-500 overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-chart-3/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-chart-3/10 rounded-xl border border-chart-3/20 group-hover:bg-chart-3/20 transition-colors duration-300">
                      <TrendingUp className="h-5 w-5 text-chart-3" />
                    </div>
                    <div>
                      <Badge
                        variant="secondary"
                        className="mb-1.5 text-xs font-medium"
                      >
                        Step 3
                      </Badge>
                      <h3 className="text-lg lg:text-xl font-semibold text-foreground">
                        Test Simulations
                      </h3>
                    </div>
                  </div>
                  <Plus className="h-4 w-4 text-muted-foreground group-hover:text-chart-3 group-hover:rotate-45 transition-all duration-300" />
                </div>

                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Experience realistic driving test conditions with timed
                  challenges and comprehensive performance analytics.
                </p>

                <Button
                  asChild
                  className="w-full bg-chart-3 hover:bg-chart-3/90 text-primary-foreground group/btn"
                >
                  <Link
                    href="/quiz/simulation"
                    className="flex items-center justify-center gap-2"
                  >
                    Start Simulation
                    <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
