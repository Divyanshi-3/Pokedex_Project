import "./App.css";
import Pokedex from "./Components/Pokedex/Pokedex";
import PokemonDetails from "./Components/PokemonDetails/PokemonDetails";
import PokemonList from "./Components/PokemonList/PokemonList";
import CustomRoutes from "./routes/CustomRoutes";
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="outer-pokedex">
      <h1 id="pokedex-heading">
        <Link to="/">Pokedex</Link>
      </h1>
      <CustomRoutes />
    </div>
  );
}

export default App;
