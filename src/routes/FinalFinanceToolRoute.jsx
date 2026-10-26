import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import FinancialRatiosCalculator from '../FinancialRatiosCalculator.jsx';
import EquivalentRatioCalculator from '../EquivalentRatioCalculator.jsx';
import RefinanceCalculator from '../RefinanceCalculator.jsx';
import {getLoadedTool} from '../toolContentLoader.js';
import '../free-tools.css';
export default function FinalFinanceToolRoute({path,initialTool}){const slug=path.split('/')[2],tool=initialTool||getLoadedTool(slug),Component=tool.mode==='financialRatios'?FinancialRatiosCalculator:tool.mode==='equivalentRatio'?EquivalentRatioCalculator:RefinanceCalculator;return <SecondaryLayout><Component tool={tool} slug={slug}/></SecondaryLayout>;}
