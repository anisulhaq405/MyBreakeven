import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import FinanceDay1Calculator from './FinanceDay1Calculator.jsx';
import {freeTools} from './freeTools.js';
describe('Phase 2 Future Value page UI',()=>{
 it('renders comparison, milestones and custom cash flow tools',()=>{
  const html=renderToStaticMarkup(<FinanceDay1Calculator tool={freeTools['future-value-calculator']} slug="future-value-calculator"/>);
  expect(html).toContain('Compare investment plans side by side');
  expect(html).toContain('Goal milestones and funding timeline');
  expect(html).toContain('One-time deposits and withdrawals');
  expect(html).toContain('Advanced investment growth plan');
  expect(html).toContain('Plan toward a future savings goal');
 });
});