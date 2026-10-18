// Topic-specific covers replace reused imagery; publication dates stay unchanged.
const descriptions={
 'how-to-calculate-days-sales-outstanding':'Unpaid invoice papers, a payment calendar and calculator on a business desk',
 'cash-flow-break-even-vs-profit-break-even':'Sales records beside a nearly empty cash box and a payment calendar',
 'how-to-calculate-cost-of-goods-sold':'Product inventory and a sold item being packed beside a cost ledger',
 'how-to-calculate-working-capital':'Cash, customer invoices, product stock and supplier bills arranged for a short-term funding review',
 'cafe-opening-costs':'Cafe espresso equipment and startup supplies beside an opening checklist and calculator',
};
export function refreshFeatureImage(post){
 if(post.slug==='retail-break-even-analysis')return {...post,alt:'Interior of a homewares shop with ceramic tableware and stocked display shelves.'};
 const alt=descriptions[post.slug];
 return alt?{...post,image:`/images/blog/${post.slug}-feature-20261013.webp`,alt,imageCaption:'Illustrative editorial scene for this guide; use your own business records.',modified:'2026-10-13'}:post;
}
