import{beforeGscBlogPosts as current}from'../content/blogs/index.js';
import{beforePendingTools as all}from'../freeTools.js';
const added=new Set(['capacity-planning','business-continuity-plan','gross-pay-vs-net-pay','small-business-hr','product-lifecycle-management']);
export const blogPosts=current.filter(p=>!added.has(p.slug));
export const blogPostMap=Object.fromEntries(blogPosts.map(p=>[p.slug,p]));
export const freeTools=Object.fromEntries(Object.entries(all).filter(([s])=>!['prorated-rent-calculator','debt-to-income-calculator'].includes(s)));
