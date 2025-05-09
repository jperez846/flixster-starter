// NowPlaying.jsx
import { useEffect, useState } from "react";
import MovieListComponent from "./MovieList";
import { sortMovies } from "./utilities";
import "./NowPlaying.css";
import MovieModal from "./MovieModal";
import Drawer from "./Drawer";

const NowPlaying = () => {
  const [movieData, setMovieData] = useState([]);
  const [moviePage, setMoviePage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);

  const isFavorite = (movie) => favorites.some((f) => f.id === movie.id);
  const isWatched = (movie) => watched.some((w) => w.id === movie.id);

  const toggleFavorite = (movie) => {
    setFavorites((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const toggleWatched = (movie) => {
    setWatched((prev) =>
      prev.some((m) => m.id === movie.id)
        ? prev.filter((m) => m.id !== movie.id)
        : [...prev, movie]
    );
  };

  const apiKey = import.meta.env.VITE_BEARER_KEY;

  useEffect(() => {
    const fetchData = (page) => {
      setStatusMessage("Fetching data...");
      setIsLoading(true);

      fetch(
        `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            accept: "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.success === false) {
            setIsSuccessful(false);
            setStatusMessage(data.status_message);
          } else {
            const combined = [...movieData, ...(data.results || [])];
            const sorted = sortMovies(combined, sortOption);
            setMovieData(sorted);
            setIsSuccessful(true);
            setStatusMessage("");
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Fetch error:", error);
          setIsLoading(false);
          setIsSuccessful(false);
          setStatusMessage("Error fetching now playing movies.");
        });
    };

    fetchData(moviePage);
  }, [moviePage]);

  const handleSortChange = (e) => {
    const selected = e.target.value;
    setSortOption(selected);
    const sorted = sortMovies(movieData, selected);
    setMovieData(sorted);
  };

  const loadMore = () => {
    setMoviePage((prevPage) => prevPage + 1);
  };
  const handleMovieClick = async (movieId) => {
    console.log("Handling the click of the movie");
    const apiKey = import.meta.env.VITE_BEARER_KEY;
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          accept: "application/json",
        },
      }
    );
    const fullDetails = await response.json();
    setSelectedMovie(fullDetails);
  };

  return (
    <div className="now-playing-container">
      <h1>Now Playing</h1>
      <Drawer
        visible={drawerOpen}
        favorites={favorites}
        watched={watched}
        onClose={() => setDrawerOpen(false)}
      />

      <div className="sort-dropdown">
        <label>Sort by:</label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="">-- Select --</option>
          <option value="title">Title (A–Z)</option>
          <option value="release_date">Release Date (Newest)</option>
          <option value="rating">Rating (High → Low)</option>
        </select>
      </div>

      {isLoading && <p>{statusMessage}</p>}
      {!isLoading && statusMessage && <p>{statusMessage}</p>}
      {!isLoading && isSuccessful && (
        <MovieListComponent
          data={movieData}
          onMovieClick={handleMovieClick}
          onToggleFavorite={toggleFavorite}
          onToggleWatched={toggleWatched}
          isFavorite={isFavorite}
          isWatched={isWatched}
        />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => setDrawerOpen(true)}>📂 My List</button>
        <button onClick={loadMore}>Load More</button>
      </div>
    </div>
  );
};

export default NowPlaying;
