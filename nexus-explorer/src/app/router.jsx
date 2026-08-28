import React from 'react';
import { createBrowserRouter, createHashRouter } from 'react-router-dom';
import AppShell from '../components/layout/AppShell';
import DashboardPage from '../pages/DashboardPage';
import CharacterListPage from '../pages/CharacterListPage';
import CharacterDetailPage from '../pages/CharacterDetailPage';
import EpisodeListPage from '../pages/EpisodeListPage';
import LocationListPage from '../pages/LocationListPage';
import WatchlistPage from '../pages/WatchlistPage';
import ComparePage from '../pages/ComparePage';
import SettingsPage from '../pages/SettingsPage';
import NotFoundPage from '../pages/NotFoundPage';

// [REQ-9] React Router setup: BrowserRouter, a layout route with <Outlet />, nested routes and a catch-all 404 route
const routes = [
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'characters', element: <CharacterListPage /> },
      { path: 'characters/:id', element: <CharacterDetailPage /> },
      { path: 'episodes', element: <EpisodeListPage /> },
      { path: 'locations', element: <LocationListPage /> },
      { path: 'watchlist', element: <WatchlistPage /> },
      { path: 'compare', element: <ComparePage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: '*', element: <NotFoundPage /> }, // Catch-all 404 route
    ],
  },
];

// [REQ-11] BrowserRouter vs HashRouter: wire both (switch with an env variable)
const isHashMode = import.meta.env.VITE_ROUTER_MODE === 'hash';

export const router = isHashMode 
  ? createHashRouter(routes) 
  : createBrowserRouter(routes);
