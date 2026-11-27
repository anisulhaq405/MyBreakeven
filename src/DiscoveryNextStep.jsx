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

export function discoveryNextStep(article) {
  const step = discoveryNextSteps[article?.slug];
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
