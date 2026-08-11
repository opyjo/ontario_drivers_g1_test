import { describe, expect, it } from "vitest";
import { studyGuideData } from "../../data/study-guide";
import { studyGuideSourceRecords } from "./study-guide-sources";

describe("study-guide source records", () => {
  it("covers every chapter with official sources and a valid review window", () => {
    expect(Object.keys(studyGuideSourceRecords).sort()).toEqual(
      studyGuideData.map((chapter) => chapter.id).sort()
    );

    for (const chapter of studyGuideData) {
      const record = studyGuideSourceRecords[chapter.id];
      expect(record.sources.length).toBeGreaterThan(0);
      expect(record.reviewBy > record.reviewedAt).toBe(true);
      for (const source of record.sources) {
        expect(source.url).toMatch(/^https:\/\/(www\.ontario\.ca|drivetest\.ca)\//);
      }
    }
  });
});
