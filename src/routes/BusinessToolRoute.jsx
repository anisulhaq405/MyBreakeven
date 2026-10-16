import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import BusinessTool from '../BusinessTool.jsx';
import { getLoadedTool } from '../toolContentLoader.js';
import '../free-tools.css';
export default function BusinessToolRoute({path,initialTool}) { return <SecondaryLayout><BusinessTool slug={path.split("/")[2]} tool={initialTool || getLoadedTool(path.split("/")[2])} /></SecondaryLayout>; }
