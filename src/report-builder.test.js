import { describe, expect, it } from "vitest";
import { buildProReport } from "./reportBuilder";

const result = { valid: true, revenue: 20395.94, jobs: 113.31, wholeJobs: 114, capacity: 97.5, leads: 377.7, score: 66 };
const industry = { name: "Cleaning Business", unit: "jobs" };

describe("professional Pro report", () => {
  const html = buildProReport({ input: { fixedCosts: 3200, targetProfit: 1000 }, result, scenarios: [{ name: "Current plan", result }], industry, currency: "USD", engineVersion: "1.3.0", generatedAt: new Date("2026-09-14T12:00:00Z") });
  it("contains complete decision context", () => {
    for (const text of ["PRO REPORT", "Exact break-even revenue", "Scenario comparison", "Input assumptions", "Formula engine 1.3.0", "not tax, legal, accounting"] ) expect(html).toContain(text);
  });
  it("uses US Letter print formatting and responsive output", () => {
    expect(html).toContain("size:letter");
    expect(html).toContain("@media(max-width:620px)");
  });
  it("includes advanced decision analysis when supplied", () => {
    const analysis = { valid: true, accountingRevenue: 15000, targetRevenue: 20395.94, marginSafetyPct: 12.5, plannedProfit: 2300, capacityPrice: 195, additionalWorkers: 2, drivers: [{ name: "Selling price", impact: 18.2, viable: true }], forecast: [{ month: 1, units: 120, revenue: 21600, profit: 2300 }] };
    const advanced = buildProReport({ input: {}, result, scenarios: [{ name: "Current plan", result }], analysis, industry, currency: "USD", engineVersion: "1.3.0" });
    for (const text of ["Advanced decision metrics", "Accounting break-even", "Risk sensitivity", "12-month forecast", "Selling price"]) expect(advanced).toContain(text);
  });
  it("includes a deterministic executive decision brief when supplied", () => {
    const brief = { valid: true, headline: "Capacity needs attention.", actions: [{ severity: "critical", title: "Close the gap", detail: "Add capacity before committing." }] };
    const report = buildProReport({ input: {}, result, scenarios: [{ name: "Current plan", result }], brief, industry, currency: "USD", engineVersion: "1.3.0" });
    for (const text of ["EXECUTIVE DECISION BRIEF", "Capacity needs attention", "Close the gap", "Add capacity before committing"]) expect(report).toContain(text);
  });
  it("escapes report content", () => {
    const unsafe = buildProReport({ input: { note: "<script>" }, result, scenarios: [{ name: "<b>x</b>", result }], industry, currency: "USD", engineVersion: "1.3.0" });
    expect(unsafe).not.toContain("<script>");
    expect(unsafe).toContain("&lt;script&gt;");
  });
});
