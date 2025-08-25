"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AlertTriangle,
  Phone,
  Clock,
  MapPin,
  Zap,
  BookOpen,
  Shield,
} from "lucide-react";
import { StudyGuideChapter } from "@/data/study-guide";

interface EmergencySectionProps {
  chapter: StudyGuideChapter;
}

export const EmergencySection = ({ chapter }: EmergencySectionProps) => {
  return (
    <div className="mb-8 space-y-6">
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-white">
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
                      <AlertTriangle className="h-6 w-6 mr-2" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p>{section.content}</p>
                    {section.keyPoints.length > 0 && (
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <h4 className="font-semibold mb-2 text-red-800">
                          {index === 0 ? "Critical Steps:" : "Key Points:"}
                        </h4>
                        <ul className="space-y-2">
                          {section.keyPoints.map((point, pointIndex) => (
                            <li key={pointIndex} className="text-red-700">
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
                    Emergency Action Steps
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="border-l-4 border-red-500 pl-3">
                      <strong>Step 1</strong> - Ensure safety and call 911
                    </div>
                    <div className="border-l-4 border-orange-500 pl-3">
                      <strong>Step 2</strong> - Move to safe location
                    </div>
                    <div className="border-l-4 border-yellow-500 pl-3">
                      <strong>Step 3</strong> - Set up warning devices
                    </div>
                    <div className="border-l-4 border-green-500 pl-3">
                      <strong>Step 4</strong> - Document and exchange info
                    </div>
                    <div className="border-l-4 border-blue-500 pl-3">
                      <strong>Step 5</strong> - Contact insurance company
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Legal Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded border border-red-200">
                      <div className="font-semibold text-red-800">
                        Must Report If:
                      </div>
                      <div className="text-sm text-red-700">
                        Damage over $2,000 or injury occurs
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                      <div className="font-semibold text-yellow-800">
                        Police Required:
                      </div>
                      <div className="text-sm text-yellow-700">
                        Injury, impairment, or hit and run
                      </div>
                    </div>
                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                      <div className="font-semibold text-blue-800">
                        Insurance:
                      </div>
                      <div className="text-sm text-blue-700">
                        Must notify within 7 days
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
                    <li>• Memorize emergency phone numbers</li>
                    <li>• Know when police must be called</li>
                    <li>• Practice breakdown procedures</li>
                    <li>• Keep emergency kit in vehicle</li>
                    <li>• Know your insurance policy details</li>
                    <li>• Understand legal reporting requirements</li>
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
