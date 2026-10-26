import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import RetirementCalculator from '../RetirementCalculator.jsx';
import {getLoadedTool} from '../toolContentLoader.js';
import '../free-tools.css';
export default function RetirementToolRoute({path,initialTool}){const slug=path.split('/')[2];return <SecondaryLayout><RetirementCalculator slug={slug} tool={initialTool||getLoadedTool(slug)}/></SecondaryLayout>;}
