import fs from 'node:fs/promises';
import sharp from 'sharp';
import {twelveDayDay5Posts} from '../src/content/blogs/twelveDayDay5.js';
const root=new URL('../',import.meta.url);
for(const dir of ['public/images/title-covers/','public/images/diagrams/','public/downloads/'])await fs.mkdir(new URL(dir,root),{recursive:true});
for(const p of twelveDayDay5Posts){
 for(const width of [1200,800,400]){
  const dest=new URL('public'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`),root);
  await sharp(new URL(`docs/day5-release/image-source/${p.slug}.webp`,root).pathname).resize(width,Math.round(width*9/16),{fit:'cover'}).webp({quality:82}).toFile(dest.pathname);
 }
 await fs.copyFile(new URL(`docs/day5-release/downloads/${p.slug}-worksheet.html`,root),new URL(`public/downloads/${p.slug}-worksheet.html`,root));
}
