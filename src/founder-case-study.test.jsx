import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import FounderCaseStudy from './FounderCaseStudy';
import {recalledOrder,reconstructFounderOrder,founderCaseRoute} from './founderCaseStudy';
import {calculate} from './engine';
import {industries} from './industries';
import {staticPageMeta} from './staticPageMeta';
import {routeEntryForPath} from './routeEntries';
describe('Founder account reconstruction and evidence boundaries',()=>{
 it('reproduces a new financial target without presenting it as the lost historical result',()=>{
  const r=reconstructFounderOrder(recalledOrder);
  expect(r).toMatchObject({valid:true,contribution:395,need:265000,ownerNeed:65000,required:671,ownerRequired:165});
  const main=calculate({...industries.ecommerce.values,price:2420,materialCost:1300,laborCost:125,otherVariableCost:200,acquisitionCost:400,fixedCosts:15000,ownerPay:50000,targetProfit:200000,paymentFeePct:0});
  expect(r.contribution).toBe(main.contribution);expect(r.required).toBe(main.wholeJobs);
 });
 it('counts the courier once and lets a shipment allocation move from fixed to variable',()=>{
  const r=reconstructFounderOrder({...recalledOrder,overhead:14000,other:10});
  expect(r.contribution).toBe(385);expect(r.need).toBe(264000);expect(r.required).toBe(686);
 });
 it('keeps full precision before whole-order rounding and includes extra fees',()=>{
  expect(reconstructFounderOrder({...recalledOrder,fee:3}).contribution).toBe(322.4);
  expect(reconstructFounderOrder({...recalledOrder,fee:3}).required).toBe(822);
 });
 it('does not claim a finite recovery target for loss-making sales',()=>{
  expect(reconstructFounderOrder({...recalledOrder,price:1000})).toMatchObject({valid:true,required:null,ownerRequired:null});
 });
 it.each([{price:''},{fee:101},{other:-1},{owner:Infinity},{material:'bad'},{price:0},{price:true}])('rejects unusable inputs %o',patch=>expect(reconstructFounderOrder({...recalledOrder,...patch}).valid).toBe(false));
 it('labels the source, relationship, period, uncertainty and current demonstration in public HTML',()=>{
  const html=renderToStaticMarkup(<FounderCaseStudy/>);
  for(const text of ['Founder relationship','self-reported','October 16, 2026','CURRENT RECONSTRUCTION','not the historical calculator output','+55.02%','+31.25%','Shipment packing','does not test fulfillment capacity'])expect(html).toContain(text);
  expect(html).not.toContain('889');expect(html).not.toContain('aggregateRating');
  expect(html).toContain('/founder/');expect(html).toContain('/editorial-policy/#case-study-standards');
 });
 it('uses a dedicated page bundle and an indexable static metadata entry',()=>{
  expect(routeEntryForPath('/'+founderCaseRoute)).toBe('src/routes/FounderCaseRoute.jsx');
  expect(staticPageMeta[founderCaseRoute][0]).toContain('Founder Case Study');expect(staticPageMeta[founderCaseRoute][3]).not.toBe(true);
 });
});
