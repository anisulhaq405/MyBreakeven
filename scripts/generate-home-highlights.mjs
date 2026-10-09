import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import { blogCollections, blogLibrarySummary, blogPosts } from "../src/content/blogs/index.js";
import { cafePosts } from "../src/content/blogs/cafe.js";

const latest = collection => [...collection].sort((a, b) => b.published.localeCompare(a.published))[0];
const pick = post => post && Object.fromEntries(
  ["slug", "image", "title", "description", "tag"].map(key => [key, post[key]]),
);
const highlights = {
  guideCount: blogLibrarySummary.guideCount,
  featured: pick(latest(blogCollections.concepts)),
  supporting: [
    latest(blogCollections.pricing),
    latest(blogCollections.startup),
    latest(blogCollections.profitability),
  ].filter(Boolean).map(pick),
};

await writeFile(new URL("../src/homeBlogData.js", import.meta.url),
  `// Generated from the blog registry before dev and build.\nexport const homeBlogData = ${JSON.stringify(highlights)};\n`);

const groupFor = slug => {
  if (blogCollections.foundation.some(post => post.slug === slug)) return "core";
  if (blogCollections.pricing.some(post => post.slug === slug)) return "pricing";
  if (blogCollections.startup.some(post => post.slug === slug)) {
    return cafePosts.some(post => post.slug === slug) ? "cafe" : "startup";
  }
  for (const [key, name] of [["october09Cleaning", "october09Cleaning"], ["october07", "october07"], ["profitability", "profitability"], ["volume", "volume"], ["concepts", "concepts"], ["financialPlanning", "financeExpansion"], ["unitEconomics", "unitEconomics"], ["september28", "september28"], ["september29", "september29"], ["september30", "september30"], ["october01", "october01"], ["october02", "october02"], ["october03", "october03"], ["october04", "october04"], ["october05", "october05"], ["october06", "october06"], ["october06Supplement", "october06Supplement"]]) {
    if (blogCollections[key].some(post => post.slug === slug)) return name;
  }
  throw new Error(`No content module for ${slug}`);
};

const listing = blogPosts.map(post => ({
  ...Object.fromEntries(["slug", "title", "description", "opening", "tag", "tags", "image", "published", "modified", "seoTitle", "metaDescription"].map(key => [key, post[key]])),
  group: groupFor(post.slug),
}));
await writeFile(new URL("../src/blogListingData.js", import.meta.url),
  `// Generated from the blog registry before dev and build.\nexport const blogListingData = ${JSON.stringify({posts:listing,modelCount:blogLibrarySummary.modelCount})};\n`);

// Resolve historical updates at build time and load only the requested guide.
const articleDirectory = new URL("../src/content/generated/", import.meta.url);
await mkdir(articleDirectory, { recursive: true });
const articleFiles = new Set(blogPosts.map(post => `${post.slug}.json`));
for (const name of await readdir(articleDirectory)) {
  if (name.endsWith(".json") && !articleFiles.has(name)) await unlink(new URL(name, articleDirectory));
}
await Promise.all(blogPosts.map(post => writeFile(
  new URL(`${post.slug}.json`, articleDirectory), JSON.stringify(post),
)));
