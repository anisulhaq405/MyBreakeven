import './cluster-links.css';
import React from 'react';
import { agencyClusterPath } from './agencyCluster.js';
import { ecommerceClusterPath } from './ecommerceCluster.js';
import { photographyClusterPath } from './photographyCluster.js';
import { restaurantClusterPath } from './restaurantCluster.js';
import { salonClusterPath } from './salonCluster.js';
import { mobileDetailingClusterPath } from './mobileDetailingCluster.js';
import { landscapingClusterPath } from './landscapingCluster.js';
import { cleaningClusterPath } from './cleaningCluster.js';

export function AgencyClusterLink() {
  return <nav className="agency-cluster-link" aria-label="Agency topic navigation"><a href={agencyClusterPath}>Explore agency business planning guides</a><span>Retainers, delivery hours, client risk and break-even</span></nav>;
}

export function EcommerceClusterLink() {
  return <nav className="ecommerce-cluster-link" aria-label="Ecommerce topic navigation"><a href={ecommerceClusterPath}>Explore ecommerce business planning guides</a><span>Products, returns, inventory and break-even</span></nav>;
}

const productGuidePrompts = {
  'how-to-price-products-for-ecommerce': 'Test your product price against materials, fees, owner pay and making time.',
  'ecommerce-profit-margin': 'Follow an order from selling price to contribution, then check the monthly target.',
  'ecommerce-break-even': 'Turn product costs into a whole-order target and check whether your available hours can deliver it.',
  'ecommerce-orders-per-day-profitable': 'Build a monthly order target before translating it into your own selling days.',
};
export function EcommerceExampleLink({ slug }) {
  const prompt = productGuidePrompts[slug];
  if (!prompt) return null;
  return <aside className="ecommerce-cluster-link" aria-label="Try a product planning example"><strong>{prompt}</strong><a href="/calculators/ecommerce-break-even-calculator/#ecommerce-product-examples">Try jewellery, ceramics, clothing or art-print examples →</a><span>Illustrative USD inputs; preview first, then choose whether to load and edit.</span></aside>;
}

export function PhotographyClusterLink() {
  return <nav className="photography-cluster-link" aria-label="Photography topic navigation"><a href={photographyClusterPath}>Explore photography business planning guides</a><span>Packages, assignments, editing and break-even</span></nav>;
}

export function RestaurantClusterLink() {
  return <nav className="restaurant-cluster-link" aria-label="Restaurant topic navigation"><a href={restaurantClusterPath}>Explore restaurant business planning guides</a><span>Menus, operating costs, sales channels and break-even</span></nav>;
}

const restaurantExampleGuides = new Set(['restaurant-break-even', 'restaurant-covers-per-night-break-even', 'restaurant-takeout-vs-dine-in-profit-per-order', 'restaurant-delivery-app-commission-profit-per-order']);
export function RestaurantExampleLink({ slug }) {
  if (!restaurantExampleGuides.has(slug)) return null;
  return <aside className="restaurant-cluster-link" aria-label="Restaurant channel planning example"><strong>Turn order contribution into a monthly service target.</strong><a href="/calculators/restaurant-break-even-calculator/#restaurant-channel-examples">Try dine-in, takeaway and delivery examples →</a><span>Preview hypothetical USD assumptions, then load and edit your chosen case. Orders and guest covers are different units.</span></aside>;
}

export function SalonClusterLink() {
  return <nav className="salon-cluster-link" aria-label="Salon topic navigation"><a href={salonClusterPath}>Explore salon business planning guides</a><span>Services, repeat visits, chair capacity and break-even</span></nav>;
}

export function MobileDetailingClusterLink() {
  return <nav className="detailing-cluster-link" aria-label="Mobile detailing topic navigation"><a href={mobileDetailingClusterPath}>Explore mobile detailing business planning guides</a><span>Packages, routes, supplies and break-even</span></nav>;
}

export function LandscapingClusterLink() {
  return <nav className="landscaping-cluster-link" aria-label="Landscaping topic navigation"><a href={landscapingClusterPath}>Explore landscaping business planning guides</a><span>Service pricing, routes, crew costs and break-even</span></nav>;
}

export function CleaningClusterLink(){return <nav className="cleaning-cluster-link" aria-label="Cleaning topic navigation"><a href={cleaningClusterPath}>Explore cleaning business planning guides</a><span>Pricing, costs, contracts and break-even</span></nav>;}
export default function CleaningCluster(){
 const posts=new Map(blogListingData.posts.map(p=>[p.slug,p]));
 return <div className="cleaning-cluster">
 <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Cleaning business planning</span></nav>
 <section className="cleaning-cluster-hero"><div><span className="cleaning-eyebrow">CLEANING BUSINESS PLANNING</span><h1>Price the work. Understand the costs. Check the plan.</h1><p>Find the guide for your next cleaning business decision: a quote, a contract renewal, a monthly budget or an income target.</p><a className="page-button" href="#cleaning-practical-workflows">Find my next decision</a></div><img src="/images/tools/cleaning-contract-profit-calculator-modern-cover.webp" alt="Professional cleaning equipment and a contract clipboard in an office lobby" width="1200" height="675" fetchPriority="high" decoding="async"/></section>
 <section className="cleaning-calculator-links" aria-labelledby="cleaning-tools-title"><h2 id="cleaning-tools-title">Run your own numbers</h2><div><a href="/calculators/cleaning-business-break-even-calculator/"><strong>Plan the whole business →</strong><span>Monthly jobs, revenue, owner pay and available capacity.</span></a><a href="/calculators/cleaning-contract-profit-calculator/"><strong>Check one contract →</strong><span>Account revenue, paid labour, supplies and allocated overhead.</span></a></div><p>These tools use your assumptions. A workable monthly plan still depends on booking, delivering and collecting payment for the work.</p></section>
 <p><a href="/resources/cleaning-job-cost-worksheet/">Download the cleaning estimate-vs-actual job-cost worksheet</a></p>
 <SectionWorkflows industry="cleaning"/>
    <nav className="cleaning-topic-index" aria-label="Cleaning decisions">{cleaningClusters.map(c=><a key={c.id} href={'#'+c.id}>{c.title}</a>)}</nav>
 <div className="cleaning-cluster-grid" id="cleaning-decisions">{cleaningClusters.map(c=><section key={c.id} id={c.id} className="cleaning-cluster-card"><h2>{c.title}</h2><p>{c.description}</p><ul>{c.slugs.map(slug=>{const p=posts.get(slug);return <li key={slug}><a href={'/blogs/'+slug+'/'}>{p.title}</a><p>{p.description}</p></li>;})}</ul></section>)}</div>
 <section className="cleaning-scope"><h2>Choose the right cost boundary</h2><p>A job quote answers what one visit must charge. A contract review looks at one account. A monthly break-even plan combines contribution with overhead, owner pay and capacity. Cash planning also needs the dates money is collected and paid.</p><p>Start with the decision you are making, and keep each cost in one place. The guides include hypothetical worked examples; their figures are not local market rates.</p><a href="/blogs/">Browse all business planning guides</a></section>
 </div>;
}
