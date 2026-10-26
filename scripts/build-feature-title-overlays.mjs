import sharp from 'sharp';
import {readFile,writeFile,mkdir,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const root=new URL('../',import.meta.url);
const manifest=JSON.parse(await readFile(new URL('./data/feature-title-overlays-20261026.json',import.meta.url),'utf8'));
const selected=process.argv.includes('--sample')?manifest.filter(r=>[12,63,161].includes(r.index)):manifest;
const xml=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const report=[];
for(const item of selected){
 const source=await readFile(new URL('public'+item.image.split('?')[0],root));
 if(createHash('sha256').update(source).digest('hex')!==item.sourceSha256)throw new Error('Original changed: '+item.image);
 if(item.decision==='preserve-existing-title')continue;
 if(!process.argv.includes('--force')) {
  const exists=await Promise.all([1200,800,400].map(size=>access(new URL('public'+item.output.replace('.webp',size===1200?'.webp':`-${size}.webp`),root)).then(()=>true,()=>false)));
  if(exists.every(Boolean))continue;
 }
 const width=item.outputWidth,height=item.outputHeight;
 // Resize uniformly, never crop, recolor or regenerate any part of the existing scene.
 const original=await sharp(source).resize({width}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const title=await sharp({text:{text:`<span foreground="white">${xml(item.coverTitle)}</span>`,font:'DejaVu Sans Bold 58',width:width-128,spacing:6,rgba:true}}).png().toBuffer({resolveWithObject:true});
 if(title.info.height>200)throw new Error('Title too tall: '+item.slug);
 const top=height-Math.round(height*.12)-title.info.height;
 const bandTop=Math.min(top-30,Math.round(height*.53));
 const band=Buffer.from(`<svg width="${width}" height="${height}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#081c2e" stop-opacity="0"/><stop offset=".45" stop-color="#081c2e" stop-opacity=".65"/><stop offset="1" stop-color="#081c2e" stop-opacity=".94"/></linearGradient></defs><rect y="${bandTop}" width="${width}" height="${height-bandTop}" fill="url(#g)"/></svg>`);
 const composed=await sharp(original.data,{raw:original.info}).composite([{input:band},{input:title.data,left:64,top}]).raw().toBuffer();
 // Pixel check before delivery encoding: pixels above the title layer are unchanged.
 const unchangedBytes=bandTop*width*4;
 if(!original.data.subarray(0,unchangedBytes).equals(composed.subarray(0,unchangedBytes)))throw new Error('Unexpected scene edit: '+item.slug);
 await mkdir(new URL('public/images/title-covers/',root),{recursive:true});
 const sizes=[];let master;
 for(const size of [1200,800,400]){
  const name=item.output.replace('.webp',size===1200?'.webp':`-${size}.webp`);
  const input=size===1200?sharp(composed,{raw:original.info}):sharp(master);
  const output=await input.resize({width:size}).webp({quality:86,effort:6}).toBuffer({resolveWithObject:true});
  if(size===1200)master=output.data;
  if(output.info.size>250000)throw new Error('Oversized delivery asset: '+name);
  await writeFile(new URL('public'+name,root),output.data);sizes.push({width:size,height:output.info.height,bytes:output.info.size});
 }
 report.push({slug:item.slug,title:item.coverTitle,preservedPixelsAbove:bandTop,sizes});
}
if(!process.argv.includes('--sample') && report.length===177){
 await writeFile(new URL('scripts/data/feature-title-overlay-build.json',root),JSON.stringify(report,null,2)+'\n');
}
console.log(JSON.stringify({covers:report.length,files:report.length*3,bytes:report.reduce((s,r)=>s+r.sizes.reduce((a,b)=>a+b.bytes,0),0)}));
