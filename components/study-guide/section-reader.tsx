"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  Lightbulb,
  CheckCircle2,
} from "lucide-react";
import {
  type StudyGuideSection,
  type StudyGuideChapter,
} from "@/data/study-guide";

interface SectionReaderProps {
  section: StudyGuideSection;
  chapter: StudyGuideChapter;
  currentIndex: number;
  totalSections: number;
  onNext: () => void;
  onPrevious: () => void;
  onBackToChapter: () => void;
  isFirstSection: boolean;
  isLastSection: boolean;
}

export default function SectionReader({
  section,
  chapter,
  currentIndex,
  totalSections,
  onNext,
  onPrevious,
  onBackToChapter,
  isFirstSection,
  isLastSection,
}: SectionReaderProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="container mx-auto px-4 py-6">
        {/* Top Navigation */}
        <div className="flex justify-between items-center mb-4">
          <Button
            variant="outline"
            className="hover:bg-blue-50 hover:border-blue-200 transition-colors"
            onClick={onBackToChapter}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to {chapter.title}
          </Button>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={isFirstSection}
              className="flex items-center gap-2 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Section
            </Button>

            <Button
              onClick={onNext}
              disabled={isLastSection}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 disabled:opacity-50"
            >
              Next Section
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Header */}
        <div className="mb-6">
          {/* Title Section */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/50 rounded-2xl"></div>
            <div className="relative bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-md">
                      <span className="text-white font-bold text-lg">
                        {currentIndex + 1}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                          Section {currentIndex + 1} of {totalSections}
                        </span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-600 font-medium">
                          {chapter.title}
                        </span>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-2">
                    {section.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>
                        Est.{" "}
                        {Math.ceil(section.content.split(" ").length / 200)} min
                        read
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      <span>Official MTO Content</span>
                    </div>
                  </div>
                </div>

                {/* Progress Ring */}
                <div className="relative w-16 h-16 flex-shrink-0">
                  <svg
                    className="w-16 h-16 transform -rotate-90"
                    viewBox="0 0 36 36"
                  >
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="2"
                    />
                    <path
                      d="m18,2.0845 a 15.9155,15.9155 0 0,1 0,31.831 a 15.9155,15.9155 0 0,1 0,-31.831"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="2"
                      strokeDasharray={`${
                        ((currentIndex + 1) / totalSections) * 100
                      }, 100`}
                    />
                    <defs>
                      <linearGradient
                        id="gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#6366f1" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-slate-700">
                      {Math.round(((currentIndex + 1) / totalSections) * 100)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Main Content */}
            <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="relative bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
                <CardHeader className="relative pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <CardTitle className="flex items-center text-xl font-semibold text-slate-800">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                        <BookOpen className="h-4 w-4 text-white" />
                      </div>
                      Study Content
                    </CardTitle>
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide shadow-sm">
                      OFFICIAL
                    </div>
                  </div>
                  <div className="h-px bg-gradient-to-r from-blue-200 via-indigo-300 to-blue-200 opacity-60"></div>
                </CardHeader>
              </div>

              <CardContent className="bg-white px-6 py-4">
                <div className="prose max-w-none">
                  {section.content.includes("<img") ? (
                    <div
                      className="text-slate-700 space-y-6"
                      style={{
                        fontFamily:
                          "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                        lineHeight: "1.7",
                        fontSize: "15px",
                        fontWeight: "400",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {section.content
                        .split("\n\n")
                        .map((contentSection, index) => {
                          if (contentSection.includes("<img")) {
                            // Extract image info
                            const imgMatch = contentSection.match(
                              /<img\s+src=['"]([^'"]*)['"]\s+alt=['"]([^'"]*)['"]\s*\/>/
                            );
                            if (imgMatch) {
                              const [, src, alt] = imgMatch;
                              const beforeImg = contentSection
                                .substring(0, contentSection.indexOf("<img"))
                                .trim();
                              const afterImg = contentSection
                                .substring(contentSection.indexOf("/>") + 2)
                                .trim();

                              return (
                                <div
                                  key={index}
                                  className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg"
                                >
                                  <div className="flex-shrink-0">
                                    <img
                                      src={src}
                                      alt={alt}
                                      className="max-w-20 max-h-20 object-contain rounded-lg shadow-sm bg-white p-1"
                                    />
                                  </div>
                                  <div className="flex-1">
                                    {afterImg && (
                                      <p className="text-slate-700 font-semibold text-xs leading-snug">
                                        {afterImg}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              );
                            }
                          }

                          // Regular paragraph content
                          return (
                            <p key={index} className="text-slate-700 mb-4">
                              {contentSection
                                .split("\n")
                                .map((line, lineIndex) => (
                                  <span
                                    key={lineIndex}
                                    className="block mb-2 last:mb-0"
                                  >
                                    {line}
                                  </span>
                                ))}
                            </p>
                          );
                        })}
                    </div>
                  ) : (
                    section.content.split("\n\n").map((paragraph, index) => (
                      <div key={index} className="mb-4">
                        {paragraph.split("\n").map((line, lineIndex) => (
                          <p
                            key={lineIndex}
                            className="text-slate-700 mb-2 last:mb-0"
                            style={{
                              fontFamily:
                                "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                              lineHeight: "1.7",
                              fontSize: "15px",
                              fontWeight: "400",
                              letterSpacing: "-0.01em",
                            }}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Key Points */}
            {section.keyPoints && section.keyPoints.length > 0 && (
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative bg-gradient-to-br from-amber-50 via-yellow-50/30 to-orange-50/20">
                  <CardHeader className="relative pb-4">
                    <div className="flex items-center justify-between mb-3">
                      <CardTitle className="flex items-center text-xl font-semibold text-slate-800">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center mr-3 shadow-sm">
                          <Lightbulb className="h-4 w-4 text-white" />
                        </div>
                        Key Points
                      </CardTitle>
                      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide shadow-sm">
                        IMPORTANT
                      </div>
                    </div>
                    <div className="h-px bg-gradient-to-r from-amber-200 via-orange-300 to-amber-200 opacity-60"></div>
                  </CardHeader>
                </div>

                <CardContent className="bg-white px-6 py-4">
                  <div className="space-y-3">
                    {section.keyPoints.map((point, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100"
                      >
                        <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
                          <CheckCircle2 className="h-3 w-3 text-white" />
                        </div>
                        <p
                          className="text-slate-700 flex-1"
                          style={{
                            fontFamily:
                              "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
                            fontSize: "14px",
                            fontWeight: "500",
                            lineHeight: "1.6",
                            letterSpacing: "-0.01em",
                          }}
                        >
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <Button
                variant="outline"
                onClick={onPrevious}
                disabled={isFirstSection}
                className="flex items-center"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Previous Section
              </Button>

              <Button
                onClick={onNext}
                disabled={isLastSection}
                className="bg-blue-600 hover:bg-blue-700 flex items-center"
              >
                Next Section
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Section Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Section:</span>
                    <span className="font-semibold">
                      {currentIndex + 1} of {totalSections}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentIndex + 1) / totalSections) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {Math.round(((currentIndex + 1) / totalSections) * 100)}%
                    Complete
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Chapter Sections */}
            <Card>
              <CardHeader>
                <CardTitle>All Sections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  {chapter.sections.map((sec, index) => (
                    <div
                      key={sec.id}
                      className={`p-1.5 rounded border-l-4 ${
                        index === currentIndex
                          ? "border-blue-500 bg-blue-50"
                          : index < currentIndex
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200 bg-gray-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={
                            index === currentIndex ? "font-semibold" : ""
                          }
                        >
                          {index + 1}. {sec.title}
                        </span>
                        {index < currentIndex && (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Study Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Study Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1 text-sm">
                  <li>• Take notes on key points as you read</li>
                  <li>• Review each section before moving on</li>
                  <li>• Practice with the quiz questions</li>
                  <li>• Focus on understanding, not just memorizing</li>
                  <li>• Take breaks between sections</li>
                </ul>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="space-y-2">
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Practice Questions
              </Button>
              <Button variant="outline" className="w-full">
                Take Chapter Quiz
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
