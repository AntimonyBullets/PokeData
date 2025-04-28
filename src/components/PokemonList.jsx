import React from 'react';
import PokemonCard from './PokemonCard';
import '../styles/PokemonList.css';

const PokemonList = ({ pokemon, loading, error }) => {
  if (loading) {
    return (
      <div className="pokemon-state-container loading">
        <div className="pokemon-loading">
          <div className="pokeball-spinner"></div>
          <p>Loading Pokémon...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pokemon-state-container error">
        <div className="pokemon-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (pokemon.length === 0) {
    return (
      <div className="pokemon-state-container empty">
        <div className="pokemon-empty">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M8 15h8" />
            <path d="M9 9h.01" />
            <path d="M15 9h.01" />
          </svg>
          <h3>No Pokémon Found</h3>
          <p>Try a different search term or filter</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pokemon-list">
      {pokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList; 