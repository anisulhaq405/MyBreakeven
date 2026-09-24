import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import ProUserGuide from "./ProUserGuide";

describe("Pro user guide", () => {
  it("maps the signed-in path, all seven decision tools and storage limits", () => {
    const html = renderToStaticMarkup(<ProUserGuide />);
    expect(html).toContain('href="/dashboard/"');
    expect(html).toContain('href="/#pro-analysis"');
    expect(html).toContain('href="/#calculator-inputs"');
    for (const id of ["offer-mix", "price-guard", "ladder", "acquisition", "hire", "timeline", "monitor"]) {
      expect(html).toContain(`id="${id}"`);
    }
    expect(html).toContain("24 months");
    expect(html).toContain("100 saved scenarios");
    expect(html).toContain("illustrated navigation map");
  });
});
