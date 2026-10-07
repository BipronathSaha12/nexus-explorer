import React from 'react';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import Card from '../ui/Card';

const RecentlyViewed = () => {
  const { recentlyViewed } = useRecentlyViewed();

  return (
    <Card style={{ padding: '16px', marginBottom: '24px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 16px 0' }}>Recently viewed</h3>

      {recentlyViewed.length === 0 ? (
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>No characters viewed recently.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recentlyViewed.map(char => (
            <div key={char.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={char.image} alt={char.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ fontSize: '13px', fontWeight: '600', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{char.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{char.species} &middot; {char.status}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentlyViewed;
