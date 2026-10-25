import StartupCostCalculator from './StartupCostCalculator.jsx';
import NetCashFlowCalculator from './NetCashFlowCalculator.jsx';
import OperatingMarginCalculator from './OperatingMarginCalculator.jsx';
import RoiCalculator from './RoiCalculator.jsx';
import PricingTool from './PricingTool.jsx';
export { default as FreeToolsHub } from './CalculatorDirectory.jsx';
import PlanningCalculator from './PlanningCalculator';
import {responsiveFeatureProps} from './responsiveFeatureImages.js';
import FoodCalculator from './FoodCalculator';
import CurrencySelector from './CurrencySelector';
import React, { useMemo, useState } from 'react';
import { freeTools } from './freeTools';
import { calculatePriceChange } from './freeToolEngine';
import './free-tools.css';
import { ArrowUpRight, Search, Calculator, Check, SlidersHorizontal } from 'lucide-react';
import FreeToolGuide from './FreeToolGuide';
import BusinessTool from './BusinessTool';
const count=n=>new Intl.NumberFormat('en-US',{maximumFractionDigits:0}).format(n);


export default function FreeTool({slug}) {const tool=freeTools[slug]; return tool.mode==="startupCost"?<StartupCostCalculator tool={tool} slug={slug}/>:tool.mode==="netCashFlow"?<NetCashFlowCalculator tool={tool} slug={slug}/>:tool.mode==="operatingMargin"?<OperatingMarginCalculator tool={tool} slug={slug}/>:tool.mode==="roi"?<RoiCalculator tool={tool} slug={slug}/>: ["employeeCost","cashForecast"].includes(tool.mode)?<PlanningCalculator tool={tool} slug={slug}/>:tool.mode==="foodWorkflow"?<FoodCalculator tool={tool} slug={slug}/>: ["discount","increase"].includes(tool.mode)?<PricingTool slug={slug} tool={tool}/>:<BusinessTool slug={slug} tool={tool}/>;}
