import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchPokemon, setSearchPokemon] = useState("");

  const fetchPokemon = async () => {
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonData = await Promise.all(
      response.data.results.map(async (poke) => {
        const pokeResponse = await axios.get(poke.url);
        return {
          name: pokeResponse.data.name,
          image: pokeResponse.data.sprites.front_default,
          abilities: pokeResponse.data.abilities.map(
            (ability) => ability.ability.name
          ),
        };
      })
    );
    setPokemon(pokemonData);
  };
  useEffect(() => {
    fetchPokemon();
  }, []);

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchPokemon.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon here..."
        onChange={(e) => setSearchPokemon(e.target.value)}
      />
      <div className="pokemon-container">
        {filteredPokemon.length > 0 ? (
          filteredPokemon.map((poke) => (
            <div key={poke.name} className="pokemon-card">
              <img src={poke.image} alt={poke.name} />
              <h2>{poke.name}</h2>
              <p>Abilities: {poke.abilities}</p>
            </div>
          ))
        ) : (
          <h1>Oppps... No Pokemon Found :{searchPokemon}</h1>
        )}
      </div>
    </div>
  );
};

export default App;
