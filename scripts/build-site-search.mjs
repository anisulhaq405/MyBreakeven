import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {businessTopics} from '../src/novemberTopics.js';
import {blogPosts} from '../src/content/blogs/index.js';
export function plainText(html=''){
 const named={amp:'&',lt:'<',gt:'>',quot:'"',apos:"'",nbsp:' ',ndash:'–',mdash:'—',rsquo:'’',lsquo:'‘',rdquo:'”',ldquo:'“',times:'×',divide:'÷',minus:'−'};
 return html.replace(/<(script|style|noscript|nav|aside|footer)\b[^>]*>[\s\S]*?<\/\1>/gi,' ').replace(/<[^>]*>/g,' ').replace(/&(#x[0-9a-f]+|#\d+|\w+);/gi,(all,key)=>key.startsWith('#')?String.fromCodePoint(parseInt(key.slice(key[1]?.toLowerCase()==='x'?2:1),key[1]?.toLowerCase()==='x'?16:10)):named[key]??all).replace(/\s+/g,' ').trim();
}
export async function buildSiteSearch(){
 const sitemap=await readFile('dist/sitemap.xml','utf8');const urls=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);const documents=[];
 for(const url of new Set(urls)){
  const path=new URL(url).pathname;
  if(path==='/search/'||/^\/(login|signup|dashboard|forgot-password|reset-password)\//.test(path))continue;
  const html=await readFile('dist'+path+'index.html','utf8');
  if(/<meta name="robots" content="[^"]*noindex/.test(html))continue;
  const main=html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1]||'';
  const metaTitle=plainText(html.match(/<title>([\s\S]*?)<\/title>/)?.[1]||'').replace(/\s*\|\s*MyBreakeven$/i,'');
  const title=(path==='/'||path.startsWith('/guides/')||path.startsWith('/calculators/'))?metaTitle:plainText(main.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/)?.[1]||html.match(/<title>([\s\S]*?)<\/title>/)?.[1]||'MyBreakeven');
  const summary=plainText(html.match(/<meta name="description" content="([^"]*)"/)?.[1]||'');
  const headings=[...main.matchAll(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/g)].map(m=>plainText(m[1])).join(' ');
  const kind=path.startsWith('/calculators/')||path==='/'?'Calculator':path.startsWith('/blogs/')&&path!=='/blogs/'?'Guide':path.startsWith('/guides/')?'Topic':'Page';
  documents.push({url:path,title,summary,kind,headings,text:plainText(main)});
 }
 const posts=new Map(blogPosts.map(p=>[p.slug,p]));
 for(const t of businessTopics)documents.push({url:t.href,title:t.title,summary:t.description,kind:'Topic',headings:t.slugs.map(slug=>posts.get(slug)?.title||'').join(' '),text:t.description+' '+t.slugs.map(slug=>posts.get(slug)?.description||'').join(' ')});
 const data=JSON.stringify({version:1,documents});const digest=createHash('sha256').update(data).digest('hex');
 await writeFile('dist/site-search-index.json',data);console.log(`Site search: ${documents.length} public documents, ${Buffer.byteLength(data)} bytes, ${digest.slice(0,12)}`);
 return {documents,bytes:Buffer.byteLength(data),digest};
}
