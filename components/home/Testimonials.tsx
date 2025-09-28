import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

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
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Success Stories
            </h2>
            <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Join thousands who have successfully passed their driving test
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items.map((t) => (
              <Card
                key={`${t.name}-${t.location}`}
                className="group relative bg-card border border-border hover:border-primary/50 transition-all duration-500 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from(
                        { length: t.rating },
                        (_, n) => `${t.name}-${t.location}-star-${n}`
                      ).map((id) => (
                        <Star
                          key={id}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                    <CardTitle className="text-lg font-semibold">
                      {t.name}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {t.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground italic leading-relaxed">
                      "{t.text}"
                    </p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
