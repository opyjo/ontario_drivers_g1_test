"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Heart,
  Users,
  Star,
  Award,
  Clock,
  BookOpen,
} from "lucide-react";
import { StudyGuideChapter } from "@/data/study-guide";

interface SafeDrivingSectionProps {
  chapter: StudyGuideChapter;
}

export const SafeDrivingSection = ({ chapter }: SafeDrivingSectionProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-white">
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
                    {index === 0 && <Shield className="h-6 w-6 mr-2" />}
                    {index === 1 && <Heart className="h-6 w-6 mr-2" />}
                    {index === 2 && <Users className="h-6 w-6 mr-2" />}
                    {index > 2 && <Star className="h-6 w-6 mr-2" />}
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p>{section.content}</p>
                  {section.keyPoints.length > 0 && (
                    <div className="bg-emerald-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        {index === 0
                          ? "Core Safety Principles:"
                          : "Key Points:"}
                      </h4>
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

            {/* Defensive Driving Techniques */}
            <Card>
              <CardHeader>
                <CardTitle>Defensive Driving Techniques</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Defensive driving is about staying alert and anticipating
                  potential hazards:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Scanning & Awareness</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Check mirrors every 5-8 seconds</li>
                      <li>• Scan 12-15 seconds ahead</li>
                      <li>• Use peripheral vision</li>
                      <li>• Watch for pedestrians and cyclists</li>
                    </ul>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold">Space Management</h4>
                    <ul className="text-sm space-y-1 mt-2">
                      <li>• Maintain 3-second following distance</li>
                      <li>• Increase space in bad weather</li>
                      <li>• Leave escape routes open</li>
                      <li>• Position vehicle strategically</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  Safety Checklist
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="border-l-4 border-green-500 pl-3">
                    <strong>Before Starting</strong> - Vehicle inspection &
                    adjustment
                  </div>
                  <div className="border-l-4 border-blue-500 pl-3">
                    <strong>While Driving</strong> - Scan, signal, and space
                    management
                  </div>
                  <div className="border-l-4 border-yellow-500 pl-3">
                    <strong>In Traffic</strong> - Defensive positioning and
                    awareness
                  </div>
                  <div className="border-l-4 border-red-500 pl-3">
                    <strong>Parking</strong> - Secure vehicle and check
                    surroundings
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Sharing the Road
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="bg-blue-50 p-3 rounded">
                    <div className="font-semibold">Pedestrians</div>
                    <div className="text-sm text-gray-600">
                      Always yield right-of-way
                    </div>
                  </div>
                  <div className="bg-green-50 p-3 rounded">
                    <div className="font-semibold">Cyclists</div>
                    <div className="text-sm text-gray-600">
                      Give 1 meter clearance when passing
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded">
                    <div className="font-semibold">Motorcycles</div>
                    <div className="text-sm text-gray-600">
                      Check blind spots carefully
                    </div>
                  </div>
                  <div className="bg-purple-50 p-3 rounded">
                    <div className="font-semibold">Large Vehicles</div>
                    <div className="text-sm text-gray-600">
                      Avoid blind spots and allow extra space
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
                  <li>• Practice defensive driving techniques</li>
                  <li>• Learn the 3-second following rule</li>
                  <li>• Understand right-of-way rules</li>
                  <li>• Know how to share the road safely</li>
                  <li>• Study vehicle maintenance basics</li>
                  <li>• Practice in different weather conditions</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
