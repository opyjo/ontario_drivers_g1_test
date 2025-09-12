// Server Actions for Quiz Database Integration
// Direct integration with Supabase DB functions

"use server";

import { createClient } from "@supabase/supabase-js";
import { Question, QuestionLimit } from "@/types/quiz";
import { QUESTION_LIMITS, G1_TEST_CONFIG } from "./constants";
import { isValidQuestion } from "./utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// -------------------------------
// 1. Signs practice questions
// -------------------------------
export async function getSignsPracticeQuestions(
  limit: QuestionLimit = QUESTION_LIMITS.DEFAULT
): Promise<Question[]> {
  try {
    if (!QUESTION_LIMITS.OPTIONS.includes(limit)) {
      throw new Error(
        `Invalid limit: ${limit}. Must be one of: ${QUESTION_LIMITS.OPTIONS.join(
          ", "
        )}`
      );
    }

    const { data, error } = await supabase.rpc("get_signs_practice_questions", {
      limit,
    });

    if (error)
      throw new Error(
        `Failed to fetch signs practice questions: ${error.message}`
      );
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No signs practice questions available");
    }

    const validQuestions = data.filter(
      (q: any): q is Question =>
        isValidQuestion(q) && q.question_type === "signs"
    );

    if (validQuestions.length === 0)
      throw new Error("No valid signs questions found");

    return validQuestions;
  } catch (error) {
    console.error("Error in getSignsPracticeQuestions:", error);
    throw error instanceof Error ? error : new Error("Unknown error");
  }
}

// -------------------------------
// 2. Rules practice questions
// -------------------------------
export async function getRulesPracticeQuestions(
  limit: QuestionLimit = QUESTION_LIMITS.DEFAULT
): Promise<Question[]> {
  try {
    if (!QUESTION_LIMITS.OPTIONS.includes(limit)) {
      throw new Error(
        `Invalid limit: ${limit}. Must be one of: ${QUESTION_LIMITS.OPTIONS.join(
          ", "
        )}`
      );
    }

    const { data, error } = await supabase.rpc("get_rules_practice_questions", {
      limit,
    });

    if (error)
      throw new Error(
        `Failed to fetch rules practice questions: ${error.message}`
      );
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No rules practice questions available");
    }

    const validQuestions = data.filter(
      (q: any): q is Question =>
        isValidQuestion(q) && q.question_type === "rules"
    );

    if (validQuestions.length === 0)
      throw new Error("No valid rules questions found");

    return validQuestions;
  } catch (error) {
    console.error("Error in getRulesPracticeQuestions:", error);
    throw error instanceof Error ? error : new Error("Unknown error");
  }
}

// -------------------------------
// 3. G1 Simulation (20 signs + 20 rules)
// -------------------------------
export async function getG1SimulationQuestions(): Promise<Question[]> {
  try {
    const { data, error } = await supabase.rpc("get_g1_simulation_questions");

    if (error)
      throw new Error(`Failed to fetch simulation questions: ${error.message}`);
    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No simulation questions available");
    }

    const validQuestions = data.filter(
      (q: any): q is Question =>
        isValidQuestion(q) &&
        (q.question_type === "signs" || q.question_type === "rules")
    );

    if (validQuestions.length === 0)
      throw new Error("No valid simulation questions found");

    // ✅ Format validation
    const signsCount = validQuestions.filter(
      (q) => q.question_type === "signs"
    ).length;
    const rulesCount = validQuestions.filter(
      (q) => q.question_type === "rules"
    ).length;

    if (
      validQuestions.length !== G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST ||
      signsCount !== G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST ||
      rulesCount !== G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST
    ) {
      throw new Error(
        `Invalid G1 format: expected ${G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST} signs + 
         ${G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST} rules = ${G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST}, 
         got ${signsCount} signs + ${rulesCount} rules = ${validQuestions.length}.`
      );
    }

    return validQuestions;
  } catch (error) {
    console.error("Error in getG1SimulationQuestions:", error);
    throw error instanceof Error ? error : new Error("Unknown error");
  }
}

// -------------------------------
// 4. Incorrect questions review
// -------------------------------
export async function getIncorrectQuestions(
  userId: string,
  questionType: "signs" | "rules" | "all" = "all"
): Promise<Question[]> {
  try {
    if (!userId) throw new Error("Valid user ID required");

    const { data, error } = await supabase.rpc("get_incorrect_questions", {
      user_id_param: userId,
      question_type: questionType,
    });

    if (error)
      throw new Error(`Failed to fetch incorrect questions: ${error.message}`);

    const validQuestions = (data || []).filter((q: any): q is Question =>
      isValidQuestion(q)
    );

    return validQuestions;
  } catch (error) {
    console.error("Error in getIncorrectQuestions:", error);
    throw error instanceof Error ? error : new Error("Unknown error");
  }
}

// -------------------------------
// 5. DB Connectivity Validator
// -------------------------------
export async function validateQuizDatabase(): Promise<{
  isConnected: boolean;
  signsCount: number;
  rulesCount: number;
  canSimulate: boolean;
}> {
  try {
    const { data: signsData, error: signsError } = await supabase.rpc(
      "get_signs_practice_questions",
      { limit: 1 }
    );
    const { data: rulesData, error: rulesError } = await supabase.rpc(
      "get_rules_practice_questions",
      { limit: 1 }
    );

    const isConnected = !signsError && !rulesError;
    const signsCount = signsData?.length || 0;
    const rulesCount = rulesData?.length || 0;
    const canSimulate = signsCount > 0 && rulesCount > 0;

    return { isConnected, signsCount, rulesCount, canSimulate };
  } catch (error) {
    console.error("Database validation error:", error);
    return {
      isConnected: false,
      signsCount: 0,
      rulesCount: 0,
      canSimulate: false,
    };
  }
}
