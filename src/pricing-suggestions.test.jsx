import React from "react";
import Decimal from "decimal.js";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect } from "vitest";
import { pricingSuggestions } from "./pricingSuggestions";
import PricingSuggestions from "./PricingSuggestions";
import ProIntelligence from "./ProIntelligence";
import { industries } from "./industries";
import { calculate } from "./engine";
import { advancedAnalysis } from "./advancedAnalysis";
import { pricingReportRows } from "./pricingReport";
import { buildProReport } from "./reportBuilder";

const input = { ...industries.cleaning.values, price: 250, materialCost: 100, laborCost: 0, otherVariableCost: 0, acquisitionCost: 0, paymentFeePct: 3, fixedCosts: 3000, ownerPay: 2000, targetProfit: 1000, workers: 1, hoursPerWorker: 40, hoursPerJob: 2, utilizationPct: 100 };
describe("pricing suggestions", () => {
  it("funds three distinct cost levels and rounds upward to cents", () => {
    const a = pricingSuggestions(input, 40);
    expect(a.rows.map(r => r.price)).toEqual([103.1, 231.96, 257.74]);
    expect(a.rows[2].requiredUnits).toBe(40);
    expect(a.rows[2].profit).toBeCloseTo(1000.312);
    expect(a.currentProfit).toBe(700);
    expect(a.currentRequiredUnits).toBe(43);
  });
  it("changes required price when expected sales, fees or costs change", () => {
    expect(pricingSuggestions(input, 20).rows[2].price).toBe(412.38);
    expect(pricingSuggestions({ ...input, paymentFeePct: 0 }, 40).rows[2].price).toBe(250);
    expect(pricingSuggestions({ ...input, acquisitionCost: 10 }, 40).rows[2].price).toBe(268.05);
  });
  it("flags demand beyond whole capacity and agrees with the capacity solver", () => {
    const limited = { ...input, hoursPerWorker: 10, hoursPerJob: 4 };
    const a = pricingSuggestions(limited, 40);
    expect(a.wholeCapacity).toBe(10);
    expect(a.plannedFitsCapacity).toBe(false);
    expect(a.rows[2].fitsCapacity).toBe(false);
    expect(a.capacityTargetPrice).toBe(721.65);
    expect(advancedAnalysis(limited, calculate(limited)).capacityPrice).toBe(a.capacityTargetPrice);
  });
  it("handles zero capacity without infinity or a feasible verdict", () => {
    const a = pricingSuggestions({ ...input, utilizationPct: 0 }, 40);
    expect(a.capacityTargetPrice).toBeNull();
    expect(a.rows[2].fitsCapacity).toBe(false);
  });
  it("handles a zero-contribution floor and zero financial need", () => {
    const a = pricingSuggestions({ ...input, paymentFeePct: 0 }, 40);
    expect(a.rows[0].requiredUnits).toBeNull();
    const zero = pricingSuggestions({ ...input, fixedCosts: 0, ownerPay: 0, targetProfit: 0, paymentFeePct: 0 }, 40);
    expect(zero.rows.slice(1).every(r => r.requiredUnits === 0 && r.profit === 0)).toBe(true);
  });
  it.each([0, -1, 1.5, NaN, Infinity, ""])("rejects invalid monthly volume %s", volume => {
    expect(pricingSuggestions(input, volume).valid).toBe(false);
  });
  it.each([{ paymentFeePct: 100 }, { paymentFeePct: 101 }, { hoursPerJob: 0 }, { materialCost: -1 }, { fixedCosts: Infinity }, { laborCost: NaN }, { laborCost: null }, { laborCost: true }, { laborCost: " " }, { utilizationPct: 101 }])("rejects invalid assumptions %s", changes => {
    expect(pricingSuggestions({ ...input, ...changes }, 40).valid).toBe(false);
  });
  it.each(Object.entries(industries))("funds the selected target in %s", (key, industry) => {
    const base = industry.values;
    const a = pricingSuggestions(base, 40);
    const r = a.rows[2];
    const contribution = new Decimal(r.price).mul(new Decimal(1).minus(new Decimal(base.paymentFeePct).div(100))).minus(a.variableCost);
    expect(contribution.mul(40).gte(a.targetNeed)).toBe(true);
    expect(r.requiredUnits).toBeLessThanOrEqual(40);
    const html = renderToStaticMarkup(<PricingSuggestions input={base} plannedUnits={40} industry={industry} currency="USD" />);
    expect(html).toContain(`per ${industry.singular}`);
    expect(html).toContain("Also earn your target profit");
    expect(html).not.toMatch(/NaN|Infinity/);
  });
  it("renders the capacity warning and an actionable invalid input message", () => {
    const render = (volume, changes = {}) => renderToStaticMarkup(<PricingSuggestions input={{ ...input, ...changes }} plannedUnits={volume} industry={industries.cleaning} currency="EUR" />);
    expect(render(40, { utilizationPct: 0 })).toContain("No whole jobs can be delivered");
    expect(render(0)).toContain('role="alert"');
    expect(render(40)).toContain("€257.74");
  });
  it("keeps suggestions behind the Pro dashboard", () => {
    const html = renderToStaticMarkup(<ProIntelligence input={input} result={calculate(input)} industry={industries.cleaning} currency="USD" isPro={false} />);
    expect(html).not.toContain("Sustainable price");
  });
  it("uses deliverable volume for both price and current profit in the screenshot case", () => {
    const base = industries.cleaning.values;
    const a = pricingSuggestions(base, 131);
    expect(a.feasibleUnits).toBe(97);
    expect(a.feasibleRows[2].price).toBe(193.30);
    expect(a.feasibleCurrentProfit).toBeCloseTo(-252.34);
    expect(a.rows[0].requiredUnits).toBeNull();
    const html = renderToStaticMarkup(<PricingSuggestions input={base} plannedUnits={131} industry={industries.cleaning} currency="USD" />);
    expect(html).toContain("$193.30");
    expect(html).toContain("$252.34");
    expect(html).not.toContain("2871288");
    expect(html).not.toContain("$169.33");
    expect(html).not.toContain("decrease of");
  });
  it("does not assume demand up to capacity when expected sales are lower", () => {
    const a = pricingSuggestions(industries.cleaning.values, 80);
    expect(a.feasibleUnits).toBe(80);
    expect(a.feasibleRows[2].price).toBe(212.93);
  });
  it("checks the expense-covering price against its own goal", () => {
    const base = { ...input, workers: 1, hoursPerWorker: 35, hoursPerJob: 3.5, utilizationPct: 100, fixedCosts: 5000, ownerPay: 0, targetProfit: 1000 };
    const a = pricingSuggestions(base, 40);
    expect(a.rows[1].requiredUnits).toBe(40);
    expect(a.rows[1].fitsCapacity).toBe(true);
  });
  it("keeps loss-making current prices usable for a recovery plan", () => {
    const base = { ...industries.cleaning.values, price: 90 };
    const html = renderToStaticMarkup(<ProIntelligence input={base} result={calculate(base)} industry={industries.cleaning} plannedUnits={97} currency="USD" isPro />);
    expect(html).toContain("$193.30");
    expect(html).toContain("What should your price cover?");
  });
  it("rejects fractional teams and includes identical pricing assumptions in report rows", () => {
    expect(pricingSuggestions({ ...input, workers: 1.5 }, 40).valid).toBe(false);
    const base = industries.cleaning.values;
    const rows = pricingReportRows(base, 80, "USD");
    expect(rows).toContainEqual(["Expected monthly sales", 80]);
    expect(rows).toContainEqual(["Minimum price: including target profit", "$212.93"]);
    const result = calculate(base);
    const html = buildProReport({ input: base, result, scenarios: [], analysis: advancedAnalysis(base, result, { plannedUnits: 80, growthPct: 4 }), planning: { plannedUnits: 80, growthPct: 4 }, industry: industries.cleaning, currency: "USD", engineVersion: "1.3.0" });
    expect(html).toContain("$212.93");
    expect(html).toContain("Growth assumption: 4%");
    expect(html).not.toContain("2871288");
  });
});
