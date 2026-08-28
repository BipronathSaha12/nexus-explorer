import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useTheme } from '../contexts/theme/useTheme';
import { useWatchlistActions } from '../contexts/watchlist/useWatchlist';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const SettingsPage = () => {
  const queryClient = useQueryClient();
  const { theme, toggleTheme } = useTheme();
  const { clearWatchlist } = useWatchlistActions();

  const handleClearCache = () => {
    queryClient.clear();
    alert('React Query cache cleared!');
  };

  const handleClearWatchlist = () => {
    if (window.confirm('Are you sure you want to clear your watchlist?')) {
      clearWatchlist();
    }
  };

  // [REQ-20] Auto caching + background sync controls: staleTime and refetchOnWindowFocus
  // To change them at runtime, we can get current default options, modify them, and set them back.
  const queryConfig = queryClient.getDefaultOptions().queries;
  
  const handleToggleRefetchOnFocus = () => {
    queryClient.setDefaultOptions({
      queries: {
        ...queryConfig,
        refetchOnWindowFocus: !queryConfig.refetchOnWindowFocus,
      },
    });
    // Force a re-render by mutating state or we can just rely on the fact that this is a demo.
    // In a real app we might put this config in context, but setting it on queryClient works.
    alert(`refetchOnWindowFocus set to ${!queryConfig.refetchOnWindowFocus}`);
  };

  const handleChangeStaleTime = (e) => {
    const newStaleTime = parseInt(e.target.value);
    queryClient.setDefaultOptions({
      queries: {
        ...queryConfig,
        staleTime: newStaleTime,
      },
    });
    alert(`staleTime set to ${newStaleTime}ms`);
  };

  return (
    <div className="settings-page">
      <h2>Settings</h2>
      <p style={{ color: 'var(--text-muted)' }}>Configure app behavior and cache settings.</p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '24px', maxWidth: '600px' }}>
        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Appearance</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '500' }}>Theme</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Toggle between light and dark mode</div>
            </div>
            <Button variant="secondary" onClick={toggleTheme}>
              {theme === 'light' ? 'Switch to Dark' : 'Switch to Light'}
            </Button>
          </div>
        </Card>

        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>React Query Cache Controls</h3>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <div style={{ fontWeight: '500' }}>staleTime</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Time before data is considered stale</div>
            </div>
            <select 
              onChange={handleChangeStaleTime} 
              style={{ padding: '8px', borderRadius: '10px', border: '1px solid var(--border)' }}
            >
              <option value="300000">5 minutes (default)</option>
              <option value="10000">10 seconds</option>
              <option value="0">0 seconds (always fetch)</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <div>
              <div style={{ fontWeight: '500' }}>refetchOnWindowFocus</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Refetch data when the window regains focus</div>
            </div>
            <Button variant="secondary" onClick={handleToggleRefetchOnFocus}>
              Toggle
            </Button>
          </div>

          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '16px' }}>
            <Button variant="danger" onClick={handleClearCache}>
              Clear query cache
            </Button>
          </div>
        </Card>

        <Card style={{ padding: '24px' }}>
          <h3 style={{ margin: '0 0 16px 0' }}>Data Management</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: '500' }}>Personal Watchlist</div>
              <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Permanently delete all saved characters</div>
            </div>
            <Button variant="danger" onClick={handleClearWatchlist}>
              Clear Watchlist
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
