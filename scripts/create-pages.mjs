import { cleaningClusters } from "../src/cleaningCluster.js";
import { freeTools } from "../src/freeTools.js";
import { articleFaq } from "../src/articleFaq.js";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import React from "react";
import { renderToString } from "react-dom/server";
import { createServer } from "vite";
import { blogPosts } from "../src/content/blogs/index.js";

const calculators = {
  ...Object.fromEntries(Object.entries(freeTools).map(([slug, tool]) => [slug, [tool.title, tool.description]])),
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

const homeFile = new URL("../dist/index.html", import.meta.url);
let base = await readFile(homeFile, "utf8");

const escapeHtml = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const allArticles = blogPosts;
const staticPages = {
  "guides/cleaning-business": ["Cleaning Business Planning Guides | MyBreakeven", "Explore cleaning business pricing, contract bids, operating costs, recurring clients and break-even. Find worked guides and free calculators.", "Cleaning business planning guides"],
  tools: ["Free Business Calculators: Profit, Pricing & Costs | MyBreakeven", "Explore free business calculators for profit, pricing, service costs, advertising and cash. Use clear formulas and worked guides without signing up.", "Free business calculators"],
  "pro-user-guide": ["MyBreakeven Pro Calculator User Guide", "Step-by-step guide to MyBreakeven Pro: enter costs, read break-even results, use advanced analysis, save scenarios and export reports.", "MyBreakeven Pro calculator user guide"],
  pricing: ["MyBreakeven Pricing: Free & Pro Business Planning", "Compare MyBreakeven Free and Pro plans for industry break-even calculators, saved scenarios, cost-drift analysis, comparisons and reports.", "MyBreakeven Free and Pro pricing"],
  blogs: ["Small Business Break-Even Guides | MyBreakeven", "Read practical break-even guides for cleaning, landscaping, photography, agencies, mobile detailing, e-commerce, restaurants and salons.", "Industry break-even calculator guides"],
  "about-us": ["About MyBreakeven | Formula-Backed Business Planning", "Learn how MyBreakeven turns contribution margin, sales demand and operating capacity into transparent business planning estimates.", "About MyBreakeven"],
  "contact-us": ["Contact MyBreakeven", "Contact MyBreakeven about calculator feedback, industry requests, partnerships or formula-backed business planning tools.", "Contact MyBreakeven"],
  "privacy-policy": ["Privacy Policy | MyBreakeven", "Read how MyBreakeven handles calculator data, website information and messages you send.", "Privacy Policy"],
  "terms-of-service": ["Terms of Service | MyBreakeven", "Read the terms for using MyBreakeven calculators, content and subscription features.", "Terms of Service"],
  "refund-policy": ["Refund Policy | MyBreakeven", "Review the cancellation and refund policy for MyBreakeven paid subscriptions.", "Refund Policy"],
  "cookie-policy": ["Cookie Policy | MyBreakeven", "Learn how MyBreakeven uses essential browser storage and cookies.", "Cookie Policy"],
  login: ["Log in to MyBreakeven", "Access your private MyBreakeven planning workspace.", "Log in to MyBreakeven", true],
  signup: ["Create a MyBreakeven account", "Create an optional account for saved business planning scenarios and reports.", "Create a MyBreakeven account", true],
  "forgot-password": ["Reset your MyBreakeven password", "Request a secure password-reset link for your MyBreakeven account.", "Reset your password", true],
  "reset-password": ["Choose a new MyBreakeven password", "Securely update your MyBreakeven account password.", "Choose a new password", true],
  dashboard: ["Your MyBreakeven dashboard", "Manage your private MyBreakeven account and planning workspace.", "Your private dashboard", true],
};
// Render public supporting pages from the same components used in the browser.
const renderer = await createServer({ server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom" });
let PublicPage, HomeContent;
try {
  PublicPage = (await renderer.ssrLoadModule("/src/Pages.jsx")).default;
  HomeContent = (await renderer.ssrLoadModule("/src/main.jsx")).default;
}
finally { await renderer.close(); }
const renderPublicPage = (path, initialArticle) => renderToString(React.createElement(PublicPage, { path, initialArticle }));
base = base.replace(/<div id="root"[^>]*>[\s\S]*?<\/div>\s*<\/body>/, `<div id="root" data-prerendered="true">${renderToString(React.createElement(HomeContent))}</div></body>`);
await writeFile(homeFile, base);
for (const [route, [title, description, heading, privatePage = false]] of Object.entries(staticPages)) {
  const canonical = `https://mybreakeven.com/${route}/`;
  const homeSchema = JSON.parse(base.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  const pageSchema = { "@context": "https://schema.org", "@graph": [
    ...homeSchema["@graph"].filter(entity => ["Organization", "WebSite"].includes(entity["@type"])),
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description, inLanguage: "en-US", isPartOf: { "@id": "https://mybreakeven.com/#website" } },
  ] };
  if (route === "guides/cleaning-business") {
    const page = pageSchema["@graph"].find(e => e["@type"] === "WebPage");
    page["@type"] = "CollectionPage";
    page.mainEntity = {"@type":"ItemList", itemListElement: cleaningClusters.flatMap(c => c.slugs).map((slug, i) => ({"@type":"ListItem", position:i+1, url:`https://mybreakeven.com/blogs/${slug}/`, name:allArticles.find(a=>a.slug===slug).title}))};
    pageSchema["@graph"].push({"@type":"BreadcrumbList", itemListElement:[{"@type":"ListItem",position:1,name:"Home",item:"https://mybreakeven.com/"},{"@type":"ListItem",position:2,name:"Guides",item:"https://mybreakeven.com/blogs/"},{"@type":"ListItem",position:3,name:"Cleaning business planning",item:canonical}]});
  }
  const links = route === "blogs" ? `<ul>${allArticles.map(article => `<li><a href="/blogs/${article.slug}/">${escapeHtml(article.title)}</a></li>`).join("")}</ul>` : `<p><a href="/#calculator">Use the free small business break-even calculator</a></p>`;
  const fallback = !privatePage
    ? `<div id="root" data-prerendered="true">${renderPublicPage(`/${route}`)}</div>`
    : `<div id="root" data-booting><main><h1>${escapeHtml(heading)}</h1><p>${escapeHtml(description)}</p>${links}</main></div>`;
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
    .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, `<script type="application/ld+json">${JSON.stringify(pageSchema)}</script>`)
    .replace(/<div id="root"[^>]*>[\s\S]*?<\/div>\s*<\/body>/, `${fallback}</body>`);
  await mkdir(new URL(`../dist/${route}/`, import.meta.url), { recursive: true });
  await writeFile(new URL(`../dist/${route}/index.html`, import.meta.url), html);
}
for (const article of allArticles) {
  const route = `blogs/${article.slug}`;
  const canonical = `https://mybreakeven.com/${route}/`;
  const title = `${article.seoTitle} | MyBreakeven`;
  const resolvedFaq = articleFaq(article);
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "BlogPosting", "@id": `${canonical}#article`, headline: article.title, description: article.metaDescription, image: { "@type": "ImageObject", url: `https://mybreakeven.com${article.image}`, width: 1200, height: 675 }, datePublished: article.published, dateModified: article.modified, keywords: article.tags.join(", "), mainEntityOfPage: { "@id": `${canonical}#webpage` }, author: { "@type": "Organization", name: "MyBreakeven", url: "https://mybreakeven.com/" }, publisher: { "@id": "https://mybreakeven.com/#organization" }, about: `${article.name} break-even calculation`, inLanguage: "en-US" },
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description: article.metaDescription, isPartOf: { "@id": "https://mybreakeven.com/#website" } },
    { "@type": "FAQPage", mainEntity: resolvedFaq.items.map(item => ({ "@type": "Question", name: item.q, acceptedAnswer: { "@type": "Answer", text: item.a } })) },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mybreakeven.com/" },
      { "@type": "ListItem", position: 2, name: "Guides", item: "https://mybreakeven.com/blogs/" },
      { "@type": "ListItem", position: 3, name: article.title, item: canonical }
    ] }
  ] };
  const fallback = `<div id="root" data-prerendered="true">${renderPublicPage(`/${route}`, article)}</div>`;
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
  const tool = freeTools[slug];
  const industryImageKeys = {"cleaning-business-break-even-calculator":"cleaning", "landscaping-break-even-calculator":"landscaping", "photography-business-break-even-calculator":"photography", "agency-break-even-calculator":"agency", "mobile-detailing-break-even-calculator":"detailing", "ecommerce-break-even-calculator":"ecommerce", "restaurant-break-even-calculator":"restaurant", "salon-break-even-calculator":"salon"};
  const pageImage = tool?.image || `/images/tools/${industryImageKeys[slug]}-break-even.webp`;
  const pageImageAlt = tool?.alt || `${title.replace(" | MyBreakeven", "")} planning model: direct costs, contribution, monthly target and capacity.`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${canonical}#webpage`, url: canonical, name: title, description, ...(tool ? {primaryImageOfPage: {"@type": "ImageObject", url: `https://mybreakeven.com${tool.image}`, width: 1200, height: 675}, dateModified: tool.reviewed || "2026-10-06", publisher: {"@id": "https://mybreakeven.com/#organization"}} : {}), inLanguage: "en-US", isPartOf: { "@id": "https://mybreakeven.com/#website" } },
    { "@type": "WebApplication", "@id": `${canonical}#calculator`, name: title.replace(" | MyBreakeven", ""), url: canonical, applicationCategory: "BusinessApplication", operatingSystem: "Any web browser", isAccessibleForFree: true, description, ...(tool ? {image: `https://mybreakeven.com${tool.image}`, featureList: tool.features, mainEntityOfPage: {"@id": `${canonical}#webpage`}} : {}), offers: { "@type": "Offer", price: "0", priceCurrency: "USD" } },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://mybreakeven.com/" },
      { "@type": "ListItem", position: 2, name: tool ? "Business calculators" : "Calculators", item: tool ? "https://mybreakeven.com/tools/" : "https://mybreakeven.com/#industries" },
      { "@type": "ListItem", position: 3, name: title.replace(" | MyBreakeven", ""), item: canonical }
    ] }
  ] };
  if (tool) schema["@graph"].push({"@type": "FAQPage", mainEntity: tool.faq.map(([q,a]) => ({"@type": "Question", name:q, acceptedAnswer:{"@type":"Answer", text:a}}))});
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
    .replace(/<div id="root"[^>]*>[\s\S]*?<\/div>\s*<\/body>/, `<div id="root" data-prerendered="true">${renderPublicPage(`/calculators/${slug}`)}</div></body>`);
  html = html
    .replaceAll("https://mybreakeven.com/mybreakeven-social-preview.png", `https://mybreakeven.com${pageImage}`)
    .replace(/<meta property="og:image:type" content="[^"]*"\s*\/?>/, `<meta property="og:image:type" content="image/webp" />`)
    .replace(/<meta property="og:image:height" content="[^"]*"\s*\/?>/, `<meta property="og:image:height" content="675" />`)
    .replace(/<meta property="og:image:alt" content="[^"]*"\s*\/?>/, `<meta property="og:image:alt" content="${escapeHtml(pageImageAlt)}" />`)
    .replace(/<meta name="twitter:image:alt" content="[^"]*"\s*\/?>/, `<meta name="twitter:image:alt" content="${escapeHtml(pageImageAlt)}" />`);
  await mkdir(new URL(`../dist/${route}/`, import.meta.url), { recursive: true });
  await writeFile(new URL(`../dist/${route}/index.html`, import.meta.url), html);
}

