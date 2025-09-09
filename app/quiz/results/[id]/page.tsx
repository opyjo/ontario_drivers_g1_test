"use client";

// Quiz Results Page - Display detailed results for a completed quiz
// Dynamic route that shows results based on quiz ID

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ResultsDisplay } from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Share2,
  Download,
  RotateCcw,
  Eye,
  TrendingUp,
  Trophy,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { QuizResult, QuizMode } from "@/types/quiz";

export default function QuizResultsPage() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const quizId = params.id as string;

  useEffect(() => {
    // In a real app, you would fetch the result from your database using the ID
    // For now, we'll simulate this with mock data
    const fetchResult = async () => {
      try {
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock result data - in real app this would come from database
        const mockResult: QuizResult = {
          id: parseInt(quizId),
          score: 34,
          totalQuestions: 40,
          correctAnswers: 34,
          incorrectAnswers: [],
          signsScore: 18,
          rulesScore: 16,
          percentageScore: 85,
          passed: true,
          userAnswers: [],
          submittedAt: "2024-01-15T10:30:00Z",
          completedAt: "2024-01-15T11:15:00Z",
          mode: "simulation" as QuizMode,
        };

        setResult(mockResult);
      } catch (err) {
        setError("Failed to load quiz results. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (quizId) {
      fetchResult();
    }
  }, [quizId]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "My G1 Quiz Results",
          text: `I scored ${result?.percentageScore}% on my G1 driving test practice!`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleRetake = () => {
    if (result?.mode === "simulation") {
      router.push("/quiz/simulation");
    } else if (result?.mode === "signs_practice") {
      router.push("/quiz/practice/signs");
    } else if (result?.mode === "rules_practice") {
      router.push("/quiz/practice/rules");
    }
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <p>Loading your quiz results...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !result) {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2 text-red-600">
              <AlertCircle className="h-6 w-6" />
              <span>Error Loading Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              {error || "Could not find the quiz results you're looking for."}
            </p>
            <div className="flex justify-center space-x-4">
              <Link href="/quiz">
                <Button>Back to Dashboard</Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
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
            <h1 className="text-3xl font-bold">Quiz Results</h1>
            <p className="text-gray-600">
              {result.mode === "simulation"
                ? "G1 Test Simulation"
                : result.mode === "signs_practice"
                ? "Signs Practice"
                : "Rules Practice"}{" "}
              • {new Date(result.completedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Results Display */}
      <ResultsDisplay
        result={result}
        mode={result.mode}
        onRestart={handleRetake}
        onReviewIncorrect={() => router.push("/quiz/review")}
        onGoHome={() => router.push("/quiz")}
        showDetailedBreakdown={true}
      />

      {/* Additional Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <RotateCcw className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Retake Quiz</h3>
                <p className="text-sm text-gray-600">Try the same quiz again</p>
              </div>
            </div>
            <Button
              variant="outline"
              className="w-full mt-4"
              onClick={handleRetake}
            >
              Retake
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">Review Mistakes</h3>
                <p className="text-sm text-gray-600">Study incorrect answers</p>
              </div>
            </div>
            <Link href="/quiz/review">
              <Button variant="outline" className="w-full mt-4">
                Review
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">View Progress</h3>
                <p className="text-sm text-gray-600">Track improvement</p>
              </div>
            </div>
            <Link href="/quiz">
              <Button variant="outline" className="w-full mt-4">
                Dashboard
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Strengths</h4>
              <ul className="space-y-2 text-sm">
                {result.percentageScore >= 80 && (
                  <li className="flex items-center space-x-2 text-green-600">
                    <Trophy className="h-4 w-4" />
                    <span>Passed with flying colors!</span>
                  </li>
                )}
                {result.signsScore >= 16 && (
                  <li className="flex items-center space-x-2 text-green-600">
                    <Trophy className="h-4 w-4" />
                    <span>Strong road sign knowledge</span>
                  </li>
                )}
                {result.rulesScore >= 16 && (
                  <li className="flex items-center space-x-2 text-green-600">
                    <Trophy className="h-4 w-4" />
                    <span>Good understanding of traffic rules</span>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-3">Areas for Improvement</h4>
              <ul className="space-y-2 text-sm">
                {result.percentageScore < 80 && (
                  <li className="flex items-center space-x-2 text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Need more practice to reach 80% passing score</span>
                  </li>
                )}
                {result.signsScore < 16 && (
                  <li className="flex items-center space-x-2 text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Review road sign meanings and shapes</span>
                  </li>
                )}
                {result.rulesScore < 16 && (
                  <li className="flex items-center space-x-2 text-amber-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>Study traffic laws and regulations</span>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
