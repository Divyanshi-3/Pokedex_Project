import './Pokemon.css'
import { Link } from 'react-router-dom';

  
    //we are using link and not anchor tag because we don't want the page to refresh as we are making single page website
    function Pokemon({ name, image, id }) {
      return (
          <div className='pokemon'>
              <Link to={`/pokemon/${id}`}>
                  <div className='pokemon-name'>{name}</div>
                  <div>
                      <img className='pokemon-image' src={image} />
                  </div>
              </Link>
          </div>
      )
  }

  
export default Pokemon;
