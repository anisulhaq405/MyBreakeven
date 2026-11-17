import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {describe,it,expect} from 'vitest';
import {normalizeSearch,prepareSearchDocuments,searchSite,searchSnippet} from './siteSearch.js';
import SiteSearch from './SiteSearch.jsx';
import SiteSearchForm from './SiteSearchForm.jsx';
import {SiteHeader} from './SiteChrome.jsx';
import {routeEntryForPath} from './routeEntries.js';
const docs=prepareSearchDocuments([
 {url:'/blogs/payroll/',title:'Payroll for Small Business',kind:'Guide',summary:'Reconcile wages and liabilities.',headings:'Payroll records',text:'Keep a dated payroll register. This body also discusses reimbursement evidence and a reserve.'},
 {url:'/calculators/employee-cost/',title:'Employee Cost Calculator',kind:'Calculator',summary:'Budget payroll and benefits.',text:'Include payroll, wages and employer costs.'},
 {url:'/blogs/#topic-hiring-people',title:'Hiring, payroll and employee costs',kind:'Topic',summary:'Connected people guides.',text:'Recruitment, payroll and employee compensation.'},
 {url:'/about-us/',title:'About the company',kind:'Page',summary:'Planning support',text:'payroll is one of our planning subjects.'},
 {url:'/blogs/payback/',title:'ROI and cash-flow examples',kind:'Guide',summary:'Check returns.',text:'Calculate return on investment.'},
]);
describe('site-wide public content search',()=>{
 it('returns relevant results across content types, ranked by actual title match',()=>{const r=searchSite(docs,'payroll');expect(r.map(d=>d.kind)).toEqual(expect.arrayContaining(['Guide','Calculator','Topic','Page']));expect(r[0].url).toBe('/blogs/payroll/');expect(r.at(-1).kind).toBe('Page');});
 it('finds a word present only in the article body',()=>expect(searchSite(docs,'reimbursement')[0].url).toBe('/blogs/payroll/'));
 it('requires every meaningful query term and honors type filters',()=>{expect(searchSite(docs,'payroll wages','Calculator')).toHaveLength(1);expect(searchSite(docs,'payroll unknown')).toEqual([]);});
 it('normalizes case, punctuation, diacritics, plurals and common joined words',()=>{expect(searchSite(docs,'PAYROLL!')).toHaveLength(4);expect(searchSite(docs,'cashflow')[0].url).toBe('/blogs/payback/');expect(normalizeSearch('Break-even')).toBe(normalizeSearch('breakeven'));expect(normalizeSearch('café')).toBe('cafe');expect(searchSite(docs,'costs','Calculator')).toHaveLength(1);});
 it('uses word boundaries so ROI does not match payroll',()=>{expect(searchSite(docs,'roi').map(d=>d.url)).toEqual(['/blogs/payback/']);});
 it('handles empty, punctuation, hostile markup and oversize queries safely',()=>{for(const q of ['','  ','!!!','<script>alert(1)</script>','x'.repeat(5000)])expect(searchSite(docs,q)).toEqual([]);});
 it('shows a bounded excerpt around the body match',()=>{const snippet=searchSnippet(docs[0],'reimbursement');expect(snippet).toContain('reimbursement');expect(snippet.length).toBeLessThanOrEqual(222);});
 it('makes search available in the shared header and uses native GET forms',()=>{expect(renderToStaticMarkup(<SiteHeader/>)).toContain('href="/search/"');const form=renderToStaticMarkup(<SiteSearchForm/>);expect(form).toContain('action="/search/"');expect(form).toContain('name="q"');expect(form).toContain('method="get"');expect(routeEntryForPath('/search/')).toBe('src/routes/SearchRoute.jsx');});
 it('renders a useful server shell and no-JavaScript browsing alternatives',()=>{const html=renderToStaticMarkup(<SiteSearch/>);expect(html).toContain('<h1');expect(html).toContain('Search the entire site');expect(html).toContain('<noscript>');expect(html).toContain('/tools/');});
});
