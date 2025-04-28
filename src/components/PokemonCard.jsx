import React from 'react';
import '../styles/PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const { id, name, sprites, types } = pokemon;
  
  const imageUrl = pokemon.sprites.other['official-artwork'].front_default || 
                   pokemon.sprites.other.home.front_default || 
                   sprites.front_default;
  
  return (
    <div className={`pokemon-card ${types[0].type.name}-card`}>
      <div className="pokemon-id">#{String(id).padStart(3, '0')}</div>
      
      <div className="pokemon-image">
        <img src={imageUrl} alt={name} loading="lazy" />
      </div>
      
      <h2 className="pokemon-name">{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      
      <div className="pokemon-types">
        {types.map(type => (
          <span 
            key={type.type.name} 
            className={`type-badge type-${type.type.name}`}
          >
            {type.type.name}
          </span>
        ))}
      </div>
      
      <div className="pokemon-stats">
        <div className="stat">
          <span className="stat-label">Weight</span>
          <span className="stat-value">{pokemon.weight / 10}kg</span>
        </div>
        <div className="stat">
          <span className="stat-label">Height</span>
          <span className="stat-value">{pokemon.height / 10}m</span>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard; 