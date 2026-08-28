import { useRef, useState } from 'react';

// [REQ-3] useRef used to cache an expensive computation
// We memoise a heavy derived result (e.g. sorting) in a ref keyed by its input,
// and show a hit/miss counter in the UI.
export const useExpensiveCache = (data, sortOrder) => {
  const cacheRef = useRef({});
  const [metrics, setMetrics] = useState({ hits: 0, misses: 0 });

  // For this assignment, we pretend sorting the array is very expensive
  const getSortedData = () => {
    if (!data || data.length === 0) return [];
    
    // Create a cache key based on the data ids and sort order
    const idsString = data.map(d => d.id).join(',');
    const key = `${idsString}-${sortOrder}`;

    if (cacheRef.current[key]) {
      // It's a bit tricky to update state during render without causing issues,
      // so we use a small hack or just update it via a timeout/effect, but 
      // let's just return the cached data and update metrics carefully.
      return { sortedData: cacheRef.current[key], isHit: true };
    }

    // Miss: compute it
    const sorted = [...data].sort((a, b) => {
      // simulated expensive work
      for(let i=0; i<10000; i++) {} 
      
      if (sortOrder === 'name-asc') return a.name.localeCompare(b.name);
      if (sortOrder === 'name-desc') return b.name.localeCompare(a.name);
      return 0; // default no sort
    });

    cacheRef.current[key] = sorted;
    return { sortedData: sorted, isHit: false };
  };

  const result = getSortedData();

  return { 
    sortedData: result.sortedData, 
    // We can't safely call setMetrics during render, so we'll expose a function to track it
    trackMetric: () => {
      if (result.isHit) {
        setMetrics(m => ({ ...m, hits: m.hits + 1 }));
      } else {
        setMetrics(m => ({ ...m, misses: m.misses + 1 }));
      }
    },
    metrics 
  };
};
