import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { existsSync, statSync } from 'node:fs';
import sharp from 'sharp';
import { calculatorDirectory } from './calculatorDirectory.js';
import { responsiveFeatureProps } from './responsiveFeatureImages.js';
import { FreeToolsHub } from './FreeTools.jsx';
import IndustryPage from './IndustryPage.jsx';
import SecondaryPage from './Pages.jsx';

const industries = calculatorDirectory.filter(([, page]) => page.mode === 'industry');

describe('Responsive industry cover delivery', () => {
  it('ships correctly sized, smaller candidates for every live industry cover', async () => {
    expect(industries).toHaveLength(8);
    for (const [, page] of industries) {
      const smaller = page.image.replace('.webp', '-800.webp');
      const path = `public${smaller}`;
      expect(existsSync(path), smaller).toBe(true);
      const metadata = await sharp(path).metadata();
      expect([metadata.width, metadata.height]).toEqual([800, 450]);
      expect(statSync(path).size).toBeLessThan(statSync(`public${page.image}`).size);
      expect(responsiveFeatureProps(page.image, true).srcSet).toBe(`${smaller} 800w, ${page.image} 1200w`);
    }
  });

  it('renders candidates in the actual directory and every industry page', () => {
    const directory = renderToStaticMarkup(<FreeToolsHub />);
    for (const [slug, page] of industries) {
      const candidates = responsiveFeatureProps(page.image).srcSet;
      expect(directory).toContain(`srcSet="${candidates}"`);
      const markup = renderToStaticMarkup(<IndustryPage slug={slug} />);
      expect(markup).toContain(`srcSet="${candidates}"`);
      expect(markup).toContain('width="1200" height="675"');
    }
  });

  it('does not invent responsive files for an unregistered image', () => {
    expect(responsiveFeatureProps('/images/example-without-variants.webp')).toEqual({});
  });

  it('delivers a smaller existing restaurant-budget feature without changing its fallback', async () => {
    const image = '/images/blog/restaurant-budgeting-editorial.webp';
    const candidate = image.replace('.webp', '-800.webp');
    expect(responsiveFeatureProps(image).srcSet).toContain(candidate);
    const metadata = await sharp(`public${candidate}`).metadata();
    expect([metadata.width, metadata.height]).toEqual([800, 450]);
    expect(statSync(`public${candidate}`).size).toBeLessThan(statSync(`public${image}`).size);
  });

  it('keeps the pricing plan names one level below its page heading', () => {
    const html = renderToStaticMarkup(<SecondaryPage path="/pricing" />);
    expect(html).toContain('<h2>Free</h2>');
    expect(html).toContain('<h2>Pro</h2>');
    expect(html).not.toContain('<h3>Free</h3>');
  });
});
