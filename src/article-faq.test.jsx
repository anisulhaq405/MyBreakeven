import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { articleFaq } from "./articleFaq.js";
import { blogPostMap } from "./content/blogs/index.js";
import LongformArticle from "./LongformArticle.jsx";

describe("article FAQ presentation and schema source", () => {
  it("makes existing standalone FAQ data visible in legacy longform guides", () => {
    const post = blogPostMap["margin-vs-markup"];
    expect(articleFaq(post).inline).toBe(false);
    const html = renderToStaticMarkup(<LongformArticle article={post} />);
    expect(html).toContain("Frequently asked questions");
    for (const item of post.faq) expect(html).toContain(item.q);
  });
  it("uses the visible answer when stale metadata differs", () => {
    const post = blogPostMap["ecommerce-profit-margin"];
    const faq = articleFaq(post);
    expect(faq.inline).toBe(true);
    expect(faq.items.find(item => item.q === "Should owner pay be included in ecommerce expenses?").a).toContain("Then show owner distributions separately");
  });
  it("does not repeat inline FAQs or absorb the following takeaways", () => {
    const post = blogPostMap["retail-break-even-analysis"];
    const faq = articleFaq(post);
    expect(faq.items).toEqual(post.faq);
    const html = renderToStaticMarkup(<LongformArticle article={post} />);
    expect(html.match(/Should I use items or receipts as the sales unit\?/g)).toHaveLength(1);
    expect(faq.items.at(-1).a).not.toContain("Takeaways");
  });
  it("normalizes inline markup and entities without adding schema-only text", () => {
    expect(articleFaq({ html: '<h2 id="faq">FAQs</h2><h3>Price &amp; cost?</h3><p>A <strong>$40</strong> cost.</p><p>Use actual costs.</p><h2>Takeaways</h2>', faq: [] }).items).toEqual([{ q: "Price & cost?", a: "A $40 cost. Use actual costs." }]);
  });
});
