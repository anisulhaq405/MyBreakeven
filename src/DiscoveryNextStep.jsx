import React from 'react';
import {topicConnections} from './novemberTopics.js';

// Existing intent owners only. These six paths were absent from the complete
// public source pages before this release; the seventh proposed path already
// existed and is deliberately retained without another link.
export const discoveryNextSteps = Object.freeze({
  'fixed-vs-variable-costs': {
    target: 'activity-based-costing',
    heading: 'Separate cost behavior from support-cost allocation',
    before: 'A fixed or variable classification describes how a cost behaves within the stated activity range. If your next question is how to assign support costs to products or services, follow the ',
    label: 'activity-based costing example',
    after: '. It uses cost pools and supported activity drivers; allocating a cost does not make it avoidable or turn the allocation into an extra expense.',
  },
  'how-to-calculate-cost-of-goods-sold': {
    target: 'current-assets',
    heading: 'Connect closing stock to the balance sheet',
    before: 'Closing inventory also belongs in the balance-sheet review. Use the ',
    label: 'current-assets classification example',
    after: ' to distinguish inventory and receivables from cash and excluded long-term assets. A current-asset subtotal is not the same as cash available to pay the next bill.',
  },
  'operating-expenses': {
    target: 'accrued-expenses',
    heading: 'Check the expense period separately from payment',
    before: 'When a service has been received but remains unpaid, compare the reporting period with the payment date. The ',
    label: 'accrued-expenses recognition and settlement example',
    after: ' follows the liability through payment and explains why settlement should not count the same expense twice. Keep the applicable reporting basis explicit.',
  },
  'target-profit-sales-formula': {
    target: 'pricing-strategies',
    heading: 'Test the price behind the sales target',
    before: 'Required sales are a planning result, not evidence that customers will buy at the assumed price. The ',
    label: 'pricing-strategy comparison',
    after: ' connects price, contribution, customer value and delivery capacity. Recalculate the target if a proposed price or service scope changes; keep demand evidence separate from the arithmetic.',
  },
  'how-to-price-products-for-ecommerce': {
    target: 'cost-plus-pricing',
    heading: 'State the cost base before applying a markup',
    before: 'If you choose a cost-based starting price, use the ',
    label: 'cost-plus pricing worked example',
    after: ' to define which costs enter the markup base and which fees depend on selling price. Then return to this ecommerce guide for the order, channel and fulfillment boundaries; do not add the same cost in both places.',
  },
  'margin-vs-markup': {
    target: 'penetration-pricing',
    heading: 'Evaluate an introductory discount beyond its markup',
    before: 'A markup calculation alone does not show whether a temporary launch offer recovers its delivery and acquisition costs. For that separate decision, use the ',
    label: 'penetration-pricing cohort and recovery example',
    after: '. Keep the introductory period, existing-customer effects and later recovery assumptions separate from the ordinary margin-versus-markup calculation.',
  },
});

// Batch 3: missing handoffs verified against complete deployed HTML, not a
// keyword match. Original Batch 1 paths remain separate and unchanged.
export const rankingNextSteps = Object.freeze({
  'restaurant-budgeting': {
    target: 'restaurant-sales-forecast',
    heading: 'Support the sales budget with orders and trading days',
    before: 'Before entering a monthly sales total in the workbook, build the demand and delivery assumptions behind it. The ',
    label: 'restaurant sales forecast by daypart and channel',
    after: ' connects orders, average checks, trading days and peak-service capacity. Keep a check per table separate from spend per guest. Carry the supported sales assumptions into this budget, then compare actual results without overwriting the original target. Expected sales and cash clearing dates still need separate schedules.',
  },
  'calculate-contribution-margin': {
    target: 'target-profit-sales-formula',
    heading: 'Turn contribution per sale into a monthly profit target',
    before: 'The calculator above shows what the entered sale contributes before fixed commitments. To determine how many comparable sales must cover those commitments and an additional operating profit goal, use the ',
    label: 'target-profit units and sales calculation',
    after: '. Match the period and selling unit, include owner pay once, and recalculate if price, fees or sales mix changes. A positive unit contribution does not establish that the required monthly volume is achievable; compare the target with demand and productive capacity.',
  },
  'break-even-formula-units-dollars': {
    target: 'operating-leverage-small-business',
    heading: 'Check profit sensitivity after calculating break-even',
    before: 'Once you know the operating threshold, a separate question is how profit changes when volume moves above it. The ',
    label: 'operating-leverage formula and worked sensitivity example',
    after: ' uses contribution divided by operating profit at a stated starting volume. Use it only with an explicit cost range and unchanged price, mix and commitments. At zero operating profit the ratio is undefined; do not use a near-break-even multiplier as a reliable forecast of customers or cash.',
  },
  'landscaping-break-even': {
    target: 'landscaping-working-capital',
    heading: 'Fund the dates between job costs and customer receipts',
    before: 'A deliverable job target can cover operating commitments while still leaving payroll or materials due before customer cash arrives. Use the ',
    label: 'landscaping seasonal working-capital schedule',
    after: ' to map those payment dates, inspect the lowest cash balance and test a delayed receipt. Keep this funding task separate from the seasonal break-even guide, which tests recovery of annual commitments. Carry any borrowing through its later repayment dates; available funding does not repair a loss-making job.',
  },
});

export function discoveryNextStep(article) {
  const step = discoveryNextSteps[article?.slug] || rankingNextSteps[article?.slug];
  if (!step) return null;
  const body = `${article.html || ''} ${article.answerHtml || ''} ${article.queryReviewHtml || ''}`;
  const linked = [...body.matchAll(/href=["'](?:https:\/\/mybreakeven\.com)?\/blogs\/([^/"'?#]+)\//g)].some(([, slug]) => slug === step.target);
  // Keep an existing topic-renderer path instead of inserting a duplicate if
  // the topic order changes in a later release.
  if (linked || topicConnections(article)?.posts.some(post => post.slug === step.target)) return null;
  return step;
}

export default function DiscoveryNextStep({article}) {
  const step = discoveryNextStep(article);
  if (!step) return null;
  const id = `discovery-next-${article.slug}`;
  return <aside className="article-summary" aria-labelledby={id}>
    <h2 id={id}>{step.heading}</h2>
    <p>{step.before}<a href={`/blogs/${step.target}/`}>{step.label}</a>{step.after}</p>
  </aside>;
}
