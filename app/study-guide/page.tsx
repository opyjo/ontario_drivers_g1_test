"use client";

import { useRouter } from "next/navigation";
import { studyGuideData } from "@/data/study-guide";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Clock,
  Layers,
  CheckCircle2,
  Circle,
} from "lucide-react";
import { useStudyProgress } from "@/hooks/useStudyProgress";

/* ✅ Word-safe truncation */
function truncateAtWord(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  return trimmed.slice(0, trimmed.lastIndexOf(" ")) + "…";
}

export default function StudyGuidePage() {
  const router = useRouter();
  const { getChapterCompletionPercentage, getTotalProgress, isLoaded } =
    useStudyProgress();

  // Calculate total sections across all chapters
  const totalSections = studyGuideData.reduce(
    (total, chapter) => total + chapter.sections.length,
    0
  );
  const totalProgress = isLoaded
    ? getTotalProgress(studyGuideData.length, totalSections)
    : { completedChapters: 0, completedSections: 0, totalPercentage: 0 };

  // More accurate completed chapters count using chapter totals
  const completedChaptersCount = isLoaded
    ? studyGuideData.filter(
        (ch) =>
          getChapterCompletionPercentage(ch.id, ch.sections.length) === 100
      ).length
    : 0;

  // --- HOMEPAGE (Chapters Grid) ---
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 border-b bg-white sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 flex items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <Layers className="w-4 h-4" />
          </div>
          <span className="font-semibold text-slate-800">
            Ontario Driver's Study Guide
          </span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Progress Overview */}
        <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-slate-800">
              Your Study Progress
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              {isLoaded ? (
                <>
                  {totalProgress.completedSections} of {totalSections} sections
                  completed
                </>
              ) : (
                <span className="text-slate-400">Loading…</span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {isLoaded ? `${totalProgress.totalPercentage}%` : "—"}
              </div>
              <div className="text-sm text-slate-600">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {isLoaded ? completedChaptersCount : "—"}
              </div>
              <div className="text-sm text-slate-600">Chapters Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600">
                {isLoaded
                  ? studyGuideData.length - completedChaptersCount
                  : "—"}
              </div>
              <div className="text-sm text-slate-600">Chapters Remaining</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${isLoaded ? totalProgress.totalPercentage : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              <Card
                key={chapter.id}
                className={`group cursor-pointer border shadow-sm hover:shadow-md transition ${
                  isCompleted
                    ? "border-green-200 bg-green-50/30"
                    : isInProgress
                    ? "border-blue-200 bg-blue-50/30"
                    : "border-slate-200 bg-white"
                }`}
                onClick={() => router.push(`/study-guide/${chapter.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className={`w-10 h-10 flex items-center justify-center rounded-lg text-white shadow-sm font-semibold ${
                        isCompleted
                          ? "bg-gradient-to-br from-green-500 to-emerald-500"
                          : isInProgress
                          ? "bg-gradient-to-br from-blue-500 to-cyan-500"
                          : "bg-gradient-to-br from-slate-400 to-slate-500"
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
                        <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      )}
                      {isInProgress && (
                        <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-0.5 rounded-full">
                          {completionPercentage}%
                        </span>
                      )}
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                        {chapter.sections.length} sections
                      </span>
                    </div>
                  </div>

                  <CardTitle className="text-lg font-semibold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {chapter.title}
                  </CardTitle>

                  {chapter.description && (
                    <CardDescription className="text-slate-600 text-sm mt-2">
                      {chapter.description}
                    </CardDescription>
                  )}
                </CardHeader>

                <CardContent>
                  <div className="space-y-3">
                    {/* Progress Bar */}
                    {isInProgress && (
                      <div className="w-full bg-slate-200 rounded-full h-1.5">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${completionPercentage}%` }}
                        ></div>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-slate-600">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-orange-500" />
                        {chapter.estimatedTime}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-1 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 transition-colors"
                      >
                        {isCompleted
                          ? "Review"
                          : isInProgress
                          ? "Continue"
                          : "Start"}
                        <ChevronRight className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
