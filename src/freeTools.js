import { businessTools } from './businessTools.js';
import { toolThemes } from './toolThemes.js';
import { freeToolGuides } from './freeToolGuides.js';
const pricingTools = {
  'discount-break-even-calculator': {
    ...freeToolGuides['discount-break-even-calculator'],mode:'discount',name:'Discount Break-Even Calculator',title:'Discount Break-Even Calculator | MyBreakeven',
    description:'Calculate extra sales needed to recover a discount after variable costs and payment fees. Compare your sales estimate with whole-unit monthly capacity.',
    intro:'See how many extra sales a discount needs to earn back the contribution you give away. Test your expected sales lift before running the offer.',
    guide:'/blogs/discount-break-even-sales-volume/',guideLabel:'Discount break-even worked examples',
    defaults:{price:100,cost:60,fee:3,volume:100,change:10,expected:20,capacity:150},
  },
  'price-increase-calculator': {
    ...freeToolGuides['price-increase-calculator'],mode:'increase',name:'Price Increase Calculator',title:'Price Increase Calculator: Customer Loss | MyBreakeven',
    description:'Calculate customer loss a price increase can absorb after costs and fees. Compare revenue, contribution, revised costs and required monthly sales.',
    intro:'Find how many sales you can lose after a price increase while preserving contribution. Test customer response and changing delivery costs together.',
    guide:'/blogs/how-many-customers-can-you-lose-after-raising-prices/',guideLabel:'Price increase and customer-loss worked examples',
    defaults:{price:100,cost:60,newCost:'',fee:3,volume:100,change:10,expected:10,capacity:150},
  },
};

export const freeTools = Object.fromEntries(Object.entries({...pricingTools,...businessTools}).map(([slug,tool])=>[slug,{...tool,theme:toolThemes[slug],category:tool.category || "Pricing & contribution"}]));
