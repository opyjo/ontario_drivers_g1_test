"use client";

import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, BookOpen, CheckCircle2, Clock, XCircle } from "lucide-react";
import { useQuizResults } from "@/hooks/useQuizResults";
import { QuestionReview } from "@/components/quiz/QuestionReview";

export default function ResultsPage() {
  const router = useRouter();
  const { id } = useParams();

  const {
    questions,
    userAnswers,
    loading,
    error,
    isTimed,
    isPractice,
    practiceType,
    quizType,
    correctAnswersCount,
    totalQuestions,
    scorePercentage,
    passed,
    breakdown,
    formattedTimeTaken,
  } = useQuizResults(String(id));

  if (loading) {
    return (
      <main id="main-content" className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p>Loading results...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main id="main-content" className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push("/")}>Return Home</Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  // Determine the correct back link based on quiz type
  const getBackToPracticeLink = () => {
    if (!isPractice) return null;

    // For G1 simulation, go back to quiz selection page
    if (quizType === "simulation") {
      return "/quiz";
    }

    if (practiceType === "daily_review") {
      return "/quiz/daily-review";
    }

    // For practice quizzes, go back to the setup page
    if (quizType === "signs") {
      return "/quiz/signs/setup";
    }

    if (quizType === "rules") {
      return "/quiz/rules/setup";
    }

    // For mixed or unknown types, go back to quiz selection
    return "/quiz";
  };

  const backToPracticeLink = getBackToPracticeLink();
  const recommendedGuide =
    quizType === "signs"
      ? {
          href: "/guides/ontario-road-sign-shapes-colours",
          title: "Review Ontario sign shapes and colours",
          description: "Reconnect sign families with the driver action each shape and colour signals.",
        }
      : quizType === "rules"
        ? {
            href: "/guides/most-common-g1-test-mistakes",
            title: "Correct common G1 study mistakes",
            description: "Turn missed rules questions into a focused correction plan before practising again.",
          }
        : {
            href: "/guides/g1-test-passing-score",
            title: "Understand your readiness score",
            description: "See how to interpret the 80 per cent standard and review signs and rules separately.",
          };
  const signsRequired = breakdown?.signsTotal
    ? Math.ceil(breakdown.signsTotal * 0.8)
    : null;
  const rulesRequired = breakdown?.rulesTotal
    ? Math.ceil(breakdown.rulesTotal * 0.8)
    : null;
  const signsPassed =
    signsRequired !== null && typeof breakdown?.signsCorrect === "number"
      ? breakdown.signsCorrect >= signsRequired
      : null;
  const rulesPassed =
    rulesRequired !== null && typeof breakdown?.rulesCorrect === "number"
      ? breakdown.rulesCorrect >= rulesRequired
      : null;

  return (
    <main id="main-content" className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <div className="max-w-3xl w-full space-y-8">
        <div className="w-full flex justify-between gap-4 mb-4">
          <Button onClick={() => router.push("/")} variant="outline">
            Return to Home
          </Button>
          {backToPracticeLink && (
            <Button asChild>
              <Link href={backToPracticeLink}>
                {quizType === "simulation"
                  ? "Try Another Simulation"
                  : practiceType === "daily_review"
                    ? "Back to Daily Review"
                    : "Back to Practice"}
              </Link>
            </Button>
          )}
        </div>
        <Card className="w-full">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl">Quiz Results</CardTitle>
              {isPractice && (
                <div className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                  {practiceType === "category"
                    ? "Practice"
                    : "Incorrect Questions"}
                </div>
              )}
              {isTimed && (
                <div className="px-3 py-1 bg-amber-100 text-amber-600 rounded-full text-sm font-medium flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Time: {formattedTimeTaken}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4 rounded-lg bg-muted/50 p-6">
              <div
                className={`text-5xl font-bold ${
                  isPractice
                    ? "text-blue-600"
                    : passed
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {correctAnswersCount} / {totalQuestions}
              </div>
              <p
                className={`text-xl font-medium ${
                  isPractice
                    ? "text-blue-600"
                    : passed
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                Score: {scorePercentage}%
              </p>
              {!isPractice && (
                <p className={passed ? "font-semibold text-green-700" : "font-semibold text-red-700"}>
                  {passed ? "Passing standard met" : "Passing standard not met"}
                </p>
              )}
              {quizType === "simulation" && breakdown ? (
                <div className="grid w-full max-w-md grid-cols-2 gap-3 pt-2 text-center">
                  <div
                    className={`rounded-lg border p-3 ${
                      signsPassed
                        ? "border-emerald-500/40 bg-emerald-50"
                        : "border-red-300 bg-red-50"
                    }`}
                  >
                    <p className="text-sm text-muted-foreground">Traffic signs</p>
                    <p className="text-lg font-semibold">
                      {breakdown.signsCorrect ?? 0}/{breakdown.signsTotal ?? 20}
                    </p>
                    <p
                      className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${
                        signsPassed ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {signsPassed ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {signsPassed ? "Section passed" : `Need ${signsRequired}`}
                    </p>
                  </div>
                  <div
                    className={`rounded-lg border p-3 ${
                      rulesPassed
                        ? "border-emerald-500/40 bg-emerald-50"
                        : "border-red-300 bg-red-50"
                    }`}
                  >
                    <p className="text-sm text-muted-foreground">Rules of the road</p>
                    <p className="text-lg font-semibold">
                      {breakdown.rulesCorrect ?? 0}/{breakdown.rulesTotal ?? 20}
                    </p>
                    <p
                      className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${
                        rulesPassed ? "text-emerald-700" : "text-red-700"
                      }`}
                    >
                      {rulesPassed ? (
                        <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {rulesPassed ? "Section passed" : `Need ${rulesRequired}`}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <aside className="rounded-xl border border-primary/20 bg-primary/5 p-5">
              <div className="flex items-start gap-3">
                <BookOpen className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h2 className="font-semibold">{recommendedGuide.title}</h2>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    {recommendedGuide.description}
                  </p>
                  <Link
                    href={recommendedGuide.href}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary"
                  >
                    Read the guide
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </aside>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="all">All Questions</TabsTrigger>
                <TabsTrigger value="correct">
                  Correct ({correctAnswersCount})
                </TabsTrigger>
                <TabsTrigger value="incorrect">
                  Incorrect ({totalQuestions - correctAnswersCount})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-4 mt-4">
                {questions.map((q, idx) => (
                  <QuestionReview
                    key={q.id}
                    question={q}
                    userAnswer={userAnswers[q.id]}
                    isCorrect={
                      userAnswers[q.id]?.toUpperCase() === q.correct_option
                    }
                    questionNumber={idx + 1}
                    reviewContext="all"
                  />
                ))}
              </TabsContent>

              <TabsContent value="correct" className="space-y-4 mt-4">
                {questions.map((q, idx) => {
                  const isCorrect =
                    userAnswers[q.id]?.toUpperCase() === q.correct_option;
                  if (!isCorrect) return null;
                  return (
                    <QuestionReview
                      key={q.id}
                      question={q}
                      userAnswer={userAnswers[q.id]}
                      isCorrect={true}
                      questionNumber={idx + 1}
                      reviewContext="correct"
                    />
                  );
                })}
              </TabsContent>

              <TabsContent value="incorrect" className="space-y-4 mt-4">
                {questions.map((q, idx) => {
                  const isCorrect =
                    userAnswers[q.id]?.toUpperCase() === q.correct_option;
                  if (userAnswers[q.id] === undefined || isCorrect) return null;
                  return (
                    <QuestionReview
                      key={q.id}
                      question={q}
                      userAnswer={userAnswers[q.id]}
                      isCorrect={false}
                      questionNumber={idx + 1}
                      reviewContext="incorrect"
                    />
                  );
                })}
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/")}>
              Return Home
            </Button>
            {isPractice ? (
              backToPracticeLink && (
                <Link href={backToPracticeLink}>
                  <Button>
                    {quizType === "simulation"
                      ? "Try Another Simulation"
                      : practiceType === "daily_review"
                        ? "Back to Daily Review"
                      : "Back to Practice"}
                  </Button>
                </Link>
              )
            ) : (
              <Link href="/quiz">
                <Button>Try Another Quiz</Button>
              </Link>
            )}
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
