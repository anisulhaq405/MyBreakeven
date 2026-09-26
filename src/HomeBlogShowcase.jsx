import React from "react";
import { ArrowUpRight } from "lucide-react";
import { homeBlogData } from "./homeBlogData.js";
import "./home-blog-showcase.css";

const { featured, supporting, guideCount } = homeBlogData;

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
        <div><span className="home-journal-eyebrow"><span aria-hidden="true" className="home-journal-mark">MB / JOURNAL</span> INSIGHTS FOR BETTER DECISIONS</span><h2 id="home-journal-title">The numbers tell a story.<br /><em>Here's what to do next.</em></h2><p>Practical reading for the next decision in your business, from break-even to better pricing.</p></div>
        <a className="home-journal-all" href="/blogs/">Browse {guideCount} guides <ArrowUpRight aria-hidden="true" /></a>
      </div>
      <div className="home-journal-layout">
        {featured && <article className="home-journal-feature">
          <a className="home-journal-feature-image" href={`/blogs/${featured.slug}/`} tabIndex="-1" aria-hidden="true"><img src={featured.image} alt="" width="1200" height="675" loading="lazy" decoding="async" /></a>
          <div className="home-journal-feature-copy"><span className="home-journal-label">THE ESSENTIAL GUIDE <span aria-hidden="true">/ 01</span></span><h3><a href={`/blogs/${featured.slug}/`}>{featured.title}</a></h3><p>{featured.description}</p><a className="home-journal-feature-link" href={`/blogs/${featured.slug}/`}>Read the guide <ArrowUpRight aria-hidden="true" /></a></div>
        </article>}
        <div className="home-journal-side">
          <div className="home-journal-side-heading"><span>THE READING LIST</span><span>03 SELECTED GUIDES</span></div>
          <div className="home-journal-list" aria-label="More practical guides">
            {supporting.map((post, index) => <article key={post.slug}>
              <span className="home-journal-number">0{index + 2}</span><div><span className="home-journal-category">{post.tag}</span><h3><a href={`/blogs/${post.slug}/`}>{post.title}</a></h3></div><a className="home-journal-arrow" href={`/blogs/${post.slug}/`} aria-label={`Read ${post.title}`}><ArrowUpRight aria-hidden="true" /></a>
            </article>)}
          </div>
          <div className="home-journal-topics" aria-label="Explore guides by topic"><span>FIND YOUR NEXT ANSWER</span><div>{topics.map(([label, query]) => <a key={query} href={`/blogs/?q=${encodeURIComponent(query)}`}>{label}<ArrowUpRight aria-hidden="true" /></a>)}</div></div>
        </div>
      </div>
    </div>
  </section>;
}
