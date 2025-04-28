import { useState, useEffect } from 'react'
import Header from './components/Header'
import SearchBar from './components/SearchBar'
import PokemonList from './components/PokemonList'
import './App.css'

function App() {
  const [allPokemon, setAllPokemon] = useState([])
  const [filteredPokemon, setFilteredPokemon] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('')
  const [pokemonTypes, setPokemonTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150')
        const data = await response.json()
        
        const pokemonDetailsPromises = data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url)
          return await detailResponse.json()
        })
        
        const pokemonDetails = await Promise.all(pokemonDetailsPromises)
        setAllPokemon(pokemonDetails)
        setFilteredPokemon(pokemonDetails)
        
        const types = [...new Set(
          pokemonDetails.flatMap(pokemon => 
            pokemon.types.map(typeInfo => typeInfo.type.name)
          )
        )].sort()
        
        setPokemonTypes(types)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch Pokémon data. Please try again later.')
        setLoading(false)
        console.error('Error fetching Pokemon:', err)
      }
    }

    fetchPokemon()
  }, [])

  useEffect(() => {
    if (allPokemon.length === 0) return

    let filtered = allPokemon

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase()
      filtered = filtered.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTermLower)
      )
    }

    if (typeFilter) {
      filtered = filtered.filter(pokemon => 
        pokemon.types.some(typeInfo => typeInfo.type.name === typeFilter)
      )
    }

    setFilteredPokemon(filtered)
  }, [searchTerm, typeFilter, allPokemon])

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <div className="container">
          <SearchBar 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            typeFilter={typeFilter}
            setTypeFilter={setTypeFilter}
            pokemonTypes={pokemonTypes}
            filteredCount={!loading ? filteredPokemon.length : undefined}
          />
          <PokemonList 
            pokemon={filteredPokemon} 
            loading={loading} 
            error={error} 
          />
        </div>
      </main>
    </div>
  )
}

export default App