// Keep discovery in sync with the public route and article registry.
const publicUrls = ["https://mybreakeven.com/",
  ...Object.entries(staticPages).filter(([, meta]) => !meta[3]).map(([route]) => `https://mybreakeven.com/${route}/`),
  ...allArticles.map(article => `https://mybreakeven.com/blogs/${article.slug}/`),
  ...Object.keys(calculators).map(slug => `https://mybreakeven.com/calculators/${slug}/`),
];
const articleModified = new Map(allArticles.map(article => [`https://mybreakeven.com/blogs/${article.slug}/`, article.modified]));
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicUrls.map(url => `  <url><loc>${escapeHtml(url)}</loc>${articleModified.has(url) ? `<lastmod>${escapeHtml(articleModified.get(url))}</lastmod>` : ""}</url>`).join("\n")}\n</urlset>\n`;
await writeFile(new URL("../dist/sitemap.xml", import.meta.url), sitemap);

// Public, revision-aware source for website-to-social automation.
const { generateSocialFeed } = await import('./social-feed.mjs');
await generateSocialFeed({ articles: allArticles, calculators, pages: staticPages, directory: new URL('../dist/', import.meta.url) });

// Discover the actual hashed route chunks at build time, so the browser can
// fetch route code and styles in parallel with the small startup module.
const manifest = JSON.parse(await readFile(new URL('../dist/.vite/manifest.json', import.meta.url), 'utf8'));
const { readdir } = await import('node:fs/promises');
async function preloadRouteFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) { await preloadRouteFiles(file); continue; }
    if (entry.name !== 'index.html') continue;
    const home = file.href === homeFile.href;
    const routeKey = home ? 'src/main.jsx' : 'src/Pages.jsx';
    const assets = new Map(), visited = new Set();
    function collect(key) {
      if (visited.has(key) || !manifest[key]) return;
      visited.add(key);
      const item = manifest[key];
      assets.set(item.file, 'modulepreload');
      for (const css of item.css || []) assets.set(css, 'stylesheet');
      for (const dependency of item.imports || []) collect(dependency);
    }
    collect(routeKey);
    const html = await readFile(file, 'utf8');
    const links = [...assets].filter(([asset]) => !html.includes(`href="/${asset}"`))
      .map(([asset, rel]) => `<link rel="${rel}" href="/${asset}"${rel === 'modulepreload' ? ' crossorigin' : ''}>`).join('\n');
    await writeFile(file, html.replace('</head>', `${links}\n</head>`));
  }
}
await preloadRouteFiles(new URL('../dist/', import.meta.url));
