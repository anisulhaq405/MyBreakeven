import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import RefinanceCalculator from './RefinanceCalculator.jsx';
import {freeTools} from './finalFinanceTools.js';
describe('Refinance decision-focused UX',()=>{
 it('shows guided stages, savings curve and accessible exit-date comparison',()=>{
  const html=renderToStaticMarkup(<RefinanceCalculator tool={freeTools['refinance-calculator']} slug="refinance-calculator"/>);
  for(const phrase of ['Step 1','Step 2','Step 3','Refinance savings over time','Refinance savings at common exit dates','Zero cost difference'])expect(html).toContain(phrase);
  expect(html).toContain('aria-label="Refinance savings compared with current mortgage by month"');
  expect(html).toContain('month 60 exit');
 });
});
