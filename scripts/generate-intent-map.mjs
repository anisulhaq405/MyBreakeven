import { writeFile } from 'node:fs/promises';
import { blogPosts } from '../src/content/blogs/index.js';
import { industryPages } from '../src/industryCalculatorContent.js';
import { freeTools } from '../src/freeTools.js';
import { industryIntent, decisionIntent } from '../src/searchIntent.js';

const rows = [{ url: '/', role: 'General interactive calculator', focus: 'small business break-even calculator', next: '/tools/', boundary: 'Industry-specific calculation belongs to its dedicated calculator URL.' }];
for (const [key, guide, calculator] of industryIntent) {
  if (!industryPages[calculator] || !blogPosts.some(p => p.slug === guide)) throw new Error(`Missing industry destination: ${key}`);
  rows.push({ url: `/calculators/${calculator}/`, role: 'Industry interactive calculator', focus: industryPages[calculator].title, next: `/blogs/${guide}/`, boundary: 'Accept inputs and return a monthly volume/capacity result; the guide explains the method.' });
}
for (const [tool, focus, guides] of decisionIntent) {
  if (!freeTools[tool] || guides.some(slug => !blogPosts.some(p => p.slug === slug))) throw new Error(`Missing decision destination: ${tool}`);
  rows.push({ url: `/calculators/${tool}/`, role: tool === 'cash-flow-forecast-template' ? 'Interactive forecast and template' : 'Decision calculator', focus, next: `/blogs/${guides[0]}/`, boundary: freeTools[tool].intro });
}
for (const post of blogPosts) {
  const industry = industryIntent.find(([, guide]) => post.slug === guide);
  const decisions = decisionIntent.filter(([, , guides]) => guides.includes(post.slug));
  rows.push({ url: `/blogs/${post.slug}/`, role: industry ? 'Industry method guide' : 'Explanatory guide / resource', focus: post.seoTitle, next: industry ? `/calculators/${industry[2]}/` : decisions.length ? decisions.map(([tool]) => `/calculators/${tool}/`).join(' ; ') : `/blogs/?q=${encodeURIComponent(post.tag)}`, boundary: post.metaDescription });
}
for (const [path, focus] of [
  ['cleaning-business', 'Cleaning business planning'], ['landscaping-business', 'Landscaping business planning'],
  ['photography-business', 'Photography business planning'], ['agency-business', 'Agency business planning'],
  ['mobile-detailing-business', 'Mobile detailing business planning'], ['ecommerce-business', 'Ecommerce business planning'],
  ['restaurant-business', 'Restaurant business planning'], ['salon-business', 'Salon business planning'],
]) rows.push({ url: `/guides/${path}/`, role: 'Existing industry hub', focus, next: '/tools/', boundary: 'Choose a problem/workflow; do not present the hub as the calculator or a duplicate guide.' });
if (new Set(rows.map(r => r.url)).size !== rows.length) throw new Error('Duplicate intent-map URL');
const cell = value => String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
const text = '# Existing-page search-intent map — October 16, 2026\n\n' +
  `${rows.length} existing destinations: 136 guides, 26 calculators/resources, 8 industry hubs and the home calculator. No new public page or category.\n\n` +
  'Focus phrases are editorial ownership recommendations, not measured keyword volume, difficulty, ranking or proof of cannibalization. “Next destination” records relevance, not a claim that every suggested link is already in the article. A guide can support more than one decision tool without owning its calculator query. Search Console query/page overlap alone does not justify redirects, noindex or merging pages.\n\n' +
  '| Existing URL | Role | Intended topic / query | Relevant next destination | Scope boundary |\n| --- | --- | --- | --- | --- |\n' +
  rows.map(r => `| ${[r.url, r.role, r.focus, r.next, r.boundary].map(cell).join(' | ')} |`).join('\n') + '\n';
await writeFile(new URL('../docs/seo/2026-10-16-intent-map.md', import.meta.url), text);
console.log(JSON.stringify({ mapped: rows.length, guides: blogPosts.length, tools: Object.keys(industryPages).length + Object.keys(freeTools).length }));
