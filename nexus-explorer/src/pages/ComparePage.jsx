import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useQueries } from '@tanstack/react-query';
import { characterUrl } from '../api/endpoints';
import { get } from '../api/http';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Skeleton from '../components/ui/Skeleton';
import Button from '../components/ui/Button';

const fetchCharacter = async (id) => {
  if (!id) return null;
  const data = await get(characterUrl(id));
  return data;
};

const ComparePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const idA = searchParams.get('a') || '';
  const idB = searchParams.get('b') || '';

  // [REQ-5] Controlled inputs, and one form managed “like a pro” with a single state object
  const [form, setForm] = useState({
    inputA: idA,
    inputB: idB,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCompare = (e) => {
    e.preventDefault();
    // [REQ-12] Programmatic navigation passing query parameters
    navigate(`/compare?a=${form.inputA}&b=${form.inputB}`);
  };

  const queries = useQueries({
    queries: [
      {
        queryKey: ['character', idA],
        queryFn: () => fetchCharacter(idA),
        enabled: !!idA,
      },
      {
        queryKey: ['character', idB],
        queryFn: () => fetchCharacter(idB),
        enabled: !!idB,
      },
    ],
  });

  const [queryA, queryB] = queries;

  const renderCharacterCol = (query) => {
    if (query.isLoading) return <Skeleton style={{ height: '400px', width: '100%' }} />;
    if (query.isError) return <div style={{ padding: '24px', color: 'var(--danger)' }}>Failed to load character.</div>;
    const char = query.data;
    if (!char) return <div style={{ padding: '24px', color: 'var(--text-muted)' }}>Enter an ID to load.</div>;

    return (
      <Card style={{ padding: '24px', flex: 1 }}>
        <img src={char.image} alt={char.name} style={{ width: '100%', borderRadius: '14px', marginBottom: '16px' }} />
        <h3 style={{ margin: '0 0 8px 0', fontSize: '20px' }}>{char.name}</h3>
        <Badge status={char.status.toLowerCase()} style={{ marginBottom: '16px' }}>{char.status}</Badge>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Species</td>
              <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: '500' }}>{char.species}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Gender</td>
              <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: '500' }}>{char.gender}</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border)' }}>
              <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Origin</td>
              <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: '500' }}>{char.origin.name}</td>
            </tr>
            <tr>
              <td style={{ padding: '8px 0', color: 'var(--text-muted)' }}>Episodes</td>
              <td style={{ padding: '8px 0', textAlign: 'right', fontWeight: '500' }}>{char.episode.length}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    );
  };

  return (
    <div className="compare-page">
      <h2>Compare Characters</h2>
      <p style={{ color: 'var(--text-muted)' }}>Enter two character IDs to compare their stats side by side.</p>

      <form onSubmit={handleCompare} style={{ display: 'flex', gap: '16px', alignItems: 'flex-end', margin: '24px 0', background: 'var(--surface)', padding: '24px', borderRadius: '14px', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Character A (ID)</label>
          <input 
            type="number" 
            name="inputA"
            value={form.inputA}
            onChange={handleChange}
            style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border)' }}
            placeholder="e.g. 1"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '12px', fontWeight: 'bold' }}>Character B (ID)</label>
          <input 
            type="number" 
            name="inputB"
            value={form.inputB}
            onChange={handleChange}
            style={{ padding: '8px 12px', borderRadius: '10px', border: '1px solid var(--border)' }}
            placeholder="e.g. 2"
          />
        </div>
        <Button type="submit" variant="primary">Compare</Button>
      </form>

      <div style={{ display: 'flex', gap: '24px' }}>
        {renderCharacterCol(queryA)}
        {renderCharacterCol(queryB)}
      </div>
    </div>
  );
};

export default ComparePage;
