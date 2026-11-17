import React from'react';
import SecondaryLayout from'../SecondaryLayout.jsx';
import DepositCalculator from'../DepositCalculator.jsx';
import{getLoadedTool}from'../toolContentLoader.js';
import '../free-tools.css';
export default function DepositToolRoute({path,initialTool}){const slug=path.split('/')[2];return <SecondaryLayout><DepositCalculator slug={slug} tool={initialTool||getLoadedTool(slug)}/></SecondaryLayout>;}
