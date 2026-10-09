import React from 'react';
import { blogListingData } from './blogListingData.js';
import { ecommerceClusters, ecommerceClusterPath } from './ecommerceCluster.js';
import './ecommerce-cluster.css';

export function EcommerceClusterLink() {
  return <nav className="ecommerce-cluster-link" aria-label="Ecommerce topic navigation"><a href={ecommerceClusterPath}>Explore ecommerce business planning guides</a><span>Products, returns, inventory and break-even</span></nav>;
}

export default function EcommerceCluster() {
  const posts = new Map(blogListingData.posts.map(post => [post.slug, post]));
  return <div className="ecommerce-cluster">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Ecommerce business planning</span></nav>
    <section className="ecommerce-cluster-hero"><div><span className="ecommerce-eyebrow">ECOMMERCE BUSINESS PLANNING</span><h1>E-commerce guides for orders, inventory and contribution</h1><p>Cost an order, compare a sales channel or check whether your fulfillment plan can fund the business. Choose the guide for the decision, then work with your own prices, costs and available hours.</p><a className="page-button" href="#ecommerce-decisions">Find my next decision</a></div><img src="/images/tools/ecommerce-break-even.webp" alt="Editorial illustration of ecommerce business planning" width="1200" height="675" fetchPriority="high" decoding="async"/></section>
    <section className="ecommerce-calculator-links" aria-labelledby="ecommerce-tools-title"><h2 id="ecommerce-tools-title">Run your own numbers</h2><div><a href="/calculators/ecommerce-break-even-calculator/"><strong>Plan the whole store →</strong><span>Required orders, revenue, owner pay and fulfillment capacity.</span></a><a href="/calculators/ecommerce-return-cost-calculator/"><strong>Cost a returned order →</strong><span>Refunds, return handling and inventory recovery from your inputs.</span></a><a href="/calculators/break-even-roas-calculator/"><strong>Test advertising economics →</strong><span>Revenue relative to ad spend at the entered pre-ad margin.</span></a></div><p>A return-cost estimate informs one order cost. ROAS uses the entered margin boundary; it does not prove that monthly overhead is covered. Bring consistent net order revenue, costs and acquisition assumptions into the whole-store plan.</p></section>
    <nav className="ecommerce-topic-index" aria-label="Ecommerce decisions">{ecommerceClusters.map(group => <a key={group.id} href={'#' + group.id}>{group.title}</a>)}</nav>
    <div className="ecommerce-cluster-grid" id="ecommerce-decisions">{ecommerceClusters.map(group => <section key={group.id} id={group.id} className="ecommerce-cluster-card"><h2>{group.title}</h2><p>{group.description}</p><ul>{group.slugs.map(slug => {const post = posts.get(slug);return <li key={slug}><a href={'/blogs/' + slug + '/'}>{post.title}</a><p>{post.description}</p></li>;})}</ul></section>)}</div>
    <section className="ecommerce-scope"><h2>Keep receipts, contribution and inventory cash separate</h2><p>An order, an item and a paying subscriber are different units. Use the same unit for revenue, costs and capacity. Returns can reduce retained revenue and recover stock; a chargeback can leave different fees and inventory outcomes.</p><p>Include product cost, fulfillment, shipping subsidy, platform and payment fees, expected losses and acquisition once. Keep the cash spent buying inventory visible alongside the cost attributed to sold orders. A profitable order mix can still require more cash before the stock sells.</p><p>These are hypothetical planning examples, not forecasts or current platform fee schedules. Replace assumptions with your own records. Physical retail staffing and receipts require their own operating model.</p><a href="/blogs/">Browse all business planning guides</a></section>
  </div>;
}
