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
import { Button } from "@/components/ui/button";
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
}

export function ChapterOverview({ chapter }: Readonly<ChapterOverviewProps>) {
  const { isSectionCompleted, getChapterCompletionPercentage, isLoaded } =
    useStudyProgress();

  return (
    <div className="min-h-screen bg-slate-50">
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
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-bold text-slate-800">
            Ontario Driver's Study Guide
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        {/* Enhanced Breadcrumb */}
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
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
                <BreadcrumbPage className="px-2 py-1 rounded-md bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 font-medium border border-blue-200">
                  {chapter.title}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
            {chapter.title}
          </h1>
          {chapter.description && (
            <p className="text-slate-600 max-w-2xl mx-auto text-base">
              {chapter.description}
            </p>
          )}
        </div>

        {/* Chapter Progress */}
        <div className="mb-6 p-4 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-slate-800">
              Chapter Progress
            </h3>
            <span className="text-sm text-slate-600">
              {isLoaded
                ? `${getChapterCompletionPercentage(
                    chapter.id,
                    chapter.sections.length
                  )}% Complete`
                : "Loading…"}
            </span>
          </div>
          <div className="w-full bg-slate-200 rounded-full h-2">
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
                    : "border-slate-200 bg-white"
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
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {section.keyPointCount} key points
                      </span>
                    </div>
                  </div>

                  <CardTitle className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                    {section.title}
                  </CardTitle>

                  {section.preview && (
                    <p className="mb-4 mt-2 line-clamp-3 text-[15px] leading-6 text-slate-600">
                      {truncateAtWord(section.preview, 120)}
                    </p>
                  )}
                </CardHeader>

                <CardContent>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center justify-between w-full text-primary hover:bg-primary/10 hover:text-primary/80 transition-colors"
                  >
                    {isCompleted ? "Review" : "Start Reading"}
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
