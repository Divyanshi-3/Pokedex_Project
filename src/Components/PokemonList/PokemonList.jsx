import { useEffect, useState } from "react";
import axios from "axios";
import "./PokemonList.css";
import Pokemon from "../Pokemon/Pokemon";
function PokemonList() {
  // const [pokemonList, setPokemonList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  // const [pokedexURL, setPokedexURL] = useState("https://pokeapi.co/api/v2/pokemon");
  // const [nextURL, setNextURL] = useState('');
  // const [prevURL, setPrevURL] = useState('');
  //Passing too many states is not a good practice so we wrap them all in an object.
  const [pokemonListState, setPokemonListState] = useState({
    pokemonList: [],
    isLoading: true,
    pokedexURL: "https://pokeapi.co/api/v2/pokemon",
    nextURL: "",
    prevURL: "",
  });
  async function DownloadPokemons() {
    // on clicking prev and next name and image appear together
    // setIsLoading(true);
    setPokemonListState((state)=>({ ...pokemonListState, isLoading: true }));
    const response = await axios.get(pokemonListState.pokedexURL); //we get list of first 20 pokemons in which we get their names and the URLs from which we can bring those pokemon
    const pokemonResults = response.data.results; //we get the array of pokemons from results
    console.log(response.data);
    setPokemonListState((state) =>({
      ...state,                              //state and callbackfunction  is passed due to multiple use of setPokemonListState
      nextURL: response.data.next,
      prevURL: response.data.previous,
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
        image: pokemon.sprites.other
          ? pokemon.sprites.other.dream_world.front_default
          : pokemon.sprites.shiny_front,
        types: pokemon.types,
      };
    });
    console.log(pokeListResult);
    setPokemonListState((state)=>({
      ...state,
      pokemonList: pokeListResult,
      isLoading: false,
    }));
  }

  useEffect(() => {
    DownloadPokemons();
  }, [pokemonListState.pokedexURL]);

  return (
    <div className="pokemon-list-wrapper">
      <div className="pokemon-wrapper">
        {pokemonListState.isLoading
          ? "Loading..."
          : pokemonListState.pokemonList.map((p) => (
              <Pokemon name={p.name} image={p.image} key={p.id} id={p.id} />
            ))}
      </div>
      <div className="controls">
        <button
          disabled={pokemonListState.prevURL == null}
          onClick={() => {
            const urlToSet = pokemonListState.prevURL;
            setPokemonListState({ ...pokemonListState, pokedexURL: urlToSet });
          }}
        >
          Prev
        </button>
        <button
          disabled={pokemonListState.nextURL == null}
          onClick={() => {
            const urlToSet = pokemonListState.nextURL;
            setPokemonListState({ ...pokemonListState, pokedexURL: urlToSet });
          }}
        >
          Next{" "}
        </button>
      </div>
    </div>
  );
}

export default PokemonList;
