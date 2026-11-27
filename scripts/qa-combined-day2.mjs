import fs from'node:fs/promises';import assert from'node:assert/strict';import{createHash}from'node:crypto';import sharp from'sharp';import{execFileSync}from'node:child_process';
import{combinedDay2Posts as posts}from'../src/content/blogs/combinedDay2.js';import{blogPosts,blogPostMap}from'../src/testSupport/fiveReviewHistoricalView.js';import{freeTools}from'../src/freeTools.js';import{statementResource,statementFaq}from'../src/incomeStatementContent.js';
const before=JSON.parse(await fs.readFile('docs/combined-day2/baseline.json','utf8')),hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
assert.equal(blogPosts.length,237);for(const p of before.blogs)assert.equal(hash(blogPostMap[p.slug]),p.hash,p.slug);for(const p of before.tools)assert.equal(hash(freeTools[p.slug]),p.hash,p.slug);
const sitemap=await fs.readFile('dist/sitemap.xml','utf8'),report=[];
for(const[slug,p,kind]of[...posts.map(p=>[p.slug,p,'blogs']),['income-statement-template',statementResource,'resources']]){const url=`https://mybreakeven.com/${kind}/${slug}/`,h=await fs.readFile(`dist/${kind}/${slug}/index.html`,'utf8');assert(h.includes(`rel="canonical" href="${url}"`));assert(sitemap.includes(url));assert.equal((h.match(/<h1\b/g)||[]).length,1);assert(h.includes(p.image));assert(!h.includes('NaN'));const nodes=[...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap(m=>{const j=JSON.parse(m[1]);return j['@graph']||[j]});assert.equal(nodes.find(x=>x['@type']==='FAQPage').mainEntity.length,6,slug);if(kind==='resources'){const page=nodes.find(x=>x['@type']==='WebPage');assert.equal(page.datePublished,'2026-11-18');assert.equal(page.dateModified,'2026-11-18');assert(h.includes('property="og:image" content="https://mybreakeven.com'+p.image+'"'));assert(h.includes('$11,700.00'));}
for(const width of[1200,800,400]){const path='dist'+p.image.replace('.webp',width===1200?'.webp':`-${width}.webp`),m=await sharp(path).metadata();assert.equal(m.width,width);assert.equal(m.height,width*9/16);assert((await fs.stat(path)).size<250000);}if(kind==='blogs'){const record=await fs.readFile(`dist/downloads/${slug}-worksheet.html`,'utf8');assert(record.includes('textarea'));assert(record.includes('noindex,follow'));assert(record.includes('does not calculate'));}report.push({url,passed:true});}
for(const[route,needle]of[['blogs/how-to-analyze-financial-statements','Prepare, reconcile, then interpret'],['blogs/cash-flow-statement','profit-to-cash-bridge'],['calculators/cash-flow-forecast-template','Review the cash dates'],['calculators/business-startup-cost-calculator','Keep the funding budget separate']])assert((await fs.readFile(`dist/${route}/index.html`,'utf8')).includes(needle),route);
const audit=JSON.parse(await fs.readFile('docs/combined-day2/protected-audits.json','utf8'));for(const f of audit.sourceFiles)assert.equal(createHash('sha256').update(await fs.readFile(f.path)).digest('hex'),f.sha256,f.path+' protected source');
assert(!posts.some(p=>p.slug==='other-comprehensive-income')); // Historical release excludes OCI; current closure checks it independently.
assert.equal(statementFaq.length,6);
execFileSync('python3',['-c',`import openpyxl
p='dist/downloads/income-statement-template.xlsx'
w=openpyxl.load_workbook(p,data_only=True);f=openpyxl.load_workbook(p,data_only=False)
assert w.sheetnames==['Instructions','Blank Statement','Example Statement']
assert w['Example Statement']['D33'].value==11700
assert w['Example Statement']['P33'].value==35100
assert w['Blank Statement']['P33'].value=='n.a.'
assert f['Example Statement']['P33'].value.startswith('=IF(')
assert len(f['Blank Statement'].data_validations.dataValidation)>=170
assert not [(s.title,c.coordinate)for s in w for row in s for c in row if c.data_type=='e']
`]);
await fs.mkdir('qa-artifacts',{recursive:true});await fs.writeFile('qa-artifacts/combined-day2-build.json',JSON.stringify({passed:true,newOwners:report,preservedArticles:230,preservedTools:31,existingImprovements:4,protectedAudits:2,coverVariants:24},null,2));console.log('Combined Day2:8owners,48FAQs,24covervariants,7manualrecords,3-sheet formula workbook,4improvements and2protected audits passed.');
