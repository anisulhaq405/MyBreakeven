export const sellerAssetUpdated = '2026-11-28';

const common = {reviewed:sellerAssetUpdated, theme:{'--tool-accent':'#24556f','--tool-dark':'#153749','--tool-soft':'#eff7fb'}};
export const sellerAssetTools = {
  'paypal-fee-calculator': {
    ...common, mode:'paypalFee', category:'Payment processing',
    name:'PayPal Merchant Fee Calculator', title:'PayPal Fee Calculator: US Merchant Fees & Reverse Pricing',
    description:'Estimate US PayPal merchant fees, seller net proceeds and the minimum charge to reach a target net. Compare supported PayPal rates or use custom pricing.',
    intro:'Check the fee on a US PayPal payment or find the smallest charge that reaches your target net. Then use the examples below to reconcile proceeds with your order costs.',
    image:'/images/tools/ecommerce-break-even-feature-20261016.webp', alt:'Seller workspace with a calculator, laptop and packed orders',
    guide:'/blogs/ecommerce-profit-margin/', guideLabel:'Calculate ecommerce profit after order costs',
    features:['US domestic USD payment presets','Editable custom rate and fixed fee','Forward fee estimates and reverse charge calculation'],
    sections:[
      {id:'choose-paypal-fee', title:'Choose the fee that matches your PayPal transaction', paragraphs:[
        'Start with the transaction type and fee on your PayPal activity or statement. Choose Checkout for a matching Checkout payment, Send/Receive Money for Goods and Services for that named transaction type, or QR for a matching QR transaction. Use Custom when your contract or payment product shows different terms.',
        'At $100, the displayed Checkout preset estimates $3.98 in fees and $96.02 in proceeds. The Goods and Services preset estimates $2.99 and $97.01. These are separate transaction types. Check the actual payment record before applying either rate to a forecast.',
      ]},
      {id:'reverse-paypal-fee', title:'Worked example: receive $100 after a 3% fee plus $0.30', paragraphs:[
        'Select Custom fee, enter 3 and 0.30, then select Find the charge for a target net and enter $100. The result is $103.40 gross. The modeled fee rounds to $3.40, leaving $100.00. A $103.39 charge leaves $99.99, so it misses the target by a cent.',
        'Use the result as a pricing estimate. Before changing what a buyer is charged, check the terms for your payment product and any rules that apply to your pricing.',
      ]},
      {id:'reconcile-paypal-proceeds', title:'Reconcile payment proceeds with order profit', paragraphs:[
        'Suppose a $100 payment under the same custom rate includes $8 collected for sales tax. PayPal proceeds in the model are $96.70. Set aside the $8 tax and deduct $60 of product, shipping and packaging costs to get $28.70 contribution before overhead. If your order report already deducts the payment fee, do not deduct it a second time.',
        'Fixed fees make small payments comparatively expensive. At the same custom rate, a $5 payment costs $0.45 (9%), while a $100 payment costs $3.30 (3.3%). Use effective fee rate to compare order sizes, and use the statement to reconcile actual fees.',
      ]},
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
    intro:'Compare straight-line and double-declining depreciation for a business asset. See the yearly expense, accumulated depreciation and closing book value, then download the Excel schedule.',
    image:'/images/tools/business-roi-calculator-editorial.webp', alt:'Business planning desk with a calculator and financial records',
    guide:'/blogs/depreciation-methods/', guideLabel:'Compare book depreciation methods',
    related:[['Work through the straight-line method','/blogs/straight-line-depreciation/'],['Reconcile accumulated depreciation','/blogs/accumulated-depreciation/']],
    features:['Straight-line and double-declining balance','Annual opening, expense, accumulated depreciation and closing balances','Editable Excel schedule using the same calculation'],
    sections:[
      {id:'asset-inputs', title:'Gather cost, residual value and useful life', paragraphs:[
        'Start with the capitalized cost in the asset record, including any qualifying costs already recorded to get the asset ready for use. Enter estimated residual value at the end of the useful life. Use your expected years of business use for the book schedule. If residual equals cost, there is no depreciable amount.',
        'Use Straight-line for a steady allocation before rounding. Use Double-declining balance to see a larger expense earlier in the life of the asset. Both schedules allocate the same total cost above residual in this model.',
      ]},
      {id:'compare-depreciation-methods', title:'Worked example: compare both methods on a $12,000 asset', paragraphs:[
        'Enter $12,000 cost, $2,000 residual and five years. Straight-line gives $2,000 expense and $10,000 closing book value in year one. Double-declining applies a 40% rate to the $12,000 opening value, giving $4,800 expense and $7,200 closing book value.',
        'In year two, double-declining applies 40% to $7,200. Expense is $2,880 and the year closes at $4,320. By year five, both methods have recorded $10,000 in total depreciation and close at $2,000. The schedule stops charging expense once it reaches the residual floor.',
      ]},
      {id:'review-depreciation-schedule', title:'Check the schedule before using it in your books', paragraphs:[
        'Check that each opening balance matches the previous closing balance and that opening value minus annual expense equals closing value. At the bottom, original cost should equal final book value plus accumulated depreciation.',
        'Download the Excel workbook and enter the same cost, residual, useful life and method on the Inputs sheet. Compare the first-year expense and final balance with the calculator. If your financial year requires a part-year charge, use the linked straight-line guide to see a partial-period example before posting.',
      ]},
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
