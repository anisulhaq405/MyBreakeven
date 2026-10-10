import React from 'react';
import { blogListingData } from './blogListingData.js';
import { cleaningClusters, cleaningClusterPath } from './cleaningCluster.js';
import './cleaning-cluster.css';
export function CleaningClusterLink(){return <nav className="cleaning-cluster-link" aria-label="Cleaning topic navigation"><a href={cleaningClusterPath}>Explore cleaning business planning guides</a><span>Pricing, costs, contracts and break-even</span></nav>;}
export default function CleaningCluster(){
 const posts=new Map(blogListingData.posts.map(p=>[p.slug,p]));
 return <div className="cleaning-cluster">
 <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Cleaning business planning</span></nav>
 <section className="cleaning-cluster-hero"><div><span className="cleaning-eyebrow">CLEANING BUSINESS PLANNING</span><h1>Price the work. Understand the costs. Check the plan.</h1><p>Find the guide for your next cleaning business decision: a quote, a contract renewal, a monthly budget or an income target.</p><a className="page-button" href="#cleaning-decisions">Find my next decision</a></div><img src="/images/tools/cleaning-contract-profit-calculator-modern-cover.webp" alt="Professional cleaning equipment and a contract clipboard in an office lobby" width="1200" height="675" fetchPriority="high" decoding="async"/></section>
 <section className="cleaning-calculator-links" aria-labelledby="cleaning-tools-title"><h2 id="cleaning-tools-title">Run your own numbers</h2><div><a href="/calculators/cleaning-business-break-even-calculator/"><strong>Plan the whole business →</strong><span>Monthly jobs, revenue, owner pay and available capacity.</span></a><a href="/calculators/cleaning-contract-profit-calculator/"><strong>Check one contract →</strong><span>Account revenue, paid labour, supplies and allocated overhead.</span></a></div><p>These tools use your assumptions. A workable monthly plan still depends on booking, delivering and collecting payment for the work.</p></section>
 <p><a href="/resources/cleaning-job-cost-worksheet/">Download the cleaning estimate-vs-actual job-cost worksheet</a></p>
 <nav className="cleaning-topic-index" aria-label="Cleaning decisions">{cleaningClusters.map(c=><a key={c.id} href={'#'+c.id}>{c.title}</a>)}</nav>
 <div className="cleaning-cluster-grid" id="cleaning-decisions">{cleaningClusters.map(c=><section key={c.id} id={c.id} className="cleaning-cluster-card"><h2>{c.title}</h2><p>{c.description}</p><ul>{c.slugs.map(slug=>{const p=posts.get(slug);return <li key={slug}><a href={'/blogs/'+slug+'/'}>{p.title}</a><p>{p.description}</p></li>;})}</ul></section>)}</div>
 <section className="cleaning-scope"><h2>Choose the right cost boundary</h2><p>A job quote answers what one visit must charge. A contract review looks at one account. A monthly break-even plan combines contribution with overhead, owner pay and capacity. Cash planning also needs the dates money is collected and paid.</p><p>Start with the decision you are making, and keep each cost in one place. The guides include hypothetical worked examples; their figures are not local market rates.</p><a href="/blogs/">Browse all business planning guides</a></section>
 </div>;
}
