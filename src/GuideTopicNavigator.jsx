import React from 'react';
import {businessTopics} from './novemberTopics.js';
import {blogListingData} from './blogListingData.js';
import './finance-topic-navigation.css';
import './guide-topics.css';
const posts=new Map(blogListingData.posts.map(p=>[p.slug,p]));
export default function GuideTopicNavigator(){return <section className="finance-topic-nav guide-topic-directory" aria-labelledby="guide-topics-title"><h2 id="guide-topics-title">Explore guides by topic</h2><p>Start with a business question, then follow the connected methods and worked examples. For industry-specific decisions, choose your business below.</p><nav aria-label="Business finance topics">{businessTopics.map(t=><a key={t.id} href={`#topic-${t.id}`}>{t.title}</a>)}</nav><div>{businessTopics.map(t=><article id={`topic-${t.id}`} key={t.id}><h3>{t.title}</h3><p>{t.description}</p><ul>{t.slugs.map(s=>posts.get(s)).filter(Boolean).map(p=><li key={p.slug}><a href={`/blogs/${p.slug}/`}>{p.title}</a></li>)}</ul><a href="#guide-topics-title">Back to topic index</a></article>)}</div></section>;}
