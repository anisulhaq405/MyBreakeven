import React, { useEffect } from "react";

const dateLabel = value => new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function LongformArticle({ article: a }) {
  const slug = a?.slug;
  const guideType = a?.cluster === "profitability"
    ? "PROFITABILITY GUIDE"
    : a?.cluster?.startsWith("startup")
      ? "STARTUP COST GUIDE"
      : "PRICING GUIDE";
  useEffect(() => {
    if (!a) return;
    document.title = `${a.seoTitle} | MyBreakeven`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", a.metaDescription);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://mybreakeven.com/blogs/${slug}/`);
  }, [a, slug]);
  if (!a) return <section className="page-hero"><h1>Guide not found</h1><a href="/blogs/">Return to blogs</a></section>;
  return <article className="article-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>{a.tag}</span></nav>
    <span>{a.tag} {guideType}</span><h1>{a.title}</h1>
    <div className="article-meta"><time dateTime={a.published}>Published {dateLabel(a.published)}</time><span>Updated {dateLabel(a.modified)}</span></div>
    <p className="article-lead">{a.description}</p>
    <div className="article-tags" aria-label="Article topics">{a.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    <figure className="article-featured"><img src={a.image} alt={a.alt} width="1200" height="675" fetchPriority="high" decoding="async"/><figcaption>{a.imageCaption}</figcaption></figure>
    <div className="day1-markdown" dangerouslySetInnerHTML={{ __html: a.html }} />
    {!a.html.includes('href="https://mybreakeven.com/blogs/"') && <p><a href="/blogs/">Browse the MyBreakeven blog hub</a> for related planning guides.</p>}
    <p className="article-note">Planning estimates only—not accounting, tax, legal or lending advice.</p>
  </article>;
}
