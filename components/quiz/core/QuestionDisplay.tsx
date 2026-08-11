"use client";

import Image from "next/image";
import { AlertTriangle, BookCheck, Flag } from "lucide-react";
import type { Question } from "@/types/quiz";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface QuestionDisplayProps {
  readonly question: Question;
  readonly flagged?: boolean;
  readonly onToggleFlag?: () => void;
}

export function QuestionDisplay({
  question,
  flagged = false,
  onToggleFlag,
}: QuestionDisplayProps) {
  const isSign = question.question_type === "signs";

  return (
    <section className="space-y-4 rounded-xl border border-border bg-card p-5 shadow-sm sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge
            className={
              isSign
                ? "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300"
                : "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300"
            }
          >
            {isSign ? (
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            ) : (
              <BookCheck className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
            )}
            {isSign ? "Road Signs" : "Rules of the Road"}
          </Badge>
          {question.category ? (
            <Badge variant="outline" className="text-muted-foreground">
              {question.category}
            </Badge>
          ) : null}
          {question.adaptive_reason ? (
            <Badge variant="secondary" className="text-muted-foreground">
              {question.adaptive_reason}
            </Badge>
          ) : null}
        </div>

        {onToggleFlag ? (
          <Button
            type="button"
            variant={flagged ? "secondary" : "ghost"}
            size="sm"
            onClick={onToggleFlag}
            aria-pressed={flagged}
            className="min-h-10 rounded-lg"
          >
            <Flag
              className={`mr-2 h-4 w-4 ${flagged ? "fill-current" : ""}`}
              aria-hidden="true"
            />
            {flagged ? "Flagged" : "Flag for review"}
          </Button>
        ) : null}
      </div>

      <h2 className="text-lg font-bold leading-7 text-foreground sm:text-xl">
        {question.question_text}
      </h2>

      {question.image_url ? (
        <div className="flex justify-center pt-1">
          <div className="rounded-xl border border-border bg-white p-3 dark:bg-slate-950">
            <Image
              src={question.image_url}
              alt={question.image_description || "Traffic sign illustration"}
              width={320}
              height={176}
              className="h-36 w-auto max-w-full object-contain sm:h-40"
              priority
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </section>
  );
}
