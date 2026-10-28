import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import FinancialRatiosCalculator from './FinancialRatiosCalculator.jsx';
import {freeTools} from './freeTools.js';
import {calculateFinancialRatios,ratioDefaults} from './financialRatiosEngine.js';
describe('ratio visual presentation',()=>{
 it('renders a signed, accessible diagram for every one of the 55 measures',()=>{
  const r=calculateFinancialRatios(ratioDefaults());
  expect(r.rows).toHaveLength(55);
  const html=renderToStaticMarkup(<FinancialRatiosCalculator tool={freeTools['financial-ratios-calculator']} slug="financial-ratios-calculator"/>);
  for(const row of r.rows)expect(html).toContain('data-ratio-visual="'+row.name.replace(/&/g,'&amp;').replace(/"/g,'&quot;')+'"');
  expect(html).toContain('Financial driver relationship');
  expect(html).toContain('Calculation:');
  expect(html).toContain('Value bridge');
  expect(html).toContain('Operating timeline');
  expect(html).toContain('Capital / allocation structure');
  expect(html).toContain('Per-share / valuation relationship');
 });
});
