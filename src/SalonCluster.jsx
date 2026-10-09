import React from 'react';
import { blogListingData } from './blogListingData.js';
import { salonClusters, salonClusterPath } from './salonCluster.js';
import './salon-cluster.css';

export function SalonClusterLink() {
  return <nav className="salon-cluster-link" aria-label="Salon topic navigation"><a href={salonClusterPath}>Explore salon business planning guides</a><span>Services, repeat visits, chair capacity and break-even</span></nav>;
}

export default function SalonCluster() {
  const posts = new Map(blogListingData.posts.map(post => [post.slug, post]));
  return <div className="salon-cluster">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Salon business planning</span></nav>
    <section className="salon-cluster-hero"><div><span className="salon-eyebrow">SALON BUSINESS PLANNING</span><h1>Salon guides for pricing, repeat visits and chair capacity</h1><p>Cost a service, review a membership or check whether available appointments can fund your target. Choose the guide for the decision, then work with your own prices, costs and available hours.</p><a className="page-button" href="#salon-decisions">Find my next decision</a></div><img src="/images/tools/salon-rebooking-calculator-cover.webp" alt="Editorial illustration of salon appointment and repeat-visit planning" width="1200" height="675" fetchPriority="high" decoding="async"/></section>
    <section className="salon-calculator-links" aria-labelledby="salon-tools-title"><h2 id="salon-tools-title">Run your own numbers</h2><div><a href="/calculators/salon-break-even-calculator/"><strong>Plan the whole business →</strong><span>Required monthly appointments, revenue, owner pay and productive capacity.</span></a><a href="/calculators/salon-rebooking-calculator/"><strong>Measure rebooking →</strong><span>Repeat-visit assumptions and appointment demand.</span></a><a href="/calculators/salon-no-show-profit-loss-calculator/"><strong>Estimate no-show losses →</strong><span>Missed revenue and contribution after avoided costs.</span></a><a href="/calculators/hair-color-product-cost-calculator/"><strong>Cost hair color products →</strong><span>Product use and waste per appointment.</span></a></div><p>Product cost is one appointment input. Rebooking describes repeat visits; no-show losses depend on costs actually avoided. The whole-business plan also needs monthly commitments and deliverable capacity.</p></section>
    <nav className="salon-topic-index" aria-label="Salon decisions">{salonClusters.map(group => <a key={group.id} href={'#' + group.id}>{group.title}</a>)}</nav>
    <div className="salon-cluster-grid" id="salon-decisions">{salonClusters.map(group => <section key={group.id} id={group.id} className="salon-cluster-card"><h2>{group.title}</h2><p>{group.description}</p><ul>{group.slugs.map(slug => {const post = posts.get(slug);return <li key={slug}><a href={'/blogs/' + slug + '/'}>{post.title}</a><p>{post.description}</p></li>;})}</ul></section>)}</div>
    <section className="salon-scope"><h2>Connect the service menu to available appointment hours</h2><p>Separate completed visits from inquiries and future bookings. Include preparation, cleanup and the staff time each service requires. A free chair is only useful when the right stylist is available for that service.</p><p>Keep variable commission or delivery labor separate from committed payroll. Count owner pay once. Retail sales, booth rent and membership collections need their own units before they join the monthly plan.</p><p>The worked figures are hypothetical planning examples, not local market prices or predicted results. Enter your own costs, service mix and available hours.</p><a href="/blogs/">Browse all business planning guides</a></section>
  </div>;
}
