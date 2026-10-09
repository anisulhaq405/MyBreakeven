import React from 'react';
import { blogListingData } from './blogListingData.js';
import { landscapingClusters, landscapingClusterPath } from './landscapingCluster.js';
import './landscaping-cluster.css';

export function LandscapingClusterLink() {
  return <nav className="landscaping-cluster-link" aria-label="Landscaping topic navigation"><a href={landscapingClusterPath}>Explore landscaping business planning guides</a><span>Service pricing, routes, crew costs and break-even</span></nav>;
}

export default function LandscapingCluster() {
  const posts = new Map(blogListingData.posts.map(post => [post.slug, post]));
  return <div className="landscaping-cluster">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Landscaping business planning</span></nav>
    <section className="landscaping-cluster-hero"><div><span className="landscaping-eyebrow">LANDSCAPING BUSINESS PLANNING</span><h1>Landscaping business guides for pricing, costs and capacity</h1><p>Build a service quote, check a lawn route or plan your monthly target. Choose the guide that matches the decision, then test it with your own costs and available hours.</p><a className="page-button" href="#landscaping-decisions">Find my next decision</a></div><img src="/images/tools/lawn-route-profit-calculator-modern-cover.webp" alt="Lawn care worker mowing beside a service truck, with illustrated route markers and a clock" width="1200" height="675" fetchPriority="high" decoding="async"/></section>
    <section className="landscaping-calculator-links" aria-labelledby="landscaping-tools-title"><h2 id="landscaping-tools-title">Run your own numbers</h2><div><a href="/calculators/landscaping-break-even-calculator/"><strong>Plan the whole business →</strong><span>Required monthly jobs, revenue, owner pay and crew capacity.</span></a><a href="/calculators/lawn-route-profit-calculator/"><strong>Check one lawn route →</strong><span>Route revenue, service and driving time, crew costs and allocated overhead.</span></a></div><p>A route estimate covers one route. A monthly break-even plan also needs the rest of the business costs, target income and workable capacity.</p></section>
    <nav className="landscaping-topic-index" aria-label="Landscaping decisions">{landscapingClusters.map(group => <a key={group.id} href={'#' + group.id}>{group.title}</a>)}</nav>
    <div className="landscaping-cluster-grid" id="landscaping-decisions">{landscapingClusters.map(group => <section key={group.id} id={group.id} className="landscaping-cluster-card"><h2>{group.title}</h2><p>{group.description}</p><ul>{group.slugs.map(slug => {const post = posts.get(slug);return <li key={slug}><a href={'/blogs/' + slug + '/'}>{post.title}</a><p>{post.description}</p></li>;})}</ul></section>)}</div>
    <section className="landscaping-scope"><h2>Keep the job, route and business costs consistent</h2><p>Count a worker-hour for each person working an hour. Keep that measure separate from a crew's elapsed site time and a machine's operating hours. Put fuel, maintenance and equipment ownership allowances in one place so a quote and the monthly plan do not count them twice.</p><p>For seasonal work, separate annual commitments, active-month delivery capacity and cash collection dates. A profitable job can still leave a shortfall if the business cannot deliver enough work or collect payment in time.</p><p>The guides use hypothetical worked examples. Their figures are planning assumptions, not local market rates or predicted results.</p><a href="/blogs/">Browse all business planning guides</a></section>
  </div>;
}
