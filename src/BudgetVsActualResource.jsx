import React from 'react';
import {bvaContent} from './content/day1PlanningContent.js';
import {day1PlanningRelease} from './day1PlanningRelease.js';
import './day1-planning.css';
export default function BudgetVsActualResource(){return <article className="authority-page day1-planning-resource"><nav aria-label="Breadcrumb"><a href="/">Home</a> / <a href="/resources/">Resources</a> / Budget vs actual</nav><header>{!day1PlanningRelease.published&&<p role="status">Unpublished draft for review</p>}<span>MYBREAKEVEN · BUSINESS BUDGETING</span><h1>Budget vs Actual Excel Template: Monthly and YTD</h1><p>{day1PlanningRelease.published?'Published':'Draft prepared'} <time dateTime={day1PlanningRelease.date}>{day1PlanningRelease.date}</time></p><p>Published by <a href="/about-us/">MyBreakeven</a>. <a href="/editorial-policy/">Editorial standards and corrections</a>.</p></header><div className="day1-markdown" dangerouslySetInnerHTML={{__html:bvaContent}}/></article>}
