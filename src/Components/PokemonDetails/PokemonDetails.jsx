import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import './PokemonDetails.css'

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});
  async function DownloadPokemon() {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
    setPokemon({
      name: response.data.name,
      image: response.data.sprites.other.dream_world.front_default,
      height: response.data.height,
      weight: response.data.weight,
      types: response.data.types.map((t) => t.type.name)
    });
  }

  useEffect(() => {
    DownloadPokemon();
  }, []);

  return (
    <div className="pokemon-details-wrapper">
         <img className="pokemon-details-image" src={pokemon.image} />
      <div className="pokemon-details-name"> <span>{pokemon.name}</span></div>
     
      <div className="pokemon-details-name">Height: {pokemon.height}</div>
      <div className="pokemon-details-name">Weight: {pokemon.weight}</div>
      <div className="pokemon-details-types">
        {pokemon.types && pokemon.types.map((t) => <div key={t}>{t}</div>)}
      </div>
    </div>
  );
}
export default PokemonDetails;
