import { describe, it, expect } from "vitest";
import { blogPosts, blogPostMap } from "./content/blogs/index.js";
import { articleGuideType } from "./articleGuideType.js";

describe("Content recovery financial boundaries", () => {
  it("uses whole daily targets that actually fund restaurant owner-pay goals", () => {
    const daily = Math.ceil(Math.ceil(46000 / 17.07) / 24);
    expect(daily).toBe(113);
    expect((79 * 18.6 + 34 * 13.5) * 24).toBeGreaterThanOrEqual(46000);
    expect((78 * 18.6 + 34 * 13.5) * 24).toBeLessThan(46000);
    expect(Math.ceil(Math.ceil(26000 / 30) / 27)).toBe(33);
    expect(blogPostMap['restaurant-covers-per-night-break-even'].html).toContain('113 units');
    expect(blogPostMap['restaurant-covers-per-night-break-even'].html).toContain('33 whole covers');
  });
  it("keeps photography monthly delivery hours consistent with 52 annual weeks", () => {
    const html = blogPostMap['how-many-photography-clients-month'].html;
    for (const monthly of [72,175,84,126]) expect(html).toContain((monthly * 12 / 52).toFixed(2));
  });
  it("gives every newly published October 7 guide an editorial inbound path", () => {
    for (const post of blogPosts.filter(a => a.published === '2026-10-07')) {
      expect(blogPosts.some(a => a.slug !== post.slug && a.published < post.published && a.html?.includes('/blogs/'+post.slug+'/'))).toBe(true);
    }
  });
  it("labels volume and pricing guides by the decision they answer", () => {
    expect(articleGuideType(blogPostMap['how-many-photography-clients-month'])).toBe('VOLUME PLANNING GUIDE');
    expect(articleGuideType(blogPostMap['bridal-hair-and-makeup-package-pricing-for-salons'])).toBe('PRICING GUIDE');
  });
});
