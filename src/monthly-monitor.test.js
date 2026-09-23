import { describe, expect, it } from "vitest";
import { analyzeMonth, snapshotPlan } from "./monthlyMonitor";
import { calculate } from "./engine";

const input = { price: 100, materialCost: 10, laborCost: 30, otherVariableCost: 5, acquisitionCost: 5, fixedCosts: 1000, ownerPay: 500, targetProfit: 500, paymentFeePct: 0, workers: 2, hoursPerWorker: 40, hoursPerJob: 2, utilizationPct: 80, conversionPct: 25 };
const plan = snapshotPlan(input, calculate(input));

describe("monthly break-even monitor", () => {
  it("compares recorded results with the plan snapshot, including owner pay", () => {
    const month = analyzeMonth({ month: "2026-09", units: 45, revenue: 4500, variableCosts: 2250, fixedCosts: 1000, ownerPay: 500, inquiries: 180 }, plan);
    expect(month.valid).toBe(true);
    expect(month.profit).toBe(750);
    expect(month.profitGap).toBe(250);
    expect(month.revenueGap).toBe(500);
    expect(month.unitGap).toBe(5);
    expect(month.breakEvenUnits).toBe(30);
    expect(month.conversionPct).toBe(25);
  });

  it("makes non-positive contribution explicit and rejects malformed entries", () => {
    const loss = analyzeMonth({ month: "2026-08", units: 10, revenue: 800, variableCosts: 900, fixedCosts: 1000, ownerPay: 500, inquiries: 0 }, plan);
    expect(loss.profit).toBe(-1600);
    expect(loss.breakEvenUnits).toBeNull();
    expect(loss.conversionPct).toBeNull();
    expect(analyzeMonth({ month: "2026-13", units: 1.5, revenue: -1, variableCosts: 0, fixedCosts: 0, ownerPay: 0, inquiries: 1 }, plan).valid).toBe(false);
  });
});
