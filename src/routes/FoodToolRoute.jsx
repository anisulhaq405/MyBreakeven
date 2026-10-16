import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import FoodCalculator from '../FoodCalculator.jsx';
import { getLoadedTool } from '../toolContentLoader.js';
import '../free-tools.css';
export default function FoodToolRoute({path,initialTool}) { return <SecondaryLayout><FoodCalculator slug={path.split("/")[2]} tool={initialTool || getLoadedTool(path.split("/")[2])} /></SecondaryLayout>; }
