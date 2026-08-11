"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Json } from "@/types/supabase";
import { z } from "zod";

export type QuizType = "signs" | "rules" | "simulation" | "mixed";

export interface UserAnswerRecord {
  questionId: number;
  selectedOption: string | null; // e.g. "A" | "B" | ... or null if skipped
  isCorrect: boolean;
  questionType?: "signs" | "rules"; // optional for mixed attempts
  timeSpentSeconds?: number;
  // Minimal snapshot to support results rendering
  snapshot?: {
    question_text: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_option: string; // "A"|"B"|"C"|"D"
    explanation?: string;
    category?: string;
    learning_topic?: string;
    handbook_section?: string;
    handbook_url?: string;
  };
}

export interface CreateQuizAttemptInput {
  quizType: QuizType;
  isPractice: boolean;
  practiceType?: string | null; // e.g. "quick", "medium", "extended", "review_incorrect"
  isTimed?: boolean;
  timeTakenSeconds?: number | null;
  score: number;
  totalQuestions: number;
  questionIds: number[];
  userAnswers: UserAnswerRecord[];
  // optional extra details stored within user_answers JSON
  breakdown?: {
    signsCorrect?: number;
    rulesCorrect?: number;
    signsTotal?: number;
    rulesTotal?: number;
  };
}

export interface CreateQuizAttemptResult {
  id: number;
}

const createAttemptSchema = z.object({
  quizType: z.enum(["signs", "rules", "simulation", "mixed"]),
  isPractice: z.boolean(),
  practiceType: z.string().trim().max(50).nullable().optional(),
  isTimed: z.boolean().optional(),
  timeTakenSeconds: z.number().int().min(0).max(86_400).nullable().optional(),
  userAnswers: z
    .array(
      z.object({
        questionId: z.number().int().positive(),
        selectedOption: z.enum(["A", "B", "C", "D"]).nullable(),
        questionType: z.enum(["signs", "rules"]),
        timeSpentSeconds: z.number().int().min(0).max(3_600).optional(),
      })
    )
    .min(1)
    .max(100),
});

interface AuthoritativeQuestion {
  id: number;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string | null;
  category: string | null;
  learning_topic: string;
  handbook_section: string;
  handbook_url: string;
}

