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
   createRoot(rootElement).render(<><Home/><RevealAfterRender/></>);
  }else{
   const slug=path.startsWith('/blogs/')?path.split('/')[2]:null;
   const [{default:Page}]=await Promise.all([
    import('./Pages'),
    ...(slug?[import('./blogContentLoader.js').then(({loadBlogPost})=>loadBlogPost(slug))]:[]),
   ]);
   // Reuse visible server markup and attach events instead of replacing it
   // with a loading screen. Blog/private fallbacks use a completed render.
   if(rootElement.dataset.prerendered==='true')hydrateRoot(rootElement,<Page path={path}/>);
   else createRoot(rootElement).render(<><Page path={path}/><RevealAfterRender/></>);
  }
  const consentRoot=document.createElement('div');
  consentRoot.id='analytics-consent-root';
  document.body.appendChild(consentRoot);
  createRoot(consentRoot).render(<AnalyticsConsent/>);
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
