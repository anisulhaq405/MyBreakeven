import {describe,it,expect} from 'vitest';
import {blogPostMap} from './content/blogs/index.js';
import {applyRestaurantFoodCostGscRecovery} from './content/blogs/restaurantFoodCostGscRecovery.js';

describe('October 26 restaurant food-cost GSC recovery',()=>{
  const slug='restaurant-food-cost-percentage';
  it('keeps existing canonical page, original FAQ, original examples and cover',()=>{
    const post=blogPostMap[slug];
    expect(post.slug).toBe(slug);
    expect(post.title).toBe('How to Calculate Restaurant Food Cost Percentage');
    expect(post.html).toContain('id="food-cost-comparison-heading"');
    expect(post.html).toContain('id="food-cost-inventory-method"');
    expect(post.html).toContain('33.33%');
    expect(post.html).toContain('30.33%');
    expect(post.html).toContain('$1,800');
    expect(post.html).toContain('/calculators/food-cost-calculator/');
    expect(post.html).toContain('/calculators/recipe-cost-calculator/');
    expect(post.faq.length).toBeGreaterThanOrEqual(4);
    expect(post.image).toContain('restaurant-food-cost-percentage');
    expect(post.metaDescription.length).toBeLessThanOrEqual(160);
    expect(post.metaDescription.length).toBeGreaterThanOrEqual(120);
    expect(post.modified).toBe('2026-10-27');
    expect(post.html).toContain('id="food-cost-reconciliation-heading"');
    expect(post.html).toContain('Reconcile the food-cost variance');
    expect(post.html).toContain('/blogs/restaurant-prime-cost/');
    expect(post.html).toContain('/blogs/restaurant-budgeting/');
    expect([...post.html.matchAll(/id="food-cost-reconciliation-heading"/g)]).toHaveLength(1);
    expect([...post.html.matchAll(/id="food-cost-comparison-heading"/g)]).toHaveLength(1);
    expect((20000/60000*100).toFixed(2)).toBe('33.33');
    expect((18200/60000*100).toFixed(2)).toBe('30.33');
    expect(20000-18200).toBe(1800);
  });
  it('does not touch unrelated articles or duplicate the recovery section',()=>{
    const nonTarget={slug:'restaurant-prime-cost',html:'<p>existing</p>'};
    expect(applyRestaurantFoodCostGscRecovery(nonTarget)).toBe(nonTarget);
    expect(()=>applyRestaurantFoodCostGscRecovery(blogPostMap[slug])).toThrow(/Duplicate GSC recovery insertion/);
  });
});
