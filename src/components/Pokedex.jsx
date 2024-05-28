import { useState, useEffect } from "react";

export default function Pokedex() {
  const [id, setID] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const nextPokemon = () => {
    setIsLoading(true);
    setID(id + 1);
  };

  const prevPokemon = () => {
    if (id > 1) {
      setIsLoading(true);
      setID(id - 1);
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Carregando...</p>
      ) : pokemon ? (
        <div className="pokemon">
          <h1>{pokemon.name}</h1>
          <p>Tipo: {pokemon.types[0].type.name}</p> 
          <p>Peso: {pokemon.weight}g</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      ) : (
        <p>Nenhum Pokémon encontrado</p>
      )}

      <button onClick={prevPokemon} disabled={isLoading || id === 1}>
        Voltar
      </button>
      <button onClick={nextPokemon} disabled={isLoading}>
        Próximo
      </button>
    </div>
  );
}
