import React from 'react';
import {describe,it,expect} from 'vitest';
import {renderToStaticMarkup} from 'react-dom/server';
import {calculateRoas as calc,roasDefaults as d,roasCsv} from './roasEngine.js';
import {calculateBusinessTool} from './businessToolEngine.js';
import {freeTools} from './freeTools.js';
import {blogPostMap} from './content/blogs/index.js';
import RoasCalculator from './RoasCalculator.jsx';
import {routeEntryForPath} from './routeEntries.js';

describe('ROAS order economics and period reconciliation',()=>{
  it('preserves the original order example and independently reconciles target CPA',()=>{
    const r=calc(d);expect(r).toMatchObject({valid:true,contribution:33.6,rate:42,target:3.125,maxCPA:33.6,targetCPA:25.6,actual:4,acos:25,profit:680,surplus:680});
    expect(r.breakEven).toBeCloseTo(80/33.6,12);expect(r.targetCPA*r.target).toBeCloseTo(80,12);
    expect(calculateBusinessTool(d,'roas').profit).toBe(r.profit);
  });
  it('uses itemized costs instead of adding them to the inactive total',()=>{
    const r=calc({...d,costMode:'itemized',cost:999});expect(r.cost).toBe(44);expect(r.contribution).toBe(33.6);
    expect(calc({...d,costMode:'itemized',cost:'',product:40}).cost).toBe(52);
    expect(calc({...d,product:'',costMode:'total'}).valid).toBe(true);
  });
  it('separates period cost recovery from the unit threshold at fixed media spend',()=>{
    const r=calc({...d,support:150,overhead:250});expect(r.profit).toBe(680);expect(r.surplus).toBe(280);expect(r.remainingMargin).toBe(7);expect(r.targetGap).toBe(-120);
    expect(r.campaignBreakEven).toBeCloseTo(10/3,12);expect(r.campaignTarget).toBe(4.375);expect(r.campaignTargetRevenue).toBe(4375);expect(r.target).toBe(3.125);
    const onTarget=calc({...d,support:150,overhead:250,revenue:4375});expect(onTarget.targetGap).toBe(0);expect(onTarget.surplus).toBe(437.5);
  });
  it('retains unit targets before launch without inventing actual ROAS at zero spend',()=>{
    const r=calc({...d,spend:0,revenue:0,support:150});expect(r).toMatchObject({valid:true,actual:null,actualCPA:null,acos:null,campaignBreakEven:null,surplus:-150,target:3.125});expect(r.scenarios).toHaveLength(0);expect(r.campaignRequiredRevenue).toBeCloseTo(150/.42);
  });
  it('handles revenue of zero without a fake CPA or ACoS',()=>expect(calc({...d,revenue:0})).toMatchObject({valid:true,actual:0,actualCPA:null,acos:null,profit:-1000,status:'shortfall'}));
  it('reports negative contribution and unattainable targets without infinity',()=>{
    for(const cost of [77.6,90])expect(calc({...d,cost})).toMatchObject({valid:true,breakEven:null,maxCPA:0,target:null,targetCPA:null});
    expect(calc({...d,margin:42})).toMatchObject({valid:true,target:null,targetCPA:null,campaignTarget:null});
  });
  it('keeps loss scenarios and the exact zero boundary visible',()=>{
    expect(calc({...d,cost:60}).profit).toBe(-120);
    const r=calc({...d,price:100,cost:50,fee:0,revenue:2000,margin:0});expect(r.status).toBe('break-even');expect(r.targetGap).toBe(0);expect(r.scenarios.find(s=>s.roas===2)).toMatchObject({surplus:0,status:'Break-even'});
  });
  it('scales currency amounts while ratios and margins stay invariant',()=>{
    const scaled={...d};for(const k of ['price','cost','spend','revenue','support','overhead'])scaled[k]*=13;
    const r=calc(scaled),base=calc(d);expect(r.breakEven).toBe(base.breakEven);expect(r.target).toBe(base.target);expect(r.profit).toBe(base.profit*13);
  });
  it('rounds minimum revenue upward and CPA ceilings downward, preserving raw precision',()=>{
    const r=calc({...d,price:80.01,support:150,overhead:250});
    expect(r.campaignRequiredRevenueCents).toBeGreaterThanOrEqual(r.campaignRequiredRevenue);
    expect(r.campaignTargetRevenueCents).toBeGreaterThanOrEqual(r.campaignTargetRevenue);
    expect(r.maxCPACents).toBeLessThanOrEqual(r.maxCPA);expect(r.targetCPACents).toBeLessThanOrEqual(r.targetCPA);
    expect(calc({...d,support:150,overhead:250}).campaignRequiredRevenueCents).toBe(3333.34);
  });
  it('reconciles every scenario against its own revenue and unchanged costs',()=>{
    const r=calc({...d,support:150,overhead:250});for(const s of r.scenarios){expect(s.revenue).toBe(1000*s.roas);expect(s.surplus).toBeCloseTo(s.revenue*.42-1400,10);expect(s.margin).toBeCloseTo(s.surplus/s.revenue*100,10);}
  });
  for(const change of [{price:0},{price:''},{fee:100},{margin:100},{spend:-1},{support:''},{overhead:' '},{revenue:Infinity},{cost:1e13},{costMode:'bad'},{costMode:'itemized',flatFee:-1},{price:1e-320}])it(`rejects invalid or unreportable values ${JSON.stringify(change)}`,()=>expect(calc({...d,...change}).valid).toBe(false));
  it('exports active cost inputs, unrounded thresholds, scope and scenario rows',()=>{
    const input={...d,costMode:'itemized',support:150,overhead:250},r=calc(input),csv=roasCsv(input,'GBP',r);
    expect(csv).toContain('"Currency label (no conversion)","GBP"');expect(csv).toContain('"Period target ROAS x","4.375"');expect(csv).toContain('"Product cost","32"');expect(csv).not.toContain('"Input","Direct cost per order"');expect(csv).toContain('before tax and unentered commitments');expect(csv).toContain('"2","2000","-560","-28"');expect(roasCsv(d,'USD',{valid:false})).toBeNull();
  });
});

