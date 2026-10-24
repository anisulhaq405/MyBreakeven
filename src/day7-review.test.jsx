import React from 'react';
import {it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import FinanceTopicNavigator from './FinanceTopicNavigator.jsx';
import AuthorityPage from './AuthorityPages.jsx';
import {blogPostMap} from './content/blogs/index.js';

it('reconciles the completed-month result and independently separates the volume and labor changes',()=>{
  const revenue=70*160;
  const costs=70*3.4*22+70*(8+10+8)+revenue*.03;
  const contribution=revenue-costs;
  expect(contribution).toBeCloseTo(3808,8);
  const afterTarget=contribution-2500-3000;
  expect(afterTarget).toBeCloseTo(-1692,8);
  const planAfterTarget=95*(160*.97-92)-2500-3000;
  expect(planAfterTarget-afterTarget).toBeCloseTo(25*63.2+70*.4*22,8);
  expect(70*3.4-2*35*52/12*.7).toBeCloseTo(25.6666666667,8);
  const html=blogPostMap['is-a-cleaning-business-profitable'].html;
  expect(html).toContain('($1,692) shortfall');
  expect(html).toContain('exceeding the base team');
  expect(html).toContain('not certified net income');
});

it('makes new finance guides, tools and downloads discoverable without creating duplicate article owners',()=>{
  const h=renderToStaticMarkup(<FinanceTopicNavigator/>);
  for(const path of ['/blogs/operating-expenses/','/blogs/rolling-forecast/','/calculators/operating-profit-margin-calculator/','/calculators/net-cash-flow-calculator/','/resources/one-page-business-plan-template/'])expect(h).toContain(`href="${path}"`);
  const resources=renderToStaticMarkup(<AuthorityPage path="/resources"/>);
  expect(resources).toContain('href="/blogs/how-to-calculate-working-capital/#working-capital-download"');
  expect(resources).toContain('href="/calculators/operating-profit-margin-calculator/"');
});
