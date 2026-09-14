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
  it("escapes report content", () => {
    const unsafe = buildProReport({ input: { note: "<script>" }, result, scenarios: [{ name: "<b>x</b>", result }], industry, currency: "USD", engineVersion: "1.3.0" });
    expect(unsafe).not.toContain("<script>");
    expect(unsafe).toContain("&lt;script&gt;");
  });
});
