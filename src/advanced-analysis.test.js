import { describe, expect, it } from "vitest";
import { calculate } from "./engine";
import { advancedAnalysis } from "./advancedAnalysis";

const input={price:100,materialCost:10,laborCost:30,otherVariableCost:5,acquisitionCost:5,fixedCosts:1000,ownerPay:500,targetProfit:500,paymentFeePct:0,workers:2,hoursPerWorker:40,hoursPerJob:2,utilizationPct:80,conversionPct:25};

describe("Pro advanced analysis",()=>{
  const result=calculate(input), analysis=advancedAnalysis(input,result,{plannedUnits:40,growthPct:2});
  it("separates accounting break-even from target-profit revenue",()=>{expect(analysis.accountingRevenue).toBe(3000);expect(analysis.targetRevenue).toBe(4000)});
  it("calculates margin of safety and a capacity-safe price",()=>{expect(analysis.marginSafetyRevenue).toBe(1000);expect(analysis.marginSafetyPct).toBe(25);expect(analysis.capacityPrice).toBeGreaterThan(50)});
  it("ranks sensitivity drivers and builds a price-volume heatmap",()=>{expect(analysis.drivers).toHaveLength(7);expect(analysis.heatmap).toHaveLength(4);expect(analysis.heatmap[0].cells).toHaveLength(5)});
  it("builds a twelve-month compounding forecast",()=>{expect(analysis.forecast).toHaveLength(12);expect(analysis.forecast[11].units).toBeGreaterThan(analysis.forecast[0].units)});
});
