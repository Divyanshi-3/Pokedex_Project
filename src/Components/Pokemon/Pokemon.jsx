import './Pokemon.css'
import { Link } from 'react-router-dom';
function Pokemon({ name, image,id }) {
  return (
    //we are using link and not anchor tag because we don't want the page to refresh as we are making single page website
    <Link to={`/pokemon/${id}`}>   
    <div className='pokemon'>
      <div className='pokemon-name'>{name}</div>
      <div> 
        <img className='pokemon-img' src={image} /> 
        </div>
    </div>
    </Link>
  );
}
export default Pokemon;
