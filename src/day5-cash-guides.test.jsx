import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {existsSync,readFileSync}from'node:fs';
import {blogPostMap,blogPosts}from'./content/blogs/index.js';
import {cashFlowCase,reconcileCashCase,cashRecoveryCase,cashSchedule}from'./cashFlowExamples.js';
import {calculateOperatingCashFlow,defaultOcfInputs,operatingCashFlowCsv}from'./operatingCashFlowEngine.js';
import {articleFaq}from'./articleFaq.js';
import LongformArticle from './LongformArticle.jsx';
import FinanceTopicNavigator from './FinanceTopicNavigator.jsx';
const slugs=['cash-flow-statement','operating-cash-flow','cash-flow-problems'];
describe('Day 5 original cash-flow owners',()=>{
 it('publishes three distinct complete owners with valid assets, navigation and shared FAQ boundary',()=>{
  for(const slug of slugs){const p=blogPostMap[slug];expect(blogPosts.filter(p=>p.slug===slug)).toHaveLength(1);expect(p.published).toBe('2026-10-25');expect(p.modified).toBe('2026-10-25');expect(p.html).toContain('fictional');expect(`${p.seoTitle} | MyBreakeven`.length).toBeLessThanOrEqual(60);expect(p.metaDescription.length).toBeLessThanOrEqual(160);expect(p.html.replace(/<[^>]*>/g,' ').split(/\s+/).length).toBeGreaterThan(1200);
   const html=renderToStaticMarkup(<LongformArticle article={p}/>);expect((html.match(/<h1[ >]/g)||[])).toHaveLength(1);const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);expect(new Set(ids).size).toBe(ids.length);for(const[id]of p.sectionLinks)expect(ids).toContain(id);
   for(const m of p.html.matchAll(/(?:href|src)="(\/(?:downloads|images)\/[^"?#]+)"/g))expect(existsSync('public'+m[1]),m[1]).toBe(true);
   for(const m of p.html.matchAll(/href="\/blogs\/([^/"#]+)\//g))expect(blogPostMap[m[1]],m[1]).toBeTruthy();
   for(const x of articleFaq(p).items){expect(html).toContain(x.q);expect(html).toContain(x.a);}
   expect(existsSync('public'+p.image)).toBe(true);expect(existsSync('public'+p.image.replace('.webp','-800.webp'))).toBe(true);
  }
 });
 it('reconciles the independently constructed direct cash, indirect bridge, statements and both balance sheets',()=>{
  const r=reconcileCashCase();expect(r).toMatchObject({income:9000,receipts:88000,suppliers:53000,staff:19000,other:11000,taxPaid:2000,direct:2000,indirect:2000,investing:-12000,financing:10000,net:0,closing:10000});
  for(const x of [cashFlowCase.opening,cashFlowCase.closing])expect(x.cash+x.receivables+x.inventory+x.prepaid+x.ppe).toBe(x.payables+x.accruals+x.taxPayable+x.debt+x.equity);
  expect(cashFlowCase.closing.ppe).toBe(cashFlowCase.opening.ppe+cashFlowCase.equipment-cashFlowCase.depreciation);expect(cashFlowCase.closing.equity).toBe(cashFlowCase.opening.equity+r.income-cashFlowCase.distribution);
 });
 it('checks the low point and all independent timing remedies without inventing receipts or savings',()=>{
  const b=cashSchedule(cashRecoveryCase.base),r=cashSchedule(cashRecoveryCase.revised);expect(b.rows.map(x=>x.closing)).toEqual([3000,-2000,6000,7000]);expect(r.rows.map(x=>x.closing)).toEqual([3000,6000,6000,7000]);expect(b.gap).toBe(5000);expect(r.gap).toBe(0);for(const k of ['receipts','payments'])expect(cashRecoveryCase.base.reduce((s,x)=>s+x[k],0)).toBe(cashRecoveryCase.revised.reduce((s,x)=>s+x[k],0));
  for(const key of ['receipts','payments']){const changed=cashRecoveryCase.base.map((x,i)=>({...x,[key]:cashRecoveryCase.revised[i][key]}));expect(cashSchedule(changed)).toMatchObject({lowest:2000,gap:1000,closing:7000});}
 });
 it('gives every new guide a visible inbound hub path and existing-owner contextual connections',()=>{
  const html=renderToStaticMarkup(<FinanceTopicNavigator/>);for(const slug of slugs)expect(html).toContain(`/blogs/${slug}/`);
  for(const slug of ['cash-flow-forecast-vs-break-even','cash-flow-break-even-vs-profit-break-even'])for(const next of slugs)expect(blogPostMap[slug].html).toContain(`/blogs/${next}/`);
 });
 it('exports the checked static statement, bridge and recovery records with their explicit scope',()=>{
  for(const name of ['cash-flow-statement-example','operating-cash-flow-reconciliation','cash-flow-recovery-action-plan']){const csv=readFileSync(`public/downloads/${name}.csv`,'utf8');expect(csv).toContain('Values only; no formulas');expect(csv).toContain('\r\n');expect(csv).not.toMatch(/"=[^"]/);}
 });
});
describe('Operating cash reconciliation checker',()=>{
 it('matches direct and indirect example and recognizes a real mismatch',()=>{const v=defaultOcfInputs();expect(calculateOperatingCashFlow(v)).toMatchObject({valid:true,indirect:2000,direct:2000,difference:0,matched:true});v.receivables='10000';expect(calculateOperatingCashFlow(v)).toMatchObject({indirect:4000,direct:2000,difference:2000,matched:false});});
 it('reverses signed asset and liability changes correctly and permits losses',()=>{const v=Object.fromEntries(Object.keys(defaultOcfInputs()).map(k=>[k,'0']));Object.assign(v,{income:'-5000',receivables:'-1000',payables:'-2000',other:'500'});expect(calculateOperatingCashFlow(v).indirect).toBe(-5500);});
 it('handles cents exactly and preserves zero as a valid input',()=>{const v=Object.fromEntries(Object.keys(defaultOcfInputs()).map(k=>[k,'0']));Object.assign(v,{income:'0.10',noncash:'0.20',receipts:'0.30'});expect(calculateOperatingCashFlow(v)).toMatchObject({valid:true,indirect:.3,direct:.3,matched:true});});
 it('rejects blank, partial, nonfinite, excessive, overprecision and negative direct cash inputs',()=>{for(const bad of ['', ' ', '12abc','Infinity','1e5','1,000','1.001','1000000000001','=1+1']){const v={...defaultOcfInputs(),income:bad};expect(calculateOperatingCashFlow(v).valid,bad).toBe(false);expect(operatingCashFlowCsv(v)).toBe(null);}expect(calculateOperatingCashFlow({...defaultOcfInputs(),payments:'-1'}).valid).toBe(false);});
 it('exports edited valid inputs and computed outputs rather than the example snapshot',()=>{const v={...defaultOcfInputs(),receivables:'10000'};const csv=operatingCashFlowCsv(v);expect(csv).toContain('"Change in operating receivables","10000.00"');expect(csv).toContain('"Indirect OCF","4000.00"');expect(csv).toContain('"Difference: indirect minus direct","2000.00","Investigate difference"');});
});
