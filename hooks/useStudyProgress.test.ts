import { describe, expect, it } from "vitest";
import { calculateStudyProgress, type StudyProgress } from "./useStudyProgress";

describe("calculateStudyProgress", () => {
  it("does not mark a chapter complete when only its visited section is complete", () => {
    const progress: StudyProgress = {
      licensing: {
        introduction: { completed: true },
      },
    };

    expect(
      calculateStudyProgress(progress, {
        licensing: ["introduction", "g1", "g2"],
      })
    ).toEqual({
      completedChapters: 0,
      completedSections: 1,
      totalPercentage: 33,
    });
  });

  it("counts only sections that belong to the current guide structure", () => {
    const progress: StudyProgress = {
      licensing: {
        introduction: { completed: true },
        g1: { completed: true },
        removedSection: { completed: true },
      },
    };

    expect(
      calculateStudyProgress(progress, {
        licensing: ["introduction", "g1"],
      })
    ).toEqual({
      completedChapters: 1,
      completedSections: 2,
      totalPercentage: 100,
    });
  });
});
