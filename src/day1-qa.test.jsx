import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync} from 'node:fs';
import HighLowWidget from './HighLowWidget.jsx';
import {calculateHighLow,formatHighLowRate} from './highLow.js';

describe('Day 1 release QA',()=>{
 it('keeps small nonzero rates distinct from zero at calculation precision',()=>{
  const x=calculateHighLow({lowActivity:'1000',lowCost:'1000',highActivity:'2000',highCost:'1000.1',target:'1500'});
  expect(x.rate).toBe(.0001);expect(x.fixed).toBe(999.9);expect(x.total).toBe(1000.05);
  expect(formatHighLowRate(x.rate)).toContain('0.0001');expect(formatHighLowRate(0)).toContain('0.00');expect(formatHighLowRate(1e-10)).toContain('e-10');
 });
 it('renders the complete default calculator and explicit record-selection boundary',()=>{
  const html=renderToStaticMarkup(<HighLowWidget/>);expect(html).toContain('high-low-calculator');expect(html).toContain('1,320.00');expect(html).toContain('2,200.00');expect(html).toContain('does not select those records');expect(html).toContain('aria-live="polite"');
 });
 it('guards all template outputs through an inputs-only status cell',()=>{
  const csv=readFileSync(new URL('../public/downloads/contribution-margin-income-statement-template-20261020.csv',import.meta.url),'utf8');
  expect(csv).toContain('COUNT(B2:B8)');expect(csv).toContain('MIN(B2:B8)<0');expect(csv).toContain('Complete numeric inputs');expect(csv).toContain('Check inputs');expect(csv.match(/B15<>/g)).toHaveLength(6);expect(csv).toContain('B10=0');
 });
});
