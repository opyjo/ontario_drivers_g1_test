import { describe, expect, it } from "vitest";
import { canonicalLearningTopic } from "./topics";

describe("canonicalLearningTopic", () => {
  it("uses specific rule topics", () => {
    expect(
      canonicalLearningTopic({
        questionType: "rules",
        learningTopic: " Intersections and right-of-way ",
        category: "Intersections",
      })
    ).toBe("Intersections and right-of-way");
  });

  it("turns generic sign topics into useful categories", () => {
    expect(
      canonicalLearningTopic({
        questionType: "signs",
        learningTopic: "Road signs",
        category: "Warning Signs",
      })
    ).toBe("Warning signs");
    expect(
      canonicalLearningTopic({
        questionType: "signs",
        learningTopic: "Road signs",
        category: "Temporary construction signs",
      })
    ).toBe("Temporary and construction signs");
  });

  it("keeps a specific authored sign topic", () => {
    expect(
      canonicalLearningTopic({
        questionType: "signs",
        learningTopic: "Railway crossings",
        category: "Warning Signs",
      })
    ).toBe("Railway crossings");
  });
});
