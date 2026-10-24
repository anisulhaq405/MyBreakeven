import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import LandscapingTargetGuide,{landscapingTargetScenarios} from './LandscapingTargetGuide.jsx';
import {blogPostMap} from './content/blogs/index.js';
import CleaningBudgetResource from './CleaningBudgetResource.jsx';
describe('Ranked-page planning examples',()=>{
 it('reconciles four landscaping scenarios and distinguishes hours from demand',()=>{
  expect(landscapingTargetScenarios.map(s=>[s.result.wholeJobs,s.result.wholeCapacity])).toEqual([[103,94],[81,94],[103,79],[81,79]]);
  for(const {input:i,result:r} of landscapingTargetScenarios){expect(r.wholeJobs*r.contribution).toBeGreaterThanOrEqual(11300);expect((r.wholeJobs-1)*r.contribution).toBeLessThan(11300);expect(r.wholeCapacity*i.hoursPerJob).toBeLessThanOrEqual(i.workers*i.hoursPerWorker*52/12*i.utilizationPct/100);}
  expect(renderToStaticMarkup(<LandscapingTargetGuide/>)).toContain('worker-hours');
 });
 it('checks delivery target prices, rounding and volume floor',()=>{
  for(const [fee,price] of [[.15,30],[.25,34],[.30,36.43]]){expect(price*(1-fee)-16.5).toBeGreaterThanOrEqual(9-1e-10);}
  expect(33*.75-16.5).toBe(8.25);expect(67*9).toBeGreaterThanOrEqual(100*6);expect(66*9).toBeLessThan(100*6);expect(89*9-200).toBeGreaterThanOrEqual(600);
  const p=blogPostMap['restaurant-delivery-app-commission-profit-per-order'];expect(p.html).toContain('delivery-settlement-check');expect(p.modified).toBe('2026-10-24');
 });
 it('reconciles restaurant variance and janitorial payroll boundaries',()=>{
  expect(200*16+1800*1+500).toBe(5000-(-500));expect(Math.ceil(27500/15)).toBe(1834);expect(Math.ceil(32500/15)).toBe(2167);
  expect(60*90-180*20-600-600).toBe(600);expect(Math.ceil(5100/90)).toBe(57);expect(Math.floor(180*.8/2)).toBe(72);
  expect(renderToStaticMarkup(<CleaningBudgetResource/>)).toContain('commercial-cleaning-budget');
 });
});
