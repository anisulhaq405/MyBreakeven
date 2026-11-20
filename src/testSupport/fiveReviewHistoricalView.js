import {beforeGscBlogPosts as current} from '../content/blogs/index.js';
import {restoreFiveReview} from '../content/blogs/fiveReview.js';
export const blogPosts=current.filter(p=>!['capacity-planning','business-continuity-plan','gross-pay-vs-net-pay','small-business-hr','product-lifecycle-management'].includes(p.slug)).map(restoreFiveReview);
export const blogPostMap=Object.fromEntries(blogPosts.map(p=>[p.slug,p]));
