import fs from 'node:fs/promises';
const date=process.argv[2];
if(!/^\d{4}-\d{2}-\d{2}$/.test(date||''))throw new Error('Supply the actual YYYY-MM-DD publication date. This only prepares source, never deploys.');
if(new Date(date+'T12:00:00Z').toISOString().slice(0,10)!==date)throw new Error('Invalid date');
await fs.writeFile(new URL('../src/day1PlanningRelease.js',import.meta.url),`// Published only after explicit release review.\nexport const day1PlanningRelease = { published: true, date: '${date}' };\n`);
console.log('Source promoted. Run tests, build and audits before any production release.');
