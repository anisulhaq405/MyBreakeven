import React from'react';import{describe,it,expect}from'vitest';import{renderToStaticMarkup}from'react-dom/server';
import{blogPostMap}from'./content/blogs/index.js';import LongformArticle from'./LongformArticle.jsx';import{FlexibleBudgetWidget,MakeOrBuyWidget,BreakEvenChartWidget}from'./Day2PlanningWidgets.jsx';
import{freeTools}from'./freeTools.js';
describe('Day 2 drafts',()=>{
 it('marks both new guides as drafts and renders their formula tools and source links',()=>{for(const slug of ['flexible-budget-variance-analysis','make-or-buy-decision']){const p=blogPostMap[slug],h=renderToStaticMarkup(<LongformArticle article={p}/>);expect(p.editorialStatus).toBe('draft');expect(h).toContain('Unpublished draft');expect(p.html).toContain('https://openstax.org/');expect((h.match(/<h1/g)||[]).length).toBe(1);expect(p.faq.length).toBeGreaterThanOrEqual(4);}});
 it('renders independent default examples and accessible chart data',()=>{expect(renderToStaticMarkup(<FlexibleBudgetWidget/>)).toContain('3,920.00');expect(renderToStaticMarkup(<MakeOrBuyWidget/>)).toContain('18,500.00');const h=renderToStaticMarkup(<BreakEvenChartWidget/>);expect(h).toContain('Accessible chart data');expect(h).toContain('134');});
 it('keeps cash-budget and direct-labor resource boundaries explicit',()=>{expect(freeTools['cash-flow-forecast-template'].sections.some(s=>s.id==='cash-budget-definition')).toBe(true);expect(freeTools['employee-cost-calculator'].sections.some(s=>s.id==='direct-labor-budget')).toBe(true);});
});
