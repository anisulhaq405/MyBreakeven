import React from 'react';
import SecondaryLayout from '../SecondaryLayout.jsx';
import { AuthPage, DashboardPage } from '../AuthPages.jsx';
export default function AccountRoute({ path }) {
  return <SecondaryLayout>{path === '/dashboard' ? <DashboardPage /> : <AuthPage path={path} />}</SecondaryLayout>;
}
