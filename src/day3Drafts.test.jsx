import {october25GscDates}from'./testFixtures/october25GscDates.js';
import React from'react';import{describe,it,expect}from'vitest';import{renderToStaticMarkup}from'react-dom/server';
import{blogPostMap}from'./content/blogs/index.js';import LongformArticle from'./LongformArticle.jsx';
import{BudgetBridgeWidget,DriverAllocationWidget,JobCostWidget}from'./Day3PlanningWidgets.jsx';
import{freeTools}from'./freeTools.js';import{day3DraftSections}from'./content/blogs/day3DraftEnrichment.js';
describe('Day 3 published package',()=>{
 it('publishes all three guides with complete sources and unique section anchors',()=>{for(const slug of ['master-budget','cost-drivers-small-business','job-order-costing']){const p=blogPostMap[slug],h=renderToStaticMarkup(<LongformArticle article={p}/>);expect(p.editorialStatus).toBe('published');expect(h).not.toContain('Unpublished draft');expect(p.published).toBe('2026-10-22');expect(p.modified).toBe(p.slug==='restaurant-budgeting'?'2026-10-30':(october25GscDates.has(p.slug)?'2026-10-25':'2026-10-23'));expect(p.html).toContain('https://openstax.org/');expect(h).toContain('href="#quick-answer"');expect(h.indexOf('id="quick-answer"')).toBeLessThan(h.indexOf('class="margin-widget'));expect((h.match(/<h1/g)||[]).length).toBe(1);expect(p.faq).toHaveLength(5);for(const[id]of p.sectionLinks)expect(h).toContain(`id="${id}"`);const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(x=>x[1]);expect(new Set(ids).size).toBe(ids.length);expect(p.html.replace(/<[^>]+>/g,' ').split(/\s+/).length).toBeGreaterThan(1000);}});
 it('renders checked numerical outputs and accessible input help',()=>{for(const[Component,expected]of[[BudgetBridgeWidget,'3,800.00'],[DriverAllocationWidget,'750.00'],[JobCostWidget,'2,820.00']]){const h=renderToStaticMarkup(<Component/>);expect(h).toContain(expected);expect(h).toContain('aria-live="polite"');expect(h).toContain('aria-describedby=');expect(h).toContain('Reset fictional example');}});
 it('adds each contextual existing-guide section once',()=>{for(const[slug,extra]of Object.entries(day3DraftSections)){const p=blogPostMap[slug];expect(p.html.split(extra).length-1).toBe(1);expect(p.modified).toBe(slug==='restaurant-budgeting'?'2026-10-30':(october25GscDates.has(p.slug)?'2026-10-25':(['flexible-budget-variance-analysis','make-or-buy-decision'].includes(slug)?'2026-10-23':'2026-10-22')));expect(p.published<='2026-10-21').toBe(true);}});
 it('connects both resource pages to the new published owners',()=>{expect(freeTools['cash-flow-forecast-template'].sections.find(s=>s.id==='master-budget-connection').links[0].href).toBe('/blogs/master-budget/');expect(freeTools['employee-cost-calculator'].sections.find(s=>s.id==='labor-job-cost-connection').links[0].href).toBe('/blogs/job-order-costing/');});
});

it('provides focusable calculator input/result targets and concise label associations',()=>{
 for(const[Component,id]of[[BudgetBridgeWidget,'master-budget-bridge'],[DriverAllocationWidget,'cost-driver-calculator'],[JobCostWidget,'job-order-cost-sheet']]){
  const h=renderToStaticMarkup(<Component/>);expect(h).toContain(`href="#${id}-inputs"`);expect(h).toContain(`href="#${id}-results"`);expect(h).toContain(`id="${id}-results" tabindex="-1" role="region"`);
  const ids=new Set([...h.matchAll(/id="([^"]+)"/g)].map(m=>m[1]));
  for(const[,target]of h.matchAll(/for="([^"]+)"/g))expect(ids.has(target)).toBe(true);
  for(const[,target]of h.matchAll(/aria-describedby="([^"]+)"/g))expect(ids.has(target)).toBe(true);
 }
});
it('completes the independent master-budget example without claiming the worksheet automates a balance sheet',()=>{
 const p=blogPostMap['master-budget'];expect(p.html).toContain('id="budgeted-balance-sheet-example"');expect(p.html).toContain('23,000');expect(p.html).toContain('do not automatically generate these balance-sheet schedules');
 const opening={cash:5000,ar:3000,equipment:10000,debt:6000,equity:12000};
 const cash=opening.cash+31800-33000,ar=opening.ar+36000-31800,equipment=opening.equipment+2000,debt=opening.debt-1000,equity=opening.equity+6000;
 expect(cash+ar+equipment).toBe(23000);expect(debt+equity).toBe(23000);expect(cash).toBe(3800);expect(ar).toBe(7200);
});
