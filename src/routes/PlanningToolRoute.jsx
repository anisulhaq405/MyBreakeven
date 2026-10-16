import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import PlanningCalculator from '../PlanningCalculator.jsx';
import { getLoadedTool } from '../toolContentLoader.js';
import '../free-tools.css';
export default function PlanningToolRoute({path,initialTool}) { return <SecondaryLayout><PlanningCalculator slug={path.split("/")[2]} tool={initialTool || getLoadedTool(path.split("/")[2])} /></SecondaryLayout>; }
