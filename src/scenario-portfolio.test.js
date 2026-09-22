import { describe, expect, it } from "vitest";
import { compareScenarioCostDrift, filterScenarioPortfolio, summarizeScenarioPortfolio } from "./scenarioPortfolio";

const items = [
  { id: "a", name: "Baseline", industry_key: "salon", currency: "USD", updated_at: "2026-01-01", inputs: { price: 100, materialCost: 10, laborCost: 20, otherVariableCost: 5, acquisitionCost: 5, paymentFeePct: 0, fixedCosts: 1000, ownerPay: 500, targetProfit: 500 }, result: { valid: true, revenue: 4000, jobs: 40, capacity: 50, contribution: 50, score: 80 } },
  { id: "b", name: "Higher costs", industry_key: "salon", currency: "USD", updated_at: "2026-02-01", inputs: { price: 100, materialCost: 15, laborCost: 25, otherVariableCost: 5, acquisitionCost: 5, paymentFeePct: 0, fixedCosts: 1000, ownerPay: 500, targetProfit: 500 }, result: { valid: true, revenue: 5000, jobs: 50, capacity: 45, contribution: 40, score: 65 } },
  { id: "c", name: "Agency plan", industry_key: "agency", currency: "GBP", updated_at: "2026-03-01", inputs: {}, result: { valid: false } },
];

describe("scenario portfolio analysis", () => {
  it("summarizes viable plans and capacity risk", () => {
    expect(summarizeScenarioPortfolio(items)).toEqual({ count: 3, viable: 2, averageRevenue: 4500, averageScore: 72.5, bestScore: 80, capacityRisks: 1 });
  });
  it("filters and sorts without mutating saved scenarios", () => {
    expect(filterScenarioPortfolio(items, { industry: "salon", sort: "revenue-high" }).map(item => item.id)).toEqual(["b", "a"]);
    expect(filterScenarioPortfolio(items, { query: "agency" }).map(item => item.id)).toEqual(["c"]);
    expect(items[0].id).toBe("a");
  });
  it("compares real unit-cost and break-even drift against the first selection", () => {
    const drift = compareScenarioCostDrift(items.slice(0, 2));
    expect(drift.valid).toBe(true);
    expect(drift.rows[1].variableCostChangePct).toBe(25);
    expect(drift.rows[1].contributionChangePct).toBe(-20);
    expect(drift.rows[1].revenueChangePct).toBe(25);
    expect(drift.rows[1].unitsChangePct).toBe(25);
  });
});
