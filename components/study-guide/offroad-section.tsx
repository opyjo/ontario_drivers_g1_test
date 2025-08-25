"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Mountain,
  Trees,
  Snowflake,
  Compass,
  MapPin,
  BookOpen,
  Clock,
} from "lucide-react";
import { StudyGuideChapter } from "@/data/study-guide";

interface OffroadSectionProps {
  chapter: StudyGuideChapter;
}

export const OffroadSection = ({ chapter }: OffroadSectionProps) => {
  return (
    <div className="mb-8 space-y-6">
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {chapter.title}
            </h1>
            <p className="text-xl text-gray-600">{chapter.description}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Main sections from chapter data */}
              {chapter.sections.map((section, index) => (
                <Card key={section.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      {index === 0 && <Mountain className="h-6 w-6 mr-2" />}
                      {index === 1 && <Snowflake className="h-6 w-6 mr-2" />}
                      {index === 2 && <Trees className="h-6 w-6 mr-2" />}
                      {index > 2 && <Compass className="h-6 w-6 mr-2" />}
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{section.content}</p>
                    {section.keyPoints.length > 0 && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Key Points:</h4>
                        <ul className="space-y-2">
                          {section.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex}>
                              <strong>•</strong> {point}
                            </li>
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
                    Age Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-blue-500 pl-3">
                      <strong>Snowmobile</strong> - 16+ with license
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <strong>ATV</strong> - 16+ or 12-15 with supervision
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <strong>Motorboat</strong> - 16+ with license
                    </div>
                    <div className="border-l-4 border-purple-500 pl-3">
                      <strong>PWC</strong> - 16+ with boating license
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trees className="h-5 w-5 mr-2" />
                    Trail Etiquette
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-green-50 p-3 rounded">
                      <div className="font-semibold">Yield Right-of-Way</div>
                      <div className="text-sm text-gray-600">
                        To hikers, horses, and uphill traffic
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <div className="font-semibold">Control Speed</div>
                      <div className="text-sm text-gray-600">
                        Maintain safe speeds for conditions
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <div className="font-semibold">Stay on Trails</div>
                      <div className="text-sm text-gray-600">
                        Protect vegetation and wildlife
                      </div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded">
                      <div className="font-semibold">Be Courteous</div>
                      <div className="text-sm text-gray-600">
                        Share trails respectfully
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
                    <li>• Know age requirements for different vehicles</li>
                    <li>
                      • Understand licensing and registration requirements
                    </li>
                    <li>• Learn safety equipment requirements</li>
                    <li>• Study winter driving techniques</li>
                    <li>• Know where off-road vehicles can operate</li>
                    <li>• Understand environmental responsibilities</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
