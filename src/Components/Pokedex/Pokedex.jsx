import PokemonList from "../PokemonList/PokemonList";
import Search from "../Search/Search";
import "./Pokedex.css";
import { useState } from "react";
import PokemonDetails from "../PokemonDetails/PokemonDetails";

function Pokedex() {
  const [searchTerm, setSearchterm] = useState("");

  return (
    <div className="Pokedex-wrapper">
      <Search updateSearchTerm={setSearchterm} />
      {!searchTerm ? (
        <PokemonList />
      ) : (
        <PokemonDetails key={searchTerm} pokemonName={searchTerm} />
      )}
    </div>
  );
}
export default Pokedex;
