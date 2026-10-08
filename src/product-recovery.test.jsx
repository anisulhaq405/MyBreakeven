import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { calculate } from "./engine";
import { industries } from "./industries";
import { advancedAnalysis } from "./advancedAnalysis";
import { capacityDecision } from "./capacityDecision";
import { buildDecisionBrief } from "./decisionBrief";
import { initialCalculatorPlan, stageCalculatorPlan, transferKey } from "./calculatorTransfer";
import { trackProductEvent } from "./productAnalytics";
import ProIntelligence from "./ProIntelligence";

const storage = () => {
  const values = new Map();
  return { getItem: key => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) };
};
const base = industries.cleaning.values;

describe("Calculator recovery boundaries", () => {
  it("returns validation for every missing field, null records and empty records", () => {
    for (const key of Object.keys(base)) {
      const input = { ...base }; delete input[key];
      expect(calculate(input).inputError, key).toBe(true);
    }
    for (const input of [null, undefined, {}]) expect(calculate(input).valid).toBe(false);
  });
  it("does not expose infinite values or unsafe whole-unit targets", () => {
    expect(calculate({ ...base, fixedCosts: '1e400' }).inputError).toBe(true);
    expect(calculate({ ...base, hoursPerJob: '1e-100' }).inputError).toBe(true);
  });
  it("uses the rounded sale target to plan inquiry demand", () => {
    const r = calculate(base);
    expect(r.wholeJobs).toBe(114);
    expect(r.wholeLeads).toBe(378);
    expect(r.practicalLeads).toBe(380);
    expect(r.practicalLeads * base.conversionPct / 100).toBeGreaterThanOrEqual(r.wholeJobs);
  });
  it("keeps the capacity solver and decision brief consistent at a fractional edge", () => {
    const input = { ...base, price:20, materialCost:10, laborCost:0, otherVariableCost:0, acquisitionCost:0,
      paymentFeePct:0, fixedCosts:101, ownerPay:0, targetProfit:0, workers:1, hoursPerWorker:10.9*12/52*2,
      hoursPerJob:2, utilizationPct:100 };
    const r = calculate(input), analysis = advancedAnalysis(input,r,{plannedUnits:10});
    expect(r.gap).toBeGreaterThan(0);
    expect(capacityDecision(r).fits).toBe(false);
    expect(analysis.additionalWorkers).toBe(1);
    expect(buildDecisionBrief({input,result:r,analysis,industry:industries.cleaning}).headline).toContain('exceeds current delivery capacity');
  });
  it.each([['',2],[-1,2],[1.5,2],[10,51],[10,-26],[10,''],[' ',2],[true,2]])("rejects invalid forecast controls (%s, %s) while keeping controls editable", (plannedUnits,growth) => {
    const result = calculate(base);
    expect(advancedAnalysis(base,result,{plannedUnits,growthPct:growth}).valid).toBe(false);
    const html=renderToStaticMarkup(<ProIntelligence input={base} result={result} industry={industries.cleaning} currency="USD" isPro plannedUnits={plannedUnits} growth={growth} />);
    expect(html).toContain('Review your sales forecast');
    expect(html).toContain('Expected monthly jobs');
    expect(html).not.toContain('Profit forecast');
  });
});

describe("Industry plan handoff", () => {
  it.each(Object.entries(industries))("preserves edited %s assumptions, then removes the temporary handoff", (key,industry) => {
    const local = storage(), input={...industry.values,price:industry.values.price+13.57,ownerPay:5432};
    expect(stageCalculatorPlan(key,input,local,1000)).toBe(true);
    const opened = initialCalculatorPlan({location:{search:`?industry=${key}&from=industry`},sessionStorage:local},2000);
    expect(opened.transferred).toBe(true);
    expect(opened.input).toEqual(input);
    expect(local.getItem(transferKey)).toBeNull();
  });
  it("rejects expired or mismatched plans with an explicit fallback flag", () => {
    const local = storage();
    stageCalculatorPlan('cleaning',base,local,1000);
    expect(initialCalculatorPlan({location:{search:'?industry=cleaning&from=industry'},sessionStorage:local},302000).transferUnavailable).toBe(true);
    stageCalculatorPlan('cleaning',base,local,1000);
    expect(initialCalculatorPlan({location:{search:'?industry=salon&from=industry'},sessionStorage:local},2000).transferred).toBe(false);
  });
  it("does not navigate invalid inputs or depend on storage being available", () => {
    expect(stageCalculatorPlan('cleaning',{...base,price:''},storage())).toBe(false);
    expect(stageCalculatorPlan('cleaning',base,{setItem(){throw new Error('blocked')}})).toBe(false);
    expect(initialCalculatorPlan({location:{search:'?industry=__proto__'}}).industryKey).toBe('cleaning');
  });
});

describe("Consent-bound conversion events", () => {
  it("sends only whitelisted events and an industry label after consent", () => {
    const local=storage(), gtag=vi.fn(), browser={localStorage:local,gtag};
    expect(trackProductEvent('calculator_continue','cleaning',browser)).toBe(false);
    local.setItem('mybreakeven_analytics_consent','rejected');
    expect(trackProductEvent('calculator_continue','cleaning',browser)).toBe(false);
    local.setItem('mybreakeven_analytics_consent','accepted');
    expect(trackProductEvent('calculator_continue','cleaning',browser)).toBe(true);
    expect(gtag).toHaveBeenCalledExactlyOnceWith('event','calculator_continue',{industry:'cleaning'});
    expect(trackProductEvent('price_180','cleaning',browser)).toBe(false);
    expect(trackProductEvent('scenario_saved',base,browser)).toBe(true);
    expect(gtag).toHaveBeenLastCalledWith('event','scenario_saved',{});
  });
});

describe("Lazy fragment navigation", () => {
  it("scrolls a newly mounted Pro section and disconnects stale observers", async () => {
    const { startFragmentNavigation } = await import('./fragmentNavigation');
    const listeners=new Map(), target={scrollIntoView:vi.fn()};
    let mutation, mounted=false;
    const disconnect=vi.fn();
    const browser={ location:{hash:''}, document:{getElementById:id => id==='pro-analysis' && mounted ? target : null},
      addEventListener:(name,listener)=>listeners.set(name,listener),removeEventListener:name=>listeners.delete(name),
      setTimeout:()=>1,clearTimeout:vi.fn(),MutationObserver:class {
        constructor(callback){mutation=callback;} observe(){} disconnect(){disconnect();}
      }};
    const cleanup=startFragmentNavigation(browser,{});
    browser.location.hash='#pro-analysis'; listeners.get('hashchange')();
    mounted=true; mutation();
    expect(target.scrollIntoView).toHaveBeenCalledOnce();
    expect(disconnect).toHaveBeenCalled();
    browser.location.hash='#%malformed';
    expect(()=>listeners.get('hashchange')()).not.toThrow();
    cleanup(); expect(listeners.has('hashchange')).toBe(false);
  });
});
