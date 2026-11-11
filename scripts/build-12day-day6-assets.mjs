import fs from 'node:fs/promises';
import sharp from 'sharp';
import {twelveDayDay6Posts} from '../src/content/blogs/twelveDayDay6.js';
const root=new URL('../',import.meta.url);
await fs.mkdir(new URL('public/images/title-covers/',root),{recursive:true});
await fs.mkdir(new URL('public/downloads/',root),{recursive:true});
for(const p of twelveDayDay6Posts){
 for(const width of [1200,800,400]){
  const dest=new URL('public'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`),root);
  await sharp(new URL(`docs/day6-release/image-source/${p.slug}.webp`,root).pathname).resize(width,Math.round(width*9/16),{fit:'cover'}).webp({quality:82}).toFile(dest.pathname);
 }
 await fs.copyFile(new URL(`docs/day6-release/downloads/${p.slug}-worksheet.html`,root),new URL(`public/downloads/${p.slug}-worksheet.html`,root));
}
