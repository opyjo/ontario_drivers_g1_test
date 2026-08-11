import { describe, expect, it } from "vitest";
import { studyGuideData } from "../data/study-guide";
import { SITE_URL } from "../lib/seo";
import sitemap from "./sitemap";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((entry) => entry.url);

  it("contains every public study-guide chapter and section", () => {
    for (const chapter of studyGuideData) {
      expect(urls).toContain(`${SITE_URL}/study-guide/${chapter.id}`);

      for (const section of chapter.sections) {
        expect(urls).toContain(
          `${SITE_URL}/study-guide/${chapter.id}/${section.id}`
        );
      }
    }
  });

  it("contains no duplicate URLs", () => {
    expect(new Set(urls).size).toBe(urls.length);
  });

  it("excludes private and redirecting routes", () => {
    for (const privatePath of [
      "/auth",
      "/dashboard",
      "/payment/success",
      "/profile",
      "/quiz",
      "/settings",
      "/signup",
    ]) {
      expect(urls).not.toContain(`${SITE_URL}${privatePath}`);
    }
  });
});
