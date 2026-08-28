import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { STATUS_OPTIONS, SPECIES_OPTIONS, GENDER_OPTIONS } from '../../api/endpoints';
import Chip from '../ui/Chip';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

const CharacterFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // [REQ-5] Controlled inputs, and one form managed with a single state object
  const [filters, setFilters] = useState({
    name: searchParams.get('name') || '',
    status: searchParams.get('status') || '',
    species: searchParams.get('species') || '',
    gender: searchParams.get('gender') || '',
  });

  const debouncedName = useDebouncedValue(filters.name, 400);

  // Sync state to URL when debounced values change
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams);
    
    // [REQ-4] Immutable state update equivalent for URL search params (building a new object basically)
    // Actually, we just update the params.
    if (debouncedName) newParams.set('name', debouncedName);
    else newParams.delete('name');

    if (filters.status) newParams.set('status', filters.status);
    else newParams.delete('status');

    if (filters.species) newParams.set('species', filters.species);
    else newParams.delete('species');

    if (filters.gender) newParams.set('gender', filters.gender);
    else newParams.delete('gender');

    // Reset to page 1 on filter change
    newParams.set('page', '1');
    setSearchParams(newParams);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedName, filters.status, filters.species, filters.gender]);

  // [REQ-5] One generic change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    // [REQ-4] Immutable state updates on an object using the spread operator
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusClick = (status) => {
    setFilters((prev) => ({ ...prev, status: prev.status === status ? '' : status }));
  };

  const handleClear = () => {
    setFilters({ name: '', status: '', species: '', gender: '' });
  };

  return (
    <div className="character-filters" style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleChange}
          placeholder="Active query..."
          style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface)' }}
        />
        
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>STATUS</span>
          <Chip active={!filters.status} onClick={() => setFilters(prev => ({ ...prev, status: '' }))}>All</Chip>
          {STATUS_OPTIONS.map(status => (
            <Chip 
              key={status} 
              active={filters.status === status} 
              onClick={() => handleStatusClick(status)}
              style={{ textTransform: 'capitalize' }}
            >
              {status}
            </Chip>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>SPECIES</span>
          <select 
            name="species" 
            value={filters.species} 
            onChange={handleChange}
            style={{ padding: '8px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface)' }}
          >
            <option value="">Any</option>
            {SPECIES_OPTIONS.map(species => (
              <option key={species} value={species}>{species}</option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>GENDER</span>
          <select 
            name="gender" 
            value={filters.gender} 
            onChange={handleChange}
            style={{ padding: '8px', borderRadius: '10px', border: '1px solid var(--border)', background: 'var(--surface)' }}
          >
            <option value="">Any</option>
            {GENDER_OPTIONS.map(gender => (
              <option key={gender} value={gender} style={{ textTransform: 'capitalize' }}>{gender}</option>
            ))}
          </select>
        </div>

        <button 
          onClick={handleClear} 
          style={{ background: 'transparent', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 500, marginLeft: 'auto' }}
        >
          × Clear filters
        </button>
      </div>
    </div>
  );
};

export default CharacterFilters;
