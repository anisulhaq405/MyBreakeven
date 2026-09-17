import React, { useEffect } from "react";
import { day1PostMap } from "./day1Posts.js";

export default function Day1Article({ slug }) {
  const a = day1PostMap[slug];
  useEffect(() => {
    if (!a) return;
    document.title = `${a.seoTitle} | MyBreakeven`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", a.metaDescription);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://mybreakeven.com/blogs/${slug}/`);
  }, [a, slug]);
  if (!a) return <section className="page-hero"><h1>Guide not found</h1><a href="/blogs/">Return to blogs</a></section>;
  return <article className="article-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>{a.tag}</span></nav>
    <span>{a.tag} PRICING GUIDE</span><h1>{a.title}</h1>
    <div className="article-meta"><time dateTime={a.published}>Published September 17, 2026</time><span>Updated September 17, 2026</span></div>
    <p className="article-lead">{a.description}</p>
    <figure className="article-featured"><img src={a.image} alt={a.alt} width="1200" height="675" fetchPriority="high" decoding="async"/><figcaption>{a.imageCaption}</figcaption></figure>
    <div className="day1-markdown" dangerouslySetInnerHTML={{ __html: a.html }} />
    <section className="article-faq"><h2>Frequently asked questions</h2>{a.faq.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
    <aside><h2>Run your own {a.tag.toLowerCase()} numbers</h2><p>Use your own costs, fees, volume and capacity assumptions in the matching calculator.</p><a className="page-button" href={`/calculators/${a.calculatorSlug}/`}>Use the free {a.tag} break-even calculator</a></aside>
    <p className="article-note">Planning estimates only—not accounting, tax, legal or lending advice.</p>
  </article>;
}
