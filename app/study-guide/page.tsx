"use client";

import { useState } from "react";
import { studyGuideData } from "@/data/study-guide";
import {
  type StudyGuideChapter,
  type StudyGuideSection,
} from "@/data/study-guide";
import {
  SectionContent,
  KeyPoints,
  StudyTip,
  SectionReader,
} from "@/components/study-guide";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Clock, BookOpen, ChevronLeft } from "lucide-react";

export default function StudyGuidePage() {
  const [selectedChapter, setSelectedChapter] =
    useState<StudyGuideChapter | null>(null);
  const [selectedSection, setSelectedSection] =
    useState<StudyGuideSection | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const navigateToNextSection = () => {
    if (!selectedChapter || !selectedSection) return;

    const currentSectionIndex = selectedChapter.sections.findIndex(
      (sec: StudyGuideSection) => sec.id === selectedSection.id
    );
    const currentChapterIndex = studyGuideData.findIndex(
      (ch) => ch.id === selectedChapter.id
    );

    // If there's a next section in current chapter
    if (currentSectionIndex < selectedChapter.sections.length - 1) {
      setSelectedSection(selectedChapter.sections[currentSectionIndex + 1]);
    }
    // If we're at the last section, go to next chapter's first section
    else if (currentChapterIndex < studyGuideData.length - 1) {
      const nextChapter = studyGuideData[currentChapterIndex + 1];
      setSelectedChapter(nextChapter);
      setSelectedSection(nextChapter.sections[0]);
    }
  };

  const navigateToPrevSection = () => {
    if (!selectedChapter || !selectedSection) return;

    const currentSectionIndex = selectedChapter.sections.findIndex(
      (sec: StudyGuideSection) => sec.id === selectedSection.id
    );
    const currentChapterIndex = studyGuideData.findIndex(
      (ch) => ch.id === selectedChapter.id
    );

    // If there's a previous section in current chapter
    if (currentSectionIndex > 0) {
      setSelectedSection(selectedChapter.sections[currentSectionIndex - 1]);
    }
    // If we're at the first section, go to previous chapter's last section
    else if (currentChapterIndex > 0) {
      const prevChapter = studyGuideData[currentChapterIndex - 1];
      setSelectedChapter(prevChapter);
      setSelectedSection(prevChapter.sections[prevChapter.sections.length - 1]);
    }
  };

  if (selectedChapter && selectedSection) {
    const currentSectionIndex = selectedChapter.sections.findIndex(
      (sec: StudyGuideSection) => sec.id === selectedSection.id
    );
    const currentChapterIndex = studyGuideData.findIndex(
      (ch) => ch.id === selectedChapter.id
    );
    const isFirstSection =
      currentChapterIndex === 0 && currentSectionIndex === 0;
    const isLastSection =
      currentChapterIndex === studyGuideData.length - 1 &&
      currentSectionIndex === selectedChapter.sections.length - 1;

    return (
      <SectionReader
        section={selectedSection}
        chapter={selectedChapter}
        currentIndex={currentSectionIndex}
        totalSections={selectedChapter.sections.length}
        onNext={navigateToNextSection}
        onPrevious={navigateToPrevSection}
        onBackToChapter={() => setSelectedSection(null)}
        isFirstSection={isFirstSection}
        isLastSection={isLastSection}
      />
    );
  }

  if (selectedChapter) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
            <button
              onClick={() => setSelectedChapter(null)}
              className="hover:text-cyan-600 transition-colors flex items-center gap-1"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Study Guide
            </button>
          </div>

          {/* Chapter Header */}
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">{selectedChapter.icon}</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {selectedChapter.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
              {selectedChapter.description}
            </p>
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {selectedChapter.estimatedTime}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {selectedChapter.sections.length} sections
              </div>
              <Badge className={getDifficultyColor(selectedChapter.difficulty)}>
                {selectedChapter.difficulty}
              </Badge>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-sm text-blue-800">
                📖 Content based on the Official Ministry of Transportation
                (MTO) Driver's Handbook
              </p>
            </div>
          </div>

          {/* Sections Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {selectedChapter.sections.map(
              (section: StudyGuideSection, index: number) => (
                <Card
                  key={section.id}
                  className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
                  onClick={() => setSelectedSection(section)}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center justify-center w-10 h-10 bg-cyan-100 text-cyan-600 rounded-full font-semibold text-lg">
                        {index + 1}
                      </div>
                      <div className="text-xs text-gray-500">
                        {section.keyPoints.length} key points
                      </div>
                    </div>
                    <CardTitle className="text-lg text-gray-900 leading-tight">
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                      {section.content.substring(0, 120)}...
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSection(section);
                      }}
                    >
                      Start Reading
                    </Button>
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Chapter Actions */}
          <div className="flex justify-center gap-4 mt-12">
            <Button
              variant="outline"
              onClick={() => setSelectedChapter(null)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Chapters
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 flex items-center gap-2">
              Take Chapter Quiz
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ontario Driver's Study Guide
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-4">
            Master the official MTO driver's handbook with our comprehensive
            study guide. Learn at your own pace with structured chapters and
            practice questions.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-2xl mx-auto">
            <p className="text-sm text-blue-800">
              📖 All content is based on the Official Ministry of Transportation
              (MTO) Driver's Handbook for Ontario
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {studyGuideData.map((chapter) => (
            <Card
              key={chapter.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
              onClick={() => setSelectedChapter(chapter)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-3xl">{chapter.icon}</div>
                  <Badge className={getDifficultyColor(chapter.difficulty)}>
                    {chapter.difficulty}
                  </Badge>
                </div>
                <CardTitle className="text-xl text-gray-900">
                  {chapter.title}
                </CardTitle>
                <CardDescription>{chapter.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {chapter.estimatedTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" />
                      {chapter.sections.length} sections
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
