import './MovieCardComponent.css';
import { roundToNearestTenth } from './utilities';
import { Heart, HeartOff, Eye, EyeOff } from 'lucide-react';


const MovieCardComponent = ({ movie, onToggleFavorite, onToggleWatched, isFavorite, isWatched,  onMovieClick}) => {
    return (
      <section className='movie-card-container'>
        <h2 className='movie-card-header'>{movie?.title}</h2>
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie?.image}`}
            alt="movie"
            onClick={() => onMovieClick(movie?.id)}
          />
          <figcaption>
            Rating: {roundToNearestTenth(movie?.voteAverage)}<br />
            Release: {movie?.releaseDate}
          </figcaption>
        </figure>
        <div className="card-actions">
          <button
            className={`icon-button ${isFavorite ? 'favorite' : ''}`}
            onClick={() => onToggleFavorite(movie)}
            aria-pressed={isFavorite}
            title={isFavorite ? 'Unfavorite' : 'Favorite'}
          >
            {isFavorite ? <Heart fill="#e63946" color="#e63946" /> : <HeartOff color="#ccc" />}
          </button>
  
          <button
            className={`icon-button ${isWatched ? 'watched' : ''}`}
            onClick={() => onToggleWatched(movie)}
            aria-pressed={isWatched}
            title={isWatched ? 'Mark as Unwatched' : 'Mark as Watched'}
          >
            {isWatched ? <Eye color="#1d3557" /> : <EyeOff color="#999" />}
          </button>
        </div>
      </section>
    );
  };

export default MovieCardComponent;
