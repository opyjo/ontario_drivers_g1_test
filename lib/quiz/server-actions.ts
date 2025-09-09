// Server Actions for Quiz Database Integration
// Direct integration with our 4 core database functions from Stage 2

"use server";

import { createClient } from "@supabase/supabase-js";
import { Question, QuestionLimit } from "@/types/quiz";
import { QUESTION_LIMITS, G1_TEST_CONFIG } from "./constants";
import { isValidQuestion } from "./utils";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Server action for signs practice questions
export async function getSignsPracticeQuestions(
  limit: QuestionLimit = QUESTION_LIMITS.DEFAULT
): Promise<Question[]> {
  try {
    // Validate limit parameter
    if (!QUESTION_LIMITS.OPTIONS.includes(limit)) {
      throw new Error(
        `Invalid limit: ${limit}. Must be one of: ${QUESTION_LIMITS.OPTIONS.join(
          ", "
        )}`
      );
    }

    // Call database function
    const { data, error } = await supabase.rpc("get_signs_practice_questions", {
      limit,
    });

    if (error) {
      console.error("Database error in getSignsPracticeQuestions:", error);
      throw new Error(
        `Failed to fetch signs practice questions: ${error.message}`
      );
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No signs practice questions available");
    }

    // Validate question structure
    const validQuestions = data.filter(
      (question: any): question is Question => {
        if (!isValidQuestion(question)) {
          console.warn("Invalid question structure:", question);
          return false;
        }
        // Additional validation for signs questions
        if (question.question_type !== "signs") {
          console.warn("Non-signs question in signs practice:", question);
          return false;
        }
        return true;
      }
    );

    if (validQuestions.length === 0) {
      throw new Error("No valid signs practice questions found");
    }

    return validQuestions;
  } catch (error) {
    console.error("Error in getSignsPracticeQuestions:", error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}

// Server action for rules practice questions
export async function getRulesPracticeQuestions(
  limit: QuestionLimit = QUESTION_LIMITS.DEFAULT
): Promise<Question[]> {
  try {
    // Validate limit parameter
    if (!QUESTION_LIMITS.OPTIONS.includes(limit)) {
      throw new Error(
        `Invalid limit: ${limit}. Must be one of: ${QUESTION_LIMITS.OPTIONS.join(
          ", "
        )}`
      );
    }

    // Call database function
    const { data, error } = await supabase.rpc("get_rules_practice_questions", {
      limit,
    });

    if (error) {
      console.error("Database error in getRulesPracticeQuestions:", error);
      throw new Error(
        `Failed to fetch rules practice questions: ${error.message}`
      );
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No rules practice questions available");
    }

    // Validate question structure
    const validQuestions = data.filter(
      (question: any): question is Question => {
        if (!isValidQuestion(question)) {
          console.warn("Invalid question structure:", question);
          return false;
        }
        // Additional validation for rules questions
        if (question.question_type !== "rules") {
          console.warn("Non-rules question in rules practice:", question);
          return false;
        }
        return true;
      }
    );

    if (validQuestions.length === 0) {
      throw new Error("No valid rules practice questions found");
    }

    return validQuestions;
  } catch (error) {
    console.error("Error in getRulesPracticeQuestions:", error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}

// Server action for G1 simulation questions (20 signs + 20 rules)
export async function getG1SimulationQuestions(): Promise<Question[]> {
  try {
    // Call database function
    const { data, error } = await supabase.rpc("get_g1_simulation_questions");

    if (error) {
      console.error("Database error in getG1SimulationQuestions:", error);
      throw new Error(
        `Failed to fetch G1 simulation questions: ${error.message}`
      );
    }

    if (!data || !Array.isArray(data) || data.length === 0) {
      throw new Error("No G1 simulation questions available");
    }

    // Validate question structure
    const validQuestions = data.filter(
      (question: any): question is Question => {
        if (!isValidQuestion(question)) {
          console.warn("Invalid question structure:", question);
          return false;
        }
        // Additional validation for G1 questions
        if (
          question.question_type !== "signs" &&
          question.question_type !== "rules"
        ) {
          console.warn("Invalid question type in G1 simulation:", question);
          return false;
        }
        return true;
      }
    );

    if (validQuestions.length === 0) {
      throw new Error("No valid G1 simulation questions found");
    }

    // Validate G1 test format (20 signs + 20 rules = 40 total)
    const signsQuestions = validQuestions.filter(
      (q) => q.question_type === "signs"
    );
    const rulesQuestions = validQuestions.filter(
      (q) => q.question_type === "rules"
    );

    const expectedTotal = G1_TEST_CONFIG.TOTAL_QUESTIONS_PER_TEST;
    const expectedSigns = G1_TEST_CONFIG.SIGNS_QUESTIONS_PER_TEST;
    const expectedRules = G1_TEST_CONFIG.RULES_QUESTIONS_PER_TEST;

    if (
      validQuestions.length !== expectedTotal ||
      signsQuestions.length !== expectedSigns ||
      rulesQuestions.length !== expectedRules
    ) {
      throw new Error(
        `Invalid G1 test format: Expected ${expectedSigns} signs + ${expectedRules} rules = ${expectedTotal} total. Got ${signsQuestions.length} signs + ${rulesQuestions.length} rules = ${validQuestions.length} total.`
      );
    }

    return validQuestions;
  } catch (error) {
    console.error("Error in getG1SimulationQuestions:", error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}

// Server action for incorrect questions review
export async function getIncorrectQuestions(
  userId: string,
  questionType: "signs" | "rules" | "all" = "all"
): Promise<Question[]> {
  try {
    // Validate parameters
    if (!userId || typeof userId !== "string") {
      throw new Error("Valid user ID is required");
    }

    if (!["signs", "rules", "all"].includes(questionType)) {
      throw new Error("Question type must be 'signs', 'rules', or 'all'");
    }

    // Call database function
    const { data, error } = await supabase.rpc("get_incorrect_questions", {
      user_id_param: userId,
      question_type: questionType,
    });

    if (error) {
      console.error("Database error in getIncorrectQuestions:", error);
      throw new Error(`Failed to fetch incorrect questions: ${error.message}`);
    }

    // Handle empty results (user might not have any incorrect questions)
    if (!data || !Array.isArray(data)) {
      return [];
    }

    // Validate question structure
    const validQuestions = data.filter(
      (question: any): question is Question => {
        if (!isValidQuestion(question)) {
          console.warn(
            "Invalid question structure in incorrect questions:",
            question
          );
          return false;
        }
        return true;
      }
    );

    return validQuestions;
  } catch (error) {
    console.error("Error in getIncorrectQuestions:", error);
    throw error instanceof Error ? error : new Error("Unknown error occurred");
  }
}

// Helper server action to validate database connectivity
export async function validateQuizDatabase(): Promise<{
  isConnected: boolean;
  signsCount: number;
  rulesCount: number;
  canSimulate: boolean;
}> {
  try {
    // Test database connectivity with a simple query
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

    return {
      isConnected,
      signsCount,
      rulesCount,
      canSimulate,
    };
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

// Export all server actions for easy import
export const quizServerActions = {
  getSignsPracticeQuestions,
  getRulesPracticeQuestions,
  getG1SimulationQuestions,
  getIncorrectQuestions,
  validateQuizDatabase,
} as const;
