import { Progress } from "@/components/ui/progress";

interface SectionProgress {
  readonly label: string;
  readonly answered: number;
  readonly total: number;
}

interface ProgressIndicatorProps {
  readonly currentIndex: number;
  readonly total: number;
  readonly percentage: number;
  readonly answered: number;
  readonly sections?: ReadonlyArray<SectionProgress>;
}

export function ProgressIndicator({
  currentIndex,
  total,
  percentage,
  answered,
  sections = [],
}: ProgressIndicatorProps) {
  const currentNumber = Math.min(currentIndex + 1, total);
  const roundedPercentage = Math.round(percentage);

  return (
    <section
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
      aria-label="Quiz progress"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-semibold text-foreground">
          Question {currentNumber} of {total}
        </span>
        <span className="text-muted-foreground" aria-live="polite">
          {answered} answered · {total - answered} remaining
        </span>
      </div>

      <Progress
        value={percentage}
        className="mt-3 h-2.5 bg-muted"
        aria-label={`${roundedPercentage}% of questions answered`}
      />

      {sections.length > 1 ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {sections.map((section) => {
            const sectionPercentage = section.total
              ? (section.answered / section.total) * 100
              : 0;
            return (
              <div key={section.label}>
                <div className="mb-1.5 flex justify-between text-xs font-medium">
                  <span>{section.label}</span>
                  <span className="text-muted-foreground">
                    {section.answered}/{section.total}
                  </span>
                </div>
                <Progress
                  value={sectionPercentage}
                  className="h-1.5 bg-muted"
                  aria-label={`${section.label}: ${section.answered} of ${section.total} answered`}
                />
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
