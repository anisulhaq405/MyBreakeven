import { describe, expect, it } from "vitest";
import { calculate } from "./engine";
import { industries } from "./industries";

const moneyFields = [
  "materialCost", "laborCost", "otherVariableCost", "acquisitionCost",
  "fixedCosts", "ownerPay", "targetProfit",
];

describe.each(Object.entries(industries))("%s calculator boundary contract", (_key, model) => {
  const values = model.values;

  it("returns a valid baseline with internally consistent exact results", () => {
    const result = calculate(values);
    expect(result.valid).toBe(true);
    expect(result.jobs * result.contribution).toBeCloseTo(result.fixedNeed, 9);
    expect(result.revenue).toBeCloseTo(result.jobs * values.price, 9);
  });

  it("accepts fractional decimal strings without intermediate rounding", () => {
    const result = calculate({ ...values, price: String(values.price + 0.017), fixedCosts: String(values.fixedCosts + 0.013) });
    expect(result.valid).toBe(true);
    expect(result.jobs * result.contribution).toBeCloseTo(result.fixedNeed, 9);
  });

  it("keeps exact targets separate from rounded-up operating targets", () => {
    const result = calculate(values);
    expect(result.wholeJobs).toBe(Math.ceil(result.jobs));
    expect(result.practicalRevenue).toBe(result.wholeJobs * values.price);
    expect(result.wholeLeads).toBe(Math.ceil(result.leads));
  });

  it("allows zero monthly need and returns a zero break-even target", () => {
    const result = calculate({ ...values, fixedCosts: 0, ownerPay: 0, targetProfit: 0 });
    expect(result.valid).toBe(true);
    expect(result.jobs).toBe(0);
    expect(result.revenue).toBe(0);
  });

  it("allows zero utilization and reports zero delivery capacity", () => {
    const result = calculate({ ...values, utilizationPct: 0 });
    expect(result.valid).toBe(true);
    expect(result.capacity).toBe(0);
    expect(result.gap).toBeCloseTo(-result.jobs, 9);
  });

  it("at 100 percent conversion requires one inquiry per exact sale", () => {
    const result = calculate({ ...values, conversionPct: 100 });
    expect(result.valid).toBe(true);
    expect(result.leads).toBeCloseTo(result.jobs, 10);
  });

  it("rejects every blank variable-cost input instead of assuming zero", () => {
    for (const field of ["otherVariableCost", "acquisitionCost"]) {
      const result = calculate({ ...values, [field]: "" });
      expect(result.inputError, field).toBe(true);
    }
  });

  it("rejects negative monetary assumptions", () => {
    for (const field of moneyFields) {
      const result = calculate({ ...values, [field]: -0.01 });
      expect(result.inputError, field).toBe(true);
    }
  });

  it("rejects zero, fractional and negative team sizes", () => {
    for (const workers of [0, 1.5, -1]) {
      expect(calculate({ ...values, workers }).inputError).toBe(true);
    }
  });

  it("rejects invalid percentage boundaries", () => {
    expect(calculate({ ...values, conversionPct: 0 }).inputError).toBe(true);
    expect(calculate({ ...values, conversionPct: 100.01 }).inputError).toBe(true);
    expect(calculate({ ...values, utilizationPct: 100.01 }).inputError).toBe(true);
    expect(calculate({ ...values, paymentFeePct: 100.01 }).inputError).toBe(true);
  });

  it("rejects zero delivery time and non-positive contribution", () => {
    expect(calculate({ ...values, hoursPerJob: 0 }).inputError).toBe(true);
    const loss = calculate({ ...values, materialCost: values.price });
    expect(loss.valid).toBe(false);
    expect(loss.inputError).not.toBe(true);
    expect(loss.contribution).toBeLessThanOrEqual(0);
  });

  it("preserves monotonic cost, price, capacity and conversion behavior", () => {
    const baseline = calculate(values);
    expect(calculate({ ...values, fixedCosts: values.fixedCosts + 100 }).jobs).toBeGreaterThan(baseline.jobs);
    expect(calculate({ ...values, price: values.price + 1 }).jobs).toBeLessThan(baseline.jobs);
    expect(calculate({ ...values, hoursPerJob: values.hoursPerJob * 1.1 }).capacity).toBeLessThan(baseline.capacity);
    expect(calculate({ ...values, conversionPct: Math.min(100, values.conversionPct + 1) }).leads).toBeLessThanOrEqual(baseline.leads);
  });
});
