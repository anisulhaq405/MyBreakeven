import React from "react";
import { ArrowUpRight } from "lucide-react";
import { blogCollections, blogLibrarySummary } from "./content/blogs/index.js";
import "./home-blog-showcase.css";

const latest = collection => [...collection].sort((a, b) => b.published.localeCompare(a.published))[0];
const featured = latest(blogCollections.concepts);
const supporting = [
  latest(blogCollections.pricing),
  latest(blogCollections.startup),
  latest(blogCollections.profitability),
].filter(Boolean);

const topics = [
  ["Break-even", "break-even"],
  ["Pricing", "pricing"],
  ["Startup costs", "startup"],
  ["Profit margins", "profit"],
];

export default function HomeBlogShowcase() {
  return <section className="home-journal" id="blog" aria-labelledby="home-journal-title">
    <div className="home-journal-inner">
      <div className="home-journal-heading">
        <div><span className="home-journal-eyebrow">THE MYBREAKEVEN JOURNAL</span><h2 id="home-journal-title">A useful next step for your numbers.</h2><p>Work through a pricing, cost or margin decision with a practical guide.</p></div>
        <a className="home-journal-all" href="/blogs/">Explore all {blogLibrarySummary.guideCount} guides <ArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="home-journal-topics" aria-label="Explore guides by topic">
        {topics.map(([label, query]) => <a key={query} href={`/blogs/?q=${encodeURIComponent(query)}`}>{label}<ArrowUpRight aria-hidden="true" /></a>)}
      </div>
      {featured && <article className="home-journal-feature">
        <div className="home-journal-feature-copy"><span className="home-journal-label">START HERE · BREAK-EVEN BASICS</span><h3><a href={`/blogs/${featured.slug}/`}>{featured.title}</a></h3><p>{featured.description}</p><a className="home-journal-feature-link" href={`/blogs/${featured.slug}/`}>Read the guide <ArrowUpRight aria-hidden="true" /></a></div>
        <a className="home-journal-feature-image" href={`/blogs/${featured.slug}/`} tabIndex="-1" aria-hidden="true"><img src={featured.image} alt="" width="1200" height="675" loading="lazy" decoding="async" /></a>
      </article>}
      <div className="home-journal-list" aria-label="More practical guides">
        {supporting.map((post, index) => <article key={post.slug}>
          <span className="home-journal-number">0{index + 1}</span><div><span className="home-journal-category">{post.tag}</span><h3><a href={`/blogs/${post.slug}/`}>{post.title}</a></h3></div><a className="home-journal-arrow" href={`/blogs/${post.slug}/`} aria-label={`Read ${post.title}`}><ArrowUpRight aria-hidden="true" /></a>
        </article>)}
      </div>
    </div>
  </section>;
}
