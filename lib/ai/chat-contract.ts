import { z } from "zod";

export const chatResponseTypeSchema = z.enum([
  "mto_answer",
  "general_answer",
]);
export const chatConfidenceSchema = z.enum(["high", "medium", "low"]);

export const chatSourceSchema = z.object({
  document_title: z.string(),
  category: z.string(),
  topic: z.string(),
  chunk_id: z.string(),
  chunk_ids: z.array(z.string()).min(1),
  url: z.string().url(),
});

export const chatResponseSchema = z.object({
  type: chatResponseTypeSchema,
  content: z.string(),
  confidence: chatConfidenceSchema,
  sources: z.array(chatSourceSchema),
});

export const chatStreamMetadataSchema = chatResponseSchema
  .omit({ content: true })
  .extend({ requestId: z.string().min(1) });

export type ChatConfidence = z.infer<typeof chatConfidenceSchema>;
export type ChatResponse = z.infer<typeof chatResponseSchema>;
export type ChatResponseType = z.infer<typeof chatResponseTypeSchema>;
export type ChatSource = z.infer<typeof chatSourceSchema>;
export type ChatStreamMetadata = z.infer<typeof chatStreamMetadataSchema>;

export const CHAT_STREAM_HEADERS = {
  confidence: "x-ai-confidence",
  requestId: "x-ai-request-id",
  responseType: "x-ai-response-type",
  sources: "x-ai-sources",
} as const;

export function encodeChatStreamHeaders(metadata: ChatStreamMetadata) {
  return {
    [CHAT_STREAM_HEADERS.confidence]: metadata.confidence,
    [CHAT_STREAM_HEADERS.requestId]: metadata.requestId,
    [CHAT_STREAM_HEADERS.responseType]: metadata.type,
    [CHAT_STREAM_HEADERS.sources]: encodeURIComponent(
      JSON.stringify(metadata.sources)
    ),
  };
}

export function parseChatStreamHeaders(headers: Headers) {
  const encodedSources = headers.get(CHAT_STREAM_HEADERS.sources);
  if (!encodedSources) return null;

  try {
    return chatStreamMetadataSchema.parse({
      confidence: headers.get(CHAT_STREAM_HEADERS.confidence),
      requestId: headers.get(CHAT_STREAM_HEADERS.requestId),
      type: headers.get(CHAT_STREAM_HEADERS.responseType),
      sources: JSON.parse(decodeURIComponent(encodedSources)),
    });
  } catch {
    return null;
  }
}

function downgradeConfidence(confidence: ChatConfidence): ChatConfidence {
  if (confidence === "high") return "medium";
  return "low";
}

export function confidenceAfterCitationCheck(
  confidence: ChatConfidence,
  content: string,
  sourceCount: number
): ChatConfidence {
  const citations = [...content.matchAll(/\[Source\s+(\d+)\]/gi)].map(
    (match) => Number(match[1])
  );

  if (citations.length === 0) return downgradeConfidence(confidence);
  if (
    citations.some(
      (citation) =>
        citation < 1 ||
        citation > sourceCount ||
        !Number.isInteger(citation)
    )
  ) {
    return "low";
  }

  return confidence;
}
