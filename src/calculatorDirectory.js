import { freeTools } from './freeTools.js';
import { industryPages } from './industryCalculatorContent.js';
import { toolThemes } from './toolThemes.js';
import { industries } from './industries.js';

// All entries point to existing pages. Keep the current decision filters.
export const calculatorDirectory = [
  ...Object.entries(industryPages).map(([slug, page]) => [slug, {
    name: page.title, category: `${industries[page.key].short} planning`, intro: page.lead,
    mode: 'industry', image: `/images/tools/${page.key}-break-even.webp`,
    alt: `${industries[page.key].short} break-even planning`, theme: toolThemes[page.key],
  }]),
  ...Object.entries(freeTools),
];

// Hyphens and spaces should not hide an existing calculator from a search.
export function matchesCalculatorSearch(tool, query) {
  const normalize = value => String(value).toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');
  return normalize(`${tool.name} ${tool.category} ${tool.intro}`).includes(normalize(query));
}
