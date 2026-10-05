import { october05UpdateMap } from "./content/blogs/october05Updates.js";
import { october04UpdateMap } from "./content/blogs/october04Updates.js";
import { october03UpdateMap } from "./content/blogs/october03Updates.js";
import { october01AuditUpdateMap } from "./content/blogs/october01AuditUpdates.js";
import { blogListingData } from "./blogListingData.js";
import { september29UpdateMap } from "./content/blogs/september29Updates.js";
import { september30UpdateMap } from "./content/blogs/september30Updates.js";
import { october01UpdateMap } from "./content/blogs/october01Updates.js";
import { october02UpdateMap } from "./content/blogs/october02Updates.js";

const metadata = Object.fromEntries(blogListingData.posts.map(post => [post.slug, post]));
const loadedPosts = new Map();
const groupLoaders = {
  core: () => import("./content/blogs/core.js").then(module => module.articleList),
  pricing: () => import("./content/blogs/pricing.js").then(module => module.pricingPosts),
  startup: () => import("./content/blogs/startup.js").then(module => module.startupPosts),
  cafe: () => import("./content/blogs/cafe.js").then(module => module.cafePosts),
  profitability: () => import("./content/blogs/profitability.js").then(module => module.profitabilityPosts),
  volume: () => import("./content/blogs/volume.js").then(module => module.volumePosts),
  concepts: () => import("./content/blogs/concepts.js").then(module => module.conceptPosts),
  financeExpansion: () => import("./content/blogs/financeExpansion.js").then(module => module.financeExpansionPosts),
  unitEconomics: () => import("./content/blogs/unitEconomics.js").then(module => module.unitEconomicsPosts),
  september28: () => import("./content/blogs/september28.js").then(module => module.september28Drafts),
  september29: () => import("./content/blogs/september29.js").then(module => module.september29Posts),
  september30: () => import("./content/blogs/september30.js").then(module => module.september30Posts),
  october01: () => import("./content/blogs/october01.js").then(module => module.october01Posts),
  october02: () => import("./content/blogs/october02.js").then(module => module.october02Posts),
  october05: () => import("./content/blogs/october05.js").then(module => module.october05Posts),
  october04: () => import("./content/blogs/october04.js").then(module => module.october04Posts),
  october03: () => import("./content/blogs/october03.js").then(module => module.october03Posts),
};

export async function loadBlogPost(slug) {
  if (loadedPosts.has(slug)) return loadedPosts.get(slug);
  const preview = metadata[slug];
  if (!preview) return null;
  const group = await groupLoaders[preview.group]();
  const post = group.find(candidate => candidate.slug === slug);
  if (!post) throw new Error(`Missing blog content for ${slug}`);
  const article = { ...post, ...preview, ...september29UpdateMap[slug], ...september30UpdateMap[slug], ...october01UpdateMap[slug], ...october01AuditUpdateMap[slug], ...october02UpdateMap[slug], ...october03UpdateMap[slug], ...october04UpdateMap[slug], ...october05UpdateMap[slug] };
  loadedPosts.set(slug, article);
  return article;
}

export function getLoadedBlogPost(slug) {
  return loadedPosts.get(slug);
}

export function relatedBlogPosts(slug, limit = 3) {
  const current = metadata[slug];
  if (!current) return [];
  return blogListingData.posts.filter(post => post.slug !== slug && post.tag === current.tag).slice(0, limit);
}
