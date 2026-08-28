import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { charactersUrl } from '../api/endpoints';
import { get } from '../api/http';
import { useWatchlistState, useWatchlistActions } from '../contexts/watchlist/useWatchlist';
import CharacterCard from '../components/characters/CharacterCard';
import Skeleton from '../components/ui/Skeleton';
import EmptyState from '../components/ui/EmptyState';
import ErrorState from '../components/ui/ErrorState';
import Button from '../components/ui/Button';
import { useExpensiveCache } from '../hooks/useExpensiveCache';

const WatchlistPage = () => {
  const { watchlistIds } = useWatchlistState();
  const { clearWatchlist } = useWatchlistActions();
  
  const [sortOrder, setSortOrder] = useState('none');

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['watchlist', watchlistIds],
    queryFn: async () => {
      if (watchlistIds.length === 0) return [];
      const res = await get(charactersUrl(watchlistIds));
      return Array.isArray(res) ? res : [res]; // API returns single object if only 1 ID requested
    },
    enabled: watchlistIds.length > 0,
  });

  const { sortedData, trackMetric, metrics } = useExpensiveCache(data, sortOrder);

  useEffect(() => {
    // Hack to track metric without causing render loops inside the hook
    if (data) {
      trackMetric();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, sortOrder]);

  if (watchlistIds.length === 0) {
    return (
      <div className="watchlist-page">
        <h2>Watchlist</h2>
        <EmptyState 
          message="Your watchlist is empty" 
          subtext="Open any character and press ★ to save it here."
        />
      </div>
    );
  }

  return (
    <div className="watchlist-page">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h2>Watchlist</h2>
          <p style={{ color: 'var(--text-muted)' }}>{watchlistIds.length} characters saved to your device.</p>
        </div>
        <Button variant="danger" onClick={clearWatchlist}>Clear Watchlist</Button>
      </div>

      <div style={{ background: 'var(--sidebar-raised)', padding: '16px', borderRadius: '10px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Sort:</span>
        <select value={sortOrder} onChange={e => setSortOrder(e.target.value)} style={{ padding: '4px 8px', borderRadius: '6px' }}>
          <option value="none">Default (Add order)</option>
          <option value="name-asc">Name (A-Z)</option>
          <option value="name-desc">Name (Z-A)</option>
        </select>
        
        {/* Cache hit/miss display for REQ-3 */}
        <div style={{ marginLeft: 'auto', fontSize: '12px', background: 'var(--sidebar)', color: 'white', padding: '4px 12px', borderRadius: '999px' }}>
          Cache Hits: {metrics.hits} | Misses: {metrics.misses}
        </div>
      </div>

      {isLoading ? (
        <div className="character-grid">
          {watchlistIds.map(id => (
            <Skeleton key={id} style={{ height: '300px', borderRadius: '14px' }} />
          ))}
        </div>
      ) : isError ? (
        <ErrorState message="Failed to load watchlist" errorDetails={error} onRetry={() => refetch()} />
      ) : (
        <div className="character-grid">
          {sortedData.map(character => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WatchlistPage;
