const ecommerceGuide = '/blogs/ecommerce-profit-margin/';
const related = [
  ['Calculate the expected cost of product returns','/calculators/ecommerce-return-cost-calculator/'],
  ['Turn order contribution into a monthly sales target','/calculators/ecommerce-break-even-calculator/'],
  ['Build an ecommerce business plan','/guides/ecommerce-business/'],
];

export const marketplaceTools = {
  'etsy-fee-calculator': {
    mode:'marketplace', marketplace:'etsy', category:'Marketplace fees', reviewed:'2026-11-28',
    name:'Etsy Fee & Profit Calculator',
    title:'Etsy Fee Calculator: Seller Profit & Break-Even Price',
    description:'Calculate US Etsy listing, transaction, payment and Offsite Ads fees. Estimate profit per sale, shipping costs and the price you need to break even.',
    intro:'Enter a US Etsy order to see what listing fees, payment processing, shipping and Offsite Ads leave you. Calculate the item price you need to break even or earn a target contribution.',
    image:'/images/tools/ecommerce-return-cost-calculator.webp',
    alt:'Product packaging and a shipping parcel at an ecommerce workbench',
    theme:{'--tool-accent':'#9a3412','--tool-dark':'#431407','--tool-soft':'#fff4eb'},
    guide:ecommerceGuide, guideLabel:'Calculate ecommerce profit margins after fees',
    features:['US Etsy Payments fee breakdown with separate sales tax treatment','12% or 15% attributed Offsite Ads with the $100 order cap','Shipping revenue and actual postage entered separately','Break-even and target item prices, with an ad-free comparison'],
    sections:[
      {id:'marketplace-formula',title:'How Etsy seller fees are calculated',paragraphs:[
        'Start with the item price after seller discounts, then add what you charge for shipping and any gift wrapping. For this US example, Etsy calculates the 6.5% transaction fee on that amount. Etsy Payments charges 3% plus $0.25 on the modeled checkout total, including applicable sales tax. Buyer tax is kept out of your revenue.',
        'Allocate $0.20 per listing charge. A new listing or renewal can incur a charge independently of a sale. If unsold listings or renewals are material, spread those related costs across expected sales instead of treating every order as a single charge.',
        'On an attributed Offsite Ads order, choose the rate Etsy applies to your shop. The modeled fee is 12% or 15% of seller revenue, limited to $100 per order. The calculator compares the same order with and without attribution so you can see what the ad costs.',
      ]},
      {id:'marketplace-example',title:'Worked example: a $40 Etsy order with paid shipping',table:{
        caption:'Fictional US order at 8% effective sales tax and 15% attributed Offsite Ads',
        headers:['Order line','Calculation','Amount'],
        rows:[
          ['Seller revenue','$40 item + $5 shipping','$45.00'],
          ['Buyer checkout','$45 + $3.60 tax','$48.60'],
          ['Listing charge','1 × $0.20','$0.20'],
          ['Transaction fee','$45 × 6.5%','$2.93'],
          ['Payment processing','$48.60 × 3% + $0.25','$1.71'],
          ['Offsite Ads','$45 × 15%','$6.75'],
          ['Seller costs','$12 item + $6 postage + $2 supplies + $1 allowance','$21.00'],
          ['Contribution','$45 less modeled fees and costs','$12.42'],
        ],
      },after:['Before Offsite Ads, the same order leaves $19.17. For a $20 contribution with the ad assumption unchanged, raise the item price to at least $50.08 in this model. The calculation retains fee precision before displaying cents, so the independently rounded table entries can differ from the total by a cent.']},
      {id:'marketplace-pricing',title:'Price a handmade item when shipping or advertising changes',steps:[
        'Audit two recent payment-account orders. Compare your buyer shipping charge with the actual label and check which sale was attributed to Offsite Ads.',
        'Enter materials and paid making time in landed item cost. Enter packaging, postage and expected unrecovered returns once each.',
        'Test a buyer-paid shipping order and a free shipping offer. With free shipping, set the buyer charge to zero and leave the postage you pay in costs.',
        'Compare attributed and unattributed contribution. Use your actual expected order mix to decide whether the price can fund monthly overhead.',
      ]},
      {id:'marketplace-reconcile',title:'Reconcile Etsy proceeds before changing your prices',paragraphs:[
        'Match a single order to the listing, transaction, payment and Offsite Ads entries on its statement. Deposit timing, subscription charges, Etsy Ads spend and other account-level adjustments belong in the monthly plan.',
        'If an order is refunded, check which fees were credited and how much stock was recovered. Use the unrecovered amount to estimate the average loss per completed sale. Keep that estimate separate from the order subtotal.',
      ]},
    ],
    assumptions:'One domestic US Etsy item with USD settlement and Etsy Payments. Use the effective tax on item plus buyer-paid shipping, keeping the same effective rate in price scenarios. The model excludes currency conversion, taxes on fees, Etsy Ads campaign spend, refunds and separate account adjustments unless you enter an appropriate cost allowance. Contribution is before overhead and income tax.',
    faq:[
      ['How much does Etsy take from a $40 sale?','With $5 buyer-paid shipping and 8% effective sales tax, this example has $4.83 in modeled fees before Offsite Ads. An attributed 15% ad adds $6.75. Shipping and sales tax can change the fee bases.'],
      ['Does Etsy charge fees on shipping?','For this US model, shipping charged to the buyer enters the transaction, payments and applicable Offsite Ads fee bases. Your actual postage is a separate seller cost.'],
      ['What is the Etsy Offsite Ads cap?','The modeled fee is capped at $100 per attributed order. Select the 12% or 15% rate shown by Etsy for your shop. Use zero for an unattributed order.'],
      ['Can I use the break-even price as my final listing price?','It covers the entered fees and direct costs. Add a target contribution to fund overhead and owner pay, then compare the result with actual statement fees and buyer demand.'],
    ],
    sources:[
      ['Etsy Fees & Payments Policy','https://www.etsy.com/legal/fees/'],
      ['Etsy Payments processing fees by country','https://help.etsy.com/hc/en-us/articles/115015628847-What-are-Payment-Processing-Fees-for-Selling-on-Etsy'],
      ['Etsy Offsite Ads help','https://help.etsy.com/hc/en-us/articles/360000338367-How-Etsy-s-Offsite-Ads-Work'],
    ],
    related:[['Compare selling on eBay','/calculators/ebay-fee-calculator/'],...related],
  },
  'ebay-fee-calculator': {
    mode:'marketplace', marketplace:'ebay', category:'Marketplace fees', reviewed:'2026-11-28',
    name:'eBay Fee & Profit Calculator',
    title:'eBay Fee Calculator: Final Value Fees & Seller Profit',
    description:'Estimate US eBay final value fees, per-order charges and promoted listing fees. Calculate seller profit and the minimum item price after shipping and costs.',
    intro:'See what a domestic US eBay sale leaves after final value fees, the per-order charge, attributed advertising, shipping and product costs. Use a supported category or enter a verified flat percentage.',
    image:'/images/tools/ecommerce-break-even-feature-20261016.webp',
    alt:'Ecommerce seller workspace with parcels and order-planning materials',
    theme:{'--tool-accent':'#1d4ed8','--tool-dark':'#172554','--tool-soft':'#eef4ff'},
    guide:ecommerceGuide, guideLabel:'Calculate ecommerce profit margins after fees',
    features:['Selected US basic category schedules and a verified custom flat-rate mode','$0.30 or $0.40 order charge based on checkout total','Itemized final value, insertion and attributed General campaign fees','Break-even and target item prices that account for the per-order fee cutoff'],
    sections:[
      {id:'marketplace-formula',title:'How eBay final value fees are calculated',paragraphs:[
        'For the supported basic schedules, the percentage applies to the item price, modeled buyer shipping and sales tax. Apply the selected category rate to the first $7,500 per item, then 2.35% to the portion above it. The custom option uses a single flat rate and does not apply a tier.',
        'The model adds $0.30 per order at a checkout total of $10 or less and $0.40 above $10. Sales tax can move a sale above that cutoff even if the item price alone stays below it. Seller revenue excludes buyer tax.',
        'Add actual insertion fees or listing upgrades you want the sale to recover. For an attributed General campaign sale, enter the percentage charged for that listing. The calculator applies it to the modeled checkout total. Check your advertising report for the actual attribution.',
      ]},
      {id:'marketplace-example',title:'Worked example: selling a $100 item on eBay',table:{
        caption:'Fictional sale in a supported 13.6% basic category with an attributed 4% ad',
        headers:['Order line','Calculation','Amount'],
        rows:[
          ['Seller revenue','$100 item + $8 buyer-paid shipping','$108.00'],
          ['Buyer checkout','$108 + 6% tax','$114.48'],
          ['Final value percentage','$114.48 × 13.6%','$15.57'],
          ['Per-order fee','Checkout exceeds $10','$0.40'],
          ['Attributed ad','$114.48 × 4%','$4.58'],
          ['Seller costs','$48 item + $10 postage + $2 supplies + $3 allowance','$63.00'],
          ['Contribution','$108 less modeled fees and costs','$24.45'],
        ],
      },after:['With the same price and no attributed ad fee, contribution rises to $29.03. To model $25 contribution with the 4% ad still attributed, the item price must reach $100.68. Keep the shipping assumption and tax treatment consistent before comparing prices.']},
      {id:'marketplace-thresholds',title:'What changes near the $10 and $7,500 thresholds?',paragraphs:[
        'At $9.50 plus 6% tax and no shipping, the checkout total is $10.07. The order therefore uses the $0.40 charge. A small price increase at the threshold can reduce what you keep temporarily, because the fixed charge jumps by $0.10. The target-price calculation checks both sides.',
        'On the 13.6% schedule, an $8,000 fee base uses 13.6% on the first $7,500 and 2.35% on the remaining $500. That gives $1,031.75 in percentage fees before the order fee. Applying 13.6% to all $8,000 would overstate the modeled fee.',
      ]},
      {id:'marketplace-reconcile',title:'Check the actual category and order before choosing a price',steps:[
        'Find the category in the listing and verify whether your Store subscription changes its rate. Choose only a supported preset or a confirmed single flat-rate schedule.',
        'Use the shipping amount eBay uses in the fee base. Expedited and international options can have exceptions. If your order needs separate fee bases, use the eBay statement instead of this model.',
        'Compare your fee statement, ad attribution and net order proceeds. Treat monthly Store cost, fee credits and multi-item checkouts as separate reconciliation items.',
      ]},
    ],
    assumptions:'One item and one order on eBay US, USD and standard domestic shipping. Rates cover the selected basic category schedules only. The model excludes Store-specific tiered rates, special categories, international fees, account surcharges, multi-item checkouts and exact refund credits. Contribution is before overhead and income tax.',
    faq:[
      ['How much does eBay take from a $100 sale?','The worked example uses $8 buyer-paid shipping, 6% tax, a 13.6% category fee and an attributed 4% ad. The modeled eBay fees are $20.55 before seller costs. Changing category, shipping, tax or advertising changes the answer.'],
      ['Does eBay charge final value fees on sales tax?','The US basic fee schedule uses a total sale amount including applicable sales tax and other covered amounts. The tax is excluded from seller revenue in the profit calculation.'],
      ['Is the eBay order fee $0.30 or $0.40?','Under the modeled basic schedule it is $0.30 at a total sale amount of $10 or less and $0.40 above $10. Some special category rules differ.'],
      ['Can I use this for my eBay Store rate?','Use the custom percentage only if the official schedule you verified is a single flat percentage and the rest of the modeled charges apply. Store tiers with different thresholds require a separate reconciliation.'],
    ],
    sources:[
      ['eBay US selling fees and category schedules','https://www.ebay.com/help/selling/fees-credits-invoices/selling-fees?id=4822'],
      ['eBay Store selling fees','https://www.ebay.com/help/selling/fees-credits-invoices/store-selling-fees?id=4122'],
      ['eBay Promoted Listings General campaign rates','https://ocsnext.ebay.com/help/selling/listings/listing-tips/promoted-listings?id=4164'],
    ],
    related:[['Compare selling on Etsy','/calculators/etsy-fee-calculator/'],...related],
  },
};
