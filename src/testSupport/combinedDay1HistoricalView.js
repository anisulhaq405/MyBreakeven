import{combinedDay3Posts}from'../content/blogs/combinedDay3.js';
import {restoreFiveReview} from '../content/blogs/fiveReview.js';
import{combinedDay2Posts}from'../content/blogs/combinedDay2.js';
// Historical Day7 contract: omit only the six subsequently authorized owners.
import{beforeGscBlogPosts as current}from'../content/blogs/index.js';
import{combinedDay1Posts}from'../content/blogs/combinedDay1.js';
const added=new Set([...combinedDay3Posts,...combinedDay1Posts,...combinedDay2Posts].map(p=>p.slug));
export const blogPosts=current.map(restoreFiveReview).filter(p=>!added.has(p.slug));
export const blogPostMap=Object.fromEntries(blogPosts.map(p=>[p.slug,p]));
export * from '../content/blogs/index.js';
