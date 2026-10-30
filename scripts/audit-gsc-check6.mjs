// Check 6: deterministic generated HTML safeguards; does not claim browser or GSC verification.
import {readFileSync,existsSync} from 'node:fs';
const slugs=['target-profit-sales-formula','contribution-margin-vs-profit-margin','margin-of-safety-business','operating-leverage-small-business','restaurant-budgeting','restaurant-food-cost-percentage'];
const sitemap=readFileSync('dist/sitemap.xml','utf8');
const clean=x=>x.replace(/&amp;/g,'&');
let verified=0;
for(const slug of slugs){
 const file='dist/blogs/'+slug+'/index.html';
 if(!existsSync(file))throw Error('Missing built page: '+slug);
 const h=readFileSync(file,'utf8');
 const canonical='https://mybreakeven.com/blogs/'+slug+'/';
 if(!h.includes('rel="canonical" href="'+canonical+'"'))throw Error('Canonical mismatch '+slug);
 if(!h.includes('<meta name="viewport"'))throw Error('Viewport missing '+slug);
 if(!h.includes('name="robots" content="index,follow'))throw Error('Robots changed '+slug);
 if(!sitemap.includes('<loc>'+canonical+'</loc>'))throw Error('Sitemap missing '+slug);
 if(!h.includes('type="application/ld+json"'))throw Error('Schema missing '+slug);
 const all=[...h.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
 for(const m of all){const schema=JSON.parse(m[1]);if(!schema)throw Error('Schema empty '+slug);}
 const links=[...h.matchAll(/href="(\/(?:blogs|calculators)\/[^"#?]+)"/g)].map(x=>clean(x[1]));
 for(const url of links)if(!sitemap.includes('<loc>https://mybreakeven.com'+url+'</loc>'))throw Error('Internal destination missing '+slug+' -> '+url);
 if(slug==='target-profit-sales-formula'&&!h.includes('70 whole jobs'))throw Error('Target profit example missing');
 if(slug==='contribution-margin-vs-profit-margin'&&!h.includes('40%'))throw Error('Contribution margin reconciliation missing');
 if(slug==='margin-of-safety-business'&&!h.includes('33.33%'))throw Error('Margin of safety example missing');
 if(slug==='operating-leverage-small-business'&&!h.includes('10% sales change'))throw Error('DOL sensitivity missing');
 if(slug==='restaurant-budgeting'){
  if(h.includes('not a separate editable 12-month file'))throw Error('Outdated workbook guidance');
  if(!h.includes('Download editable 12-month Excel workbook'))throw Error('Annual workbook resource link missing');
  if(!existsSync('dist/downloads/restaurant-12-month-budget-template.xlsx'))throw Error('Annual workbook missing');
 }
 if(slug==='restaurant-food-cost-percentage'&&!/inventory formula/i.test(h))throw Error('Inventory method missing');
 verified++;
}
console.log('PASS: Check 6 generated SEO + formula + link assertions for '+verified+' priority pages. Browser mobile/print and Google index verdict remain unverified.');
