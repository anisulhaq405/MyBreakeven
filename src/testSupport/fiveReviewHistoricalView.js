import {blogPosts as current} from '../content/blogs/index.js';
import {restoreFiveReview} from '../content/blogs/fiveReview.js';
export const blogPosts=current.map(restoreFiveReview);
export const blogPostMap=Object.fromEntries(blogPosts.map(p=>[p.slug,p]));
