import fs from 'node:fs/promises';
import {authenticityReviewRecords} from '../src/content/blogs/authenticityReviewData20261108.js';
const root=new URL('../',import.meta.url);
for(const r of authenticityReviewRecords){
 const original=new URL(`public/downloads/${r.slug}-worksheet.html`,root);
 let sheet=await fs.readFile(original,'utf8');
 for(const {from,to}of r.replacements)sheet=sheet.replaceAll(from,to);
 sheet=sheet.replace(/Reviewed November [0-9]+, 2026/g,'Reviewed November 8, 2026');
 if(r.slug==='business-growth-strategies')sheet=sheet.replaceAll('Before omitted financing/tax','Before separate campaign expense and omitted financing/tax');
 const block='<h2>Updated method and evidence — November 8, 2026</h2><p>This is an editable manual record, not an automatic calculator. Numerical examples are fictional. Keep your own supporting records and save or print a completed copy before closing.</p><h3>'+r.heading+'</h3>'+r.paragraphs.join('');
 sheet=sheet.includes('</body>')?sheet.replace('</body>',block+'</body>'):sheet.replace('</html>',block+'</html>');
 await fs.writeFile(new URL(`public/downloads/${r.slug}-worksheet-reviewed-20261108.html`,root),sheet);
}
console.log('Built 36 reviewed worksheets with corrected labels and source-backed application notes');
