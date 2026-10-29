import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import FutureValueAnalysisCharts from './FutureValueAnalysisCharts.jsx';
import {fvDefaults,calculateFutureValuePlan} from './financeDay1Engine.js';
import {simulateFutureValueRisk} from './futureValueRiskEngine.js';
describe('Phase 3 advanced investment visualizations',()=>{
 it('renders labeled growth chart, fees comparison and modeled percentiles',()=>{const v=fvDefaults(),plan=calculateFutureValuePlan(v,{fee:'0.5',step:'2'}),risk=simulateFutureValueRisk(v,{paths:'100',target:'50000'});const html=renderToStaticMarkup(<FutureValueAnalysisCharts plan={plan} risk={risk} goal="50000"/>);expect(html).toContain('Investment growth and cost analysis');expect(html).toContain('How fees affect the final value');expect(html).toContain('Simulated ending-value spread');expect(html).toContain('aria-label');expect(html).toContain('<dl class=\"fd-cards\"');});
});