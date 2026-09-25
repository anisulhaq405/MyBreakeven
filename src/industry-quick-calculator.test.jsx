import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import IndustryPage from "./IndustryPage.jsx";

for (const [slug, expectedRevenue] of [
  ["restaurant-break-even-calculator", "$109,446"],
  ["ecommerce-break-even-calculator", "$50,482"],
]) {
  describe(slug, () => {
    it("serves a usable same-page calculator with the verified engine result", () => {
      const html = renderToStaticMarkup(<IndustryPage slug={slug} />);
      expect(html).toContain('href="#industry-calculator"');
      expect(html).toContain('id="industry-calculator"');
      expect((html.match(/type="number"/g) || []).length).toBe(14);
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain(expectedRevenue);
    });
  });
}
