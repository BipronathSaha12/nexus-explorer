import React from 'react';
import Card from '../components/ui/Card';

const DocumentationPage = () => {
  return (
    <div className="page-layout">
      <div className="page-main">
        <Card style={{ padding: '32px' }}>
          <h1 style={{ marginBottom: '16px' }}>Documentation</h1>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            Welcome to the Nexus Explorer Documentation. This platform is designed to provide deep intelligence and tracking for characters across the multiverse.
          </p>
          
          <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '12px' }}>Getting Started</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
            Use the sidebar to navigate between Characters, Episodes, and Locations. The Dashboard provides a quick overview of recent activity and multiverse statistics.
          </p>

          <h2 style={{ fontSize: '18px', marginTop: '24px', marginBottom: '12px' }}>Watchlist System</h2>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
            You can bookmark any character to your personal Watchlist by clicking the star icon on their card. Your watchlist is persisted locally.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default DocumentationPage;
