import { blogListingData } from "./blogListingData.js";

const metadata = Object.fromEntries(blogListingData.posts.map(post => [post.slug, post]));
const groupLoaders = {
  core: () => import("./content/blogs/core.js").then(module => module.articleList),
  pricing: () => import("./content/blogs/pricing.js").then(module => module.pricingPosts),
  startup: () => import("./content/blogs/startup.js").then(module => module.startupPosts),
  cafe: () => import("./content/blogs/cafe.js").then(module => module.cafePosts),
  profitability: () => import("./content/blogs/profitability.js").then(module => module.profitabilityPosts),
  volume: () => import("./content/blogs/volume.js").then(module => module.volumePosts),
  concepts: () => import("./content/blogs/concepts.js").then(module => module.conceptPosts),
  financeExpansion: () => import("./content/blogs/financeExpansion.js").then(module => module.financeExpansionPosts),
};

export async function loadBlogPost(slug) {
  const preview = metadata[slug];
  if (!preview) return null;
  const group = await groupLoaders[preview.group]();
  const post = group.find(candidate => candidate.slug === slug);
  if (!post) throw new Error(`Missing blog content for ${slug}`);
  return { ...post, ...preview };
}

export function relatedBlogPosts(slug, limit = 3) {
  const current = metadata[slug];
  if (!current) return [];
  return blogListingData.posts.filter(post => post.slug !== slug && post.tag === current.tag).slice(0, limit);
}
