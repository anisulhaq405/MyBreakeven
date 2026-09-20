import { articleList as foundationPosts, articles as foundationPostMap } from "./core.js";
import { pricingPosts } from "./pricing.js";
import { startupPosts } from "./startup.js";
import { profitabilityPosts } from "./profitability.js";

const seoTitleOverrides = {
  "how-much-does-it-cost-to-start-a-cleaning-business": "Cleaning Business Startup Cost Guide",
  "how-much-does-it-cost-to-start-a-photography-business": "Photography Business Startup Cost Guide",
  "mobile-detailing-business-startup-cost": "Mobile Detailing Startup Cost Guide",
  "how-much-does-it-cost-to-start-an-ecommerce-store": "Ecommerce Store Startup Cost Guide",
  "how-much-does-it-cost-to-start-a-marketing-agency": "Marketing Agency Startup Cost Guide",
  "car-detailing-prices-list": "Car Detailing Prices by Service",
  "salon-service-pricing": "Salon Service Pricing Guide",
  "agency-retainer-pricing": "Agency Retainer Pricing Guide",
  "how-to-price-products-for-ecommerce": "How to Price Ecommerce Products",
  "cleaning-business-break-even": "Cleaning Business Break-Even Guide",
  "landscaping-break-even": "Landscaping Break-Even Guide",
  "photography-business-break-even": "Photography Break-Even Guide",
  "agency-break-even": "Agency Break-Even and Capacity Guide",
  "mobile-detailing-break-even": "Mobile Detailing Break-Even Guide",
  "ecommerce-break-even": "Ecommerce Break-Even Guide",
  "restaurant-break-even": "Restaurant Break-Even Guide",
  "salon-break-even": "Salon Break-Even and Pricing Guide",
};

const cleanText = value => typeof value === "string" ? value.replace(/^\*\*\s*/, "") : value;
const normalizePost = post => ({
  ...post,
  seoTitle: seoTitleOverrides[post.slug] || cleanText(post.seoTitle),
  description: cleanText(post.description),
  metaDescription: cleanText(post.metaDescription),
  opening: cleanText(post.opening),
});

export const blogCollections = Object.freeze({
  foundation: foundationPosts.map(normalizePost),
  pricing: pricingPosts.map(normalizePost),
  startup: startupPosts.map(normalizePost),
  profitability: profitabilityPosts.map(normalizePost),
});

export const blogPosts = Object.values(blogCollections)
  .flat()
  .sort((a, b) => String(b.published).localeCompare(String(a.published)));

const duplicateSlugs = blogPosts
  .map(post => post.slug)
  .filter((slug, index, slugs) => slugs.indexOf(slug) !== index);

if (duplicateSlugs.length) {
  throw new Error(`Duplicate blog slugs: ${[...new Set(duplicateSlugs)].join(", ")}`);
}

export const blogPostMap = Object.freeze(
  Object.fromEntries(blogPosts.map(post => [post.slug, post])),
);

export const isLongformPost = post => Boolean(post?.html);

export function relatedArticlesFor(slug, limit = 3) {
  const current = blogPostMap[slug];
  if (!current) return [];

  const foundationRelated = foundationPostMap[slug]
    ? foundationPosts.filter(post => post.slug !== slug && post.tag === current.tag)
    : [];

  const candidates = foundationRelated.length
    ? foundationRelated
    : blogPosts.filter(post => post.slug !== slug && post.tag === current.tag);

  return candidates.slice(0, limit);
}
