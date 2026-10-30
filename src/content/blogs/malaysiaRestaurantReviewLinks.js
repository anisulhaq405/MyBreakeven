const reviewPath='/blogs/restaurant-break-even-calculator-malaysia-user-review/';
const inbound=new Set(['restaurant-break-even','restaurant-covers-per-night-break-even','restaurant-budgeting','restaurant-food-cost-percentage']);
export function connectMalaysiaRestaurantReview(post){
 if(!inbound.has(post.slug))return post;
 const text='<aside aria-label="Real restaurant owner testing" class="article-related"><h2>Restaurant-owner experience: Malaysia 2026 case study</h2><p>Five restaurant owners reported comparing manual calculations with MyBreakEven. Read the <a href="'+reviewPath+'">Malaysia restaurant break-even calculator before-and-after review</a>, including the 87.5% reported time reduction, methodology and limitations.</p></aside>';
 return {...post,html:(post.html||'')+text};
}
