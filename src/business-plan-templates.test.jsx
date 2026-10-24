import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {existsSync,statSync} from 'node:fs';
import BusinessPlanTemplatePage from './BusinessPlanTemplatePage.jsx';
import {businessPlanTemplates} from './businessPlanTemplates.js';
import {staticPageMeta} from './staticPageMeta.js';
import {routeEntryForPath} from './routeEntries.js';
import {blogPostMap} from './content/blogs/index.js';
describe('Three missing business-plan resources',()=>{
 it('publishes each canonical owner with real downloads, distinct examples and resolved section anchors',()=>{
  for(const [key,p]of Object.entries(businessPlanTemplates)){
   const route=`resources/${key}-business-plan-template`,h=renderToStaticMarkup(<BusinessPlanTemplatePage route={route}/>);
   expect(staticPageMeta[route][3]).not.toBe(true);expect(routeEntryForPath('/'+route)).toBe('src/routes/AuthorityRoute.jsx');
   expect(h).toContain(p.name);expect((h.match(/<h1/g)||[]).length).toBe(1);
   const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
   for(const [,id]of h.matchAll(/href="#([^"]+)"/g))expect(ids).toContain(id);
   for(const [,file]of h.matchAll(/(?:href|src)="(\/(?:downloads|images)\/[^"?]+)[^"]*"/g)){expect(existsSync('public'+file),file).toBe(true);expect(statSync('public'+file).size).toBeGreaterThan(1000);}
   expect(h).toContain('January–December 2027');expect(h).toContain('fictional');expect(h).not.toContain('Unpublished draft');
  }
 });
 it('makes each new owner discoverable from its specialist articles',()=>{
  for(const [slug,key]of [['landscaping-seasonal-break-even','landscaping'],['agency-retainer-pricing','agency'],['ecommerce-profit-margin','ecommerce']])expect(blogPostMap[slug].html).toContain(`/resources/${key}-business-plan-template/`);
 });
});
