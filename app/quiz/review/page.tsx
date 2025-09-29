"use client";

import { Suspense, useMemo, useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";
import useIncorrectQuestions from "@/hooks/quiz/useIncorrectQuestions";
import { useGetAnswerForQuestion } from "@/stores/quiz/actions";
import { useQuizStore } from "@/stores/quiz/quizStore";
import { useCurrentQuestionIndex } from "@/stores/quiz/selectors/navigation";
import {
  useProgressPercentage,
  useTotalQuestions,
} from "@/stores/quiz/selectors/answers";
import { QuizContainer } from "@/components/quiz/core/QuizContainer";
import { QuestionDisplay } from "@/components/quiz/core/QuestionDisplay";
import { AnswerOptions } from "@/components/quiz/core/AnswerOptions";
import { ProgressIndicator } from "@/components/quiz/core/ProgressIndicator";
import { NavigationControls } from "@/components/quiz/core/NavigationControls";
import {
  createQuizAttemptClient,
  removeCorrectlyAnsweredQuestions,
} from "@/lib/quiz/saveAttemptClient";

type QuestionType = "signs" | "rules" | "all";

// Inner component that actually calls useSearchParams
function ReviewIncorrectPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const user = useAuthStore((s) => s.user);

  const questionType = useMemo<QuestionType>(() => {
    const raw = (searchParams.get("questionType") || "all").toLowerCase();
    return ["signs", "rules", "all"].includes(raw)
      ? (raw as QuestionType)
      : "all";
  }, [searchParams]);

  const userId = user?.id || "";

  // Initialize review flow using the dedicated hook (always call hooks)
  const {
    quiz,
    actions,
    storeActions,
    initializeReview,
    hasIncorrectQuestions,
  } = useIncorrectQuestions({ userId, questionType });

  const getAnswerForQuestion = useGetAnswerForQuestion();
  const initializedRef = useRef(false);

  // Get quiz state from store for completion handling
  const isCompleted = useQuizStore((s) => s.status === "completed");
  const result = useQuizStore((s) => s.result);
  const questions = useQuizStore((s) => s.questions);
  const userAnswers = useQuizStore((s) => s.userAnswers);

  // Get proper progress values from store selectors
  const currentQuestionIndex = useCurrentQuestionIndex();
  const totalQuestions = useTotalQuestions();
  const progressPercentage = useProgressPercentage();

  const [hasSavedAttempt, setHasSavedAttempt] = useState(false);

  useEffect(() => {
    if (userId && !initializedRef.current) {
      initializedRef.current = true;
      void initializeReview({ userId, questionType });
    }
  }, [userId, questionType]);

  // Save attempt and update incorrect questions after completion
  useEffect(() => {
    if (!isCompleted || !result) return;
    if (!user || hasSavedAttempt) return;

    let cancelled = false;
    const save = async () => {
      try {
        // Create attempt record for the review quiz
        const attemptId = await createQuizAttemptClient({
          quizType: questionType === "all" ? "mixed" : questionType,
          isPractice: true,
          practiceType: "incorrect_review",
          isTimed: false,
          timeTakenSeconds: null,
          score: result.correctAnswers,
          totalQuestions: result.totalQuestions,
          questionIds: questions.map((q) => q.id),
          answers: questions.map((q) => {
            const ans = userAnswers[q.id]?.selectedOption ?? null;
            const upper = ans ? ans.toString().toUpperCase() : null;
            const isCorrect = upper === q.correct_option;
            return {
              questionId: q.id,
              selectedOption: upper,
              isCorrect,
              questionType: q.question_type,
              snapshot: {
                question_text: q.question_text,
                option_a: q.option_a,
                option_b: q.option_b,
                option_c: q.option_c,
                option_d: q.option_d,
                correct_option: q.correct_option,
              },
            };
          }),
          breakdown: undefined,
        });

        // Remove correctly answered questions from incorrect questions table
        const correctlyAnsweredQuestionIds = questions
          .filter((q) => {
            const ans = userAnswers[q.id]?.selectedOption ?? null;
            const upper = ans ? ans.toString().toUpperCase() : null;
            return upper === q.correct_option;
          })
          .map((q) => q.id);

        if (correctlyAnsweredQuestionIds.length > 0) {
          await removeCorrectlyAnsweredQuestions(correctlyAnsweredQuestionIds);
        }

        if (!cancelled) {
          setHasSavedAttempt(true);
          router.push(`/quiz/results/${attemptId}`);
        }
      } catch (e) {
        console.error("Failed to save review attempt:", e);
      }
    };
    void save();
    return () => {
      cancelled = true;
    };
  }, [
    isCompleted,
    result,
    user,
    hasSavedAttempt,
    questions,
    userAnswers,
    router,
    questionType,
  ]);

  if (!userId) {
    return (
      <div className="container mx-auto px-4 py-12 max-w-2xl text-center">
        <h1 className="text-2xl font-semibold mb-2">Sign in required</h1>
        <p className="text-muted-foreground">
          Please sign in to review your incorrect questions.
        </p>
      </div>
    );
  }

  // Loading/Error states
  if (quiz.isLoading) {
    return (
      <QuizContainer title="Review Incorrect Questions">
        <div className="py-12 text-center">Loading your questions…</div>
      </QuizContainer>
    );
  }

  if (quiz.hasError) {
    return (
      <QuizContainer title="Review Incorrect Questions">
        <div className="py-12 text-center text-destructive">
          {quiz.errorMessage || "Failed to load incorrect questions."}
        </div>
      </QuizContainer>
    );
  }

  if (!hasIncorrectQuestions) {
    return (
      <QuizContainer title="Review Incorrect Questions">
        <div className="py-12 text-center text-muted-foreground">
          No incorrect questions found. Great job!
        </div>
      </QuizContainer>
    );
  }

  const currentQuestion = quiz.currentQuestion;
  const selected = currentQuestion
    ? getAnswerForQuestion(currentQuestion.id)
    : null;

  return (
    <QuizContainer
      title="Review Incorrect Questions"
      subtitle={`Questions: ${totalQuestions}`}
    >
      {currentQuestion ? (
        <>
          <QuestionDisplay question={currentQuestion} />
          <AnswerOptions
            question={currentQuestion}
            selectedOptionId={selected?.selectedOption?.toUpperCase()}
            onSelect={(opt) =>
              storeActions.selectAnswer(currentQuestion.id, String(opt))
            }
            disabled={!currentQuestion}
          />
          <ProgressIndicator
            currentIndex={currentQuestionIndex}
            total={totalQuestions}
            percentage={progressPercentage}
          />
          <NavigationControls
            onPrev={storeActions.previousQuestion}
            onNext={storeActions.nextQuestion}
            onSubmit={() => void storeActions.submitQuiz()}
            canGoPrev={quiz.canGoPrevious}
            canGoNext={quiz.canGoNext}
            canSubmit={quiz.canSubmit}
          />
        </>
      ) : (
        <div className="py-12 text-center">Loading…</div>
      )}
    </QuizContainer>
  );
}

// ✅ Default export wraps inner in Suspense
export default function ReviewIncorrectPage() {
  return (
    <Suspense fallback={<div>Loading review…</div>}>
      <ReviewIncorrectPageInner />
    </Suspense>
  );
}
