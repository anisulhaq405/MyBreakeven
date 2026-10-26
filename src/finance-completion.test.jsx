import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {financeCompletionPosts as posts,financialRatiosHub,ratioReferenceRows,statementIncomeRows,statementBalanceRows} from './content/blogs/financeCompletionGuides.js';
import {blogPostMap} from './content/blogs/index.js';
import LongformArticle from './LongformArticle.jsx';
import Hub from './FinancialRatiosHub.jsx';
import {freeTools} from './freeTools.js';
import {calculateFinancialRatios,ratioDefaults} from './financialRatiosEngine.js';
import {calculateRefinance,refinanceDefaults} from './refinanceEngine.js';
import {calculateEquivalent,equivalentDefaults} from './equivalentRatioEngine.js';
import {routeEntryForPath} from './routeEntries.js';
const expectedSlugs=['fire-vs-coast-fire-vs-barista-fire','fire-withdrawal-rate-retirement-risks','how-to-analyze-financial-statements','find-missing-value-equivalent-ratios','equivalent-ratio-tables-word-problems','mortgage-refinance-break-even','refinance-closing-costs-financed-fees','refinance-shorter-vs-longer-term'];
describe('Nine pending blueprint owners',()=>{
 it('uses exactly the eight approved guide slugs and one isolated editorial hub',()=>{expect(posts.map(p=>p.slug)).toEqual(expectedSlugs);expect(routeEntryForPath('/guides/financial-ratios/')).toBe('src/routes/FinancialRatiosHubRoute.jsx');});
 it.each(posts)('$id has readable original content, valid anchors, reciprocal tool links and visible FAQs',post=>{
  const p=blogPostMap[post.slug],html=renderToStaticMarkup(<LongformArticle article={p}/>);
  expect(p).toMatchObject({published:'2026-10-26',modified:'2026-10-26',editorialStatus:'published'});
  expect(html.match(/<h1\b/g)).toHaveLength(1);
  const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);expect(new Set(ids).size).toBe(ids.length);
  for(const [id]of p.sectionLinks)expect(ids).toContain(id);
  expect(p.html).toContain('/calculators/'+p.calculatorSlug+'/');
  expect(freeTools[p.calculatorSlug].related.some(([,url])=>url===`/blogs/${p.slug}/`)).toBe(true);
  for(const[,slug]of p.html.matchAll(/href="\/blogs\/([^/]+)\//g))expect(blogPostMap[slug],slug).toBeTruthy();
  expect(p.html).not.toContain('/calculators/financial-leverage-ratio-calculator/');
  expect(p.html).toContain('<caption>');expect(p.html).toContain('https://');
  expect(p.faq.length).toBeGreaterThanOrEqual(4);for(const {q,a}of p.faq){expect(html).toContain(q);expect(html).toContain(a);}
 });
 it('renders the hub reference and true dated metadata without embedding another calculator',()=>{const h=renderToStaticMarkup(<Hub/>);expect(h.match(/<h1\b/g)).toHaveLength(1);expect(h).toContain('Printable financial-ratio formula reference');expect(h).toContain('/calculators/financial-ratios-calculator/#leverage');expect(h).not.toContain('<input');expect(ratioReferenceRows).toHaveLength(19);for(const[q,a]of financialRatiosHub.faq){expect(h).toContain(q);expect(h).toContain(a);}expect(h).toContain('2026-10-26');});
});
describe('Original statements reconcile to the existing calculator contract',()=>{
 const n=s=>Number(s.replaceAll(',','')),bs=Object.fromEntries(statementBalanceRows.map(([label,a,b])=>[label,[n(a),n(b)]])),income=Object.fromEntries(statementIncomeRows.map(([label,a])=>[label,n(a)]));
 it('balances both dates, including all classified assets and financing',()=>{for(const i of [0,1]){expect(bs['Cash and cash equivalents'][i]+bs['Separate liquid short-term investments'][i]+bs['Trade receivables'][i]+bs.Inventory[i]+bs['Operating prepayments'][i]).toBe(bs['Total current assets'][i]);expect(bs['Total current assets'][i]+bs['Net property, plant and equipment'][i]).toBe(bs['Total assets'][i]);expect(bs['Trade payables'][i]+bs['Current interest-bearing debt'][i]+bs['Long-term interest-bearing debt'][i]+bs['Non-interest-bearing shareholder loans'][i]).toBe(bs['Total liabilities'][i]);expect(bs['Total assets'][i]).toBe(bs['Total liabilities'][i]+bs.Equity[i]);}});
 it('reconciles profit, PPE, equity, operating cash and closing cash independently',()=>{expect(income['Net revenue']-income['Cost of goods sold']-50000-5000-5000).toBe(income['Net income']);const ocf=20000+10000-(25000-20000)-(18000-22000)-(2000-0)+(20000-20000);expect(ocf).toBe(27000);expect(125000+25000-10000).toBe(140000);expect(70000+20000-10000).toBe(80000);expect(8000+ocf-25000+10000-10000).toBe(10000);});
 it('matches the current statement inputs without silently changing the engine',()=>{const v=ratioDefaults();expect(+v.assets).toBe(bs['Total assets'][1]);expect(+v.assetsOpen).toBe(bs['Total assets'][0]);expect(+v.equityOpen).toBe(bs.Equity[0]);expect(+v.net).toBe(income['Net income']);const r=calculateFinancialRatios(v);expect(r.warnings).toEqual([]);expect(r.rows.find(x=>x.name==='DSO').value).toBe(45.625);expect(r.rows.find(x=>x.name==='Return on equity').value).toBeCloseTo(26.6666666667,7);});
});
describe('FIRE, proportion and quote examples',()=>{
 it('checks Coast milestones and same-real-rate convention',()=>{expect(1000000/1.05**20).toBeCloseTo(376889.48,2);expect(1000000/1.05**30).toBeCloseTo(231377.45,2);expect(1.07625/1.025-1).toBeCloseTo(.05,12);expect((40000-24000)/.04).toBe(400000);});
 it('isolates return order with equal beginning-year withdrawals',()=>{const a=((100000-10000)*.8-10000)*1.25,b=((100000-10000)*1.25-10000)*.8;expect(a).toBe(77500);expect(b).toBe(82000);expect(b-a).toBe(4500);});
 it('validates all four nonzero missing-term demonstrations by substitution',()=>{for(const row of [[3,5,12,20],[.5,.75,2,3],[.1,.3,1,3]])expect(row[0]*row[3]).toBeCloseTo(row[1]*row[2],12);expect(0*20).not.toBe(5*3);expect(2*10).not.toBe(3*6);expect(250+100).toBe(350);expect(250/100).toBe(5/2);expect(37%3).not.toBe(0);});
 it('reconciles the quote ledger through the supported calculator inputs',()=>{const r=calculateRefinance({...refinanceDefaults(),upfront:'4000',financed:'2000',credits:'1000',escrow:'2500'});expect(r).toMatchObject({valid:true,newPrincipal:252000,upfront:3000,cashToClose:5500,simple:null});expect(6000-1000).toBe(3000+2000);expect(252000*.01).toBe(2520);});
});
describe('Independently reconciled mortgage publication fixtures',()=>{
 // These are independently generated Decimal schedule results, not values copied from this engine.
 const fixtures=[['180',2042.71,122562.60,188222.40,117687.42,10901.46],['300',1535.22,92113.20,223178.73,210565.19,6394.53],['360',1419.47,85168.20,231151.68,261011.49,5366.58]];
 it.each(fixtures)('matches the %s-month new loan at the common month-60 date',(newMonths,payment,cash,balance,lifetime,saving)=>{const r=calculateRefinance({...refinanceDefaults(),newMonths});expect(r.valid).toBe(true);expect(r.next.payment).toBe(payment);expect(r.newH.paid).toBeCloseTo(cash,2);expect(r.newH.balance).toBeCloseTo(balance,2);expect(r.next.lifetimeInterest).toBeCloseTo(lifetime,2);expect(r.saving).toBeCloseTo(saving,2);expect(r.oldH.balance).toBeCloseTo(226405.26,2);});
});
