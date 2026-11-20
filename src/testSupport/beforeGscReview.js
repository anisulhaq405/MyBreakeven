import {beforeGscBlogPosts} from '../content/blogs/index.js';
export const blogPosts=beforeGscBlogPosts;
export const blogPostMap=Object.fromEntries(blogPosts.map(p=>[p.slug,p]));
export * from '../content/blogs/index.js';
