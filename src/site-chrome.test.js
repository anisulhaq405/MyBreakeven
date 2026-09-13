import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { primaryNavigation } from "./SiteChrome.jsx";

const chrome = readFileSync(new URL("./SiteChrome.jsx", import.meta.url), "utf8");
const pages = readFileSync(new URL("./Pages.jsx", import.meta.url), "utf8");
const generator = readFileSync(new URL("../scripts/create-pages.mjs", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");

describe("locked site chrome", () => {
  it("keeps the approved five-item primary menu", () => {
    expect(primaryNavigation).toEqual([
      ["Calculator", "/#calculator"],
      ["Pricing", "/pricing/"],
      ["Blogs", "/blogs/"],
      ["About Us", "/about-us/"],
      ["Contact Us", "/contact-us/"],
    ]);
  });

  it("uses the shared header and footer on secondary pages", () => {
    expect(pages).toContain("<SiteHeader />");
    expect(pages).toContain("<SiteFooter />");
  });

  it("publishes all legal routes in the footer and sitemap", () => {
    for (const route of ["privacy-policy", "terms-of-service", "refund-policy", "cookie-policy"]) {
      expect(chrome).toContain(`/${route}/`);
      expect(pages).toContain(`\"/${route}\"`);
      expect(sitemap).toContain(`https://mybreakeven.com/${route}/`);
    }
  });

  it("keeps crawler fallback content hidden during JavaScript boot", () => {
    expect(generator.match(/id=\"root\" data-booting/g)?.length).toBeGreaterThanOrEqual(3);
    expect(generator).not.toMatch(/const fallback = `<div id="root">/);
  });
});
