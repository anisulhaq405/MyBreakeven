import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {calculateEquivalent,equivalentDefaults} from './equivalentRatioEngine.js';
import EquivalentRatioCalculator from './EquivalentRatioCalculator.jsx';
import {freeTools} from './freeTools.js';
describe('Equivalent ratio optimization safety',()=>{
 it('keeps exact equivalence and 3-term comparisons',()=>{
  expect(calculateEquivalent(equivalentDefaults()).equal).toBe(true);
  expect(calculateEquivalent({...equivalentDefaults(),terms:'3'}).equal).toBe(true);
  expect(calculateEquivalent({...equivalentDefaults(),b:['8','12','17'],terms:'3'}).equal).toBe(false);
 });
 it('handles very large exact inputs without NaN or Infinity in visuals',()=>{
  const huge='9'.repeat(40);
  const r=calculateEquivalent({...equivalentDefaults(),a:[huge,huge,'4'],b:[huge,huge,'4'],terms:'2'});
  expect(r.valid).toBe(true);
  expect(r.equal).toBe(true);
  expect(r.bars===null || r.bars.every(row=>row.every(Number.isFinite))).toBe(true);
 });

 it('solves missing zero exactly and rejects invalid denominators',()=>{
  const zero=calculateEquivalent({...equivalentDefaults(),mode:'solve',a:['x','3','4'],b:['0','6','8'],terms:'2'});
  expect(zero.valid).toBe(true);
  expect(zero.solution).toBe('0');
  const invalid=calculateEquivalent({...equivalentDefaults(),a:['1','0','4'],b:['2','0','8'],terms:'2'});
  expect(invalid.valid).toBe(false);
 });
 it('generates exact fractional multiples without rounding',()=>{
  const r=calculateEquivalent({...equivalentDefaults(),mode:'generate',terms:'2',a:['1/3','2/3','4'],factor:'3/2'});
  expect(r.valid).toBe(true);
  expect(r.scaled).toBe('1/2 : 1');
  expect(r.table).toHaveLength(6);
 });
 it('renders result and exact explanation in readable sections',()=>{
  const html=renderToStaticMarkup(<EquivalentRatioCalculator tool={freeTools['equivalent-ratio-calculator']} slug="equivalent-ratio-calculator"/>);
  expect(html).toContain('equivalent-workspace');
  expect(html).toContain('equivalent-verdict');
  expect(html).toContain('Step-by-step working');
  expect(html).toContain('Composition of each ratio');
  expect(html).toContain('Business comparisons');
  expect(html).toContain('Cost-to-revenue comparison');
  expect(html).toContain('Debt-to-equity comparison');
  expect(html).toContain('Advanced ratio mathematics');
  expect(html).toContain('Copy result &amp; steps');
  expect(html).toContain('Download CSV');
 });
});