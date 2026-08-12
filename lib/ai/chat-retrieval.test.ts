import { describe, expect, it } from "vitest";
import {
  buildGroundedContext,
  confidenceFromRetrieval,
  expandRetrievalQuery,
  type DocumentMatch,
} from "./chat-retrieval";

function match(overrides: Partial<DocumentMatch> = {}): DocumentMatch {
  return {
    id: 1,
    content: "At an all-way stop, the first stopped vehicle proceeds first.",
    metadata: {
      category: "Traffic Rules",
      chunk_id: "right_of_way_1",
      document_title: "Intersections and Right of Way",
      topic: "intersections_right_of_way",
    },
    similarity: 1.2,
    ...overrides,
  };
}

describe("AI handbook retrieval", () => {
  it("rejects weak matches instead of grounding an unrelated answer", () => {
    expect(buildGroundedContext([match({ similarity: 0.2 })])).toBeNull();
  });

  it("groups adjacent chunks into one numbered source", () => {
    const result = buildGroundedContext([
      match(),
      match({ id: 2, content: "The vehicle on the left yields.", metadata: {
        category: "Traffic Rules",
        chunk_id: "right_of_way_2",
        document_title: "Intersections and Right of Way",
        topic: "intersections_right_of_way",
      } }),
    ]);

    expect(result?.sources).toHaveLength(1);
    expect(result?.sources[0].chunk_ids).toEqual([
      "right_of_way_1",
      "right_of_way_2",
    ]);
    expect(result?.context).toContain("[Source 1:");
    expect(result?.context).toContain("[Chunk right_of_way_2]");
  });

  it("derives confidence from retrieval strength", () => {
    expect(confidenceFromRetrieval(1.1)).toBe("high");
    expect(confidenceFromRetrieval(0.7)).toBe("medium");
    expect(confidenceFromRetrieval(0.5)).toBe("low");
  });

  it("expands common handbook wording mismatches", () => {
    expect(expandRetrievalQuery("How does a 4-way stop work?")).toContain(
      "stop signs at all corners"
    );
    expect(
      expandRetrievalQuery("Which documents should I bring for my G1?")
    ).toContain("getting licence apply knowledge test");
    expect(expandRetrievalQuery("How should I drive in fog?")).toBe(
      "How should I drive in fog?"
    );
  });
});
