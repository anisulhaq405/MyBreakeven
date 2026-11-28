export const sellerAssetUpdated = '2026-11-28';

const common = {reviewed:sellerAssetUpdated, theme:{'--tool-accent':'#24556f','--tool-dark':'#153749','--tool-soft':'#eff7fb'}};
export const sellerAssetTools = {
  'paypal-fee-calculator': {
    ...common, mode:'paypalFee', category:'Payment processing',
    name:'PayPal Merchant Fee Calculator', title:'PayPal Fee Calculator: US Merchant Fees & Reverse Pricing',
    description:'Estimate US PayPal merchant fees, seller net proceeds and the minimum charge to reach a target net. Compare supported PayPal rates or use custom pricing.',
    intro:'Estimate how much you keep from a US PayPal merchant payment or work backward from the amount you want to receive.',
    image:'/images/tools/ecommerce-break-even-feature-20261016.webp', alt:'Seller workspace with a calculator, laptop and packed orders',
    guide:'/blogs/ecommerce-profit-margin/', guideLabel:'Calculate ecommerce profit after order costs',
    features:['US domestic USD payment presets','Editable custom rate and fixed fee','Forward fee estimates and reverse charge calculation'],
    sections:[
      {id:'fee-method', title:'How PayPal fees affect seller proceeds', paragraphs:[
        'Transaction fee is the gross USD payment multiplied by the selected percentage plus the fixed fee. We round the total fee to cents and subtract it from the gross payment. Use the total amount PayPal processes, including any shipping or taxes included in the customer payment.',
        'At a custom 3% plus $0.30, a $100 payment has a $3.30 estimated fee and leaves $96.70. Reverse mode checks the cent-denominated result against that same forward formula.',
        'The preset table was checked on November 28, 2026. Select the named product only when it matches how you receive the payment. For other products or contracted pricing, enter your verified rate under Custom.',
      ]},
    ],
    assumptions:'US domestic merchant payments received in USD. Estimates follow the displayed rates and rounding model. Account-specific pricing, FX, international add-ons, disputes, refunds, transfers and payout fees are outside these presets.',
    faq:[
      ['What amount do I enter?','Enter the gross amount processed by PayPal, or switch to target net to calculate the minimum gross charge under the selected fee model.'],
      ['Why can the estimated fee differ from my statement?','The product, account terms, currency and additional charges can affect the final fee. Compare the selected rate and fee basis with your PayPal statement.'],
      ['What is the difference between PayPal Checkout and Send/Receive Money for Goods and Services?','PayPal lists them as separate domestic commercial transaction types. Choose the exact type used for the payment.'],
    ],
    sources:[['PayPal US merchant fee schedule','https://www.paypal.com/us/business/paypal-business-fees']],
  },
  'business-depreciation-calculator': {
    ...common, mode:'businessDepreciation', category:'Business accounting',
    name:'Business Depreciation Calculator', title:'Business Depreciation Calculator: Annual Book Value Schedule',
    description:'Calculate annual book depreciation, accumulated depreciation and closing book value with straight-line or double-declining balance. Download the Excel schedule.',
    intro:'Enter a business asset’s cost, residual value and useful life to build a full-year depreciation schedule.',
    image:'/images/tools/business-roi-calculator-editorial.webp', alt:'Business planning desk with a calculator and financial records',
    guide:'/blogs/depreciation-methods/', guideLabel:'Compare book depreciation methods',
    related:[['Work through the straight-line method','/blogs/straight-line-depreciation/'],['Reconcile accumulated depreciation','/blogs/accumulated-depreciation/']],
    features:['Straight-line and double-declining balance','Annual opening, expense, accumulated depreciation and closing balances','Editable Excel schedule using the same calculation'],
    sections:[
      {id:'depreciation-method', title:'How the annual book schedule works', paragraphs:[
        'Straight-line divides cost less residual by useful life. Double-declining applies twice the straight-line rate to each year’s opening book value. Both methods cap expense at the amount above residual and round the expense to cents.',
        'In the last year this schedule allocates the remaining amount above residual. It does not automatically switch methods in earlier years. For a $12,000 asset with $2,000 residual and five years of life, straight-line gives $2,000 each year and finishes at $2,000.',
      ]},
    ],
    assumptions:'Illustrative full-year book depreciation for one business asset. Partial-year conventions, tax recovery schedules, impairment, disposals and changes in estimates require separate treatment.',
    faq:[
      ['How is accumulated depreciation calculated?','Add each year’s depreciation through the end of the selected year. It also equals starting asset cost minus closing book value.'],
      ['Can book value fall below the residual value?','This schedule limits depreciation to the amount above residual. The final year brings closing book value to the entered residual.'],
      ['Does the calculator calculate tax depreciation?','Use this schedule for book planning. It does not calculate MACRS, tax allowances or partial-year conventions.'],
    ],
    sources:[['OpenStax · Depreciation methods','https://openstax.org/books/principles-financial-accounting/pages/11-3-explain-and-apply-depreciation-methods-to-allocate-capitalized-costs']],
  },
};
