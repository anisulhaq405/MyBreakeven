import {readAnalyticsChoice} from './analyticsChoice.js';

const events=new Set(['calculator_view','calculator_use','calculate_success','validation_error','reset_example','schedule_download','related_guide_click']);
const calculators=new Set(['ebitda-calculator','future-value-calculator']);
// Keep payload construction here: financial values and link URLs are never accepted.
export function trackDay1Event(event,calculator,browser=typeof window==='undefined'?null:window){
 if(!browser||!events.has(event)||!calculators.has(calculator)||readAnalyticsChoice(browser)!=='accepted'||typeof browser.gtag!=='function')return false;
 browser.gtag('event',event,{calculator});
 return true;
}
