import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ListChecks, Target, BookOpen, ArrowRight, Sparkles } from "lucide-react";

export function CallToAction() {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 text-white border-t border-indigo-800/40">
      {/* Decorative ambient mesh circles */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 relative max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-200 border border-indigo-400/30 backdrop-blur-md mb-6 shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Built for Ontario G1 Learners</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
          Ready to Prepare for Your G1 Test <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-200">With Confidence?</span>
        </h2>

        <p className="text-base sm:text-lg mb-10 text-indigo-200/90 leading-relaxed max-w-2xl mx-auto font-normal">
          Review Ontario handbook material or jump into a realistic 40-question practice simulation.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="bg-white hover:bg-slate-100 text-indigo-950 font-bold px-8 py-6 text-base rounded-xl shadow-xl shadow-indigo-950/40 transition-all hover:scale-[1.02]"
            asChild
          >
            <Link href="/study-guide" className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-600" />
              Start Studying Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          <Button
            size="lg"
            variant="outline"
            className="border-indigo-400/40 text-white bg-indigo-950/60 hover:bg-indigo-900/80 hover:text-white px-8 py-6 text-base font-semibold rounded-xl backdrop-blur-md transition-all"
            asChild
          >
            <Link href="/quiz/simulation" className="flex items-center gap-2">
              <Target className="h-5 w-5 text-sky-400" />
              Start G1 Simulation
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
