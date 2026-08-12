"use client";

import Link from "next/link";
import { StudyGuideSourcePanel } from "@/components/study-guide/source-panel";
import { BreadcrumbJsonLd } from "@/components/seo/breadcrumb-json-ld";
import { absoluteUrl } from "@/lib/seo";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ChevronRight, Layers, CheckCircle2 } from "lucide-react";
import { useStudyProgress } from "@/hooks/useStudyProgress";
import {
  GuideRecommendations,
  type GuideRecommendation,
} from "@/components/content/guide-recommendations";

/* ✅ Word-safe truncation */
function truncateAtWord(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "…";
}

export interface ChapterOverviewData {
  id: string;
  title: string;
  description: string;
  sections: Array<{
    id: string;
    title: string;
    preview: string;
    keyPointCount: number;
  }>;
}

interface ChapterOverviewProps {
  chapter: ChapterOverviewData;
  relatedGuides: GuideRecommendation[];
}

export function ChapterOverview({
  chapter,
  relatedGuides,
}: Readonly<ChapterOverviewProps>) {
  const { isSectionCompleted, getChapterCompletionPercentage, isLoaded } =
    useStudyProgress();

  return (
    <main id="main-content" className="min-h-screen bg-slate-50">
      <BreadcrumbJsonLd
        id={`chapter-breadcrumb-${chapter.id}`}
        items={[
          { name: "Home", url: absoluteUrl("/") },
          { name: "Study Guide", url: absoluteUrl("/study-guide") },
          {
            name: chapter.title,
            url: absoluteUrl(`/study-guide/${chapter.id}`),
          },
        ]}
      />
      {/* Navbar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-card px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-bold text-foreground">
            Ontario Driver's Study Guide
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Enhanced Breadcrumb */}
        <div className="mb-6 rounded-lg border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    href="/study-guide"
                    className="flex items-center gap-1 px-2 py-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200 cursor-pointer"
                  >
                    <Layers className="w-4 h-4" />
                    Study Guide
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-slate-400" />
              <BreadcrumbItem>
                <BreadcrumbPage className="rounded-md border border-blue-200 bg-gradient-to-r from-blue-50 to-cyan-50 px-2 py-1 font-medium text-blue-700 dark:border-blue-900 dark:from-blue-950/50 dark:to-cyan-950/50 dark:text-blue-300">
                  {chapter.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-10 text-center">
          <h1 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            {chapter.title}
          </h1>
          {chapter.description && (
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              {chapter.description}
            </p>
          )}
        </div>

        {/* Chapter Progress */}
        <div className="mb-6 rounded-lg border border-border bg-card/80 p-4 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-foreground">
              Chapter Progress
            </h3>
            <span className="text-sm text-muted-foreground">
              {isLoaded
                ? `${getChapterCompletionPercentage(
                    chapter.id,
                    chapter.sections.length
                  )}% Complete`
                : "Loading…"}
            </span>
          </div>
          <div
            className="h-2 w-full rounded-full bg-slate-200"
            role="progressbar"
            aria-label="Chapter completion"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              isLoaded
                ? getChapterCompletionPercentage(chapter.id, chapter.sections.length)
                : 0
            }
          >
            <div
              className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{
                width: `${
                  isLoaded
                    ? getChapterCompletionPercentage(
                        chapter.id,
                        chapter.sections.length
                      )
                    : 0
                }%`,
              }}
            ></div>
          </div>
        </div>

        <StudyGuideSourcePanel chapterId={chapter.id} />

        {/* Sections Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {chapter.sections.map((section, index) => {
            const isCompleted = isLoaded
              ? isSectionCompleted(chapter.id, section.id)
              : false;

            return (
              <Link
                key={section.id}
                href={`/study-guide/${chapter.id}/${section.id}`}
                className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <Card
                  className={`h-full cursor-pointer border shadow-sm hover:shadow-md transition ${
                  isCompleted
                    ? "border-green-200 bg-green-50/30"
                    : "border-border bg-card"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-8 h-8 flex items-center justify-center rounded-md text-white text-sm font-semibold ${
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-600"
                          : "bg-gradient-to-br from-cyan-500 to-blue-600"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {isCompleted && (
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">
                        {section.keyPointCount} key points
                      </span>
                    </div>
                  </div>

                  <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </CardTitle>

                  {section.preview && (
                    <p className="mb-4 mt-2 line-clamp-3 text-[15px] leading-6 text-muted-foreground">
                      {truncateAtWord(section.preview, 120)}
                    </p>
                  )}
                </CardHeader>

                <CardContent>
                  <span className="flex min-h-11 w-full items-center justify-between rounded-md px-3 text-sm font-medium text-primary transition-colors group-hover:bg-primary/10 group-hover:text-primary/80">
                    {isCompleted ? "Review" : "Start Reading"}
                    <ChevronRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </span>
                </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 border-t border-slate-200 pt-10">
          <GuideRecommendations
            guides={relatedGuides}
            title="Go deeper on this chapter"
            description="Use these focused explanations after reading the handbook-based sections."
          />
        </div>
      </div>
    </main>
  );
}
