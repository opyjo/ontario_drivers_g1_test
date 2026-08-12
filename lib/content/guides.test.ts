import { describe, expect, it } from "vitest";
import { guideArticles } from "./guides";

describe("guide articles", () => {
  it("uses unique slugs and complete source metadata", () => {
    const slugs = guideArticles.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);

    for (const article of guideArticles) {
      expect(article.title.length).toBeGreaterThan(10);
      expect(article.description.length).toBeGreaterThan(40);
      expect(article.sources.length).toBeGreaterThan(0);
      expect(article.category.length).toBeGreaterThan(0);
      expect(article.updatedAt >= article.publishedAt).toBe(true);
      for (const relatedSlug of article.relatedSlugs ?? []) {
        expect(relatedSlug).not.toBe(article.slug);
        expect(slugs).toContain(relatedSlug);
      }
      for (const source of article.sources) {
        expect(source.url).toMatch(/^https:\/\/(www\.ontario\.ca|drivetest\.ca)\//);
      }
    }
  });
});
