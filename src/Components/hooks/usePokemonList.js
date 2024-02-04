import { useEffect, useState } from "react";
import axios from "axios";

function usePokemonList() {
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexUrl: "https://pokeapi.co/api/v2/pokemon",
    nextUrl: "",
    prevUrl: "",
    
  });

  async function downloadPokemons() {
    
      setPokemonListState((state) => ({ ...state, isLoading: true }));
      const response = await axios.get(pokemonListState.pokedexUrl); //we get list of first 20 pokemons in which we get their names and the URLs from which we can bring those pokemon
      const pokemonResults = response.data.results; //we get the array of pokemons from results
      console.log("response is ", response.data.pokemon);
    
      setPokemonListState((state) => ({
        ...state, //state and callbackfunction  is passed due to multiple use of setPokemonListState
        nextUrl: response.data.next,
        prevUrl: response.data.previous,
      }));

      // iterating over the array of pokemons, and using their URLs, to create an array of promises
      //that will dowload those 20 pokemons.
      const pokemonResultPromise = pokemonResults.map((pokemon) =>
        axios.get(pokemon.url)
      );
      //passing that array to axios.all
      const pokemonData = await axios.all(pokemonResultPromise); // array of 20 pokemons detailed data.
      console.log(pokemonData);

      //now iterate over the data of each pokemon and extract id, name, image, types
      const pokeListResult = pokemonData.map((pokeData) => {
        //pokemonData is the full array and it has many parameters but we only need data parameter.
        const pokemon = pokeData.data;
        return {
          id: pokemon.id,
          name: pokemon.name,
          image: (pokemon.sprites.other)
            ? pokemon.sprites.other.dream_world.front_default
            : pokemon.sprites.front_shiny,
          types: pokemon.types,
        };
      });
      
      setPokemonListState((state) => ({
        ...state,
        pokemonList: pokeListResult,
        isLoading: false,
      }));
    
  }
  useEffect(() => {
    downloadPokemons();
  }, [pokemonListState.pokedexUrl]);

  return [pokemonListState, setPokemonListState];
}

export default usePokemonList;
