import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect } from "vitest";
import { costProfiles, seedCostDraft, calculateBuiltCosts, appliedCostRows } from "./costBuilder";
import CostBuilder from "./CostBuilder";
import { industries } from "./industries";
import { calculate } from "./engine";
import { advancedAnalysis } from "./advancedAnalysis";
import { pricingSuggestions } from "./pricingSuggestions";
import { buildProReport } from "./reportBuilder";

describe("industry cost builder", () => {
  for (const [key, industry] of Object.entries(industries)) {
    for (const service of [0, 1]) it(`${key} service ${service} preserves existing totals until the user changes them`, () => {
      const draft = seedCostDraft(key, industry.values, service);
      const built = calculateBuiltCosts(key, draft);
      expect(built.valid).toBe(true);
      expect(calculate({ ...industry.values, ...built.patch })).toEqual(calculate(industry.values));
      const saved = { ...industry.values, ...built.patch, costBuilder: { industryKey: key, draft } };
      expect(appliedCostRows(JSON.parse(JSON.stringify(saved)))).toContainEqual(["Cost builder service", costProfiles[key].services[service]]);
      expect(appliedCostRows({ ...saved, laborCost: built.patch.laborCost + 1 })).toEqual([]);
    });
    it(`${key} starts collapsed so the 14-field calculator stays simple`, () => {
      const html = renderToStaticMarkup(<CostBuilder industryKey={key} input={industry.values} onApply={() => {}} />);
      expect(html).toContain("Build my costs");
      expect(html).toContain('aria-expanded="false"');
      expect(html).not.toContain('type="number"');
    });
  }
  it("combines materials, paid time and travel once and updates capacity and pricing", () => {
    const input = industries.cleaning.values;
    const draft = { ...seedCostDraft("cleaning", input), materials: ["12.10", "5.90"], other: ["8", "3", "1"], laborMode: "hourly", roles: [{ hours: "4", rate: "15" }, { hours: "1", rate: "0" }] };
    const built = calculateBuiltCosts("cleaning", draft);
    expect(built.patch).toEqual({ materialCost: 18, laborCost: 60, otherVariableCost: 12, hoursPerJob: 5 });
    expect(built.total).toBe(90);
    const changed = { ...input, ...built.patch };
    const result = calculate(changed);
    expect(result.contribution).toBe(74.78); // 180 - 18 - 60 - 12 - 10 - 5.22
    expect(result.wholeCapacity).toBe(68);
    const pricing = pricingSuggestions(changed, 68);
    expect(pricing.feasibleRows[2].price).toBe(234.75);
    expect(changed.acquisitionCost).toBe(10);
    expect(changed.paymentFeePct).toBe(2.9);
    expect(changed.ownerPay).toBe(4500);
  });
  it("excludes a known labor total when hourly labor is selected", () => {
    const draft = seedCostDraft("photography", industries.photography.values);
    draft.laborMode = "hourly";
    draft.roles = [{ hours: 2, rate: 0 }, { hours: 3, rate: 25 }, { hours: 0, rate: 0 }, { hours: 0, rate: 0 }];
    expect(calculateBuiltCosts("photography", draft).patch.laborCost).toBe(75);
    expect(calculateBuiltCosts("photography", draft).patch.hoursPerJob).toBe(5);
    draft.laborMode = "total";
    expect(calculateBuiltCosts("photography", draft).patch.laborCost).toBe(140);
    expect(calculateBuiltCosts("photography", draft).patch.hoursPerJob).toBe(8);
  });
  it("rejects empty, negative, malformed, overflow and zero-time drafts", () => {
    for (const value of ["", " ", -1, Infinity, "NaN", null, true]) {
      const draft = seedCostDraft("restaurant", industries.restaurant.values);
      draft.materials[0] = value;
      expect(calculateBuiltCosts("restaurant", draft).valid).toBe(false);
    }
    const draft = seedCostDraft("cleaning", industries.cleaning.values);
    expect(calculateBuiltCosts("cleaning", { ...draft, deliveryHours: 0 }).valid).toBe(false);
    expect(calculateBuiltCosts("cleaning", { ...draft, roles: [null, null] }).valid).toBe(false);
    expect(calculateBuiltCosts("cleaning", { ...draft, laborMode: "hourly", roles: [{ hours: 1e308, rate: 1e308 }, { hours: 0, rate: 0 }] }).valid).toBe(false);
  });
  it("keeps delivery commission out of dine-in fields and counts it once for delivery", () => {
    const input = industries.restaurant.values;
    const draft = seedCostDraft("restaurant", input, 1);
    draft.other = [1, 4, 0];
    const built = calculateBuiltCosts("restaurant", draft);
    const changed = { ...input, ...built.patch, paymentFeePct: 0, costBuilder: { industryKey: "restaurant", draft } };
    expect(calculate(changed).contribution).toBe(8.8);
    expect(appliedCostRows(changed)).toContainEqual(["Delivery commission per order", 4]);
    const dineIn = { ...input, costBuilder: { industryKey: "restaurant", draft: seedCostDraft("restaurant", input, 0) } };
    expect(appliedCostRows(dineIn).some(([label]) => label.includes("commission"))).toBe(false);
  });
  it("exports the applied breakdown without raw objects or stale details", () => {
    const industry = industries.ecommerce, draft = seedCostDraft("ecommerce", industry.values);
    draft.other = [5, 2, 1];
    const input = { ...industry.values, ...calculateBuiltCosts("ecommerce", draft).patch, costBuilder: { industryKey: "ecommerce", draft } };
    const report = values => buildProReport({ input: values, result: calculate(values), analysis: advancedAnalysis(values, calculate(values)), scenarios: [], industry, currency: "USD", engineVersion: "test" });
    const html = report(input);
    expect(html).toContain("Applied cost breakdown");
    expect(html).toContain("Expected returns cost per order</th><td>2");
    expect(html).not.toContain("[object Object]");
    expect(report({ ...input, otherVariableCost: 9 })).not.toContain("Applied cost breakdown");
  });
});
