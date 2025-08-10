import { useState, useEffect, useMemo } from 'react'

// Інтерфейс для початкового списку покемонів
interface PokemonListItem {
  name: string
  url: string
}

// Інтерфейс для детальних даних покемона з API
interface PokemonDetail {
  name: string
  url: string
  sprites: {
    front_default: string
  }
}

// Інтерфейс для об'єкта, який ми будемо зберігати в стані
interface PokemonState {
  name: string
  url: string
  imageUrl: string
}

interface InitialApiResponse {
  results: PokemonListItem[]
  next: string | null
}

const Pokemon = () => {
  const [pokemonList, setPokemonList] = useState<PokemonState[]>([])
  const [inputValue, setInputValue] = useState<number | null>(null)
  const [limit, setLimit] = useState<number | null>(null)
  const [offset, setOffset] = useState<number>(0)

  const fetchData = async (currentLimit: number, currentOffset: number) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${currentLimit}&offset=${currentOffset}`,
      )
      const initialData: InitialApiResponse = await response.json()

      const promises = initialData.results.map(async (pokemon) => {
        const pokemonResponse = await fetch(pokemon.url)
        const pokemonData: PokemonDetail = await pokemonResponse.json()

        return {
          name: pokemon.name,
          url: pokemon.url,
          imageUrl: pokemonData.sprites.front_default,
        }
      })
      const pokemonWithImages = await Promise.all(promises)

      setPokemonList((prevList) => [...prevList, ...pokemonWithImages])
    } catch (error) {
      console.error('Помилка завантаження даних покемонів:', error)
    }
  }

  useEffect(() => {
    if (limit !== null && limit > 0) {
      fetchData(limit, offset)
    }
  }, [limit, offset])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue !== null && inputValue > 0) {
      setPokemonList([])
      setOffset(0)
      setLimit(inputValue)
    }
  }

  const handleLoadMore = () => {
    if (limit !== null) {
      setOffset((prevOffset) => prevOffset + limit)
    }
  }

  const memoizedPokemonList = useMemo(() => pokemonList, [pokemonList])

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={inputValue ?? ''}
          onChange={(e) => {
            const value = e.target.value
            setInputValue(value === '' ? null : Number(value))
          }}
          min="1"
        />
        <button type="submit">Завантажити покемонів</button>
      </form>

      <ul>
        {memoizedPokemonList.map((pokemon, index) => (
          <li key={index}>
            <a href={pokemon.url} target="_blank" rel="noopener noreferrer">
              {pokemon.name}
            </a>
            <p>{index + 1}</p>
            <img src={pokemon.imageUrl} alt={pokemon.name} />
          </li>
        ))}
      </ul>

      {pokemonList.length > 0 && (
        <button onClick={handleLoadMore}>Показати ще</button>
      )}
    </>
  )
}

export default Pokemon
