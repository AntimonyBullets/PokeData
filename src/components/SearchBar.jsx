import React from 'react';
import '../styles/SearchBar.css';

const SearchBar = ({ searchTerm, setSearchTerm, typeFilter, setTypeFilter, pokemonTypes, filteredCount }) => {
  return (
    <div className="search-container">
      <h2 className="search-title">Find Pokemon</h2>
      
      <div className="search-bar">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search" 
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
        
        <div className="type-filter">
          <select 
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      {filteredCount !== undefined && (
        <div className="results-count">
          {filteredCount === 0 
            ? 'No Pokémon found' 
            : `Found ${filteredCount} Pokemon`}
        </div>
      )}
    </div>
  );
};

export default SearchBar; 