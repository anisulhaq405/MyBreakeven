import React from 'react';
import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {renderToStaticMarkup} from 'react-dom/server';
import {scenarioAnalyses,scenarioCSV} from './scenarioAnalyses.js';
import {calculate} from './engine.js';
import ScenarioAnalysis from './ScenarioAnalysis.jsx';
import IndustryPage from './IndustryPage.jsx';
import BlogArticle from './BlogArticle.jsx';
import {blogPostMap} from './content/blogs/index.js';

describe('Reproducible scenario analyses on existing articles',()=>{
 it('reconciles every restaurant row with independent integer-cent arithmetic',()=>{
  const a=scenarioAnalyses['restaurant-budgeting'];expect(a.rows).toHaveLength(20);expect(new Set(a.rows.map(r=>r.id)).size).toBe(20);
  for(const r of a.rows){const cents=r.input.price*96-r.input.materialCost*100-200;const whole=Math.ceil(2700000/cents);expect(r.result.contribution).toBe(cents/100);expect(r.result.wholeJobs).toBe(whole);expect(r.result.jobs).toBeCloseTo(2700000/cents,10);expect(r.dailyOrders).toBe(Math.ceil(whole/26));expect(r.result.wholeCapacity).toBe(5200);expect(r.result.practicalRevenue).toBe(whole*r.input.price);}
  const base=a.rows.find(r=>r.input.price===25&&r.input.materialCost===6);expect(base.result.wholeJobs).toBe(1688);expect(base.dailyOrders).toBe(65);
 });
 it('uses the full worker-hour boundary and whole-job ceiling in all landscape rows',()=>{
  const a=scenarioAnalyses['landscaping-break-even'];expect(a.rows).toHaveLength(20);expect(new Set(a.rows.map(r=>r.id)).size).toBe(20);
  for(const r of a.rows){const contributionCents=32000-6200-9600-1800-928-Math.round(r.input.otherVariableCost*100),needCents=Math.round((r.input.fixedCosts+6500)*100);expect(r.result.contribution).toBe(contributionCents/100);expect(r.result.wholeJobs).toBe(Math.ceil(needCents/contributionCents));expect(r.result.capacity).toBeCloseTo(94.848,10);expect(r.result.wholeCapacity).toBe(94);expect(r.wholeJobGap).toBe(94-r.result.wholeJobs);}
  const base=a.rows.find(r=>r.result.contribution===110.72&&r.result.fixedNeed===11300);expect(base.result.wholeJobs).toBe(103);expect(base.wholeJobGap).toBe(-9);
  expect(a.rows.find(r=>r.result.contribution===120&&r.result.fixedNeed===11300).wholeJobGap).toBe(-1);
 });
 it('exports all required inputs and reproduces CSV results with the product engine',()=>{
  for(const a of Object.values(scenarioAnalyses)){const csv=readFileSync('public'+a.download,'utf8');expect(csv.replace(/\r\n/g,'\n')).toBe(scenarioCSV(a).replace(/\r\n/g,'\n'));const lines=csv.trim().split(/\r?\n/).map(x=>x.slice(1,-1).split('\",\"'));expect(lines).toHaveLength(21);const [keys,...rows]=lines;expect(new Set(keys).size).toBe(keys.length);
   for(let n=0;n<rows.length;n++){const exported=Object.fromEntries(keys.map((k,i)=>[k,rows[n][i]]));const result=calculate(exported);expect(result.valid).toBe(true);for(const [key,resultKey] of [['contribution','contribution'],['exact_units','jobs'],['whole_units','wholeJobs'],['exact_capacity','capacity'],['whole_capacity','wholeCapacity'],['monthly_funding','fixedNeed']])expect(Number(exported[key])).toBe(result[resultKey]);expect(exported.currency).toBe('USD');expect(exported.scenario_id).toBe(a.rows[n].id);}
  }
 });
 it('offers a contextual landscaping result-to-analysis path without changing calculator inputs',()=>{const html=renderToStaticMarkup(<IndustryPage slug="landscaping-break-even-calculator"/>);expect(html).toContain('href="/blogs/landscaping-break-even/#landscaping-20-scenarios"');expect(html).toContain('does not transfer your current plan');expect(html).toContain('103');});
 it('publishes full tables and downloads in initial HTML with honest method labels',()=>{
  for(const [slug,a] of Object.entries(scenarioAnalyses)){const post=blogPostMap[slug];const html=renderToStaticMarkup(<BlogArticle slug={slug} initialArticle={post}/>);expect(html).toContain(`id="${a.id}"`);expect(html).toContain(`href="${a.download}?v=3"`);expect(html).toContain(`href="${a.download.replace(/\.csv$/,'.xlsx')}?v=3"`);expect(html).toContain('Independent business review: pending');expect(html).toContain('not a market benchmark');for(const r of a.rows)expect(html).toContain(r.id);expect(post.modified).toBe('2026-10-18');expect(html).toContain('opening the link does not transfer values');}
  expect(renderToStaticMarkup(<ScenarioAnalysis slug="cleaning-business-monthly-expenses"/>)).toBe('');
 });
});
