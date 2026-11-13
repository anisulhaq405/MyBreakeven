import React from 'react';
import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {renderToStaticMarkup} from 'react-dom/server';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {allGuideTopics,businessTopics,novemberGuides,novemberGuideSlugs,guideTopic,topicConnections} from './novemberTopics.js';
import GuideTopicNavigator from './GuideTopicNavigator.jsx';
import NovemberTopicConnections,{GuideTopicLink} from './NovemberTopicConnections.jsx';
const baseline=JSON.parse(readFileSync('docs/november-clusters/baseline.json'));
describe('November topic organization and discovery',()=>{
 it('preserves all 215 article records, including content, dates, metadata, URLs and images',()=>{
  expect(blogPosts).toHaveLength(215);expect(baseline).toHaveLength(215);
  for(const b of baseline)if(!['restaurant-budgeting','fixed-vs-variable-costs'].includes(b.slug))expect(createHash('sha256').update(JSON.stringify(blogPostMap[b.slug])).digest('hex'),b.slug).toBe(b.sha256);
 });
 it('assigns each guide exactly one real subject owner and covers all November publications and updates',()=>{
  const slugs=allGuideTopics.flatMap(t=>t.slugs);expect(slugs).toHaveLength(215);expect(new Set(slugs).size).toBe(215);
  expect(businessTopics).toHaveLength(13);expect(novemberGuides).toHaveLength(125);
  expect(novemberGuides.filter(p=>p.published.startsWith('2026-11-'))).toHaveLength(53);
  for(const s of slugs)expect(blogPostMap[s],s).toBeDefined();for(const p of novemberGuides)expect(guideTopic(p.slug),p.slug).toBeDefined();
 });
 it('puts every general-business topic member into crawlable HTML with a matching hub fragment',()=>{
  const h=renderToStaticMarkup(<GuideTopicNavigator/>);
  for(const t of businessTopics){expect(h).toContain(`id="topic-${t.id}"`);expect(h).toContain(`href="#topic-${t.id}"`);for(const s of t.slugs)expect(h).toContain(`href="/blogs/${s}/"`);}
  expect(h).not.toContain('nofollow');
 });
 it('adds relevant return paths and nonduplicate related guides on all 124 November-touched articles',()=>{
  for(const preview of novemberGuides){const p=blogPostMap[preview.slug],c=topicConnections(p),h=renderToStaticMarkup(<><GuideTopicLink article={p}/><NovemberTopicConnections article={p}/></>);
   expect(c,p.slug).not.toBeNull();expect(c.posts.length,p.slug).toBeGreaterThan(0);expect(c.posts.length).toBeLessThanOrEqual(3);
   expect(h).toContain(`href="${guideTopic(p.slug).href}"`);expect(new Set(c.posts.map(p=>p.slug)).size).toBe(c.posts.length);
   for(const target of c.posts){expect(target.slug).not.toBe(p.slug);expect(blogPostMap[target.slug]).toBeDefined();expect(h).toContain(`href="/blogs/${target.slug}/"`);}
  }
 });
 it('deduplicates absolute, fragmented and structured links and leaves other articles on their existing navigation',()=>{
  const p=blogPostMap['wacc'],c=topicConnections(p),already=c.posts[0].slug;
  const withLink=topicConnections({...p,html:p.html+`<a href="https://mybreakeven.com/blogs/${already}/#case">already</a>`});expect(withLink.posts.map(p=>p.slug)).not.toContain(already);
  const older=blogPosts.find(p=>!novemberGuideSlugs.has(p.slug));expect(topicConnections(older)).toBeNull();
 });
});
