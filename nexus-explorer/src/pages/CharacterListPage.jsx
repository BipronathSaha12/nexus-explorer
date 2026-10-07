import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { characterListUrl } from '../api/endpoints';
import { get } from '../api/http';
import CharacterFilters from '../components/characters/CharacterFilters';
import CharacterGrid from '../components/characters/CharacterGrid';
import Pagination from '../components/ui/Pagination';
import ErrorState from '../components/ui/ErrorState';
import EmptyState from '../components/ui/EmptyState';
import Skeleton from '../components/ui/Skeleton';
import WatchlistPanel from '../components/watchlist/WatchlistPanel';
import RecentlyViewed from '../components/stats/RecentlyViewed';
import DataFreshness from '../components/stats/DataFreshness';

const fetchCharacters = async (params) => {
  const data = await get(characterListUrl(params));
  return data;
};

const CharacterListPage = () => {
  // [REQ-12] Passing parameters via navigation: useSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  
  const page = parseInt(searchParams.get('page')) || 1;
  const name = searchParams.get('name') || '';
  const status = searchParams.get('status') || '';
  const species = searchParams.get('species') || '';
  const gender = searchParams.get('gender') || '';

  const filters = { page, name, status, species, gender };
  // Remove empty string filters for the API request
  const queryParams = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v !== ''));

  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['characters', queryParams],
    queryFn: () => fetchCharacters(queryParams),
    placeholderData: (previousData) => previousData, // keepPreviousData replacement in v5
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handlePageChange = (newPage) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('page', newPage.toString());
    setSearchParams(newParams);
  };

  const handleClearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      {/* Main Content */}
      <div style={{ flex: 1, minWidth: 0 }} className="character-list-page">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '16px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 4px 0' }}>Characters</h2>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>
              Browse characters &middot; filtered results update the URL so the view is shareable.
            </p>
          </div>
        </div>

        <CharacterFilters />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            Results
            {/* [REQ-20] Auto caching + background sync: while background refetch is running */}
            {isFetching && !isLoading && (
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: 'var(--query-stale-bg)', color: 'var(--query-stale-text)' }}>
                background refetching...
              </span>
            )}
          </h3>
        </div>

        {!isOnline && data?.results && (
          <div style={{ background: 'var(--query-stale-bg)', color: 'var(--query-stale-text)', padding: '12px', borderRadius: '8px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📡</span> You are offline — showing data cached from your previous visit.
          </div>
        )}

        {isLoading ? (
          <div className="character-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '8px', border: '1px solid var(--border)', borderRadius: '14px', padding: '14px', background: 'var(--surface)' }}>
                 <Skeleton style={{ height: '200px', borderRadius: '8px' }} />
                 <Skeleton style={{ height: '20px', width: '60%' }} />
                 <Skeleton style={{ height: '14px', width: '40%' }} />
              </div>
            ))}
          </div>
        ) : isError ? (
          error.message === 'There is nothing here' ? (
            <EmptyState onClear={handleClearFilters} />
          ) : (
            <ErrorState message="Request failed" errorDetails={error} onRetry={() => refetch()} />
          )
        ) : data?.results ? (
          <>
            <CharacterGrid characters={data.results} />
            
            <Pagination 
              currentPage={page} 
              totalPages={data.info.pages} 
              onPageChange={handlePageChange}
              filters={{ name, status, species, gender }}
            />
          </>
        ) : null}
      </div>

      {/* Right Rail */}
      <div style={{ width: '320px', flexShrink: 0 }} className="right-rail">
        <WatchlistPanel />
        <RecentlyViewed />
        <DataFreshness />
      </div>
    </div>
  );
};

export default CharacterListPage;
