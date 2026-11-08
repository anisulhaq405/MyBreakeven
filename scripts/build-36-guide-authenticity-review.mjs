// Generate the reviewed content manifest from the dated editorial records.
import fs from 'node:fs/promises';
const records=[];
for(let day=1;day<=4;day++)records.push(...JSON.parse(await fs.readFile(new URL(`../docs/36-guide-authenticity-review/day${day}-patches.json`,import.meta.url),'utf8')));
if(records.length!==36||new Set(records.map(p=>p.slug)).size!==36)throw Error('Expected 36 unique reviewed guides');
await fs.writeFile(new URL('../src/content/blogs/authenticityReviewData20261108.js',import.meta.url),'// Generated from docs/36-guide-authenticity-review/day*-patches.json.\nexport const authenticityReviewRecords = '+JSON.stringify(records,null,2)+';\n');
