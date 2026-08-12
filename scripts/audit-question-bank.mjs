import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config({ path: [".env.local", ".env"] });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY ??
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Set NEXT_PUBLIC_SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY."
  );
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const tableConfig = [
  { table: "signs_questions", label: "signs", expected: 300, requiresImage: true },
  { table: "rules_questions", label: "rules", expected: 400, requiresImage: false },
];

const requiredTextFields = [
  "question_text",
  "option_a",
  "option_b",
  "option_c",
  "option_d",
  "explanation",
  "category",
  "subcategory",
  "difficulty_level",
  "learning_topic",
  "handbook_section",
  "handbook_url",
];
const optionFields = ["option_a", "option_b", "option_c", "option_d"];
const validAnswers = new Set(["A", "B", "C", "D"]);
const validDifficulties = new Set(["easy", "medium", "hard"]);
const positionalAnswerPattern = /\b(?:both|all|none|either)\b.*\b(?:above|these|[A-D]\s+(?:and|or)\s+[A-D])\b/i;
const stalePatterns = [
  { label: "obsolete $1,000 collision threshold", pattern: /\$1,000/i },
  { label: "obsolete $2,000 collision threshold", pattern: /\$2,000/i },
  { label: "malformed midnight-to-5 a.m. window", pattern: /12\s*a\.?m\.?\s+and\s+5\s*p\.?m/i },
  { label: "incorrect 30-minute test limit", pattern: /30-minute\s+time\s+limit/i },
  { label: "obsolete passenger-vehicle emissions requirement", pattern: /emissions test before (?:every|a) (?:plate )?renewal/i },
];

function normalize(value) {
  return String(value ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

function questionSignature(question) {
  return [
    question.question_text,
    question.image_url,
    ...optionFields.map((field) => question[field]),
  ]
    .map(normalize)
    .join("|");
}

async function fetchActiveQuestions(table) {
  const { data, error } = await supabase
    .from(table)
    .select("*")
    .eq("is_active", true)
    .order("id", { ascending: true });

  if (error) throw new Error(`${table}: ${error.message}`);
  return data ?? [];
}

async function checkImage(url) {
  try {
    const response = await fetch(url, { method: "HEAD", redirect: "follow" });
    return response.ok;
  } catch {
    return false;
  }
}

const failures = [];
const summaries = [];
const shouldCheckImages = process.argv.includes("--check-images");

for (const config of tableConfig) {
  const questions = await fetchActiveQuestions(config.table);
  const answerDistribution = { A: 0, B: 0, C: 0, D: 0 };
  const difficultyDistribution = { easy: 0, medium: 0, hard: 0 };
  const categories = new Set();
  const learningTopics = new Set();
  const signatures = new Map();

  if (questions.length !== config.expected) {
    failures.push(
      `${config.label}: expected ${config.expected} active questions, found ${questions.length}`
    );
  }

  for (const question of questions) {
    const prefix = `${config.label} #${question.id}`;
    for (const field of requiredTextFields) {
      if (!normalize(question[field])) failures.push(`${prefix}: missing ${field}`);
    }

    if (config.requiresImage) {
      if (!normalize(question.image_url)) failures.push(`${prefix}: missing image_url`);
      if (!normalize(question.image_description)) {
        failures.push(`${prefix}: missing image_description`);
      }
    }

    if (typeof question.is_frequently_tested !== "boolean") {
      failures.push(`${prefix}: is_frequently_tested must be boolean`);
    }
    if (!validAnswers.has(question.correct_option)) {
      failures.push(`${prefix}: invalid correct_option ${question.correct_option}`);
    } else {
      answerDistribution[question.correct_option] += 1;
    }
    if (!validDifficulties.has(question.difficulty_level)) {
      failures.push(`${prefix}: invalid difficulty_level ${question.difficulty_level}`);
    } else {
      difficultyDistribution[question.difficulty_level] += 1;
    }

    const distinctOptions = new Set(optionFields.map((field) => normalize(question[field])));
    if (distinctOptions.size !== 4) failures.push(`${prefix}: answer options are not unique`);
    for (const field of optionFields) {
      if (positionalAnswerPattern.test(question[field])) {
        failures.push(`${prefix}: ${field} depends on other answer positions`);
      }
    }
    categories.add(normalize(question.category));
    learningTopics.add(normalize(question.learning_topic));

    const signature = questionSignature(question);
    const existing = signatures.get(signature);
    if (existing) failures.push(`${prefix}: duplicates question #${existing}`);
    else signatures.set(signature, question.id);

    const correctAnswer = validAnswers.has(question.correct_option)
      ? question[`option_${question.correct_option.toLowerCase()}`]
      : "";
    const searchable = [question.question_text, question.explanation, correctAnswer].join(" ");
    for (const stale of stalePatterns) {
      if (stale.pattern.test(searchable)) failures.push(`${prefix}: ${stale.label}`);
    }

    try {
      const handbookUrl = new URL(question.handbook_url);
      if (handbookUrl.protocol !== "https:") failures.push(`${prefix}: handbook_url must use HTTPS`);
    } catch {
      failures.push(`${prefix}: invalid handbook_url`);
    }
  }

  if (Object.values(difficultyDistribution).some((count) => count === 0)) {
    failures.push(`${config.label}: difficulty levels are not meaningfully classified`);
  }
  if (categories.size < (config.requiresImage ? 4 : 10)) {
    failures.push(`${config.label}: too few content categories (${categories.size})`);
  }
  if (learningTopics.size < (config.requiresImage ? 1 : 5)) {
    failures.push(`${config.label}: too few learning topics (${learningTopics.size})`);
  }

  const largestAnswerShare =
    questions.length > 0
      ? Math.max(...Object.values(answerDistribution)) / questions.length
      : 1;
  if (largestAnswerShare > 0.3) {
    failures.push(
      `${config.label}: one correct-answer position exceeds 30% (${Math.round(largestAnswerShare * 100)}%)`
    );
  }

  if (shouldCheckImages && config.requiresImage) {
    const results = await Promise.all(
      questions.map(async (question) => ({
        id: question.id,
        ok: await checkImage(question.image_url),
      }))
    );
    for (const result of results) {
      if (!result.ok) failures.push(`${config.label} #${result.id}: image is unreachable`);
    }
  }

  summaries.push({
    bank: config.label,
    active: questions.length,
    categories: categories.size,
    learningTopics: learningTopics.size,
    difficulty: difficultyDistribution,
    correctAnswers: answerDistribution,
  });
}

console.log(JSON.stringify(summaries, null, 2));

if (failures.length > 0) {
  console.error(`\nQuestion-bank audit failed with ${failures.length} issue(s):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log(
    `\nQuestion-bank audit passed for ${summaries.reduce((total, item) => total + item.active, 0)} active questions${shouldCheckImages ? ", including image reachability" : ""}.`
  );
}
