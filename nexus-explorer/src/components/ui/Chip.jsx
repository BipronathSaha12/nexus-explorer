import React from 'react';

const Chip = ({ children, active = false, onClick, className = '', count, ...props }) => {
  return (
    <button 
      className={`ui-chip ${active ? 'active' : ''} ${className}`} 
      onClick={onClick}
      {...props}
    >
      <span className="chip-label">{children}</span>
      {count !== undefined && <span className="chip-count">{count}</span>}
    </button>
  );
};

export default Chip;
