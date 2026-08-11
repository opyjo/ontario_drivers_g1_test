import { describe, expect, it } from "vitest";
import {
  absoluteUrl,
  conciseDescription,
  privateMetadata,
  publicMetadata,
  SITE_URL,
} from "./seo";

describe("SEO helpers", () => {
  it("always builds production-domain URLs", () => {
    expect(absoluteUrl("/faq")).toBe(`${SITE_URL}/faq`);
    expect(absoluteUrl("/")).toBe(`${SITE_URL}/`);
  });

  it("adds canonical and social metadata to public pages", () => {
    const metadata = publicMetadata({
      title: "Ontario G1 Test FAQ",
      description: "Answers to common Ontario G1 test questions.",
      path: "/faq",
    });

    expect(metadata.alternates?.canonical).toBe(`${SITE_URL}/faq`);
    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/faq`);
    expect(metadata.robots).toMatchObject({ index: true, follow: true });
  });

  it("can make the root-page title absolute so the brand is not omitted", () => {
    const metadata = publicMetadata({
      title: "Ontario G1 Practice Tests",
      description: "Prepare for Ontario's G1 test.",
      path: "/",
      absoluteTitle: true,
    });

    expect(metadata.title).toEqual({
      absolute: "Ontario G1 Practice Tests | DriveTest Pro",
    });
  });

  it("marks private routes noindex and nofollow", () => {
    expect(privateMetadata.robots).toMatchObject({
      index: false,
      follow: false,
      noarchive: true,
      nosnippet: true,
    });
  });

  it("truncates long descriptions at a readable boundary", () => {
    const result = conciseDescription("Ontario driving rules ".repeat(20), 80);

    expect(result.length).toBeLessThanOrEqual(80);
    expect(result.endsWith("…")).toBe(true);
    expect(result.endsWith(" …")).toBe(false);
  });
});
