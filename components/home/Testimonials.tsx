import { Star, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TestimonialItem {
  readonly name: string;
  readonly location: string;
  readonly text: string;
  readonly rating: number;
}

interface TestimonialsProps {
  readonly items: ReadonlyArray<TestimonialItem>;
}

export function Testimonials({ items }: Readonly<TestimonialsProps>) {
  return (
    <section className="py-20 bg-background/50 relative overflow-hidden border-t border-border/40">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="outline" className="px-3 py-1 border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider">
            Verified Student Feedback
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground tracking-tight">
            Loved by Drivers Across <span className="gradient-text">Ontario</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Here's what our students have to say after passing their G1 & G2 driving exams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((t) => {
            const initials = t.name
              .split(" ")
              .map((n) => n[0])
              .join("");

            return (
              <div
                key={`${t.name}-${t.location}`}
                className="glass-card glass-card-hover p-8 rounded-3xl border border-border/80 relative flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: t.rating }).map((_, n) => (
                        <Star
                          key={`${t.name}-star-${n}`}
                          className="h-4 w-4 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-primary/10" />
                  </div>

                  <p className="text-muted-foreground text-sm italic leading-relaxed">
                    "{t.text}"
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/40 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-md">
                    {initials}
                  </div>
                  <div>
                    <div className="font-bold text-foreground text-sm">
                      {t.name}
                    </div>
                    <div className="text-xs text-muted-foreground font-medium">
                      {t.location}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
