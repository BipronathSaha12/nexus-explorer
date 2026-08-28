import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Breadcrumbs from './Breadcrumbs';

const AppShell = () => {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        <Topbar />
        <div className="page-container">
          <Breadcrumbs />
          <div className="page-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppShell;
