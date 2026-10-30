import {describe,it,expect} from 'vitest';
import {financeTopics} from './financeTopics.js';
import {blogPostMap,blogPosts} from './content/blogs/index.js';
import {freeTools} from './freeTools.js';

// October 26 GSC Coverage: 45 discovered URLs; protect existing inventory.
describe('GSC discovered URL contextual recovery without new public pages',()=>{
 it('keeps blog publication count and unique topic identifiers stable',()=>{
  expect(blogPosts).toHaveLength(162);
  const ids=financeTopics.map(t=>t.id);
  expect(new Set(ids).size).toBe(ids.length);
 });
 it('routes every contextual blog or calculator link to an existing owner',()=>{
  for(const topic of financeTopics){
   for(const slug of topic.slugs||[])expect(blogPostMap[slug],topic.id+':'+slug).toBeDefined();
   for(const [,href]of topic.links||[]){
    if(href.startsWith('/calculators/')){
      const slug=href.split('/')[2];
      expect(freeTools[slug],href).toBeDefined();
    }
    if(href.startsWith('/blogs/')){
      const slug=href.split('/')[2];
      expect(blogPostMap[slug],href).toBeDefined();
    }
   }
  }
 });
 it('adds genuine pre-existing calculator discovery in relevant existing topics',()=>{
  const links=financeTopics.flatMap(t=>t.links||[]).map(x=>x[1]);
  for(const slug of ['discount-break-even-calculator','price-increase-calculator','cash-runway-calculator','food-cost-calculator','menu-pricing-calculator','recipe-cost-calculator','ecommerce-return-cost-calculator','salon-rebooking-calculator','salon-no-show-profit-loss-calculator']){
   expect(links).toContain('/calculators/'+slug+'/');
  }
 });
});
