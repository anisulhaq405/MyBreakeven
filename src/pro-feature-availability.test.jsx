import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { calculate } from "./engine";
import { industries } from "./industries";
import ProIntelligence from "./ProIntelligence";
import MonthlyMonitor from "./MonthlyMonitor";

const industryKey = "cleaning";
const industry = industries[industryKey];
const input = industry.values;
const result = calculate(input);
const props = { input, result, industry, industryKey, currency: "USD", userId: "test-user" };

describe("Pro feature availability", () => {
  it("renders the protected Decision Studio and all seven tool tabs for Pro", () => {
    const html = renderToStaticMarkup(<ProIntelligence {...props} isPro />);
    expect(html).toContain('id="pro-analysis"');
    for (const feature of ["Offer Mix", "Price Guard", "Break-Even Ladder", "Acquisition", "Hire Break-Even", "Timeline", "Monthly Monitor"]) {
      expect(html).toContain(feature);
    }
    expect(html).toContain("PRO DECISION STUDIO");
  });

  it("keeps decision tools hidden from a free visitor", () => {
    const html = renderToStaticMarkup(<ProIntelligence {...props} isPro={false} />);
    expect(html).toContain('id="pro-analysis"');
    expect(html).toContain("Explore Pro");
    expect(html).not.toContain("PRO DECISION STUDIO");
    expect(html).not.toContain("Save / update month");
  });

  it("shows the monitor form only to a Pro rendering path and requires an account for saving", () => {
    const html = renderToStaticMarkup(<MonthlyMonitor {...props} userId={null} />);
    expect(html).toContain("MONTHLY BREAK-EVEN MONITOR");
    expect(html).toContain("Revenue (USD)");
    expect(html).toMatch(/disabled=""[^>]*>Save \/ update month/);
    expect(html).toContain("will not sync to another device");
  });
});
