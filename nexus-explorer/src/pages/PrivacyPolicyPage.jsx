import React from 'react';
import Card from '../components/ui/Card';

const PrivacyPolicyPage = () => {
  return (
    <div className="page-layout">
      <div className="page-main">
        <Card style={{ padding: '32px' }}>
          <h1 style={{ marginBottom: '16px' }}>Privacy Policy</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            Last updated: October 2026
          </p>
          
          <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '12px' }}>Data Collection</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
            Nexus Explorer does not collect any personally identifiable information. We operate strictly as a client-side interface to public APIs.
          </p>

          <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '12px' }}>Local Storage</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
            We use your browser's Local Storage exclusively to save your preferences, such as your Theme selection (Light/Dark mode) and your personal Watchlist of characters. This data never leaves your device.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
