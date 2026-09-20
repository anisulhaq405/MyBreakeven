import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { blogCollections } from "./content/blogs/index.js";

const articleList = blogCollections.foundation;

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

  it("provides unique SEO titles, topic tags and honest publication dates", () => {
    expect(new Set(articleList.map(article => article.seoTitle)).size).toBe(8);
    for (const article of articleList) {
      expect(`${article.seoTitle} | MyBreakeven`.length).toBeLessThanOrEqual(72);
      expect(article.metaDescription.length).toBeGreaterThanOrEqual(120);
      expect(article.metaDescription.length).toBeLessThanOrEqual(160);
      expect(article.tags.length).toBeGreaterThanOrEqual(4);
      expect(article.opening.length).toBeGreaterThan(120);
      expect(article.published).toBe("2026-09-10");
      expect(article.modified).toBe("2026-09-13");
    }
  });

  it("ships eight distinct optimized raster featured images", () => {
    const images = articleList.map(article => readFileSync(new URL(`../public${article.image}`, import.meta.url)));
    expect(new Set(images.map(image => image.toString("base64"))).size).toBe(8);
    expect(images.every(image => image.length > 40_000 && image.length < 250_000)).toBe(true);
  });
});
