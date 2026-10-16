import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {it,expect,vi} from 'vitest';
import {menuRestaurantPlan} from './menuPlanTransfer';
import {foodNextDecision} from './foodNextDecision';
import {calculateMenuPrice,calculateFoodPeriod} from './foodCostEngine';
import {calculate} from './engine';
import {menuExample,foodPeriodExample,recipeExample} from './foodCalculatorDefaults';
import {initialCalculatorPlan,stageCalculatorPlan} from './calculatorTransfer';
import {recipeMenuTransfer,readMenuTransfer} from './foodCostTransfer';
import {trackFoodEvent,trackProductEvent} from './productAnalytics';
import MenuPlanNextStep from './MenuPlanNextStep';
const ops={acquisitionCost:0,workers:4,hoursPerWorker:35,hoursPerJob:.25,utilizationPct:75,conversionPct:40};
const store=()=>{let data;return {setItem:(k,v)=>{data=v},getItem:()=>data,removeItem:()=>{data=null}}};
it('carries only a confirmed complete order with explicit operations, currency and one-time expiry',()=>{
 const input={...menuExample,packaging:.1,other:.2,ownerPay:125,profitTarget:240};
 const plan=menuRestaurantPlan(input,ops,true),s=store();
 expect(plan.otherVariableCost).toBe(.3);
 expect(plan.expectedMonthlyUnits).toBe(1700);
 expect(plan.fixedCosts).toBe(20000);
 expect(plan.ownerPay).toBe(125);
 expect(plan.targetProfit).toBe(240);
 expect(calculate(plan).contribution).toBeCloseTo(calculateMenuPrice(input).contribution,10);
 expect(stageCalculatorPlan('restaurant',plan,s,1000,'GBP')).toBe(true);
 const browser={location:{search:'?industry=restaurant&from=industry'},sessionStorage:s};
 expect(initialCalculatorPlan(browser,2000)).toMatchObject({input:plan,currency:'GBP',transferred:true});
 expect(initialCalculatorPlan(browser,2001).transferred).toBe(false);
 stageCalculatorPlan('restaurant',plan,s,1000,'GBP');
 expect(initialCalculatorPlan(browser,301001).transferUnavailable).toBe(true);
});
it('adds promotion only once and replaces item capacity with explicit workforce capacity',()=>{
 const plan=menuRestaurantPlan(menuExample,{...ops,acquisitionCost:2},true);
 expect(calculate(plan).contribution).toBeCloseTo(calculateMenuPrice(menuExample).contribution-2,10);
 expect(calculate(plan).wholeCapacity).toBe(1820);
 expect(plan).not.toHaveProperty('weeklyCapacity');
});
it('blocks scope ambiguity, missing operations, invalid percentages and loss-making orders',()=>{
 expect(menuRestaurantPlan(menuExample,ops,false)).toBeNull();
 for(const patch of [{hoursPerJob:''},{workers:1.5},{conversionPct:0},{utilizationPct:101},{acquisitionCost:20}])expect(menuRestaurantPlan(menuExample,{...ops,...patch},true)).toBeNull();
});
it('makes recipe transfers short-lived and consumes stale or future data without loading it',()=>{
 for(const now of [999,301001]) {
  const s=store();s.setItem('',JSON.stringify(recipeMenuTransfer(recipeExample,'USD',1000)));
  expect(readMenuTransfer(s,now)).toBeNull();expect(s.getItem()).toBeNull();
 }
});
it('explains distinct contribution, capacity, funding and actual-record outcomes',()=>{
 const result=calculateMenuPrice(menuExample);
 expect(foodNextDecision('menu',result).title).toContain('capacity gap');
 expect(foodNextDecision('menu',calculateMenuPrice({...menuExample,price:5})).title).toContain('positive contribution');
 expect(foodNextDecision('menu',calculateMenuPrice({...menuExample,weeklyCapacity:1000})).title).toContain('funding shortfall');
 expect(foodNextDecision('menu',calculateMenuPrice({...menuExample,price:25})).title).toContain('actual orders');
 expect(foodNextDecision('period',calculateFoodPeriod({...foodPeriodExample,theoretical:''})).text).toContain('actual portions and menu mix');
 expect(foodNextDecision('period',calculateFoodPeriod(foodPeriodExample)).text).toContain('does not identify the cause');
 expect(foodNextDecision('menu',{valid:false})).toBeNull();
});
it('keeps unconfirmed handoff accessible with blank operations instead of invented defaults',()=>{
 const html=renderToStaticMarkup(<MenuPlanNextStep input={menuExample} currency="GBP"/>);
 expect(html).toContain('<details>');expect(html).toContain('complete representative order');expect(html).toContain('value=""');expect(html).toContain('in GBP');
 expect(html).not.toContain('checked=""');
});
it('tracks only allowlisted food identifiers after consent, and keeps saving distinct from signup',()=>{
 const b={localStorage:{getItem:()=> 'rejected'},gtag:vi.fn()};
 expect(trackFoodEvent('calculator_use','menu-pricing-calculator',b)).toBe(false);
 b.localStorage.getItem=()=> 'accepted';
 expect(trackFoodEvent('menu_plan_continue','menu-pricing-calculator',b)).toBe(true);
 expect(trackFoodEvent('calculator_use',{input:menuExample},b)).toBe(false);
 expect(trackFoodEvent('unknown','menu-pricing-calculator',b)).toBe(false);
 expect(b.gtag).toHaveBeenCalledExactlyOnceWith('event','menu_plan_continue',{industry:'restaurant',tool:'menu-pricing-calculator'});
 expect(trackProductEvent('save_scenario_open','restaurant',b)).toBe(true);
 expect(trackProductEvent('save_login_click','restaurant',b)).toBe(true);
});
