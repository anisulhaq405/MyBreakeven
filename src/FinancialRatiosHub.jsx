import React from 'react';
import {financialRatiosHub as hub,financeGuideDate} from './content/blogs/financeCompletionGuides.js';
import './blogs-page.css';
import './new-content-navigation.css';
import './finance-editorial.css';
export default function FinancialRatiosHub(){return <article className="article-page article-with-section-nav financial-ratios-hub">
 <nav className="breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/blogs/">Guides</a><span>›</span><span>Financial ratios</span></nav>
 <span>BUSINESS FINANCIAL ANALYSIS</span><h1>{hub.title}</h1>
 <div className="article-meta"><time dateTime={financeGuideDate}>Published October 26, 2026</time><span>Updated October 26, 2026</span></div>
 <p className="article-note">Published by <a href="/about-us/">MyBreakeven</a>. <a href="/editorial-policy/">Editorial standards and corrections</a>.</p>
 <p className="article-lead">{hub.description}</p>
 <p className="article-summary"><a href="/calculators/financial-ratios-calculator/">Calculate liquidity, profitability, leverage and returns →</a></p>
 <nav className="article-section-nav" aria-label="Financial ratio categories">{[['definition','Definition'],['categories','Categories'],['dataset','Example dataset'],['reference','Printable formulas'],['periods','Dates and periods'],['leverage','Leverage'],['interpretation','Interpretation'],['mistakes','Mistakes'],['sources','Sources'],['hub-faqs','FAQs']].map(([id,label])=><a href={'#'+id} key={id}>{label}</a>)}</nav>
 <figure className="article-featured"><img src={hub.image} width="1200" height="675" alt="Four labelled groups connect liquidity, profitability, leverage and efficiency with a consistent business statement" decoding="async"/><figcaption>Original editorial illustration. The reference table contains the exact formulas and fictional figures.</figcaption></figure>
 <div className="day1-markdown" dangerouslySetInnerHTML={{__html:hub.html}}/>
 <section className="article-faq" id="hub-faqs"><h2>Frequently asked questions</h2>{hub.faq.map(([q,a])=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}</section>
 <p className="article-note">Educational examples only. Ratios do not establish credit eligibility or replace accounting advice.</p>
 </article>;}
