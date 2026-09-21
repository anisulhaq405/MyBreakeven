import React, { useMemo, useState } from "react";
import { ArrowUpRight, BookOpen, Search, X } from "lucide-react";
import { blogPosts } from "./content/blogs/index.js";
import { filterBlogPosts } from "./blogSearch.js";
const dateLabel = value => new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

const initialQuery = () => typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("q") || "";

export default function BlogSection() {
  const isHub = typeof window !== "undefined" && window.location.pathname.startsWith("/blogs");
  const [query, setQuery] = useState(initialQuery);
  const [tag, setTag] = useState("All");
  const tags = useMemo(() => ["All", ...new Set(blogPosts.map(post => post.tag))], []);
  const filtered = useMemo(() => filterBlogPosts(blogPosts, query, tag), [query, tag]);
  const featured = filtered[0];
  const updateQuery = value => {
    setQuery(value);
    if (!isHub) return;
    const url = new URL(window.location.href);
    value.trim() ? url.searchParams.set("q", value) : url.searchParams.delete("q");
    window.history.replaceState({}, "", `${url.pathname}${url.search}`);
  };

  return <section className={`blog-preview${isHub ? " blog-hub" : ""}`} id="blog">
    <div className="blog-heading"><div><span>MYBREAKEVEN FIELD NOTES</span><h2>Practical guides for healthier business margins.</h2><p>Search pricing, startup costs, profitability, and break-even strategy across every guide.</p></div>{!isHub && <a href="/blogs/">Explore all guides <ArrowUpRight /></a>}</div>
    <div className="blog-discovery">
      <label className="blog-search"><Search aria-hidden="true" /><span className="sr-only">Search all business guides</span><input type="search" value={query} onChange={event => updateQuery(event.target.value)} placeholder="Search any topic, e.g. cleaning prices" autoComplete="off" />{query && <button type="button" onClick={() => updateQuery("")} aria-label="Clear blog search"><X /></button>}</label>
      <div className="blog-filters" aria-label="Filter guides by category">{tags.map(item => <button type="button" key={item} className={tag === item ? "active" : ""} onClick={() => setTag(item)}>{item}</button>)}</div>
      <p className="blog-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "guide" : "guides"}</p>
    </div>
    {featured ? <><article className="blog-featured-card">
      {featured.image && <a href={`/blogs/${featured.slug}/`} tabIndex="-1" aria-hidden="true"><img src={featured.image} alt="" width="1200" height="675" loading="eager" decoding="async" /></a>}
      <div><span>{featured.tag}</span><time dateTime={featured.published}>Published {dateLabel(featured.published)}</time><h3><a href={`/blogs/${featured.slug}/`}>{featured.title}</a></h3><p>{featured.description}</p><a className="blog-read" href={`/blogs/${featured.slug}/`}>Read featured guide <ArrowUpRight /></a></div>
    </article><div className="blog-grid">{filtered.slice(1).map(article => <article key={article.slug}>
      {article.image && <a className="blog-card-image" href={`/blogs/${article.slug}/`} tabIndex="-1" aria-hidden="true"><img src={article.image} alt="" width="1200" height="675" loading="lazy" decoding="async" /></a>}
      <div><span>{article.tag}</span><time dateTime={article.published}>Published {dateLabel(article.published)}</time><h3><a href={`/blogs/${article.slug}/`}>{article.title}</a></h3><p>{article.description}</p><a className="blog-read" href={`/blogs/${article.slug}/`}>Read guide <ArrowUpRight /></a></div>
    </article>)}</div></> : <div className="blog-empty"><BookOpen /><h3>No matching guides yet</h3><p>Try a broader topic or clear the category filter.</p><button type="button" onClick={() => { updateQuery(""); setTag("All"); }}>Show all guides</button></div>}
  </section>;
}
