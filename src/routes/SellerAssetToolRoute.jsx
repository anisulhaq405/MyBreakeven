import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import SellerAssetCalculator from '../SellerAssetCalculator.jsx';
import {getLoadedTool} from '../toolContentLoader.js';
import '../free-tools.css';

export default function SellerAssetToolRoute({path, initialTool}) {
  const slug = path.split('/')[2];
  return <SecondaryLayout><SellerAssetCalculator slug={slug} tool={initialTool || getLoadedTool(slug)}/></SecondaryLayout>;
}
