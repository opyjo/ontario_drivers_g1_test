import type { LearningQuestionType } from "./analytics";

interface LearningTopicInput {
  questionType: LearningQuestionType;
  learningTopic?: string | null;
  category?: string | null;
}

const GENERIC_SIGN_TOPICS = new Set([
  "road sign",
  "road signs",
  "sign",
  "signs",
  "traffic sign",
  "traffic signs",
]);

const SIGN_TOPIC_PATTERNS: ReadonlyArray<readonly [RegExp, string]> = [
  [/regulatory|prohibitory|mandatory/i, "Regulatory signs"],
  [/warning/i, "Warning signs"],
  [/temporary|construction/i, "Temporary and construction signs"],
  [/information|guide|direction/i, "Information and guide signs"],
];

function cleanTopic(value?: string | null) {
  return value?.trim().replace(/\s+/g, "") ? value.trim().replace(/\s+/g, " ") : null;
}

export function canonicalLearningTopic({
  questionType,
  learningTopic,
  category,
}: LearningTopicInput) {
  const cleanedTopic = cleanTopic(learningTopic);
  const cleanedCategory = cleanTopic(category);

  if (questionType === "rules") {
    return cleanedTopic || cleanedCategory || "Rules of the road";
  }

  if (cleanedTopic && !GENERIC_SIGN_TOPICS.has(cleanedTopic.toLowerCase())) {
    return cleanedTopic;
  }

  const categoryMatch = cleanedCategory
    ? SIGN_TOPIC_PATTERNS.find(([pattern]) => pattern.test(cleanedCategory))
    : undefined;

  return categoryMatch?.[1] || cleanedCategory || "Road signs";
}
