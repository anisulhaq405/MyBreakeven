// Preserve the authorized Day1 registry boundary; current full preservation is separately tested.
import{blogPosts as current}from'../content/blogs/index.js';
import{combinedDay2Posts}from'../content/blogs/combinedDay2.js';
const added=new Set(combinedDay2Posts.map(p=>p.slug));
export const blogPosts=current.filter(p=>!added.has(p.slug));
export const blogPostMap=Object.fromEntries(blogPosts.map(p=>[p.slug,p]));
export * from '../content/blogs/index.js';
