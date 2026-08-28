import React from 'react';
import { MdSearchOff } from 'react-icons/md';
import Button from './Button';

const EmptyState = ({ message = 'No results', subtext = 'Try another name or clear the filters.', onClear }) => {
  return (
    <div className="ui-empty-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: '14px', border: '1px solid var(--border)' }}>
      <MdSearchOff style={{ fontSize: '48px', color: 'var(--primary-soft)', marginBottom: '16px' }} />
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{message}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '300px' }}>{subtext}</p>
      
      {onClear && (
        <Button variant="primary" onClick={onClear}>
          Clear filters
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
