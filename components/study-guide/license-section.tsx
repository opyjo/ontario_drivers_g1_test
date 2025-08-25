"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FileText,
  Users,
  Calendar,
  CheckCircle,
  Clock,
  BookOpen,
} from "lucide-react";
import { StudyGuideChapter } from "@/data/study-guide";

interface LicenseSectionProps {
  chapter: StudyGuideChapter;
}

export const LicenseSection = ({ chapter }: LicenseSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {chapter.title}
          </h1>
          <p className="text-xl text-gray-600">{chapter.description}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* Requirements Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-6 w-6 mr-2" />
                  {chapter.sections[0]?.title || "Requirements Overview"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{chapter.sections[0]?.content}</p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Key Requirements:</h4>
                  <ul className="space-y-2">
                    {chapter.sections[0]?.keyPoints.map((point, index) => (
                      <li key={index}>
                        <strong>•</strong> {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* License Classifications */}
            {chapter.sections[1] && (
              <Card>
                <CardHeader>
                  <CardTitle>{chapter.sections[1].title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{chapter.sections[1].content}</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-blue-700">
                        G1 License
                      </h4>
                      <p className="text-sm mt-2">
                        Learner's permit with restrictions
                      </p>
                      <p className="text-xs text-blue-600 mt-1">Age 16+</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-green-700">
                        G2 License
                      </h4>
                      <p className="text-sm mt-2">
                        Intermediate license with some restrictions
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        After 12 months
                      </p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <h4 className="font-semibold text-purple-700">
                        Full G License
                      </h4>
                      <p className="text-sm mt-2">Full driving privileges</p>
                      <p className="text-xs text-purple-600 mt-1">
                        After road test
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Graduated Licensing System */}
            {chapter.sections[2] && (
              <Card>
                <CardHeader>
                  <CardTitle>{chapter.sections[2].title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{chapter.sections[2].content}</p>
                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Key Points:</h4>
                    <ul className="space-y-1 text-sm">
                      {chapter.sections[2].keyPoints.map((point, index) => (
                        <li key={index}>• {point}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Additional sections */}
            {chapter.sections.slice(3).map((section, index) => (
              <Card key={section.id}>
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{section.content}</p>
                  {section.keyPoints.length > 0 && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Key Points:</h4>
                      <ul className="space-y-1 text-sm">
                        {section.keyPoints.map((point, pointIndex) => (
                          <li key={pointIndex}>• {point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Process Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-blue-500 pl-3">
                    <strong>Day 1</strong> - Take G1 written test
                  </div>
                  <div className="border-l-4 border-green-500 pl-3">
                    <strong>12 months later</strong> - Eligible for G2 road test
                  </div>
                  <div className="border-l-4 border-purple-500 pl-3">
                    <strong>12+ months later</strong> - Eligible for full G test
                  </div>
                  <div className="border-l-4 border-orange-500 pl-3">
                    <strong>Every 5 years</strong> - License renewal required
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Age Requirements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="font-semibold">G1 License</div>
                    <div className="text-sm text-gray-600">Minimum age 16</div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold">G2 License</div>
                    <div className="text-sm text-gray-600">
                      After 12 months with G1
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <div className="font-semibold">Full G License</div>
                    <div className="text-sm text-gray-600">
                      After successful road test
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Study Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Read the official MTO handbook thoroughly</li>
                  <li>• Take practice tests online</li>
                  <li>• Know the graduated licensing system</li>
                  <li>• Understand all road signs and signals</li>
                  <li>• Practice with a qualified instructor</li>
                  <li>• Get familiar with Ontario traffic laws</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
