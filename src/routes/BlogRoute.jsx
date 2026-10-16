import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import BlogArticle from '../BlogArticle.jsx';
import '../blogs-page.css';
export default function BlogRoute({path,initialArticle}) { return <SecondaryLayout><BlogArticle slug={path.split("/")[2]} initialArticle={initialArticle} /></SecondaryLayout>; }
