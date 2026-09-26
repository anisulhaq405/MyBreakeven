import { describe, expect, it } from "vitest";
import { blogPosts } from "./content/blogs/index.js";
import { filterBlogPosts } from "./blogSearch.js";

describe("blog discovery", () => {
  it("searches titles, descriptions, tags, and article topics", () => {
    expect(filterBlogPosts(blogPosts, "cleaning").length).toBeGreaterThan(0);
    expect(filterBlogPosts(blogPosts, "retainer").some(post => post.slug === "agency-retainer-pricing")).toBe(true);
  });
  it("combines topic search with a category filter", () => {
    const tag = blogPosts.find(post => post.title.toLowerCase().includes("cleaning"))?.tag;
    const results = filterBlogPosts(blogPosts, "cleaning", tag);
    expect(results.length).toBeGreaterThan(0);
    expect(results.every(post => post.tag === tag)).toBe(true);
  });
  it("preserves each guide's own publication date", () => {
    expect(new Set(blogPosts.map(post => post.published)).size).toBeGreaterThan(1);
    expect(blogPosts.every(post => /^2026-09-(10|17|18|20|22|23|26)$/.test(post.published))).toBe(true);
  });
});
