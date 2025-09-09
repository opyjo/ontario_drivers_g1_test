"use client";

// G1 Simulation Page - Full G1 driving test simulation
// Uses G1SimulationQuiz component with official test format

import { useState } from "react";
import { G1SimulationQuiz } from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowLeft,
  Car,
  Clock,
  Target,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  SignpostBig,
} from "lucide-react";
import Link from "next/link";

export default function G1SimulationPage() {
  const [isComplete, setIsComplete] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleComplete = (result: any) => {
    console.log("G1 Simulation completed:", result);
    setIsComplete(true);
    // In a real app, you would save the result to the database here
  };

  const handleStart = () => {
    setQuizStarted(true);
  };

  if (isComplete) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">
              G1 Test Simulation Complete!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-gray-600">
                You've completed the full G1 driving test simulation. Check your
                results to see how you performed!
              </p>
              <div className="flex justify-center space-x-4">
                <Link href="/quiz/simulation">
                  <Button>Retake Simulation</Button>
                </Link>
                <Link href="/quiz/review">
                  <Button variant="outline">Review Mistakes</Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizStarted) {
    return (
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Minimal Header for Active Quiz */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Badge
              variant="outline"
              className="text-orange-700 border-orange-300"
            >
              <Car className="h-4 w-4 mr-2" />
              G1 Test Simulation
            </Badge>
          </div>
          <div className="text-sm text-gray-600">
            Official Format: 20 Signs + 20 Rules = 40 Questions
          </div>
        </div>

        {/* Quiz Component */}
        <G1SimulationQuiz
          autoStart={true}
          onComplete={handleComplete}
          className="w-full"
        />
      </div>
    );
  }

  // Pre-Test Instructions Page
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
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
            <h1 className="text-3xl font-bold">G1 Test Simulation</h1>
            <p className="text-gray-600">
              Official format practice test for the Ontario G1 driving exam
            </p>
          </div>
        </div>
      </div>

      {/* Test Format Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Car className="h-6 w-6 text-orange-600" />
            <span>Official G1 Test Format</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <SignpostBig className="h-8 w-8 text-blue-600" />
              <div>
                <div className="font-semibold text-lg">20 Road Signs</div>
                <div className="text-sm text-gray-600">
                  Sign identification questions
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
              <BookOpen className="h-8 w-8 text-green-600" />
              <div>
                <div className="font-semibold text-lg">20 Rules Questions</div>
                <div className="text-sm text-gray-600">
                  Traffic laws and regulations
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-blue-600">40</div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-green-600">80%</div>
              <div className="text-sm text-gray-600">Required to Pass</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl font-bold text-purple-600">32</div>
              <div className="text-sm text-gray-600">
                Correct Answers Needed
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-amber-600" />
            <span>Before You Begin</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Clock className="h-4 w-4" />
            <AlertTitle>No Time Limit</AlertTitle>
            <AlertDescription>
              The G1 test is not timed. Take your time to read each question
              carefully and think through your answers.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <h4 className="font-semibold">Test Instructions:</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Read each question carefully before selecting your answer
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  You can navigate between questions and change answers before
                  submitting
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Make sure you answer all 40 questions before submitting
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  You need 32 correct answers (80%) to pass the simulation
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Review your incorrect answers after completing the test
                </span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Readiness Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-6 w-6 text-green-600" />
            <span>Are You Ready?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600">
            Make sure you're in a quiet environment where you can focus. This
            simulation closely mimics the real G1 test experience to help
            prepare you for exam day.
          </p>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Recommendation</AlertTitle>
            <AlertDescription>
              We recommend consistently scoring 80% or higher on practice tests
              before taking the real G1 exam.
            </AlertDescription>
          </Alert>

          <div className="flex justify-center pt-4">
            <Button
              size="lg"
              onClick={handleStart}
              className="text-lg px-8 py-3"
            >
              <Car className="h-5 w-5 mr-2" />
              Begin G1 Test Simulation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
