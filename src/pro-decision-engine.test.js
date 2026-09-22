import { describe, expect, it } from "vitest";
import { analyzeOfferMix, analyzePriceGuard, buildBreakEvenLadder } from "./proDecisionEngine";
import { calculate } from "./engine";
import { limitsFor } from "./entitlements";

const input = { price: 100, materialCost: 10, laborCost: 30, otherVariableCost: 5, acquisitionCost: 5, fixedCosts: 1000, ownerPay: 500, targetProfit: 500, paymentFeePct: 0, workers: 2, hoursPerWorker: 40, hoursPerJob: 2, utilizationPct: 80, conversionPct: 25 };

describe("Pro decision engines", () => {
  it("keeps Decision Studio in the Pro entitlement", () => {
    expect(limitsFor("free").decisionStudio).toBeUndefined();
    expect(limitsFor("pro").decisionStudio).toBe(true);
  });
  it("calculates a normalized multi-offer sales mix and capacity requirement", () => {
    const analysis = analyzeOfferMix(input, [
      { name: "Core", price: 100, variableCost: 50, mixPct: 70, hours: 2 },
      { name: "Premium", price: 200, variableCost: 80, mixPct: 30, hours: 4 },
    ]);
    expect(analysis.valid).toBe(true);
    expect(analysis.weightedContribution).toBe(71);
    expect(analysis.totalUnits).toBeCloseTo(28.169, 3);
    expect(analysis.rows[1].contributionPerHour).toBe(30);
    expect(analysis.capacityGapHours).toBeGreaterThan(0);
  });

  it("shows the volume required to recover a discount", () => {
    const guard = analyzePriceGuard(input, calculate(input), 10);
    expect(guard.valid).toBe(true);
    expect(guard.newPrice).toBe(90);
    expect(guard.requiredUnits).toBe(50);
    expect(guard.volumeLiftPct).toBe(25);
    expect(guard.maxDiscountPct).toBe(50);
  });

  it("rejects a discount that removes contribution", () => {
    const guard = analyzePriceGuard(input, calculate(input), 60);
    expect(guard.valid).toBe(false);
    expect(guard.floorPrice).toBe(50);
  });

  it("builds transparent break-even levels", () => {
    const ladder = buildBreakEvenLadder(input, 10);
    expect(ladder.levels.map((level) => level.wholeUnits)).toEqual([20, 30, 40, 44]);
    expect(ladder.levels[2].revenue).toBe(4000);
  });
});
