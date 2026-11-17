// Search only the versioned public-content index; never account or calculator entries.
export const searchKinds = ['All', 'Calculator', 'Guide', 'Topic', 'Page'];
export const normalizeSearch = value => String(value || '').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').replace(/\bbreak\s+even\b/g,'breakeven').replace(/\bcashflow\b/g,'cash flow').replace(/\be commerce\b/g,'ecommerce').trim();
const stem = word => word.length > 4 ? word.replace(/ies$/,'y').replace(/s$/,'') : word;
const stops = new Set(['a','an','the','how','to','for','of','and','or','in','is','my','your','with']);
export function searchTerms(query) { return [...new Set(normalizeSearch(String(query).slice(0,120)).split(/\s+/).filter(t=>t&&!stops.has(t)).map(stem))].slice(0,10); }
const words = text => new Set(normalizeSearch(text).split(/\s+/).map(stem));
export function prepareSearchDocuments(documents) {
 return documents.map(d=>({...d, fields:[words(d.title),words(d.headings),words(d.summary),words(d.text)], phrase:normalizeSearch(d.title)}));
}
export function searchSite(documents, query, kind='All') {
 const terms=searchTerms(query); if(!terms.length)return [];
 const phrase=normalizeSearch(query);
 return documents.flatMap(d=>{
  if(kind!=='All'&&d.kind!==kind)return [];
  const fields=d.fields||[words(d.title),words(d.headings),words(d.summary),words(d.text)];
  if(!terms.every(t=>fields.some(f=>f.has(t))))return [];
  const titlePhrase=d.phrase||normalizeSearch(d.title);
  let score=titlePhrase.includes(phrase)?100:0;
  if(titlePhrase.startsWith(phrase))score+=25;
  for(const t of terms)for(let i=0;i<fields.length;i++)if(fields[i].has(t))score+=[24,10,6,1][i];
  if(terms.every(t=>fields[0].has(t)))score+=35;
  return [{...d,score}];
 }).sort((a,b)=>b.score-a.score||a.title.localeCompare(b.title));
}
export function searchSnippet(document,query){
 const text=document.text||document.summary||'';const terms=searchTerms(query);
 if(document.summary&&terms.some(t=>words(document.summary).has(t)))return document.summary;
 const match=[...text.matchAll(/[\p{L}\p{N}]+/gu)].find(m=>terms.includes(stem(normalizeSearch(m[0]))));
 if(!match)return document.summary;
 let start=Math.max(0,match.index-70);if(start)start=text.indexOf(' ',start)+1;
 const fragment=text.slice(start,start+220);return (start?'…':'')+fragment+(start+220<text.length?'…':'');
}
