import {financeTopics,linkedBlogSlugs} from './financeTopics.js';
import React from 'react';
import './cluster-related-reading.css';
import { blogListingData } from './blogListingData.js';
import { cleaningClusters } from './cleaningCluster.js';
import { landscapingClusters } from './landscapingCluster.js';
import { mobileDetailingClusters } from './mobileDetailingCluster.js';
import { salonClusters } from './salonCluster.js';
import { restaurantClusters } from './restaurantCluster.js';
import { photographyClusters } from './photographyCluster.js';
import { ecommerceClusters } from './ecommerceCluster.js';
import { agencyClusters } from './agencyCluster.js';
const groups = [...financeTopics, ...cleaningClusters, ...landscapingClusters, ...mobileDetailingClusters, ...salonClusters, ...restaurantClusters, ...photographyClusters, ...ecommerceClusters, ...agencyClusters];
export function relatedClusterPosts(article) {
  const group = groups.find(group => group.slugs.includes(article.slug));
  if (!group) return [];
  const existing = linkedBlogSlugs(String(article.html || '')+' '+String(article.answerHtml || ''));
  for(const section of article.sections || [])for(const [,href] of section.links || [])for(const slug of linkedBlogSlugs(`<a href="${href}">`))existing.add(slug);
  return group.slugs.filter(slug => slug !== article.slug && !existing.has(slug)).map(slug => blogListingData.posts.find(post => post.slug === slug)).filter(Boolean).slice(0, 2);
}
export default function ClusterRelatedReading({ article }) {
  const posts = relatedClusterPosts(article);
  if (!posts.length) return null;
  return <aside className="cluster-related-reading" aria-label="Related planning decisions"><h2>Related planning decisions</h2><ul>{posts.map(post => <li key={post.slug}><a href={`/blogs/${post.slug}/`}>{post.title}</a><p>{post.description}</p></li>)}</ul></aside>;
}
