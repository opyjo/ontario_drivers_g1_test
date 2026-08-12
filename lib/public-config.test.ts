import { describe, expect, it } from "vitest";
import {
  normalizeGoogleAnalyticsId,
  normalizeSupportEmail,
} from "./public-config";

describe("public configuration normalization", () => {
  it("trims and validates Google Analytics measurement IDs", () => {
    expect(normalizeGoogleAnalyticsId("  g-1zcfm83z6c\n")).toBe(
      "G-1ZCFM83Z6C"
    );
    expect(normalizeGoogleAnalyticsId("GTM-INVALID")).toBeUndefined();
  });

  it("trims and validates public support email addresses", () => {
    expect(normalizeSupportEmail(" Support@DriverGuide.ca\n")).toBe(
      "support@driverguide.ca"
    );
    expect(normalizeSupportEmail("not-an-email")).toBeUndefined();
  });
});
