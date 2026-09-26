import { articleList as foundationPosts, articles as foundationPostMap } from "./core.js";
import { pricingPosts } from "./pricing.js";
import { startupPosts } from "./startup.js";
import { cafePosts } from "./cafe.js";
import { profitabilityPosts } from "./profitability.js";
import { volumePosts } from "./volume.js";
import { conceptPosts } from "./concepts.js";

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
  "how-many-lawns-100k": "How Many Lawns to Make $100k?",
  "how-many-detailing-jobs-week": "Detailing Jobs Per Week to Go Full Time",
  "restaurant-covers-per-night-break-even": "Restaurant Covers Needed Per Night",
  "how-many-agency-retainer-clients": "How Many Retainer Clients Does an Agency Need?",
};

const cleanText = value => typeof value === "string" ? value.replace(/^\*\*\s*/, "") : value;
const canonicalTags = Object.freeze({
  "agency & freelancer": "Agency",
  "mobile detailing": "Mobile Detailing",
});

const canonicalTag = value => {
  const tag = cleanText(value)?.trim();
  return canonicalTags[tag?.toLowerCase()] || tag;
};

const normalizePost = post => ({
  ...post,
  tag: canonicalTag(post.tag),
  seoTitle: seoTitleOverrides[post.slug] || cleanText(post.seoTitle),
  description: cleanText(post.description),
  metaDescription: cleanText(post.metaDescription),
  opening: cleanText(post.opening),
});

export const blogCollections = Object.freeze({
  foundation: foundationPosts.map(normalizePost),
  pricing: pricingPosts.map(normalizePost),
  startup: [...startupPosts, ...cafePosts].map(normalizePost),
  profitability: profitabilityPosts.map(normalizePost),
  volume: volumePosts.map(normalizePost),
  concepts: conceptPosts.map(normalizePost),
});

export const blogPosts = Object.values(blogCollections)
  .flat()
  .sort((a, b) => String(b.published).localeCompare(String(a.published)));

export const blogModels = Object.freeze(
  [...new Set(blogPosts.map(post => post.tag).filter(tag => tag && tag !== "Break-Even Concepts"))],
);

export const blogLibrarySummary = Object.freeze({
  guideCount: blogPosts.length,
  modelCount: blogModels.length,
});

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
