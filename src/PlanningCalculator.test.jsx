import React from 'react';
import {renderToString} from 'react-dom/server';
import {it,expect,vi} from 'vitest';
import PlanningCalculator,{forecastCsv} from './PlanningCalculator';
import {planningTools} from './planningTools';
import {cashExample} from './planningToolsDefaults';
import {calculateCashForecast} from './planningToolsEngine';
it('prerenders both tools with the same browser initial inputs and without browser storage',()=>{
 for(const slug of Object.keys(planningTools)){
  const props={slug,tool:planningTools[slug]},server=renderToString(<PlanningCalculator {...props}/>);
  const storage=vi.fn(()=>{throw Error('No storage access expected');});vi.stubGlobal('window',{localStorage:{getItem:storage},sessionStorage:{getItem:storage}});
  try{expect(renderToString(<PlanningCalculator {...props}/>)).toBe(server);expect(storage).not.toHaveBeenCalled();expect(server).toContain('planning-results');}finally{vi.unstubAllGlobals();}
 }
});
it('exports scenario settings, entered events and thirteen weekly values with safe text cells',()=>{
 const input={...cashExample,delay:14,events:[...cashExample.events,{name:'=HYPERLINK("evil")',date:cashExample.start,type:'payment',category:'operating',amount:0}]};
 const csv=forecastCsv(input,calculateCashForecast(input),'GBP');expect(csv).toContain('"Currency","GBP"');expect(csv).toContain('"Receipt delay days","14"');expect(csv).toContain("'"+'=HYPERLINK');expect(csv).toContain('"2027-01-11","2027-01-17"');expect(csv).toContain('editing this CSV does not recalculate');expect(csv).toContain('"-3000"');expect(csv).not.toContain('"\'-3000"');
});
