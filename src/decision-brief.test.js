import { describe, expect, it } from "vitest";
import { buildDecisionBrief } from "./decisionBrief";

const input = { conversionPct: 15 };
const analysis = { valid: true, marginSafetyPct: 12, drivers: [{ name: "Selling price", impact: 25, viable: true }] };
const industry = { name: "Cleaning Business", unit: "jobs" };

describe("deterministic executive decision brief", () => {
  it("prioritizes capacity, contribution and conversion risks", () => {
    const brief = buildDecisionBrief({ input, analysis, industry, currency: "USD", result: { valid: true, revenue: 10000, jobs: 100, leads: 667, marginPct: 18, gap: -20 } });
    expect(brief.actions.map(action => action.title)).toEqual(["Close the delivery-capacity gap", "Protect contribution before scaling", "Validate the inquiry-to-sale assumption", "Stress-test selling price"]);
    expect(brief.headline).toContain("exceeds current delivery capacity");
    expect(brief.text).toContain("MYBREAKEVEN EXECUTIVE DECISION BRIEF");
  });
  it("creates a weekly operating action when capacity and margin are healthy", () => {
    const brief = buildDecisionBrief({ input: { conversionPct: 30 }, analysis, industry, currency: "USD", result: { valid: true, revenue: 5000, jobs: 40, leads: 134, marginPct: 45, gap: 10 } });
    expect(brief.actions.some(action => action.title.includes("weekly operating plan"))).toBe(true);
    expect(brief.watchlist).toHaveLength(5);
  });
  it("refuses to narrate invalid calculations", () => {
    expect(buildDecisionBrief({ input, result: { valid: false }, analysis, industry }).valid).toBe(false);
  });
});
