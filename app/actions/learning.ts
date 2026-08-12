"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isPaidUser } from "@/lib/authorization/helpers";
import {
  buildTopicMastery,
  calculateReadiness,
  databaseQuestionId,
  publicQuestionId,
  questionKey,
  selectSpacedReviewQuestionCandidates,
  type LearningAttempt,
  type LearningQuestion,
  type LearningQuestionType,
  type ReadinessScore,
  type TopicMastery,
} from "@/lib/learning/analytics";
import {
  replayReviewHistory,
  reviewScheduleKey,
  type QuestionReviewSchedule,
  type ReviewAnswerEvent,
} from "@/lib/learning/spaced-repetition";
import type { Question } from "@/types/quiz";
import type { Json } from "@/types/supabase";
import { canonicalLearningTopic } from "@/lib/learning/topics";
import { z } from "zod";

interface AttemptRow {
  created_at: string;
  quiz_type: string | null;
  practice_type: string | null;
  score: number | null;
  total_questions_in_attempt: number | null;
  user_answers: Json | null;
}

interface QuestionRow {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  category: string | null;
  explanation: string | null;
  image_url?: string | null;
  image_description?: string | null;
  learning_topic: string;
  handbook_section: string;
  handbook_url: string;
}

interface QuestionMetadataRow {
  id: number;
  learning_topic: string;
  category: string | null;
}

interface ReviewScheduleRow {
  question_id: number;
  question_type: LearningQuestionType;
  mastery_level: number;
  consecutive_correct: number;
  lapses: number;
  last_result: boolean | null;
  last_response_seconds: number | null;
  last_reviewed_at: string | null;
  next_review_at: string;
}

export interface LearningInsights {
  mastery: TopicMastery[];
  readiness: ReadinessScore;
  recommendedTopic: string | null;
  dailyReview: {
    completedToday: boolean;
    streak: number;
    dueCount: number;
    overdueCount: number;
    masteredCount: number;
    scheduledCount: number;
    newCount: number;
    nextReviewAt: string | null;
  };
}

function parseAttempts(rows: AttemptRow[]): LearningAttempt[] {
  return rows.map((row) => {
    const payload =
      row.user_answers &&
      typeof row.user_answers === "object" &&
      !Array.isArray(row.user_answers)
        ? row.user_answers
        : null;
    const rawAnswers = payload && Array.isArray(payload.answers) ? payload.answers : [];
    const answers = rawAnswers.flatMap((raw) => {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) return [];
      const id = typeof raw.questionId === "number" ? raw.questionId : null;
      const inferredType = id !== null && id > 10_000 ? "rules" : "signs";
      const questionType: LearningQuestionType =
        raw.questionType === "rules" || raw.questionType === "signs"
          ? raw.questionType
          : inferredType;
      if (id === null || typeof raw.isCorrect !== "boolean") return [];
      return [
        {
          questionId: id,
          questionType,
          isCorrect: raw.isCorrect,
          timeSpentSeconds:
            typeof raw.timeSpentSeconds === "number"
              ? raw.timeSpentSeconds
              : undefined,
        },
      ];
    });

    return {
      createdAt: row.created_at,
      quizType: row.quiz_type,
      practiceType: row.practice_type,
      score: row.score ?? 0,
      total: row.total_questions_in_attempt ?? answers.length,
      breakdown:
        payload?.breakdown &&
        typeof payload.breakdown === "object" &&
        !Array.isArray(payload.breakdown)
          ? {
              signsCorrect:
                typeof payload.breakdown.signsCorrect === "number"
                  ? payload.breakdown.signsCorrect
                  : undefined,
              rulesCorrect:
                typeof payload.breakdown.rulesCorrect === "number"
                  ? payload.breakdown.rulesCorrect
                  : undefined,
              signsTotal:
                typeof payload.breakdown.signsTotal === "number"
                  ? payload.breakdown.signsTotal
                  : undefined,
              rulesTotal:
                typeof payload.breakdown.rulesTotal === "number"
                  ? payload.breakdown.rulesTotal
                  : undefined,
            }
          : null,
      answers,
    };
  });
}

