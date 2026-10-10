import { describe, expect, it } from 'vitest';
import Decimal from 'decimal.js';
import { blogPosts } from './content/blogs/index.js';
import { relatedClusterPosts } from './ClusterRelatedReading.jsx';
describe('published content readability and planning boundaries', () => {
  it('does not render corrupted inline math or draft placeholders', () => {
    for (const article of blogPosts) {
      expect(article.html || '', article.slug).not.toMatch(/class="math inline"|\[link:|TARGET KEYWORD:/);
    }
  });
  it('rounds the membership minimum upward so the contribution goal is met', () => {
    const needed = new Decimal(42).plus(45).div('0.97').toDecimalPlaces(2, Decimal.ROUND_CEIL);
    expect(needed.toFixed(2)).toBe('89.70');
    expect(needed.mul('0.97').minus(42).gte(45)).toBe(true);
    expect(new Decimal('89.69').mul('0.97').minus(42).lt(45)).toBe(true);
    expect(blogPosts.find(p => p.slug === 'salon-membership-pricing').html).toContain('$89.70');
  });
  it('adds only existing same-decision sibling guides without self-links or duplicates', () => {
    const links = relatedClusterPosts({ slug:'agency-retainer-pricing', html:'<a href="/blogs/agency-client-profitability/">Account</a>' });
    expect(links.map(p => p.slug)).toEqual(['agency-project-vs-retainer-profitability']);
    expect(relatedClusterPosts({slug:'unmapped-guide'})).toEqual([]);
  });
});
