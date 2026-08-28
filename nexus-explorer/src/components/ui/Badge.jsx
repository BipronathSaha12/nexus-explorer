import React from 'react';

const Badge = ({ children, status = 'unknown', className = '', ...props }) => {
  return (
    <span className={`ui-badge status-${status} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
