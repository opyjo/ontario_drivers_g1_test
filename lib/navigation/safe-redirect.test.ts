import { describe, expect, it } from "vitest";
import { getSafeRedirectPath } from "./safe-redirect";

describe("getSafeRedirectPath", () => {
  it("keeps local paths, query strings, and fragments", () => {
    expect(getSafeRedirectPath("/pricing?from=login#plans")).toBe(
      "/pricing?from=login#plans"
    );
  });

  it.each([
    "https://example.com",
    "//example.com/path",
    "/\\example.com/path",
    "javascript:alert(1)",
    "dashboard",
  ])("rejects unsafe redirect %s", (value) => {
    expect(getSafeRedirectPath(value, "/dashboard")).toBe("/dashboard");
  });
});
