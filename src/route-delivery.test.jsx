import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, it, expect } from 'vitest';
import SecondaryPage from './Pages.jsx';
import { blogPosts } from './content/blogs/index.js';
import { freeTools } from './freeTools.js';
import { industryPages } from './industryCalculatorContent.js';
import { staticPageMeta } from './staticPageMeta.js';
import { calculatorDirectory as fullDirectory } from './calculatorDirectory.js';
import { calculatorDirectory, calculatorCounts } from './calculatorDirectoryData.js';
import { routeEntryForPath } from './routeEntries.js';
import { loadSecondaryRoute, loadSecondaryRouteData } from './routeLoaders.js';

// Component boundaries may change React's generated useId token, not its associations.
const normalizeIds = html => html.replace(/_R_[^_]+_/g, '_R_generated_');
describe('Route-specific browser delivery', () => {
  it('preserves visible markup for every public article, calculator and supporting route', async () => {
    const cases = [
      ...blogPosts.map(article => [`/blogs/${article.slug}`, article]),
      ...Object.keys(freeTools).map(slug => [`/calculators/${slug}`]),
      ...Object.keys(industryPages).map(slug => [`/calculators/${slug}`]),
      ...Object.keys(staticPageMeta).filter(path => !/^(login|signup|forgot-password|reset-password|dashboard)$/.test(path)).map(path => [`/${path}`]),
    ];
    for (const [path, initialArticle] of cases) {
      const { default: Page } = await loadSecondaryRoute(path);
      await loadSecondaryRouteData(path);
      const before = renderToStaticMarkup(<SecondaryPage path={path} initialArticle={initialArticle} />);
      const after = renderToStaticMarkup(<Page path={path} initialArticle={initialArticle} />);
      expect(normalizeIds(after), path).toBe(normalizeIds(before));
    }
  }, 15000); // This single check renders every public route twice.
  it('assigns separate bundles to pages that do not need calculator engines', () => {
    expect(routeEntryForPath('/blogs/restaurant-budgeting/')).toBe('src/routes/BlogRoute.jsx');
    expect(routeEntryForPath('/tools/')).toBe('src/routes/DirectoryRoute.jsx');
    expect(routeEntryForPath('/pricing/')).toBe('src/routes/GeneralRoute.jsx');
    expect(routeEntryForPath('/calculators/recipe-cost-calculator/')).toBe('src/routes/FoodToolRoute.jsx');
    expect(routeEntryForPath('/calculators/employee-cost-calculator/')).toBe('src/routes/PlanningToolRoute.jsx');
    expect(routeEntryForPath('/login/')).toBe('src/routes/AccountRoute.jsx');
    expect(routeEntryForPath('/')).toBe('src/main.jsx');
  });
  it('keeps generated directory cards and pricing counts synchronized with all tools', () => {
    expect(calculatorCounts).toEqual({industry:Object.keys(industryPages).length,tools:Object.keys(freeTools).length});
    expect(calculatorDirectory).toEqual(fullDirectory.map(([slug, page]) => [slug, Object.fromEntries(
      ['name','category','intro','mode','image','alt','theme'].map(key => [key,page[key]])
    )]));
    expect(JSON.stringify(calculatorDirectory)).not.toContain('defaults');
  });
});
