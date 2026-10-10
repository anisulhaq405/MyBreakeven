import { describe, it, expect } from 'vitest';
import Decimal from 'decimal.js';
import { demoPlans, exampleJobs, dateLabel } from './authorityResources.js';
import { calculate } from './engine.js';
import { trackProductEvent } from './productAnalytics.js';
describe('published authority resource examples',()=>{
 it('reproduces the documented cleaning contribution, target, capacity and demand',()=>{
  const r=calculate(demoPlans.cleaning);
  expect(r.valid).toBe(true);expect(r.contribution).toBe(77);expect(r.fixedNeed).toBe(4000);
  expect(r.wholeJobs).toBe(52);expect(r.practicalRevenue).toBe(5200);expect(r.wholeCapacity).toBe(40);expect(r.practicalLeads).toBe(208);
 });
 it('keeps agency client-month hours consistent with monthly capacity',()=>{
  const r=calculate(demoPlans.agency);
  expect(r.contribution).toBe(1140);expect(r.wholeJobs).toBe(5);expect(r.wholeCapacity).toBe(4);expect(r.practicalLeads).toBe(20);
 });
 it('reconciles the worksheet contribution loss to changed costs',()=>{
  const contribution=j=>new Decimal(j.revenue).minus(new Decimal(j.hours).times(j.wage)).minus(j.supplies).minus(j.travel).minus(j.other).minus(new Decimal(j.revenue).times(j.fee).div(100));
  expect(contribution(exampleJobs.estimated).toFixed(2)).toBe('110.80');
  expect(contribution(exampleJobs.actual).toFixed(2)).toBe('78.80');
  expect(contribution(exampleJobs.actual).minus(contribution(exampleJobs.estimated)).toFixed(2)).toBe('-32.00');
 });
 it('renders the actual review date rather than a fixed October label',()=>{
  expect(dateLabel('2026-11-04')).toBe('November 4, 2026');
 });
 it('records resource actions only with consent and does not accept arbitrary parameters',()=>{
  const calls=[];const browser={localStorage:{getItem:()=> 'rejected'},gtag:(...args)=>calls.push(args)};
  expect(trackProductEvent('resource_download','cleaning',browser)).toBe(false);expect(calls).toEqual([]);
  browser.localStorage.getItem=()=> 'accepted';
  expect(trackProductEvent('resource_download','cleaning',browser)).toBe(true);
  expect(calls).toEqual([['event','resource_download',{industry:'cleaning'}]]);
  expect(trackProductEvent('resource_download','private-customer-name',browser)).toBe(true);
  expect(calls[1][2]).toEqual({});
 });
});
