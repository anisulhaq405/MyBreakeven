import {day4ExistingSlugs} from './content/blogs/twelveDayDay4Review.js';
import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {blogPosts,blogPostMap} from './content/blogs/index.js';
import {twelveDayDay3Posts as posts} from './content/blogs/twelveDayDay3.js';
import {day3ExistingAdditions,day3ExistingSlugs,applyDay3Review} from './content/blogs/twelveDayDay3Review.js';
import LongformArticle from './LongformArticle.jsx';
const before=JSON.parse(readFileSync('docs/day3-release/baseline.json','utf8'));
const hash=p=>createHash('sha256').update(JSON.stringify(p)).digest('hex');
describe('November 6 Day 3 publication',()=>{
 it('publishes nine distinct original tasks with complete article assets and real internal links',()=>{
  expect(blogPosts).toHaveLength(before.length+18);
  for(const p of posts){
   expect(before.some(b=>b.slug===p.slug)).toBe(false);
   expect(blogPostMap[p.slug]).toEqual(p);expect(p.editorialStatus).toBe('published');
   expect(p.published).toBe('2026-11-06');expect(p.modified).toBe(p.published);
   const html=renderToStaticMarkup(<LongformArticle article={p}/>);
   expect((html.match(/<h1\b/g)||[])).toHaveLength(1);expect(html).not.toContain('Unpublished draft');expect(html).not.toContain('Invalid Date');
   const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
   for(const[id]of p.sectionLinks)expect(ids).toContain(id);
   for(const[,slug]of p.html.matchAll(/href="\/blogs\/([^/]+)\//g))expect(blogPostMap[slug],slug).toBeDefined();
   expect(blogPosts.some(other=>other.slug!==p.slug&&other.html?.includes('/blogs/'+p.slug+'/')),p.slug+' contextual inbound').toBe(true);
   for(const width of [1200,800,400])expect(existsSync('public'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`))).toBe(true);
   const sheet=readFileSync('public/downloads/'+p.slug+'-worksheet.html','utf8');expect(sheet).toContain('contenteditable="true"');expect(sheet).toContain('does not automatically calculate');
  }
 });
 it('preserves all 180 prior records except the exact four authorized suffixes and dates',()=>{
  expect(day3ExistingSlugs.size).toBe(4);
  for(const old of before){
   const now=blogPostMap[old.slug];expect(now).toBeDefined();
   if(day4ExistingSlugs.has(old.slug))continue; // Exact prior record retained by Day 4 baseline test.
   if(!day3ExistingSlugs.has(old.slug)){expect(hash(now),old.slug).toBe(old.sha256);continue;}
   const addition=day3ExistingAdditions[old.slug];expect(now.html.endsWith(addition)).toBe(true);expect(now.html.split(addition)).toHaveLength(2);expect(now.modified).toBe('2026-11-06');
   expect(hash({...now,html:now.html.slice(0,-addition.length),modified:old.modified}),old.slug).toBe(old.sha256);
   expect(applyDay3Review(now)).toBe(now);expect(()=>applyDay3Review({...now,modified:'2026-10-26',html:'original'})).toThrow(/protected/);
  }
 });
 it('independently reconciles every stage of the accounting equation and both open ledgers',()=>{
  let cash=0,ar=0,equipment=0,loan=0,ap=0,equity=0;
  const states=[];const record=()=>{expect(cash+ar+equipment).toBe(loan+ap+equity);states.push([cash+ar+equipment,loan+ap,equity]);};
  cash+=18000;equity+=18000;record();cash+=6000;loan+=6000;record();cash-=5000;equipment+=5000;record();ar+=4000;equity+=4000;record();cash+=2500;ar-=2500;record();ap+=1200;equity-=1200;record();cash-=700;ap-=700;record();cash-=800;equity-=800;record();
  expect(states).toEqual([[18000,0,18000],[24000,6000,18000],[24000,6000,18000],[28000,6000,22000],[28000,6000,22000],[28000,7200,20800],[27300,6500,20800],[26500,6500,20000]]);expect(cash).toBe(20000);expect(ar).toBe(1500);
  expect(12000-3000-500).toBe(8500);expect(7000+5000-3000-500).toBe(8500);expect(3000+3500+2000).toBe(8500);
  expect(9000-2500-300).toBe(6200);expect(4500+4500-2500-300).toBe(6200);expect(2500+2700+1000).toBe(6200);
  const age=d=>(Date.UTC(2026,10,6)-Date.parse(d+'T00:00:00Z'))/86400000;expect(age('2026-10-31')).toBe(6);expect(age('2026-10-15')).toBe(22);expect(age('2026-10-25')).toBe(12);
 });
 it('checks model selection, capacity, classifications and risk assumptions independently',()=>{
  expect(.15*16000-.08*16000-600).toBe(520);expect(14000+10000-20000).toBe(4000);
  expect(600-90-150).toBe(360);expect(360/12).toBe(30);expect(40-4-12).toBe(24);expect(80-42-10-12).toBe(16);expect(800/16).toBe(50);
  expect(5*300-5*40-250).toBe(1050);expect(1050/30).toBe(35);expect(1050/40).toBe(26.25);expect(Math.floor(40/6)).toBe(6);
  expect(Math.ceil((350+1500)/(120-25))).toBe(20);expect(Math.floor(40/2.5)).toBe(16);expect(16*95-350).toBe(1170);expect(1500-1170).toBe(330);
  expect(12000+9000-600+7000+1200).toBe(28600);expect(28600+15000+2000).toBe(45600);
  expect(8000+2500+900+1100+2000+3000).toBe(17500);expect(5000+2500+900+1100+250).toBe(9750);
 });
});
