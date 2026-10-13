import React from 'react';
import {renderToString} from 'react-dom/server';
import {it,expect,vi} from 'vitest';
import FoodCalculator from './FoodCalculator';
import {foodTools} from './foodTools';
import {recipeMenuTransfer} from './foodCostTransfer';
import {cakeExample} from './foodCalculatorDefaults';
it('keeps browser initial markup identical to prerendering without consuming a pending transfer',()=>{
 const props={tool:foodTools['menu-pricing-calculator'],slug:'menu-pricing-calculator'};
 const server=renderToString(<FoodCalculator {...props}/>);
 const getItem=vi.fn(()=>JSON.stringify(recipeMenuTransfer(cakeExample,'GBP')));
 const removeItem=vi.fn();
 vi.stubGlobal('window',{sessionStorage:{getItem,removeItem}});
 try {
  expect(renderToString(<FoodCalculator {...props}/>)).toBe(server);
  expect(getItem).not.toHaveBeenCalled();
  expect(removeItem).not.toHaveBeenCalled();
 } finally {vi.unstubAllGlobals();}
});
