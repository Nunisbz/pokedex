import { useState, useEffect } from "react";
import Spinner from "./Spinner.jsx";

export default function Pokedex() {
  const [id, setID] = useState(1);
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemon(data);
      } catch (error) {
        console.error("Erro ao buscar Pokémon:", error);
        setPokemon(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const nextPokemon = () => {
    setIsLoading(true);
    setTimeout(() => {
      setID(id + 1);
    }, 2000);
  };

  const prevPokemon = () => {
    if (id > 1) {
      setIsLoading(true);
      setTimeout(() => {
        setID(id - 1);
      }, 2000);
    }
  };

  return (
    <div>
      {isLoading && <Spinner />} {/* Exibe o Spinner enquanto carrega */}
      {!isLoading && pokemon && (
        <div className="pokemon">
          <h1>{pokemon.name}</h1>
          <p>Tipo: {pokemon.types.map(t => t.type.name).join(", ")}</p>
          <p>Peso: {pokemon.weight}g</p>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
        </div>
      )}
      {!isLoading && !pokemon && <p>Pokémon não encontrado</p>}

      <button onClick={prevPokemon} disabled={isLoading || id === 1}>
        Voltar
      </button>
      <button onClick={nextPokemon} disabled={isLoading}>
        Próximo
      </button>
    </div>
  );
}