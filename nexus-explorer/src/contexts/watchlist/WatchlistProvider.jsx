import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { WatchlistStateContext, WatchlistActionsContext } from './WatchlistContext';

export const WatchlistProvider = ({ children }) => {
  const [watchlistIds, setWatchlistIds] = useState(() => {
    const saved = localStorage.getItem('nexus-watchlist');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexus-watchlist', JSON.stringify(watchlistIds));
  }, [watchlistIds]);

  // [REQ-4] Immutable state updates on an array using the spread operator
  const toggleWatchlist = useCallback((id) => {
    setWatchlistIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  }, []);

  const clearWatchlist = useCallback(() => {
    setWatchlistIds([]);
  }, []);

  // [REQ-16] A context performance pitfall, demonstrated and then fixed
  // By memoizing the state and actions, and splitting them, we prevent unnecessary re-renders.
  const stateValue = useMemo(() => ({ watchlistIds }), [watchlistIds]);
  const actionsValue = useMemo(() => ({ toggleWatchlist, clearWatchlist }), [toggleWatchlist, clearWatchlist]);

  return (
    <WatchlistStateContext.Provider value={stateValue}>
      <WatchlistActionsContext.Provider value={actionsValue}>
        {children}
      </WatchlistActionsContext.Provider>
    </WatchlistStateContext.Provider>
  );
};
