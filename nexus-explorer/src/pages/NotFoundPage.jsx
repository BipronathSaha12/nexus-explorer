import React from 'react';
import { Link } from 'react-router-dom';
import { MdErrorOutline } from 'react-icons/md';

const NotFoundPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 20px', textAlign: 'center' }}>
      <MdErrorOutline style={{ fontSize: '64px', color: 'var(--primary)', marginBottom: '16px' }} />
      <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>404 — Route not found</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>That page doesn't exist in this universe.</p>
      <Link to="/characters" style={{ display: 'inline-flex', alignItems: 'center', padding: '10px 20px', background: 'var(--primary)', color: 'white', borderRadius: '10px', textDecoration: 'none', fontWeight: '500' }}>
        Go back to Characters
      </Link>
    </div>
  );
};

export default NotFoundPage;
