import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../api/endpoints';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';
import { formatDate } from '../utils/format';

// [REQ-7] Calling the API with Promises: .then() / .catch() / .finally()
// Explaining what had to be written manually here that React Query gives for free:
// 1. We have to manually manage loading, error, and data states (useState).
// 2. We have to handle race conditions and unmounts using AbortController.
// 3. We have to manually orchestrate the fetch inside useEffect and manage dependencies.
// 4. No automatic caching, so navigating back here will re-fetch and show a loader again.
// 5. No background refetching or prefetching easily available.

const EpisodeListPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchEpisodes = (currentPage, signal) => {
    setIsLoading(true);
    setError(null);

    fetch(`${BASE_URL}/episode?page=${currentPage}`, { signal })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch episodes');
        return res.json();
      })
      .then(json => {
        setData(json);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          setError(err);
        }
      })
      .finally(() => {
        // We cannot just blindly set false if aborted, but for simplicity:
        if (!signal.aborted) {
          setIsLoading(false);
        }
      });
  };

  useEffect(() => {
    // [REQ-6] useEffect with all three dependency-array forms: This one uses a dependency list [page].
    const abortController = new AbortController();
    
    fetchEpisodes(page, abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [page]);

  if (error) {
    return <ErrorState message="Failed to load episodes" onRetry={() => fetchEpisodes(page, new AbortController().signal)} />;
  }

  return (
    <div className="episode-list-page">
      <h2>Episodes</h2>
      <p style={{ color: 'var(--text-muted)' }}>Browse all episodes (Promise version)</p>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {[...Array(10)].map((_, i) => (
             <Skeleton key={i} style={{ height: '60px' }} />
          ))}
        </div>
      ) : data?.results ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '24px' }}>
            {data.results.map(ep => (
              <Card key={ep.id} style={{ padding: '16px' }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '4px' }}>{ep.episode}</div>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{ep.name}</h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>Aired: {formatDate(ep.air_date)}</div>
              </Card>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '24px' }}>
            <Button disabled={page === 1} onClick={() => setPage(p => p - 1)}>&lsaquo; Prev</Button>
            <span style={{ padding: '8px 16px' }}>Page {page} of {data.info.pages}</span>
            <Button disabled={page === data.info.pages} onClick={() => setPage(p => p + 1)}>Next &rsaquo;</Button>
          </div>
        </>
      ) : (
        <p>No episodes found.</p>
      )}
    </div>
  );
};

export default EpisodeListPage;
