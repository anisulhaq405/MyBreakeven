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
 it('renders result and exact explanation in readable sections',()=>{
  const html=renderToStaticMarkup(<EquivalentRatioCalculator tool={freeTools['equivalent-ratio-calculator']} slug="equivalent-ratio-calculator"/>);
  expect(html).toContain('equivalent-workspace');
  expect(html).toContain('equivalent-verdict');
  expect(html).toContain('Step-by-step working');
  expect(html).toContain('Composition of each ratio');
 });
});