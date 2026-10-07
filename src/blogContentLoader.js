import { blogListingData } from "./blogListingData.js";

const metadata = Object.fromEntries(blogListingData.posts.map(post => [post.slug, post]));
const articleLoaders = import.meta.glob("./content/generated/*.json", { import: "default" });
const loadedPosts = new Map();
const pendingPosts = new Map();

export async function loadBlogPost(slug) {
  if (loadedPosts.has(slug)) return loadedPosts.get(slug);
  if (!metadata[slug]) return null;
  if (pendingPosts.has(slug)) return pendingPosts.get(slug);
  const loader = articleLoaders[`./content/generated/${slug}.json`];
  if (!loader) throw new Error(`Missing blog content for ${slug}`);
  const pending = loader().then(article => {
    if (article.slug !== slug) throw new Error(`Incorrect blog content for ${slug}`);
    loadedPosts.set(slug, article);
    return article;
  }).finally(() => pendingPosts.delete(slug));
  pendingPosts.set(slug, pending);
  return pending;
}

export function getLoadedBlogPost(slug) {
  return loadedPosts.get(slug);
}

export function relatedBlogPosts(slug, limit = 3) {
  const current = metadata[slug];
  if (!current) return [];
  return blogListingData.posts.filter(post => post.slug !== slug && post.tag === current.tag).slice(0, limit);
}
