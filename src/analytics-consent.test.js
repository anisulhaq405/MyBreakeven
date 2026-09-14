import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const source = readFileSync(new URL("./AnalyticsConsent.jsx", import.meta.url), "utf8");
const pages = readFileSync(new URL("./Pages.jsx", import.meta.url), "utf8");

describe("privacy-safe analytics", () => {
  it("uses the configured GA4 measurement ID", () => {
    expect(source).toContain("G-CEYVEE1ZV2");
  });

  it("loads GA only after explicit acceptance", () => {
    expect(source).toContain('choice === "accepted"');
    expect(source).toContain('decide("rejected")');
    expect(source).toContain('decide("accepted")');
  });

  it("disables advertising signals", () => {
    expect(source).toContain("allow_google_signals: false");
    expect(source).toContain("allow_ad_personalization_signals: false");
  });

  it("documents analytics collection and choice", () => {
    expect(pages).toContain("Google Analytics is disabled by default");
    expect(pages).toContain("We do not send calculator inputs");
  });
});
