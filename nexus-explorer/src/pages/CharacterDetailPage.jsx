import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { characterUrl, episodesUrl } from '../api/endpoints';
import { get } from '../api/http';
import { useWatchlist } from '../contexts/watchlist/useWatchlist';
import { formatDate } from '../utils/format';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import Skeleton from '../components/ui/Skeleton';
import ErrorState from '../components/ui/ErrorState';

const fetchCharacter = async (id) => {
  const data = await get(characterUrl(id));
  return data;
};

const fetchEpisodes = async (episodeUrls) => {
  if (!episodeUrls || episodeUrls.length === 0) return [];
  // Extract IDs from URLs
  const ids = episodeUrls.map(url => url.split('/').pop());
  const data = await get(episodesUrl(ids));
  return Array.isArray(data) ? data : [data];
};

const CharacterDetailPage = () => {
  // [REQ-12] useParams: the character id is read from the URL
  const { id } = useParams();
  const navigate = useNavigate();
  const { watchlistIds, toggleWatchlist } = useWatchlist();

  const { data: character, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacter(id),
  });

  const { data: episodes, isLoading: isEpisodesLoading } = useQuery({
    queryKey: ['episodes', id],
    queryFn: () => fetchEpisodes(character?.episode),
    enabled: !!character?.episode, // Only run when character is loaded
  });

  // Track Recently Viewed
  useEffect(() => {
    if (character) {
      const stored = JSON.parse(localStorage.getItem('nexus-recently-viewed') || '[]');
      const filtered = stored.filter(c => c.id !== character.id);
      filtered.unshift({
        id: character.id,
        name: character.name,
        image: character.image,
        species: character.species,
        status: character.status,
      });
      // Keep max 5 items
      if (filtered.length > 5) {
        filtered.pop();
      }
      localStorage.setItem('nexus-recently-viewed', JSON.stringify(filtered));
    }
  }, [character]);

  if (isLoading) {
    return <div style={{ padding: '24px' }}><Skeleton style={{ height: '300px' }}/></div>;
  }

  if (isError) {
    if (error.message === 'There is nothing here' || error.message.includes('404')) {
      return (
        <ErrorState 
          message="Character not found" 
          subtext={`No character exists with ID ${id}.`}
          onRetry={() => navigate('/characters')} 
        />
      );
    }
    return <ErrorState message="Request failed" errorDetails={error} onRetry={() => refetch()} />;
  }

  if (!character) return null;

  const isWatchlisted = watchlistIds.includes(character.id);

  return (
    <div className="detail-page" style={{ paddingBottom: '40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" onClick={() => navigate(-1)}>
            &larr; Back
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="secondary" onClick={() => navigator.clipboard.writeText(window.location.href)}>
            Copy link
          </Button>
          <Button variant={isWatchlisted ? 'secondary' : 'primary'} onClick={() => toggleWatchlist(character.id)}>
            {isWatchlisted ? '★ In watchlist' : '★ Add to watchlist'}
          </Button>
        </div>
      </div>

      <Card style={{ display: 'flex', gap: '32px', padding: '32px', marginBottom: '24px' }}>
        <img 
          src={character.image} 
          alt={character.name} 
          style={{ width: '200px', height: '200px', borderRadius: '16px', objectFit: 'cover' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <h2 style={{ fontSize: '28px', margin: 0 }}>{character.name}</h2>
            <Badge status={character.status.toLowerCase()}>{character.status}</Badge>
            <span style={{ fontSize: '11px', background: 'var(--border)', padding: '2px 8px', borderRadius: '999px', fontWeight: 'bold' }}>ID #{character.id}</span>
          </div>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
            {character.species} &middot; {character.gender} &middot; appears in {character.episode.length} episodes
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>SPECIES</div>
              <div style={{ fontWeight: '500' }}>{character.species}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>GENDER</div>
              <div style={{ fontWeight: '500' }}>{character.gender}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>ORIGIN</div>
              <div style={{ fontWeight: '500', color: 'var(--primary)', cursor: 'pointer' }}>{character.origin.name}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>LAST LOCATION</div>
              <div style={{ fontWeight: '500', color: 'var(--primary)', cursor: 'pointer' }}>{character.location.name}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>TYPE</div>
              <div style={{ fontWeight: '500' }}>{character.type || '—'}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>CREATED</div>
              <div style={{ fontWeight: '500' }}>{formatDate(character.created)}</div>
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '4px' }}>EPISODES</div>
              <div style={{ fontWeight: '500' }}>{character.episode.length}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          Episode appearances
          {isEpisodesLoading && <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: 'var(--query-stale-bg)', color: 'var(--query-stale-text)', fontWeight: 'normal' }}>loading...</span>}
        </h3>
        
        {episodes && episodes.length > 0 && (
          <ul style={{ borderTop: '1px solid var(--border)' }}>
            {episodes.map(ep => (
              <li key={ep.id} style={{ display: 'flex', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: '80px', color: 'var(--primary)', fontWeight: '500', fontSize: '13px' }}>{ep.episode}</div>
                <div style={{ flex: 1, fontWeight: '500', fontSize: '14px' }}>{ep.name}</div>
                <div style={{ color: 'var(--text-muted)', fontSize: '13px' }}>{formatDate(ep.air_date)}</div>
              </li>
            ))}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default CharacterDetailPage;
