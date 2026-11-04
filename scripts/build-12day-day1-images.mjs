import fs from 'node:fs/promises';
import sharp from 'sharp';
import {twelveDayDay1Posts} from '../src/content/blogs/twelveDayDay1.js';
const manifest=JSON.parse(await fs.readFile(new URL('../docs/content/2026-11-03-day1-image-generation.json',import.meta.url),'utf8'));
const report=[];
for(let i=0;i<manifest.length;i++){
 const m=manifest[i],p=twelveDayDay1Posts[i];
 const master=new URL('../public'+p.image,import.meta.url);
 await fs.mkdir(new URL('.',master),{recursive:true});
 for(const width of [1200,800,400]){
  const target=width===1200?master:new URL(master.href.replace('.webp',`-${width}.webp`));
  const info=await sharp(m.source).resize(width,Math.round(width*9/16),{fit:'cover'}).webp({quality:85,effort:6}).toFile(target.pathname);
  if(info.size>250000)throw Error('Asset exceeds size budget '+p.slug);
  report.push({id:m.id,slug:p.slug,path:target.pathname,width:info.width,height:info.height,bytes:info.size,alt:p.alt});
 }
}
await fs.writeFile(new URL('../docs/content/2026-11-03-day1-image-delivery.json',import.meta.url),JSON.stringify(report,null,2));
console.log(JSON.stringify({covers:manifest.length,assets:report.length,totalBytes:report.reduce((n,a)=>n+a.bytes,0)}));
