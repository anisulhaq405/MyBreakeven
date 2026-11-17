import React from 'react';
import {Search} from 'lucide-react';
import './site-search-entry.css';
export default function SiteSearchForm({id='site-query',defaultValue=''}){
 return <form className="site-search-entry" role="search" action="/search/" method="get"><label htmlFor={id}><Search size={19} aria-hidden="true"/><span className="site-search-sr">Search the entire site</span></label><input id={id} name="q" type="search" maxLength={120} defaultValue={defaultValue} placeholder="Search guides, calculators and topics…" required/><button type="submit">Search site</button></form>;
}