function toQuestion(row: QuestionRow, questionType: LearningQuestionType): Question {
  return {
    id: publicQuestionId(row.id, questionType),
    question_type: questionType,
    question_text: row.question_text,
    option_a: row.option_a,
    option_b: row.option_b,
    option_c: row.option_c,
    option_d: row.option_d,
    correct_option: row.correct_option.toUpperCase(),
    category: row.category || (questionType === "signs" ? "Road signs" : "General"),
    explanation:
      row.explanation ||
      "Review the cited section of the Official MTO Driver's Handbook.",
    image_url: questionType === "signs" ? row.image_url ?? null : null,
    image_description:
      questionType === "signs" ? row.image_description ?? null : null,
    learning_topic: canonicalLearningTopic({
      questionType,
      learningTopic: row.learning_topic,
      category: row.category,
    }),
    handbook_section: row.handbook_section,
    handbook_url: row.handbook_url,
  };
}

function toLearningQuestion(
  row: QuestionMetadataRow,
  questionType: LearningQuestionType
): LearningQuestion {
  return {
    id: publicQuestionId(row.id, questionType),
    questionType,
    learningTopic: canonicalLearningTopic({
      questionType,
      learningTopic: row.learning_topic,
      category: row.category,
    }),
  };
}

function reviewScheduleFromRow(row: ReviewScheduleRow): QuestionReviewSchedule {
  return {
    questionId: row.question_id,
    questionType: row.question_type,
    masteryLevel: row.mastery_level,
    consecutiveCorrect: row.consecutive_correct,
    lapses: row.lapses,
    lastResult: row.last_result,
    lastResponseSeconds: row.last_response_seconds,
    lastReviewedAt: row.last_reviewed_at,
    nextReviewAt: row.next_review_at,
  };
}

function reviewSchedulePayload(userId: string, schedule: QuestionReviewSchedule) {
  return {
    user_id: userId,
    question_id: schedule.questionId,
    question_type: schedule.questionType,
    mastery_level: schedule.masteryLevel,
    consecutive_correct: schedule.consecutiveCorrect,
    lapses: schedule.lapses,
    last_result: schedule.lastResult,
    last_response_seconds: schedule.lastResponseSeconds,
    last_reviewed_at: schedule.lastReviewedAt,
    next_review_at: schedule.nextReviewAt,
    updated_at: schedule.lastReviewedAt ?? new Date().toISOString(),
  };
}

