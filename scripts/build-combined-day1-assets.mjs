import fs from 'node:fs/promises';
import sharp from 'sharp';
const root=new URL('../',import.meta.url),slugs=['cd-calculator','apy-calculator','small-business-valuation','business-expansion','customer-acquisition-cost','gross-profit-gross-margin','differential-cost','net-revenue'];
await fs.mkdir(new URL('public/images/title-covers/',root),{recursive:true});
await fs.mkdir(new URL('public/downloads/',root),{recursive:true});
for(const slug of slugs){
 for(const width of [1200,800,400])await sharp(new URL(`docs/combined-day1/image-source/${slug}.webp`,root).pathname).resize(width,Math.round(width*9/16)).webp({quality:82}).toFile(new URL(`public/images/title-covers/combined-day1-${slug}-20261117${width===1200?'':'-'+width}.webp`,root).pathname);
 if(!slug.endsWith('calculator'))await fs.copyFile(new URL(`docs/combined-day1/downloads/${slug}-worksheet.html`,root),new URL(`public/downloads/${slug}-worksheet.html`,root));
}
