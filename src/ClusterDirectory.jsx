import React from 'react';
import './cluster-directory.css';
const clusters = [
  ['Cleaning', 'cleaning-business', 'Quotes, contracts, job costs and recurring clients'],
  ['Landscaping', 'landscaping-business', 'Crew costs, routes and seasonal workload'],
  ['Mobile detailing', 'mobile-detailing-business', 'Packages, travel and route capacity'],
  ['Salon', 'salon-business', 'Services, repeat visits and stylist hours'],
  ['Restaurant', 'restaurant-business', 'Menu costs, channels and kitchen capacity'],
  ['Photography', 'photography-business', 'Assignments, editing and package contribution'],
  ['E-commerce', 'ecommerce-business', 'Orders, shipping, returns and inventory cash'],
  ['Agency', 'agency-business', 'Retainers, scope, team hours and client risk'],
];
export default function ClusterDirectory() {
  return <section className="cluster-directory" aria-labelledby="cluster-directory-title"><h2 id="cluster-directory-title">Choose your business</h2><p>Find guides and calculators for the decision you are working on.</p><nav aria-label="Business planning clusters">{clusters.map(([name, slug, description]) => <a key={slug} href={`/guides/${slug}/`}><strong>{name}</strong><span>{description}</span></a>)}</nav></section>;
}
