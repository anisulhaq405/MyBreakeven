import {keywordContentReviewData} from './keywordContentReviewData.js';
export const keywordContentReviews = Object.freeze(Object.fromEntries(keywordContentReviewData.map(item=>[item.slug,item])));
const escape = value => String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
export function applyKeywordContentReview(post) {
  const review = keywordContentReviews[post.slug];
  if (!review) return post;
  const links = review.links.map(([label,href])=>'<a href="'+escape(href)+'">'+escape(label)+'</a>').join(' · ');
  const newAnswer = '<h2 id="answer-'+review.id+'">'+escape(review.heading)+'</h2><p>'+escape(review.answer)+'</p><p><a href="#'+review.id+'">Read the worked decision and its assumptions</a>.</p>';
  const answerHtml = post.answerHtml ? post.answerHtml+'<p><a href="#'+review.id+'">'+escape(review.heading)+'</a>.</p>' : newAnswer;
  if (!post.html) return {...post, modified:'2026-10-22', answerHtml, sections:[...post.sections, {id:review.id, heading:review.heading, paragraphs:review.paragraphs, links:[...review.links, ...(review.source ? [['Method reference reviewed October 22, 2026',review.source]]:[])]}]};
  if (post.html.includes('id="'+review.id+'"')) throw new Error('Duplicate keyword review: '+post.slug);
  const section = '<section aria-labelledby="'+review.id+'"><h2 id="'+review.id+'">'+escape(review.heading)+'</h2>'+review.paragraphs.map(p=>'<p>'+escape(p)+'</p>').join('')+(links?'<p>'+links+'</p>':'')+(review.source?'<p><a href="'+escape(review.source)+'">Method reference</a>, reviewed October 22, 2026. The worked figures in this section are separate fictional assumptions.</p>':'')+'</section>';
  const at = post.html.search(/<h2[^>]*>(?:How to run your own numbers|Enter the base visit in the calculator|FAQs|Closing takeaways|Takeaways)<\/h2>/i);
  const html = at < 0 ? post.html+section : post.html.slice(0,at)+section+post.html.slice(at);
  return {...post, html, answerHtml, modified:'2026-10-22'};
}
