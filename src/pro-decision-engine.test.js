import { describe, expect, it } from "vitest";
import { analyzeAcquisitionBreakEven, analyzeHireBreakEven, analyzeOfferMix, analyzePriceGuard, buildBreakEvenLadder, buildBreakEvenTimeline } from "./proDecisionEngine";
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

  it("rejects an invalid offer instead of silently removing it from the mix", () => {
    const analysis = analyzeOfferMix(input, [
      { name: "Core", price: 100, variableCost: 50, mixPct: 70, hours: 2 },
      { name: "Premium", price: 0, variableCost: 80, mixPct: 30, hours: 4 },
    ]);
    expect(analysis.valid).toBe(false);
    expect(analysis.message).toMatch(/Every offer/);
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

  it("calculates CAC payback from contribution and repeat purchases", () => {
    const analysis = analyzeAcquisitionBreakEven(input, calculate(input), { monthlySpend: 1000, leads: 100, conversionPct: 20, repeatPurchases: 2 });
    expect(analysis.customers).toBe(20);
    expect(analysis.cac).toBe(50);
    expect(analysis.customerContribution).toBe(110);
    expect(analysis.lifetimeProfitAfterCac).toBe(60);
    expect(analysis.breakEvenPurchases).toBeCloseTo(50 / 55);
    expect(analysis.leadsNeededToRecoverSpend).toBeCloseTo(1000 / (55 * 2 * .2));
  });

  it("shows when an additional hire pays for itself", () => {
    const analysis = analyzeHireBreakEven(input, calculate(input), { monthlyPay: 2000, payrollBurdenPct: 10, otherMonthlyCost: 300, oneTimeCost: 1000, productiveHoursPerMonth: 160, expectedExtraUnits: 60 });
    expect(analysis.monthlyHireCost).toBe(2500);
    expect(analysis.breakEvenUnits).toBe(50);
    expect(analysis.requiredLeads).toBe(200);
    expect(analysis.utilizationNeededPct).toBe(62.5);
    expect(analysis.monthlyNetBenefit).toBe(500);
    expect(analysis.paybackMonths).toBe(2);
  });

  it("builds a monthly startup recovery timeline", () => {
    const timeline = buildBreakEvenTimeline(input, calculate(input), { startupInvestment: 3000, startingMonthlyUnits: 50, growthPct: 0, maxMonths: 12 });
    expect(timeline.operatingBreakEvenUnits).toBe(30);
    expect(timeline.operatingBreakEvenRevenue).toBe(3000);
    expect(timeline.paybackMonth).toBe(3);
    expect(timeline.targetProfitMonth).toBe(1);
    expect(timeline.forecast[0].breakEvenDay).toBe(18);
  });
});
