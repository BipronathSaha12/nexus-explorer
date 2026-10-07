import React from 'react';
import Card from '../components/ui/Card';

const ApiReferencePage = () => {
  return (
    <div className="page-layout">
      <div className="page-main">
        <Card style={{ padding: '32px' }}>
          <h1 style={{ marginBottom: '16px' }}>API Reference</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            Nexus Explorer is powered entirely by the public Rick and Morty API.
          </p>
          
          <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '12px' }}>REST API</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
            All character, location, and episode data is fetched in real-time from the official REST endpoints. The data is cached locally via React Query to ensure lightning-fast performance and minimal network requests.
          </p>

          <a 
            href="https://rickandmortyapi.com/documentation" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'inline-block', marginTop: '16px', padding: '10px 20px', backgroundColor: 'var(--primary)', color: 'white', borderRadius: '8px', fontWeight: '500' }}
          >
            Read Official API Docs
          </a>
        </Card>
      </div>
    </div>
  );
};

export default ApiReferencePage;
