"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  buildTopicMastery,
  calculateReadiness,
  databaseQuestionId,
  publicQuestionId,
  questionKey,
  selectAdaptiveQuestions,
  type LearningAttempt,
  type LearningQuestion,
  type LearningQuestionType,
  type ReadinessScore,
  type TopicMastery,
} from "@/lib/learning/analytics";
import type { Question } from "@/types/quiz";
import type { Json } from "@/types/supabase";
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

export interface LearningInsights {
  mastery: TopicMastery[];
  readiness: ReadinessScore;
  recommendedTopic: string | null;
  dailyReview: {
    completedToday: boolean;
    streak: number;
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
    learning_topic: row.learning_topic,
    handbook_section: row.handbook_section,
    handbook_url: row.handbook_url,
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

function dailyReviewStatus(attempts: LearningAttempt[]) {
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
  return { completedToday: reviewDates.has(todayKey), streak };
}

async function requireUserAndData() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) throw new Error("Sign in to use personalized learning features");

  const questionColumns =
    "id, question_text, option_a, option_b, option_c, option_d, correct_option, category, explanation, image_url, image_description, learning_topic, handbook_section, handbook_url";
  const ruleColumns =
    "id, question_text, option_a, option_b, option_c, option_d, correct_option, category, explanation, learning_topic, handbook_section, handbook_url";
  const [signsResult, rulesResult, attemptsResult, flagsResult] = await Promise.all([
    supabase.from("signs_questions").select(questionColumns).eq("is_active", true),
    supabase.from("rules_questions").select(ruleColumns).eq("is_active", true),
    supabase
      .from("quiz_attempts")
      .select(
        "created_at, quiz_type, practice_type, score, total_questions_in_attempt, user_answers"
      )
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("user_flagged_questions")
      .select("question_id, question_type")
      .eq("user_id", user.id),
  ]);

  const firstError =
    signsResult.error || rulesResult.error || attemptsResult.error || flagsResult.error;
  if (firstError) throw new Error(`Could not load learning data: ${firstError.message}`);

  const questions = [
    ...((signsResult.data ?? []) as unknown as QuestionRow[]).map((row) =>
      toQuestion(row, "signs")
    ),
    ...((rulesResult.data ?? []) as unknown as QuestionRow[]).map((row) =>
      toQuestion(row, "rules")
    ),
  ];
  const attempts = parseAttempts((attemptsResult.data ?? []) as unknown as AttemptRow[]);
  const flaggedKeys = new Set(
    (flagsResult.data ?? []).map((flag) =>
      questionKey(flag.question_id, flag.question_type as LearningQuestionType)
    )
  );
  return { user, supabase, questions, attempts, flaggedKeys };
}

export async function getLearningInsights(): Promise<LearningInsights> {
  const { questions, attempts } = await requireUserAndData();
  const metadata: LearningQuestion[] = questions.map((question) => ({
    id: question.id,
    questionType: question.question_type,
    learningTopic: question.learning_topic,
  }));
  const mastery = buildTopicMastery(metadata, attempts);
  return {
    mastery,
    readiness: calculateReadiness(mastery, attempts),
    recommendedTopic: mastery[0]?.topic ?? null,
    dailyReview: dailyReviewStatus(attempts),
  };
}

export async function getDailyReviewQuestions(): Promise<Question[]> {
  const { user, questions, attempts, flaggedKeys } = await requireUserAndData();
  return selectAdaptiveQuestions(
    questions,
    attempts,
    flaggedKeys,
    torontoDateKey(new Date()),
    user.id,
    10
  );
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
