import React,{useEffect,useState,useRef} from 'react';
import {ArrowRight,ArrowUpRight,BookOpen,Rocket,Target,Receipt,Building,Layers,Tag,BarChart3,Calendar,Wallet,TrendingUp,Compass,Percent,Briefcase,Sparkles,Leaf,Car,Scissors,Utensils,Camera,ShoppingBag} from 'lucide-react';
import {businessTopics,sectorTopics} from './novemberTopics.js';
import {blogListingData} from './blogListingData.js';
import {responsiveFeatureProps} from './responsiveFeatureImages.js';
import './guide-topics.css';
import './knowledge-library.css';
const posts=new Map(blogListingData.posts.map(p=>[p.slug,p]));
const display={
 'business-launch':['Business ideas & launch',Rocket,'Start with a strong foundation'],
 'strategy-risk':['Strategy & growth',Target,'Make your next move with clarity'],
 'accounting-records':['Bookkeeping & statements',BookOpen,'Turn your records into a clear picture'],
 'receivables-payables':['Receivables & payables',Receipt,'Follow the money in and out'],
 'asset-depreciation':['Assets & depreciation',Building,'Understand what your assets cost'],
 'cost-accounting':['Costs & cost control',Layers,'Know where every dollar goes'],
 'pricing-profitability':['Pricing & profitability',Tag,'Build a price that works for your business'],
 'break-even':['Break-even & sales targets',BarChart3,'Know what it takes to cover your costs'],
 'budgets-performance':['Budgets & forecasts',Calendar,'Connect your plan with actual performance'],
 'cash-inventory':['Cash flow & inventory',Wallet,'Keep stock, commitments and cash in view'],
 'investment-capital':['Investment & capital',TrendingUp,'Compare the value of your next investment'],
 'retirement-refinance':['Retirement & refinancing',Compass,'Plan the long view, one assumption at a time'],
 'ratios-marketing':['Ratios & marketing returns',Percent,'Put your results in the right perspective'],
};
const industryDetails={
 'cleaning-business':[Sparkles,'Quotes, contracts and recurring client economics.'],
 'landscaping-business':[Leaf,'Crew costs, seasonal cash and route capacity.'],
 'mobile-detailing-business':[Car,'Packages, travel costs and productive hours.'],
 'salon-business':[Scissors,'Service pricing, repeat visits and stylist capacity.'],
 'restaurant-business':[Utensils,'Menu costs, sales channels and kitchen capacity.'],
 'photography-business':[Camera,'Assignment costs, editing time and package pricing.'],
 'ecommerce-business':[ShoppingBag,'Order margins, stock, shipping and returns.'],
 'agency-business':[Briefcase,'Retainers, project scope and billable team hours.'],
};
const groupings=[['START & GROW',['business-launch','strategy-risk']],['RUN THE NUMBERS',['pricing-profitability','break-even','cost-accounting','budgets-performance','cash-inventory']],['BUILD FINANCIAL CLARITY',['accounting-records','receivables-payables','asset-depreciation','investment-capital','retirement-refinance','ratios-marketing']]];
export default function GuideTopicNavigator(){
 const [active,setActive]=useState('pricing-profitability');
 const shouldScroll=useRef(false);
 const [view,setView]=useState('topics');
 useEffect(()=>{
  const sync=()=>{const id=window.location.hash.replace('#topic-','');if(businessTopics.some(t=>t.id===id)){shouldScroll.current=true;setActive(id);setView('topics');}};
  sync();window.addEventListener('hashchange',sync);window.addEventListener('popstate',sync);
  return()=>{window.removeEventListener('hashchange',sync);window.removeEventListener('popstate',sync);};
 },[]);
 useEffect(()=>{if(shouldScroll.current&&window.location.hash===`#topic-${active}`){shouldScroll.current=false;requestAnimationFrame(()=>document.getElementById('guide-topics-title')?.scrollIntoView({block:'start'}));}},[active]);
 const choose=(e,id)=>{if(e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;e.preventDefault();shouldScroll.current=false;setActive(id);setView('topics');window.history.pushState(null,'',`#topic-${id}`);};
 return <section className="knowledge-directory" aria-labelledby="guide-topics-title">
  <div className="knowledge-heading"><div><span className="knowledge-eyebrow"><span/> THE KNOWLEDGE LIBRARY</span><h2 id="guide-topics-title">Find the right guide.</h2><p>One clear place for your next business decision.</p></div><div className="knowledge-total"><BookOpen size={19}/><strong>{blogListingData.posts.length}</strong><span>practical guides</span></div></div>
  <div className="knowledge-view"><div className="knowledge-switch" aria-label="Browse collections"><button type="button" aria-pressed={view==='topics'} onClick={()=>setView('topics')}><Layers size={16}/>By topic <span>{businessTopics.length}</span></button><button type="button" aria-pressed={view==='industries'} onClick={()=>setView('industries')}><Briefcase size={16}/>By business <span>{sectorTopics.length}</span></button></div><span className="knowledge-hint">A little clarity goes a long way.</span></div>
  <div className="knowledge-workspace" hidden={view!=='topics'}><label className="knowledge-mobile-picker">Choose a topic<select value={active} onChange={e=>{setActive(e.target.value);window.history.pushState(null,'',`#topic-${e.target.value}`);}}>{businessTopics.map(t=><option value={t.id} key={t.id}>{display[t.id][0]}</option>)}</select></label>
   <aside className="knowledge-sidebar"><div className="knowledge-sidebar-title">YOUR BUSINESS, CONNECTED</div><nav aria-label="Business finance topics">{groupings.map(([label,ids])=><div className="knowledge-nav-group" key={label}><span>{label}</span>{ids.map(id=>{const t=businessTopics.find(t=>t.id===id),[name,Icon]=display[id];return <a key={id} href={`#topic-${id}`} className={active===id?'is-active':''} aria-current={active===id?'true':undefined} onClick={e=>choose(e,id)}><Icon size={17}/><span>{name}</span><small>{t.slugs.length}</small></a>;})}</div>)}</nav><a className="knowledge-all" href="#blog">Browse all guides <ArrowUpRight size={16}/></a></aside>
   <div className="knowledge-content">{businessTopics.map(t=>{const members=t.slugs.map(s=>posts.get(s)).filter(Boolean),first=members[0],[name,Icon,subtitle]=display[t.id];return <article className="knowledge-panel" key={t.id} id={`topic-${t.id}`} hidden={active!==t.id} aria-labelledby={`collection-${t.id}`}>
    <div className="knowledge-panel-top"><span className="knowledge-collection-label">THE COLLECTION</span><span className="knowledge-guide-count">{members.length} guides</span></div>
    <div className="knowledge-panel-heading"><span className="knowledge-topic-icon"><Icon size={25}/></span><div><h3 id={`collection-${t.id}`}>{name}</h3><p>{subtitle}</p></div></div><p className="knowledge-description">{t.description}</p>
    {first&&<a className="knowledge-feature" href={`/blogs/${first.slug}/`}><img src={first.image} {...responsiveFeatureProps(first.image,true)} alt="" width="400" height="225" loading={active===t.id?'eager':'lazy'}/><div><span>START HERE</span><h4>{first.title}</h4><span className="knowledge-feature-cta">Read the guide <ArrowUpRight size={17}/></span></div></a>}
    <div className="knowledge-list-heading"><h4>Go a little deeper</h4><span>Connected guides, practical next steps.</span></div>
    <ul className="knowledge-guide-list">{members.slice(1).map((p,i)=><li key={p.slug}><a href={`/blogs/${p.slug}/`}><span className="knowledge-order">{String(i+2).padStart(2,'0')}</span><span>{p.title}</span><ArrowUpRight size={16}/></a></li>)}</ul>
    <div className="knowledge-panel-footer"><span><BookOpen size={15}/> Clear methods. Worked examples. Your own numbers.</span><a href="#guide-topics-title">Back to collections <ArrowRight size={15}/></a></div>
   </article>;})}</div>
  </div>
  <div className="knowledge-industries" hidden={view!=='industries'}><div className="knowledge-industry-heading"><span className="knowledge-collection-label">BUILT AROUND YOUR WORK</span><h3>Different businesses. Specific decisions.</h3><p>Find the costs, capacity and pricing questions that match your business.</p></div><div className="knowledge-industry-grid">{sectorTopics.map((t,i)=>{const [IndustryIcon,description]=industryDetails[t.id];return <a href={t.href} className="knowledge-industry-card" key={t.id}><span className={`knowledge-industry-symbol tone-${i%4}`}><IndustryIcon size={23}/></span><span className="knowledge-industry-name">{t.title.replace(' business','')}</span><p>{description}</p><span className="knowledge-industry-bottom"><span>{t.slugs.length} guides</span><ArrowUpRight size={19}/></span></a>;})}</div></div>
 </section>;
}
