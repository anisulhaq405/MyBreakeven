import {describe,it,expect} from 'vitest';
import {blogPostMap,blogPosts} from './content/blogs/index.js';
import {applyRestaurantBudgetSerpScopeReview} from './content/blogs/restaurantBudgetSerpScopeReview.js';
describe('Restaurant budgeting SERP scope / 15-day freeze',()=>{
 it('clarifies the single-month download versus annual illustration and cash dates',()=>{
   const a=blogPostMap['restaurant-budgeting'];expect(a.modified).toBe('2026-10-30');
   expect(a.html).toContain('Choose the restaurant budgeting resource for your task');
   expect(a.html).toContain('One monthly budget versus actual');
   expect(a.html).toContain('/downloads/restaurant-12-month-budget-template.xlsx');
   expect(a.html).not.toContain('not a separate editable 12-month file');
   expect(a.html).toContain('Download editable 12-month Excel workbook');
   expect(a.html).toContain('/downloads/restaurant-monthly-budget-template.xlsx');
   expect(a.html).toContain('href="#annual-restaurant-budget"');
   expect(a.html).toContain('/calculators/cash-flow-forecast-template/');
   expect(a.html).toContain('restaurant-budget-diagnosis');
   expect(()=>applyRestaurantBudgetSerpScopeReview(a)).toThrow(/already present/);
 });
 it('preserves existing blog inventory',()=>expect(blogPosts).toHaveLength(162));
});