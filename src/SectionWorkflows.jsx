import React from 'react';
import { sectionWorkflows } from './sectionWorkflows.js';
import './section-workflows.css';

export default function SectionWorkflows({ industry }) {
  const data = sectionWorkflows[industry];
  if (!data) return null;
  return <section className="section-workflows" id={`${industry}-practical-workflows`} aria-labelledby={`${industry}-workflow-title`}>
    <h2 id={`${industry}-workflow-title`}>Start with the problem in your records</h2>
    <p>Follow the steps for your decision. The examples below use fictional USD amounts; replace them with your own records.</p>
    <div className="section-workflow-grid">{data.paths.map(path => <section key={path.title} className="section-workflow-card"><h3>{path.title}</h3><ol>{path.steps.map(([label, href, explanation]) => <li key={href}><a href={href}>{label}</a><p>{explanation}</p></li>)}</ol></section>)}</div>
    <section className="section-records"><h3>Gather these records before you calculate</h3><ul>{data.records.map(record => <li key={record}>{record}</li>)}</ul><p>Keep customer identities and private financial details out of shared copies. If a figure is missing, mark the result provisional rather than treating the missing cost as zero.</p></section>
    <section className="section-worked-check"><h3>{data.example.title}</h3><div className="section-check-table" role="region" aria-label={`${data.label} fictional worked check`} tabIndex="0"><table><caption>Fictional USD example; the stated cost boundary applies</caption><thead><tr><th scope="col">Input or result</th><th scope="col">Amount</th></tr></thead><tbody>{data.example.rows.map(([label, value]) => <tr key={label}><th scope="row">{label}</th><td>{value}</td></tr>)}</tbody></table></div><p>{data.example.explanation}</p><p>{data.example.action}</p></section>
    <section className="section-starter-resources"><h3>Free resources for this review</h3><div className="section-resource-grid">{data.resources.map(([title, href, description]) => <article key={href}><h4><a href={href}>{title}</a></h4><p>{description}</p></article>)}</div></section>
    <p className="section-workflow-review">Workflow and example checked October 14, 2026. <a href="/calculation-methodology/">Read the methods</a> or <a href="/editorial-policy/#corrections">report a correction</a>. You may link to this hub or the original resource; identify hypothetical examples when referencing them.</p>
  </section>;
}
