import React from 'react';
import CharacterCard from './CharacterCard';
import { useWatchlistState } from '../../contexts/watchlist/useWatchlist';

const CharacterGrid = ({ characters }) => {
  const { watchlistIds } = useWatchlistState();

  return (
    <div className="character-grid">
      {characters.map(character => (
        <CharacterCard 
          key={character.id} 
          character={character} 
          isWatchlisted={watchlistIds.includes(character.id)}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
