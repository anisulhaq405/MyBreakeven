import { describe, expect, it } from "vitest";
import { blogPosts, blogLibrarySummary } from "./content/blogs/index.js";
import { homeBlogData } from "./homeBlogData.js";
import { blogListingData } from "./blogListingData.js";
import { loadBlogPost } from "./blogContentLoader.js";

describe("small initial content payloads", () => {
  it("keeps homepage and blog listing in sync with the article registry", () => {
    expect(homeBlogData.guideCount).toBe(blogLibrarySummary.guideCount);
    expect(blogListingData.posts).toHaveLength(blogPosts.length);
    expect(blogListingData.modelCount).toBe(blogLibrarySummary.modelCount);
    for (const highlight of [homeBlogData.featured, ...homeBlogData.supporting]) {
      expect(blogPosts.some(post => post.slug === highlight.slug)).toBe(true);
    }
    for (const preview of blogListingData.posts) {
      expect(preview.html).toBeUndefined();
      expect(preview.faq).toBeUndefined();
      expect(preview.description).toBe(blogPosts.find(post => post.slug === preview.slug)?.description);
    }
  });

  it("loads the complete and correct guide for every route", async () => {
    for (const reference of blogPosts) {
      const post = await loadBlogPost(reference.slug);
      expect(post.slug).toBe(reference.slug);
      expect(post.title).toBe(reference.title);
      expect(post.metaDescription).toBe(reference.metaDescription);
      expect(post.faq).toEqual(reference.faq);
      expect(post.html).toBe(reference.html);
    }
    expect(await loadBlogPost("missing-guide")).toBeNull();
  });
});