function torontoDateKey(date: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function dailyReviewStatus(
  attempts: LearningAttempt[],
  schedules: QuestionReviewSchedule[],
  totalQuestions: number
) {
  const reviewDates = new Set(
    attempts
      .filter((attempt) => attempt.practiceType === "daily_review")
      .map((attempt) => torontoDateKey(new Date(attempt.createdAt)))
  );
  const today = new Date();
  const todayKey = torontoDateKey(today);
  const cursor = new Date(today);
  if (!reviewDates.has(todayKey)) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (reviewDates.has(torontoDateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  const now = today.getTime();
  const due = schedules.filter(
    (schedule) => Date.parse(schedule.nextReviewAt) <= now
  );
  const nextReviewAt = schedules
    .map((schedule) => schedule.nextReviewAt)
    .filter((value) => Date.parse(value) > now)
    .sort()[0] ?? null;

  return {
    completedToday: reviewDates.has(todayKey),
    streak,
    dueCount: due.length,
    overdueCount: due.filter(
      (schedule) => now - Date.parse(schedule.nextReviewAt) >= 86_400_000
    ).length,
    masteredCount: schedules.filter((schedule) => schedule.masteryLevel >= 5)
      .length,
    scheduledCount: schedules.length,
    newCount: Math.max(0, totalQuestions - schedules.length),
    nextReviewAt,
  };
}

async function requireLearningUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Sign in to use personalized learning features");

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("access_level")
    .eq("id", user.id)
    .single();
  if (profileError || !isPaidUser(profile)) {
    throw new Error("A paid pass is required for personalized learning features");
  }

  return { user, supabase };
}

async function loadLearningHistory(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>,
  userId: string
) {
  const [attemptsResult, flagsResult, reviewsResult] = await Promise.all([
    supabase
      .from("quiz_attempts")
      .select(
        "created_at, quiz_type, practice_type, score, total_questions_in_attempt, user_answers"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("user_flagged_questions")
      .select("question_id, question_type")
      .eq("user_id", userId),
    supabase
      .from("user_question_reviews")
      .select(
        "question_id, question_type, mastery_level, consecutive_correct, lapses, last_result, last_response_seconds, last_reviewed_at, next_review_at"
      )
      .eq("user_id", userId),
  ]);

  const firstError =
    attemptsResult.error || flagsResult.error || reviewsResult.error;
  if (firstError) {
    throw new Error(`Could not load learning data: ${firstError.message}`);
  }

  const attempts = parseAttempts(
    (attemptsResult.data ?? []) as unknown as AttemptRow[]
  );
  const flaggedKeys = new Set(
    (flagsResult.data ?? []).map((flag) =>
      questionKey(
        flag.question_id,
        flag.question_type as LearningQuestionType
      )
    )
  );
  const schedules = ((reviewsResult.data ?? []) as ReviewScheduleRow[]).map(
    reviewScheduleFromRow
  );
  const scheduleKeys = new Set(
    schedules.map((schedule) =>
      reviewScheduleKey(schedule.questionId, schedule.questionType)
    )
  );
  const historyEvents: ReviewAnswerEvent[] = attempts.flatMap((attempt) =>
    attempt.answers.map((answer) => ({
      questionId: databaseQuestionId(answer.questionId, answer.questionType),
      questionType: answer.questionType,
      isCorrect: answer.isCorrect,
      responseSeconds: answer.timeSpentSeconds,
      reviewedAt: attempt.createdAt,
    }))
  );
  const historySchedules = replayReviewHistory(historyEvents);
  const missingSchedules = [...historySchedules.values()].filter(
    (schedule) =>
      !scheduleKeys.has(
        reviewScheduleKey(schedule.questionId, schedule.questionType)
      )
  );
  if (missingSchedules.length) {
    const { error: backfillError } = await supabase
      .from("user_question_reviews")
      .upsert(
        missingSchedules.map((schedule) =>
          reviewSchedulePayload(userId, schedule)
        ),
        { onConflict: "user_id,question_id,question_type" }
      );
    if (backfillError) {
      throw new Error(
        `Could not backfill review schedules: ${backfillError.message}`
      );
    }
    schedules.push(...missingSchedules);
  }

  return { attempts, flaggedKeys, schedules };
}

async function loadQuestionMetadata(
  supabase: Awaited<ReturnType<typeof createSupabaseServerClient>>
) {
  const [signsResult, rulesResult] = await Promise.all([
    supabase
      .from("signs_questions")
      .select("id, learning_topic, category")
      .eq("is_active", true),
    supabase
      .from("rules_questions")
      .select("id, learning_topic, category")
      .eq("is_active", true),
  ]);

  const firstError = signsResult.error || rulesResult.error;
  if (firstError) {
    throw new Error(`Could not load question metadata: ${firstError.message}`);
  }

  return [
    ...((signsResult.data ?? []) as QuestionMetadataRow[]).map((row) =>
      toLearningQuestion(row, "signs")
    ),
    ...((rulesResult.data ?? []) as QuestionMetadataRow[]).map((row) =>
      toLearningQuestion(row, "rules")
    ),
  ];
}

const signQuestionColumns =
  "id, question_text, option_a, option_b, option_c, option_d, correct_option, category, explanation, image_url, image_description, learning_topic, handbook_section, handbook_url";
const ruleQuestionColumns =
  "id, question_text, option_a, option_b, option_c, option_d, correct_option, category, explanation, learning_topic, handbook_section, handbook_url";

export async function getLearningInsights(): Promise<LearningInsights> {
  const { user, supabase } = await requireLearningUser();
  const [{ attempts, schedules }, questions] = await Promise.all([
    loadLearningHistory(supabase, user.id),
    loadQuestionMetadata(supabase),
  ]);
  const mastery = buildTopicMastery(questions, attempts);
  return {
    mastery,
    readiness: calculateReadiness(mastery, attempts),
    recommendedTopic: mastery[0]?.topic ?? null,
    dailyReview: dailyReviewStatus(attempts, schedules, questions.length),
  };
}

export async function getDailyReviewQuestions(): Promise<Question[]> {
  const { user, supabase } = await requireLearningUser();
  const [{ flaggedKeys, schedules }, questionMetadata] = await Promise.all([
    loadLearningHistory(supabase, user.id),
    loadQuestionMetadata(supabase),
  ]);
  const candidates = selectSpacedReviewQuestionCandidates(
    questionMetadata,
    schedules,
    flaggedKeys,
    torontoDateKey(new Date()),
    user.id,
    10
  );
  const signIds = candidates
    .filter((candidate) => candidate.questionType === "signs")
    .map((candidate) => databaseQuestionId(candidate.id, "signs"));
  const ruleIds = candidates
    .filter((candidate) => candidate.questionType === "rules")
    .map((candidate) => databaseQuestionId(candidate.id, "rules"));

  const [signsResult, rulesResult] = await Promise.all([
    signIds.length
      ? supabase
          .from("signs_questions")
          .select(signQuestionColumns)
          .in("id", signIds)
          .eq("is_active", true)
      : Promise.resolve({ data: [] as QuestionRow[], error: null }),
    ruleIds.length
      ? supabase
          .from("rules_questions")
          .select(ruleQuestionColumns)
          .in("id", ruleIds)
          .eq("is_active", true)
      : Promise.resolve({ data: [] as QuestionRow[], error: null }),
  ]);
  const firstError = signsResult.error || rulesResult.error;
  if (firstError) {
    throw new Error(`Could not load daily review questions: ${firstError.message}`);
  }

  const questions = [
    ...((signsResult.data ?? []) as unknown as QuestionRow[]).map((row) =>
      toQuestion(row, "signs")
    ),
    ...((rulesResult.data ?? []) as unknown as QuestionRow[]).map((row) =>
      toQuestion(row, "rules")
    ),
  ];
  const questionByKey = new Map(
    questions.map((question) => [
      questionKey(question.id, question.question_type),
      question,
    ])
  );
  const selectedQuestions = candidates.flatMap((candidate) => {
    const question = questionByKey.get(
      questionKey(candidate.id, candidate.questionType)
    );
    return question
      ? [{ ...question, adaptive_reason: candidate.adaptiveReason }]
      : [];
  });

  if (selectedQuestions.length !== candidates.length) {
    throw new Error("Some daily review questions are unavailable");
  }

  return selectedQuestions;
}

export async function getMyFlaggedQuestionIds(): Promise<number[]> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) return [];
  const { data, error } = await supabase
    .from("user_flagged_questions")
    .select("question_id, question_type")
    .eq("user_id", user.id);
  if (error) throw new Error(`Could not load flags: ${error.message}`);
  return (data ?? []).map((flag) =>
    publicQuestionId(flag.question_id, flag.question_type as LearningQuestionType)
  );
}

const flagSchema = z.object({
  questionId: z.number().int().positive(),
  questionType: z.enum(["signs", "rules"]),
  flagged: z.boolean(),
});

export async function setQuestionFlag(input: z.infer<typeof flagSchema>) {
  const parsed = flagSchema.parse(input);
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Sign in to save flagged questions");

  const questionId = databaseQuestionId(parsed.questionId, parsed.questionType);
  if (parsed.flagged) {
    const { error } = await supabase.from("user_flagged_questions").upsert(
      {
        user_id: user.id,
        question_id: questionId,
        question_type: parsed.questionType,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,question_id,question_type" }
    );
    if (error) throw new Error(`Could not save flag: ${error.message}`);
  } else {
    const { error } = await supabase
      .from("user_flagged_questions")
      .delete()
      .eq("user_id", user.id)
      .eq("question_id", questionId)
      .eq("question_type", parsed.questionType);
    if (error) throw new Error(`Could not remove flag: ${error.message}`);
  }
}
