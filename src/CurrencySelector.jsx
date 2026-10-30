import React,{useId,useMemo,useState} from 'react';
import {CURRENCIES} from './currencies';
const markets={USD:'United States USA',GBP:'United Kingdom UK',EUR:'Euro area Germany France Italy Spain Netherlands Ireland Austria Belgium Finland Portugal Greece Luxembourg Estonia Latvia Lithuania Slovakia Slovenia Croatia Cyprus Malta Bulgaria',CAD:'Canada',AUD:'Australia',NZD:'New Zealand',CHF:'Switzerland Liechtenstein',JPY:'Japan',SGD:'Singapore',HKD:'Hong Kong',KRW:'South Korea',TWD:'Taiwan',NOK:'Norway',SEK:'Sweden',DKK:'Denmark',ISK:'Iceland',PLN:'Poland',CZK:'Czechia Czech Republic',HUF:'Hungary',RON:'Romania',AED:'United Arab Emirates UAE',SAR:'Saudi Arabia',QAR:'Qatar',KWD:'Kuwait',BHD:'Bahrain',OMR:'Oman',ILS:'Israel',TRY:'Türkiye Turkey',ZAR:'South Africa',MXN:'Mexico',BRL:'Brazil',CLP:'Chile',COP:'Colombia',PEN:'Peru',ARS:'Argentina',UYU:'Uruguay',CNY:'China',INR:'India',PKR:'Pakistan',BDT:'Bangladesh',LKR:'Sri Lanka',NPR:'Nepal',IDR:'Indonesia',MYR:'Malaysia',THB:'Thailand',VND:'Vietnam',PHP:'Philippines',EGP:'Egypt',MAD:'Morocco',KES:'Kenya',NGN:'Nigeria',UAH:'Ukraine',RSD:'Serbia',GEL:'Georgia',AMD:'Armenia',KZT:'Kazakhstan',XCG:'Curaçao Sint Maarten',ZWG:'Zimbabwe'};
export const currencyOptions=CURRENCIES.map(({code,name,countries})=>({code,label:`${code} — ${name}`,search:`${code} ${name} ${countries.join(' ')} ${markets[code]||''}`.toLowerCase()}));
export default function CurrencySelector({value,onChange}){
 const id=useId(),[query,setQuery]=useState(''),[open,setOpen]=useState(false),[active,setActive]=useState(0);
 const selected=currencyOptions.find(c=>c.code===value);
 const filtered=useMemo(()=>currencyOptions.filter(c=>c.search.includes(query.trim().toLowerCase())),[query]);
 const options=filtered.slice(0,30);
 const choose=code=>{onChange(code);setQuery('');setOpen(false);setActive(0);};
 const keyDown=e=>{
  if(e.key==='Escape'){setOpen(false);setQuery('');return;}
  if(e.key==='ArrowDown'){e.preventDefault();setOpen(true);setActive(i=>Math.min(i+1,Math.max(options.length-1,0)));}
  if(e.key==='ArrowUp'){e.preventDefault();setOpen(true);setActive(i=>Math.max(i-1,0));}
  if(e.key==='Enter'&&open&&options[active]){e.preventDefault();choose(options[active].code);}
 };
 return <div className="tool-field currency-combobox" onBlur={e=>{if(!e.currentTarget.contains(e.relatedTarget))setOpen(false);}}>
  <label htmlFor={id+'-currency'}>Currency</label>
  <div className="currency-combobox-control">
   <input id={id+'-currency'} type="search" role="combobox" aria-autocomplete="list" aria-expanded={open} aria-controls={id+'-list'} aria-activedescendant={open&&options[active]?id+'-option-'+active:undefined} placeholder={selected?selected.label:'Search country, currency or code'} value={query} onFocus={()=>{setOpen(true);setActive(0);}} onChange={e=>{setQuery(e.target.value);setOpen(true);setActive(0);}} onKeyDown={keyDown} aria-describedby={id+'-help'}/>
   <span className="currency-current" aria-label={'Selected currency '+(selected?.label||value)}>{value}</span>
  </div>
  {open&&<div className="currency-combobox-results" id={id+'-list'} role="listbox" aria-label="Matching currencies">
   {options.map((c,i)=><button key={c.code} id={id+'-option-'+i} type="button" role="option" aria-selected={c.code===value} className={i===active?'currency-option currency-option-active':'currency-option'} onMouseDown={e=>e.preventDefault()} onClick={()=>choose(c.code)}>{c.label}{c.code===value?' ✓':''}</button>)}
   {!options.length&&<p role="status">No matching currency found.</p>}
   {filtered.length>30&&<small>{filtered.length} matches. Type more to narrow the list.</small>}
  </div>}
  <small id={id+'-help'}>{currencyOptions.length} currencies. Search and choose one; currency labels change, but amounts are not converted.</small>
 </div>;
}
