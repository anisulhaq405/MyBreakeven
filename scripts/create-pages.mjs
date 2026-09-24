import { mkdir, readFile, writeFile } from "node:fs/promises";
import { blogPosts, relatedArticlesFor } from "../src/content/blogs/index.js";

const calculators = {
  "cleaning-business-break-even-calculator": ["Cleaning Business Break-Even Calculator | MyBreakeven", "Calculate cleaning jobs, monthly revenue, leads and team capacity needed to break even after labor, supplies, travel, equipment and marketing costs."],
  "landscaping-break-even-calculator": ["Landscaping Break-Even Calculator | MyBreakeven", "Calculate landscaping and lawn-care jobs, revenue, leads and crew capacity needed after labor, materials, fuel, equipment and marketing costs."],
  "photography-business-break-even-calculator": ["Photography Business Break-Even Calculator | MyBreakeven", "Calculate photography sessions, revenue, bookings and delivery capacity needed after editing, travel, labor, studio and marketing costs."],
  "agency-break-even-calculator": ["Agency & Freelancer Break-Even Calculator | MyBreakeven", "Calculate retainer clients, monthly revenue, qualified leads and delivery capacity needed after labor, contractor, software and acquisition costs."],
  "mobile-detailing-break-even-calculator": ["Mobile Detailing Break-Even Calculator | MyBreakeven", "Calculate mobile detailing jobs, revenue, bookings and technician capacity after supplies, labor, travel, equipment and marketing costs."],
  "ecommerce-break-even-calculator": ["E-commerce Break-Even Calculator | MyBreakeven", "Calculate exact break-even orders and revenue after COGS, fulfillment, shipping subsidy, returns, platform fees and customer acquisition costs."],
  "restaurant-break-even-calculator": ["Restaurant Break-Even Calculator | MyBreakeven", "Calculate restaurant break-even revenue and orders after food, direct labor, packaging, delivery commissions, promotion and monthly overhead."],
  "salon-break-even-calculator": ["Salon Break-Even Calculator | MyBreakeven", "Calculate salon appointments, revenue, customer inquiries and stylist capacity after products, labor, disposables, laundry and marketing costs."],
};

const calculatorIndustries = {
  "cleaning-business-break-even-calculator": "cleaning",
  "landscaping-break-even-calculator": "landscaping",
  "photography-business-break-even-calculator": "photography",
  "agency-break-even-calculator": "agency",
  "mobile-detailing-break-even-calculator": "detailing",
  "ecommerce-break-even-calculator": "ecommerce",
  "restaurant-break-even-calculator": "restaurant",
  "salon-break-even-calculator": "salon",
};

