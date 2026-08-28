import { useContext } from 'react';
import { WatchlistStateContext, WatchlistActionsContext } from './WatchlistContext';

export const useWatchlistState = () => {
  const context = useContext(WatchlistStateContext);
  if (context === undefined) {
    throw new Error('useWatchlistState must be used within a WatchlistProvider');
  }
  return context;
};

export const useWatchlistActions = () => {
  const context = useContext(WatchlistActionsContext);
  if (context === undefined) {
    throw new Error('useWatchlistActions must be used within a WatchlistProvider');
  }
  return context;
};

// Convenience hook to get both (simulates the naive context approach for components that need both)
export const useWatchlist = () => {
  const state = useWatchlistState();
  const actions = useWatchlistActions();
  return { ...state, ...actions };
};
