import { describe, expect, it } from "vitest";
import { articleList } from "./blogData.js";

describe("industry guide SEO assets", () => {
  it("provides eight unique, clean article routes", () => {
    expect(articleList).toHaveLength(8);
    expect(new Set(articleList.map(article => article.slug)).size).toBe(8);
    expect(articleList.every(article => /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug))).toBe(true);
  });

  it("provides descriptive featured and in-article image metadata", () => {
    for (const article of articleList) {
      expect(article.image).toMatch(/^\/images\/blog\/.+-featured\.webp$/);
      expect(article.insideImage).toMatch(/^\/images\/blog\/.+-formula\.svg$/);
      expect(article.alt.length).toBeGreaterThan(60);
      expect(article.insideAlt.length).toBeGreaterThan(60);
      expect(article.alt.toLowerCase()).toContain("break-even");
      expect(article.imageCaption.length).toBeGreaterThan(70);
    }
  });
});