const base = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const allArticles = blogPosts;
const formatArticleDate = (value) => new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
const staticPages = {
  "pro-user-guide": ["MyBreakeven Pro Calculator User Guide", "Step-by-step guide to MyBreakeven Pro: enter costs, read break-even results, use advanced analysis, save scenarios and export reports.", "MyBreakeven Pro calculator user guide"],
  pricing: ["MyBreakeven Pricing: Free & Pro Business Planning", "Compare MyBreakeven Free and Pro plans for industry break-even calculators, saved scenarios, cost-drift analysis, comparisons and reports.", "MyBreakeven Free and Pro pricing"],
  blogs: ["Small Business Break-Even Guides | MyBreakeven", "Read practical break-even guides for cleaning, landscaping, photography, agencies, mobile detailing, e-commerce, restaurants and salons.", "Industry break-even calculator guides"],
  "about-us": ["About MyBreakeven | Formula-Backed Business Planning", "Learn how MyBreakeven turns contribution margin, sales demand and operating capacity into transparent business planning estimates.", "About MyBreakeven"],
  "contact-us": ["Contact MyBreakeven", "Contact MyBreakeven about calculator feedback, industry requests, partnerships or formula-backed business planning tools.", "Contact MyBreakeven"],
  "privacy-policy": ["Privacy Policy | MyBreakeven", "Read how MyBreakeven handles calculator data, website information and messages you send.", "Privacy Policy"],
  "terms-of-service": ["Terms of Service | MyBreakeven", "Read the terms for using MyBreakeven calculators, content and subscription features.", "Terms of Service"],
  "refund-policy": ["Refund Policy | MyBreakeven", "Review the cancellation and refund policy for future MyBreakeven paid subscriptions.", "Refund Policy"],
  "cookie-policy": ["Cookie Policy | MyBreakeven", "Learn how MyBreakeven uses essential browser storage and cookies.", "Cookie Policy"],
  login: ["Log in to MyBreakeven", "Access your private MyBreakeven planning workspace.", "Log in to MyBreakeven", true],
  signup: ["Create a MyBreakeven account", "Create an optional account for saved business planning scenarios and reports.", "Create a MyBreakeven account", true],
  "forgot-password": ["Reset your MyBreakeven password", "Request a secure password-reset link for your MyBreakeven account.", "Reset your password", true],
  "reset-password": ["Choose a new MyBreakeven password", "Securely update your MyBreakeven account password.", "Choose a new password", true],
  dashboard: ["Your MyBreakeven dashboard", "Manage your private MyBreakeven account and planning workspace.", "Your private dashboard", true],
};
for (const [route, [title, description, heading, privatePage = false]] of Object.entries(staticPages)) {
  const canonical = `https://mybreakeven.com/${route}/`;
  const links = route === "blogs" ? `<ul>${allArticles.map(article => `<li><a href="/blogs/${article.slug}/">${escapeHtml(article.title)}</a></li>`).join("")}</ul>` : `<p><a href="/#calculator">Use the free small business break-even calculator</a></p>`;
  const fallback = `<div id="root" data-booting><main><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p>${links}</main></div>`;
  const html = base
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta name="robots" content="[^"]*"\s*\/?>/, `<meta name="robots" content="${privatePage ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"}" />`)
    .replace(/<meta name="googlebot" content="[^"]*"\s*\/?>/, `<meta name="googlebot" content="${privatePage ? "noindex,nofollow" : "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="en-US" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en-US" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="x-default" href="${canonical}" />`)
    .replace(/<div id="root"[^>]*>[\s\S]*?<\/div>\s*<\/body>/, `${fallback}</body>`);
  await mkdir(new URL(`../dist/${route}/`, import.meta.url), { recursive: true });
  await writeFile(new URL(`../dist/${route}/index.html`, import.meta.url), html);
}
for (const article of allArticles) {
  const route = `blogs/${article.slug}`;
  const canonical = `https://mybreakeven.com/${route}/`;
  const title = `${article.seoTitle} | MyBreakeven`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", "@id": `${canonical}#article`, headline: article.title, description: article.metaDescription, image: { "@type": "ImageObject", url: `https://mybreakeven.com${article.image}`, width: 1200, height: 675 }, datePublished: article.published, dateModified: article.modified, keywords: article.tags.join(", "), mainEntityOfPage: { "@id": `${canonical}#webpage` }, author: { "@type": "Organization", name: "MyBreakeven", url: "https://mybreakeven.com/" }, publisher: { "@id": "https://mybreakeven.com/#organization" }, about: `${article.name} break-even calculation`, inLanguage: "en-US" },
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description: article.metaDescription, isPartOf: { "@id": "https://mybreakeven.com/#website" } },
    { "@type": "FAQPage", mainEntity: article.faq.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mybreakeven.com/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://mybreakeven.com/blogs/" },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical }
    ] }
  ] };
  const sections = article.html ? article.html : article.sections.map(section => `<section><h2>${escapeHtml(section.heading)}</h2>${(section.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}</section>`).join("");
  const faq = article.faq.map(item => `<h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p>`).join("");
  const related = article.html ? "" : relatedArticlesFor(article.slug).map(item => `<li><a href="/blogs/${item.slug}/">${escapeHtml(item.title)}</a></li>`).join("");
  const hubLink = article.html && !article.html.includes('href="/blogs/"') && !article.html.includes('href="https://mybreakeven.com/blogs/"') ? `<p><a href="/blogs/">Browse the MyBreakeven blog hub</a> for related planning guides.</p>` : "";
  const fallback = `<div id="root" data-booting><main><article><nav><a href="/">Home</a> / <a href="/blogs/">Guides</a> / ${escapeHtml(article.tag)}</nav><h1>${escapeHtml(article.title)}</h1><p><time datetime="${article.published}">Published ${formatArticleDate(article.published)}</time> · Updated ${formatArticleDate(article.modified)}</p><p>${escapeHtml(article.description)}</p><p>${article.tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join(" · ")}</p>${article.html ? "" : `<p>${escapeHtml(article.opening)}</p>`}<img src="${article.image}" alt="${escapeHtml(article.alt)}" width="1200" height="675"><section><h2>Calculator features</h2><ul>${article.features.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>${sections}${hubLink}${article.html ? "" : `<figure><img src="${article.insideImage}" alt="${escapeHtml(article.insideAlt)}" width="1200" height="630"></figure><section><h2>Frequently asked questions</h2>${faq}</section><p><a href="/calculators/${article.calculatorSlug}/">Use the free ${escapeHtml(article.tag)} break-even calculator</a></p>`}<section><h2>Related break-even resources</h2><ul>${related}<li><a href="/#calculator">Free small business break-even calculator</a></li><li><a href="/#methodology">Transparent break-even calculation methodology</a></li></ul></section></article></main></div>`;
  const html = base
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(article.metaDescription)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(article.metaDescription)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`)
    .replaceAll("https://mybreakeven.com/mybreakeven-social-preview.png", `https://mybreakeven.com${article.image}`)
    .replace(/<meta property="og:image:type" content="[^"]*"\s*\/?>/, `<meta property="og:image:type" content="${article.image.endsWith(".png") ? "image/png" : "image/webp"}" />`)
    .replace(/<meta property="og:image:height" content="[^"]*"\s*\/?>/, `<meta property="og:image:height" content="675" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${escapeHtml(article.alt)}" />`)
    .replace(/<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/, `<meta name="twitter:image:alt" content="${escapeHtml(article.alt)}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(article.metaDescription)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="en-US" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en-US" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="x-default" href="${canonical}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .replace(/<div id="root"[^>]*>[\s\S]*?<\/div>\s*<\/body>/, `${fallback}</body>`);
  await mkdir(new URL(`../dist/${route}/`, import.meta.url), { recursive: true });
  await writeFile(new URL(`../dist/${route}/index.html`, import.meta.url), html);
}

