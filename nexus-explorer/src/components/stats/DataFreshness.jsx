import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import Card from '../ui/Card';

const DataFreshness = () => {
  const queryClient = useQueryClient();
  const defaultOptions = queryClient.getDefaultOptions().queries || {};
  const staleTime = defaultOptions.staleTime || 0;
  const gcTime = defaultOptions.gcTime || 0;
  const refetchOnWindowFocus = defaultOptions.refetchOnWindowFocus ?? true;

  return (
    <Card style={{ padding: '16px', marginBottom: '24px' }}>
      <h3 style={{ fontSize: '14px', fontWeight: '700', margin: '0 0 16px 0' }}>Data freshness</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: '#D1FAE5', color: '#047857', fontWeight: 600 }}>fresh</span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>characters &middot; page 2</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: '#FEF3C7', color: '#B45309', fontWeight: 600 }}>stale</span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>episodes &middot; list</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: '#E2E8F0', color: '#475569', fontWeight: 600 }}>idle</span>
          <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>locations &middot; list</span>
        </div>
      </div>

      <div style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
        staleTime {staleTime / 60000} min &middot; gcTime {gcTime / 60000} min &middot; refetchOnWindowFocus {refetchOnWindowFocus.toString()}
      </div>
    </Card>
  );
};

export default DataFreshness;
