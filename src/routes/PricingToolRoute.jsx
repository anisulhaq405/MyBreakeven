import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import PricingTool from '../PricingTool.jsx';
import { getLoadedTool } from '../toolContentLoader.js';
import '../free-tools.css';
export default function PricingToolRoute({path,initialTool}) { return <SecondaryLayout><PricingTool slug={path.split("/")[2]} tool={initialTool || getLoadedTool(path.split("/")[2])} /></SecondaryLayout>; }
