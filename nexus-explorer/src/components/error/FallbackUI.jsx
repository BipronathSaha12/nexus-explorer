import React from 'react';

const FallbackUI = ({ error, resetBoundary }) => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'var(--surface)', color: 'var(--danger)', borderRadius: '14px', border: '1px solid var(--border)' }}>
      <h2>Something went wrong.</h2>
      <p style={{ color: 'var(--text-muted)' }}>The application encountered an unexpected error.</p>
      <details style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
        {error && error.toString()}
      </details>
      <button onClick={resetBoundary} className="ui-button variant-primary" style={{ marginTop: '10px' }}>
        Try again
      </button>
    </div>
  );
};

export default FallbackUI;
