const optimized = new Set([
  'recipe-cost-calculator','food-cost-calculator','menu-pricing-calculator','employee-cost-calculator','cash-flow-forecast-template',
  'how-to-calculate-cost-of-goods-sold','how-to-calculate-working-capital','how-to-calculate-days-sales-outstanding',
].map(slug=>`${slug}-feature-20261013.webp`));
export function responsiveFeatureProps(image, card=false){
  if(!optimized.has(image?.split('/').pop()))return {};
  return {
    srcSet:`${image.replace('.webp','-800.webp')} 800w, ${image} 1200w`,
    sizes:card?'(max-width: 600px) calc(100vw - 40px), (max-width: 1000px) calc((100vw - 80px) / 2), 380px':'(max-width: 880px) calc(100vw - 48px), 820px',
  };
}
