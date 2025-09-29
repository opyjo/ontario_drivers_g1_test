"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import supabaseClient from "@/lib/supabase-client";

interface SnapshotQuestion {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string; // "A" | "B" | "C" | "D"
}

interface AttemptPayload {
  id: number;
  user_answers: {
    answers: Array<{
      questionId: number;
      selectedOption: string | null;
      isCorrect: boolean;
      questionType?: "signs" | "rules" | null;
      snapshot: SnapshotQuestion | null;
    }>;
    breakdown: {
      signsCorrect?: number;
      rulesCorrect?: number;
      signsTotal?: number;
      rulesTotal?: number;
    } | null;
  } | null;
  question_ids: number[] | null;
  is_timed: boolean | null;
  time_taken_seconds: number | null;
  is_practice: boolean | null;
  practice_type: string | null;
  quiz_type: string | null;
  created_at: string;
  score: number | null;
  total_questions_in_attempt: number | null;
}

async function fetchAttempt(attemptId: string): Promise<AttemptPayload> {
  const { data, error } = await supabaseClient
    .from("quiz_attempts")
    .select(
      "id, user_answers, question_ids, is_timed, time_taken_seconds, is_practice, practice_type, quiz_type, created_at, score, total_questions_in_attempt"
    )
    .eq("id", parseInt(attemptId, 10))
    .single();

  if (error) throw new Error(error.message);
  if (!data) throw new Error("Quiz attempt not found.");
  return data as AttemptPayload;
}

export function useQuizResults(attemptId: string) {
  const {
    data: attempt,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quiz-attempt", attemptId],
    queryFn: () => fetchAttempt(attemptId),
    enabled: !!attemptId,
    staleTime: 5 * 60 * 1000,
  });

  const results = useMemo(() => {
    if (!attempt) {
      return {
        questions: [] as SnapshotQuestion[],
        userAnswers: {} as Record<number, string | undefined>,
        loading: isLoading,
        error: error ? String(error) : null,
        isTimed: false,
        isPractice: false,
        practiceType: null as string | null,
        quizType: null as string | null,
        correctAnswersCount: 0,
        totalQuestions: 0,
        scorePercentage: 0,
        passed: false,
        formattedTimeTaken: "Not recorded",
      };
    }

    const answersArray = attempt.user_answers?.answers ?? [];
    const snapshotQuestions: SnapshotQuestion[] = answersArray
      .map((a) => (a.snapshot ? { id: a.questionId, ...a.snapshot } : null))
      .filter(Boolean) as SnapshotQuestion[];

    const userAnswersMap: Record<number, string | undefined> = {};
    for (const a of answersArray) {
      userAnswersMap[a.questionId] = a.selectedOption ?? undefined;
    }

    const totalQuestions =
      attempt.total_questions_in_attempt ?? snapshotQuestions.length;

    const correctAnswersCount =
      attempt.score ??
      snapshotQuestions.filter((q) => {
        const ans = userAnswersMap[q.id]?.toUpperCase();
        return ans === q.correct_option;
      }).length;

    const scorePercentage =
      totalQuestions > 0
        ? Math.round((correctAnswersCount / totalQuestions) * 100)
        : 0;

    const passed = !attempt.is_practice && correctAnswersCount >= 15;

    const seconds = attempt.time_taken_seconds ?? 0;
    const formattedTimeTaken = seconds
      ? `${Math.floor(seconds / 60)}m ${seconds % 60}s`
      : "Not recorded";

    return {
      questions: snapshotQuestions,
      userAnswers: userAnswersMap,
      loading: isLoading,
      error: error ? String(error) : null,
      isTimed: Boolean(attempt.is_timed),
      isPractice: Boolean(attempt.is_practice),
      practiceType: attempt.practice_type,
      quizType: attempt.quiz_type,
      correctAnswersCount,
      totalQuestions,
      scorePercentage,
      passed,
      formattedTimeTaken,
    };
  }, [attempt, isLoading, error]);

  return results;
}
