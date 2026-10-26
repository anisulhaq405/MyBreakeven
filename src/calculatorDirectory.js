import {titledFeatureImage} from './featureTitleCovers.js';
import { freeTools } from './freeTools.js';
import { industryPages } from './industryCalculatorContent.js';
import { toolThemes } from './toolThemes.js';
import { industries } from './industries.js';

// All entries point to existing pages. Keep the current decision filters.
export const calculatorDirectory = [
  ...Object.entries(industryPages).map(([slug, page]) => [slug, {
    name: page.title, category: `${industries[page.key].short} planning`, intro: page.lead,
    mode: 'industry', image: titledFeatureImage(slug,`/images/tools/${page.key}-break-even-feature-20261016.webp`,'calculator'),
    alt: `${industries[page.key].short} break-even planning`, theme: toolThemes[page.key],
  }]),
  ...Object.entries(freeTools),
];

export { matchesCalculatorSearch } from './calculatorSearch.js';
