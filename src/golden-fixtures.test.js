import { describe, expect, it } from "vitest";
import { calculate } from "./engine";
import { goldenFixtures } from "./golden-fixtures";
import { industries } from "./industries";

const exactMetrics = ["contribution", "fixedNeed", "jobs", "revenue", "practicalRevenue", "capacity", "leads"];
const integerMetrics = ["wholeJobs", "wholeCapacity", "wholeLeads"];

describe("engine 1.2.0 industry regression fixtures", () => {
  for (const [key, expected] of Object.entries(goldenFixtures)) {
    it(key + " matches its locked expected outputs", () => {
      const result = calculate(industries[key].values);
      expect(result.valid).toBe(true);
      for (const metric of exactMetrics) expect(result[metric]).toBeCloseTo(expected[metric], 10);
      for (const metric of integerMetrics) expect(result[metric]).toBe(expected[metric]);
    });
  }
});

describe("cross-industry formula properties", () => {
  for (const [key, model] of Object.entries(industries)) {
    it(key + " obeys monotonic economics, capacity and demand rules", () => {
      const baseline = calculate(model.values);
      const higherFixedCosts = calculate({ ...model.values, fixedCosts: model.values.fixedCosts + 100 });
      const higherPrice = calculate({ ...model.values, price: model.values.price + 1 });
      const slowerDelivery = calculate({ ...model.values, hoursPerJob: model.values.hoursPerJob * 1.1 });
      const betterConversion = calculate({ ...model.values, conversionPct: Math.min(100, model.values.conversionPct + 1) });
      expect(higherFixedCosts.jobs).toBeGreaterThan(baseline.jobs);
      expect(higherPrice.jobs).toBeLessThan(baseline.jobs);
      expect(slowerDelivery.capacity).toBeLessThan(baseline.capacity);
      expect(betterConversion.leads).toBeLessThanOrEqual(baseline.leads);
    });
  }
});
