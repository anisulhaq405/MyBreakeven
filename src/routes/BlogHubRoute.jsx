import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import ClusterDirectory from '../ClusterDirectory.jsx';
import BlogSection from '../BlogSection.jsx';
import { blogListingData } from '../blogListingData.js';
import '../blogs-page.css';
export default function BlogHubRoute({path,initialArticle}) { return <SecondaryLayout><div className="blogs-page">
        <section className="blog-hero">
          <div className="blog-hero-copy">
            <span><i /> MYBREAKEVEN JOURNAL</span>
            <h1>Clear numbers for <em>real business decisions.</em></h1>
            <p>Practical guides to pricing, startup costs, margins and break-even—written for owners doing the work.</p>
            <div className="blog-hero-actions"><a href="#blog">Browse all guides <span aria-hidden="true">↓</span></a><a href="/#calculator">Open calculator <span aria-hidden="true">↗</span></a></div>
          </div>
          <div className="blog-hero-index" aria-label="Guide library summary">
            <div><strong>{blogListingData.posts.length}</strong><span>focused guides</span></div>
            <div><strong>{blogListingData.modelCount}</strong><span>business models</span></div>
            <p><span>Pricing</span><span>Startup</span><span>Margins</span><span>Break-even</span></p>
          </div>
        </section>
        <ClusterDirectory /><BlogSection isHub />
      </div></SecondaryLayout>; }
