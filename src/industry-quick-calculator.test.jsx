import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import IndustryPage, { industryPages } from "./IndustryPage.jsx";
import { calculate } from "./engine.js";
import { industries } from "./industries.js";

for (const [slug, expectedRevenue] of [
  ["restaurant-break-even-calculator", "$109,446"],
  ["ecommerce-break-even-calculator", "$50,482"],
]) {
  describe(slug, () => {
    it("serves a usable same-page calculator with the verified engine result", () => {
      const html = renderToStaticMarkup(<IndustryPage slug={slug} />);
      const quick = slug === "ecommerce-break-even-calculator" ? html.slice(html.indexOf('class="industry-quick-fields"'), html.indexOf('class="industry-quick-results"')) : html;
      expect(html).toContain('href="#industry-calculator"');
      expect(html).toContain('id="industry-calculator"');
      expect((quick.match(/type="number"/g) || []).length).toBe(slug === "restaurant-break-even-calculator" ? 15 : 14);
      expect(html).toContain('aria-live="polite"');
      expect(html).toContain(expectedRevenue);
    });
  });
}

for (const [slug, page] of Object.entries(industryPages)) {
  it(`${slug} exposes editable inputs and distinguishes a profit target from break-even`, () => {
    const html = renderToStaticMarkup(<IndustryPage slug={slug} />);
    const quick = slug === "ecommerce-break-even-calculator" ? html.slice(html.indexOf('class="industry-quick-fields"'), html.indexOf('class="industry-quick-results"')) : html;
    const expected = calculate(industries[page.key].values);
    expect((quick.match(/type="number"/g) || []).length).toBe(slug === "restaurant-break-even-calculator" ? 15 : 14);
    expect(html).toContain('href="#industry-calculator"');
    expect(html).toContain(`/?industry=${page.key}&amp;from=industry#calculator`);
    expect(html).toContain(expected.practicalRevenue.toLocaleString("en-US", { style: "currency", currency: "USD" }));
    expect(html).toContain("set owner pay and target profit to zero");
    expect(html).toContain("Formula, assumptions and rounding");
  });
}
