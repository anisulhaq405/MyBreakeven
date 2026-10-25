import {gscOctober25QueryUpdates}from'./gscOctober25QueryUpdates.js';
export function applyGscOctober25QueryReview(post){
 const update=gscOctober25QueryUpdates[post.slug];if(!update||(post.html||post.queryReviewHtml||'').includes(`id="${update.id}"`))return post;
 if(!post.html)return{...post,modified:'2026-10-25',queryReviewHtml:update.html};
 const marker=/<h2\b[^>]*>\s*(?:FAQs?|Frequently asked questions)\b[^<]*<\/h2>/i;
 let html=marker.test(post.html)?post.html.replace(marker,m=>update.html+m):post.html+update.html;
 if(update.faqExtra){const start=html.search(marker);if(start>=0){const after=html.indexOf('</h2>',start)+5;const next=html.indexOf('<h2',after);const end=next<0?html.length:next;html=html.slice(0,end)+`<h3>${update.faqExtra.q}</h3><p>${update.faqExtra.a}</p>`+html.slice(end);}}
 return{...post,...(update.articleTitle?{title:update.articleTitle,seoTitle:update.seoTitle,description:update.description,metaDescription:update.description}:{}),modified:'2026-10-25',html,...(post.sectionLinks?{sectionLinks:[...post.sectionLinks,[update.id,update.title]]}:{})};
}
