import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { primaryNavigation } from "./SiteChrome.jsx";

const chrome = readFileSync(new URL("./SiteChrome.jsx", import.meta.url), "utf8");
const pages = readFileSync(new URL("./Pages.jsx", import.meta.url), "utf8");
const main = readFileSync(new URL("./main.jsx", import.meta.url), "utf8");
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

  it("keeps account access separate from the locked primary menu", () => {
    expect(primaryNavigation).toHaveLength(5);
    expect(chrome).toContain('className="account-link"');
    expect(chrome).toContain('signedIn ? "/dashboard/" : "/login/"');
    expect(chrome).toContain('signedIn ? "Dashboard" : "Sign In"');
    expect(chrome).toContain('import("./authClient")');
    expect(chrome).not.toContain('import { supabase } from "./authClient"');
  });

  it("locks the page and closes navigation after a mobile link is selected", () => {
    expect(chrome).toContain('document.body.classList.toggle("mobile-menu-open", mobileOpen)');
    expect(chrome).toContain('onClick={() => setMobileOpen(false)}');
  });

  it("uses the shared header and footer on secondary pages", () => {
    expect(pages).toContain("<SiteHeader />");
    expect(pages).toContain("<SiteFooter />");
  });

  it("keeps homepage result icons imported", () => {
    expect(main).toMatch(/import\s*\{[\s\S]*?BarChart3,[\s\S]*?\}\s*from \"lucide-react\"/);
    expect(main).toContain("<BarChart3 />");
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
