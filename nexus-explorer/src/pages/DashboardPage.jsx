import React from 'react';
import { useQueries } from '@tanstack/react-query';
import { characterListUrl } from '../api/endpoints';
import { get } from '../api/http';
import { useWatchlistState } from '../contexts/watchlist/useWatchlist';
import StatGrid from '../components/stats/StatGrid';
import StatCard from '../components/stats/StatCard';
import ErrorState from '../components/ui/ErrorState';

const fetchCount = async (params) => {
  const data = await get(characterListUrl(params));
  return data.info.count;
};

const DashboardPage = () => {
  const { watchlistIds } = useWatchlistState();

  const queries = useQueries({
    queries: [
      {
        queryKey: ['characters', 'totalCount'],
        queryFn: () => fetchCount({}),
      },
      {
        queryKey: ['characters', 'count', { status: 'alive' }],
        queryFn: () => fetchCount({ status: 'alive' }),
      },
      {
        queryKey: ['characters', 'count', { status: 'dead' }],
        queryFn: () => fetchCount({ status: 'dead' }),
      },
    ],
  });

  const [totalQuery, aliveQuery, deadQuery] = queries;

  // [REQ-19] React Query loading / error / empty handling
  if (totalQuery.isError || aliveQuery.isError || deadQuery.isError) {
    return (
      <ErrorState 
        message="Failed to load dashboard stats."
        onRetry={() => {
          totalQuery.refetch();
          aliveQuery.refetch();
          deadQuery.refetch();
        }}
      />
    );
  }

  // "Recently viewed" list: we can read from localStorage directly in the component, or maintain a small state.
  // We'll leave the UI part for now, and fulfill the core reqs.
  const recentlyViewed = JSON.parse(localStorage.getItem('nexus-recently-viewed') || '[]');

  return (
    <div className="dashboard-page">
      <div className="dashboard-header" style={{ marginBottom: '24px' }}>
        {/* A short greeting line rendered with an immediately-invoked function inside JSX */}
        <h2 style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.3px', margin: 0 }}>
          {(() => {
            const hour = new Date().getHours();
            if (hour < 12) return 'Good morning';
            if (hour < 18) return 'Good afternoon';
            return 'Good evening';
          })()}, team.
        </h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '4px' }}>Here's what is happening in the universe today.</p>
      </div>

      <StatGrid>
        <StatCard 
          label="TOTAL CHARACTERS" 
          value={totalQuery.data} 
          loading={totalQuery.isLoading} 
        />
        <StatCard 
          label="ALIVE" 
          value={aliveQuery.data} 
          loading={aliveQuery.isLoading} 
        />
        <StatCard 
          label="DEAD" 
          value={deadQuery.data} 
          loading={deadQuery.isLoading} 
        />
        <StatCard 
          label="IN WATCHLIST" 
          value={watchlistIds.length < 10 ? `0${watchlistIds.length}` : watchlistIds.length} 
          loading={false} 
        />
      </StatGrid>

      <div style={{ marginTop: '40px' }}>
        <h3>Recently Viewed</h3>
        {recentlyViewed.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>You haven't viewed any characters yet.</p>
        ) : (
          <ul style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
            {recentlyViewed.map(c => (
              <li key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'var(--surface)', padding: '12px', borderRadius: '10px', border: '1px solid var(--border)' }}>
                <img src={c.image} alt={c.name} style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
                <div>
                  <div style={{ fontWeight: '600' }}>{c.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{c.species} &middot; {c.status}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
