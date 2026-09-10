import React from "react";
import {articleList} from "./blogData.js";

export default function BlogSection(){return <section className="blog-preview" id="blog">
  <div className="blog-heading"><div><span>MYBREAKEVEN GUIDES</span><h2>Industry break-even calculator guides</h2></div><a href="/blogs/">View all guides →</a></div>
  <div className="blog-grid">{articleList.map(a=><article key={a.slug} className={!a.image?"text-card":""}>
    {a.image&&<img src={a.image} alt={a.alt} width="720" height="480" loading="lazy"/>}
    <div><span>{a.tag}</span><h3>{a.title}</h3><p>{a.description}</p><a href={`/blogs/${a.slug}/`}>Read complete guide →</a></div>
  </article>)}</div>
</section>}
