import React,{useLayoutEffect} from 'react';
import {createRoot,hydrateRoot} from 'react-dom/client';
import AnalyticsConsent from './AnalyticsConsent';
import './styles.css';
import './fonts.css';
import './industries.css';
import './visuals.css';
import './home-presentation.css';
const rootElement=document.getElementById('root');
function RevealAfterRender(){
 useLayoutEffect(()=>{rootElement.removeAttribute('data-booting');},[]);
 return null;
}
async function renderApp(){
 const path=window.location.pathname.replace(/\/$/,'')||'/';
 try{
  if(path==='/'){
   const {default:Home}=await import('./main');
   if(rootElement.dataset.prerendered==='true' && !new URLSearchParams(window.location.search).has('industry') && window.location.hash!=='#pro-analysis')hydrateRoot(rootElement,<Home/>);
   else createRoot(rootElement).render(<><Home/><RevealAfterRender/></>);
  }else{
   const slug=path.startsWith('/blogs/')?path.split('/')[2]:null;
   const [{default:Page}]=await Promise.all([
    import('./Pages'),
    ...(slug?[import('./blogContentLoader.js').then(({loadBlogPost})=>loadBlogPost(slug))]:[]),
   ]);
   // Reuse visible server markup and attach events instead of replacing it
   // with a loading screen. Private fallbacks use a completed render.
   if(rootElement.dataset.prerendered==='true' && !(path==='/blogs' && window.location.search))hydrateRoot(rootElement,<Page path={path}/>);
   else createRoot(rootElement).render(<><Page path={path}/><RevealAfterRender/></>);
  }
  const consentRoot=document.createElement('div');
  consentRoot.id='analytics-consent-root';
  document.body.appendChild(consentRoot);
  createRoot(consentRoot).render(<AnalyticsConsent/>);
  // A guide can link to a section that is rendered by a lazy component.
  // Reapply the native fragment once that section exists, without polling.
  const fragment=decodeURIComponent(window.location.hash.slice(1));
  if(fragment){
   const scrollToFragment=()=>{
    const target=document.getElementById(fragment);
    if(!target)return false;
    target.scrollIntoView();
    return true;
   };
   if(!scrollToFragment()){
    const observer=new MutationObserver(()=>{if(scrollToFragment())observer.disconnect();});
    observer.observe(rootElement,{childList:true,subtree:true});
    window.setTimeout(()=>observer.disconnect(),10000);
   }
  }
 }catch(error){
  rootElement.removeAttribute('data-booting');
  console.error('Page initialization failed; server content remains available.',error);
 }
}
renderApp();
if(import.meta.env.PROD){
 const startMonitoring=()=>{import('./sentry');};
 const scheduleMonitoring=()=>{
  if('requestIdleCallback' in window)window.requestIdleCallback(startMonitoring,{timeout:3000});
  else window.setTimeout(startMonitoring,1500);
 };
 if(document.readyState==='complete')scheduleMonitoring();
 else window.addEventListener('load',scheduleMonitoring,{once:true});
}
