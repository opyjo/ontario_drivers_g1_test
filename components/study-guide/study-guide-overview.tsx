"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  ChevronRight,
  Clock,
  BookOpen,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  HardDrive,
  WifiOff,
} from "lucide-react";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import { PageLayout } from "@/components/layouts/PageLayout";
import { Button } from "@/components/ui/button";
import { InstallAppButton } from "@/components/pwa/install-app-button";

export interface StudyGuideChapterSummary {
  id: string;
  title: string;
  description: string;
  icon: string;
  estimatedTime: string;
  sections: Array<{ id: string; title: string }>;
}

interface StudyGuideOverviewProps {
  chapters: StudyGuideChapterSummary[];
}

export function StudyGuideOverview({
  chapters,
}: Readonly<StudyGuideOverviewProps>) {
  const { progress, getChapterCompletionPercentage, getTotalProgress, isLoaded } =
    useStudyProgress();

  const chapterSections = useMemo(
    () =>
      Object.fromEntries(
        chapters.map((chapter) => [
          chapter.id,
          chapter.sections.map((section) => section.id),
        ])
      ),
    [chapters]
  );
  const totalSections = chapters.reduce(
    (total, chapter) => total + chapter.sections.length,
    0
  );
  const totalProgress = isLoaded
    ? getTotalProgress(chapterSections)
    : { completedChapters: 0, completedSections: 0, totalPercentage: 0 };

  const completedChaptersCount = isLoaded ? totalProgress.completedChapters : 0;
  const continueTarget = useMemo(() => {
    let latest:
      | {
          chapterId: string;
          sectionId: string;
          sectionTitle: string;
          timestamp: number;
        }
      | undefined;

    for (const chapter of chapters) {
      for (const section of chapter.sections) {
        const lastReadAt = progress[chapter.id]?.[section.id]?.lastReadAt;
        const timestamp = lastReadAt ? Date.parse(lastReadAt) : Number.NaN;
        if (Number.isFinite(timestamp) && (!latest || timestamp > latest.timestamp)) {
          latest = {
            chapterId: chapter.id,
            sectionId: section.id,
            sectionTitle: section.title,
            timestamp,
          };
        }
      }
    }

    if (latest) return { ...latest, hasProgress: true };

    const firstChapter = chapters[0];
    const firstSection = firstChapter?.sections[0];
    return firstChapter && firstSection
      ? {
          chapterId: firstChapter.id,
          sectionId: firstSection.id,
          sectionTitle: firstSection.title,
          timestamp: 0,
          hasProgress: false,
        }
      : null;
  }, [chapters, progress]);

  return (
    <PageLayout
      title="Ontario G1 Study Guide"
      subtitle="Review handbook-based chapters, traffic-sign categories, and road-safety topics at your own pace."
    >
      <div className="container mx-auto max-w-7xl px-4 pb-20 sm:pb-16">
        {/* Progress Overview Header Card */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-6 md:mb-10 md:p-8">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:mb-6 md:flex-row md:items-center md:gap-4">
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

          <div className="mb-5 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-3 md:gap-6">
            <div className="rounded-xl border border-border bg-muted/30 p-3 text-center sm:p-4">
              <div className="text-xl font-extrabold text-primary sm:text-2xl md:text-3xl">
                {isLoaded ? `${totalProgress.totalPercentage}%` : "0%"}
              </div>
              <div className="mt-1 text-[11px] font-medium leading-4 text-muted-foreground sm:text-xs">
                Overall Progress
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3 text-center sm:p-4">
              <div className="text-xl font-extrabold text-emerald-500 sm:text-2xl md:text-3xl">
                {isLoaded ? completedChaptersCount : "0"}
              </div>
              <div className="mt-1 text-[11px] font-medium leading-4 text-muted-foreground sm:text-xs">
                Chapters Completed
              </div>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3 text-center sm:p-4">
              <div className="text-xl font-extrabold text-sky-500 sm:text-2xl md:text-3xl">
                {isLoaded ? chapters.length - completedChaptersCount : "0"}
              </div>
              <div className="mt-1 text-[11px] font-medium leading-4 text-muted-foreground sm:text-xs">
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

          {continueTarget ? (
            <div className="mt-5 flex flex-col gap-4 rounded-xl border border-primary/20 bg-primary/5 p-3 sm:mt-6 sm:flex-row sm:items-center sm:justify-between sm:p-4">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-background text-primary shadow-sm">
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">
                    {continueTarget.hasProgress
                      ? "Continue where you left off"
                      : "Start with the first handbook section"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {continueTarget.sectionTitle}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <HardDrive className="h-3.5 w-3.5" aria-hidden="true" />
                    Progress is saved automatically in this browser on this device.
                  </p>
                </div>
              </div>
              <Button asChild className="shrink-0">
                <Link
                  href={`/study-guide/${continueTarget.chapterId}/${continueTarget.sectionId}`}
                >
                  {continueTarget.hasProgress ? "Continue reading" : "Start reading"}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          ) : null}

          <div className="mt-4 flex flex-col gap-3 rounded-xl border border-border bg-muted/30 p-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:p-4">
            <p className="flex items-start gap-2 leading-6">
              <WifiOff className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              Study-guide pages and images are kept available after you visit them,
              so you can reopen them during a connection interruption.
            </p>
            <InstallAppButton />
          </div>
        </div>

        {/* Chapters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {chapters.map((chapter, index) => {
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
                className={`group relative flex flex-col justify-between rounded-2xl border bg-card p-5 shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:p-6 ${
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
                      <p className="mt-2 line-clamp-2 text-[15px] leading-6 text-muted-foreground">
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
