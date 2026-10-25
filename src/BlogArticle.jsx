import ScenarioAnalysis, {ScenarioAnalysisLink} from './ScenarioAnalysis.jsx';
import { RestaurantExampleLink } from './ClusterLinks.jsx';
import GuideCalculatorLink from './GuideCalculatorLink.jsx';
import { EcommerceExampleLink } from './ClusterLinks.jsx';
import { blogImageDimensions } from "./blogImageDimensions.js";
import ClusterRelatedReading from './ClusterRelatedReading.jsx';
import { AgencyClusterLink } from './ClusterLinks.jsx';
import { EcommerceClusterLink } from './ClusterLinks.jsx';
import { PhotographyClusterLink } from './ClusterLinks.jsx';
import { RestaurantClusterLink } from './ClusterLinks.jsx';
import { SalonClusterLink } from './ClusterLinks.jsx';
import { MobileDetailingClusterLink } from './ClusterLinks.jsx';
import { LandscapingClusterLink } from './ClusterLinks.jsx';
import { CleaningClusterLink } from './ClusterLinks.jsx';
import React,{useEffect,useState}from"react";
import LongformArticle from "./LongformArticle.jsx";
import { getLoadedBlogPost, loadBlogPost, relatedBlogPosts } from "./blogContentLoader.js";

export default function BlogArticle({slug,initialArticle}){
  const [a,setArticle]=useState(() => initialArticle || getLoadedBlogPost(slug));
  useEffect(()=>{
    let active=true;
    loadBlogPost(slug).then(post=>{if(active)setArticle(post);}).catch(()=>{if(active)setArticle(null);});
    return ()=>{active=false;};
  },[slug]);
  useEffect(()=>{if(a){
    document.title=`${a.seoTitle} | MyBreakeven`;
    document.querySelector('meta[name="description"]')?.setAttribute("content",a.metaDescription);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href",`https://mybreakeven.com/blogs/${slug}/`);
  }},[a,slug]);
  if(a===undefined)return <section className="page-hero"><h1>Loading guide…</h1></section>;
  if(!a)return <section className="page-hero"><h1>Guide not found</h1><a href="/blogs/">Return to blogs</a></section>;
  if(a.html)return <LongformArticle article={a} />;
  return <article className="article-page">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>{a.tag}</span></nav>
    {a.tag === "Agency" && <AgencyClusterLink />}{a.tag === "E-commerce" && <EcommerceClusterLink />}{a.tag === "Photography" && <PhotographyClusterLink />}{a.tag === "Restaurant" && <RestaurantClusterLink />}{a.tag === "Salon" && <SalonClusterLink />}{a.tag === "Cleaning" && <CleaningClusterLink />}{a.tag === "Landscaping" && <LandscapingClusterLink />}{a.tag === "Mobile Detailing" && <MobileDetailingClusterLink />}
    <span>{a.tag} BREAK-EVEN GUIDE</span><h1>{a.title}</h1>
    <div className="article-meta"><time dateTime={a.published}>Published {new Date(`${a.published}T12:00:00Z`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"})}</time><span>Updated {new Date(`${a.modified}T12:00:00Z`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"})}</span></div>
    <p className="article-note">Published by <a href="/about-us/">MyBreakeven</a>. <a href="/editorial-policy/">Editorial standards and corrections</a>. Report a calculation or content issue to <a href="mailto:support@mybreakeven.com">support@mybreakeven.com</a>.</p>
    <p className="article-lead">{a.description}</p>
    <GuideCalculatorLink slug={a.slug || slug} />
    <EcommerceExampleLink slug={a.slug || slug} />
    <ScenarioAnalysisLink slug={a.slug || slug} />
    <RestaurantExampleLink slug={a.slug || slug} />
    <div className="article-tags" aria-label="Article topics">{a.tags.map(tag=><span key={tag}>{tag}</span>)}</div>
    {a.answerHtml&&<section className="article-summary" dangerouslySetInnerHTML={{__html:a.answerHtml}} />}
    {a.image&&<figure className="article-featured"><img src={a.image} alt={a.alt} width={blogImageDimensions[a.image]?.width || 1200} height={blogImageDimensions[a.image]?.height || 675} fetchPriority="high" decoding="async"/><figcaption>{a.imageCaption}</figcaption></figure>}
    <section className="article-summary"><h2>What this number really tells you</h2><p>{a.opening}</p><p>Operating break-even covers the included operating costs. Adding separately entered owner pay or a profit goal produces a higher monthly planning target; include each cost once. Contribution from completed {a.unit} must cover the chosen monthly requirement. Use actual per-{a.singular} costs and realistic productive capacity, then calculate your {a.tag.toLowerCase()} break-even point with your own figures.</p></section>
    <section><h2>What the linked calculator checks</h2><ul>{a.features.map(item=><li key={item}>{item}</li>)}</ul></section>
    {a.sections.map((section,index)=><React.Fragment key={section.heading}><section><h2 id={section.id}>{section.heading}</h2>{section.paragraphs?.map(p=><p key={p}>{p}</p>)}{section.table&&<div className="article-table-scroll"><table className="article-records-table"><caption>{section.table.caption}</caption><thead><tr>{section.table.headings.map(heading=><th scope="col" key={heading}>{heading}</th>)}</tr></thead><tbody>{section.table.rows.map(row=><tr key={row[0]}><th scope="row">{row[0]}</th>{row.slice(1).map((cell,cellIndex)=><td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>}{section.links&&<ul>{section.links.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul>}{section.bullets&&<ul>{section.bullets.map(item=><li key={item}>{item}</li>)}</ul>}</section>{index===2&&a.insideImage&&<figure className="article-visual"><img src={a.insideImage} alt={a.insideAlt} width={blogImageDimensions[a.insideImage]?.width || 1200} height={blogImageDimensions[a.insideImage]?.height || 630} loading="lazy" decoding="async"/><figcaption>How the {a.name.toLowerCase()} break-even calculation connects contribution, required {a.unit}, revenue and capacity.</figcaption></figure>}</React.Fragment>)}
    {a.queryReviewHtml&&<div className="day1-markdown" dangerouslySetInnerHTML={{__html:a.queryReviewHtml}}/>}
    <ScenarioAnalysis slug={a.slug || slug} />
    <section className="article-faq"><h2>Frequently asked questions</h2>{a.faq.map(item=><details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>
    <aside><h2>How to run your own numbers</h2><p>Open the matching calculator with industry-specific inputs, exact fractional results and whole-unit operating targets.</p><a className="page-button" href={`/calculators/${a.calculatorSlug}/`}>Use the free {a.tag} break-even calculator</a></aside>
    <section className="related-guides"><h2>Related break-even resources</h2><p>Compare similar operating models or review the methodology behind every result.</p><ul>{relatedBlogPosts(slug).map(item=><li key={item.slug}><a href={`/blogs/${item.slug}/`}>{item.title}</a></li>)}<li><a href="/#calculator">Free small business break-even calculator</a></li><li><a href="/#methodology">Transparent break-even calculation methodology</a></li></ul></section>
    <p className="article-note">Published {new Date(`${a.published}T12:00:00Z`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"})} · Updated {new Date(`${a.modified}T12:00:00Z`).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric",timeZone:"UTC"})}. Planning estimates only—not accounting, tax, legal or lending advice.</p>
  <ClusterRelatedReading article={a} /></article>
}
