const searchableText = post => [post.title, post.description, post.opening, post.tag, ...(post.tags || [])]
  .filter(Boolean).join(" ").toLocaleLowerCase();

export function filterBlogPosts(posts, query = "", tag = "All") {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return posts.filter(post => {
    const matchesTag = tag === "All" || post.tag === tag;
    const haystack = searchableText(post);
    return matchesTag && terms.every(term => haystack.includes(term));
  });
}
