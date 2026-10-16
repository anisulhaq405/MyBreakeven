import React from 'react';
import { SiteHeader, SiteFooter } from './SiteChrome';
import './secondary-pages.css';
export default function SecondaryLayout({ children }) {
  return <><SiteHeader /><main className="secondary-page">{children}</main><SiteFooter /></>;
}
