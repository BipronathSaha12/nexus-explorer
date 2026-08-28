import React from 'react';
import Card from '../ui/Card';

const StatCard = ({ label, value, loading }) => {
  return (
    <Card className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        {loading ? <span className="skeleton skeleton-text" style={{ width: '60px', height: '32px' }}></span> : value}
      </div>
    </Card>
  );
};

export default StatCard;
