import React from "react";
import { blogPosts } from "./content/blogs/index.js";
const dateLabel = value => new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function BlogSection(){return <section className="blog-preview" id="blog">
  <div className="blog-heading"><div><span>MYBREAKEVEN GUIDES</span><h2>Industry break-even calculator guides</h2></div><a href="/blogs/">View all guides →</a></div>
  <div className="blog-grid">{blogPosts.map(a=><article key={a.slug} className={!a.image?"text-card":""}>
    {a.image&&<img src={a.image} alt={a.alt} width="1200" height="675" loading="lazy" decoding="async"/>}
    <div><span>{a.tag}</span><time dateTime={a.published}>Published {dateLabel(a.published)}</time><h3>{a.title}</h3><p>{a.description}</p><a href={`/blogs/${a.slug}/`}>Read the {a.tag} guide →</a></div>
  </article>)}</div>
</section>}
