import React from 'react';

const WatchlistButton = ({ isWatchlisted, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      style={{ 
        background: 'white', 
        border: 'none', 
        borderRadius: '50%', 
        width: '32px', 
        height: '32px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        cursor: 'pointer', 
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)', 
        color: isWatchlisted ? 'var(--primary)' : 'var(--text-muted)' 
      }}
    >
      {isWatchlisted ? '★' : '☆'}
    </button>
  );
};

export default WatchlistButton;
