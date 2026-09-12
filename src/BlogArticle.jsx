import React,{useEffect}from"react";
import {articleList,articles} from"./blogData.js";

export default function BlogArticle({slug}){
  const a=articles[slug];
  useEffect(()=>{if(a){
    document.title=`${a.title} | MyBreakeven`;
    document.querySelector('meta[name="description"]')?.setAttribute("content",a.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href",`https://mybreakeven.com/blogs/${slug}/`);
  }},[a,slug]);
  if(!a)return <section className="page-hero"><h1>Guide not found</h1><a href="/blogs/">Return to blogs</a></section>;
  return <article className="article-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>{a.tag}</span></nav>
    <span>{a.tag} BREAK-EVEN GUIDE</span><h1>{a.title}</h1><p className="article-lead">{a.description}</p>
    {a.image&&<img src={a.image} alt={a.alt} width="1200" height="675" fetchPriority="high" decoding="async"/>}
    <section className="article-summary"><h2>Quick answer</h2><p>Break-even is reached when contribution from completed {a.unit} covers monthly overhead and any owner-pay or profit target entered. Use actual per-{a.singular} costs and realistic productive capacity; the result is only as reliable as those assumptions.</p></section>
    <section><h2>Calculator features</h2><ul>{a.features.map(item=><li key={item}>{item}</li>)}</ul></section>
    {a.sections.map((section,index)=><React.Fragment key={section.heading}><section><h2>{section.heading}</h2>{section.paragraphs?.map(p=><p key={p}>{p}</p>)}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>{index===2&&a.insideImage&&<figure className="article-visual"><img src={a.insideImage} alt={a.insideAlt} width="1200" height="630" loading="lazy" decoding="async"/><figcaption>How the {a.name.toLowerCase()} break-even calculation connects contribution, required {a.unit}, revenue and capacity.</figcaption></figure>}</React.Fragment>)}
    <section className="article-faq"><h2>Frequently asked questions</h2>{a.faq.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
    <aside><h2>Run your own {a.tag.toLowerCase()} numbers</h2><p>Open the matching calculator with industry-specific inputs, exact fractional results and whole-unit operating targets.</p><a className="page-button" href={`/calculators/${a.calculatorSlug}/`}>Use the free {a.tag} break-even calculator</a></aside>
    <section className="related-guides"><h2>Related break-even resources</h2><ul>{articleList.filter(item=>item.slug!==slug).slice(0,3).map(item=><li key={item.slug}><a href={`/blogs/${item.slug}/`}>{item.title}</a></li>)}<li><a href="/#calculator">Free small business break-even calculator</a></li><li><a href="/#methodology">Transparent break-even calculation methodology</a></li></ul></section>
    <p className="article-note">Reviewed September 10, 2026. Planning estimates only—not accounting, tax, legal or lending advice.</p>
  </article>
}
