import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { articleList } from "../src/blogData.js";
for (const route of ["pricing", "blogs", "about-us", "contact-us"]) {
  await mkdir(new URL(`../dist/${route}/`, import.meta.url), {
    recursive: true,
  });
  await copyFile(
    new URL("../dist/index.html", import.meta.url),
    new URL(`../dist/${route}/index.html`, import.meta.url),
  );
}

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

const base = await readFile(new URL("../dist/index.html", import.meta.url), "utf8");

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
for (const article of articleList) {
  const route = `blogs/${article.slug}`;
  const canonical = `https://mybreakeven.com/${route}/`;
  const title = `${article.title} | MyBreakeven`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", "@id": `${canonical}#article`, headline: article.title, description: article.description, datePublished: "2026-09-10", dateModified: "2026-09-10", mainEntityOfPage: { "@id": `${canonical}#webpage` }, author: { "@type": "Organization", name: "MyBreakeven", url: "https://mybreakeven.com/" }, publisher: { "@id": "https://mybreakeven.com/#organization" }, about: `${article.name} break-even calculation`, inLanguage: "en-US" },
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description: article.description, isPartOf: { "@id": "https://mybreakeven.com/#website" } },
    { "@type": "FAQPage", mainEntity: article.faq.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mybreakeven.com/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://mybreakeven.com/blogs/" },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical }
    ] }
  ] };
  const sections = article.sections.map(section => `<section><h2>${escapeHtml(section.heading)}</h2>${(section.paragraphs || []).map(p => `<p>${escapeHtml(p)}</p>`).join("")}${section.bullets ? `<ul>${section.bullets.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""}</section>`).join("");
  const faq = article.faq.map(item => `<h3>${escapeHtml(item.q)}</h3><p>${escapeHtml(item.a)}</p>`).join("");
  const fallback = `<div id="root"><main><article><nav><a href="/">Home</a> / <a href="/blogs/">Guides</a> / ${escapeHtml(article.tag)}</nav><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.description)}</p><section><h2>Calculator features</h2><ul>${article.features.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section>${sections}<section><h2>Frequently asked questions</h2>${faq}</section><p><a href="/calculators/${article.calculatorSlug}/">Use the free ${escapeHtml(article.tag)} calculator</a></p></article></main></div>`;
  const html = base
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${escapeHtml(article.description)}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${escapeHtml(article.description)}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/?>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/?>/, `<meta name="twitter:description" content="${escapeHtml(article.description)}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="en-US" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="en-US" href="${canonical}" />`)
    .replace(/<link rel="alternate" hreflang="x-default" href="[^"]*"\s*\/?>/, `<link rel="alternate" hreflang="x-default" href="${canonical}" />`)
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/, `${fallback}</body>`);
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
    .replace(/<div id="root">[\s\S]*?<\/div>\s*<\/body>/, `<div id="root"><main><h1>${title.replace(" | MyBreakeven", "")}</h1><p>${description}</p><p>Use the free MyBreakeven calculator to test exact break-even revenue, required sales volume, customer demand and operating capacity.</p><a href="/#calculator">Use the calculator</a></main></div></body>`);
  await mkdir(new URL(`../dist/${route}/`, import.meta.url), { recursive: true });
  await writeFile(new URL(`../dist/${route}/index.html`, import.meta.url), html);
}
