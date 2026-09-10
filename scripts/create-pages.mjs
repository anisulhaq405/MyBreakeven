import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
for (const route of ["pricing", "blogs", "about-us", "contact-us", "blogs/ecommerce-break-even", "blogs/restaurant-break-even", "blogs/salon-break-even"]) {
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
