import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import RoasCalculator from '../RoasCalculator.jsx';
import {getLoadedTool} from '../toolContentLoader.js';
import '../free-tools.css';
import '../roas-calculator.css';
export default function RoasToolRoute({path,initialTool}) {
  const slug=path.split('/')[2];
  return <SecondaryLayout><RoasCalculator slug={slug} tool={initialTool || getLoadedTool(slug)}/></SecondaryLayout>;
}
