import { blogListingData } from "./blogListingData.js";
import { september29UpdateMap } from "./content/blogs/september29Updates.js";

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
};

export async function loadBlogPost(slug) {
  if (loadedPosts.has(slug)) return loadedPosts.get(slug);
  const preview = metadata[slug];
  if (!preview) return null;
  const group = await groupLoaders[preview.group]();
  const post = group.find(candidate => candidate.slug === slug);
  if (!post) throw new Error(`Missing blog content for ${slug}`);
  const article = { ...post, ...preview, ...september29UpdateMap[slug] };
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
