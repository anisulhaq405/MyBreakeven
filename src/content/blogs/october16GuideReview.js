export function applyOctober16GuideReview(post) {
  if (post.slug === 'break-even-analysis-example') {
    const description = 'Follow a break-even analysis example: $12,000 fixed costs, $24 contribution and 500 units. Check full workings, a service template and business scenarios.';
    const start = post.html.indexOf('<p>Start with these three numbers:');
    const body = start >= 0 ? '<h2 id="break-even-formula">Follow the break-even formula</h2>' + post.html.slice(start) : post.html;
    return { ...post, seoTitle: 'Break-Even Analysis Example: Worked Steps', description, metaDescription: description, modified: '2026-10-16',
      sectionLinks: [['quick-answer','500-unit example'],['break-even-formula','Formula and workings'],['example-template','Service template'],['business-examples','Business examples']],
      answerHtml: '<h2 id="quick-answer">A break-even analysis example in four steps</h2><p>These are hypothetical monthly USD inputs. At a $40 selling price and $16 variable cost, contribution is <strong>$24 per unit</strong>. Divide <strong>$12,000 fixed costs by $24</strong>: you need <strong>500 units and $20,000 sales</strong>. Check: $20,000 revenue − $8,000 variable costs − $12,000 fixed costs = $0 operating profit.</p><p><a href="#example-template">Use the fill-in service template</a> or <a href="/#calculator">calculate your own break-even plan</a>. For the zero-operating-profit threshold in the calculator, set separately entered owner pay and target profit to zero; include each owner-pay amount once if you want it covered.</p>',
      html: body.replace('<h2>A break-even analysis template you can fill in</h2>','<h2 id="example-template">A break-even analysis template you can fill in</h2>').replace('<h2>Three worked business examples</h2>','<h2 id="business-examples">Three worked business examples</h2>'),
    };
  }
  if (post.slug === 'target-profit-sales-formula') {
    const description = 'Find required units and sales for target operating income. Follow the target profit formula, a checked 70-job example, owner-pay treatment and capacity checks.';
    const firstHeading = post.html.indexOf('<h2');
    let body = firstHeading >= 0 ? post.html.slice(firstHeading) : post.html;
    body = body.replace('Calculate profit from the contribution left by one sale', 'Target operating income formula: required units and sales');
    body = body.replace('<h2 id="decide-what-the-profit-target-actually-includes">', '<p>In this formula, <strong>target operating income</strong> means desired pre-tax operating profit after the costs included in the model. Required units = (fixed costs + target operating income) ÷ contribution per unit. For required sales revenue, divide that same numerator by the contribution-margin ratio. This is not an after-tax take-home-income formula.</p><h2 id="decide-what-the-profit-target-actually-includes">');
    return { ...post, description, metaDescription: description, modified: '2026-10-16',
      sectionLinks: [['quick-answer','70-job answer'],['calculate-profit-from-the-contribution-left-by-one-sale','Units and sales formulas'],['three-outcomes-from-the-same-monthly-cost-structure','Compare scenarios'],['how-to-run-your-own-numbers','Use your own figures']],
      answerHtml: '<h2 id="quick-answer">How many sales deliver your target profit?</h2><p><strong>Required units = (fixed costs + desired operating profit) ÷ contribution per unit.</strong> In the hypothetical service example, ($7,500 + $3,000) ÷ ($240 − $90) = <strong>70 whole jobs</strong>, or <strong>$16,800 sales</strong>. The $7,500 already includes planned base owner pay; the $3,000 is additional pre-tax operating profit.</p><p><a href="/#calculator">Test your own target profit in the free calculator</a>. Separate owner pay from overhead only if you remove it from the overhead total first. The example below checks the income statement, discount sensitivity, working hours and inquiry requirement.</p>',
      html: body,
    };
  }
  return post;
}
