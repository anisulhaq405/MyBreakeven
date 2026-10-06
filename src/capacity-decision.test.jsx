import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, it, expect } from "vitest";
import { calculate } from "./engine";
import { industries } from "./industries";
import { capacityDecision } from "./capacityDecision";
import Insights from "./Insights";

describe("capacity decision", () => {
  it("explains invalid inputs instead of silently hiding the results", () => {
    const input = { ...industries.cleaning.values, price: 0 };
    const result = calculate(input);
    const html = renderToStaticMarkup(<Insights result={result} input={input} industry={industries.cleaning} currency="USD" />);
    expect(html).toContain('role="status"');
    expect(html).toContain(result.message);
    expect(html).not.toContain("Capacity feasibility");
  });
  it("shows the engine explanation when sales have no positive contribution", () => {
    const input = { ...industries.cleaning.values, price: 50, laborCost: 100 };
    const result = calculate(input);
    const html = renderToStaticMarkup(<Insights result={result} input={input} industry={industries.cleaning} currency="USD" />);
    expect(result.inputError).not.toBe(true);
    expect(html).toContain(result.message);
    expect(html).toContain("Review your calculator inputs");
  });
  it("does not call the default overloaded cleaning plan feasible", () => {
    const input = industries.cleaning.values;
    const result = calculate(input);
    expect(result.score).toBeGreaterThan(50);
    const html = renderToStaticMarkup(<Insights result={result} input={input} industry={industries.cleaning} currency="USD" />);
    expect(html).toContain("target exceeds delivery capacity");
    expect(html).toContain("116.22% of capacity required");
    expect(html).toContain("Whole-unit shortfall: 17.");
    expect(html).not.toContain("Feasible, but");
  });
  it("requires whole sales to fit whole delivery capacity", () => {
    const decision = capacityDecision({ jobs: 10.1, capacity: 10.9, wholeJobs: 11, wholeCapacity: 10 });
    expect(decision.fits).toBe(false);
  });
  it("distinguishes spare capacity and the exact boundary", () => {
    expect(capacityDecision({ jobs: 10, capacity: 12, wholeJobs: 10, wholeCapacity: 12 }).wholeGap).toBe(2);
    expect(capacityDecision({ jobs: 10, capacity: 10, wholeJobs: 10, wholeCapacity: 10 }).summary).toContain("no whole-unit cushion");
  });
  it("handles zero capacity and zero monthly need without an infinite percentage", () => {
    expect(capacityDecision({ jobs: 10, capacity: 0, wholeJobs: 10, wholeCapacity: 0 }).utilization).toBe(null);
    const zero = capacityDecision({ jobs: 0, capacity: 0, wholeJobs: 0, wholeCapacity: 0 });
    expect(zero.utilization).toBe(0);
    expect(zero.summary).toContain("No sales are required");
  });
});
