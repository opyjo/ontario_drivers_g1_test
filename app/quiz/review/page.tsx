"use client";

// Review Page - Review incorrect questions from previous quizzes
// Uses IncorrectQuestionsReview component with filtering options

import { useState } from "react";
import { IncorrectQuestionsReview } from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Eye,
  SignpostBig,
  BookOpen,
  RotateCcw,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

export default function ReviewPage() {
  const [selectedTab, setSelectedTab] = useState("all");
  const [isReviewing, setIsReviewing] = useState(false);

  // Mock user ID - in real app this would come from auth
  const userId = "user-123";

  // Mock stats - in real app this would come from database
  const reviewStats = {
    totalIncorrect: 25,
    signsIncorrect: 12,
    rulesIncorrect: 13,
    lastUpdated: "2024-01-15",
  };

  const handleStartReview = (questionType: "all" | "signs" | "rules") => {
    setSelectedTab(questionType);
    setIsReviewing(true);
  };

  const handleReviewComplete = () => {
    setIsReviewing(false);
    // In a real app, you might want to refresh the stats or navigate somewhere
  };

  if (isReviewing) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Minimal Header for Active Review */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReviewing(false)}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Review Options
            </Button>
            <Badge
              variant="outline"
              className="text-purple-700 border-purple-300"
            >
              <Eye className="h-4 w-4 mr-2" />
              Review Mode
            </Badge>
          </div>
        </div>

        {/* Review Component */}
        <IncorrectQuestionsReview
          userId={userId}
          questionType={selectedTab as "signs" | "rules" | "all"}
          autoStart={true}
          onComplete={handleReviewComplete}
          className="w-full"
        />
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/quiz">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Review Incorrect Questions</h1>
            <p className="text-gray-600">
              Study the questions you got wrong to improve your understanding
            </p>
          </div>
        </div>
      </div>

      {/* No Questions to Review State */}
      {reviewStats.totalIncorrect === 0 && (
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-green-600">
              Perfect Score!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              You haven't answered any questions incorrectly yet. Keep up the
              excellent work!
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/quiz/practice">
                <Button>Take More Practice Tests</Button>
              </Link>
              <Link href="/quiz/simulation">
                <Button variant="outline">Try G1 Simulation</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Review Options */}
      {reviewStats.totalIncorrect > 0 && (
        <>
          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-red-100 rounded-lg">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total to Review
                    </p>
                    <p className="text-2xl font-bold">
                      {reviewStats.totalIncorrect}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <SignpostBig className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Signs Questions
                    </p>
                    <p className="text-2xl font-bold">
                      {reviewStats.signsIncorrect}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <BookOpen className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Rules Questions
                    </p>
                    <p className="text-2xl font-bold">
                      {reviewStats.rulesIncorrect}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Mode Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose What to Review</CardTitle>
              <p className="text-sm text-gray-600">
                Focus your review on specific question types or review all
                incorrect answers
              </p>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="all">
                    All Questions ({reviewStats.totalIncorrect})
                  </TabsTrigger>
                  <TabsTrigger value="signs">
                    Road Signs ({reviewStats.signsIncorrect})
                  </TabsTrigger>
                  <TabsTrigger value="rules">
                    Rules ({reviewStats.rulesIncorrect})
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-6">
                  <div className="text-center space-y-4">
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        Review All Incorrect Questions
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Go through all {reviewStats.totalIncorrect} questions
                        you've answered incorrectly. This includes both road
                        signs and rules questions in one comprehensive review
                        session.
                      </p>
                      <Button onClick={() => handleStartReview("all")}>
                        <Eye className="h-4 w-4 mr-2" />
                        Review All Questions
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="signs" className="mt-6">
                  <div className="text-center space-y-4">
                    <div className="p-6 bg-blue-50 rounded-lg">
                      <h3 className="font-semibold mb-2">
                        Review Road Signs Only
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Focus on the {reviewStats.signsIncorrect} road sign
                        questions you got wrong. Perfect for improving your sign
                        recognition skills.
                      </p>
                      <Button onClick={() => handleStartReview("signs")}>
                        <SignpostBig className="h-4 w-4 mr-2" />
                        Review Signs Questions
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="rules" className="mt-6">
                  <div className="text-center space-y-4">
                    <div className="p-6 bg-green-50 rounded-lg">
                      <h3 className="font-semibold mb-2">Review Rules Only</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Study the {reviewStats.rulesIncorrect} rules and
                        regulations questions you missed. Great for reinforcing
                        your knowledge of driving laws.
                      </p>
                      <Button onClick={() => handleStartReview("rules")}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Review Rules Questions
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Study Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5" />
                <span>Review Tips</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <h4 className="font-semibold">How to Review Effectively:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Read the explanation for each incorrect answer</li>
                    <li>• Try to understand why the correct answer is right</li>
                    <li>• Take notes on concepts you're struggling with</li>
                    <li>
                      • Review the study guide sections for difficult topics
                    </li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold">After Reviewing:</h4>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Take a new practice test to check improvement</li>
                    <li>• Focus on the question types you missed most</li>
                    <li>• Repeat the review process as needed</li>
                    <li>
                      • Try a G1 simulation when consistently scoring 80%+
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
