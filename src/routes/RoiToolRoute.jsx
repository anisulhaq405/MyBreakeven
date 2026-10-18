import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import RoiCalculator from '../RoiCalculator.jsx';
import {getLoadedTool} from '../toolContentLoader.js';
import '../free-tools.css';
export default function RoiToolRoute({path,initialTool}){const slug=path.split('/')[2];return <SecondaryLayout><RoiCalculator slug={slug} tool={initialTool||getLoadedTool(slug)}/></SecondaryLayout>;}
