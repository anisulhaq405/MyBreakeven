import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { primaryNavigation } from "./SiteChrome.jsx";

const chrome = readFileSync(new URL("./SiteChrome.jsx", import.meta.url), "utf8");
const pages = readFileSync(new URL("./Pages.jsx", import.meta.url), "utf8");
const main = readFileSync(new URL("./main.jsx", import.meta.url), "utf8");
const generator = readFileSync(new URL("../scripts/create-pages.mjs", import.meta.url), "utf8");
const sitemap = readFileSync(new URL("../public/sitemap.xml", import.meta.url), "utf8");

describe("shared site chrome", () => {
  it("keeps the six-item menu with free tools next to the calculator", () => {
    expect(primaryNavigation).toEqual([
      ["Calculator", "/#calculator"],
      ["Free Tools", "/tools/"],
      ["Pricing", "/pricing/"],
      ["Blogs", "/blogs/"],
      ["About Us", "/about-us/"],
      ["Contact Us", "/contact-us/"],
    ]);
  });

  it("keeps account access separate from the primary menu", () => {
    expect(primaryNavigation).toHaveLength(6);
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

  it("serves supporting pages visibly before React starts", () => {
    expect(generator).toContain('data-prerendered="true"');
    expect(generator).toContain('renderToString(React.createElement(PublicPage');
    expect(chrome).not.toContain('free-tools-nav-link');
  });
});
