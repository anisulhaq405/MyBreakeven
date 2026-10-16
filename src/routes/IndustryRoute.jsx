import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import IndustryPage from '../IndustryPage.jsx';
export default function IndustryRoute({path,initialArticle}) { return <SecondaryLayout><IndustryPage slug={path.split("/")[2]} /></SecondaryLayout>; }
