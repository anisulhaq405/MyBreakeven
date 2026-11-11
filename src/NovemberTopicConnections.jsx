import React from 'react';
import {guideTopic,novemberGuideSlugs,topicConnections} from './novemberTopics.js';
import './guide-topics.css';
export function GuideTopicLink({article}){
 if(!novemberGuideSlugs.has(article.slug))return null;
 const t=guideTopic(article.slug);if(!t)return null;
 return <nav className="guide-topic-return" aria-label="Guide topic"><span>Explore this topic:</span> <a href={t.href}>{t.title}</a></nav>;
}
export default function NovemberTopicConnections({article}){
 const links=topicConnections(article);if(!links)return null;
 return <aside className="november-topic-connections" aria-label="Connected topic guides"><h2>Continue with {links.topic.title.toLowerCase()}</h2><p>{links.topic.description}</p>{links.posts.length>0&&<ul>{links.posts.map(p=><li key={p.slug}><a href={`/blogs/${p.slug}/`}>{p.title}</a><p>{p.description}</p></li>)}</ul>}<a href={links.topic.href}>Explore all {links.topic.title.toLowerCase()} guides</a></aside>;
}
