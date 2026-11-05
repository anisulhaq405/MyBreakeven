import fs from 'node:fs/promises';
import sharp from 'sharp';
import {twelveDayDay2Drafts} from '../src/content/blogs/twelveDayDay2.js';
const root=new URL('../',import.meta.url);
await fs.mkdir(new URL('public/images/title-covers/',root),{recursive:true});
await fs.mkdir(new URL('public/images/diagrams/',root),{recursive:true});
await fs.mkdir(new URL('public/downloads/',root),{recursive:true});
for(const p of twelveDayDay2Drafts){
 const source=new URL(`docs/day2-review/image-source/${p.slug}.webp`,root);
 for(const width of [1200,800,400]){
  const dest=new URL('public'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`),root);
  await sharp(source.pathname).resize(width,Math.round(width*9/16),{fit:'cover'}).webp({quality:84}).toFile(dest.pathname);
 }
 const sheet=await fs.readFile(new URL(`docs/day2-review/downloads/${p.slug}-worksheet.html`,root),'utf8');
 await fs.writeFile(new URL(`public/downloads/${p.slug}-worksheet.html`,root),sheet.replace('Prepared 4 November 2026','Published 5 November 2026'));
}
for(const name of ['day2-landscaping-cash-gap.svg','day2-feasibility-capacity.svg','day2-growth-capacity-cost.svg']){
 await fs.copyFile(new URL('docs/day2-review/diagrams/'+name,root),new URL('public/images/diagrams/'+name,root));
}
