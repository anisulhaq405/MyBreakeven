import {authenticityReviewRecords} from './authenticityReviewData20261108.js';
export const authenticityReviewDate='2026-11-08';
export const authenticityReviewMap=Object.fromEntries(authenticityReviewRecords.map(p=>[p.slug,p]));
export const authenticityReviewSlugs=new Set(Object.keys(authenticityReviewMap));
export function applyAuthenticityReview(post){
 const review=authenticityReviewMap[post.slug];if(!review)return post;
 if(post.contentReview==='authenticity-20261108')return post;
 let html=post.html;
 for(const {from,to}of review.replacements){
  if(html.split(from).length!==2)throw Error(`Review replacement must match once: ${post.slug}: ${from}`);
  html=html.replace(from,to);
 }
 const lead=html.match(/^<p><strong>([\s\S]*?)<\/strong><\/p>/);
 if(!lead)throw Error('Missing reviewed opening: '+post.slug);
 html=html.slice(lead[0].length);
 const section='<h2 id="evidence-and-application">'+review.heading+'</h2>'+review.paragraphs.join('');
 if(!html.includes('<h2 id="worksheet">'))throw Error('Missing worksheet anchor '+post.slug);
 html=html.replace('<h2 id="worksheet">',section+'<h2 id="worksheet">');
 html=html.replaceAll(`/downloads/${post.slug}-worksheet.html`,`/downloads/${post.slug}-worksheet-reviewed-20261108.html`);
 html=html.replace(/Reviewed November [0-9]+, 2026/g,'Reviewed November 8, 2026');
 html=html.replace('Primary references below support the stated definitions or framework.','The references below support the stated definitions, educational mechanics or specifically identified framework.');
 html+='<p><strong>Source review: November 8, 2026.</strong> Official guidance, publisher explanations and software workflows have different scopes. The linked application section identifies their use. Numerical business cases remain original fictional teaching examples, not observed customer results or market benchmarks.</p>';
 const nav=post.sectionLinks.filter(([id])=>id!=='evidence-and-application');const at=nav.findIndex(([id])=>id==='worksheet');nav.splice(at,0,['evidence-and-application',review.heading]);
 return {...post,opening:lead[1].replace(/<[^>]+>/g,''),modified:authenticityReviewDate,contentReview:'authenticity-20261108',answerHtml:'<h2 id="verified-answer">Quick answer</h2><p>'+lead[1]+'</p><p><a href="#evidence-and-application">Read the source-backed application and limits</a>. Worked business amounts are fictional teaching examples.</p>',html,sectionLinks:nav,faq:[...post.faq,...review.faq]};
}
