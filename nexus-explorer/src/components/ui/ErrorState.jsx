import React from 'react';
import { MdErrorOutline } from 'react-icons/md';
import Button from './Button';

const ErrorState = ({ message = 'Request failed', subtext = 'We couldn\'t reach the character service. Please check your connection and try again.', onRetry, errorDetails }) => {
  return (
    <div className="ui-error-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', backgroundColor: 'var(--surface)', borderRadius: '14px', border: '1px solid var(--border)' }}>
      <MdErrorOutline style={{ fontSize: '48px', color: 'var(--danger)', marginBottom: '16px' }} />
      <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '8px' }}>{message}</h3>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px', maxWidth: '400px' }}>{subtext}</p>
      
      {errorDetails && (
        <details style={{ marginBottom: '24px', color: 'var(--text-muted)', fontSize: '12px', textAlign: 'left', background: 'var(--page-background)', padding: '12px', borderRadius: '8px', maxWidth: '100%', overflowX: 'auto' }}>
          <summary style={{ cursor: 'pointer', fontWeight: '600' }}>Technical details</summary>
          <pre style={{ marginTop: '8px', whiteSpace: 'pre-wrap' }}>{errorDetails.toString()}</pre>
        </details>
      )}

      {onRetry && (
        <Button variant="primary" onClick={onRetry}>
          Retry
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
