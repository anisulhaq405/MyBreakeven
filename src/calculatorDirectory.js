import {titledFeatureImage} from './featureTitleCovers.js';
import { freeTools } from './freeTools.js';
import { industryPages } from './industryCalculatorContent.js';
import { toolThemes } from './toolThemes.js';
import { industries } from './industries.js';

// Registries append new calculators. Show the latest additions first in every directory view.
// Reverse only this new directory array; preserve source records and decision filters.
export const calculatorDirectory = [
  ...Object.entries(industryPages).map(([slug, page]) => [slug, {
    name: page.title, category: `${industries[page.key].short} planning`, intro: page.lead,
    mode: 'industry', image: titledFeatureImage(slug,`/images/tools/${page.key}-break-even-feature-20261016.webp`,'calculator'),
    alt: `${industries[page.key].short} break-even planning`, theme: toolThemes[page.key],
  }]),
  ...Object.entries(freeTools),
].reverse();

export { matchesCalculatorSearch } from './calculatorSearch.js';
