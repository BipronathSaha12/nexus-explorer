import React, { useRef, useEffect, useState } from 'react';
import { MdSearch, MdRefresh, MdDarkMode, MdLightMode } from 'react-icons/md';
import { useTheme } from '../../contexts/theme/useTheme';

const Topbar = () => {
  const { theme, toggleTheme } = useTheme();
  
  // [REQ-1] useRef to touch the DOM: focus an input, write innerText
  const searchInputRef = useRef(null);
  const syncTimeRef = useRef(null);

  const [lastSyncTime, setLastSyncTime] = useState(Date.now());

  // [REQ-6] useEffect with empty dependency array and a cleanup function
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl+K or Cmd+K
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // [REQ-6] useEffect with real dependency list (lastSyncTime) + interval cleanup
  useEffect(() => {
    const updateSyncText = () => {
      if (syncTimeRef.current) {
        const secondsAgo = Math.floor((Date.now() - lastSyncTime) / 1000);
        syncTimeRef.current.innerText = `Synced ${secondsAgo}s ago`;
      }
    };

    updateSyncText(); // Initial update
    const interval = setInterval(updateSyncText, 1000);
    return () => clearInterval(interval);
  }, [lastSyncTime]);

  const handleManualRefresh = () => {
    setLastSyncTime(Date.now());
    // Further refetching logic can be added here (e.g., queryClient.refetchQueries)
  };

  const handleCrashTest = () => {
    throw new Error('User initiated Crash Test');
  };

  return (
    <header className="topbar">
      <div className="search-bar">
        <MdSearch className="search-icon" />
        <input 
          type="text" 
          placeholder="Search characters by name..." 
          ref={searchInputRef}
        />
        <span className="search-shortcut">Ctrl K</span>
      </div>

      <div className="topbar-actions">
        <div className="sync-indicator">
          <span className="sync-dot"></span>
          <span ref={syncTimeRef}>Synced 0s ago</span>
        </div>
        
        <button className="icon-button" onClick={handleManualRefresh} title="Refresh">
          <MdRefresh />
        </button>

        <button className="icon-button" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'light' ? <MdDarkMode /> : <MdLightMode />}
        </button>

        <button className="crash-button" onClick={handleCrashTest}>
          Crash Test
        </button>
      </div>
    </header>
  );
};

export default Topbar;
