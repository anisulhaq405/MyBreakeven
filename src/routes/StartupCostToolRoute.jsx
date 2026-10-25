import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import StartupCostCalculator from '../StartupCostCalculator.jsx';
import {getLoadedTool} from '../toolContentLoader.js';
import '../free-tools.css';
export default function StartupCostToolRoute({path,initialTool}){const slug=path.split('/')[2];return <SecondaryLayout><StartupCostCalculator slug={slug} tool={initialTool||getLoadedTool(slug)}/></SecondaryLayout>;}
