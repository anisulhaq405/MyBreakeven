import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { statSync } from 'node:fs';
import sharp from 'sharp';
import { describe, it, expect } from 'vitest';
import { featureDeliveryAssets } from './featureDeliveryAssets.js';
import { blogPosts } from './content/blogs/index.js';
import { responsiveFeatureProps } from './responsiveFeatureImages.js';
import LongformArticle from './LongformArticle.jsx';

describe('Heavy article image delivery', () => {
  it('serves real, smaller correctly sized copies for all ten flagged articles', async () => {
    expect(Object.keys(featureDeliveryAssets)).toHaveLength(10);
    for (const [original, image] of Object.entries(featureDeliveryAssets)) {
      const article = blogPosts.find(post => post.image === image);
      expect(article, image).toBeTruthy();
      expect(statSync('public'+image).size).toBeLessThan(statSync('public'+original).size);
      for (const [path, width, height] of [[image,1200,675],[image.replace('.webp','-800.webp'),800,450]]) {
        const meta = await sharp('public'+path).metadata();
        expect([meta.width,meta.height]).toEqual([width,height]);
        expect(statSync('public'+path).size).toBeLessThan(250000);
      }
      const html = renderToStaticMarkup(<LongformArticle article={article} />);
      expect(html).toContain(`srcSet="${responsiveFeatureProps(image).srcSet}"`);
      expect(html).not.toContain(`src="${original}"`);
    }
  });
});
