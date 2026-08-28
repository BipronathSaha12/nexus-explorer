import { QueryClient } from '@tanstack/react-query';

// [REQ-18] React Query setup: QueryClientProvider, sensible default options
// [REQ-20] Auto caching + background sync: staleTime, gcTime, refetchOnWindowFocus
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 30 * 60 * 1000, // 30 minutes
      refetchOnWindowFocus: true,
      retry: 1, // Only retry once by default
    },
  },
});

// Structured query keys for consistency
export const QUERY_KEYS = {
  characters: (page, filters) => ['characters', { page, ...filters }],
  characterDetail: (id) => ['character', id],
  episodes: () => ['episodes'],
  locations: () => ['locations'],
  watchlist: (ids) => ['watchlist', ids],
};
