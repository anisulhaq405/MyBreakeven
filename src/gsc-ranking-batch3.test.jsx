import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPostMap} from './content/blogs/index.js';
import {guideTopic} from './novemberTopics.js';
import BlogArticle from './BlogArticle.jsx';
import DiscoveryNextStep,{rankingNextSteps,discoveryNextStep} from './DiscoveryNextStep.jsx';
const pairs=[["restaurant-budgeting","restaurant-sales-forecast"],["calculate-contribution-margin","target-profit-sales-formula"],["break-even-formula-units-dollars","operating-leverage-small-business"],["landscaping-break-even","landscaping-working-capital"]];
describe('ranking-task handoffs between existing intent owners',()=>{
 it('renders four missing reader paths through both article renderers without changing their records',()=>{
  expect(Object.keys(rankingNextSteps).sort()).toEqual(pairs.map(p=>p[0]).sort());
  for(const [source,target] of pairs){
   const p=blogPostMap[source],before=JSON.stringify(p),h=renderToStaticMarkup(<BlogArticle slug={source} initialArticle={p}/>);
   expect(blogPostMap[target]).toBeTruthy();expect(guideTopic(source)).toBeTruthy();expect(guideTopic(target)).toBeTruthy();
   expect(discoveryNextStep(p)).toBe(rankingNextSteps[source]);
   expect(h).toContain(`id="discovery-next-${source}"`);expect(h).toContain(`href="/blogs/${target}/"`);
   const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);expect((h.match(/<h1\b/g)||[])).toHaveLength(1);
   expect(JSON.stringify(p)).toBe(before);
  }
 });
 it('suppresses each new block when a destination already exists in body or review HTML',()=>{
  for(const [source,target]of pairs){const p=blogPostMap[source];
   for(const key of ['html','answerHtml','queryReviewHtml'])expect(renderToStaticMarkup(<DiscoveryNextStep article={{...p,[key]:(p[key]||'')+`<a href="/blogs/${target}/">Existing answer</a>`}}/>)).toBe('');
  }
 });
 it('keeps landscaping in its industry subgroup and documents distinct follow-on questions',()=>{
  expect(guideTopic('landscaping-break-even').groups.filter(g=>g.slugs.includes('landscaping-break-even'))).toHaveLength(1);
  expect(rankingNextSteps['landscaping-break-even'].after).toContain('funding task separate');
  expect(rankingNextSteps['break-even-formula-units-dollars'].after).toContain('ratio is undefined');
  expect(rankingNextSteps['restaurant-budgeting'].after).toContain('check per table separate from spend per guest');
 });
});
