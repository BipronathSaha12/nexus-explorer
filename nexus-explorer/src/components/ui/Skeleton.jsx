import React from 'react';

const Skeleton = ({ className = '', style = {} }) => {
  return (
    <div className={`ui-skeleton ${className}`} style={style}>
      <div className="skeleton-pulse"></div>
    </div>
  );
};

export default Skeleton;
