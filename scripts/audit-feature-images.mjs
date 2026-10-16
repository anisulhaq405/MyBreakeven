import fs from 'node:fs';
import crypto from 'node:crypto';
import sharp from 'sharp';
import {blogPosts} from '../src/content/blogs/index.js';
import {freeTools} from '../src/freeTools.js';
import {calculatorDirectory} from '../src/calculatorDirectory.js';
const records=[...blogPosts.map(p=>({type:'blog',slug:p.slug,image:p.image})),...Object.entries(freeTools).map(([slug,p])=>({type:'calculator',slug,image:p.image})),...calculatorDirectory.filter(([,p])=>p.mode==='industry').map(([slug,p])=>({type:'industry',slug,image:p.image}))];
const groups=new Map(),missing=[];
for(const record of records){
 const path=`public${record.image}`;
 if(!fs.existsSync(path)){missing.push(record);continue;}
 const pixel=await sharp(path).resize(128,72,{fit:'fill'}).removeAlpha().raw().toBuffer();
 const hash=crypto.createHash('sha256').update(pixel).digest('hex');
 const group=groups.get(hash)||[];group.push(record);groups.set(hash,group);
}
const duplicates=[...groups.values()].filter(g=>g.length>1);
const report={checked:records.length,missing,duplicates};
console.log(JSON.stringify(report,null,2));
if(missing.length||duplicates.length)process.exitCode=1;
