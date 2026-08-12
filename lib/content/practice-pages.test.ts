import { describe, expect, it } from "vitest";
import { practiceLandingPageList } from "./practice-pages";

describe("practice landing page content", () => {
  it("provides useful public content for every practice page", () => {
    for (const page of practiceLandingPageList) {
      expect(page.topicLinks).toHaveLength(3);
      expect(page.sampleQuestions).toHaveLength(3);
      expect(page.faqs).toHaveLength(3);
      expect(page.guideSlugs.length).toBeGreaterThanOrEqual(2);

      expect(new Set(page.topicLinks.map((topic) => topic.href)).size).toBe(3);
      expect(
        page.topicLinks.every((topic) => topic.href.startsWith("/study-guide/"))
      ).toBe(true);
      expect(
        new Set(page.sampleQuestions.map((sample) => sample.question)).size
      ).toBe(3);
      expect(new Set(page.faqs.map((faq) => faq.question)).size).toBe(3);
      expect(new Set(page.guideSlugs).size).toBe(page.guideSlugs.length);
    }
  });
});
