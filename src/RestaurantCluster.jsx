import React from 'react';
import { blogListingData } from './blogListingData.js';
import { restaurantClusters, restaurantClusterPath } from './restaurantCluster.js';
import './restaurant-cluster.css';

export function RestaurantClusterLink() {
  return <nav className="restaurant-cluster-link" aria-label="Restaurant topic navigation"><a href={restaurantClusterPath}>Explore restaurant business planning guides</a><span>Menus, operating costs, sales channels and break-even</span></nav>;
}

export default function RestaurantCluster() {
  const posts = new Map(blogListingData.posts.map(post => [post.slug, post]));
  return <div className="restaurant-cluster">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Restaurant business planning</span></nav>
    <section className="restaurant-cluster-hero"><div><span className="restaurant-eyebrow">RESTAURANT BUSINESS PLANNING</span><h1>Restaurant guides for menus, costs and service capacity</h1><p>Cost a menu item, compare a delivery order or check whether your service can fund its monthly commitments. Choose the guide for the decision, then work with your own prices, costs and available hours.</p><a className="page-button" href="#restaurant-decisions">Find my next decision</a></div><img src="/images/tools/restaurant-break-even.webp" alt="Editorial illustration of restaurant business planning" width="1200" height="675" fetchPriority="high" decoding="async"/></section>
    <section className="restaurant-calculator-links" aria-labelledby="restaurant-tools-title"><h2 id="restaurant-tools-title">Run the whole-business plan</h2><div><a href="/calculators/restaurant-break-even-calculator/"><strong>Calculate restaurant break-even →</strong><span>Required orders, revenue, owner pay and productive capacity from your own inputs.</span></a></div><p>Food cost percentage describes one cost relationship. Contribution also includes the delivery costs and fees that change with an order. The monthly plan must cover fixed commitments and fit the hours you can deliver.</p></section>
    <nav className="restaurant-topic-index" aria-label="Restaurant decisions">{restaurantClusters.map(group => <a key={group.id} href={'#' + group.id}>{group.title}</a>)}</nav>
    <div className="restaurant-cluster-grid" id="restaurant-decisions">{restaurantClusters.map(group => <section key={group.id} id={group.id} className="restaurant-cluster-card"><h2>{group.title}</h2><p>{group.description}</p><ul>{group.slugs.map(slug => {const post = posts.get(slug);return <li key={slug}><a href={'/blogs/' + slug + '/'}>{post.title}</a><p>{post.description}</p></li>;})}</ul></section>)}</div>
    <section className="restaurant-scope"><h2>Keep orders, covers and service hours separate</h2><p>One dine-in order can include several guests; a delivery order may use packaging and channel fees instead of a table. State your unit and service mix before comparing contribution or setting a sales target.</p><p>Record committed payroll once. Count genuinely variable labor with the orders it serves, and include owner pay without charging for the same hours twice. A positive contribution per order does not prove that enough orders can be prepared during your busiest service.</p><p>The worked figures are hypothetical planning examples, not local market prices or predicted results. Use your actual menu, costs, opening days and capacity.</p><a href="/blogs/">Browse all business planning guides</a></section>
  </div>;
}
