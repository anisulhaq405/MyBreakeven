// Responsive editorial covers for the Day 3 release.
import { featureDeliveryAssets } from './featureDeliveryAssets.js';
const optimized = new Set([
  'operating-expenses-day4.webp', 'operating-margin-day4.webp',
  'recipe-cost-calculator','food-cost-calculator','menu-pricing-calculator','employee-cost-calculator','cash-flow-forecast-template',
  'how-to-calculate-cost-of-goods-sold','how-to-calculate-working-capital','how-to-calculate-days-sales-outstanding',
].map(slug=>`${slug}-feature-20261013.webp`));
// Keep the new industry covers responsive in both directory cards and page features.
for (const key of ['cleaning','landscaping','photography','agency','detailing','ecommerce','restaurant','salon']) {
  optimized.add(`${key}-break-even-feature-20261016.webp`);
}
optimized.add('contribution-margin-income-statement-editorial-20261020.webp');
optimized.add('high-low-method-editorial-20261020.webp');
for(const slug of ['master-budget','cost-drivers-small-business','job-order-costing']) optimized.add(`${slug}-editorial-20261021.webp`);
optimized.add('flexible-budget-variance-analysis-editorial-20261020.webp');
optimized.add('make-or-buy-decision-editorial-20261020.webp');
optimized.add('restaurant-budgeting-editorial.webp');
optimized.add('startup-cost-cash-bridge-20261025.webp');
optimized.add('business-startup-cost-editorial-20261025.webp');
optimized.add('net-cash-flow-day5.webp');
optimized.add('net-cash-flow-editorial-20261024.webp');
optimized.add('operating-margin-editorial-20261024.webp');
optimized.add('operating-expenses-editorial-20261024.webp');
optimized.add('rolling-forecast-cover.webp');
optimized.add('rolling-forecast-planning-20261023.webp');
optimized.add('business-roi-calculator-editorial.webp');
optimized.add('restaurant-cash-flow-forecast-editorial.webp');
for(const slug of ['cash-flow-statement','operating-cash-flow','cash-flow-problems']) optimized.add(`${slug}-editorial-20261025.webp`);
for (const image of Object.values(featureDeliveryAssets)) optimized.add(image.split('/').pop());
export function responsiveFeatureProps(image, card=false){
  if(!optimized.has(image?.split('?')[0].split('/').pop()))return {};
  const cardCandidate = card && /\/tools\/\w+-break-even-feature-20261016\.webp$/.test(image)
    ? `${image.replace('.webp','-400.webp')} 400w, ` : '';
  return {
    srcSet:`${cardCandidate}${image.replace('.webp','-800.webp')} 800w, ${image} 1200w`,
    sizes:card?'(max-width: 600px) calc(100vw - 40px), (max-width: 1000px) calc((100vw - 80px) / 2), 380px':'(max-width: 880px) calc(100vw - 48px), 820px',
  };
}
