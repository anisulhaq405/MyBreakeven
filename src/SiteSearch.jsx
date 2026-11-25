import React,{useEffect,useMemo,useState} from 'react';
import {Search,ArrowUpRight,BookOpen,Calculator,Layers,FileText} from 'lucide-react';
import {prepareSearchDocuments,searchSite,searchKinds,searchSnippet,searchTerms} from './siteSearch.js';
import './site-search.css';
let indexPromise;
const loadIndex=()=>indexPromise||(indexPromise=fetch('/site-search-index.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Search unavailable');return r.json();}).then(data=>{if(data.version!==1||!Array.isArray(data.documents))throw Error('Invalid search index');return prepareSearchDocuments(data.documents);}).catch(error=>{indexPromise=null;throw error;}));
const icons={Calculator,Guide:BookOpen,Topic:Layers,Page:FileText};
const suggestions=['Payroll','Cash flow','ROAS','Startup costs'];
export default function SiteSearch(){
 const [query,setQuery]=useState(''),[kind,setKind]=useState('All'),[documents,setDocuments]=useState(null),[status,setStatus]=useState('idle'),[limit,setLimit]=useState(20),[retry,setRetry]=useState(0);
 useEffect(()=>{const read=()=>{setQuery((new URLSearchParams(window.location.search).get('q')||'').slice(0,120));setKind('All');setLimit(20);};read();window.addEventListener('popstate',read);return()=>window.removeEventListener('popstate',read);},[]);
 useEffect(()=>{if(!query.trim()||documents)return;let active=true;setStatus('loading');loadIndex().then(d=>{if(active){setDocuments(d);setStatus('ready');}}).catch(()=>{if(active)setStatus('error');});return()=>{active=false;};},[Boolean(query.trim()),documents,retry]);
 const results=useMemo(()=>documents?searchSite(documents,query):[],[documents,query]);
 const filtered=kind==='All'?results:results.filter(d=>d.kind===kind);
 const setSearch=value=>{setQuery(value.slice(0,120));setKind('All');setLimit(20);};
 const submit=event=>{event.preventDefault();const q=query.trim();window.history.pushState({},'',q?'/search/?q='+encodeURIComponent(q):'/search/');};
 const choose=value=>{setSearch(value);window.history.pushState({},'','/search/?q='+encodeURIComponent(value));};
 return <div className="site-search-page">
  <section className="site-search-hero" aria-labelledby="search-title"><span className="site-search-eyebrow">THE WHOLE SITE, ONE SEARCH</span><h1 id="search-title">Find your next<br/><em>clear answer.</em></h1><p>Search business guides, calculators, topic collections and resources together.</p>
   <form role="search" className="site-query-form" action="/search/" method="get" onSubmit={submit}><label htmlFor="whole-site-query"><Search aria-hidden="true"/><span className="site-search-sr">Search the entire site</span></label><input id="whole-site-query" name="q" type="search" value={query} maxLength={120} onChange={e=>setSearch(e.target.value)} placeholder="Try payroll, cash flow or break-even…" autoComplete="off"/><button type="submit">Search</button></form>
   <div className="search-suggestions"><span>Try a topic</span>{suggestions.map(q=><button type="button" key={q} onClick={()=>choose(q)}>{q}</button>)}</div>
  </section>
  {!query.trim()?<section className="search-start" aria-label="Explore the site"><h2>Choose a place to start</h2><div>{[['/tools/','Calculators','Work through your numbers.',Calculator],['/blogs/','Guides & topics','Understand the method and the next step.',BookOpen],['/resources/','Resources','Find templates and practical records.',FileText]].map(([href,title,copy,Icon])=><a key={href} href={href}><Icon aria-hidden="true"/><h3>{title}</h3><p>{copy}</p><ArrowUpRight aria-hidden="true"/></a>)}</div></section>:<section className="site-search-results" aria-label="Search results" aria-busy={status==='loading'}>
   {status==='loading'&&<p role="status">Searching the site…</p>}
   {status==='error'&&<div className="search-empty" role="alert"><h2>Search could not load</h2><p>Please try again, or browse the guides and calculators directly.</p><button onClick={()=>setRetry(n=>n+1)} type="button">Try again</button><a href="/blogs/">Browse guides</a><a href="/tools/">Browse calculators</a></div>}
   {documents&&<><div className="search-result-top"><h2>Results for “{query.trim()}”</h2><p role="status">{filtered.length} {filtered.length===1?'result':'results'}{kind==='All'?' across the site':` in ${kind.toLowerCase()}s`}</p></div><div className="search-type-filters" aria-label="Filter search results">{searchKinds.map(k=><button key={k} type="button" aria-pressed={kind===k} onClick={()=>{setKind(k);setLimit(20);}}>{k==='All'?'All results':k+'s'} <span>{k==='All'?results.length:results.filter(r=>r.kind===k).length}</span></button>)}</div>
    {!filtered.length?<div className="search-empty"><Search aria-hidden="true"/><h3>No matching {kind==='All'?'pages':kind.toLowerCase()+'s'} found</h3><p>{!searchTerms(query).length?'Enter a topic or keyword, such as payroll or inventory.':kind!=='All'?'Try All results, a shorter phrase or another topic.':'Try a shorter phrase, check the spelling or choose a suggested topic above.'}</p>{kind!=='All'&&<button type="button" onClick={()=>setKind('All')}>Show all result types</button>}<a href="/blogs/">Browse topics and business guides</a><a href="/tools/">Browse all calculators</a></div>:<ol className="search-result-list">{filtered.slice(0,limit).map(d=>{const Icon=icons[d.kind]||FileText;return <li key={d.url}><a href={d.url}><div className="search-result-meta"><span><Icon size={15} aria-hidden="true"/>{d.kind}</span><small>{d.url.split('#')[0]}</small></div><h3>{d.title}<ArrowUpRight size={20} aria-hidden="true"/></h3><p>{searchSnippet(d,query)}</p></a></li>;})}</ol>}
    {filtered.length>limit&&<button className="search-more" type="button" onClick={()=>setLimit(n=>n+20)}>Show more results ({filtered.length-limit} remaining)</button>}</>}
  </section>}
  <noscript><p>Site search needs JavaScript. You can still <a href="/blogs/">browse every guide</a> or <a href="/tools/">explore the calculators</a>.</p></noscript>
 </div>;
}
