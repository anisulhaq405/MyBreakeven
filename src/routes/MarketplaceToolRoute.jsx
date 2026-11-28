import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import MarketplaceFeeCalculator from '../MarketplaceFeeCalculator.jsx';
import {getLoadedTool} from '../toolContentLoader.js';
import '../free-tools.css';

export default function MarketplaceToolRoute({path, initialTool}) {
  const slug = path.split('/')[2];
  return <SecondaryLayout><MarketplaceFeeCalculator slug={slug} tool={initialTool || getLoadedTool(slug)}/></SecondaryLayout>;
}
