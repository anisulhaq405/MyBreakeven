import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import AuthorityPage from '../AuthorityPages.jsx';
export default function AuthorityRoute({path,initialArticle}) { return <SecondaryLayout><AuthorityPage path={path} /></SecondaryLayout>; }