describe('ROAS published experience',()=>{
  const tool=freeTools['break-even-roas-calculator'];
  it('uses one isolated route with accessible fields, unique anchors and the calculator before the image',()=>{
    expect(routeEntryForPath('/calculators/break-even-roas-calculator/')).toBe('src/routes/RoasToolRoute.jsx');
    const h=renderToStaticMarkup(<RoasCalculator tool={tool}/>);expect((h.match(/<h1\b/g)||[])).toHaveLength(1);expect(h).toContain('25.60');expect(h).toContain('680.00');expect(h).toContain('Download result CSV');expect(h).toContain('aria-live="polite"');
    expect(h.indexOf('id="pricing-calculator"')).toBeLessThan(h.indexOf('class="tool-feature"'));
    const ids=[...h.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);expect(new Set(ids).size).toBe(ids.length);
    for(const m of h.matchAll(/(?:href="#|aria-describedby=")([^" ]+)"/g))expect(ids).toContain(m[1]);
  });
  it('preserves established content and adds bounded, checked examples with real internal destinations',()=>{
    expect(tool.reviewed).toBe('2026-11-10');expect(tool.name).toBe('Break-Even ROAS Calculator');
    for(const id of ['formula','worked-examples','be-roas-cost-boundary','reserve-overhead-before-cpa','roas-period-costs','roas-acos-targets'])expect(tool.sections.some(s=>s.id===id)).toBe(true);
    for(const s of tool.sections)for(const l of s.links||[])if(l.href.startsWith('/blogs/'))expect(blogPostMap[l.href.split('/')[2]]).toBeDefined();
    for(const [,url]of tool.related)if(url.startsWith('/blogs/'))expect(blogPostMap[url.split('/')[2]]).toBeDefined();
    expect(1400/(.42-.10)).toBeCloseTo(4375);expect(1000*.42-500).toBe(-80);
  });
});
