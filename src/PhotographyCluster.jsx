import React from 'react';
import { blogListingData } from './blogListingData.js';
import { photographyClusters, photographyClusterPath } from './photographyCluster.js';
import './photography-cluster.css';

export function PhotographyClusterLink() {
  return <nav className="photography-cluster-link" aria-label="Photography topic navigation"><a href={photographyClusterPath}>Explore photography business planning guides</a><span>Packages, assignments, editing and break-even</span></nav>;
}

export default function PhotographyCluster() {
  const posts = new Map(blogListingData.posts.map(post => [post.slug, post]));
  return <div className="photography-cluster">
    <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Photography business planning</span></nav>
    <section className="photography-cluster-hero"><div><span className="photography-eyebrow">PHOTOGRAPHY BUSINESS PLANNING</span><h1>Photography guides for pricing, assignments and capacity</h1><p>Cost a session, compare a commercial assignment or check whether your bookings can fund the business. Choose the guide for the decision, then work with your own prices, costs and available hours.</p><a className="page-button" href="#photography-decisions">Find my next decision</a></div><img src="/images/tools/photography-break-even.webp" alt="Editorial illustration of photography business planning" width="1200" height="675" fetchPriority="high" decoding="async"/></section>
    <section className="photography-calculator-links" aria-labelledby="photography-tools-title"><h2 id="photography-tools-title">Run the whole-business plan</h2><div><a href="/calculators/photography-business-break-even-calculator/"><strong>Calculate photography break-even →</strong><span>Required sessions, revenue, owner pay and productive capacity from your own inputs.</span></a></div><p>An image price or shooting fee is only part of the assignment. Include preparation, travel, editing, revisions and delivery consistently. The monthly plan also needs business commitments and the work you can deliver.</p></section>
    <nav className="photography-topic-index" aria-label="Photography decisions">{photographyClusters.map(group => <a key={group.id} href={'#' + group.id}>{group.title}</a>)}</nav>
    <div className="photography-cluster-grid" id="photography-decisions">{photographyClusters.map(group => <section key={group.id} id={group.id} className="photography-cluster-card"><h2>{group.title}</h2><p>{group.description}</p><ul>{group.slugs.map(slug => {const post = posts.get(slug);return <li key={slug}><a href={'/blogs/' + slug + '/'}>{post.title}</a><p>{post.description}</p></li>;})}</ul></section>)}</div>
    <section className="photography-scope"><h2>Count the full assignment, not only camera time</h2><p>A session, an image and a client are different units. Specify which one your price and cost describe. Include preparation, paid travel, editing, review and delivery before comparing contribution per working hour.</p><p>Separate variable delivery labor from committed payroll, and count owner pay once. A second photographer changes both cost and worker-hours; the assignment can still be limited by editing capacity. Print orders need their own lab, shipping, design and transaction costs.</p><p>The worked figures are hypothetical planning examples, not local market rates or predicted results. Usage scope is a pricing input here; the guides do not determine legal rights or contract terms for you.</p><a href="/blogs/">Browse all business planning guides</a></section>
  </div>;
}
