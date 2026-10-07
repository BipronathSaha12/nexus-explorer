import React, { useState, useEffect, useCallback } from 'react';

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState(() => {
    const saved = localStorage.getItem('nexus-recently-viewed');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('nexus-recently-viewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  const addViewed = useCallback((character) => {
    setRecentlyViewed(prev => {
      // [REQ-4] Immutable state updates on an array using the spread operator
      const filtered = prev.filter(c => c.id !== character.id);
      return [character, ...filtered].slice(0, 5);
    });
  }, []);

  return { recentlyViewed, addViewed };
}
