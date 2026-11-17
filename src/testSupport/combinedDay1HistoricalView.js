// Historical Day7 contract: omit only the six subsequently authorized owners.
import{blogPosts as current}from'../content/blogs/index.js';
import{combinedDay1Posts}from'../content/blogs/combinedDay1.js';
const added=new Set(combinedDay1Posts.map(p=>p.slug));
export const blogPosts=current.filter(p=>!added.has(p.slug));
export const blogPostMap=Object.fromEntries(blogPosts.map(p=>[p.slug,p]));
export * from '../content/blogs/index.js';
