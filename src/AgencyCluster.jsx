import React from 'react';
import { blogListingData } from './blogListingData.js';
import { agencyClusters, agencyClusterPath } from './agencyCluster.js';
import './agency-cluster.css';

export function AgencyClusterLink() {
  return <nav className="agency-cluster-link" aria-label="Agency topic navigation"><a href={agencyClusterPath}>Explore agency business planning guides</a><span>Retainers, delivery hours, client risk and break-even</span></nav>;
}

export default function AgencyCluster() {
  const posts = new Map(blogListingData.posts.map(post => [post.slug, post]));
  return <div className="agency-cluster">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Agency business planning</span></nav>
    <section className="agency-cluster-hero"><div><span className="agency-eyebrow">AGENCY BUSINESS PLANNING</span><h1>Agency guides for retainers, delivery capacity and cash</h1><p>Price a retainer, review a client assignment or check whether available team hours can fund your business. Choose the guide for the decision, then work with your own prices, costs and available hours.</p><a className="page-button" href="#agency-decisions">Find my next decision</a></div><img src="/images/tools/agency-break-even.webp" alt="Editorial illustration of agency business planning" width="1200" height="675" fetchPriority="high" decoding="async"/></section>
    <section className="agency-calculator-links" aria-labelledby="agency-tools-title"><h2 id="agency-tools-title">Run your own numbers</h2><div><a href="/calculators/agency-break-even-calculator/"><strong>Plan the whole agency →</strong><span>Required retainer clients, revenue, owner pay and delivery capacity.</span></a><a href="/calculators/hourly-rate-calculator/"><strong>Estimate your required hourly rate →</strong><span>Billable hours, overhead and income assumptions for hourly work.</span></a><a href="/calculators/cash-runway-calculator/"><strong>Test cash runway →</strong><span>Cash above your reserve under entered constant receipts and payments.</span></a></div><p>An hourly rate estimate is not a complete retainer scope. Cash runway uses constant-flow assumptions rather than invoice-by-invoice dates. Use the guides to check delivery hours and actual payment timing alongside your monthly plan.</p></section>
    <nav className="agency-topic-index" aria-label="Agency decisions">{agencyClusters.map(group => <a key={group.id} href={'#' + group.id}>{group.title}</a>)}</nav>
    <div className="agency-cluster-grid" id="agency-decisions">{agencyClusters.map(group => <section key={group.id} id={group.id} className="agency-cluster-card"><h2>{group.title}</h2><p>{group.description}</p><ul>{group.slugs.map(slug => {const post = posts.get(slug);return <li key={slug}><a href={'/blogs/' + slug + '/'}>{post.title}</a><p>{post.description}</p></li>;})}</ul></section>)}</div>
    <section className="agency-scope"><h2>Connect client scope to productive team hours</h2><p>A retainer client, a project and a billed hour are different units. Define the promised work and include meetings, revisions, coordination and delivery before estimating contribution. Unpaid extra work still consumes capacity.</p><p>Record committed payroll separately from genuinely variable contractor costs, and count owner pay once. Utilization is productive delivery time relative to the stated available hours; it is not a guarantee that those hours will sell.</p><p>Revenue concentration, contribution concentration and unpaid invoices describe different risks. The examples are hypothetical planning assumptions, not market prices, staffing advice or predictions of client loss.</p><a href="/blogs/">Browse all business planning guides</a></section>
  </div>;
}
