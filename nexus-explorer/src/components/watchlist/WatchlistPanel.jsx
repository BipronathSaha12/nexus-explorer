import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useWatchlistState, useWatchlistActions } from '../../contexts/watchlist/useWatchlist';
import { charactersUrl } from '../../api/endpoints';
import { get } from '../../api/http';
import Card from '../ui/Card';

const fetchWatchlistCharacters = async (ids) => {
  if (ids.length === 0) return [];
  const data = await get(charactersUrl(ids));
  return Array.isArray(data) ? data : [data];
};

const WatchlistPanel = () => {
  const { watchlistIds } = useWatchlistState();
  const { toggleWatchlist, clearWatchlist } = useWatchlistActions();

  const { data: characters, isLoading } = useQuery({
    queryKey: ['watchlist', watchlistIds],
    queryFn: () => fetchWatchlistCharacters(watchlistIds),
    enabled: watchlistIds.length > 0,
  });

  return (
    <Card style={{ padding: '16px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: '700', margin: 0 }}>Watchlist</h3>
        {watchlistIds.length > 0 && (
          <button onClick={clearWatchlist} style={{ background: 'none', border: 'none', color: 'var(--primary)', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>
            Clear all
          </button>
        )}
      </div>

      {watchlistIds.length === 0 ? (
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Your watchlist is empty.</p>
      ) : isLoading ? (
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Loading...</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {characters?.map(char => (
            <div key={char.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={char.image} alt={char.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{char.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{char.species} &middot; {char.status}</div>
              </div>
              <button 
                onClick={() => toggleWatchlist(char.id)}
                style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: '16px', cursor: 'pointer', padding: '4px' }}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default WatchlistPanel;
