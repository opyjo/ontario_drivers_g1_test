import { describe, expect, it } from "vitest";
import {
  confidenceAfterCitationCheck,
  encodeChatStreamHeaders,
  parseChatStreamHeaders,
  type ChatStreamMetadata,
} from "./chat-contract";

const metadata: ChatStreamMetadata = {
  type: "mto_answer",
  confidence: "high",
  requestId: "request-123",
  sources: [
    {
      document_title: "MTO Handbook",
      category: "Traffic Rules",
      topic: "intersections_right_of_way",
      chunk_id: "chunk-1",
      chunk_ids: ["chunk-1", "chunk-2"],
      url: "https://www.ontario.ca/document/official-mto-drivers-handbook",
    },
  ],
};

describe("AI chat stream contract", () => {
  it("round-trips typed metadata through response headers", () => {
    const headers = new Headers(encodeChatStreamHeaders(metadata));
    expect(parseChatStreamHeaders(headers)).toEqual(metadata);
  });

  it("downgrades answers with missing or invalid citations", () => {
    expect(confidenceAfterCitationCheck("high", "Answer without a citation", 1)).toBe(
      "medium"
    );
    expect(
      confidenceAfterCitationCheck("high", "Unsupported [Source 2]", 1)
    ).toBe("low");
  });

  it("preserves confidence when citations point to returned sources", () => {
    expect(
      confidenceAfterCitationCheck("high", "Supported answer [Source 1]", 1)
    ).toBe("high");
  });
});
