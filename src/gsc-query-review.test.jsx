import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {it,expect} from 'vitest';
import {blogPostMap} from './content/blogs/index.js';
import BlogArticle from './BlogArticle.jsx';
it('makes the janitorial workbook available before the cover with valid section navigation',()=>{
 const p=blogPostMap['cleaning-business-monthly-expenses'];const html=renderToStaticMarkup(<BlogArticle slug={p.slug} initialArticle={p}/>);
 expect(html.indexOf('/downloads/mybreakeven-cleaning-monthly-budget.xlsx')).toBeLessThan(html.indexOf('article-featured'));
 for(const [id] of p.sectionLinks)expect(html).toContain(`id="${id}"`);
 expect(html).toContain('monthly payroll as committed');expect(p.seoTitle).toBe('Cleaning Business Expenses & Monthly Budget');
});
it('exposes the correct margin-of-safety denominator before the cover without changing the title cohort',()=>{
 const p=blogPostMap['margin-of-safety-business'];const html=renderToStaticMarkup(<BlogArticle slug={p.slug} initialArticle={p}/>);
 expect(html.indexOf('id="margin-of-safety-formulas"')).toBeLessThan(html.indexOf('article-featured'));
 expect(html).toContain('by $18,000, not $12,000');expect(html).toContain('at zero sales');expect(p.seoTitle).toBe('Margin of Safety: Formula and Worked Example');
});
it('corrects the agency operating-versus-net definition and retains the source and calculator boundary',()=>{
 const p=blogPostMap['agency-profit-margin'];const html=renderToStaticMarkup(<BlogArticle slug={p.slug} initialArticle={p}/>);
 expect(html).toContain('35% operating margin');expect(html).toContain('16.67% operating margin');expect(html).not.toContain('Define whether your “net” figure includes');
 expect(html).toContain('https://openstax.org/books/principles-finance/pages/5-1-the-income-statement');expect(html).toContain('not transferred automatically');
 expect(p.seoTitle).toBe('Agency Profit Margin: Formula & Examples');
});
