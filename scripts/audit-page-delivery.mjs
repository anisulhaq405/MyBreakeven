import { readFile, writeFile, readdir, stat, mkdir } from 'node:fs/promises';
import { gzipSync } from 'node:zlib';
import { routeEntryForPath } from '../src/routeEntries.js';

const options = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) => value.startsWith('--') ? [...pairs, [value.slice(2), all[i+1]]] : pairs, []));
const baseline = options.baseline ? JSON.parse(await readFile(options.baseline, 'utf8')) : [];
const previous = new Map(baseline.map(row => [row.url, row]));
const root = new URL('../dist/', import.meta.url), rows = [], sizes = new Map();
const gzipBytes = async paths => {
  let total = 0;
  for (const path of paths) {
    if (!sizes.has(path)) sizes.set(path, gzipSync(await readFile(new URL(path.slice(1), root)), {level:9}).length);
    total += sizes.get(path);
  }
  return total;
};
async function visit(directory) {
  for (const entry of await readdir(directory, {withFileTypes:true})) {
    const file = new URL(entry.name + (entry.isDirectory() ? '/' : ''), directory);
    if (entry.isDirectory()) { await visit(file); continue; }
    if (entry.name !== 'index.html') continue;
    const html = await readFile(file, 'utf8'), js = new Set(), css = new Set();
    const url = '/' + file.pathname.slice(root.pathname.length).replace(/index\.html$/, '');
    for (const tag of html.match(/<(?:link|script)\b[^>]+>/g) || []) {
      const attrs = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(match => [match[1],match[2]]));
      const path = attrs.href || attrs.src;
      if (!path?.startsWith('/assets/')) continue;
      if (attrs.rel === 'stylesheet') css.add(path);
      if (attrs.rel === 'modulepreload' || tag.startsWith('<script')) js.add(path);
    }
    const imageIssues = [];
    let images = 0, responsive = 0;
    for (const tag of html.match(/<img\b[^>]+>/g) || []) {
      const a = Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map(m => [m[1],m[2]]));
      images++; if (a.srcSet || a.srcset) responsive++;
      if (!a.width || !a.height) imageIssues.push(`Missing dimensions: ${a.src}`);
      if (a.src?.startsWith('/') && !a.src.startsWith('//')) {
        const source = new URL(a.src.split('?')[0].slice(1), root);
        try { if ((await stat(source)).size > 250000 && !a.loading?.includes('lazy')) imageIssues.push(`Large eager fallback (>250KB): ${a.src}`); }
        catch { imageIssues.push(`Missing image: ${a.src}`); }
      }
    }
    const before = previous.get(url), jsBytes = await gzipBytes(js), cssBytes = await gzipBytes(css);
    rows.push({url,entry:routeEntryForPath(url),html_bytes:Buffer.byteLength(html),js_gzip_bytes:jsBytes,css_gzip_bytes:cssBytes,
      js_before:before?.js_gzip_bytes ?? null,css_before:before?.css_gzip_bytes ?? null,
      js_reduction_pct:before ? Math.round((1-jsBytes/before.js_gzip_bytes)*1000)/10 : null,
      css_reduction_pct:before ? Math.round((1-cssBytes/before.css_gzip_bytes)*1000)/10 : null,
      images,responsive_images:responsive,image_issues:imageIssues,css_files:[...css],js_files:[...js]});
  }
}
await visit(root);
rows.sort((a,b)=>a.url.localeCompare(b.url));
const summary = {pages:rows.length,baseline_pages:baseline.length,pages_with_less_declared_js:rows.filter(r=>r.js_before!==null&&r.js_gzip_bytes<r.js_before).length,
  pages_with_less_declared_css:rows.filter(r=>r.css_before!==null&&r.css_gzip_bytes<r.css_before).length,image_issues:rows.flatMap(r=>r.image_issues.map(issue=>({url:r.url,issue})))};
const regressions = rows.filter(row => row.js_before !== null && (
  row.js_gzip_bytes > row.js_before * 0.9 || row.css_gzip_bytes > row.css_before * 1.03
)).map(row => row.url);
summary.delivery_budget_failures = regressions;
const output = options.output || 'docs/seo/2026-10-16-page-delivery';
await mkdir(output.slice(0,output.lastIndexOf('/')) || '.', {recursive:true});
await writeFile(output+'.json',JSON.stringify({summary,pages:rows},null,2)+'\n');
const kib = bytes => bytes===null ? '—' : (bytes/1024).toFixed(1);
await writeFile(output+'.md','# Per-page delivery audit — October 16, 2026\n\n'+
  `${summary.pages} generated pages checked. ${summary.pages_with_less_declared_js} have less declared initial JavaScript; ${summary.pages_with_less_declared_css} have less declared CSS than the saved pre-split build.\n\n`+
  'Sizes are deterministic gzip estimates for scripts, modulepreloads and stylesheets declared by each built HTML page, not transferred bytes from a browser trace, total deferred resources or PageSpeed scores. Dynamic content, optional analytics, account sessions, density-selected images and real network conditions can add resources. This is coverage of all generated routes, not a Lighthouse run or authenticated functional test for each URL. Private routes retain their account requirement and noindex controls.\n\n'+
  '| URL | Route entry | JS before KiB | JS after KiB | JS reduction | CSS before KiB | CSS after KiB | Image issues |\n| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |\n'+
  rows.map(r=>`| ${r.url} | ${r.entry.replace('src/routes/','').replace('.jsx','')} | ${kib(r.js_before)} | ${kib(r.js_gzip_bytes)} | ${r.js_reduction_pct??'—'}% | ${kib(r.css_before)} | ${kib(r.css_gzip_bytes)} | ${r.image_issues.length} |`).join('\n')+'\n');
console.log(JSON.stringify(summary,null,2));
if (summary.image_issues.length || regressions.length) process.exitCode = 1;
