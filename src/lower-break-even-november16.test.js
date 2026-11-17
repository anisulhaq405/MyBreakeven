// Historical registry scope; current Day 7 integrity has its own full-registry guard.
import {describe,it,expect}from'vitest';
import {readFileSync}from'node:fs';import{createHash}from'node:crypto';
import{blogPostMap,blogPosts}from'./testSupport/day7HistoricalView.js';
import{articleFaq}from'./articleFaq.js';
describe('Lower break-even November 16 decision guide',()=>{
 it('preserves the other 214 articles and the requested URL, image and original publication',()=>{
 const baseline=JSON.parse(readFileSync('docs/lower-break-even-20261116/baseline.json'));
 expect(blogPosts).toHaveLength(baseline.length);for(const b of baseline.filter(b=>b.slug!=='lower-break-even-point'))expect(createHash('sha256').update(JSON.stringify(blogPostMap[b.slug])).digest('hex'),b.slug).toBe(b.sha256);
 const p=blogPostMap['lower-break-even-point'];expect(p.published).toBe('2026-09-23');expect(p.modified).toBe('2026-11-16');expect(p.image).toBe('/images/title-covers/blog-lower-break-even-point-20261026.webp');expect(articleFaq(p).items).toHaveLength(6);for(const {q,a}of p.faq){expect(p.html).toContain(q);expect(p.html).toContain(a);}
 });
 it('checks whole-unit boundaries, price-sensitive fees and constrained mix independently',()=>{
 expect(41*120-5000).toBe(-80);expect(42*120-5000).toBe(40);const c=160*.97-45-.5;expect(c).toBeCloseTo(109.7);expect(55*c-6000).toBeCloseTo(33.5);expect(54*c-6000).toBeCloseTo(-76.2);expect(Math.ceil(5000/75)).toBe(67);expect(Math.ceil(7200/110)).toBe(66);expect(Math.ceil(6000/180)*6).toBe(204);expect(6000/240*9).toBe(225);
 const p=blogPostMap['lower-break-even-point'];const ids=[...p.html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);expect(new Set(ids).size).toBe(ids.length);for(const[,slug]of p.html.matchAll(/href="\/blogs\/([^/]+)\//g))expect(blogPostMap[slug],slug).toBeDefined();expect(p.html).toContain('no finite operating break-even');
 });
});
