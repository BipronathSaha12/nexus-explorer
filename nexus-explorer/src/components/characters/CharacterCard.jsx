import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { characterUrl } from '../../api/endpoints';
import { get } from '../../api/http';
import { useWatchlist } from '../../contexts/watchlist/useWatchlist';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';

// [REQ-16] A context performance pitfall fixed: memoise the card with React.memo
const CharacterCard = React.memo(({ character }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // Using the convenience hook that provides both state and actions
  const { watchlistIds, toggleWatchlist } = useWatchlist();
  
  const isWatchlisted = watchlistIds.includes(character.id);

  // [REQ-21] Prefetching: queryClient.prefetchQuery on card hover
  const handleMouseEnter = () => {
    queryClient.prefetchQuery({
      queryKey: ['character', character.id.toString()],
      queryFn: async () => {
        const data = await get(characterUrl(character.id));
        return data;
      },
      staleTime: 5 * 60 * 1000,
    });
  };

  const renderCountRef = React.useRef(0);
  renderCountRef.current++;

  return (
    <Card className="character-card" onMouseEnter={handleMouseEnter} style={{ position: 'relative' }}>
      {/* [REQ-16] render counter */}
      <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(0,0,0,0.5)', color: 'white', padding: '2px 6px', borderRadius: '4px', fontSize: '10px', zIndex: 10 }}>
        Render: {renderCountRef.current}
      </div>
      
      <div style={{ position: 'absolute', top: 8, right: 8, zIndex: 10 }}>
        <button 
          onClick={(e) => {
            e.preventDefault();
            toggleWatchlist(character.id);
          }}
          style={{ background: 'white', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', color: isWatchlisted ? 'var(--primary)' : 'var(--text-muted)' }}
        >
          {isWatchlisted ? '★' : '☆'}
        </button>
      </div>

      <img 
        src={character.image} 
        alt={character.name} 
        style={{ width: '100%', aspectRatio: '1/1', objectFit: 'cover' }} 
      />
      
      <div style={{ padding: '14px' }}>
        <h3 style={{ fontSize: '16px', fontWeight: '600', margin: '0 0 4px 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {character.name}
        </h3>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
          {character.species} &middot; {character.gender}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Badge status={character.status.toLowerCase()}>{character.status}</Badge>
          {/* [REQ-10] Link used for Details */}
          <Link to={`/characters/${character.id}`} style={{ fontSize: '13px', fontWeight: '500', color: 'var(--primary)' }}>
            Details &rarr;
          </Link>
        </div>
      </div>
    </Card>
  );
});

export default CharacterCard;
