import { describe, expect, it, vi } from "vitest";
import { createCalculatorUseTracker, trackProductEvent } from "./productAnalytics";

describe("calculator funnel measurement", () => {
  it("retries after missing consent, then records only one accepted interaction", () => {
    const track = vi.fn().mockReturnValueOnce(false).mockReturnValue(true);
    const record = createCalculatorUseTracker(track);
    expect(record("cleaning")).toBe(false);
    expect(record("cleaning")).toBe(true);
    expect(record("landscaping")).toBe(false);
    expect(track.mock.calls).toEqual([["calculator_use", "cleaning"], ["calculator_use", "cleaning"]]);
  });
  it("requires consent and never sends input values or signup details", () => {
    const browser = { localStorage: { getItem: vi.fn().mockReturnValue("rejected") }, gtag: vi.fn() };
    expect(trackProductEvent("calculator_use", "cleaning", browser)).toBe(false);
    browser.localStorage.getItem.mockReturnValue("accepted");
    expect(trackProductEvent("calculator_use", "cleaning", browser)).toBe(true);
    expect(trackProductEvent("signup_request_accepted", { email: "private@example.com" }, browser)).toBe(true);
    expect(browser.gtag.mock.calls).toEqual([["event", "calculator_use", { industry: "cleaning" }], ["event", "signup_request_accepted", {}]]);
  });
});
