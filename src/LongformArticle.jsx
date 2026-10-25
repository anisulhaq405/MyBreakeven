import SalonBoothComparison from './SalonBoothComparison.jsx';
import OperatingCashFlowWidget from './OperatingCashFlowWidget.jsx';
import {BudgetBridgeWidget,DriverAllocationWidget,JobCostWidget} from './Day3PlanningWidgets.jsx';
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
import { articleGuideType } from "./articleGuideType.js";
import React, { useEffect } from "react";
import { articleFaq } from "./articleFaq.js";
import { responsiveFeatureProps } from './responsiveFeatureImages.js';
import './new-content-navigation.css';
import MarginMarkupWidget from './MarginMarkupWidget.jsx';
import {FlexibleBudgetWidget,MakeOrBuyWidget,BreakEvenChartWidget} from './Day2PlanningWidgets.jsx';
import HighLowWidget from './HighLowWidget.jsx';
import ContributionMarginWidget from './ContributionMarginWidget.jsx';

const dateLabel = value => new Date(`${value}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

export default function LongformArticle({ article: a }) {
  const slug = a?.slug;
  const hasIntroWidget = ['salon-booth-rent-vs-commission-owner','operating-cash-flow', 'master-budget', 'cost-drivers-small-business', 'job-order-costing', 'margin-vs-markup', 'calculate-contribution-margin', 'high-low-method', 'flexible-budget-variance-analysis', 'make-or-buy-decision', 'break-even-analysis-example'].includes(slug);
  const guideType = articleGuideType(a);
  useEffect(() => {
    if (!a) return;
    document.title = `${a.seoTitle} | MyBreakeven`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", a.metaDescription);
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", `https://mybreakeven.com/blogs/${slug}/`);
  }, [a, slug]);
  if (!a) return <section className="page-hero"><h1>Guide not found</h1><a href="/blogs/">Return to blogs</a></section>;
  const faq = articleFaq(a);
  return <article className={`article-page${a.sectionLinks?' article-with-section-nav':''}`}>
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>{a.tag}</span></nav>
    {a.tag === "Agency" && <AgencyClusterLink />}{a.tag === "E-commerce" && <EcommerceClusterLink />}{a.tag === "Photography" && <PhotographyClusterLink />}{a.tag === "Restaurant" && <RestaurantClusterLink />}{a.tag === "Salon" && <SalonClusterLink />}{a.tag === "Cleaning" && <CleaningClusterLink />}{a.tag === "Landscaping" && <LandscapingClusterLink />}{a.tag === "Mobile Detailing" && <MobileDetailingClusterLink />}
    {a.editorialStatus==='draft'&&<p className="article-note" role="status">Unpublished draft for review</p>}
    <span>{a.tag} {guideType}</span><h1>{a.title}</h1>
    <div className="article-meta"><time dateTime={a.published}>{a.editorialStatus==='draft'?'Draft prepared':'Published'} {dateLabel(a.published)}</time><span>Updated {dateLabel(a.modified)}</span></div>
    <p className="article-note">Published by <a href="/about-us/">MyBreakeven</a>. <a href="/editorial-policy/">Editorial standards and corrections</a>. Report a calculation or content issue to <a href="mailto:support@mybreakeven.com">support@mybreakeven.com</a>.</p>
    <p className="article-lead">{a.description}</p>
    <GuideCalculatorLink slug={a.slug} />
    <EcommerceExampleLink slug={a.slug} />
    <ScenarioAnalysisLink slug={a.slug || slug} />
    <RestaurantExampleLink slug={a.slug} />
    <div className="article-tags" aria-label="Article topics">{a.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    {a.sectionLinks&&<nav className="article-section-nav" aria-label="Guide sections">{a.sectionLinks.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav>}
    {a.answerHtml&&<section className="article-summary" dangerouslySetInnerHTML={{__html:a.answerHtml}} />}
    {slug==='salon-booth-rent-vs-commission-owner'&&<SalonBoothComparison/>}
    {slug==='operating-cash-flow'&&<OperatingCashFlowWidget/>}
    {slug==='margin-vs-markup'&&<MarginMarkupWidget/>}
    {slug==='calculate-contribution-margin'&&<ContributionMarginWidget/>}
    {slug==='master-budget'&&<BudgetBridgeWidget/>}
    {slug==='cost-drivers-small-business'&&<DriverAllocationWidget/>}
    {slug==='job-order-costing'&&<JobCostWidget/>}
    {slug==='high-low-method'&&<HighLowWidget/>}
    {slug==='flexible-budget-variance-analysis'&&<FlexibleBudgetWidget/>}
    {slug==='make-or-buy-decision'&&<MakeOrBuyWidget/>}
    {slug==='break-even-analysis-example'&&<BreakEvenChartWidget/>}
    <figure className="article-featured"><img src={a.image} {...responsiveFeatureProps(a.image)} alt={a.alt} width={blogImageDimensions[a.image]?.width || 1200} height={blogImageDimensions[a.image]?.height || 675} fetchPriority={hasIntroWidget?undefined:'high'} loading={hasIntroWidget?'lazy':undefined} decoding="async"/><figcaption>{a.imageCaption}</figcaption></figure>
    <div className="day1-markdown" dangerouslySetInnerHTML={{ __html: a.html }} />
    <ScenarioAnalysis slug={a.slug || slug} />
    {!faq.inline && faq.items.length > 0 && <section className="article-faq" id={a.sectionLinks?'guide-faqs':undefined}><h2>Frequently asked questions</h2>{faq.items.map(item => <details key={item.q}><summary>{item.q}</summary><p>{item.a}</p></details>)}</section>}
    {!a.html.includes('href="/blogs/"') && !a.html.includes('href="https://mybreakeven.com/blogs/"') && <p><a href="/blogs/">Browse the MyBreakeven blog hub</a> for related planning guides.</p>}
    <ClusterRelatedReading article={a} />
    <p className="article-note">Planning estimates only—not accounting, tax, legal or lending advice.</p>
  </article>;
}