// Inserts a quiz attempt for the authenticated user and returns the attempt id
export async function createQuizAttempt(
  input: CreateQuizAttemptInput
): Promise<CreateQuizAttemptResult> {
  const parsed = createAttemptSchema.safeParse(input);
  if (!parsed.success) {
    throw new Error("Quiz attempt data is invalid");
  }

  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Failed to get user: ${userError.message}`);
  }

  if (!user) {
    throw new Error("Must be signed in to save quiz attempts");
  }

  const uniqueKeys = new Set(
    parsed.data.userAnswers.map(
      (answer) => `${answer.questionType}:${answer.questionId}`
    )
  );
  if (uniqueKeys.size !== parsed.data.userAnswers.length) {
    throw new Error("Quiz attempt contains duplicate questions");
  }

  const signIds = parsed.data.userAnswers
    .filter((answer) => answer.questionType === "signs")
    .map((answer) => answer.questionId);
  const ruleIds = parsed.data.userAnswers
    .filter((answer) => answer.questionType === "rules")
    .map((answer) =>
      answer.questionId > 10_000 ? answer.questionId - 10_000 : answer.questionId
    );
  const questionColumns =
    "id, question_text, option_a, option_b, option_c, option_d, correct_option, explanation, category, learning_topic, handbook_section, handbook_url";

  const [{ data: signs, error: signsError }, { data: rules, error: rulesError }] =
    await Promise.all([
      signIds.length
        ? supabase
            .from("signs_questions")
            .select(questionColumns)
            .in("id", signIds)
            .eq("is_active", true)
        : Promise.resolve({ data: [], error: null }),
      ruleIds.length
        ? supabase
            .from("rules_questions")
            .select(questionColumns)
            .in("id", ruleIds)
            .eq("is_active", true)
        : Promise.resolve({ data: [], error: null }),
    ]);

  if (signsError || rulesError) {
    throw new Error("Could not verify quiz questions");
  }

  const signMap = new Map(
    ((signs ?? []) as AuthoritativeQuestion[]).map((question) => [
      question.id,
      question,
    ])
  );
  const ruleMap = new Map(
    ((rules ?? []) as AuthoritativeQuestion[]).map((question) => [
      question.id,
      question,
    ])
  );

  const answers = parsed.data.userAnswers.map((answer) => {
    const databaseId =
      answer.questionType === "rules" && answer.questionId > 10_000
        ? answer.questionId - 10_000
        : answer.questionId;
    const question =
      answer.questionType === "rules"
        ? ruleMap.get(databaseId)
        : signMap.get(databaseId);

    if (!question) {
      throw new Error("Quiz attempt contains an unknown question");
    }

    const questionId =
      answer.questionType === "rules" ? databaseId + 10_000 : databaseId;
    return {
      questionId,
      databaseId,
      selectedOption: answer.selectedOption,
      isCorrect: answer.selectedOption === question.correct_option.toUpperCase(),
      questionType: answer.questionType,
      timeSpentSeconds: answer.timeSpentSeconds,
      snapshot: {
        question_text: question.question_text,
        option_a: question.option_a,
        option_b: question.option_b,
        option_c: question.option_c,
        option_d: question.option_d,
        correct_option: question.correct_option.toUpperCase(),
        explanation:
          question.explanation ||
          "Review the cited section of the Official MTO Driver's Handbook.",
        category:
          question.category ||
          (answer.questionType === "signs" ? "Road signs" : "General"),
        learning_topic: question.learning_topic,
        handbook_section: question.handbook_section,
        handbook_url: question.handbook_url,
      },
    };
  });

  const score = answers.filter((answer) => answer.isCorrect).length;
  const breakdown = {
    signsCorrect: answers.filter(
      (answer) => answer.questionType === "signs" && answer.isCorrect
    ).length,
    rulesCorrect: answers.filter(
      (answer) => answer.questionType === "rules" && answer.isCorrect
    ).length,
    signsTotal: answers.filter((answer) => answer.questionType === "signs")
      .length,
    rulesTotal: answers.filter((answer) => answer.questionType === "rules")
      .length,
  };

  const userAnswersJson: Json = {
    answers: answers.map((answer) => ({
      questionId: answer.questionId,
      selectedOption: answer.selectedOption,
      isCorrect: answer.isCorrect,
      questionType: answer.questionType,
      timeSpentSeconds: answer.timeSpentSeconds,
      snapshot: answer.snapshot,
    })),
    breakdown,
  };

  const payload = {
    user_id: user.id,
    quiz_type: parsed.data.quizType,
    is_practice: parsed.data.isPractice,
    practice_type: parsed.data.practiceType ?? null,
    is_timed: Boolean(parsed.data.isTimed),
    time_taken_seconds: parsed.data.timeTakenSeconds ?? null,
    score,
    total_questions_in_attempt: answers.length,
    question_ids: answers.map((answer) => answer.questionId),
    user_answers: userAnswersJson,
  };

  const { data, error } = await supabase
    .from("quiz_attempts")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    throw new Error(`Failed to save quiz attempt: ${error.message}`);
  }

  const incorrectRows = answers
    .filter((answer) => !answer.isCorrect)
    .map((answer) => ({
      user_id: user.id,
      question_id: answer.databaseId,
      question_type: answer.questionType,
    }));
  if (incorrectRows.length) {
    const { error: incorrectError } = await supabase
      .from("user_incorrect_questions")
      .upsert(incorrectRows, {
        onConflict: "user_id,question_id,question_type",
      });
    if (incorrectError) {
      console.error("Could not update incorrect questions", incorrectError.message);
    }
  }

  if (parsed.data.practiceType === "incorrect_review") {
    for (const questionType of ["signs", "rules"] as const) {
      const correctedIds = answers
        .filter(
          (answer) =>
            answer.questionType === questionType && answer.isCorrect
        )
        .map((answer) => answer.databaseId);
      if (correctedIds.length) {
        const { error: cleanupError } = await supabase
          .from("user_incorrect_questions")
          .delete()
          .eq("user_id", user.id)
          .eq("question_type", questionType)
          .in("question_id", correctedIds);
        if (cleanupError) {
          console.error(
            "Could not clear corrected questions",
            cleanupError.message
          );
        }
      }
    }
  }

  return { id: data.id };
}

export interface QuizAttemptRow {
  id: number;
  created_at: string;
  user_id: string;
  quiz_type: string | null;
  is_practice: boolean | null;
  practice_type: string | null;
  is_timed: boolean | null;
  time_taken_seconds: number | null;
  score: number | null;
  total_questions_in_attempt: number | null;
  question_ids: number[] | null;
  user_answers: Json | null;
}

// Fetch a single quiz attempt owned by the current user
export async function getQuizAttemptById(
  id: number
): Promise<QuizAttemptRow | null> {
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Failed to get user: ${userError.message}`);
  }
  if (!user) {
    throw new Error("Must be signed in to fetch quiz attempts");
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select(
      "id, created_at, user_id, quiz_type, is_practice, practice_type, is_timed, time_taken_seconds, score, total_questions_in_attempt, question_ids, user_answers"
    )
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (error && error.code !== "PGRST116") {
    // PGRST116: row not found
    throw new Error(`Failed to fetch quiz attempt: ${error.message}`);
  }

  return (data as unknown as QuizAttemptRow) ?? null;
}

export interface ListQuizAttemptsOptions {
  limit?: number; // default 20
  offset?: number; // default 0
}

export async function listMyQuizAttempts(
  options: ListQuizAttemptsOptions = {}
): Promise<QuizAttemptRow[]> {
  const { limit = 20, offset = 0 } = options;
  const supabase = await createSupabaseServerClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    throw new Error(`Failed to get user: ${userError.message}`);
  }
  if (!user) {
    throw new Error("Must be signed in to list quiz attempts");
  }

  const { data, error } = await supabase
    .from("quiz_attempts")
    .select(
      "id, created_at, user_id, quiz_type, is_practice, practice_type, is_timed, time_taken_seconds, score, total_questions_in_attempt, question_ids, user_answers"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .range(offset, offset + Math.max(0, limit - 1));

  if (error) {
    throw new Error(`Failed to list quiz attempts: ${error.message}`);
  }

  return (data as unknown as QuizAttemptRow[]) ?? [];
}