for (const [slug, [title, description]] of Object.entries(calculators)) {
  const route = `calculators/${slug}`;
  const canonical = `https://mybreakeven.com/${route}/`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description, inLanguage: "en-US", isPartOf: { "@id": "https://mybreakeven.com/#website" } },
    { "@type": "WebApplication", "@id": `${canonical}#calculator`, name: title.replace(" | MyBreakeven", ""), url: canonical, applicationCategory: "BusinessApplication", operatingSystem: "Any web browser", isAccessibleForFree: true, description, offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mybreakeven.com/" },
      { "@type": "ListItem", position: 2, name: "Calculators", item: "https://mybreakeven.com/#industries" },
      { "@type": "ListItem", position: 3, name: title.replace(" | MyBreakeven", ""), item: canonical }
    ] }
  ] };
  let html = base
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${description}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${description}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="en-US" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en-US" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="x-default" href="${canonical}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .replace(/<div id="root"[^>]*>[\s\S]*?<\/div>\s*<\/body>/, `<div id="root" data-booting><main><h1>${title.replace(" | MyBreakeven", "")}</h1><p>${description}</p><p>Use the free MyBreakeven calculator to test exact break-even revenue, required sales volume, customer demand and operating capacity.</p><a href="/?industry=${calculatorIndustries[slug]}#calculator">Use the ${escapeHtml(title.replace(" | MyBreakeven", ""))}</a></main></div></body>`);
  await mkdir(new URL(`../dist/${route}/`, import.meta.url), { recursive: true });
  await writeFile(new URL(`../dist/${route}/index.html`, import.meta.url), html);
}
