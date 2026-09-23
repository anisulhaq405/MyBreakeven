import { describe, expect, it } from "vitest";
import { blogCollections, blogLibrarySummary, blogModels, blogPostMap, blogPosts } from "./content/blogs/index.js";

describe("central blog registry", () => {
  it("publishes every collection through one registry", () => {
    expect(Object.keys(blogCollections)).toEqual([
      "foundation",
      "pricing",
      "startup",
      "profitability",
      "volume",
      "concepts",
    ]);
    expect(blogPosts).toHaveLength(48);
    expect(Object.keys(blogPostMap)).toHaveLength(48);
    expect(blogLibrarySummary.guideCount).toBe(blogPosts.length);
    expect(blogLibrarySummary.modelCount).toBe(blogModels.length);
    expect(blogModels).toHaveLength(8);
    expect(blogModels).toContain("Agency");
    expect(blogModels).toContain("Mobile Detailing");
    expect(blogModels).not.toContain("Agency & Freelancer");
    expect(blogModels).not.toContain("Mobile detailing");
  });

  it("keeps slugs, titles and canonical destinations unique", () => {
    expect(new Set(blogPosts.map(post => post.slug)).size).toBe(blogPosts.length);
    expect(new Set(blogPosts.map(post => post.title)).size).toBe(blogPosts.length);
    for (const post of blogPosts) {
      expect(post.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      expect(post.calculatorSlug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
  });

  it("keeps required SEO and article fields complete", () => {
    for (const post of blogPosts) {
      expect(post.seoTitle.length).toBeGreaterThan(0);
      expect(`${post.seoTitle} | MyBreakeven`.length).toBeLessThanOrEqual(60);
      expect(post.metaDescription.length).toBeGreaterThanOrEqual(120);
      expect(post.metaDescription.length).toBeLessThanOrEqual(160);
      expect(post.image).toMatch(/^\/images\/blog\//);
      expect(post.alt.length).toBeGreaterThan(10);
      expect(post.faq.length).toBeGreaterThanOrEqual(4);
    }
  });
});
