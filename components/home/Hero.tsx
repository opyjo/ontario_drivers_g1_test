import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Car, Target } from "lucide-react";

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
      className="bg-gradient-to-br from-cyan-50 via-white to-orange-50 py-12 lg:py-20"
      aria-labelledby="hero-heading"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Badge
            variant="secondary"
            className="mb-4 bg-primary/10 text-primary border-primary/20"
          >
            <Car className="w-4 h-4 mr-2" />
            Driving Test Preparation
          </Badge>
          <h1
            id="hero-heading"
            className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight"
          >
            Master Your Driving Test with{" "}
            <span className="text-primary">Confidence</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Prepare for your G1, G2, or full license exam with our comprehensive
            practice system: <strong>Study road rules</strong>,{" "}
            <strong>practice unlimited questions</strong>, and{" "}
            <strong>take realistic test simulations</strong>. Everything you
            need to pass your driving test.
          </p>

          <div className="mb-8">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-50 via-orange-100 to-orange-50 border border-orange-200 rounded-full px-6 py-3 text-base text-orange-700">
              <Target className="w-5 h-5" />
              <span className="font-medium">
                <strong>Smart Learning:</strong> Focus on questions you got
                wrong until you master them!
              </span>
              <Button
                asChild
                size="sm"
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-1 text-sm ml-2"
              >
                <Link href="/quiz/review?questionType=all">Try Now</Link>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-6 mb-12">
            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-base font-semibold rounded-lg shadow-lg"
                asChild
              >
                <Link href="/study-guide">Start Studying Now</Link>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <span className="text-muted-foreground font-medium text-sm">
                Ready to test? →
              </span>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="outline"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground px-6 py-2 font-semibold rounded-lg shadow-md bg-transparent"
                  asChild
                >
                  <Link href="/quiz/signs/setup">Signs Practice</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 font-semibold rounded-lg shadow-md bg-transparent"
                  asChild
                >
                  <Link href="/quiz/rules/setup">Rules Practice</Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-2 font-semibold rounded-lg shadow-md bg-transparent"
                  asChild
                >
                  <Link href="/quiz/simulation">G1 Simulation</Link>
                </Button>
              </div>
            </div>

            <section
              className="grid grid-cols-2 lg:grid-cols-4 gap-6"
              aria-labelledby="stats-heading"
            >
              <h2 id="stats-heading" className="sr-only">
                DriveTest Pro Statistics
              </h2>
              {stats.map((stat) => {
                const IconComponent = stat.icon;
                return (
                  <div key={stat.label} className="text-center">
                    <div className="flex justify-center mb-2">
                      <IconComponent
                        className="w-8 h-8 text-primary"
                        aria-hidden={true}
                      />
                    </div>
                    <div
                      className="text-2xl lg:text-3xl font-bold text-foreground"
                      aria-label={`${stat.number} ${stat.label}`}
                    >
                      {stat.number}
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </section>
  );
}
