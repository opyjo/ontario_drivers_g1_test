"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  useCurrentQuestion,
  useQuizQuestions,
  useUserAnswers,
  useSelectedAnswerForCurrentQuestion,
} from "@/stores/quiz/selectors/answers";
import {
  useCurrentQuestionIndex,
  useCanGoNext,
  useCanGoPrevious,
} from "@/stores/quiz/selectors/navigation";
import {
  useGoToQuestion,
  useNextQuestion,
  usePreviousQuestion,
  useRecordQuestionTime,
  useSelectAnswer,
} from "@/stores/quiz/actions";
import { useAuthStore } from "@/stores";
import {
  getMyFlaggedQuestionIds,
  setQuestionFlag,
} from "@/app/actions/learning";
import { QuestionDisplay } from "./QuestionDisplay";
import { AnswerOptions } from "./AnswerOptions";
import { ProgressIndicator } from "./ProgressIndicator";
import { NavigationControls } from "./NavigationControls";
import { QuestionNavigator } from "./QuestionNavigator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface QuizWorkspaceProps {
  readonly onSubmit: () => unknown | Promise<unknown>;
}

export function QuizWorkspace({ onSubmit }: QuizWorkspaceProps) {
  const questions = useQuizQuestions();
  const currentQuestion = useCurrentQuestion();
  const currentIndex = useCurrentQuestionIndex();
  const userAnswers = useUserAnswers();
  const selectedAnswer = useSelectedAnswerForCurrentQuestion();
  const canGoNext = useCanGoNext();
  const canGoPrevious = useCanGoPrevious();
  const selectAnswer = useSelectAnswer();
  const nextQuestion = useNextQuestion();
  const previousQuestion = usePreviousQuestion();
  const goToQuestion = useGoToQuestion();
  const recordQuestionTime = useRecordQuestionTime();
  const user = useAuthStore((state) => state.user);
  const [flaggedIds, setFlaggedIds] = useState<Set<number>>(() => new Set());
  const [submitDialogOpen, setSubmitDialogOpen] = useState(false);
  const questionStartedAt = useRef(Date.now());
  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const previousQuestionId = useRef<number | null>(currentQuestion?.id ?? null);

  useEffect(() => {
    questionStartedAt.current = Date.now();
    const questionId = currentQuestion?.id;
    return () => {
      if (!questionId) return;
      recordQuestionTime(questionId, (Date.now() - questionStartedAt.current) / 1_000);
    };
  }, [currentQuestion?.id, recordQuestionTime]);

  useEffect(() => {
    const questionId = currentQuestion?.id ?? null;
    if (
      previousQuestionId.current !== null &&
      questionId !== null &&
      previousQuestionId.current !== questionId
    ) {
      questionHeadingRef.current?.focus();
    }
    previousQuestionId.current = questionId;
  }, [currentQuestion?.id]);

  useEffect(() => {
    if (!user) {
      setFlaggedIds(new Set());
      return;
    }
    let cancelled = false;
    void getMyFlaggedQuestionIds()
      .then((ids) => {
        if (!cancelled) setFlaggedIds(new Set(ids));
      })
      .catch(() => {
        if (!cancelled) setFlaggedIds(new Set());
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  const progress = useMemo(() => {
    const answeredIds = new Set(Object.keys(userAnswers).map(Number));
    const sections = ["signs", "rules"].map((type) => {
      const sectionQuestions = questions.filter(
        (question) => question.question_type === type
      );
      return {
        label: type === "signs" ? "Road signs" : "Rules of the road",
        total: sectionQuestions.length,
        answered: sectionQuestions.reduce(
          (count, question) => count + Number(answeredIds.has(question.id)),
          0
        ),
      };
    });
    const unansweredIndices = questions.flatMap((question, index) =>
      answeredIds.has(question.id) ? [] : [index]
    );

    return {
      answeredIds,
      answered: answeredIds.size,
      unansweredIndices,
      sections: sections.filter((section) => section.total > 0),
    };
  }, [questions, userAnswers]);

  if (!currentQuestion) return null;

  const allAnswered = progress.unansweredIndices.length === 0;
  const percentage = questions.length
    ? (progress.answered / questions.length) * 100
    : 0;

  const toggleCurrentFlag = () => {
    const nextFlagged = !flaggedIds.has(currentQuestion.id);
    setFlaggedIds((current) => {
      const next = new Set(current);
      if (nextFlagged) next.add(currentQuestion.id);
      else next.delete(currentQuestion.id);
      return next;
    });
    if (user) {
      void setQuestionFlag({
        questionId: currentQuestion.id,
        questionType: currentQuestion.question_type,
        flagged: nextFlagged,
      }).catch(() => {
        setFlaggedIds((current) => {
          const rollback = new Set(current);
          if (nextFlagged) rollback.delete(currentQuestion.id);
          else rollback.add(currentQuestion.id);
          return rollback;
        });
      });
    }
  };

  const submitWithTiming = () => {
    recordQuestionTime(
      currentQuestion.id,
      (Date.now() - questionStartedAt.current) / 1_000
    );
    questionStartedAt.current = Date.now();
    return onSubmit();
  };

  const reviewFirstUnanswered = () => {
    const firstUnanswered = progress.unansweredIndices[0];
    if (firstUnanswered !== undefined) goToQuestion(firstUnanswered);
    setSubmitDialogOpen(false);
  };

  return (
    <>
      <div className="space-y-5 pb-2">
        <ProgressIndicator
          currentIndex={currentIndex}
          total={questions.length}
          percentage={percentage}
          answered={progress.answered}
          sections={progress.sections}
        />

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_15rem] lg:items-start">
          <div className="min-w-0 space-y-5">
            <QuestionDisplay
              question={currentQuestion}
              flagged={flaggedIds.has(currentQuestion.id)}
              onToggleFlag={toggleCurrentFlag}
              headingRef={questionHeadingRef}
            />
            <AnswerOptions
              question={currentQuestion}
              selectedOptionId={selectedAnswer?.selectedOption.toUpperCase()}
              onSelect={(option) =>
                selectAnswer(currentQuestion.id, String(option))
              }
            />
          </div>

          <QuestionNavigator
            questions={questions}
            currentIndex={currentIndex}
            answeredIds={progress.answeredIds}
            flaggedIds={flaggedIds}
            onGoToQuestion={goToQuestion}
          />
        </div>

        <NavigationControls
          onPrev={previousQuestion}
          onNext={nextQuestion}
          onSubmit={() => setSubmitDialogOpen(true)}
          canGoPrev={canGoPrevious}
          canGoNext={canGoNext}
          allAnswered={allAnswered}
        />
      </div>

      <AlertDialog open={submitDialogOpen} onOpenChange={setSubmitDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {allAnswered
                ? "Submit your quiz?"
                : `${progress.unansweredIndices.length} unanswered ${
                    progress.unansweredIndices.length === 1
                      ? "question"
                      : "questions"
                  }`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {allAnswered
                ? "Your answers will be graded and cannot be changed after submission."
                : "Answer every question before submitting. You can use the navigator to revisit unanswered or flagged questions."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep reviewing</AlertDialogCancel>
            {allAnswered ? (
              <AlertDialogAction onClick={() => void submitWithTiming()}>
                Submit quiz
              </AlertDialogAction>
            ) : (
              <AlertDialogAction onClick={reviewFirstUnanswered}>
                Go to first unanswered
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
