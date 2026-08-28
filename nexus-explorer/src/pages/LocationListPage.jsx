import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../api/endpoints';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';

// [REQ-8] Calling the API with async / await + try / catch / finally + AbortController
const LocationListPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const abortController = new AbortController();
    // Also using an ignore flag to demonstrate guarding against race conditions
    let ignore = false;

    const fetchLocations = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const res = await fetch(`${BASE_URL}/location?page=${page}`, { 
          signal: abortController.signal 
        });
        
        if (!res.ok) throw new Error('Failed to fetch locations');
        
        const json = await res.json();
        
        if (!ignore) {
          setData(json);
        }
      } catch (err) {
        if (!ignore && err.name !== 'AbortError') {
          setError(err);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    };

    fetchLocations();

    return () => {
      ignore = true;
      abortController.abort();
    };
  }, [page]);

  if (error) {
    return <ErrorState message="Failed to load locations" onRetry={() => setPage(1)} />; // basic retry
  }

  return (
    <div className="location-list-page">
      <h2>Locations</h2>
      <p style={{ color: 'var(--text-muted)' }}>Browse all locations (Async/Await version)</p>

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '24px' }}>
          {[...Array(10)].map((_, i) => (
             <Skeleton key={i} style={{ height: '60px' }} />
          ))}
        </div>
      ) : data?.results ? (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px', marginTop: '24px' }}>
            {data.results.map(loc => (
              <Card key={loc.id} style={{ padding: '16px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '16px' }}>{loc.name}</h3>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
                  {loc.type} &middot; {loc.dimension}
                </div>
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
        <p>No locations found.</p>
      )}
    </div>
  );
};

export default LocationListPage;
