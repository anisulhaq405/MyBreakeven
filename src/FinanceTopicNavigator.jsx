import React from'react';
import{financeTopics}from'./financeTopics.js';
import{blogListingData}from'./blogListingData.js';
import './finance-topic-navigation.css';
const posts=new Map(blogListingData.posts.map(p=>[p.slug,p]));
export default function FinanceTopicNavigator(){return <section className="finance-topic-nav" aria-labelledby="finance-topics-title"><h2 id="finance-topics-title">Find the decision you need to make</h2><p>Choose a financial question, then follow its worked guide. For sector-specific costs and delivery assumptions, use the business guides below.</p><div>{financeTopics.map(topic=><article key={topic.id}><h3>{topic.title}</h3><p>{topic.description}</p><ul>{topic.slugs.map(slug=>posts.get(slug)).filter(Boolean).map(p=><li key={p.slug}><a href={`/blogs/${p.slug}/`}>{p.title}</a></li>)}</ul></article>)}</div></section>;}
