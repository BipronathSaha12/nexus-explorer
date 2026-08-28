import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from './queryClient';
import { ThemeProvider } from '../contexts/theme/ThemeProvider';
import { WatchlistProvider } from '../contexts/watchlist/WatchlistProvider';
import ErrorBoundary from '../components/error/ErrorBoundary';

export const AppProviders = ({ children }) => {
  return (
    <ErrorBoundary context="AppProviders">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <WatchlistProvider>
            {children}
          </WatchlistProvider>
        </ThemeProvider>
        {/* React Query Devtools included as required */}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
