import React from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { characterListUrl } from '../../api/endpoints';
import { get } from '../../api/http';
import Button from './Button';

const Pagination = ({ currentPage, totalPages, onPageChange, filters }) => {
  const queryClient = useQueryClient();

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  // [REQ-21] Prefetching: queryClient.prefetchQuery on Prev / Next hover
  const prefetchPage = (page) => {
    if (page < 1 || page > totalPages) return;
    
    queryClient.prefetchQuery({
      queryKey: ['characters', { page: page.toString(), ...filters }],
      queryFn: async () => {
        const data = await get(characterListUrl({ page: page.toString(), ...filters }));
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  // Generate page numbers
  const pages = [];
  // For simplicity in this assignment, we show a few pages around the current
  const startPage = Math.max(1, currentPage - 1);
  const endPage = Math.min(totalPages, currentPage + 1);
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination" style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center', marginTop: '24px' }}>
      <Button 
        variant="secondary" 
        onClick={handlePrev} 
        disabled={currentPage === 1}
        onMouseEnter={() => prefetchPage(currentPage - 1)}
      >
        &lsaquo; Prev
      </Button>
      
      {startPage > 1 && (
        <>
          <Button variant="secondary" onClick={() => onPageChange(1)}>1</Button>
          {startPage > 2 && <span style={{ color: 'var(--text-muted)' }}>...</span>}
        </>
      )}
      
      {pages.map(p => (
        <Button 
          key={p} 
          variant={p === currentPage ? 'primary' : 'secondary'}
          onClick={() => onPageChange(p)}
        >
          {p}
        </Button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span style={{ color: 'var(--text-muted)' }}>...</span>}
          <Button variant="secondary" onClick={() => onPageChange(totalPages)}>{totalPages}</Button>
        </>
      )}

      <Button 
        variant="secondary" 
        onClick={handleNext} 
        disabled={currentPage === totalPages}
        onMouseEnter={() => prefetchPage(currentPage + 1)}
      >
        Next &rsaquo;
      </Button>
    </div>
  );
};

export default Pagination;
