import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import FinanceDay1Calculator from '../FinanceDay1Calculator.jsx';
import {getLoadedTool} from '../toolContentLoader.js';
import '../free-tools.css';
export default function FinanceToolRoute({path,initialTool}){const slug=path.split('/')[2];return <SecondaryLayout><FinanceDay1Calculator slug={slug} tool={initialTool||getLoadedTool(slug)}/></SecondaryLayout>;}
