import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const html = readFileSync(new URL("../index.html", import.meta.url), "utf8");
const content = (pattern) => html.match(pattern)?.[1] ?? "";

describe("homepage SEO contract", () => {
  it("has one concise, descriptive title and meta description", () => {
    const title = content(/<title>([^<]+)<\/title>/);
    const description = content(/<meta name="description" content="([^"]+)"/);
    expect(title).toBe("Free Small Business Break-Even Calculator | MyBreakeven");
    expect(title.length).toBeLessThanOrEqual(65);
    expect(description.length).toBeGreaterThanOrEqual(120);
    expect(description.length).toBeLessThanOrEqual(165);
  });

  it("has canonical, crawl, language and sitemap signals", () => {
    expect(html).toContain('<html lang="en-US">');
    expect(html).toContain('<link rel="canonical" href="https://mybreakeven.com/"');
    expect(html).toContain('<link rel="sitemap" type="application/xml" href="/sitemap.xml"');
    expect(html).toContain('name="robots" content="index,follow');
    expect(html).not.toContain('name="keywords"');
  });

  it("has complete social sharing image metadata", () => {
    expect(html).toContain('property="og:image" content="https://mybreakeven.com/mybreakeven-social-preview.png"');
    expect(html).toContain('property="og:image:width" content="1200"');
    expect(html).toContain('property="og:image:height" content="630"');
    expect(html).toContain('property="og:image:alt"');
    expect(html).toContain('name="twitter:card" content="summary_large_image"');
    expect(html).toContain('name="twitter:image:alt"');
  });

  it("ships valid homepage JSON-LD with real entities only", () => {
    const json = content(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    const data = JSON.parse(json);
    const types = data["@graph"].map((entry) => entry["@type"]);
    expect(types).toEqual(["Organization", "WebSite", "WebPage", "WebApplication", "FAQPage"]);
    expect(json).not.toMatch(/AggregateRating|Review/);
  });

  it("references existing logo and social assets", () => {
    expect(readFileSync(new URL("../public/logo.svg", import.meta.url)).length).toBeGreaterThan(100);
    expect(readFileSync(new URL("../public/mybreakeven-social-preview.png", import.meta.url)).length).toBeGreaterThan(20_000);
  });
});