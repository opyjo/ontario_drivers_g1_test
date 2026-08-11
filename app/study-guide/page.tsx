"use client";

import Link from "next/link";
import { studyGuideData } from "@/data/study-guide";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Clock,
  BookOpen,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { PageLayout } from "@/components/layouts/PageLayout";

export default function StudyGuidePage() {
  const { getChapterCompletionPercentage, getTotalProgress, isLoaded } =
    useStudyProgress();

  const totalSections = studyGuideData.reduce(
    (total, chapter) => total + chapter.sections.length,
    0
  );
  const totalProgress = isLoaded
    ? getTotalProgress(studyGuideData.length, totalSections)
    : { completedChapters: 0, completedSections: 0, totalPercentage: 0 };

  const completedChaptersCount = isLoaded
    ? studyGuideData.filter(
        (ch) =>
          getChapterCompletionPercentage(ch.id, ch.sections.length) === 100
      ).length
    : 0;

  return (
    <PageLayout
      title="Ontario G1 Study Guide"
      subtitle="Review handbook-based chapters, traffic-sign categories, and road-safety topics at your own pace."
    >
      <div className="container mx-auto px-4 max-w-7xl pb-16">
        {/* Progress Overview Header Card */}
        <div className="relative mb-10 overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-primary uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Personalized Learning Tracker</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                Your Handbook Progress
              </h2>
            </div>
            <Badge variant="outline" className="w-fit border-primary/30 text-primary font-medium text-xs px-3 py-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-1.5" />
              {isLoaded ? (
                <span>
                  {totalProgress.completedSections} of {totalSections} sections completed
                </span>
              ) : (
                <span>Loading progress…</span>
              )}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-primary">
                {isLoaded ? `${totalProgress.totalPercentage}%` : "0%"}
              </div>
              <div className="text-xs font-medium text-muted-foreground mt-1">
                Overall Progress
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-emerald-500">
                {isLoaded ? completedChaptersCount : "0"}
              </div>
              <div className="text-xs font-medium text-muted-foreground mt-1">
                Chapters Completed
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-4 text-center">
              <div className="text-2xl md:text-3xl font-extrabold text-sky-500">
                {isLoaded ? studyGuideData.length - completedChaptersCount : "0"}
              </div>
              <div className="text-xs font-medium text-muted-foreground mt-1">
                Chapters Remaining
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-muted/60 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-primary to-sky-500 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${isLoaded ? totalProgress.totalPercentage : 0}%` }}
            />
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {studyGuideData.map((chapter, index) => {
            const completionPercentage = isLoaded
              ? getChapterCompletionPercentage(
                  chapter.id,
                  chapter.sections.length
                )
              : 0;
            const isCompleted = completionPercentage === 100;
            const isInProgress =
              completionPercentage > 0 && completionPercentage < 100;

            return (
              <Link
                key={chapter.id}
                href={`/study-guide/${chapter.id}`}
                className={`group relative flex flex-col justify-between rounded-2xl border bg-card p-6 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  isCompleted
                    ? "border-emerald-500/40 bg-emerald-500/5"
                    : isInProgress
                    ? "border-primary/40 bg-primary/5"
                    : "border-border/80"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm text-white shadow-md ${
                        isCompleted
                          ? "bg-emerald-500"
                          : isInProgress
                          ? "bg-primary"
                          : "bg-slate-400 dark:bg-slate-700"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        chapter.icon || index + 1
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20 text-xs font-semibold">
                          Completed
                        </Badge>
                      )}
                      {isInProgress && (
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs font-semibold">
                          {completionPercentage}%
                        </Badge>
                      )}
                      <Badge variant="outline" className="text-xs text-muted-foreground border-border/60">
                        {chapter.sections.length} sections
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h3>
                    {chapter.description && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                        {chapter.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-border/40 space-y-3">
                  {isInProgress && (
                    <div className="w-full bg-muted/60 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-primary h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1 font-medium text-muted-foreground">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      {chapter.estimatedTime}
                    </span>
                    <span className="inline-flex min-h-10 items-center font-semibold text-primary">
                      {isCompleted ? "Review" : isInProgress ? "Continue" : "Start"}
                      <ChevronRight className="w-3.5 h-3.5 ml-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </PageLayout>
  );
}
