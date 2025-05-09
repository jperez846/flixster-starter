import MovieCardComponent from "./MovieCard";
import "./MovieListComponent.css";

const MovieListComponent = ({
  data,
  onMovieClick,
  onToggleFavorite,
  onToggleWatched,
  isFavorite,
  isWatched,
}) => {
  console.log("MovieListComponent: my data", data);

  const movieCards = data?.map((movie) => {
    console.log(
      "Movie card details",
      movie.title,
      movie.backdrop_path,
      movie.vote_average,
      movie.vote_count
    );

    return (
      <div key={movie?.id} className="movie-list-card">
        <MovieCardComponent
          movie={{
            ...movie,
            image: movie.backdrop_path,
            voteAverage: movie.vote_average,
            releaseDate: movie.release_date,
          }}
          onMovieClick={onMovieClick}
          onToggleFavorite={onToggleFavorite}
          onToggleWatched={onToggleWatched}
          isFavorite={isFavorite(movie)}
          isWatched={isWatched(movie)}
        />
      </div>
    );
  });

  return <div className="movie-list-container">{movieCards}</div>;
};

export default MovieListComponent;
