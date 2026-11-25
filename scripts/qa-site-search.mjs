import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {prepareSearchDocuments,searchSite} from '../src/siteSearch.js';
const index=JSON.parse(await fs.readFile('dist/site-search-index.json','utf8'));
const documents=prepareSearchDocuments(index.documents),urls=new Set(documents.map(d=>d.url));
assert.equal(index.version,1);assert.equal(urls.size,documents.length);assert((await fs.stat('dist/site-search-index.json')).size<6000000);
const sitemap=await fs.readFile('dist/sitemap.xml','utf8');
for(const [,url]of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g))assert(urls.has(new URL(url).pathname),url);
for(const d of documents){assert(d.url.startsWith('/')&&!d.url.startsWith('//'));assert(!/^\/(search|login|signup|dashboard|reset-password|forgot-password)(\/|$)/.test(d.url));const [path,fragment]=d.url.split('#'),html=await fs.readFile('dist'+path+'index.html','utf8');assert(!/<meta name="robots" content="[^"]*noindex/.test(html));if(fragment)assert(html.includes(`id="${fragment}"`));assert(d.title&&d.summary&&d.text);}
for(const query of ['payroll','inventory valuation','cash flow','ROAS','margin markup','startup loans','recruitment','BEP','COGS','return on ad spend','DTI'])assert(searchSite(documents,query).length>0,query);
for(const kind of ['Guide','Calculator','Topic'])assert(searchSite(documents,'payroll').some(d=>d.kind===kind),kind);
assert.equal(searchSite(documents,'business loans')[0].url,'/blogs/business-loans/');
assert(searchSite(documents,'reimbursement').some(d=>d.url==='/blogs/small-business-grants/'));
assert(!urls.has('/blogs/other-comprehensive-income/'));
const page=await fs.readFile('dist/search/index.html','utf8');assert(page.includes('content="noindex,follow"'));assert(!sitemap.includes('/search/'));assert(page.includes('Search the entire site'));assert(page.includes('data-prerendered="true"'));
for(const path of ['/','/blogs/','/tools/','/blogs/business-loans/','/calculators/employee-cost-calculator/'])assert((await fs.readFile('dist'+path+'index.html','utf8')).includes('aria-label="Search the entire site"'),path);
console.log(`Site search passed: ${documents.length} public documents, all sitemap pages covered, public-only content, ranked queries, index size, crawl settings and shared entry points.`);
