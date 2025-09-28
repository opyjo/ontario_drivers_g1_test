import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListChecks, Target, BookOpen } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-primary to-accent text-white">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">
            Ready to Pass Your Driving Test?
          </h2>
          <p className="text-base lg:text-lg mb-8 opacity-90 leading-relaxed">
            Start your journey today with our comprehensive study guide and
            practice with our realistic test simulations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-gray-100 text-base px-8 py-4"
              asChild
            >
              <Link href="/study-guide">
                <BookOpen className="mr-2 h-5 w-5" />
                Start Studying Now
              </Link>
            </Button>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-gray-100 text-base px-8 py-4 border-white"
                asChild
              >
                <Link href="/quiz/simulation">
                  <Target className="mr-2 h-5 w-5" />
                  G1 Simulation
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-gray-100 text-base px-8 py-4 border-white"
                asChild
              >
                <Link href="/quiz/review?questionType=all">
                  <ListChecks className="mr-2 h-5 w-5" />
                  Review Incorrect
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
