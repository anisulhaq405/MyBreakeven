import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import { blogPostMap } from './content/blogs/index.js';
import { industryPages } from './industryCalculatorContent.js';
import { freeTools } from './freeTools.js';
import { industryIntent, decisionIntent } from './searchIntent.js';
import GuideCalculatorLink from './GuideCalculatorLink.jsx';
import BlogArticle from './BlogArticle.jsx';
import { RestaurantResultGuide } from './RestaurantPlanning.jsx';
import { restaurantExamples } from './restaurantExamples.js';
import { calculate } from './engine.js';

describe('Existing-page intent ownership', () => {
  it('assigns all 34 registered tools once and only links to real supporting guides', () => {
    const tools = [...industryIntent.map(([, , tool]) => tool), ...decisionIntent.map(([tool]) => tool)];
    expect([...tools].sort()).toEqual([...Object.keys(industryPages), ...Object.keys(freeTools)].sort());
    expect(new Set(tools).size).toBe(34);
    for (const [, , guides] of decisionIntent) for (const slug of guides) expect(blogPostMap[slug], slug).toBeTruthy();
  });
  it('keeps guide headings distinct from interactive calculators in both article renderers', () => {
    for (const [, guide, calculator, title] of industryIntent) {
      const post = blogPostMap[guide];
      expect(post.title).toBe(title);
      expect(title).not.toMatch(/calculator/i);
      const html = renderToStaticMarkup(<BlogArticle slug={guide} initialArticle={post} />);
      expect(html).toContain(`href="/calculators/${calculator}/"`);
      expect(html.indexOf('Guide and calculator options')).toBeLessThan(html.indexOf('article-featured'));
      expect(html).toContain('opening it does not copy');
    }
    expect(renderToStaticMarkup(<GuideCalculatorLink slug="unrelated" />)).toBe('');
  });
  it('makes the budget download reachable before the image and provides working section anchors', () => {
    const post = blogPostMap['restaurant-budgeting'];
    const html = renderToStaticMarkup(<BlogArticle slug={post.slug} initialArticle={post} />);
    expect(html.indexOf('/downloads/restaurant-monthly-budget-template.xlsx')).toBeLessThan(html.indexOf('article-featured'));
    for (const [id] of post.sectionLinks) expect(html).toContain(`id="${id}"`);
    expect(post.answerHtml).toContain('/calculators/cash-flow-forecast-template/');
    expect(post.answerHtml).toContain('not a dated cash forecast');
  });
  it('connects a restaurant result to its monthly actuals review without changing results', () => {
    const input = restaurantExamples[0].values, result = calculate(input);
    const html = renderToStaticMarkup(<RestaurantResultGuide input={input} result={result} />);
    expect(html).toContain('/blogs/restaurant-budgeting/#budget-download');
    expect(result.wholeJobs).toBe(871);
  });
});
