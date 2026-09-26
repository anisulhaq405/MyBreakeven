import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { blogCollections, blogPostMap } from "./content/blogs/index.js";

const posts = blogCollections.financialPlanning;

describe("ten financial planning guides", () => {
  it("ships ten distinct, dated guides with usable metadata and assets", () => {
    expect(posts).toHaveLength(10);
    expect(new Set(posts.map(post => post.slug)).size).toBe(10);
    const sitemap = readFileSync("public/sitemap.xml", "utf8");
    for (const post of posts) {
      expect(post.published).toBe("2026-09-26");
      expect(post.modified).toBe("2026-09-26");
      expect(`${post.seoTitle} | MyBreakeven`.length).toBeLessThanOrEqual(60);
      expect(post.metaDescription.length).toBeGreaterThanOrEqual(140);
      expect(post.metaDescription.length).toBeLessThanOrEqual(155);
      expect(post.faq).toHaveLength(6);
      expect(sitemap).toContain(`https://mybreakeven.com/blogs/${post.slug}/`);
      const image = readFileSync(`public${post.image}`);
      expect(image.subarray(0, 4).toString()).toBe("RIFF");
      expect(image.length).toBeGreaterThan(20_000);
      expect(image.length).toBeLessThan(220_000);
    }
  });

  it("connects articles to valid guides, one calculator, and real downloads", () => {
    for (const post of posts) {
      expect(post.html.match(/https:\/\/mybreakeven\.com\/calculators\//g)).toHaveLength(1);
      expect(post.html).toContain('href="https://mybreakeven.com/blogs/"');
      const slugs = [...post.html.matchAll(/href="https:\/\/mybreakeven\.com\/blogs\/([^/"#?]+)\//g)].map(match => match[1]);
      expect(slugs.length).toBeGreaterThanOrEqual(2);
      for (const slug of slugs) expect(blogPostMap[slug], `${post.slug} links to ${slug}`).toBeTruthy();
      for (const match of post.html.matchAll(/href="(\/downloads\/[^\"]+\.xlsx)"/g)) {
        expect(readFileSync(`public${match[1]}`).subarray(0, 2).toString()).toBe("PK");
      }
      for (const faq of post.faq) expect(post.html).toContain(`<h3>${faq.q}</h3>`);
    }
  });
});
