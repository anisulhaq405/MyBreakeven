import {describe,it,expect} from 'vitest';
import {titledFeatureImage} from './featureTitleCovers.js';
import manifest from '../scripts/data/feature-title-overlays-20261026.json';
describe('Audited feature title scope',()=>{
 it('changes exactly the audited 177 covers and preserves the 21 titled covers',()=>{
  for(const row of manifest)expect(titledFeatureImage(row.slug,row.image,row.type)).toBe(row.output||row.image);
 });
 it('preserves covers on future pages outside this audit',()=>{
  expect(titledFeatureImage('future-business-guide','/images/blog/new.webp')).toBe('/images/blog/new.webp');
  expect(titledFeatureImage('future-calculator','/images/tools/new.webp','calculator')).toBe('/images/tools/new.webp');
 });
});
