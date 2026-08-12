import type { ChatConfidence, ChatSource } from "./chat-contract";

export interface DocumentMatch {
  id: number;
  content: string;
  metadata: Record<string, unknown> | null;
  similarity: number;
}

const MINIMUM_RELEVANCE = 0.45;

const HANDBOOK_ROOT =
  "https://www.ontario.ca/document/official-mto-drivers-handbook";

const topicUrls: Record<string, string> = {
  traffic_signs: `${HANDBOOK_ROOT}/traffic-signs-and-lights`,
  getting_license: `${HANDBOOK_ROOT}/getting-your-drivers-licence`,
  intersections_right_of_way: `${HANDBOOK_ROOT}/driving-through-intersections`,
  changing_directions: `${HANDBOOK_ROOT}/changing-directions`,
  emergency_collision: `${HANDBOOK_ROOT}/dealing-emergencies`,
  sharing_road: `${HANDBOOK_ROOT}/sharing-road-other-road-users`,
  safe_driving: `${HANDBOOK_ROOT}/safe-and-responsible-driving`,
  challenging_conditions: `${HANDBOOK_ROOT}/safe-and-responsible-driving`,
  weather_night_driving: `${HANDBOOK_ROOT}/safe-and-responsible-driving`,
  parking_procedures: `${HANDBOOK_ROOT}/safe-and-responsible-driving`,
  legal_responsibility: HANDBOOK_ROOT,
};

export function expandRetrievalQuery(question: string) {
  const expansions: string[] = [];

  if (/\b(?:four|4)[-\s]?way stop\b/i.test(question)) {
    expansions.push("stop signs at all corners right of way");
  }

  if (
    /\bg1\b/i.test(question) &&
    /\b(?:document|documents|identification|id)\b/i.test(question)
  ) {
    expansions.push(
      "getting licence apply knowledge test identification requirements"
    );
  }

  return expansions.length > 0
    ? `${question} ${expansions.join(" ")}`
    : question;
}

function metadataString(
  metadata: Record<string, unknown> | null,
  key: string,
  fallback: string
) {
  const value = metadata?.[key];
  return typeof value === "string" && value.trim() ? value : fallback;
}

function handbookUrl(metadata: Record<string, unknown> | null) {
  const candidate = metadataString(metadata, "source_url", "");
  if (candidate) {
    try {
      const url = new URL(candidate);
      if (url.protocol === "https:" && url.hostname === "www.ontario.ca") {
        return url.toString();
      }
    } catch {
      // Fall through to the curated topic mapping.
    }
  }

  return topicUrls[metadataString(metadata, "topic", "")] || HANDBOOK_ROOT;
}

export function confidenceFromRetrieval(score: number): ChatConfidence {
  if (score >= 1) return "high";
  if (score >= 0.65) return "medium";
  return "low";
}

interface SourceGroup {
  source: ChatSource;
  chunks: Array<{ chunkId: string; content: string }>;
}

export function buildGroundedContext(matches: DocumentMatch[]) {
  const topScore = matches[0]?.similarity ?? 0;
  if (!Number.isFinite(topScore) || topScore < MINIMUM_RELEVANCE) return null;

  const groups = new Map<string, SourceGroup>();

  for (const match of matches) {
    if (!Number.isFinite(match.similarity) || match.similarity < MINIMUM_RELEVANCE) {
      continue;
    }

    const topic = metadataString(match.metadata, "topic", "General");
    const url = handbookUrl(match.metadata);
    const chunkId = metadataString(match.metadata, "chunk_id", String(match.id));
    const key = `${topic}|${url}`;
    const existing = groups.get(key);

    if (existing) {
      if (!existing.source.chunk_ids.includes(chunkId)) {
        existing.source.chunk_ids.push(chunkId);
        existing.chunks.push({ chunkId, content: match.content });
      }
      continue;
    }

    groups.set(key, {
      source: {
        document_title: metadataString(
          match.metadata,
          "document_title",
          "Ontario MTO Driver's Handbook"
        ),
        category: metadataString(match.metadata, "category", "MTO Content"),
        topic,
        chunk_id: chunkId,
        chunk_ids: [chunkId],
        url,
      },
      chunks: [{ chunkId, content: match.content }],
    });
  }

  const grouped = [...groups.values()];
  if (grouped.length === 0) return null;

  const sources = grouped.map((group) => group.source);
  const context = grouped
    .map(
      (group, index) =>
        `[Source ${index + 1}: ${group.source.document_title} — ${group.source.url}]\n` +
        group.chunks
          .map((chunk) => `[Chunk ${chunk.chunkId}]\n${chunk.content}`)
          .join("\n\n")
    )
    .join("\n\n---\n\n");

  return {
    confidence: confidenceFromRetrieval(topScore),
    context,
    sources,
    topScore,
  };
}

export { HANDBOOK_ROOT };
