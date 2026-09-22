import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { blogPostMap, blogPosts } from "./content/blogs/index.js";

const posts = blogPosts.filter(post => post.cluster === "volume-to-income");

describe("Day 4 volume-to-income guides", () => {
  it("publishes all eight guides with the actual release date", () => {
    expect(posts).toHaveLength(8);
    expect(new Set(posts.map(post => post.slug)).size).toBe(8);
    for (const post of posts) {
      expect(post.published).toBe("2026-09-22");
      expect(post.modified).toBe("2026-09-22");
    }
  });

  it("keeps production metadata clean and within SEO limits", () => {
    for (const post of posts) {
      expect(`${post.seoTitle} | MyBreakeven`.length).toBeLessThanOrEqual(60);
      expect(post.metaDescription.length).toBeGreaterThanOrEqual(140);
      expect(post.metaDescription.length).toBeLessThanOrEqual(155);
      expect(post.html).not.toMatch(/``|<p>---<\/p>|Title tag:|Short keyword slug:|##/);
    }
  });

  it("connects every guide to its calculator, blog hub, and valid internal guides", () => {
    for (const post of posts) {
      const calculatorLinks = post.html.match(/https:\/\/mybreakeven\.com\/calculators\//g) || [];
      expect(calculatorLinks).toHaveLength(1);
      expect(post.html).toContain('href="https://mybreakeven.com/blogs/"');

      const internalSlugs = [...post.html.matchAll(/href="https:\/\/mybreakeven\.com\/blogs\/([^/"#?]+)\//g)]
        .map(match => match[1]);
      for (const slug of internalSlugs) expect(blogPostMap[slug]).toBeTruthy();
    }
  });

  it("ships optimized feature images", () => {
    for (const post of posts) {
      const image = readFileSync(`public${post.image}`);
      expect(image.subarray(0, 4).toString()).toBe("RIFF");
      expect(image.length).toBeGreaterThan(20_000);
      expect(image.length).toBeLessThan(220_000);
    }
  });
});
